import { join, parse } from "node:path";
import { readdirSync } from "node:fs";
import { isDraft } from "@lib/isDraft.ts";

export function getBlogPostSlugs() {
    const blogDir = join('src', 'content', 'blog');
    return readdirSync(blogDir)
        .filter(file => ['.md', '.mdx'].includes(parse(file).ext))
        .filter(isDraft(blogDir))
        .map(file => parse(file).name);
}
