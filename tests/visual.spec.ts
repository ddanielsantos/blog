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

        const snapshotName = url === ASTRO_URL ? 'home' : url.split('/').pop()?.replace(/\W/g, '_') || 'unknown';

        console.log(`Snapshot: ${snapshotName}.png`);

        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(snapshotName, {
            threshold: 0,
        });
    }
});
