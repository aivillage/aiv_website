# AI Village Website

Static Astro site for [aivillage.org](https://aivillage.org).

## Requirements

- Node.js 24 (see `.nvmrc`)
- pnpm as the canonical package manager, pinned by `packageManager` in `package.json`

## Quick Start

```sh
corepack enable
pnpm install
pnpm dev
pnpm build
pnpm preview
```

Before pushing or opening a PR, run:

```sh
pnpm build
pnpm lint
```

`pnpm build` runs Astro/type checks, Markdown heading checks, offline social-image
generation, the Astro static build, redirect verification, internal-link
verification, and emitted social-image verification.

## Adding Content

### Blog Posts

Add posts to `src/content/blog/` with front matter including `title`, `date`, `author`, and `category`.

Canonical blog URLs use:

```txt
/blog/<slug>/
```

Use `slug` or `canonicalSlug` to set the canonical slug. The build fails on slug collisions.

The migration redirect set is complete. New Astro-native posts should not receive fabricated Jekyll-style legacy URLs. If a real historical URL needs to be preserved, add it explicitly to `public/_redirects`; redirect front matter is not used to generate redirects.

### Events

Add events to `src/content/events/` with `title`, `date`, and optional `description` and `location`. Event detail pages build at `/events/<slug>/`. Real legacy aliases are handled explicitly in `public/_redirects`.

Schedule and talk pages are mapped in `src/data/schedules.ts` and rendered from `src/content/schedules/`.

### Volunteers

Add volunteer profiles to `src/content/volunteers/` with `first_name`, `last_name`, optional role fields, an explicit `order`, and optional `profile` image filename from `public/assets/images/profiles/`.

### Sponsors

Add sponsors to `src/content/sponsors/` with `name`, required `status` (`current` or `past`), and optional `logo`, `url`, `tier`, and `description`. Current sponsors appear on the homepage and `/sponsors/`; past sponsors appear in the past sponsors section. Each sponsor also gets a detail page at `/sponsors/<slug>/`.

### Workshops

The `/learn/` page links to the public [AI Village workshops repository](https://github.com/aivillage/workshops). Keep workshop claims limited to that repository's README files and top-level workshop documentation.

Content schemas validate front matter at build time. Missing required fields fail the build with a clear error.

## Redirects

Redirects are manually maintained in `public/_redirects`. Treat that file as the source of truth for Cloudflare Pages redirects now that the migration is complete.

Cloudflare Pages applies `_redirects` as host-level redirects. Local Astro preview does not prove true 301 behavior. True redirect status verification requires a Cloudflare Pages preview or production deployment.

`pnpm build` copies `public/_redirects` into `dist/_redirects` and validates that the committed redirect file is well-formed, has no chains, and points at built routes. It does not regenerate or rewrite `public/_redirects`.

When adding a redirect:

- Add only real historical or manually verified inbound paths.
- Do not add fabricated Jekyll-style redirects for new Astro-native posts.
- Point source content at canonical URLs, not redirect sources.

Useful local checks:

```sh
pnpm run verify:redirects
pnpm run check:internal-links
```

## Deployment

Cloudflare Pages is the production target.

Configure deployment through the Cloudflare dashboard or Git integration:

- Connect the GitHub repository in Cloudflare Pages.
- Production branch: `master`
- Build command: `pnpm run build`
- Build output directory: `dist`
- Preview deployments: enabled
- Custom domain: `aivillage.org`
- Redirect rules: manually maintained at `public/_redirects` and applied by Cloudflare Pages

No GitHub Pages workflow is used because strict server-side 301 redirects require host-level redirect support.

## Custom Domain

`public/CNAME` remains in the repository with:

```txt
aivillage.org
```

The active custom domain and DNS configuration are managed in Cloudflare Pages/DNS.
