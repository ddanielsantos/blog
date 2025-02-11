import { getSlugs } from "./getSlugs";
import { ASTRO_API_URL } from "astro:env/client";

type Args = {
  title?: string;
};

export async function getOgImageURL(frontmatter: Args) {
  let metaImageId = "";

  if (frontmatter?.title) {
    const [slug] = await getSlugs({
      filter: {
        title: frontmatter.title,
      },
    });

    if (slug) metaImageId = slug;
  }

  if (metaImageId) metaImageId = "-" + metaImageId;


  return ASTRO_API_URL + "/og" + metaImageId + ".png";
}
