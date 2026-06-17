import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default defineConfig({
  site: "https://aivillage.org",
  output: "static",
  integrations: [
    mermaid({ autoTheme: true, enableLog: false }),
    expressiveCode({
      themes: ["houston", "github-light"],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `[data-ec-theme='${theme.type}']`,
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    syntaxHighlight: {
      excludeLangs: ["mermaid"],
    },
  },
  trailingSlash: "always",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["import"],
        },
      },
    },
  },
});
