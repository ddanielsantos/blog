import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    snapshotPathTemplate: '{testDir}/__screenshots__/{testFileName}/{arg}.png',
});
