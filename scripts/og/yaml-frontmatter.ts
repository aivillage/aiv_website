import { CORE_SCHEMA, load } from "js-yaml";

const YAML_DELIMITER = "---";

export function parseYamlFrontmatter(
  source: string,
  fileLabel: string,
): Record<string, unknown> {
  const content = source.startsWith("\uFEFF") ? source.slice(1) : source;
  const lines = content.split(/\r?\n/);
  const openingDelimiter = lines[0] ?? "";

  if (openingDelimiter !== YAML_DELIMITER) {
    if (openingDelimiter.startsWith(YAML_DELIMITER)) {
      throw new Error(
        `Unsupported frontmatter delimiter in ${fileLabel}. Only YAML frontmatter using an exact \`---\` delimiter is allowed.`,
      );
    }
    return {};
  }

  const closingDelimiterIndex = lines.findIndex(
    (line, index) => index > 0 && line === YAML_DELIMITER,
  );
  if (closingDelimiterIndex === -1) {
    throw new Error(`Unclosed YAML frontmatter in ${fileLabel}.`);
  }

  const frontmatter = lines.slice(1, closingDelimiterIndex).join("\n");
  let data: unknown;

  try {
    // CORE_SCHEMA intentionally leaves date-like values as strings. The OG
    // source selector reads only image, cover, socialImage, and draft fields.
    data = load(frontmatter, { schema: CORE_SCHEMA });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid YAML frontmatter in ${fileLabel}: ${detail}`, {
      cause: error,
    });
  }

  if (data === undefined) return {};
  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`Frontmatter in ${fileLabel} must be a YAML mapping.`);
  }

  return data as Record<string, unknown>;
}
