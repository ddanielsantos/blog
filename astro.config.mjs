import {defineConfig, envField} from "astro/config";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

const defaultAstroApiURL = () => {
	return process.env.PUBLIC_VERCEL_URL
		? `https://${process.env.PUBLIC_VERCEL_URL}/api`
		: "http://localhost:4321/api";
}

export default defineConfig({
	site: "https://www.ddaniel.me",
	adapter: vercel({
		edgeMiddleware: true,
	}),
	vite: {
		plugins: [rawFonts([".ttf"]), tailwindcss()],
		optimizeDeps: { exclude: ["@resvg/resvg-js"] },
	},
	integrations: [mdx(), react()],
	markdown: {
		shikiConfig: {
			themes: { light: "one-light", dark: "min-dark" },
			transformers: [
				{
					pre(node) {
						node.properties.tabindex = undefined;
					},
				},
			],
		},
	},
	env: {
		validateSecrets: true,
		schema: {
			ASTRO_API_URL: envField.string({ context: "client", access: "public", default: defaultAstroApiURL() }),
			REDIS_URL: envField.string({ context: "server", access: "secret" })
		}
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
