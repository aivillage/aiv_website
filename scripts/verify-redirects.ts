import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const redirectsFile = existsSync(join(dist, "_redirects")) ? join(dist, "_redirects") : join(root, "public/_redirects");
const redirects = new Map<string, string>();

for (const line of readFileSync(redirectsFile, "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [from, to, status] = trimmed.split(/\s+/);
  if (status !== "301") throw new Error(`Redirect ${from} must use 301 status`);
  if (from === to) throw new Error(`Redirect ${from} points to itself`);
  redirects.set(from, to);
}

function walk(dir: string, out: string[] = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const routes = new Set<string>();
for (const file of walk(dist)) {
  const rel = `/${relative(dist, file).replaceAll("\\", "/")}`;
  if (rel.endsWith("/index.html")) routes.add(rel.replace(/index\.html$/, ""));
  else routes.add(rel);
}

function routeExists(path: string) {
  return routes.has(path) || routes.has(decodeURI(path));
}

const failures: string[] = [];

for (const [from, to] of redirects) {
  if (redirects.has(to)) failures.push(`Redirect chain: ${from} -> ${to} -> ${redirects.get(to)}`);
  if (!routeExists(to)) failures.push(`Redirect destination missing: ${from} -> ${to}`);
}

if (existsSync(join(dist, "sitemap-index.xml"))) failures.push("dist/sitemap-index.xml should not exist");
if (existsSync(join(dist, "sitemap-0.xml"))) failures.push("dist/sitemap-0.xml should not exist");

if (failures.length) {
  console.error("Redirect verification failed:");
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Redirect verification passed for ${redirects.size} redirects.`);
