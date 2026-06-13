import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const contentRoots = [join(root, "src/content/blog"), join(root, "src/content/events")];
const failures: string[] = [];

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(md|mdx|markdown)$/.test(name)) out.push(full);
  }
  return out;
}

function bodyStartLine(lines: string[]) {
  if (lines[0] !== "---") return 0;
  const end = lines.findIndex((line, index) => index > 0 && line === "---");
  return end === -1 ? 0 : end + 1;
}

for (const file of contentRoots.flatMap((dir) => walk(dir))) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  let inFence = false;

  for (let index = bodyStartLine(lines); index < lines.length; index += 1) {
    const line = lines[index];

    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }

    if (!inFence && /^#(?!#)\s+/.test(line)) {
      failures.push(`${relative(root, file)}:${index + 1}: ${line}`);
    }
  }
}

if (failures.length) {
  console.error("Blog and event Markdown bodies must not use top-level # headings. Layouts own the page h1.");
  console.error(failures.join("\n"));
  process.exit(1);
}
