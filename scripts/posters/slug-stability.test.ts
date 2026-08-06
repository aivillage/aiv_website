/**
 * Regression tests for canonical poster URL stability.
 *
 *   pnpm posters:test
 *
 * These cover the one behaviour that cannot be undone once it goes wrong: a
 * canonical URL in the baseline moving. Every case here corresponds to a bug
 * caught in review, so please do not delete them when refactoring.
 *
 * The critical ones:
 *  - "flagged run does not reslug an unrelated poster": an earlier version
 *    skipped the whole preservation branch whenever --allow-slug-change was
 *    passed, so authorising one deliberate slug edit silently reslugged every
 *    title-corrected poster in the same batch.
 *  - "removing an existing poster route fails closed": an earlier version only
 *    warned, so a run that dropped an existing canonical poster URL still
 *    exited 0 and let CI carry on.
 */

import { execFileSync, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  writeFileSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { tmpdir } from "node:os";

const HERE = dirname(fileURLToPath(import.meta.url));
const IMPORTER = resolve(HERE, "import-posters.ts");

const ABSTRACT =
  "A sufficiently long abstract that comfortably passes the minimum length validation the importer applies to every row.";

type Row = {
  title: string;
  slug?: string;
  id: string;
  number: number;
  publish?: string;
};
type FormRow = {
  title: string;
  authors: string;
  id?: string;
  host?: string;
  timestamp?: string;
  posterUrl?: string;
};

function csv(rows: Row[]): string {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const header =
    "Publish,Poster Number,Slug,Title,Authors,Abstract,Poster Link";
  const body = rows.map((r) =>
    [
      r.publish ?? "YES",
      String(r.number),
      esc(r.slug ?? ""),
      esc(r.title),
      esc("Wen Zhao | TU Delft"),
      esc(ABSTRACT),
      esc(`https://drive.google.com/file/d/${r.id}/view?usp=drive_link`),
    ].join(","),
  );
  return [header, ...body].join("\n");
}

function formCsv(rows: FormRow[]): string {
  const esc = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const header = [
    "Timestamp",
    "Email Address",
    "What is the name of your poster?",
    "Would you like your poster hosted on our AI Village website?",
    "Please provide all the names of the authors, followed by their affiliation and method of contact. Example: Michelle Hoang, AI Village, linkedin.com/in/example",
    "Please provide the abstract that you would like to accompany your poster",
    "Please provide the poster you wish to display on the AI Village website and at DEFCON34. Please limit to PNGs, SVGs, or other image types.",
  ]
    .map(esc)
    .join(",");
  const body = rows.map((row, index) =>
    [
      row.timestamp ?? `7/31/2026 12:00:${String(index).padStart(2, "0")}`,
      "submitter@example.com",
      row.title,
      row.host ?? "Yes",
      row.authors,
      ABSTRACT,
      row.posterUrl ??
        (row.id ? `https://drive.google.com/open?id=${row.id}` : ""),
    ]
      .map(esc)
      .join(","),
  );
  return [header, ...body].join("\n");
}

const tmp = mkdtempSync(join(tmpdir(), "poster-test-"));

// The suite runs entirely against a scratch data file via the importer's --out
// flag. src/data/posters.ts is never touched, so an interrupted run cannot
// strand fixtures in the working tree.
const DATA = join(tmp, "posters.ts");
writeFileSync(
  DATA,
  `import type { Poster } from "./poster-events";\n\nexport const posters: Poster[] = [];\n`,
);

let failures = 0;

function run(
  rows: Row[],
  flags: string[] = [],
): { ok: boolean; output: string } {
  const path = join(tmp, "queue.csv");
  writeFileSync(path, csv(rows));
  try {
    const output = execFileSync(
      "npx",
      ["tsx", IMPORTER, path, "--out", DATA, ...flags],
      {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    return { ok: true, output };
  } catch (error) {
    const e = error as { stdout?: string; stderr?: string };
    return { ok: false, output: `${e.stdout ?? ""}${e.stderr ?? ""}` };
  }
}

function runForm(
  rows: FormRow[],
  dataPath: string,
  flags: string[] = [],
): { ok: boolean; output: string } {
  const path = join(tmp, "form-responses.csv");
  writeFileSync(path, formCsv(rows));
  const result = spawnSync(
    "npx",
    ["tsx", IMPORTER, path, "--out", dataPath, ...flags],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
  return {
    ok: result.status === 0,
    output: `${result.stdout ?? ""}${result.stderr ?? ""}`,
  };
}

function slugs(): string[] {
  return [...readFileSync(DATA, "utf8").matchAll(/slug: "([^"]*)"/g)].map(
    (m) => m[1],
  );
}

function check(name: string, condition: boolean, detail = "") {
  if (condition) {
    console.log(`  PASS  ${name}`);
  } else {
    failures += 1;
    console.error(`  FAIL  ${name}${detail ? `\n        ${detail}` : ""}`);
  }
}

try {
  console.log("\ncanonical poster URL stability\n");

  const missingOperandOutput = join(tmp, "missing-operand.ts");
  const missingOperand = spawnSync(
    "npx",
    ["tsx", IMPORTER, "--out", missingOperandOutput],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  check(
    "missing CSV operand exits with status 2",
    missingOperand.status === 2,
    `exit status: ${missingOperand.status}`,
  );
  check(
    "missing CSV operand prints usage",
    missingOperand.stderr.includes("usage: pnpm posters:import <poster.csv>"),
    missingOperand.stderr.trim(),
  );
  check(
    "missing CSV operand writes no output file",
    !existsSync(missingOperandOutput),
  );

  const genericData = join(tmp, "generic-posters.ts");
  const genericCsv = join(tmp, "generic-queue.csv");
  writeFileSync(
    genericData,
    `import type { Poster } from "./poster-events";\n\nexport const posters: Poster[] = [];\n`,
  );
  writeFileSync(
    genericCsv,
    csv([
      { title: "Published Generic Row", id: "1GENERICYES", number: 1 },
      {
        title: "Excluded Generic Row",
        id: "1GENERICNO",
        number: 2,
        publish: "NO",
      },
    ]),
  );
  const genericRun = spawnSync(
    "npx",
    ["tsx", IMPORTER, genericCsv, "--out", genericData],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  );
  const genericOutput = readFileSync(genericData, "utf8");
  check(
    "generic Publish queue imports successfully",
    genericRun.status === 0,
    genericRun.stderr,
  );
  check(
    "generic Publish = YES row remains included",
    genericOutput.includes("Published Generic Row"),
  );
  check(
    "generic Publish = NO row remains excluded",
    !genericOutput.includes("Excluded Generic Row"),
  );

  // Generate two baseline poster records.
  const A = {
    title: "Poisoned Mandates in Agent Instruction Sets",
    id: "1AAA",
    number: 1,
  };
  const B = { title: "Agent to Agent Worm Propagation", id: "1BBB", number: 2 };
  run([A, B]);
  const [aSlug, bSlug] = slugs();

  // 1. Title edited, Slug blank -> existing canonical URL retained.
  run([{ ...A, title: "Poisoned Mandates" }, B]);
  check(
    "title edit does not move an existing canonical poster URL",
    slugs()[0] === aSlug,
    slugs()[0],
  );

  // 2. Link re-copied in a different URL form -> same identity, same canonical URL.
  const path = join(tmp, "variant.csv");
  writeFileSync(
    path,
    csv([{ ...A, title: "Poisoned Mandates" }, B]).replace(
      "1AAA/view?usp=drive_link",
      "1AAA/view?usp=sharing&resourcekey=0-XyZ",
    ),
  );
  try {
    execFileSync("npx", ["tsx", IMPORTER, path, "--out", DATA], {
      stdio: "ignore",
    });
  } catch {
    // fall through; the assertion below reports the real problem
  }
  check(
    "re-copied link keeps the same canonical poster URL",
    slugs()[0] === aSlug,
    slugs()[0],
  );

  // 3. Explicit Slug edit without the flag -> rejected, nothing written.
  const blocked = run([{ ...A, slug: "poisoned-mandates" }, B]);
  check("explicit slug edit is rejected without the flag", !blocked.ok);
  check("rejected run writes nothing", slugs()[0] === aSlug, slugs()[0]);

  // 4. THE REGRESSION: one flagged run containing both an authorised slug edit
  //    (A) and an unrelated retitled poster (B). Only A may move.
  run(
    [
      { ...A, slug: "poisoned-mandates" },
      { ...B, title: "Worm Propagation Between Cooperating Agents" },
    ],
    ["--allow-slug-change"],
  );
  const after = slugs();
  check(
    "flagged run moves the poster whose Slug was edited",
    after[0] === "poisoned-mandates",
    after[0],
  );
  check(
    "flagged run does NOT reslug an unrelated retitled poster",
    after[1] === bSlug,
    `expected ${bSlug}, got ${after[1]}`,
  );
  // 5. Removing an existing generated record must fail closed and write nothing.
  run([A, B]);
  const bothSlugs = slugs();
  const removal = run([A]);
  check("removing an existing poster route fails closed", !removal.ok);
  check(
    "refused removal leaves posters.ts untouched",
    slugs().length === 2 && slugs().join() === bothSlugs.join(),
    slugs().join(", "),
  );
  check(
    "refusal names the URL it is protecting",
    removal.output.includes(`/posters/${bothSlugs[1]}/`),
    removal.output.trim().split("\n").slice(0, 2).join(" / "),
  );

  // 6a. Anchors are `poster-<slug>`, so an event id can no longer collide — but
  //     a slug of "search" still yields `poster-search`, the search input's id.
  const reserved = run([{ ...A, slug: "search" }, B], ["--allow-slug-change"]);
  check("slug producing a reserved anchor is rejected", !reserved.ok);

  // 6. The same removal succeeds once explicitly authorised.
  const allowed = run([A], ["--allow-permalink-removal"]);
  check("removal succeeds with --allow-permalink-removal", allowed.ok);
  check(
    "only the remaining poster survives",
    slugs().length === 1,
    slugs().join(", "),
  );

  console.log("\nGoogle Form response input\n");

  const formData = join(tmp, "form-posters.ts");
  writeFileSync(
    formData,
    `import type { Poster } from "./poster-events";\n\nexport const posters: Poster[] = [];\n`,
  );
  const formRun = runForm(
    [
      {
        title: "  Direct  Form\u00a0Import  ",
        authors:
          "Alice Example, Example Lab, alice@example.com\nBob Example, Research @ Example, linkedin.com/in/bob",
        id: "1FORM",
      },
      {
        title: "Waiting for upload",
        authors: "Casey Example, Example Lab, casey@example.com",
      },
      {
        title: "Not hosted",
        authors: "Dana Example, Example Lab, dana@example.com",
        id: "1NO",
        host: "No",
      },
    ],
    formData,
  );
  const formOutput = readFileSync(formData, "utf8");
  check(
    "actual Google Form response headers import directly",
    formRun.ok,
    formRun.output,
  );
  check(
    "Form title whitespace is normalized",
    formOutput.includes('title: "Direct Form Import"'),
  );
  check(
    "Form author names and affiliations are retained",
    formOutput.includes(
      '{ name: "Bob Example", affiliation: "Research @ Example" }',
    ),
  );
  check(
    "Form author contact details are removed",
    !/@example\.com|linkedin\.com/.test(formOutput),
  );
  check(
    "opted-in response without an upload is listed",
    formOutput.includes("Waiting for upload"),
  );
  check(
    "non-hosted Form response is listed",
    formOutput.includes("Not hosted"),
  );
  check(
    "hosted response is marked hosted",
    formOutput.includes('posterAvailability: "hosted"'),
  );
  check(
    "missing upload is marked missing",
    formOutput.includes('posterAvailability: "missing"'),
  );
  check(
    "declined response is marked declined",
    formOutput.includes('posterAvailability: "declined"'),
  );
  check(
    "declined response does not expose its upload",
    !formOutput.includes("1NO"),
  );
  check(
    "metadata-only responses omit poster file fields",
    (formOutput.match(/sourceUrl:/g) ?? []).length === 1 &&
      (formOutput.match(/driveFileId:/g) ?? []).length === 1,
    formOutput,
  );
  check(
    "missing Form upload is reported as a warning",
    formRun.output.includes(
      "row 3: hosting was requested, but no poster file was uploaded",
    ),
    formRun.output,
  );
  check(
    "missing Form upload does not fail the import",
    formRun.ok,
    formRun.output,
  );

  const availabilityData = join(tmp, "availability-posters.ts");
  writeFileSync(
    availabilityData,
    `import type { Poster } from "./poster-events";\n\nexport const posters: Poster[] = [];\n`,
  );
  const stableTimestamp = "7/31/2026 13:00:00";
  const missingFirst = runForm(
    [
      {
        title: "Poster Awaiting Its File",
        authors: "Casey Example, Example Lab, casey@example.com",
        timestamp: stableTimestamp,
      },
    ],
    availabilityData,
  );
  const initialAvailabilityOutput = readFileSync(availabilityData, "utf8");
  const initialAvailabilitySlug = /slug: "([^"]+)"/.exec(
    initialAvailabilityOutput,
  )?.[1];
  check(
    "metadata-only baseline imports successfully",
    missingFirst.ok,
    missingFirst.output,
  );
  check(
    "metadata-only baseline has an opaque Form identity",
    /submissionId: "form-[a-f0-9]{20}"/.test(initialAvailabilityOutput),
  );

  const hostedLater = runForm(
    [
      {
        title: "Poster Title Corrected After Upload",
        authors: "Casey Example, Example Lab, casey@example.com",
        timestamp: stableTimestamp,
        id: "1LATER",
      },
    ],
    availabilityData,
  );
  const hostedLaterOutput = readFileSync(availabilityData, "utf8");
  check(
    "later poster upload imports successfully",
    hostedLater.ok,
    hostedLater.output,
  );
  check(
    "later upload and title correction retain the metadata-only canonical slug",
    hostedLaterOutput.includes(`slug: "${initialAvailabilitySlug}"`),
    hostedLaterOutput,
  );
  check(
    "later upload changes availability to hosted",
    hostedLaterOutput.includes('posterAvailability: "hosted"'),
  );

  const declinedLater = runForm(
    [
      {
        title: "Poster Title Corrected Again",
        authors: "Casey Example, Example Lab, casey@example.com",
        timestamp: stableTimestamp,
        host: "No",
        posterUrl: "https://example.com/private-poster.png",
      },
    ],
    availabilityData,
  );
  const declinedLaterOutput = readFileSync(availabilityData, "utf8");
  check(
    "consent change to declined imports successfully",
    declinedLater.ok,
    declinedLater.output,
  );
  check(
    "consent change retains the canonical slug",
    declinedLaterOutput.includes(`slug: "${initialAvailabilitySlug}"`),
    declinedLaterOutput,
  );
  check(
    "declined response ignores even an invalid supplied poster URL",
    !declinedLaterOutput.includes("example.com/private-poster.png"),
  );

  const invalidUrlData = join(tmp, "invalid-url-posters.ts");
  writeFileSync(invalidUrlData, `export const posters = [];\n`);
  const invalidUrl = runForm(
    [
      {
        title: "Invalid Hosted Poster URL",
        authors: "Jamie Example, Example Lab, jamie@example.com",
        posterUrl: "https://example.com/poster.png",
      },
    ],
    invalidUrlData,
  );
  check(
    "invalid opted-in poster URL remains an error",
    !invalidUrl.ok,
    invalidUrl.output,
  );

  const duplicateTimestampData = join(tmp, "duplicate-timestamp-posters.ts");
  writeFileSync(duplicateTimestampData, `export const posters = [];\n`);
  const duplicateTimestamp = runForm(
    [
      {
        title: "First Timestamp Collision",
        authors: "Avery Example, Example Lab",
        id: "1TIMEA",
        timestamp: stableTimestamp,
      },
      {
        title: "Second Timestamp Collision",
        authors: "Blair Example, Example Lab",
        id: "1TIMEB",
        timestamp: stableTimestamp,
      },
    ],
    duplicateTimestampData,
  );
  check(
    "duplicate Form timestamps fail safely",
    !duplicateTimestamp.ok,
    duplicateTimestamp.output,
  );

  const migrationData = join(tmp, "form-migration.ts");
  writeFileSync(
    migrationData,
    `export const posters = [{\n` +
      `  slug: "existing-canonical-route",\n` +
      `  event: "defcon-34",\n` +
      `  title: "Same Poster Title",\n` +
      `  authors: [{ name: "Alice Example", affiliation: "Example Lab" }],\n` +
      `  abstract: ${JSON.stringify(ABSTRACT)},\n` +
      `  sourceUrl: "https://drive.google.com/file/d/1PUBLIC/view?usp=drive_link",\n` +
      `  driveFileId: "1PUBLIC",\n` +
      `}];\n`,
  );
  const migration = runForm(
    [
      {
        title: "Same Poster Title",
        authors: "Alice Example, Example Lab, alice@example.com",
        id: "1ORIGINAL",
      },
    ],
    migrationData,
  );
  const migrationOutput = readFileSync(migrationData, "utf8");
  check("Form-ID migration run succeeds", migration.ok, migration.output);
  check(
    "existing canonical slug survives the public-copy to Form-ID transition",
    migrationOutput.includes('slug: "existing-canonical-route"'),
  );
  check(
    "Form upload becomes the stored Drive identity",
    migrationOutput.includes('driveFileId: "1ORIGINAL"'),
  );
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

console.log(
  failures === 0
    ? "\nAll canonical poster URL tests passed.\n"
    : `\n${failures} test(s) failed.\n`,
);
process.exit(failures === 0 ? 0 : 1);
