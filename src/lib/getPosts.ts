import { CollectionEntry, getCollection, getEntryBySlug } from "astro:content";

interface Options {
  filter?: {
    tag?: string;
    slug?: string;
  };
}

type Posts = CollectionEntry<"blog">[];

export const getPosts = async ({ filter }: Options = {}): Promise<Posts> => {
  if (filter?.slug) {
    return [await getEntryBySlug("blog", filter.slug)];
  }

  let posts = await getCollection("blog");

  if (filter?.tag) {
    posts = posts.filter((post) => post.data.tags?.includes(filter.tag));
  }

  return posts;
};
