import { getCollection as internal } from "astro:content";

export async function getCollection() {
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
