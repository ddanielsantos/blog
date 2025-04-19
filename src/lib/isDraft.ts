import { readFileSync } from "node:fs";
import { join } from "node:path";

export function isDraft(blogDir: string) {
    return (file: string) => {
        const fileContent = readFileSync(join(blogDir, file), 'utf-8');
        const lines = fileContent.split('\n');
        const draftLine = lines[1]?.trim();
        return !draftLine?.includes('draft: true');
    };
}