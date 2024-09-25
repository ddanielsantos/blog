import { getCollection as internal } from "astro:content";

export async function getCollection() {
return internal('blog', ({ data }) => {
  return data.draft !== true;
});
}
