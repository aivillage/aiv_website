import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  GENERATED_SOCIAL_IMAGE_HEIGHT,
  GENERATED_SOCIAL_IMAGE_WIDTH,
} from "../../src/utils/social-images";

export const SOCIAL_IMAGE_WIDTH = GENERATED_SOCIAL_IMAGE_WIDTH;
export const SOCIAL_IMAGE_HEIGHT = GENERATED_SOCIAL_IMAGE_HEIGHT;
export const SOCIAL_IMAGE_QUALITY = 86;
export const RASTER_ENLARGEMENT_WARNING_THRESHOLD = 2.5;
export const CORNER_COLOR_TOLERANCE = 12;

export type Rgb = {
  r: number;
  g: number;
  b: number;
};

type GenerateSocialImageOptions = {
  sourceFile: string;
  outputFile: string;
  sourceLabel?: string;
  warn?: (message: string) => void;
};

export type GeneratedSocialImageResult = {
  copied: boolean;
  background: Rgb;
  enlargementFactor: number;
  warning: string | undefined;
};

const WHITE: Rgb = { r: 255, g: 255, b: 255 };
const BLACK: Rgb = { r: 0, g: 0, b: 0 };

async function sampledCornerBackground(sourceFile: string, isSvg: boolean): Promise<Rgb> {
  const { data, info } = await sharp(sourceFile, isSvg ? { density: 72 } : undefined)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const channels = info.channels;
  const offsets = [
    0,
    (info.width - 1) * channels,
    (info.height - 1) * info.width * channels,
    (info.height * info.width - 1) * channels,
  ];
  const corners = offsets.map((offset) => ({
    r: data[offset],
    g: data[offset + 1],
    b: data[offset + 2],
    a: data[offset + 3],
  }));

  if (corners.some((corner) => corner.a < 255)) return WHITE;

  const channelsByName = [
    corners.map((corner) => corner.r),
    corners.map((corner) => corner.g),
    corners.map((corner) => corner.b),
  ];
  const agree = channelsByName.every(
    (values) => Math.max(...values) - Math.min(...values) <= CORNER_COLOR_TOLERANCE,
  );
  if (!agree) return BLACK;

  return {
    r: Math.round(corners.reduce((sum, corner) => sum + corner.r, 0) / corners.length),
    g: Math.round(corners.reduce((sum, corner) => sum + corner.g, 0) / corners.length),
    b: Math.round(corners.reduce((sum, corner) => sum + corner.b, 0) / corners.length),
  };
}

export async function generateSocialImage({
  sourceFile,
  outputFile,
  sourceLabel = sourceFile,
  warn = console.warn,
}: GenerateSocialImageOptions): Promise<GeneratedSocialImageResult> {
  const metadata = await sharp(sourceFile).metadata();
  const isSvg = metadata.format === "svg" || path.extname(sourceFile).toLowerCase() === ".svg";

  if (!metadata.width || !metadata.height) {
    throw new Error(`Unable to determine image dimensions: ${sourceLabel}`);
  }

  await mkdir(path.dirname(outputFile), { recursive: true });

  if (
    metadata.format === "jpeg" &&
    metadata.width === SOCIAL_IMAGE_WIDTH &&
    metadata.height === SOCIAL_IMAGE_HEIGHT
  ) {
    await copyFile(sourceFile, outputFile);
    return {
      copied: true,
      background: BLACK,
      enlargementFactor: 1,
      warning: undefined,
    };
  }

  const background = await sampledCornerBackground(sourceFile, isSvg);
  const enlargementFactor = isSvg
    ? 1
    : Math.min(SOCIAL_IMAGE_WIDTH / metadata.width, SOCIAL_IMAGE_HEIGHT / metadata.height);
  const warning =
    !isSvg && enlargementFactor > RASTER_ENLARGEMENT_WARNING_THRESHOLD
      ? `Warning: ${sourceLabel} requires ${enlargementFactor.toFixed(2)}x raster enlargement for a 1200x630 social image.`
      : undefined;

  if (warning) warn(warning);

  await sharp(sourceFile, isSvg ? { density: 300 } : undefined)
    .resize(SOCIAL_IMAGE_WIDTH, SOCIAL_IMAGE_HEIGHT, {
      fit: "contain",
      background: { ...background, alpha: 1 },
      withoutEnlargement: false,
    })
    .flatten({ background })
    .jpeg({
      quality: SOCIAL_IMAGE_QUALITY,
      chromaSubsampling: "4:2:0",
    })
    .toFile(outputFile);

  return {
    copied: false,
    background,
    enlargementFactor,
    warning,
  };
}
