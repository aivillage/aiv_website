import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();

function redirectSources() {
  return readFileSync(join(root, "public/_redirects"), "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(/\s+/)[0])
    .sort((a, b) => b.length - a.length);
}

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(md|mdx|astro|ts)$/.test(name)) out.push(full);
  }
  return out;
}

function stripFrontmatter(text: string) {
  if (!text.startsWith("---")) return text;
  const end = text.indexOf("\n---", 3);
  return end === -1 ? text : `${"\n".repeat(text.slice(0, end + 4).split("\n").length - 1)}${text.slice(end + 4)}`;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sourcePattern(source: string) {
  return new RegExp(`(?<![A-Za-z0-9._~%-])${escapeRegExp(source)}(?![A-Za-z0-9._~%-])`, "g");
}

const failures: string[] = [];
const sources = redirectSources();
const patterns = sources.map((source) => ({ source, pattern: sourcePattern(source) }));

for (const file of walk(join(root, "src"))) {
  const text = /\.(md|mdx)$/.test(file) ? stripFrontmatter(readFileSync(file, "utf8")) : readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    for (const { source, pattern } of patterns) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        failures.push(`${relative(root, file)}:${index + 1}: ${source}`);
      }
    }
  });
}

if (failures.length) {
  console.error("Internal links must point at canonical URLs, not redirect sources:");
  console.error(failures.join("\n"));
  process.exit(1);
}
