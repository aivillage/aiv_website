import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const patterns = [
  /(?<![:/])\/[^"'\s)]+\/\d{4}\/\d{2}\/\d{2}\/[^"'\s)]+\.html/g,
  /\/leadership\/?/g,
  /\/leadership_team\/?/g,
  /(?<!\/about)\/conduct\/?/g,
  /\/events\/defcon33\/?/g,
  /\/events\/2024_talks\/?/g,
  /\/events\/DEFCON-China-1\/?/g,
];

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

const failures: string[] = [];
for (const file of walk(join(process.cwd(), "src"))) {
  if (file.endsWith("src/data/redirects.ts")) continue;
  const text = /\.(md|mdx)$/.test(file) ? stripFrontmatter(readFileSync(file, "utf8")) : readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      for (const match of line.matchAll(pattern)) {
        failures.push(`${relative(process.cwd(), file)}:${index + 1}: ${match[0]}`);
      }
    }
  });
}

if (failures.length) {
  console.error("Internal links must point at canonical URLs, not redirect sources:");
  console.error(failures.join("\n"));
  process.exit(1);
}
