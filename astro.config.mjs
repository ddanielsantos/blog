import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [rawFonts([".ttf"])],
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
  },
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: "poimandres",
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
