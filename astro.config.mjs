import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ddaniel.me',
  vite: {
    plugins: [rawFonts([".ttf"])],
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
  },
  integrations: [tailwind(), mdx(), react()],
  markdown: {
    shikiConfig: {
      themes: { light: 'one-light', dark: 'min-dark' },
      transformers: [
        {
          pre(node) {
            delete node.properties.tabindex;
          }
        }
      ]
    },
  }
});

function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
