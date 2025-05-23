import type { CollectionEntry } from "astro:content";

export function getUniqueTags(posts: CollectionEntry<"blog">[]) {
	const differentTags = new Set();

	posts?.forEach((post) => {
		post?.data?.tags?.forEach((tag) => differentTags.add(tag));
	});

	return [...differentTags];
}
