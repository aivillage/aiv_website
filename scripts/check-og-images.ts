import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { site } from "../src/data/site";
import {
  generatedSocialImagePath,
  isExternalHttpImage,
  normalizeLocalImagePath,
  resolvePublicImageFile,
} from "../src/utils/social-images";
import { collectContentSocialImageSources } from "./og/content-sources";
import { SOCIAL_IMAGE_HEIGHT, SOCIAL_IMAGE_WIDTH } from "./og/image-generation";

type SocialMetadata = {
  images: string[];
  ogImageAlts: string[];
  ogImageWidths: string[];
  ogImageHeights: string[];
  twitterImageAlts: string[];
};

type CheckOgImagesOptions = {
  distDir?: string;
  repositoryRoot?: string;
  siteUrl?: string;
  verifyCoverage?: boolean;
};

async function filesUnder(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return filesUnder(entryPath);
      return [entryPath];
    }),
  );
  return files.flat();
}

function attributes(tag: string) {
  return new Map(
    [...tag.matchAll(/([:\w-]+)\s*=\s*["']([^"']*)["']/g)].map((match) => [
      match[1].toLowerCase(),
      match[2],
    ]),
  );
}

export function extractSocialImageMetadata(html: string): SocialMetadata {
  const metadata: SocialMetadata = {
    images: [],
    ogImageAlts: [],
    ogImageWidths: [],
    ogImageHeights: [],
    twitterImageAlts: [],
  };

  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    const key = (attrs.get("property") ?? attrs.get("name"))?.toLowerCase();
    const content = attrs.get("content");
    if (!key || content === undefined) continue;

    if (key === "og:image" || key === "twitter:image") metadata.images.push(content);
    if (key === "og:image:alt") metadata.ogImageAlts.push(content);
    if (key === "og:image:width") metadata.ogImageWidths.push(content);
    if (key === "og:image:height") metadata.ogImageHeights.push(content);
    if (key === "twitter:image:alt") metadata.twitterImageAlts.push(content);
  }

  return metadata;
}

async function assertGeneratedJpeg(file: string, publicPath: string) {
  const bytes = await readFile(file);
  if (bytes.length < 3 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
    throw new Error(`Generated social image is not genuine JPEG data: ${publicPath}`);
  }

  const metadata = await sharp(bytes).metadata();
  if (metadata.format !== "jpeg") {
    throw new Error(`Generated social image is not a JPEG: ${publicPath}`);
  }
  if (metadata.width !== SOCIAL_IMAGE_WIDTH || metadata.height !== SOCIAL_IMAGE_HEIGHT) {
    throw new Error(
      `Generated social image has ${metadata.width}x${metadata.height}, expected 1200x630: ${publicPath}`,
    );
  }
}

export async function checkOgImages({
  distDir,
  repositoryRoot = process.cwd(),
  siteUrl = site.url,
  verifyCoverage = true,
}: CheckOgImagesOptions = {}) {
  const resolvedDistDir = distDir ?? path.join(repositoryRoot, "dist");
  const productionOrigin = new URL(siteUrl).origin;
  const emittedGeneratedPaths = new Set<string>();
  let checkedReferences = 0;
  let externalReferences = 0;

  for (const htmlFile of (await filesUnder(resolvedDistDir)).filter((file) => file.endsWith(".html"))) {
    const metadata = extractSocialImageMetadata(await readFile(htmlFile, "utf8"));
    for (const reference of metadata.images) {
      const parsed = new URL(reference, siteUrl);
      if (/^https?:\/\//i.test(reference) && parsed.origin !== productionOrigin) {
        externalReferences += 1;
        continue;
      }

      const localPath = normalizeLocalImagePath(parsed.pathname);
      const distFile = resolvePublicImageFile(resolvedDistDir, localPath);
      await access(distFile).catch(() => {
        throw new Error(
          `Emitted social image is missing from dist: ${localPath} (referenced by ${path.relative(repositoryRoot, htmlFile)})`,
        );
      });
      checkedReferences += 1;

      if (localPath.startsWith("/generated/og/")) {
        await assertGeneratedJpeg(distFile, localPath);
        emittedGeneratedPaths.add(localPath);
      }
    }
  }

  if (verifyCoverage) {
    const selected = await collectContentSocialImageSources(repositoryRoot);
    const expectedGeneratedPaths = new Set(
      selected
        .map((record) => record.image.path)
        .filter((source) => !isExternalHttpImage(source))
        .map((source) => generatedSocialImagePath(source)),
    );

    for (const expected of expectedGeneratedPaths) {
      if (!emittedGeneratedPaths.has(expected)) {
        throw new Error(`Selected local social source has no emitted generated derivative: ${expected}`);
      }
    }
    for (const emitted of emittedGeneratedPaths) {
      if (!expectedGeneratedPaths.has(emitted)) {
        throw new Error(`Emitted generated social image was not selected by content/default rules: ${emitted}`);
      }
    }
  }

  console.log(
    `Verified ${checkedReferences} local social-image reference(s); skipped ${externalReferences} external reference(s).`,
  );
  return { checkedReferences, externalReferences, emittedGeneratedPaths };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await checkOgImages();
}
