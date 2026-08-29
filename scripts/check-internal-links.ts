import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const siteOrigin = "https://aivillage.org";

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
    else out.push(full);
  }
  return out;
}

function stripFrontmatter(text: string) {
  if (!text.startsWith("---")) return text;
  const end = text.indexOf("\n---", 3);
  return end === -1
    ? text
    : `${"\n".repeat(text.slice(0, end + 4).split("\n").length - 1)}${text.slice(end + 4)}`;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sourcePattern(source: string) {
  return new RegExp(
    `(?<![A-Za-z0-9._~%-])${escapeRegExp(source)}(?![A-Za-z0-9._~%-])`,
    "g",
  );
}

const failures: string[] = [];
const sources = redirectSources();
const patterns = sources.map((source) => ({
  source,
  pattern: sourcePattern(source),
}));

for (const file of walk(join(root, "src")).filter((source) =>
  /\.(md|mdx|astro|ts)$/.test(source),
)) {
  const text = /\.(md|mdx)$/.test(file)
    ? stripFrontmatter(readFileSync(file, "utf8"))
    : readFileSync(file, "utf8");
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

function emittedPagePath(file: string) {
  const rel = relative(dist, file).replaceAll("\\", "/");
  return rel.endsWith("/index.html")
    ? `/${rel.slice(0, -"index.html".length)}`
    : `/${rel}`;
}

function decodePathname(pathname: string) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function emittedTarget(pathname: string) {
  const decoded = decodePathname(pathname);
  const target = resolve(dist, `.${decoded}`);
  if (target !== dist && !target.startsWith(`${dist}/`)) return undefined;

  const candidates = decoded.endsWith("/")
    ? [join(target, "index.html")]
    : extname(decoded)
      ? [target]
      : [target, join(target, "index.html")];

  return candidates.find(
    (candidate) => existsSync(candidate) && !statSync(candidate).isDirectory(),
  );
}

function idsIn(file: string) {
  const ids = new Set<string>();
  for (const match of readFileSync(file, "utf8").matchAll(
    /\bid=["']([^"']+)["']/gi,
  )) {
    if (ids.has(match[1])) {
      failures.push(`${relative(root, file)}: duplicate id: ${match[1]}`);
    }
    ids.add(match[1]);
  }
  return ids;
}

const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));
const idCache = new Map<string, Set<string>>();
let checkedReferences = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const pageUrl = new URL(emittedPagePath(file), siteOrigin);
  idCache.set(file, idsIn(file));

  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const rawReference = match[1].replaceAll("&amp;", "&").trim();
    if (!rawReference || rawReference.startsWith("data:")) continue;

    let targetUrl: URL;
    try {
      targetUrl = new URL(rawReference, pageUrl);
    } catch {
      failures.push(`${relative(root, file)}: malformed URL: ${rawReference}`);
      continue;
    }

    if (targetUrl.origin !== siteOrigin) continue;

    const targetFile = emittedTarget(targetUrl.pathname);
    if (!targetFile) {
      failures.push(
        `${relative(root, file)}: missing internal target: ${rawReference}`,
      );
      continue;
    }
    checkedReferences += 1;

    if (targetUrl.hash && targetFile.endsWith(".html")) {
      const expectedId = decodePathname(targetUrl.hash.slice(1));
      const ids = idCache.get(targetFile) ?? idsIn(targetFile);
      idCache.set(targetFile, ids);
      if (!ids.has(expectedId)) {
        failures.push(
          `${relative(root, file)}: missing fragment ${targetUrl.hash} in ${relative(root, targetFile)}`,
        );
      }
    }
  }
}

if (failures.length) {
  console.error("Internal link verification failed:");
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  `Internal link verification passed for ${checkedReferences} emitted reference(s).`,
);
