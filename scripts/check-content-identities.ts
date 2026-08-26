import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { parseYamlFrontmatter } from "./og/yaml-frontmatter";

const root = process.cwd();
const checks = [
  {
    label: "volunteer",
    directory: join(root, "src/content/volunteers"),
    fields: ["first_name", "last_name"],
  },
  {
    label: "sponsor",
    directory: join(root, "src/content/sponsors"),
    fields: ["name"],
  },
];

const failures: string[] = [];
let checked = 0;

function normalize(value: string) {
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();
}

for (const check of checks) {
  const identities = new Map<string, string>();

  for (const name of readdirSync(check.directory).filter((file) =>
    /\.(md|mdx|markdown)$/.test(file),
  )) {
    const file = join(check.directory, name);
    const data = parseYamlFrontmatter(
      readFileSync(file, "utf8"),
      relative(root, file),
    );
    const values = check.fields.map((field) => data[field]);

    // Astro's collection schema reports missing or non-string fields with more
    // useful context. This check owns only uniqueness among valid identities.
    if (!values.every((value): value is string => typeof value === "string"))
      continue;

    const identity = values.map(normalize).join("\u0000");
    const existing = identities.get(identity);
    if (existing) {
      failures.push(
        `Duplicate ${check.label}: ${existing} and ${relative(root, file)}`,
      );
    } else {
      identities.set(identity, relative(root, file));
    }
    checked += 1;
  }
}

if (failures.length > 0) {
  console.error("Content identity verification failed:");
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Content identity verification passed for ${checked} records.`);
