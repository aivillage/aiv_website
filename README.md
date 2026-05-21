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

`pnpm build` runs Astro checks, the static build, redirect verification, and internal canonical-link verification.

## Adding Content

### Blog Posts

Add posts to `src/content/blog/` with front matter including `title`, `date`, `author`, and `category`.

Canonical blog URLs use:

```txt
/blog/<slug>/
```

Use `slug` or `canonicalSlug` to set the canonical slug. The build fails on slug collisions.

Historical inbound paths belong in `legacyUrls`:

```yaml
legacyUrls:
  - /old-category/2026/03/19/example.html
```

`prebuild` generates Cloudflare 301 redirects from `legacyUrls` and the historical Jekyll URL derivation logic.

### Events

Add events to `src/content/events/` with `title`, `date`, and optional `description` and `location`. Event detail pages build at `/events/<slug>/`. Obvious legacy aliases are handled in `src/data/redirects.ts`.

Schedule and talk pages are mapped in `src/data/schedules.ts` and rendered from `src/content/schedules/`.

### Volunteers

Add volunteer profiles to `src/content/volunteers/` with `first_name`, `last_name`, optional role fields, an explicit `order`, and optional `profile` image filename from `public/assets/images/profiles/`.

### Sponsors

Add sponsors to `src/content/sponsors/` with `name`, optional `logo`, `url`, `tier`, `description`, and `active`. Active sponsors appear at `/sponsors/`; each sponsor also gets a detail page at `/sponsors/<slug>/`.

### Workshops

The `/learn/` page links to the public [AI Village workshops repository](https://github.com/aivillage/workshops). Keep workshop claims limited to that repository's README files and top-level workshop documentation.

Content schemas validate front matter at build time. Missing required fields fail the build with a clear error.

## Redirects

Redirects are generated during `prebuild` into `public/_redirects` and copied to `dist/_redirects`.

Cloudflare Pages applies `_redirects` as host-level redirects. Local Astro preview does not prove true 301 behavior. True redirect status verification requires a Cloudflare Pages preview or production deployment.

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
- Redirect rules: generated at `public/_redirects` and applied by Cloudflare Pages

No GitHub Pages workflow is used because strict server-side 301 redirects require host-level redirect support.

## Custom Domain

`public/CNAME` remains in the repository with:

```txt
aivillage.org
```

The active custom domain and DNS configuration are managed in Cloudflare Pages/DNS.
