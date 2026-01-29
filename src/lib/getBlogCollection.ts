import {type CollectionEntry, getCollection as internal} from "astro:content";

export type PostWithSlug = CollectionEntry<"blog"> & {
  slug?: string;
}

export async function getBlogCollection(): Promise<PostWithSlug[]> {
  const collection = await internal('blog', ({ data }) => {
    return data.draft !== true;
  });

  return collection.map(p => {
    return {
      ...p,
      slug: p.filePath.split("/").pop().split(".").shift(),
    }
  });
}
