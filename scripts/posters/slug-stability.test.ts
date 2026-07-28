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

import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { tmpdir } from "node:os";

const HERE = dirname(fileURLToPath(import.meta.url));
const IMPORTER = resolve(HERE, "import-posters.ts");

const ABSTRACT =
  "A sufficiently long abstract that comfortably passes the minimum length validation the importer applies to every row.";

type Row = { title: string; slug?: string; id: string; number: number };

function csv(rows: Row[]): string {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const header = "Publish,Poster Number,Slug,Title,Authors,Abstract,Poster Link";
  const body = rows.map((r) =>
    [
      "YES",
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

const tmp = mkdtempSync(join(tmpdir(), "poster-test-"));

// The suite runs entirely against a scratch data file via the importer's --out
// flag. src/data/posters.ts is never touched, so an interrupted run cannot
// strand fixtures in the working tree.
const DATA = join(tmp, "posters.ts");
writeFileSync(DATA, `import type { Poster } from "./poster-events";\n\nexport const posters: Poster[] = [];\n`);

let failures = 0;

function run(rows: Row[], flags: string[] = []): { ok: boolean; output: string } {
  const path = join(tmp, "queue.csv");
  writeFileSync(path, csv(rows));
  try {
    const output = execFileSync("npx", ["tsx", IMPORTER, path, "--out", DATA, ...flags], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { ok: true, output };
  } catch (error) {
    const e = error as { stdout?: string; stderr?: string };
    return { ok: false, output: `${e.stdout ?? ""}${e.stderr ?? ""}` };
  }
}

function slugs(): string[] {
  return [...readFileSync(DATA, "utf8").matchAll(/slug: "([^"]*)"/g)].map((m) => m[1]);
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

  // Generate two baseline poster records.
  const A = { title: "Poisoned Mandates in Agent Instruction Sets", id: "1AAA", number: 1 };
  const B = { title: "Agent to Agent Worm Propagation", id: "1BBB", number: 2 };
  run([A, B]);
  const [aSlug, bSlug] = slugs();

  // 1. Title edited, Slug blank -> existing canonical URL retained.
  run([{ ...A, title: "Poisoned Mandates" }, B]);
  check("title edit does not move an existing canonical poster URL", slugs()[0] === aSlug, slugs()[0]);

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
    execFileSync("npx", ["tsx", IMPORTER, path, "--out", DATA], { stdio: "ignore" });
  } catch {
    // fall through; the assertion below reports the real problem
  }
  check("re-copied link keeps the same canonical poster URL", slugs()[0] === aSlug, slugs()[0]);

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
  check("flagged run moves the poster whose Slug was edited", after[0] === "poisoned-mandates", after[0]);
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
  check("only the remaining poster survives", slugs().length === 1, slugs().join(", "));
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

console.log(
  failures === 0 ? "\nAll canonical poster URL tests passed.\n" : `\n${failures} test(s) failed.\n`,
);
process.exit(failures === 0 ? 0 : 1);
