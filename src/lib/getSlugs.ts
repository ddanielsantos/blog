import { CollectionEntry, getCollection } from "astro:content";

interface Options {
  filter?: {
    title?: string;
  };
}

type Slug = CollectionEntry<"blog">["slug"];

export const getSlugs = async ({ filter }: Options = {}): Promise<Slug[]> => {
  let posts = await getCollection("blog");

  if (filter?.title) {
    posts = posts.filter((p) => p.data.title === filter.title);
  }

  return posts.map((p) => p.slug);
};
