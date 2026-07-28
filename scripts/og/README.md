# Social image generation

Social-image files are generated under `public/generated/og/` and ignored by
Git. Generation is offline: it uses only repository-local sources, fails the
build when a selected local source is missing, and never fetches external
HTTP(S) image URLs. External sources pass through unchanged.

Generated filenames contain a hash of the normalized source path, not a hash of
the file contents. Replacing artwork in place therefore keeps the same social
image URL. LinkedIn and X may continue serving an older cached preview after
such a replacement; use LinkedIn Post Inspector or the corresponding platform
refresh tool when a cached card needs to be refreshed.

`astro dev` does not automatically generate social derivatives. After a clean
checkout, generated OG paths may not exist during local development until
`pnpm generate:og-images` or `pnpm build` has run. This local-development gap
does not affect production builds, which generate the images before the Astro
production build and verify the emitted references afterward.
