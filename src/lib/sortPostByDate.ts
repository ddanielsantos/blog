import type { CollectionEntry } from "astro:content";

export const sortPostByDate = (
	a: CollectionEntry<"blog">,
	b: CollectionEntry<"blog">,
): number => {
	const firstDate = new Date(a.data.date);
	const secondDate = new Date(b.data.date);

	switch (true) {
		case firstDate > secondDate:
			return -1;
		case secondDate > firstDate:
			return 1;
		default:
			return 0;
	}
};
