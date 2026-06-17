import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginLanguageBadge } from "expressive-code-language-badge";
import mdx from "@astrojs/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export default defineConfig({
  site: "https://aivillage.org",
  output: "static",
  integrations: [
    mermaid({ autoTheme: true, enableLog: false }),
    expressiveCode({
      plugins: [
        pluginLineNumbers(),
        pluginLanguageBadge({
          languageMap: {
            astro: "Astro",
            bash: "Bash",
            css: "CSS",
            diff: "Diff",
            html: "HTML",
            js: "JavaScript",
            jsx: "JSX",
            json: "JSON",
            md: "Markdown",
            mdx: "MDX",
            py: "Python",
            python: "Python",
            scss: "SCSS",
            sh: "Shell",
            shell: "Shell",
            shellscript: "Shell",
            ts: "TypeScript",
            tsx: "TSX",
            yaml: "YAML",
            yml: "YAML",
            zsh: "Zsh",
          },
        }),
      ],
      themes: ["houston", "github-light"],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `[data-ec-theme='${theme.type}']`,
      defaultProps: {
        showLineNumbers: true,
      },
      styleOverrides: {
        languageBadge: {
          fontColor: "var(--aiv-bg-canvas)",
          background: "var(--aiv-action-primary)",
          borderColor: "var(--aiv-card-border)",
          borderRadius: "4px",
          borderWidth: "1px",
          fontWeight: "700",
        },
      },
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
