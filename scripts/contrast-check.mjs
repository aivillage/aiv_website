import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const globalStylesPath = resolve(__dirname, "../src/styles/global.scss");
const source = readFileSync(globalStylesPath, "utf8");

const themeBlocks = {
  "institutional-dark": extractBlock(":root,\nhtml[data-theme=\"institutional-dark\"],\nhtml[data-theme=\"auto\"]"),
  "institutional-light": extractBlock("html[data-theme=\"institutional-light\"]"),
};

const themes = Object.fromEntries(
  Object.entries(themeBlocks).map(([theme, block]) => [theme, parseHexTokens(block)])
);

const textChecks = [
  ["primary text on canvas", "--aiv-text-primary", "--aiv-bg-canvas"],
  ["primary text on card", "--aiv-text-primary", "--aiv-card-bg"],
  ["secondary text on card", "--aiv-text-secondary", "--aiv-card-bg"],
  ["muted text on card", "--aiv-text-muted", "--aiv-card-bg"],
  ["action text on canvas", "--aiv-action-primary", "--aiv-bg-canvas"],
  ["action text on card", "--aiv-action-primary", "--aiv-card-bg"],
  ["brand text on canvas", "--aiv-brand-primary", "--aiv-bg-canvas"],
  ["brand text on card", "--aiv-brand-primary", "--aiv-card-bg"],
  ["discord text on discord bg", "--aiv-brand-discord-text", "--aiv-brand-discord-bg"],
];

const boundaryChecks = [
  ["card border on canvas", "--aiv-card-border", "--aiv-bg-canvas"],
  ["card border on card", "--aiv-card-border", "--aiv-card-bg"],
  ["card hover border on card", "--aiv-card-hover-border", "--aiv-card-bg"],
  ["nested border on nested bg", "--aiv-nested-border", "--aiv-nested-bg"],
  ["nested border on card", "--aiv-nested-border", "--aiv-card-bg"],
  ["rule on canvas", "--aiv-rule-color", "--aiv-bg-canvas"],
  ["focus ring on canvas", "--aiv-focus-ring", "--aiv-bg-canvas"],
  ["focus ring on card", "--aiv-focus-ring", "--aiv-card-bg"],
];

const checks = [
  ...textChecks.map(([name, foreground, background]) => ({
    kind: "text",
    name,
    min: 4.5,
    foreground,
    background,
  })),
  ...boundaryChecks.map(([name, foreground, background]) => ({
    kind: "boundary",
    name,
    min: 3,
    foreground,
    background,
  })),
];

const rows = [];

for (const [theme, tokens] of Object.entries(themes)) {
  for (const check of checks) {
    const foreground = requireToken(tokens, check.foreground, theme);
    const background = requireToken(tokens, check.background, theme);
    const ratio = contrastRatio(foreground, background);
    rows.push({
      theme,
      kind: check.kind,
      name: check.name,
      foreground: check.foreground,
      foregroundValue: foreground,
      background: check.background,
      backgroundValue: background,
      ratio,
      min: check.min,
      pass: ratio >= check.min,
    });
  }
}

printRows(rows);

const failures = rows.filter((row) => !row.pass);
if (failures.length > 0) {
  console.error(`\nContrast check failed: ${failures.length} pair(s) below threshold.`);
  process.exit(1);
}

console.log("\nContrast check passed.");

function extractBlock(marker) {
  const start = source.indexOf(marker);
  if (start === -1) {
    throw new Error(`Could not find token block marker: ${marker}`);
  }

  const open = source.indexOf("{", start);
  if (open === -1) {
    throw new Error(`Could not find opening brace after marker: ${marker}`);
  }

  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return source.slice(open + 1, index);
  }

  throw new Error(`Could not find closing brace for marker: ${marker}`);
}

function parseHexTokens(block) {
  const tokens = {};
  const tokenPattern = /(--aiv-[\w-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g;
  for (const match of block.matchAll(tokenPattern)) {
    tokens[match[1]] = normalizeHex(match[2]);
  }
  return tokens;
}

function requireToken(tokens, tokenName, theme) {
  const value = tokens[tokenName];
  if (!value) {
    throw new Error(`Missing ${tokenName} in ${theme}`);
  }
  return value;
}

function normalizeHex(hex) {
  const value = hex.toLowerCase();
  if (value.length === 4) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
  }
  if (value.length === 7) return value;
  throw new Error(`Unsupported hex token format: ${hex}`);
}

function contrastRatio(foreground, background) {
  const foregroundLum = relativeLuminance(hexToRgb(foreground));
  const backgroundLum = relativeLuminance(hexToRgb(background));
  const lighter = Math.max(foregroundLum, backgroundLum);
  const darker = Math.min(foregroundLum, backgroundLum);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex) {
  return {
    r: Number.parseInt(hex.slice(1, 3), 16) / 255,
    g: Number.parseInt(hex.slice(3, 5), 16) / 255,
    b: Number.parseInt(hex.slice(5, 7), 16) / 255,
  };
}

function relativeLuminance({ r, g, b }) {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function linearize(channel) {
  return channel <= 0.03928
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

function printRows(allRows) {
  const columns = [
    ["Theme", "theme"],
    ["Kind", "kind"],
    ["Pair", "name"],
    ["Foreground", (row) => `${row.foreground}=${row.foregroundValue}`],
    ["Background", (row) => `${row.background}=${row.backgroundValue}`],
    ["Ratio", (row) => row.ratio.toFixed(2)],
    ["Min", (row) => row.min.toFixed(2)],
    ["Result", (row) => (row.pass ? "PASS" : "FAIL")],
  ];

  const widths = columns.map(([label, getter]) => {
    const values = allRows.map((row) => String(typeof getter === "function" ? getter(row) : row[getter]));
    return Math.max(label.length, ...values.map((value) => value.length));
  });

  const render = (values) => values.map((value, index) => String(value).padEnd(widths[index])).join("  ");
  console.log(render(columns.map(([label]) => label)));
  console.log(render(widths.map((width) => "-".repeat(width))));

  for (const row of allRows) {
    console.log(render(columns.map(([, getter]) => (typeof getter === "function" ? getter(row) : row[getter]))));
  }
}
