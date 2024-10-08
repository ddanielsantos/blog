import { type CollectionEntry } from "astro:content";
import { getCollection } from "./getCollection";

interface Options {
  filter?: {
    title?: string;
  };
}

type Slug = CollectionEntry<"blog">["slug"];

export const getSlugs = async ({ filter }: Options = {}): Promise<Slug[]> => {
  let posts = await getCollection();

  if (filter?.title) {
    posts = posts.filter((p) => p.data.title === filter.title);
  }

  return posts.map((p) => p.slug);
};
