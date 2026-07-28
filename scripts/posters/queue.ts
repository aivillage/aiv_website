/**
 * Reader and validator for the poster publish queue CSV.
 *
 * The queue is the editorial source of truth; `import-posters.ts` turns it into
 * src/data/posters.ts. Everything that can silently break a published URL is
 * checked here rather than left to review.
 */

import { readFileSync } from "node:fs";
import { parseCsv } from "./csv.ts";
import { posterEvents } from "../../src/data/poster-events.ts";

export type QueueRow = {
  /** 1-based row number in the CSV, for error messages. */
  rowNumber: number;
  event: string;
  slug: string;
  title: string;
  authors: { name: string; affiliation?: string }[];
  abstract: string;
  keywords: string[];
  sourceUrl: string;
  /** Extracted from sourceUrl. Identity key, and the thumbnail source. */
  driveFileId: string;
  posterNumber?: number;
};

/**
 * Accepted header spellings, lowercased. Add aliases here rather than forcing
 * organizers to rename spreadsheet columns.
 */
const HEADER_ALIASES: Record<string, string[]> = {
  publish: ["publish", "publish?", "publish to site", "live"],
  slug: ["slug", "url slug"],
  title: ["title", "poster title"],
  authors: ["authors", "author", "author names", "authors (one per line)"],
  abstract: ["abstract", "summary", "description"],
  keywords: ["keywords", "tags", "topics"],
  sourceUrl: ["poster link", "drive link", "poster url", "link", "file link", "source url"],
  posterNumber: ["poster number", "number", "no", "#"],
};

const REQUIRED = ["publish", "title", "authors", "abstract", "sourceUrl"] as const;

/**
 * `Publish` is the only thing that decides what appears on the site.
 *
 * It is deliberately not a workflow status. The importer regenerates the whole
 * data file, so whatever it selects *is* the site — and if it keyed off a
 * status, advancing a row to PUBLISHED after merge would delete that poster on
 * the next run. Publication intent and workflow state are different things.
 */
const TRUTHY = new Set(["yes", "y", "true", "1", "x", "checked"]);

/**
 * This importer is hardcoded to one event, deliberately.
 *
 * It regenerates the whole of src/data/posters.ts from a single event's queue,
 * so there is no version of a `--event` flag that delivers multi-event support:
 * importing a DEF CON 35 queue would drop every DEF CON 34 permalink and trip
 * the removal guard. A flag would only make the interface look capable.
 *
 * Adding a second event is a real design decision — per-event generated files,
 * or one global queue carrying every historical poster — and should be made
 * then, not faked now.
 */
export const EVENT_ID = "defcon-34";

const KNOWN_EVENTS = new Set(posterEvents.map((event) => event.id));

// Not user input, so not a validation error — a typo in the constant above
// would generate records that never render, which is worth catching loudly.
if (!KNOWN_EVENTS.has(EVENT_ID)) {
  throw new Error(
    `EVENT_ID ${JSON.stringify(EVENT_ID)} has no entry in src/data/poster-events.ts. ` +
      `Every imported poster would generate cleanly and then never render.`,
  );
}

/**
 * Poster anchors are `poster-<slug>`, which keeps them out of the event-id
 * namespace. It does not keep them out of every namespace: a slug of "search"
 * yields `poster-search`, the id of the search input. Duplicate ids are invalid
 * HTML and send the anchor to the wrong element, silently. Cheap to check.
 */
const RESERVED_IDS = new Set([
  ...posterEvents.map((event) => event.id),
  ...posterEvents.map((event) => `${event.id}-heading`),
  "poster-search",
  "poster-archive",
]);

/** Must match the anchor built in src/pages/posters/index.astro. */
export function anchorId(slug: string): string {
  return `poster-${slug}`;
}

const PLACEHOLDER_ABSTRACTS = [
  "see poster",
  "see attached",
  "tbd",
  "n/a",
  "na",
  "coming soon",
  "-",
];

export class QueueError extends Error {}

export function slugify(value: string): string {
  const normalized = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036F]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (normalized.length <= 72) return normalized;

  // Truncate on a word boundary. Real poster titles are long, and a hard slice
  // produces things like "...-attack-chain-against-a-p" which is a poor
  // permanent identifier.
  const truncated = normalized.slice(0, 72);
  const boundary = truncated.lastIndexOf("-");
  return boundary >= 32 ? truncated.slice(0, boundary) : truncated.replace(/-+$/g, "");
}

/**
 * Extract the Drive file ID from any of the URL shapes a collaborator might
 * paste. `?usp=sharing`, `?usp=drivesdk`, and `?usp=drive_link` are analytics
 * tags that vary by where the link was copied from, and a resource key may or
 * may not be appended — all of which are different strings for the same file.
 * Identity must key on the ID, not the URL text, or re-copying a link silently
 * mints a new permalink and defeats duplicate detection.
 */
export function driveFileId(value: string): string | null {
  try {
    const url = new URL(value);
    const path = /\/(?:file|document|presentation|spreadsheets)\/d\/([^/]+)/.exec(url.pathname);
    if (path) return path[1];
    return url.searchParams.get("id");
  } catch {
    return null;
  }
}

/**
 * Slugs must survive title edits, because they are the public permalink.
 *
 * Rather than requiring organizers to hand-curate a Slug column for 30-50
 * rows — new work, and a new way to get it wrong — identity is keyed on the
 * Drive link, which does not change when a title is corrected (and survives
 * "Manage versions" replacements). If a link is already published under a
 * slug, that slug is kept no matter what the title now says.
 *
 * This is not the incremental-merge logic rejected elsewhere: record *content*
 * is still fully regenerated every run. Only the identifier is sticky.
 */
export const DEFAULT_DATA_PATH = new URL("../../src/data/posters.ts", import.meta.url);

export function publishedSlugsById(dataPath: URL | string = DEFAULT_DATA_PATH): Map<string, string> {
  const map = new Map<string, string>();
  try {
    const source = readFileSync(dataPath, "utf8");
    const blocks = source.split(/\n {2}\{/);
    for (const block of blocks) {
      const slug = /slug:\s*"((?:[^"\\]|\\.)*)"/.exec(block);
      const url = /sourceUrl:\s*"((?:[^"\\]|\\.)*)"/.exec(block);
      if (!slug || !url) continue;
      const id = driveFileId(JSON.parse(`"${url[1]}"`));
      if (id) map.set(id, JSON.parse(`"${slug[1]}"`));
    }
  } catch {
    // First run, or the file was deleted. Nothing published yet.
  }
  return map;
}

function resolveHeaders(header: string[]): Record<string, number> {
  const normalized = header.map((h) => h.trim().toLowerCase());
  const map: Record<string, number> = {};

  for (const [canonical, aliases] of Object.entries(HEADER_ALIASES)) {
    const index = normalized.findIndex((h) => aliases.includes(h));
    if (index !== -1) map[canonical] = index;
  }

  const missing = REQUIRED.filter((key) => !(key in map));
  if (missing.length > 0) {
    throw new QueueError(
      [
        `Could not find required column(s): ${missing.join(", ")}`,
        ``,
        `Headers found in the CSV:`,
        ...header.map((h) => `  - ${h}`),
        ``,
        `Accepted spellings for the missing columns:`,
        ...missing.map((k) => `  ${k}: ${HEADER_ALIASES[k].join(" | ")}`),
        ``,
        `Either rename the spreadsheet column or add an alias to HEADER_ALIASES`,
        `in scripts/posters/queue.ts.`,
      ].join("\n"),
    );
  }

  return map;
}

/** "Jane Doe | Example Lab" per line, or comma-separated as a fallback. */
function parseAuthors(raw: string): { name: string; affiliation?: string }[] {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const source = lines.length > 1 || raw.includes("|") ? lines : raw.split(",");

  return source
    .map((entry) => {
      const [name, affiliation] = entry.split("|").map((p) => p.trim());
      if (!name) return null;
      return affiliation ? { name, affiliation } : { name };
    })
    .filter((a): a is { name: string; affiliation?: string } => a !== null);
}

export type ReadResult = {
  rows: QueueRow[];
  errors: string[];
  skipped: number;
  /** Rows whose title changed after publication; the old slug was retained. */
  keptSlugs: string[];
  /**
   * Old slugs deliberately vacated by an authorised --allow-slug-change.
   * The permalink-removal guard subtracts these: moving a URL necessarily
   * removes the old one, and that operation was already authorised by its own
   * flag. Requiring both flags for one intent would just train people to pass
   * both every time.
   */
  movedSlugs: string[];
};

export function readQueue(
  csvPath: string,
  options: { allowSlugChange?: boolean; dataPath?: URL | string } = {},
): ReadResult {
  const published = publishedSlugsById(options.dataPath);
  const keptSlugs: string[] = [];
  const movedSlugs: string[] = [];
  const table = parseCsv(readFileSync(csvPath, "utf8"));
  if (table.length === 0) throw new QueueError(`${csvPath} is empty.`);

  const col = resolveHeaders(table[0]);
  const cell = (row: string[], key: string): string =>
    key in col ? (row[col[key]] ?? "").trim() : "";

  const rows: QueueRow[] = [];
  const errors: string[] = [];
  let skipped = 0;

  const seenSlug = new Map<string, number>();
  const seenUrl = new Map<string, number>();
  const seenTitle = new Map<string, number>();
  const seenPosterNumber = new Map<string, number>();

  table.slice(1).forEach((raw, index) => {
    const rowNumber = index + 2; // header is row 1
    if (!TRUTHY.has(cell(raw, "publish").toLowerCase())) {
      skipped += 1;
      return;
    }

    const title = cell(raw, "title");
    const abstract = cell(raw, "abstract");
    const sourceUrl = cell(raw, "sourceUrl");
    const authors = parseAuthors(cell(raw, "authors"));
    const fail = (msg: string) => errors.push(`row ${rowNumber}: ${msg}`);

    const sourceId = driveFileId(sourceUrl);
    if (sourceUrl && !sourceId) {
      fail("could not extract a Google Drive file ID from Poster Link");
    }

    const suppliedSlug = cell(raw, "slug");
    const requestedSlug = slugify(suppliedSlug || title);
    const alreadyPublished = sourceId ? published.get(sourceId) : undefined;

    // Once a poster is published its permalink is frozen — including against an
    // edited Slug cell. A column humans can edit is a weaker guarantee than one
    // they cannot, so moving a live URL takes an explicit flag, not a cell edit.
    //
    // The published slug is the default for EVERY published row. --allow-slug-change
    // authorises one specific Slug-column edit; it must not become a licence to
    // reslug every title-corrected poster that happens to be in the same run.
    let slug = requestedSlug;
    if (alreadyPublished) {
      const explicitChange = Boolean(suppliedSlug) && requestedSlug !== alreadyPublished;

      if (explicitChange && options.allowSlugChange) {
        slug = requestedSlug;
        movedSlugs.push(alreadyPublished);
      } else if (explicitChange) {
        slug = alreadyPublished;
        fail(
          `slug change from "${alreadyPublished}" to "${requestedSlug}" ` +
            `would break shared links — re-run with --allow-slug-change to confirm`,
        );
      } else {
        slug = alreadyPublished;
        if (!suppliedSlug && requestedSlug !== alreadyPublished) {
          keptSlugs.push(
            `row ${rowNumber}: kept published slug "${alreadyPublished}" ` +
              `(title now suggests "${requestedSlug}")`,
          );
        }
      }
    }

    if (!title) fail("title is empty");
    if (authors.length === 0) fail("no authors could be parsed");

    // The abstract is load-bearing: image posters have no text layer, so this
    // is the only machine-readable description of the work that exists.
    if (!abstract) {
      fail("abstract is empty");
    } else if (PLACEHOLDER_ABSTRACTS.includes(abstract.toLowerCase().replace(/\.$/, ""))) {
      fail(`abstract is a placeholder (${JSON.stringify(abstract)}) — needs real text`);
    } else if (abstract.length < 40) {
      fail(`abstract is only ${abstract.length} characters — needs real text`);
    }

    if (!sourceUrl) {
      fail("poster link is empty");
    } else if (!/^https:\/\/(drive|docs)\.google\.com\//.test(sourceUrl)) {
      fail(`poster link is not a Google Drive URL: ${sourceUrl}`);
    } else if (/\/file\/d\/[^/]+\/?$/.test(sourceUrl)) {
      fail("poster link looks hand-built — paste the full URL from Drive's Copy link");
    }

    if (!slug) fail("could not derive a slug from the title");
    else if (RESERVED_IDS.has(anchorId(slug))) {
      fail(
        `slug "${slug}" produces the reserved page anchor "${anchorId(slug)}" — set a different Slug`,
      );
    }


    const dupe = (map: Map<string, number>, key: string, label: string) => {
      if (!key) return;
      const first = map.get(key);
      if (first !== undefined) fail(`duplicate ${label} — also on row ${first}`);
      else map.set(key, rowNumber);
    };
    dupe(seenSlug, slug, "slug");
    dupe(seenUrl, sourceId ?? sourceUrl, "Drive file");
    dupe(seenTitle, title.toLowerCase(), "title");

    const numberRaw = cell(raw, "posterNumber");
    let posterNumber: number | undefined;
    if (numberRaw) {
      if (!/^[1-9]\d{0,2}$/.test(numberRaw)) {
        // Rejects 0, 00, 001 as well as "P-2" — a leading zero means someone
        // is formatting in the sheet, and the page already renders P-01.
        fail(`poster number ${JSON.stringify(numberRaw)} must be an integer from 1 to 999`);
      } else {
        posterNumber = Number(numberRaw);
        const key = `${EVENT_ID}:${posterNumber}`;
        const first = seenPosterNumber.get(key);
        if (first !== undefined) {
          fail(`duplicate poster number ${posterNumber} for ${EVENT_ID} — also on row ${first}`);
        } else {
          seenPosterNumber.set(key, rowNumber);
        }
      }
    }

    rows.push({
      rowNumber,
      event: EVENT_ID,
      slug,
      title,
      authors,
      abstract: abstract.replace(/\r\n/g, "\n").trim(),
      keywords: cell(raw, "keywords")
        .split(/[,;\n]/)
        .map((k) => k.trim())
        .filter(Boolean),
      sourceUrl,
      driveFileId: sourceId ?? "",
      posterNumber,
    });
  });

  return { rows, errors, skipped, keptSlugs, movedSlugs };
}
