import { getSlugs } from "./getSlugs.astro";

type Args =
  | {
      title: string;
    }
  | undefined;

export async function getOgImageURL(frontmatter: Args) {
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
