/**
 * Regenerate src/data/posters.ts from a poster CSV export.
 *
 *   pnpm posters:import <poster.csv> [--check]
 *                       [--allow-slug-change] [--allow-permalink-removal]
 *
 * The Google Sheet is the editorial source of truth and this file is generated
 * output — every run rewrites the whole thing. There is deliberately no
 * incremental merge logic: rows removed from the queue disappear from the site,
 * which is the behaviour you want and is far easier to reason about than a
 * merge that silently keeps stale records alive.
 *
 * --check re-generates in memory and fails if the committed file differs.
 *         Useful in CI to catch someone hand-editing generated output.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import {
  readQueue,
  QueueError,
  existingPosterSlugs,
  DEFAULT_DATA_PATH,
  type QueueRow,
} from "./queue.ts";

function parseArgs(argv: string[]) {
  const positional: string[] = [];
  let check = false;
  let allowSlugChange = false;
  let allowPermalinkRemoval = false;
  // --out exists so the test suite can target a scratch file instead of
  // mutating the committed data file and restoring it afterwards.
  let out: string | undefined;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--check") {
      check = true;
    } else if (arg === "--allow-slug-change") {
      allowSlugChange = true;
    } else if (arg === "--allow-permalink-removal") {
      allowPermalinkRemoval = true;
    } else if (arg === "--out") {
      out = argv[i + 1];
      i += 1;
    } else {
      positional.push(arg);
    }
  }

  return {
    csvPath: positional[0],
    check,
    allowSlugChange,
    allowPermalinkRemoval,
    out,
  };
}

function ts(value: string): string {
  return JSON.stringify(value);
}

function renderPoster(row: QueueRow): string {
  const authors = row.authors
    .map((a) =>
      a.affiliation
        ? `      { name: ${ts(a.name)}, affiliation: ${ts(a.affiliation)} },`
        : `      { name: ${ts(a.name)} },`,
    )
    .join("\n");

  const lines = [
    `  {`,
    `    slug: ${ts(row.slug)},`,
    `    event: ${ts(row.event)},`,
    row.submissionId ? `    submissionId: ${ts(row.submissionId)},` : null,
    `    posterAvailability: ${ts(row.posterAvailability)},`,
    row.posterNumber !== undefined
      ? `    posterNumber: ${row.posterNumber},`
      : null,
    `    title: ${ts(row.title)},`,
    `    authors: [`,
    authors,
    `    ],`,
    `    abstract: ${ts(row.abstract)},`,
    row.keywords.length > 0
      ? `    keywords: [${row.keywords.map(ts).join(", ")}],`
      : null,
    row.posterAvailability === "hosted"
      ? `    sourceUrl: ${ts(row.sourceUrl)},`
      : null,
    row.posterAvailability === "hosted"
      ? `    driveFileId: ${ts(row.driveFileId)},`
      : null,
    `  },`,
  ];

  return lines.filter((l) => l !== null).join("\n");
}

function render(rows: QueueRow[]): string {
  return `// GENERATED FILE — DO NOT EDIT BY HAND.
//
// Regenerate with:  pnpm posters:import <poster.csv>
// Source of truth:  the restricted poster response export
//
// Edits made here will be overwritten on the next import. To change a poster,
// change the spreadsheet row and re-run the importer.

import type { Poster } from "./poster-events";

export const posters: Poster[] = [
${rows.map(renderPoster).join("\n")}
];
`;
}

function main() {
  const { csvPath, check, allowSlugChange, allowPermalinkRemoval, out } =
    parseArgs(process.argv.slice(2));
  const OUT_PATH = out ? resolve(out) : fileURLToPath(DEFAULT_DATA_PATH);

  // This checks whether a required CLI operand was supplied. It is not an
  // authentication, authorization, permission, or security-boundary decision.
  // codeql[js/user-controlled-bypass]
  if (!csvPath) {
    console.error(
      "usage: pnpm posters:import <poster.csv> [--check]\n" +
        "                            [--allow-slug-change] [--allow-permalink-removal]",
    );
    process.exit(2);
  }

  let result;
  try {
    result = readQueue(csvPath, { allowSlugChange, dataPath: OUT_PATH });
  } catch (error) {
    if (error instanceof QueueError) {
      console.error(`\n${error.message}\n`);
      process.exit(1);
    }
    throw error;
  }

  const { rows, errors, warnings, skipped, keptSlugs, movedSlugs } = result;

  if (errors.length > 0) {
    console.error(`\n${errors.length} row(s) could not be imported:\n`);
    for (const error of errors) console.error(`  ${error}`);
    console.error(`\nFix the spreadsheet and re-run. Nothing was written.\n`);
    process.exit(1);
  }

  if (rows.length === 0) {
    console.error(
      `No publishable rows found in ${csvPath}. ` +
        `Set Publish = YES for at least one row. Nothing was written.`,
    );
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn(`\n${warnings.length} poster import warning(s):\n`);
    for (const warning of warnings) console.warn(`  ${warning}`);
    console.warn("");
  }

  // Deterministic order: poster number when present, then title. Keeps diffs
  // to the rows that actually changed rather than the whole file.
  rows.sort((a, b) => {
    if (a.event !== b.event) return a.event.localeCompare(b.event);
    if (a.posterNumber !== undefined && b.posterNumber !== undefined) {
      return a.posterNumber - b.posterNumber;
    }
    if (a.posterNumber !== undefined) return -1;
    if (b.posterNumber !== undefined) return 1;
    return a.title.localeCompare(b.title);
  });

  // A canonical poster URL that exists in the current generated data and is
  // absent after the import is the one silent way this pipeline can remove a
  // stable route. The usual innocent cause is Publish = NO; the dangerous one
  // is a poster file that was deleted and re-uploaded instead of replaced via
  // "Manage versions", which mints a new Drive ID and therefore a new identity.
  // Both look identical in the diff.
  //
  // Note this compares SLUGS, not Drive IDs: a re-uploaded file that keeps its
  // title derives the same slug, the canonical route and archive anchor still
  // resolve, and nothing is reported. Only a removed URL trips this.
  const before = existingPosterSlugs(OUT_PATH);
  const after = new Set(rows.map((row) => row.slug));
  const moved = new Set(movedSlugs);
  const dropped = [...before].filter(
    (slug) => !after.has(slug) && !moved.has(slug),
  );

  // Fail closed, and before --check, so neither a normal run nor a drift check
  // can quietly proceed past a removed URL. A warning here would be exactly the
  // "documented rule nobody reads" this pipeline keeps trying to avoid.
  if (dropped.length > 0 && !allowPermalinkRemoval) {
    console.error(
      `\nRefusing to remove ${dropped.length} existing canonical poster URL(s):`,
    );
    for (const slug of dropped) console.error(`  /posters/${slug}/`);
    console.error(
      `\nIf this removal is intentional, re-run with --allow-permalink-removal.\n` +
        `Otherwise check whether Publish was changed by accident, or whether a Drive\n` +
        `file was deleted and re-uploaded instead of replaced via "Manage versions"\n` +
        `— that mints a new file ID and abandons the old URL. To restore it, copy the\n` +
        `old slug into the Slug column.\n\nNothing was written.\n`,
    );
    process.exit(1);
  }

  const output = render(rows);

  if (check) {
    const existing = readFileSync(OUT_PATH, "utf8");
    if (existing !== output) {
      console.error(
        `\n${OUT_PATH} is out of date with ${csvPath}.\n` +
          `Run: pnpm posters:import ${csvPath}\n`,
      );
      process.exit(1);
    }
    const hosted = rows.filter(
      (row) => row.posterAvailability === "hosted",
    ).length;
    const declined = rows.filter(
      (row) => row.posterAvailability === "declined",
    ).length;
    const missing = rows.filter(
      (row) => row.posterAvailability === "missing",
    ).length;
    console.log(
      `posters.ts is up to date (${rows.length} posters: ` +
        `${hosted} hosted, ${declined} declined, ${missing} missing file).`,
    );
    return;
  }

  if (movedSlugs.length > 0) {
    console.warn(
      `\n${movedSlugs.length} canonical poster URL(s) changed by --allow-slug-change:`,
    );
    for (const slug of movedSlugs) {
      console.warn(
        `  /posters/${slug}/ will no longer resolve after this import`,
      );
    }
  }

  if (allowSlugChange) {
    console.warn(
      `\n--allow-slug-change: Slug-column edits will change existing canonical poster URLs.\n` +
        `If this URL has already been shared, changing it will break those links.\n`,
    );
  }

  writeFileSync(OUT_PATH, output);

  if (dropped.length > 0) {
    console.warn(
      `\n--allow-permalink-removal: removing existing canonical poster URL(s):`,
    );
    for (const slug of dropped) console.warn(`  /posters/${slug}/`);
    console.warn("");
  }

  if (keptSlugs.length > 0) {
    console.log(
      `\nKept ${keptSlugs.length} existing canonical poster URL(s) despite title changes:`,
    );
    for (const line of keptSlugs) console.log(`  ${line}`);
    console.log(
      `Set the Slug column and pass --allow-slug-change to move one deliberately.`,
    );
  }

  const byEvent = new Map<string, number>();
  for (const row of rows)
    byEvent.set(row.event, (byEvent.get(row.event) ?? 0) + 1);
  const hosted = rows.filter(
    (row) => row.posterAvailability === "hosted",
  ).length;
  const declined = rows.filter(
    (row) => row.posterAvailability === "declined",
  ).length;
  const missing = rows.filter(
    (row) => row.posterAvailability === "missing",
  ).length;

  console.log(
    `Wrote ${rows.length} poster(s) to ${out ?? "src/data/posters.ts"}`,
  );
  for (const [key, count] of byEvent) console.log(`  ${key}: ${count}`);
  console.log(`  hosted: ${hosted}`);
  console.log(`  declined hosting: ${declined}`);
  console.log(`  missing poster file: ${missing}`);
  if (skipped > 0)
    console.log(`Skipped ${skipped} row(s) not marked for site inclusion.`);
  console.log(`\nNext: pnpm build && pnpm posters:test`);
}

main();
