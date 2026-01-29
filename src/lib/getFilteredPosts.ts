import { getEntry } from "astro:content";
import {getBlogCollection, type PostWithSlug} from "./getBlogCollection.ts";

interface Options {
  filter?: {
    tag?: string;
    slug?: string;
  };
}

export const getFilteredPosts = async ({ filter }: Options = {}): Promise<PostWithSlug[]> => {
  if (filter?.slug) {
    return [await getEntry("blog", filter.slug)];
  }

  let posts = await getBlogCollection();

  if (filter?.tag) {
    posts = posts.filter((post) => post.data.tags?.includes(filter.tag));
  }

  return posts;
};
