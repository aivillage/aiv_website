export type EventPosterPlacement = "inline" | "fallback" | "none";

const validPlacement = /^[ ]{0,3}<EventPosters\s*\/>[ \t]*$/;
const openingFence = /^[ ]{0,3}(`{3,}|~{3,})/;

export function resolveEventPosterPlacement(options: {
  body: string;
  filePath?: string;
  hasPosterEvent: boolean;
}): EventPosterPlacement {
  let fenceCharacter: "`" | "~" | undefined;
  let fenceLength = 0;
  let placementCount = 0;

  for (const line of options.body.split(/\r?\n/)) {
    if (fenceCharacter) {
      const closingFence = line.match(/^[ ]{0,3}(`+|~+)[ \t]*$/)?.[1];
      if (
        closingFence?.[0] === fenceCharacter &&
        closingFence.length >= fenceLength
      ) {
        fenceCharacter = undefined;
        fenceLength = 0;
      }
      continue;
    }

    const fence = line.match(openingFence)?.[1];
    if (fence) {
      fenceCharacter = fence[0] as "`" | "~";
      fenceLength = fence.length;
      continue;
    }

    if (line.startsWith("\t") || line.startsWith("    ")) {
      continue;
    }

    if (validPlacement.test(line)) {
      placementCount += 1;
      continue;
    }

    const trimmed = line.trim();
    if (
      trimmed.startsWith("<EventPosters") ||
      trimmed.startsWith("</EventPosters")
    ) {
      throw new Error(
        "Event poster placement must use a standalone <EventPosters /> component with no props.",
      );
    }
  }

  if (placementCount > 1) {
    throw new Error(
      "Event content may contain at most one <EventPosters /> component.",
    );
  }

  if (placementCount === 1) {
    if (!options.filePath) {
      throw new Error(
        "The <EventPosters /> component requires a local event file path.",
      );
    }
    if (!options.filePath.toLowerCase().endsWith(".mdx")) {
      throw new Error(
        "The <EventPosters /> component requires an .mdx event file.",
      );
    }
    if (!options.hasPosterEvent) {
      throw new Error(
        "The <EventPosters /> component was used, but this event has no poster-event configuration.",
      );
    }
    return "inline";
  }

  return options.hasPosterEvent ? "fallback" : "none";
}
