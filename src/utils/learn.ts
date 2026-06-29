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

export const accessModeLabels: Record<string, string> = {
  direct_open: "No account required",
  free_account_required: "Free account required",
  application_or_cohort: "Application/cohort",
  scheduled_or_live: "Scheduled/live",
  paid_or_freemium: "Extra/off-ramp",
  unclear: "Extra/off-ramp",
};

export function resourceActionLabel(resource: { data: { mediaType?: string; resourceType?: string } }) {
  const type = resource.data.mediaType || resource.data.resourceType;
  if (type === "video" || type === "playlist") return "Watch";
  if (type === "lab") return "Practice";
  if (type === "tool" || type === "repo") return "Build checkpoint";
  return "Read";
}

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

export function canRenderLearnLab(entry: { data: { status?: string } }) {
  return isPublicLearnEntry(entry);
}

export function modulePath(entry: { id: string; data: object }) {
  return `/learn/modules/${entrySlug(entry)}/`;
}

export function trackScopedModulePath(track: { id: string; data: object } | string, module: { id: string; data: object } | string) {
  const trackSlug = typeof track === "string" ? track : entrySlug(track);
  const moduleSlug = typeof module === "string" ? module : entrySlug(module);
  return `/learn/tracks/${trackSlug}/modules/${moduleSlug}/`;
}

export function trackPath(entry: { id: string; data: object }) {
  return `/learn/tracks/${entrySlug(entry)}/`;
}

export function labPath(entry: { id: string; data: object }) {
  return `/learn/labs/${entrySlug(entry)}/`;
}

export function resourcePath(entry: { id: string; data: object }) {
  return `/learn/resources/${entrySlug(entry)}/`;
}

export function seriesPath(entryOrSlug: { id: string; data: object } | string) {
  const slug = typeof entryOrSlug === "string" ? entryOrSlug : entrySlug(entryOrSlug);
  return `/learn/series/${slug}/`;
}

export function byTitle<T extends { data: { title?: string; term?: string } }>(left: T, right: T) {
  return (left.data.title || left.data.term || "").localeCompare(right.data.title || right.data.term || "");
}

export function byTrackKindThenTitle<T extends { data: { trackKind?: string; title: string } }>(left: T, right: T) {
  return `${left.data.trackKind || ""} ${left.data.title}`.localeCompare(`${right.data.trackKind || ""} ${right.data.title}`);
}

type ReferenceLike = string | { id?: string; slug?: string };
type ModuleLike = { id: string; data: { slug?: string; status?: string } };
type TrackLike = { id: string; data: { slug?: string; status?: string; canonicalModules: ReferenceLike[]; title?: string } };

export function moduleSequenceForTrack<TModule extends ModuleLike, TTrack extends TrackLike>(track: TTrack, moduleBySlug: Map<string, TModule>) {
  return track.data.canonicalModules
    .map((moduleRef) => moduleBySlug.get(refId(moduleRef)))
    .filter((module): module is TModule => {
      if (!module) return false;
      return module.data.status !== "draft";
    });
}

export function findPublicCanonicalTracksForModule<TModule extends ModuleLike, TTrack extends TrackLike>(module: TModule, tracks: TTrack[]) {
  const moduleSlug = entrySlug(module);
  return tracks.filter((track) =>
    canRenderLearnTrack(track) &&
    track.data.canonicalModules.some((moduleRef) => refId(moduleRef) === moduleSlug)
  );
}

export function previousNextModulesInTrack<TModule extends ModuleLike, TTrack extends TrackLike>(
  module: TModule,
  track: TTrack,
  moduleBySlug: Map<string, TModule>,
) {
  const sequence = moduleSequenceForTrack(track, moduleBySlug);
  const moduleSlug = entrySlug(module);
  const moduleIndex = sequence.findIndex((candidate) => entrySlug(candidate) === moduleSlug);

  return {
    moduleIndex,
    moduleCount: sequence.length,
    previousModule: moduleIndex > 0 ? sequence[moduleIndex - 1] : undefined,
    nextModule: moduleIndex >= 0 && moduleIndex < sequence.length - 1 ? sequence[moduleIndex + 1] : undefined,
    sequence,
  };
}

export function maybePrimaryTrackForModule<TModule extends ModuleLike, TTrack extends TrackLike>(module: TModule, tracks: TTrack[]) {
  const canonicalTracks = findPublicCanonicalTracksForModule(module, tracks);
  return canonicalTracks.length === 1 ? canonicalTracks[0] : undefined;
}
