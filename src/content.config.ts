import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const stage = z.enum([
  "explorer",
  "ai_literate",
  "ai_practitioner",
  "builder",
  "risk_evaluative_practitioner",
  "specialist_contributor",
]);

export const difficulty = z.enum(["intro", "intermediate", "advanced", "expert"]);

export const trackKind = z.enum([
  "foundation",
  "practitioner",
  "builder",
  "agentic",
  "security",
  "defensive",
  "evals",
  "governance",
  "contributor",
  "deep_dive",
]);

export const securityLens = z.enum(["none", "awareness", "required", "primary"]);

export const status = z.enum(["draft", "coming_soon", "beta", "stable", "stale"]);

const image = z.union([
  z.string(),
  z.object({
    path: z.string(),
    alt: z.string().optional(),
  }),
]);

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,markdown}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.union([z.string(), z.array(z.string())]).default("AI Village"),
    category: z.string().optional(),
    categories: z.union([z.string(), z.array(z.string())]).optional(),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    image: image.optional(),
    cover: z.string().optional(),
    author_profile: z.boolean().optional(),
    draft: z.boolean().default(false),
    slug: z.string().optional(),
    canonicalSlug: z.string().optional(),
    legacySlug: z.string().optional(),
    legacyUrls: z.array(z.string()).default([]),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,markdown}", base: "./src/content/events" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    location: z.string().optional(),
    permalink: z.string().optional(),
    externalUrl: z.url().optional(),
    canonicalSlug: z.string().optional(),
    legacyUrls: z.array(z.string()).default([]),
  }),
});

const volunteers = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,markdown}", base: "./src/content/volunteers" }),
  schema: z.object({
    first_name: z.string(),
    last_name: z.string(),
    position: z.string().optional(),
    expertise: z.string().optional(),
    affiliation: z.string().optional(),
    profile: z.string().optional(),
    bio: z.union([z.boolean(), z.string()]).default(false),
    order: z.number().default(999),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,markdown}", base: "./src/content/sponsors" }),
  schema: z
    .object({
      name: z.string(),
      status: z.enum(["current", "past"]),
      logo: z.string().optional(),
      url: z.url().optional(),
      tier: z.string().optional(),
      description: z.union([z.string(), z.boolean()]).optional(),
    })
    .superRefine((data, ctx) => {
      if (data.status !== "current") return;

      if (!data.logo) {
        ctx.addIssue({
          code: "custom",
          path: ["logo"],
          message: "Current sponsors must include a logo.",
        });
      }

      if (!data.url) {
        ctx.addIssue({
          code: "custom",
          path: ["url"],
          message: "Current sponsors must include a URL.",
        });
      }
    }),
});

const schedules = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/schedules" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    category: z.string().optional(),
    permalink: z.string().optional(),
  }),
});

const learnTracks = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,markdown}", base: "./src/content/learn/tracks" }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string(),
      summary: z.string(),
      trackKind,
      stageStart: stage,
      stageEnd: stage,
      audiences: z.array(z.string()),
      status,
      prerequisites: z.array(reference("learnTracks")).default([]),
      requiredArtifacts: z.array(z.string()),
      canonicalModules: z.array(reference("learnModules")).default([]),
      securityLens,
      securityCheckpoints: z.array(z.string()).default([]),
      whatExistsNow: z.string(),
      whatComingNext: z.string(),
      reviewOwner: z.string(),
      lastReviewed: z.coerce.date(),
    })
    .superRefine((data, ctx) => {
      if (data.requiredArtifacts.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["requiredArtifacts"],
          message: "Learn tracks must include at least one required artifact.",
        });
      }

      if (data.status === "coming_soon" || data.status === "beta") {
        if (!data.whatExistsNow.trim()) {
          ctx.addIssue({
            code: "custom",
            path: ["whatExistsNow"],
            message: "Coming-soon and beta tracks must describe what exists now.",
          });
        }

        if (!data.whatComingNext.trim()) {
          ctx.addIssue({
            code: "custom",
            path: ["whatComingNext"],
            message: "Coming-soon and beta tracks must describe what is coming next.",
          });
        }
      }
    }),
});

const learnModules = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,markdown}", base: "./src/content/learn/modules" }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string(),
      summary: z.string(),
      tracks: z.array(reference("learnTracks")),
      stageStart: stage,
      stageEnd: stage,
      difficulty,
      moduleType: z.enum(["concept", "practice", "lab", "case_study", "checkpoint", "capstone"]),
      learningObjectives: z.array(z.string()),
      prerequisites: z.array(reference("learnModules")).default([]),
      resources: z
        .array(
          z.object({
            resource: reference("learnResources"),
            role: z.enum(["required", "optional", "deeper"]),
          }),
        )
        .default([]),
      labs: z.array(reference("learnLabs")).optional(),
      requiredArtifact: z.string().optional(),
      securityLens,
      securityLensText: z.string().default(""),
      status,
      reviewOwner: z.string(),
      lastReviewed: z.coerce.date(),
    })
    .superRefine((data, ctx) => {
      const requiredResources = data.resources.filter((resource) => resource.role === "required");
      if (requiredResources.length > 2) {
        ctx.addIssue({
          code: "custom",
          path: ["resources"],
          message: "Learn modules may include at most two required resources.",
        });
      }

      if (data.status === "stable" && data.securityLens !== "none" && !data.securityLensText.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["securityLensText"],
          message: "Stable modules with a Security Lens must include reviewed Security Lens prose.",
        });
      }
    }),
});

const learnResources = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,markdown}", base: "./src/content/learn/resources" }),
  schema: z
    .object({
      title: z.string(),
      provider: z.string(),
      canonicalUrl: z.url(),
      resourceType: z.enum(["video", "playlist", "course", "docs", "book", "lab", "tool", "paper", "standard", "repo"]),
      modality: z.array(z.enum(["video", "text", "hands_on", "notebook", "interactive", "code"])),
      targetStage: stage,
      difficulty,
      tracks: z.array(reference("learnTracks")),
      securityLens: z.string().optional(),
      rightsMode: z.enum(["link_only", "official_embed", "copy_adapt", "internal", "unknown"]),
      license: z.string(),
      cost: z.enum(["free", "freemium", "paid"]),
      loginRequired: z.boolean(),
      embedAllowed: z.boolean(),
      attribution: z.string(),
      canonicalFor: z.array(z.string()).default([]),
      caveats: z.array(z.string()).default([]),
      maintenanceRisk: z.enum(["low", "medium", "high"]),
      reviewOwner: z.string(),
      lastChecked: z.coerce.date(),
      status: status.default("beta"),
    })
    .superRefine((data, ctx) => {
      if ((data.status === "beta" || data.status === "stable") && data.rightsMode === "unknown") {
        ctx.addIssue({
          code: "custom",
          path: ["rightsMode"],
          message: "Beta and stable Learn resources must have known rights metadata.",
        });
      }
    }),
});

const learnLabs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,markdown}", base: "./src/content/learn/labs" }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string(),
      sourceRepo: z.string().optional(),
      sourcePath: z.string().optional(),
      summary: z.string(),
      stageStart: stage,
      stageEnd: stage,
      difficulty,
      estimatedMinutes: z.number(),
      runModes: z.array(z.enum(["local", "docker", "colab", "hf_space", "event"])),
      llmRequired: z.boolean(),
      gpuRequired: z.boolean(),
      concepts: z.array(z.string()),
      threatCategories: z.array(z.string()),
      isOffensive: z.boolean().default(false),
      safetyBoundary: z.string(),
      setupStatus: z.enum(["missing", "draft", "tested"]),
      debriefStatus: z.enum(["missing", "draft", "published"]),
      instructorGuideStatus: z.enum(["missing", "draft", "published"]),
      mappings: z
        .object({
          owasp: z.array(z.string()).optional(),
          mitreAtlas: z.array(z.string()).optional(),
          nist: z.array(z.string()).optional(),
        })
        .default({}),
      requiredArtifact: z.string(),
      status,
      reviewOwner: z.string(),
      lastReviewed: z.coerce.date(),
    })
    .superRefine((data, ctx) => {
      if (!data.safetyBoundary.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["safetyBoundary"],
          message: "Learn labs must include a safety boundary.",
        });
      }

      if (data.isOffensive && data.status === "stable" && data.debriefStatus !== "published") {
        ctx.addIssue({
          code: "custom",
          path: ["debriefStatus"],
          message: "Offensive stable Learn labs must include a published defensive debrief.",
        });
      }
    }),
});

const learnGlossary = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx,markdown}", base: "./src/content/learn/glossary" }),
  schema: z.object({
    term: z.string(),
    slug: z.string(),
    definition: z.string(),
    securityLens: z.string().optional(),
    tracks: z.array(reference("learnTracks")),
  }),
});

export const collections = {
  blog,
  events,
  volunteers,
  sponsors,
  schedules,
  learnTracks,
  learnModules,
  learnResources,
  learnLabs,
  learnGlossary,
};
