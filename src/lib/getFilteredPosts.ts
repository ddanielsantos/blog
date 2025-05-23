import { type CollectionEntry, getEntry } from "astro:content";
import { getBlogCollection } from "./getBlogCollection.ts";

interface Options {
  filter?: {
    tag?: string;
    slug?: string;
  };
}

type Posts = CollectionEntry<"blog">[];

export const getFilteredPosts = async ({ filter }: Options = {}): Promise<Posts> => {
  if (filter?.slug) {
    return [await getEntry("blog", filter.slug)];
  }

  let posts = await getBlogCollection();

  if (filter?.tag) {
    posts = posts.filter((post) => post.data.tags?.includes(filter.tag));
  }

  return posts;
};
