import { access, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { defaultSocialImageSource } from "../../src/data/site";
import {
  generatedSocialImagePath,
  isExternalHttpImage,
  normalizeLocalImagePath,
  resolvePublicImageFile,
} from "../../src/utils/social-images";
import { collectContentSocialImageSources } from "./content-sources";
import { generateSocialImage } from "./image-generation";

export async function generateOgImages(repositoryRoot = process.cwd()) {
  const publicDir = path.join(repositoryRoot, "public");
  const outputDir = path.join(publicDir, "generated/og");
  const records = await collectContentSocialImageSources(repositoryRoot);
  const sources = new Set([defaultSocialImageSource, ...records.map((record) => record.image.path)]);

  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  let generated = 0;
  let external = 0;
  for (const source of [...sources].sort()) {
    if (isExternalHttpImage(source)) {
      external += 1;
      continue;
    }

    const normalizedSource = normalizeLocalImagePath(source);
    const sourceFile = resolvePublicImageFile(publicDir, normalizedSource);
    await access(sourceFile).catch(() => {
      throw new Error(`Missing local social-image source: ${normalizedSource}`);
    });

    const generatedUrl = generatedSocialImagePath(normalizedSource);
    const outputFile = resolvePublicImageFile(publicDir, generatedUrl);
    await generateSocialImage({
      sourceFile,
      outputFile,
      sourceLabel: normalizedSource,
    });
    generated += 1;
  }

  console.log(`Generated ${generated} social image(s); skipped ${external} external source(s).`);
  return { generated, external, records };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await generateOgImages();
}
