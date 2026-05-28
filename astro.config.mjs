import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://aivillage.org",
  output: "static",
  integrations: [mdx()],
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
