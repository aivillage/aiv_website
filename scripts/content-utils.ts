import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export type BlogMeta = {
  file: string;
  id: string;
  title?: string;
  date?: Date;
  category?: string;
  categories?: string | string[];
  legacySlug?: string;
  slug?: string;
  canonicalSlug?: string;
  legacyUrls: string[];
};

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function stripDatePrefix(id: string) {
  return id.replace(/\.(md|mdx|markdown)$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(md|mdx|markdown)$/.test(name)) out.push(full);
  }
  return out;
}

function parseScalar(raw: string) {
  return raw.trim().replace(/^["']|["']$/g, "");
}

function parseFrontmatter(text: string) {
  if (!text.startsWith("---")) return {};
  const end = text.indexOf("\n---", 3);
  if (end === -1) return {};
  const lines = text.slice(4, end).split("\n");
  const data: Record<string, unknown> = {};
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].replace(/\r$/, "");
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (!rawValue && /^ {2}- /.test(lines[i + 1] ?? "")) {
      const values: string[] = [];
      while (/^ {2}- /.test(lines[i + 1] ?? "")) {
        i += 1;
        values.push(parseScalar(lines[i].replace(/^ {2}-\s*/, "")));
      }
      data[key] = values;
    } else {
      data[key] = parseScalar(rawValue);
    }
  }
  return data;
}

export function readBlogMetadata(root = process.cwd()) {
  const base = join(root, "src/content/blog");
  return walk(base)
    .sort()
    .map((file): BlogMeta => {
      const data = parseFrontmatter(readFileSync(file, "utf8"));
      return {
        file,
        id: relative(base, file),
        title: data.title as string | undefined,
        date: data.date ? new Date(data.date as string) : undefined,
        category: data.category as string | undefined,
        categories: data.categories as string | string[] | undefined,
        legacySlug: data.legacySlug as string | undefined,
        slug: data.slug as string | undefined,
        canonicalSlug: data.canonicalSlug as string | undefined,
        legacyUrls: Array.isArray(data.legacyUrls) ? (data.legacyUrls as string[]) : [],
      };
    });
}

export function canonicalPostSlug(post: BlogMeta) {
  return slugify(post.slug ?? post.canonicalSlug ?? stripDatePrefix(post.id) ?? post.title ?? "");
}

export function canonicalPostPath(post: BlogMeta) {
  return `/blog/${canonicalPostSlug(post)}/`;
}

export function derivedLegacyPostPath(post: BlogMeta) {
  if (!post.date) throw new Error(`Missing date for ${post.file}`);
  const category = post.category ?? (Array.isArray(post.categories) ? post.categories[0] : post.categories) ?? "";
  if (!category) throw new Error(`Missing category for ${post.file}`);
  const yyyyMmDd = post.date.toISOString().slice(0, 10).split("-");
  const [year, month, day] = yyyyMmDd;
  const slug = post.legacySlug ?? stripDatePrefix(post.id);
  if (!slug) throw new Error(`Missing derivable legacy slug for ${post.file}`);
  return `/${encodeURIComponent(category.toLowerCase())}/${year}/${month}/${day}/${slug}.html`;
}
