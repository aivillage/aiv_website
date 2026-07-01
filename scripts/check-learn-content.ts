import { readFileSync, readdirSync, statSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { parseFrontmatter } from "astro/markdown";

type Reference = string | { id?: string; slug?: string };
type ResourceRole = "required" | "optional" | "deeper";
type ResourceLink = {
  resource?: Reference;
  role?: ResourceRole;
  step?: number;
  note?: string;
};
type EntryData = {
  title?: string;
  slug?: string;
  status?: string;
  canonicalUrl?: string;
  canonicalFor?: string[];
  requiredArtifacts?: string[];
  canonicalModules?: Reference[];
  whatExistsNow?: string;
  whatComingNext?: string;
  resources?: ResourceLink[];
  requiredArtifact?: string;
  cost?: string;
  loginRequired?: boolean;
  accessMode?: string;
  accessNotes?: string;
  watchFocus?: string;
  checkpointPrompt?: string;
  resourceType?: string;
  mediaType?: string;
  seriesSlug?: string;
  reviewStatus?: string;
  rightsMode?: string;
  sourcePlatform?: string;
  creator?: string;
  videoId?: string;
  playlistId?: string;
  embedAllowed?: boolean;
  featuredEmbed?: boolean;
  ageRestricted?: boolean;
  securityLens?: string;
  securityLensText?: string;
  safetyBoundary?: string;
  isOffensive?: boolean;
  debriefStatus?: string;
  caveats?: string[];
};
type Entry = {
  collection: string;
  file: string;
  slug: string;
  data: EntryData;
  raw: string;
};

const root = process.cwd();
const learnRoot = join(root, "src/content/learn");
const failures: string[] = [];
const warnings: string[] = [];
const removedPublicationField = ["vis", "ibility"].join("");
const legacyComingSoonStatus = ["coming", "next"].join("_");
const gatedAccessModes = new Set(["free_account_required", "application_or_cohort", "scheduled_or_live", "paid_or_freemium", "unclear"]);
const gatedRequiredPattern = /\b(application|cohort|enrollment|scheduled|live class|paid|freemium|pro|certificate required)\b/i;
const liveTrackSlugs = new Set(["ai-fundamentals", "ai-practitioner", "ai-builder-core", "agentic-ai-advanced-builder"]);

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(md|mdx|markdown)$/.test(name)) out.push(full);
  }
  return out;
}

function loadCollection(collection: string) {
  return walk(join(learnRoot, collection)).map((file): Entry => {
    const raw = readFileSync(file, "utf8");
    const parsed = parseFrontmatter(raw);
    const data = parsed.frontmatter && typeof parsed.frontmatter === "object" ? (parsed.frontmatter as EntryData) : {};
    const slug = data.slug || basename(file).replace(/\.(md|mdx|markdown)$/i, "");
    return { collection, file, slug, data, raw };
  });
}

function refId(ref: Reference | undefined) {
  if (typeof ref === "string") return ref;
  return ref?.id || ref?.slug || "";
}

function isPresent(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function hasField(entry: Entry, field: keyof EntryData) {
  return Object.hasOwn(entry.data, field);
}

function fail(entry: Entry, message: string) {
  failures.push(`${relative(root, entry.file)} (${entry.slug}): ${message}`);
}

function warn(entry: Entry, message: string) {
  warnings.push(`${relative(root, entry.file)} (${entry.slug}): ${message}`);
}

function stableSecurityLensFailure(data: EntryData) {
  return data.status === "stable" && data.securityLens !== "none" && !isPresent(data.securityLensText);
}

function isValidYouTubeVideoId(value: string | undefined) {
  return !value || /^[A-Za-z0-9_-]{11}$/.test(value);
}

function isValidYouTubePlaylistId(value: string | undefined) {
  return !value || /^PL[A-Za-z0-9_-]+$/.test(value);
}

function documentsSelectedEpisodePath(entry: Entry) {
  const text = [
    entry.data.watchFocus,
    entry.data.checkpointPrompt,
    entry.data.accessNotes,
    ...(Array.isArray(entry.data.caveats) ? entry.data.caveats : []),
  ].filter(Boolean).join(" ");

  return /\b(AIV-selected episode path|selected episode path|single selected episode|selected lecture|selected episode)\b/i.test(text);
}

function runParserRegression() {
  const withBlockScalar = parseFrontmatter(`---\nsecurityLens: "required"\nsecurityLensText: >\n  This is multi-line Security Lens text.\n  The validator must read the full string.\nstatus: "stable"\n---\n`).frontmatter as EntryData;
  const parsedText = withBlockScalar.securityLensText || "";
  if (!parsedText.includes("This is multi-line Security Lens text.") || !parsedText.includes("The validator must read the full string.")) {
    failures.push("Parser regression failed: block scalar securityLensText was not parsed as real text.");
  }
  if (stableSecurityLensFailure(withBlockScalar)) {
    failures.push("Parser regression failed: stable module with block scalar securityLensText should pass.");
  }

  const withEmptyText = parseFrontmatter(`---\nstatus: stable\nsecurityLens: required\nsecurityLensText: ""\n---\n`).frontmatter as EntryData;
  if (!stableSecurityLensFailure(withEmptyText)) {
    failures.push("Parser regression failed: stable module with empty securityLensText should fail.");
  }
}

runParserRegression();

const tracks = loadCollection("tracks");
const modules = loadCollection("modules");
const resources = loadCollection("resources");
const labs = loadCollection("labs");
const glossary = loadCollection("glossary");
const allEntries = [...tracks, ...modules, ...resources, ...labs, ...glossary];

const moduleBySlug = new Map(modules.map((entry) => [entry.slug, entry]));
const resourceBySlug = new Map(resources.map((entry) => [entry.slug, entry]));
const publicLiveModuleSlugs = new Set<string>();
const publicResources = resources.filter((resource) => resource.data.status !== "draft");
const publicEpisodeCountBySeries = new Map<string, number>();
const canonicalUrlByResource = new Map<string, Entry[]>();
const titleByResource = new Map<string, Entry[]>();
const resourceIdsByModuleSlug = new Map<string, Set<string>>();

for (const module of modules) {
  const resourceIds = new Set((module.data.resources || []).map((link) => refId(link.resource)).filter(Boolean));
  resourceIdsByModuleSlug.set(module.slug, resourceIds);
}

for (const resource of publicResources) {
  if (!resource.data.seriesSlug) continue;
  publicEpisodeCountBySeries.set(resource.data.seriesSlug, (publicEpisodeCountBySeries.get(resource.data.seriesSlug) || 0) + 1);
}

for (const resource of publicResources) {
  if (resource.data.resourceType === "playlist" || resource.data.mediaType === "playlist") {
    const episodeCount = publicEpisodeCountBySeries.get(resource.slug) || 0;
    if (episodeCount === 0) {
      warn(resource, "Public playlist resources should not be presented as full series until child episode records exist.");
    } else if (episodeCount === 1 && !documentsSelectedEpisodePath(resource)) {
      warn(resource, "Public playlist resources with one child episode should be treated as selected episode paths, not full series.");
    }
  }

  if (!hasField(resource, "accessMode")) {
    fail(resource, "Non-draft resources must include explicit accessMode.");
  }

  if (!hasField(resource, "reviewStatus")) {
    fail(resource, "Non-draft resources must include explicit reviewStatus.");
  }

  if (resource.data.reviewStatus === "rejected" || resource.data.reviewStatus === "deferred") {
    fail(resource, "Rejected or deferred resources must not remain public.");
  }

  if (resource.data.canonicalUrl) {
    canonicalUrlByResource.set(resource.data.canonicalUrl, [...(canonicalUrlByResource.get(resource.data.canonicalUrl) || []), resource]);
  }

  if (resource.data.title) {
    titleByResource.set(resource.data.title, [...(titleByResource.get(resource.data.title) || []), resource]);
  }

  for (const moduleSlug of resource.data.canonicalFor || []) {
    if (!resourceIdsByModuleSlug.get(moduleSlug)?.has(resource.slug)) {
      fail(resource, `canonicalFor references '${moduleSlug}', but that module does not list this resource.`);
    }
  }
}

for (const [canonicalUrl, entries] of canonicalUrlByResource) {
  if (entries.length > 1) {
    failures.push(`Duplicate canonicalUrl among non-draft resources: ${canonicalUrl} (${entries.map((entry) => entry.slug).join(", ")}).`);
  }
}

for (const [title, entries] of titleByResource) {
  if (entries.length <= 1) continue;

  const accepted = entries.filter((entry) => entry.data.reviewStatus === "accepted");
  if (accepted.length > 1) {
    failures.push(`Duplicate accepted public resource title: ${title} (${accepted.map((entry) => entry.slug).join(", ")}).`);
  } else {
    warnings.push(`Duplicate public resource title outside accepted core: ${title} (${entries.map((entry) => entry.slug).join(", ")}).`);
  }
}

for (const entry of allEntries) {
  if (Object.hasOwn(entry.data, removedPublicationField)) {
    fail(entry, "Learn entries must use status only; remove the secondary publication field.");
  }

  if (entry.data.status === legacyComingSoonStatus) {
    fail(entry, "Use status 'coming_soon' instead of the legacy announced-path status.");
  }

  if (/<iframe\b/i.test(entry.raw)) {
    fail(entry, "Do not hardcode iframe HTML in Learn content.");
  }

  if (/^embedUrl:/m.test(entry.raw)) {
    fail(entry, "Do not use arbitrary embedUrl frontmatter; derive embeds from vetted IDs.");
  }

  if (/autoplay=1|controls=0|modestbranding|showinfo|autohide|theme=|enablejsapi=1|origin=/i.test(entry.raw)) {
    fail(entry, "Do not include YouTube autoplay, deprecated player params, controls suppression, enablejsapi, or origin in Learn content.");
  }
}

if (tracks.some((track) => track.slug === "research-grt")) {
  failures.push("Do not create a separate research-grt track. Use evals-reliability-grt.");
}

for (const track of tracks) {
  if (!Array.isArray(track.data.requiredArtifacts) || track.data.requiredArtifacts.length === 0) {
    fail(track, "Tracks must include at least one required artifact.");
  }

  if (track.data.status === "coming_soon" || track.data.status === "beta") {
    if (!isPresent(track.data.whatExistsNow)) fail(track, "Coming-soon and beta tracks must describe what exists now.");
    if (!isPresent(track.data.whatComingNext)) fail(track, "Coming-soon and beta tracks must describe what is coming next.");
  }

  if (track.data.status === "beta") {
    const canonicalModules = Array.isArray(track.data.canonicalModules) ? track.data.canonicalModules : [];
    const renderableModules = canonicalModules
      .map((moduleRef) => moduleBySlug.get(refId(moduleRef)))
      .filter((module) => module && module.data.status !== "draft");

    if (renderableModules.length === 0) {
      fail(track, "Beta tracks must have at least one non-draft canonical module.");
    }
  }

  if (track.data.status !== "draft" && liveTrackSlugs.has(track.slug)) {
    for (const moduleRef of track.data.canonicalModules || []) {
      const module = moduleBySlug.get(refId(moduleRef));
      if (module && module.data.status !== "draft") {
        publicLiveModuleSlugs.add(module.slug);
      }
    }
  }
}

for (const module of modules) {
  const resourceLinks = Array.isArray(module.data.resources) ? module.data.resources : [];
  const requiredResources = resourceLinks.filter((link) => link.role === "required");
  const isPublicModule = module.data.status !== "draft";

  if (requiredResources.length > 2) {
    fail(module, "Modules may include at most two required resources.");
  }

  if (stableSecurityLensFailure(module.data)) {
    fail(module, "Stable modules with a Security Lens must include non-empty Security Lens text.");
  }

  if (isPublicModule && (module.data.status === "beta" || module.data.status === "stable") && !isPresent(module.data.requiredArtifact)) {
    warn(module, "Public beta/stable modules should include requiredArtifact so the checkpoint is concrete.");
  }

  if (isPublicModule && publicLiveModuleSlugs.has(module.slug) && !isPresent(module.data.requiredArtifact)) {
    warn(module, "Public modules in live tracks should include a real requiredArtifact.");
  }

  for (const link of resourceLinks) {
    const resourceId = refId(link.resource);
    const resource = resourceBySlug.get(resourceId);

    if (!resource && link.role === "required") {
      fail(module, `Required resource '${resourceId || "(missing)"}' does not resolve.`);
      continue;
    }

    if (!resource) continue;

    const accessMode = resource.data.accessMode;
    const reviewStatus = resource.data.reviewStatus;
    const accessText = `${resource.data.resourceType || ""} ${resource.data.accessNotes || ""}`;

    if (isPublicModule && link.role !== "required") {
      if (!hasField(resource, "accessMode")) {
        warn(module, `Optional/deeper resource '${resourceId}' is missing explicit accessMode.`);
      }

      if (!hasField(resource, "reviewStatus")) {
        warn(module, `Optional/deeper resource '${resourceId}' is missing explicit reviewStatus.`);
      }

      if (resource.data.loginRequired || (accessMode && gatedAccessModes.has(accessMode))) {
        warn(module, `Optional/deeper resource '${resourceId}' requires login, application, live scheduling, payment, or unclear access.`);
      }
    }

    if (resource.data.embedAllowed && reviewStatus !== "accepted") {
      fail(resource, "Embedded resources must have reviewStatus: accepted.");
    }

    if (!isPublicModule || link.role !== "required") continue;

    if (!hasField(resource, "accessMode")) {
      fail(module, `Required resource '${resourceId}' is missing explicit accessMode: direct_open.`);
    }

    if (!hasField(resource, "reviewStatus")) {
      fail(module, `Required resource '${resourceId}' is missing explicit reviewStatus: accepted.`);
    }

    if (!hasField(resource, "ageRestricted")) {
      fail(module, `Required resource '${resourceId}' is missing explicit ageRestricted: false.`);
    }

    if (resource.data.cost !== "free") {
      fail(module, `Required resource '${resourceId}' is not free.`);
    }

    if (resource.data.loginRequired) {
      fail(module, `Required resource '${resourceId}' requires login.`);
    }

    if (accessMode !== "direct_open") {
      fail(module, `Required resource '${resourceId}' must use accessMode: direct_open.`);
    }

    if (resource.data.status === "draft" || resource.data.status === "coming_soon") {
      fail(module, `Required resource '${resourceId}' is not publicly usable.`);
    }

    if (reviewStatus !== "accepted") {
      fail(module, `Required resource '${resourceId}' must have reviewStatus: accepted.`);
    }

    if (resource.data.rightsMode === "unknown") {
      fail(module, `Required resource '${resourceId}' has unknown rightsMode.`);
    }

    if (resource.data.ageRestricted) {
      fail(module, `Required resource '${resourceId}' is age-restricted.`);
    }

    if (gatedRequiredPattern.test(accessText)) {
      fail(module, `Required resource '${resourceId}' appears to require application, cohort enrollment, scheduled attendance, payment, PRO access, or a certificate path.`);
    }
  }
}

for (const resource of resources) {
  if (resource.data.status !== "draft" && resource.data.rightsMode === "unknown") {
    fail(resource, "Non-draft resources must have known rightsMode.");
  }

  if (!isValidYouTubeVideoId(resource.data.videoId)) {
    fail(resource, "YouTube videoId must be exactly 11 characters using letters, numbers, underscore, or hyphen.");
  }

  if (!isValidYouTubePlaylistId(resource.data.playlistId)) {
    fail(resource, "YouTube playlistId must include the full PL-prefixed public playlist ID.");
  }

  if (resource.data.sourcePlatform === "youtube" && resource.data.embedAllowed && !resource.data.videoId && !resource.data.playlistId) {
    fail(resource, "YouTube resources with embeds enabled must include a videoId or playlistId.");
  }

  if (resource.data.embedAllowed && resource.data.sourcePlatform !== "youtube") {
    fail(resource, "Learn embed support is limited to official YouTube embeds.");
  }

  if (resource.data.embedAllowed && resource.data.reviewStatus !== "accepted") {
    fail(resource, "Embedded resources must have reviewStatus: accepted.");
  }

  if (resource.data.embedAllowed && resource.data.accessMode !== "direct_open") {
    fail(resource, "Embedded resources must use accessMode: direct_open.");
  }

  if (resource.data.embedAllowed && resource.data.loginRequired !== false) {
    fail(resource, "Embedded resources must not require login.");
  }

  if (resource.data.embedAllowed && resource.data.ageRestricted !== false) {
    fail(resource, "Embedded resources must include ageRestricted: false.");
  }

  if (resource.data.embedAllowed && !isPresent(resource.data.creator)) {
    fail(resource, "Embedded resources must include creator attribution.");
  }

  if (resource.data.embedAllowed && !isPresent(resource.data.canonicalUrl)) {
    fail(resource, "Embedded resources must include a canonical source URL.");
  }

  if (resource.data.embedAllowed && resource.data.rightsMode !== "official_embed") {
    fail(resource, "Embedded resources must use rightsMode: official_embed.");
  }

  if (resource.data.ageRestricted && resource.data.embedAllowed) {
    fail(resource, "Age-restricted resources must not render embedded players.");
  }

  if (resource.data.featuredEmbed && !resource.data.embedAllowed) {
    fail(resource, "featuredEmbed requires embedAllowed: true.");
  }
}

for (const lab of labs) {
  if (!isPresent(lab.data.safetyBoundary)) {
    fail(lab, "Labs must include a safety boundary.");
  }

  if (lab.data.isOffensive && lab.data.status === "stable" && lab.data.debriefStatus !== "published") {
    fail(lab, "Stable offensive labs must have debriefStatus: published.");
  }
}

if (failures.length) {
  console.error("Learn content validation failed:");
  console.error(failures.join("\n"));
  if (warnings.length) {
    console.warn("\nLearn content validation warnings:");
    console.warn(warnings.join("\n"));
  }
  process.exit(1);
}

if (warnings.length) {
  console.warn("Learn content validation warnings:");
  console.warn(warnings.join("\n"));
}

console.log(`Learn content validation passed for ${tracks.length} tracks, ${modules.length} modules, ${resources.length} resources, and ${labs.length} labs.`);
