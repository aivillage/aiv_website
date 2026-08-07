import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const redirectsFile = join(root, "public/_redirects");
const redirects = new Map<string, string>();

function isHttpsDestination(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

for (const line of readFileSync(redirectsFile, "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [from, to, status, extra] = trimmed.split(/\s+/);
  if (!from?.startsWith("/")) throw new Error(`Redirect source must be a root-relative path: ${trimmed}`);
  if (extra) throw new Error(`Redirect ${from} has unexpected extra fields`);
  const isInternal = to?.startsWith("/");
  const isExternal = to ? isHttpsDestination(to) : false;
  if (!isInternal && !isExternal) {
    throw new Error(`Redirect destination must be a root-relative path or HTTPS URL: ${trimmed}`);
  }
  if (isInternal && status !== "301") throw new Error(`Internal redirect ${from} must use 301 status`);
  if (isExternal && status !== "302") throw new Error(`External redirect ${from} must use 302 status`);
  if (from === to) throw new Error(`Redirect ${from} points to itself`);
  if (redirects.has(from)) throw new Error(`Duplicate redirect source: ${from}`);
  redirects.set(from, to);
}

if (!existsSync(dist)) {
  throw new Error("dist/ does not exist. Run `pnpm build` before verifying redirect destinations.");
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
  if (to.startsWith("/") && !routeExists(to)) failures.push(`Redirect destination missing: ${from} -> ${to}`);
}

if (existsSync(join(dist, "sitemap-index.xml"))) failures.push("dist/sitemap-index.xml should not exist");
if (existsSync(join(dist, "sitemap-0.xml"))) failures.push("dist/sitemap-0.xml should not exist");

if (failures.length) {
  console.error("Redirect verification failed:");
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Redirect verification passed for ${redirects.size} redirects from public/_redirects.`);
