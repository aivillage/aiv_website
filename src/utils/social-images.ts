import { createHash } from "node:crypto";
import path from "node:path";
import { defaultSocialImageSource } from "../data/site";

export const GENERATED_SOCIAL_IMAGE_WIDTH = 1200;
export const GENERATED_SOCIAL_IMAGE_HEIGHT = 630;

export type ImageObject = {
  path: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type ImageValue = string | ImageObject;

export type NormalizedImage = {
  path: string;
  alt: string | undefined;
  width: number | undefined;
  height: number | undefined;
};

type BlogSocialImageData = {
  socialImage?: ImageValue;
  cover?: ImageValue;
  image?: ImageValue;
};

type EventSocialImageData = {
  socialImage?: ImageValue;
  image?: ImageValue;
};

export function normalizeImage(value: ImageValue | undefined): NormalizedImage | undefined {
  if (!value) return undefined;

  if (typeof value === "string") {
    return {
      path: value,
      alt: undefined,
      width: undefined,
      height: undefined,
    };
  }

  return {
    path: value.path,
    alt: value.alt,
    width: value.width,
    height: value.height,
  };
}

export function selectBlogSocialImage(data: BlogSocialImageData): NormalizedImage {
  return normalizeImage(data.socialImage ?? data.cover ?? data.image ?? defaultSocialImageSource)!;
}

export function selectEventSocialImage(data: EventSocialImageData): NormalizedImage {
  return normalizeImage(data.socialImage ?? data.image ?? defaultSocialImageSource)!;
}

export function isExternalHttpImage(source: string) {
  return /^https?:\/\//i.test(source);
}

export function generatedSocialImageDimensions(source: string) {
  if (isExternalHttpImage(source)) return undefined;
  return {
    width: GENERATED_SOCIAL_IMAGE_WIDTH,
    height: GENERATED_SOCIAL_IMAGE_HEIGHT,
  };
}

export function normalizeLocalImagePath(source: string) {
  if (isExternalHttpImage(source)) {
    throw new Error(`Expected a local image path, received external URL: ${source}`);
  }

  const pathOnly = source.replaceAll("\\", "/").split(/[?#]/, 1)[0];
  let decoded: string;

  try {
    decoded = decodeURIComponent(pathOnly);
  } catch {
    throw new Error(`Image path contains invalid URL encoding: ${source}`);
  }

  if (decoded.includes("\0")) {
    throw new Error(`Image path contains a null byte: ${source}`);
  }

  const segments: string[] = [];
  for (const segment of decoded.split("/")) {
    if (!segment || segment === ".") continue;
    if (segment === "..") {
      throw new Error(`Image path traversal is not allowed: ${source}`);
    }
    segments.push(segment);
  }

  if (segments.length === 0) {
    throw new Error(`Image path must identify a file under public/: ${source}`);
  }

  return `/${segments.join("/")}`;
}

export function generatedSocialImagePath(source: string) {
  if (isExternalHttpImage(source)) return source;

  const normalized = normalizeLocalImagePath(source);
  const flattened =
    normalized
      .slice(1)
      .replace(/\.[^./]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "image";

  // The source-path hash intentionally keeps this URL stable when source
  // contents are replaced in place. Social platforms may keep serving a
  // cached preview, so their refresh tools can be required after replacement.
  const pathHash = createHash("sha256").update(normalized).digest("hex").slice(0, 10);
  return `/generated/og/${flattened}-${pathHash}.jpg`;
}

export function resolvePublicImageFile(publicDir: string, source: string) {
  const normalized = normalizeLocalImagePath(source);
  const resolved = path.resolve(publicDir, `.${normalized}`);
  const relative = path.relative(path.resolve(publicDir), resolved);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Image path resolves outside public/: ${source}`);
  }

  return resolved;
}
