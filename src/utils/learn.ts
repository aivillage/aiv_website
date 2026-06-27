export const stageLabels: Record<string, string> = {
  explorer: "Explorer",
  ai_literate: "AI literate",
  ai_practitioner: "AI practitioner",
  builder: "Builder",
  risk_evaluative_practitioner: "Risk-evaluative practitioner",
  specialist_contributor: "Specialist contributor",
};

export const difficultyLabels: Record<string, string> = {
  intro: "Intro",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

export const statusLabels: Record<string, string> = {
  draft: "Draft",
  coming_soon: "Coming Soon",
  beta: "Beta",
  stable: "Stable",
  stale: "Needs review",
};

export const securityLensLabels: Record<string, string> = {
  none: "No added lens",
  awareness: "Security awareness",
  required: "Security checkpoint",
  primary: "Security track",
};

export const rightsLabels: Record<string, string> = {
  link_only: "Link only",
  official_embed: "Official embed",
  copy_adapt: "Copy/adapt",
  internal: "Internal",
  unknown: "Unknown",
};

export const costLabels: Record<string, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const moduleTypeLabels: Record<string, string> = {
  concept: "Concept",
  practice: "Practice",
  lab: "Lab",
  case_study: "Case study",
  checkpoint: "Checkpoint",
  capstone: "Capstone",
};

export function formatLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function refId(ref: unknown) {
  if (typeof ref === "string") return ref;
  if (ref && typeof ref === "object" && "id" in ref && typeof ref.id === "string") return ref.id;
  if (ref && typeof ref === "object" && "slug" in ref && typeof ref.slug === "string") return ref.slug;
  return "";
}

export function entrySlug(entry: { id: string; data: object }) {
  const slug = "slug" in entry.data && typeof entry.data.slug === "string" ? entry.data.slug : "";
  return slug || entry.id.replace(/\.(md|mdx|markdown)$/i, "");
}

export function isPublicLearnEntry(entry: { data: { status?: string } }) {
  return entry.data.status !== "draft";
}

export function canRenderLearnModule(entry: { data: { status?: string } }) {
  return isPublicLearnEntry(entry);
}

export function canRenderLearnTrack(entry: { data: { status?: string } }) {
  return isPublicLearnEntry(entry);
}

export function modulePath(entry: { id: string; data: object }) {
  return `/learn/modules/${entrySlug(entry)}/`;
}

export function trackPath(entry: { id: string; data: object }) {
  return `/learn/tracks/${entrySlug(entry)}/`;
}

export function byTitle<T extends { data: { title?: string; term?: string } }>(left: T, right: T) {
  return (left.data.title || left.data.term || "").localeCompare(right.data.title || right.data.term || "");
}

export function byTrackKindThenTitle<T extends { data: { trackKind?: string; title: string } }>(left: T, right: T) {
  return `${left.data.trackKind || ""} ${left.data.title}`.localeCompare(`${right.data.trackKind || ""} ${right.data.title}`);
}
