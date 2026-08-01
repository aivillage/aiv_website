import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import type { EventEntry } from "../../src/utils/site";
import { canonicalEventSlug } from "../../src/utils/site";
import {
  resolveEventPosterPlacement,
  type EventPosterPlacement,
} from "../../src/utils/event-content";

const tests: Array<{ name: string; run: () => void }> = [];
const here = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(here, "../..");
const eventsDirectory = resolve(repositoryRoot, "src/content/events");
const defcon34Path = resolve(eventsDirectory, "defcon34.mdx");
const eventPostersPath = resolve(repositoryRoot, "src/components/posters/EventPosters.astro");
const posterCardPath = resolve(repositoryRoot, "src/components/posters/PosterCard.astro");

function test(name: string, run: () => void) {
  tests.push({ name, run });
}

function placement(
  body: string,
  options: { filePath?: string; hasPosterEvent?: boolean } = {},
): EventPosterPlacement {
  return resolveEventPosterPlacement({
    body,
    filePath: options.filePath ?? "/tmp/event.mdx",
    hasPosterEvent: options.hasPosterEvent ?? true,
  });
}

function renderOutcome(options: {
  body: string;
  filePath?: string;
  hasPosterEvent: boolean;
  hasPosterRows: boolean;
}): "inline" | "fallback" | "none" {
  const resolved = resolveEventPosterPlacement(options);
  if (!options.hasPosterRows) return "none";
  return resolved === "inline" || resolved === "fallback" ? resolved : "none";
}

test("no component plus poster event resolves to fallback", () => {
  assert.equal(placement("Article body"), "fallback");
});

test("no component plus no poster event resolves to none", () => {
  assert.equal(
    placement("Article body", { hasPosterEvent: false }),
    "none",
  );
});

test("one component in MDX plus poster event resolves to inline", () => {
  assert.equal(placement("<EventPosters />"), "inline");
});

test("one component in Markdown is rejected", () => {
  assert.throws(
    () => placement("<EventPosters />", { filePath: "/tmp/event.md" }),
    /requires an \.mdx event file/,
  );
});

test("one component without filePath is rejected", () => {
  assert.throws(
    () =>
      resolveEventPosterPlacement({
        body: "<EventPosters />",
        filePath: undefined,
        hasPosterEvent: true,
      }),
    /requires a local event file path/,
  );
});

test("one component without poster-event configuration is rejected", () => {
  assert.throws(
    () => placement("<EventPosters />", { hasPosterEvent: false }),
    /has no poster-event configuration/,
  );
});

test("two valid components are rejected", () => {
  assert.throws(
    () => placement("<EventPosters />\n\n<EventPosters />"),
    /at most one <EventPosters \/> component/,
  );
});

test("component inside a triple-backtick fence is ignored", () => {
  assert.equal(
    placement("```mdx\n<EventPosters />\n```"),
    "fallback",
  );
});

test("component inside a longer backtick fence is ignored", () => {
  assert.equal(
    placement("````mdx\n<EventPosters />\n````"),
    "fallback",
  );
});

test("component inside a tilde fence is ignored", () => {
  assert.equal(
    placement("~~~mdx\n<EventPosters />\n~~~"),
    "fallback",
  );
});

test("inline-code mention is ignored", () => {
  assert.equal(
    placement("Use `<EventPosters />` to place the module."),
    "fallback",
  );
});

test("four-space-indented component is ignored", () => {
  assert.equal(placement("    <EventPosters />"), "fallback");
});

test("tab-indented component is ignored", () => {
  assert.equal(placement("\t<EventPosters />"), "fallback");
});

test("zero to three leading spaces are accepted", () => {
  for (let spaces = 0; spaces <= 3; spaces += 1) {
    assert.equal(placement(`${" ".repeat(spaces)}<EventPosters />`), "inline");
  }
});

test("trailing spaces are accepted", () => {
  assert.equal(placement("<EventPosters />   \t"), "inline");
});

test("component with props is rejected", () => {
  assert.throws(
    () => placement("<EventPosters limit={6} />"),
    /standalone <EventPosters \/> component with no props/,
  );
});

test("non-self-closing component is rejected", () => {
  assert.throws(
    () => placement("<EventPosters>"),
    /standalone <EventPosters \/> component with no props/,
  );
});

test("closing component syntax is rejected", () => {
  assert.throws(
    () => placement("</EventPosters>"),
    /standalone <EventPosters \/> component with no props/,
  );
});

test("lowercase custom-element syntax is not accepted", () => {
  assert.equal(placement("<event-posters />"), "fallback");
});

test("ordinary prose mentioning EventPosters is ignored", () => {
  assert.equal(
    placement("EventPosters is the internal poster renderer."),
    "fallback",
  );
});

test("render behavior table is satisfied", () => {
  assert.equal(
    renderOutcome({
      body: "Body",
      filePath: "/tmp/event.md",
      hasPosterEvent: false,
      hasPosterRows: false,
    }),
    "none",
  );
  assert.equal(
    renderOutcome({
      body: "Body",
      filePath: "/tmp/event.md",
      hasPosterEvent: true,
      hasPosterRows: false,
    }),
    "none",
  );
  assert.equal(
    renderOutcome({
      body: "Body",
      filePath: "/tmp/event.md",
      hasPosterEvent: true,
      hasPosterRows: true,
    }),
    "fallback",
  );
  assert.equal(
    renderOutcome({
      body: "<EventPosters />",
      filePath: "/tmp/event.mdx",
      hasPosterEvent: true,
      hasPosterRows: false,
    }),
    "none",
  );
  assert.equal(
    renderOutcome({
      body: "<EventPosters />",
      filePath: "/tmp/event.mdx",
      hasPosterEvent: true,
      hasPosterRows: true,
    }),
    "inline",
  );
});

test("DEF CON 34 source has one valid MDX placement and no component import", () => {
  const source = readFileSync(defcon34Path, "utf8");
  assert.equal(placement(source, { filePath: defcon34Path }), "inline");
  assert.equal(
    source.match(/^[ ]{0,3}<EventPosters\s*\/>[ \t]*$/gm)?.length,
    1,
  );
  assert.doesNotMatch(source, /^\s*import\s+.*EventPosters/m);
  assert.doesNotMatch(source, /<event-posters\b/);
});

test("DEF CON 34 source extension and canonical slug remain stable", () => {
  assert.equal(defcon34Path.endsWith(".mdx"), true);
  const event = {
    id: "defcon34",
    collection: "events",
    data: {
      title: "AI Village @ DEF CON 34",
      date: new Date("2026-08-06T00:00:00.000Z"),
      endDate: new Date("2026-08-09T00:00:00.000Z"),
      legacyUrls: [],
    },
  } as EventEntry;
  assert.equal(canonicalEventSlug(event), "defcon-34");
});

test("DEF CON 34 is the only MDX event source", () => {
  const mdxFiles = readdirSync(eventsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .sort();
  assert.deepEqual(mdxFiles, ["defcon34.mdx"]);
});

test("poster thumbnails remain deferred, low priority, and appropriately sized", () => {
  const eventPostersSource = readFileSync(eventPostersPath, "utf8");
  const posterCardSource = readFileSync(posterCardPath, "utf8");

  assert.match(eventPostersSource, /new IntersectionObserver\(/);
  assert.match(eventPostersSource, /rootMargin: "400px 0px"/);
  assert.match(eventPostersSource, /image\.loading = "lazy"/);
  assert.match(eventPostersSource, /image\.fetchPriority = "low"/);
  assert.doesNotMatch(eventPostersSource, /image\.loading = "eager"/);
  assert.match(posterCardSource, /const thumbnailWidth = isArchive \? 1200 : 800;/);
  assert.match(posterCardSource, /\[600, 800, 900, 1200\]/);
  assert.match(posterCardSource, /data-poster-thumb-srcset=/);
  assert.match(posterCardSource, /data-poster-thumb-sizes=/);
  assert.match(posterCardSource, /loading="lazy"/);
  assert.match(posterCardSource, /fetchpriority=\{deferThumbnail \? "low" : undefined\}/);
  assert.match(posterCardSource, /\.poster-card--archive \[data-poster-thumb-src\]/);
  assert.match(posterCardSource, /image\.hasAttribute\("src"\)/);
});

let failures = 0;

console.log("\nevent poster embedding\n");

for (const { name, run } of tests) {
  try {
    run();
    console.log(`  PASS  ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`  FAIL  ${name}`);
    console.error(error);
  }
}

console.log(
  failures === 0
    ? "\nAll event poster embedding tests passed.\n"
    : `\n${failures} test(s) failed.\n`,
);
process.exit(failures === 0 ? 0 : 1);
