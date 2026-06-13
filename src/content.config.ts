import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

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
    mermaid: z.boolean().optional(),
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

export const collections = { blog, events, volunteers, sponsors, schedules };
