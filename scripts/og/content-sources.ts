import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { defaultSocialImageSource } from "../../src/data/site";
import {
  selectBlogSocialImage,
  selectEventSocialImage,
  type NormalizedImage,
} from "../../src/utils/social-images";

export type ContentSocialImageSource = {
  collection: "blog" | "events" | "default";
  file: string;
  image: NormalizedImage;
};

async function contentFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return contentFiles(entryPath);
      return /\.(md|mdx|markdown)$/i.test(entry.name) ? [entryPath] : [];
    }),
  );
  return files.flat().sort();
}

async function parsedFrontmatter(file: string) {
  const source = await readFile(file, "utf8");
  return matter(source).data;
}

export async function collectContentSocialImageSources(
  repositoryRoot: string,
): Promise<ContentSocialImageSource[]> {
  const records: ContentSocialImageSource[] = [
    {
      collection: "default",
      file: "src/data/site.ts",
      image: selectEventSocialImage({ image: defaultSocialImageSource }),
    },
  ];

  const blogRoot = path.join(repositoryRoot, "src/content/blog");
  for (const file of await contentFiles(blogRoot)) {
    const data = await parsedFrontmatter(file);
    if (data.draft === true) continue;
    records.push({
      collection: "blog",
      file: path.relative(repositoryRoot, file),
      image: selectBlogSocialImage(data),
    });
  }

  const eventRoot = path.join(repositoryRoot, "src/content/events");
  for (const file of await contentFiles(eventRoot)) {
    const data = await parsedFrontmatter(file);
    records.push({
      collection: "events",
      file: path.relative(repositoryRoot, file),
      image: selectEventSocialImage(data),
    });
  }

  return records;
}
