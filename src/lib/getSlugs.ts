import { getBlogCollection } from "./getBlogCollection.ts";

interface Options {
  filter?: {
    title?: string;
  };
}

export const getSlugs = async ({ filter }: Options = {}): Promise<string[]> => {
  let posts = await getBlogCollection();

  if (filter?.title) {
    posts = posts.filter((p) => p.data.title === filter.title);
  }

  return posts.map((p) => p.slug);
};
