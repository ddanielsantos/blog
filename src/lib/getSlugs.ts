import { getCollection } from "./getCollection";

interface Options {
  filter?: {
    title?: string;
  };
}

export const getSlugs = async ({ filter }: Options = {}): Promise<string[]> => {
  let posts = await getCollection();

  if (filter?.title) {
    posts = posts.filter((p) => p.data.title === filter.title);
  }

  return posts.map((p) => p.slug);
};
