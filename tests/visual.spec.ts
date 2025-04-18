import { test, expect } from '@playwright/test';
import { getBlogPostSlugs } from "@lib/getBlogPostSlugs.ts";

test('Visual regression', async ({ page }) => {
    const ASTRO_URL = 'http://localhost:4321';

    const blogpostSlugs = getBlogPostSlugs();
    const urls = [
        ASTRO_URL,
        ...blogpostSlugs.map(slug => `${ASTRO_URL}/blog/${slug}`),
    ]

    for (const url of urls) {
        await page.goto(url);
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(`${url.split('/').pop()}.png`, {
            threshold: 0,
        });
    }
});
