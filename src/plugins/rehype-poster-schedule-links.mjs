import { basename, extname } from "node:path";
import { posterEvents } from "../data/poster-events.ts";
import { posters } from "../data/posters.ts";

const posterScheduleHeading = "Poster Presentation Schedule";
const minimumMatchConfidence = 0.78;

function textContent(node) {
  if (node.type === "text") return node.value;
  if (!("children" in node)) return "";
  return node.children.map(textContent).join("");
}

function normalizeTitle(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleSimilarity(left, right) {
  if (left === right) return 1;

  const shorter = left.length <= right.length ? left : right;
  const longer = left.length > right.length ? left : right;
  if (shorter.length >= 20 && longer.includes(shorter)) return 0.99;

  const leftTokens = new Set(left.split(" "));
  const rightTokens = new Set(right.split(" "));
  const shared = [...leftTokens].filter((token) => rightTokens.has(token)).length;
  return (2 * shared) / (leftTokens.size + rightTokens.size);
}

function collectPosterTitles(node, entries) {
  if (!("children" in node)) return;

  for (const child of node.children) {
    if (child.type === "element" && child.tagName === "strong") {
      const title = textContent(child).trim();
      if (title) entries.push({ node: child, title });
      continue;
    }

    collectPosterTitles(child, entries);
  }
}

function eventIdForFile(file) {
  const filePath = file.path || file.history?.[0];
  if (!filePath) return undefined;

  const stem = basename(filePath, extname(filePath));
  const normalizedStem = normalizeTitle(stem).replaceAll(" ", "");
  return posterEvents.find(
    (event) => normalizeTitle(event.id).replaceAll(" ", "") === normalizedStem,
  )?.id;
}

function matchPostersToSchedule(entries, eventPosters) {
  const candidates = entries.flatMap((entry, entryIndex) =>
    eventPosters.map((poster, posterIndex) => ({
      entryIndex,
      posterIndex,
      similarity: titleSimilarity(normalizeTitle(entry.title), normalizeTitle(poster.title)),
    })),
  );
  candidates.sort((left, right) => right.similarity - left.similarity);

  const matchedEntries = new Set();
  const matchedPosters = new Set();

  for (const candidate of candidates) {
    if (candidate.similarity < minimumMatchConfidence) break;
    if (
      matchedEntries.has(candidate.entryIndex) ||
      matchedPosters.has(candidate.posterIndex)
    ) {
      continue;
    }

    const entry = entries[candidate.entryIndex];
    const poster = eventPosters[candidate.posterIndex];
    entry.node.children = [
      {
        type: "element",
        tagName: "a",
        properties: { href: `/posters/${poster.slug}/` },
        children: entry.node.children,
      },
    ];
    matchedEntries.add(candidate.entryIndex);
    matchedPosters.add(candidate.posterIndex);
  }

  // Schedule links are progressive enhancement. The Form response title may
  // differ from the final schedule title, and a valid archive entry may not
  // have a schedule slot at all. Only confident matches are linked; unmatched
  // posters remain fully available through the archive and event poster grid.
}

export default function rehypePosterScheduleLinks() {
  return (tree, file) => {
    let inPosterSchedule = false;
    let foundPosterSchedule = false;
    const entries = [];

    for (const node of tree.children) {
      if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
        const depth = Number(node.tagName.slice(1));
        const heading = textContent(node).trim();

        if (heading === posterScheduleHeading) {
          inPosterSchedule = true;
          foundPosterSchedule = true;
          continue;
        }

        if (inPosterSchedule && depth <= 3) {
          inPosterSchedule = false;
        }
      }

      if (inPosterSchedule && node.type === "element" && node.tagName === "table") {
        collectPosterTitles(node, entries);
      }
    }

    if (!foundPosterSchedule) return;

    const eventId = eventIdForFile(file);
    const eventPosters = eventId
      ? posters.filter((poster) => poster.event === eventId)
      : posters;
    matchPostersToSchedule(entries, eventPosters);
  };
}
