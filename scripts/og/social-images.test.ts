import assert from "node:assert/strict";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { defaultSocialImageSource, site } from "../../src/data/site";
import {
  generatedSocialImagePath,
  generatedSocialImageDimensions,
  normalizeImage,
  normalizeLocalImagePath,
  resolvePublicImageFile,
  selectBlogSocialImage,
  selectEventSocialImage,
} from "../../src/utils/social-images";
import { checkOgImages, extractSocialImageMetadata } from "../check-og-images";
import { generateOgImages } from "./generate-og-images";
import {
  generateSocialImage,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_WIDTH,
} from "./image-generation";

const tests: Array<{ name: string; run: () => Promise<void> | void }> = [];
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function test(name: string, run: () => Promise<void> | void) {
  tests.push({ name, run });
}

async function temporaryDirectory() {
  return mkdtemp(path.join(os.tmpdir(), "aiv-og-test-"));
}

async function imageMetadata(file: string) {
  return sharp(file).metadata();
}

async function expectRejects(run: () => Promise<unknown>, pattern: RegExp) {
  await assert.rejects(run, pattern);
}

async function writeMinimalRepository(root: string) {
  await mkdir(path.join(root, "src/content/blog"), { recursive: true });
  await mkdir(path.join(root, "src/content/events"), { recursive: true });
  await mkdir(path.join(root, "public/assets/images"), { recursive: true });
  await writeFile(
    path.join(root, "public/assets/images/aiv_logo.svg"),
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"/></svg>',
  );
}

test("string images normalize with explicit undefined optional fields", () => {
  assert.deepEqual(normalizeImage("/image.png"), {
    path: "/image.png",
    alt: undefined,
    width: undefined,
    height: undefined,
  });
});

test("generated paths are deterministic and end in .jpg", () => {
  const source = "/assets/images/events/defcon-34/ai-village-defcon-34.webp";
  const first = generatedSocialImagePath(source);
  assert.equal(first, generatedSocialImagePath(source));
  assert.match(first, /^\/generated\/og\/.+-[a-f0-9]{10}\.jpg$/);
});

test("flatten-similar paths remain collision resistant", () => {
  assert.notEqual(
    generatedSocialImagePath("/assets/a/b-c.png"),
    generatedSocialImagePath("/assets/a-b/c.png"),
  );
});

test("local path normalization handles separators and repeated slashes", () => {
  assert.equal(normalizeLocalImagePath("\\assets\\\\images///card.png"), "/assets/images/card.png");
});

test("path traversal is rejected", () => {
  assert.throws(() => normalizeLocalImagePath("/../../outside.png"), /traversal/);
  assert.throws(() => normalizeLocalImagePath("/assets/%2e%2e/outside.png"), /traversal/);
});

test("blog social source precedence is socialImage, cover, image, default", () => {
  assert.equal(
    selectBlogSocialImage({
      socialImage: "/social.png",
      cover: "/cover.png",
      image: "/image.png",
    }).path,
    "/social.png",
  );
  assert.equal(selectBlogSocialImage({ cover: "/cover.png", image: "/image.png" }).path, "/cover.png");
  assert.equal(selectBlogSocialImage({ image: "/image.png" }).path, "/image.png");
  assert.equal(selectBlogSocialImage({}).path, defaultSocialImageSource);
});

test("event social source precedence is socialImage, image, default", () => {
  assert.equal(
    selectEventSocialImage({ socialImage: "/social.png", image: "/image.png" }).path,
    "/social.png",
  );
  assert.equal(selectEventSocialImage({ image: "/image.png" }).path, "/image.png");
  assert.equal(selectEventSocialImage({}).path, defaultSocialImageSource);
});

test("HalCTF cover wins over image", () => {
  assert.equal(
    selectBlogSocialImage({
      cover: "/assets/images/2026-07-24-halctf/HalCTF.png",
      image: "/not-the-halctf-cover.png",
    }).path,
    "/assets/images/2026-07-24-halctf/HalCTF.png",
  );
});

test("AI Cyber League cover wins over image", () => {
  assert.equal(
    selectBlogSocialImage({
      cover: "/assets/images/2026-06-03-aicl/20260628_0370_01.jpg",
      image: "/not-the-aicl-cover.png",
    }).path,
    "/assets/images/2026-06-03-aicl/20260628_0370_01.jpg",
  );
});

test("default social source is the SVG and not the legacy PNG", () => {
  assert.equal(defaultSocialImageSource, "/assets/images/aiv_logo.svg");
  assert.notEqual(defaultSocialImageSource, "/assets/images/aiv_logo.png");
});

test("configured default SVG exists and contains no live text or font dependency", async () => {
  const sourceFile = resolvePublicImageFile(
    path.join(repositoryRoot, "public"),
    defaultSocialImageSource,
  );
  const source = await readFile(sourceFile, "utf8");
  assert.match(source, /<svg\b/i);
  assert.match(source, /\bviewBox\s*=/i);
  assert.doesNotMatch(source, /<text\b/i);
  assert.doesNotMatch(source, /<tspan\b/i);
  assert.doesNotMatch(source, /font-family/i);
  assert.doesNotMatch(source, /@font-face/i);
  assert.doesNotMatch(source, /\/assets\/images\/aiv_logo\.png/i);
});

test("actual path-converted default SVG generates without a raster warning", async () => {
  const root = await temporaryDirectory();
  try {
    const warnings: string[] = [];
    const sourceFile = resolvePublicImageFile(
      path.join(repositoryRoot, "public"),
      defaultSocialImageSource,
    );
    const outputFile = path.join(root, "default.jpg");
    await generateSocialImage({
      sourceFile,
      outputFile,
      sourceLabel: defaultSocialImageSource,
      warn: (message) => warnings.push(message),
    });
    const metadata = await imageMetadata(outputFile);
    assert.equal(metadata.format, "jpeg");
    assert.equal(metadata.width, 1200);
    assert.equal(metadata.height, 630);
    assert.deepEqual(warnings, []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("external HTTP(S) URLs pass through unchanged", () => {
  const external = "https://cdn.example.com/social/card.png?version=2";
  assert.equal(generatedSocialImagePath(external), external);
});

test("local generated sources receive fixed Open Graph dimensions", () => {
  assert.deepEqual(generatedSocialImageDimensions("/assets/images/card.png"), {
    width: 1200,
    height: 630,
  });
});

test("external sources receive no fixed Open Graph dimensions", () => {
  assert.equal(generatedSocialImageDimensions("https://external.example/card.png"), undefined);
});

test("portrait raster is contained without cropping", async () => {
  const root = await temporaryDirectory();
  try {
    const source = path.join(root, "portrait.png");
    const output = path.join(root, "portrait.jpg");
    const raw = Buffer.alloc(300 * 600 * 3);
    for (let y = 0; y < 600; y += 1) {
      for (let x = 0; x < 300; x += 1) {
        const offset = (y * 300 + x) * 3;
        raw[offset] = y < 30 ? 240 : 0;
        raw[offset + 1] = 0;
        raw[offset + 2] = y >= 570 ? 240 : 0;
      }
    }
    await sharp(raw, { raw: { width: 300, height: 600, channels: 3 } }).png().toFile(source);
    await generateSocialImage({ sourceFile: source, outputFile: output, warn: () => undefined });
    const { data, info } = await sharp(output).raw().toBuffer({ resolveWithObject: true });
    const topOffset = (8 * info.width + 600) * info.channels;
    const bottomOffset = ((info.height - 9) * info.width + 600) * info.channels;
    assert.ok(data[topOffset] > 180, "top marker should remain visible");
    assert.ok(data[bottomOffset + 2] > 180, "bottom marker should remain visible");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("small raster is upscaled to 1200x630", async () => {
  const root = await temporaryDirectory();
  try {
    const source = path.join(root, "small.png");
    const output = path.join(root, "small.jpg");
    await sharp({
      create: { width: 100, height: 50, channels: 3, background: { r: 20, g: 160, b: 60 } },
    })
      .png()
      .toFile(source);
    await generateSocialImage({ sourceFile: source, outputFile: output, warn: () => undefined });
    const metadata = await imageMetadata(output);
    assert.equal(metadata.width, SOCIAL_IMAGE_WIDTH);
    assert.equal(metadata.height, SOCIAL_IMAGE_HEIGHT);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("raster enlargement above 2.5x warns and succeeds", async () => {
  const root = await temporaryDirectory();
  try {
    const source = path.join(root, "tiny.png");
    const output = path.join(root, "tiny.jpg");
    const warnings: string[] = [];
    await sharp({
      create: { width: 100, height: 50, channels: 3, background: { r: 255, g: 255, b: 255 } },
    })
      .png()
      .toFile(source);
    await generateSocialImage({
      sourceFile: source,
      outputFile: output,
      sourceLabel: "/tiny.png",
      warn: (message) => warnings.push(message),
    });
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /tiny\.png.*12\.00x raster enlargement/);
    assert.equal((await imageMetadata(output)).format, "jpeg");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("exact 1200x630 JPEG is copied byte-for-byte", async () => {
  const root = await temporaryDirectory();
  try {
    const source = path.join(root, "exact.jpg");
    const output = path.join(root, "copied.jpg");
    await sharp({
      create: { width: 1200, height: 630, channels: 3, background: { r: 10, g: 20, b: 30 } },
    })
      .jpeg()
      .toFile(source);
    const result = await generateSocialImage({ sourceFile: source, outputFile: output });
    assert.equal(result.copied, true);
    assert.deepEqual(await readFile(output), await readFile(source));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("exact 1200x630 PNG is converted to JPEG", async () => {
  const root = await temporaryDirectory();
  try {
    const source = path.join(root, "exact.png");
    const output = path.join(root, "converted.jpg");
    await sharp({
      create: { width: 1200, height: 630, channels: 3, background: { r: 10, g: 20, b: 30 } },
    })
      .png()
      .toFile(source);
    const result = await generateSocialImage({ sourceFile: source, outputFile: output });
    assert.equal(result.copied, false);
    assert.equal((await imageMetadata(output)).format, "jpeg");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("SVG generates a 1200x630 JPEG with complete viewBox and no raster warning", async () => {
  const root = await temporaryDirectory();
  try {
    const source = path.join(root, "art.svg");
    const output = path.join(root, "art.jpg");
    const warnings: string[] = [];
    await writeFile(
      source,
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200"><rect x="10" y="5" width="80" height="10" fill="red"/><rect x="10" y="185" width="80" height="10" fill="blue"/></svg>',
    );
    await generateSocialImage({
      sourceFile: source,
      outputFile: output,
      warn: (message) => warnings.push(message),
    });
    const metadata = await imageMetadata(output);
    assert.equal(metadata.format, "jpeg");
    assert.equal(metadata.width, SOCIAL_IMAGE_WIDTH);
    assert.equal(metadata.height, SOCIAL_IMAGE_HEIGHT);
    assert.deepEqual(warnings, []);
    const { data, info } = await sharp(output).raw().toBuffer({ resolveWithObject: true });
    const topMarker = (24 * info.width + 600) * info.channels;
    const bottomMarker = ((info.height - 25) * info.width + 600) * info.channels;
    assert.ok(data[topMarker] > data[topMarker + 2], "top viewBox marker should remain visible");
    assert.ok(
      data[bottomMarker + 2] > data[bottomMarker],
      "bottom viewBox marker should remain visible",
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("transparent SVG surroundings use white", async () => {
  const root = await temporaryDirectory();
  try {
    const source = path.join(root, "transparent.svg");
    const output = path.join(root, "transparent.jpg");
    await writeFile(
      source,
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="black"/></svg>',
    );
    const result = await generateSocialImage({ sourceFile: source, outputFile: output });
    assert.deepEqual(result.background, { r: 255, g: 255, b: 255 });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("transparent raster corners use white", async () => {
  const root = await temporaryDirectory();
  try {
    const source = path.join(root, "transparent.png");
    const output = path.join(root, "transparent.jpg");
    await sharp({
      create: { width: 100, height: 100, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .png()
      .toFile(source);
    const result = await generateSocialImage({
      sourceFile: source,
      outputFile: output,
      warn: () => undefined,
    });
    assert.deepEqual(result.background, { r: 255, g: 255, b: 255 });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("agreeing opaque raster corners use their average color", async () => {
  const root = await temporaryDirectory();
  try {
    const source = path.join(root, "agree.png");
    const output = path.join(root, "agree.jpg");
    await sharp({
      create: { width: 400, height: 400, channels: 3, background: { r: 14, g: 28, b: 42 } },
    })
      .png()
      .toFile(source);
    const result = await generateSocialImage({ sourceFile: source, outputFile: output });
    assert.deepEqual(result.background, { r: 14, g: 28, b: 42 });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("disagreeing opaque raster corners use black", async () => {
  const root = await temporaryDirectory();
  try {
    const source = path.join(root, "disagree.png");
    const output = path.join(root, "disagree.jpg");
    await sharp(
      Buffer.from([
        255, 0, 0, 0, 255, 0,
        0, 0, 255, 255, 255, 255,
      ]),
      { raw: { width: 2, height: 2, channels: 3 } },
    )
      .png()
      .toFile(source);
    const result = await generateSocialImage({
      sourceFile: source,
      outputFile: output,
      warn: () => undefined,
    });
    assert.deepEqual(result.background, { r: 0, g: 0, b: 0 });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("missing local source fails generation and external sources are not fetched", async () => {
  const root = await temporaryDirectory();
  try {
    await writeMinimalRepository(root);
    await writeFile(
      path.join(root, "src/content/events/event.md"),
      "---\ntitle: Event\ndate: 2026-01-01\nimage: /assets/images/missing.png\n---\n",
    );
    await writeFile(
      path.join(root, "src/content/blog/external.md"),
      "---\ntitle: External\ndate: 2026-01-01\ncover: https://cdn.example.com/card.png\n---\n",
    );
    await expectRejects(() => generateOgImages(root), /Missing local social-image source/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("checker rejects a missing dist asset", async () => {
  const root = await temporaryDirectory();
  try {
    await writeFile(
      path.join(root, "index.html"),
      `<meta property="og:image" content="${site.url}/generated/og/missing.jpg">`,
    );
    await expectRejects(
      () => checkOgImages({ distDir: root, verifyCoverage: false }),
      /missing from dist/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("checker rejects generated output with wrong dimensions", async () => {
  const root = await temporaryDirectory();
  try {
    const generated = path.join(root, "generated/og");
    await mkdir(generated, { recursive: true });
    await sharp({
      create: { width: 100, height: 100, channels: 3, background: "white" },
    })
      .jpeg()
      .toFile(path.join(generated, "wrong.jpg"));
    await writeFile(
      path.join(root, "index.html"),
      `<meta name="twitter:image" content="${site.url}/generated/og/wrong.jpg">`,
    );
    await expectRejects(
      () => checkOgImages({ distDir: root, verifyCoverage: false }),
      /expected 1200x630/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("checker rejects non-JPEG bytes with a .jpg extension", async () => {
  const root = await temporaryDirectory();
  try {
    const generated = path.join(root, "generated/og");
    await mkdir(generated, { recursive: true });
    await sharp({
      create: { width: 1200, height: 630, channels: 3, background: "white" },
    })
      .png()
      .toFile(path.join(generated, "fake.jpg"));
    await writeFile(
      path.join(root, "index.html"),
      `<meta property="og:image" content="${site.url}/generated/og/fake.jpg">`,
    );
    await expectRejects(
      () => checkOgImages({ distDir: root, verifyCoverage: false }),
      /not genuine JPEG/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("explicit alt metadata includes OG and Twitter values", () => {
  const metadata = extractSocialImageMetadata(
    '<meta property="og:image:alt" content="Explicit alt"><meta name="twitter:image:alt" content="Explicit alt">',
  );
  assert.deepEqual(metadata.ogImageAlts, ["Explicit alt"]);
  assert.deepEqual(metadata.twitterImageAlts, ["Explicit alt"]);
});

test("absent explicit alt metadata includes neither alt tag", () => {
  const metadata = extractSocialImageMetadata(
    '<meta property="og:image" content="/card.jpg"><meta name="twitter:image" content="/card.jpg">',
  );
  assert.deepEqual(metadata.ogImageAlts, []);
  assert.deepEqual(metadata.twitterImageAlts, []);
});

test("local generated metadata includes 1200x630 Open Graph dimensions", () => {
  const metadata = extractSocialImageMetadata(
    '<meta property="og:image" content="/generated/og/card.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">',
  );
  assert.deepEqual(metadata.ogImageWidths, ["1200"]);
  assert.deepEqual(metadata.ogImageHeights, ["630"]);
});

test("external image metadata omits fixed Open Graph dimensions", () => {
  const metadata = extractSocialImageMetadata(
    '<meta property="og:image" content="https://external.example/card.png">',
  );
  assert.deepEqual(metadata.ogImageWidths, []);
  assert.deepEqual(metadata.ogImageHeights, []);
});

test("generator coverage matches emitted selected sources", async () => {
  const root = await temporaryDirectory();
  try {
    await writeMinimalRepository(root);
    await sharp({
      create: { width: 600, height: 300, channels: 3, background: "black" },
    })
      .png()
      .toFile(path.join(root, "public/assets/images/cover.png"));
    await sharp({
      create: { width: 300, height: 600, channels: 3, background: "white" },
    })
      .png()
      .toFile(path.join(root, "public/assets/images/event.png"));
    await writeFile(
      path.join(root, "src/content/blog/post.md"),
      "---\ntitle: Post\ndate: 2026-01-01\ncover: /assets/images/cover.png\nimage: /assets/images/unused.png\n---\n",
    );
    await writeFile(
      path.join(root, "src/content/events/event.md"),
      "---\ntitle: Event\ndate: 2026-01-01\nimage: /assets/images/event.png\n---\n",
    );
    await generateOgImages(root);
    await mkdir(path.join(root, "dist"), { recursive: true });
    await cp(path.join(root, "public/generated"), path.join(root, "dist/generated"), {
      recursive: true,
    });
    const references = [
      generatedSocialImagePath(defaultSocialImageSource),
      generatedSocialImagePath("/assets/images/cover.png"),
      generatedSocialImagePath("/assets/images/event.png"),
    ];
    await writeFile(
      path.join(root, "dist/index.html"),
      references
        .map(
          (reference) =>
            `<meta property="og:image" content="${site.url}${reference}"><meta name="twitter:image" content="${site.url}${reference}">`,
        )
        .join(""),
    );
    const result = await checkOgImages({
      repositoryRoot: root,
      distDir: path.join(root, "dist"),
    });
    assert.deepEqual(new Set(result.emittedGeneratedPaths), new Set(references));

    await writeFile(
      path.join(root, "dist/index.html"),
      references
        .slice(0, 2)
        .map((reference) => `<meta property="og:image" content="${site.url}${reference}">`)
        .join(""),
    );
    await expectRejects(
      () =>
        checkOgImages({
          repositoryRoot: root,
          distDir: path.join(root, "dist"),
        }),
      /no emitted generated derivative/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

let failed = 0;
for (const { name, run } of tests) {
  try {
    await run();
    console.log(`  PASS  ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`  FAIL  ${name}`);
    console.error(error);
  }
}

if (failed > 0) {
  throw new Error(`${failed} of ${tests.length} social-image tests failed.`);
}

console.log(`\nAll ${tests.length} social-image tests passed.`);
