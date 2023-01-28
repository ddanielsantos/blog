import { getSlugs } from "./getSlugs.astro";

interface PageInfo {
  title?: string;
}

export async function getOgImageURL(frontmatter: PageInfo) {
  let metaImageId = "";

  if (frontmatter?.title) {
    const slug = (
      await getSlugs({
        filter: {
          title: frontmatter.title,
        },
      })
    )[0];

    if (slug) metaImageId = slug;
  }

  if (metaImageId) metaImageId = "-" + metaImageId;

  const isProd = process.env.NODE_ENV === "production";

  const prefix = isProd
    ? "https://www.ddaniel.me/api/og"
    : "http://localhost:3000/api/og";

  return prefix + metaImageId + ".png";
}
