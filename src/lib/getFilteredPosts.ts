import { type CollectionEntry, getEntryBySlug } from "astro:content";
import { getCollection } from "./getCollection";

interface Options {
  filter?: {
    tag?: string;
    slug?: string;
  };
}

type Posts = CollectionEntry<"blog">[];

export const getFilteredPosts = async ({ filter }: Options = {}): Promise<Posts> => {
  if (filter?.slug) {
    return [await getEntryBySlug("blog", filter.slug)];
  }

  let posts = await getCollection();

  if (filter?.tag) {
    posts = posts.filter((post) => post.data.tags?.includes(filter.tag));
  }

  return posts;
};
