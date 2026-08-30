import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, relative, resolve } from "node:path";
import { VOLUNTEER_SLUG_PATTERN } from "../src/utils/site";
import { parseYamlFrontmatter } from "./og/yaml-frontmatter";

function normalize(value: string) {
  return value.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();
}

export function validateContentIdentities(root: string) {
  const checks = [
    {
      label: "volunteer",
      directory: join(root, "src/content/volunteers"),
      fields: ["first_name", "last_name"],
    },
    {
      label: "volunteer slug",
      directory: join(root, "src/content/volunteers"),
      fields: ["slug"],
      pattern: VOLUNTEER_SLUG_PATTERN,
    },
    {
      label: "sponsor",
      directory: join(root, "src/content/sponsors"),
      fields: ["name"],
    },
  ];

  const failures: string[] = [];
  let checked = 0;

  for (const check of checks) {
    const identities = new Map<string, string>();

    for (const name of readdirSync(check.directory).filter((file) =>
      /\.(md|mdx|markdown)$/.test(file),
    )) {
      const file = join(check.directory, name);
      const relativeFile = relative(root, file);
      const data = parseYamlFrontmatter(
        readFileSync(file, "utf8"),
        relativeFile,
      );
      const values = check.fields.map((field) => data[field]);

      // Astro's collection schema reports missing or non-string fields with
      // more useful context. This check owns format and uniqueness among valid
      // string identities.
      if (!values.every((value): value is string => typeof value === "string"))
        continue;

      if (check.pattern && !check.pattern.test(values[0])) {
        failures.push(
          `Invalid ${check.label} in ${relativeFile}: ${values[0]}`,
        );
      }

      const identity = values.map(normalize).join("\u0000");
      const existing = identities.get(identity);
      if (existing) {
        failures.push(
          `Duplicate ${check.label}: ${existing} and ${relativeFile}`,
        );
      } else {
        identities.set(identity, relativeFile);
      }
      checked += 1;
    }
  }

  return { checked, failures };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const { checked, failures } = validateContentIdentities(process.cwd());

  if (failures.length > 0) {
    console.error("Content identity verification failed:");
    console.error(failures.join("\n"));
    process.exit(1);
  }

  console.log(`Content identity verification passed for ${checked} records.`);
}
