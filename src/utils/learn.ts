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

export function glossaryPath(entry: { id: string; data: object }) {
  return `/learn/glossary/#${entrySlug(entry)}`;
}

export function isPlaylistResource(entry: { data: { resourceType?: string; mediaType?: string } }) {
  return entry.data.resourceType === "playlist" || entry.data.mediaType === "playlist";
}

type ResourceReferenceLike = string | { id?: string; slug?: string };

type ModuleVideoLike = {
  id: string;
  data: {
    slug?: string;
    status?: string;
    resources?: Array<{
      resource: ResourceReferenceLike;
      role?: string;
      step?: number;
    }>;
  };
};

type AcceptedVideoLike = {
  id: string;
  data: {
    slug?: string;
    title?: string;
    provider?: string;
    creator?: string;
    attribution?: string;
    canonicalFor?: string[];
    sourcePlatform?: string;
    mediaType?: string;
    resourceType?: string;
    embedAllowed?: boolean;
    reviewStatus?: string;
    accessMode?: string;
    loginRequired?: boolean;
    ageRestricted?: boolean;
    status?: string;
    rightsMode?: string;
    videoId?: string;
    featuredEmbed?: boolean;
  };
};

type ModuleWatchTrackLike = {
  id: string;
  data: {
    slug?: string;
    status?: string;
  };
};

type ModuleWatchTargetOptions<TTrack extends ModuleWatchTrackLike> = {
  governingTrack?: TTrack;
  relatedTracks?: TTrack[];
};

const blockedVideoSurfacePattern = /hackaprompt|dreadnode|crucible|ctf/i;
const hiddenVideoStatuses = new Set(["draft", "coming_soon", "deferred", "rejected"]);
const moduleResourceRoleRank: Record<string, number> = {
  required: 0,
  optional: 1,
  deeper: 2,
};

function resourceIdentityText(resource: AcceptedVideoLike) {
  return [
    resource.id,
    resource.data.slug,
    resource.data.title,
    resource.data.provider,
    resource.data.creator,
    resource.data.attribution,
    ...(resource.data.canonicalFor || []),
  ].filter(Boolean).join(" ");
}

function moduleResourceLinks(module: ModuleVideoLike) {
  return (module.data.resources || []).map((link, sourceIndex) => ({ ...link, sourceIndex }));
}

function resourceMapByRef<TResource extends AcceptedVideoLike>(resources: TResource[]) {
  return new Map(resources.flatMap((resource) => [[entrySlug(resource), resource], [resource.id, resource]]));
}

export function hasAcceptedEmbeddableVideo(resource: AcceptedVideoLike) {
  const type = resource.data.mediaType || resource.data.resourceType;

  return Boolean(
    resource.data.sourcePlatform === "youtube" &&
    type === "video" &&
    resource.data.embedAllowed === true &&
    resource.data.reviewStatus === "accepted" &&
    resource.data.accessMode === "direct_open" &&
    resource.data.loginRequired === false &&
    resource.data.ageRestricted === false &&
    resource.data.videoId &&
    resource.data.rightsMode === "official_embed" &&
    !hiddenVideoStatuses.has(resource.data.status || "") &&
    !blockedVideoSurfacePattern.test(resourceIdentityText(resource)),
  );
}

export function getModuleAcceptedVideos<TModule extends ModuleVideoLike, TResource extends AcceptedVideoLike>(
  module: TModule,
  resources: TResource[],
) {
  const byRef = resourceMapByRef(resources);
  const seen = new Set<string>();

  return moduleResourceLinks(module)
    .map((link) => ({
      link,
      resource: byRef.get(refId(link.resource)),
    }))
    .filter((item): item is { link: ReturnType<typeof moduleResourceLinks>[number]; resource: TResource } =>
      Boolean(item.resource && hasAcceptedEmbeddableVideo(item.resource))
    )
    .sort((left, right) =>
      (moduleResourceRoleRank[left.link.role || "deeper"] - moduleResourceRoleRank[right.link.role || "deeper"]) ||
      ((left.link.step ?? left.link.sourceIndex + 10000) - (right.link.step ?? right.link.sourceIndex + 10000)) ||
      ((right.resource.data.featuredEmbed ? 1 : 0) - (left.resource.data.featuredEmbed ? 1 : 0)) ||
      ((left.resource.data.title || "").localeCompare(right.resource.data.title || ""))
    )
    .map(({ resource }) => resource)
    .filter((resource) => {
      const key = entrySlug(resource);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export function getModuleFeaturedVideo<TModule extends ModuleVideoLike, TResource extends AcceptedVideoLike>(
  module: TModule,
  resources: TResource[],
) {
  const acceptedVideos = getModuleAcceptedVideos(module, resources);
  return acceptedVideos.find((resource) => resource.data.featuredEmbed) || acceptedVideos[0];
}

export function getModuleWatchTarget<
  TModule extends ModuleVideoLike,
  TResource extends AcceptedVideoLike,
  TTrack extends ModuleWatchTrackLike,
>(
  module: TModule,
  resources: TResource[],
  options: ModuleWatchTargetOptions<TTrack> = {},
) {
  if (module.data.status === "coming_soon") return undefined;
  if (options.governingTrack?.data.status === "coming_soon") return undefined;
  if (!options.governingTrack && options.relatedTracks?.some((track) => track.data.status === "coming_soon")) return undefined;

  const resource = getModuleFeaturedVideo(module, resources);
  if (!resource) return undefined;

  return {
    resource,
    href: `${options.governingTrack ? trackScopedModulePath(options.governingTrack, module) : modulePath(module)}#watch`,
  };
}

export function moduleHasWatchAnchor<
  TModule extends ModuleVideoLike,
  TResource extends AcceptedVideoLike,
  TTrack extends ModuleWatchTrackLike,
>(
  module: TModule,
  resources: TResource[],
  options: ModuleWatchTargetOptions<TTrack> = {},
) {
  return Boolean(getModuleWatchTarget(module, resources, options));
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

type ArtifactModuleLike = { id: string; data: { slug?: string; requiredArtifact?: string } };
type ArtifactTrackLike = { id: string; data: { slug?: string; trackKind?: string; title?: string } };

const genericArtifactFields = ["artifact", "evidence", "limitation", "owner/reviewer", "next question"];

const artifactFieldsByTrack: Record<string, string[]> = {
  "ai-practitioner": ["workflow", "AI assistance step", "allowed data", "review step", "owner", "escalation"],
  "ai-builder-core": ["boundary", "input", "output", "control", "evidence"],
  "agentic-ai-advanced-builder": [
    "user goal",
    "workflow-vs-agent justification",
    "tools",
    "side effects",
    "memory classes",
    "RAG sources",
    "approval gates",
    "observability plan",
    "eval plan",
    "MCP servers/scopes",
    "rollback",
    "kill switch",
  ],
  "evals-reliability-grt": [
    "behavior tested",
    "system/model version",
    "dataset provenance",
    "solver",
    "scorer/metric",
    "representative failures",
    "limitations",
    "decision supported",
    "decision not supported",
    "next test",
  ],
  "ai-security-core": ["system boundary", "risk category", "evidence", "control", "owner", "review question"],
  "offensive-ai-security-red-teaming": ["finding", "scope", "evidence", "impact", "mapping", "mitigation", "regression test", "disclosure boundary"],
  "defensive-ai-engineering": ["risk pattern", "defensive control", "log signal", "regression test", "owner", "escalation path"],
  "governance-responsible-use": ["use case", "framework", "owner", "evidence", "caveat", "review cadence"],
};

const artifactFieldsByModule: Record<string, string[]> = {
  "prompting-context": ["task", "allowed context", "excluded context", "expected format", "human review step"],
  "ai-assisted-research": ["claim", "source", "quote or evidence", "confidence", "human verification status"],
  "data-hygiene": ["input class", "allowed tool tier", "restricted data", "retention concern", "escalation owner"],
  "verification-human-review": ["factual claim", "source check", "calculation check", "external reference check", "red-line failure condition"],
  "ai-workflow-policy-basics": ["workflow", "allowed tools", "allowed data", "review level", "recordkeeping", "escalation"],
  "ai-app-architecture": ["user input", "model call", "retrieval boundary", "tool boundary", "logging", "human review"],
  "structured-outputs": ["schema", "reject cases", "unauthorized valid output", "validation rule"],
  "rag-basics": ["approved source", "retrieval method", "metadata filter", "citation/source label", "fallback behavior"],
  "vector-search-retrieval": ["approved source", "retrieval method", "metadata filter", "citation/source label", "fallback behavior"],
  "tool-calling-basics": ["allowed action", "required input", "authorization check", "approval gate", "failure handling"],
  "basic-app-evals": ["behavior tested", "dataset/sample", "expected outcome", "failure meaning", "next regression"],
  "observability-cost": ["trace field", "redaction rule", "cost signal", "owner", "alert threshold"],
  "eval-cards": [
    "behavior tested",
    "system/model version",
    "dataset provenance",
    "solver",
    "scorer/metric",
    "representative failures",
    "limitations",
    "decision supported",
    "decision not supported",
    "next test",
  ],
  "grt-style-findings": ["claim", "evidence", "samples", "reproducibility path", "limitations", "severity/importance framing", "follow-up action"],
  "mitre-atlas-mapping": ["OWASP category", "ATLAS mapping", "NIST function", "control evidence", "uncertainty"],
  "nist-ai-rmf-genai-profile": ["OWASP category", "ATLAS mapping", "NIST function", "control evidence", "uncertainty"],
  "rules-of-engagement-lab-safety": ["scope", "authorized target", "allowed actions", "disallowed actions", "stop conditions", "reporting path"],
  "red-team-report-writing": ["finding", "scope", "evidence", "impact", "mapping", "mitigation", "regression test", "disclosure boundary"],
  "secure-tool-use": ["tool", "identity", "allowed action", "denied action", "approval condition", "audit event"],
  "detection-logging": ["event field", "trace/span", "redaction rule", "alert condition", "retention/access rule"],
};

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

export function artifactFieldsForModule<TModule extends ArtifactModuleLike, TTrack extends ArtifactTrackLike>(
  module: TModule,
  track?: TTrack,
) {
  const moduleSlug = entrySlug(module);
  const trackSlug = track ? entrySlug(track) : "";
  return artifactFieldsByModule[moduleSlug] || artifactFieldsByTrack[trackSlug] || genericArtifactFields;
}
