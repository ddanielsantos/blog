import satori from "satori";
import { getSlugs } from "@lib/getSlugs.astro";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import openSansBoldTTF from "../../../public/fonts/OpenSans-Bold.ttf";
import { getPosts } from "@lib/getPosts.astro";
import type { APIContext } from "astro";

function toPrefixed(value: string | undefined) {
  if (value) {
    value = "-" + value;
  }

  return value;
}

export const getStaticPaths = async () => {
  const urls = [...(await getSlugs()).map(toPrefixed), undefined];

  return urls.map((u) => ({
    params: { id: u },
  }));
};

export const get = async ({ params }: APIContext) => {
  let element = html`
    <div tw="w-full h-full flex flex-col justify-center items-center">
      <span tw="text-7xl">ddaniel.me</span>
      <span tw="text-4xl text-gray-600">building and sharing</span>
    </div>
  `;

  if (params.id) {
    const slug = params.id.replace("-", "");

    const p = await getPosts({
      filter: {
        slug,
      },
    });

    const widthSafeTitle =
      p[0]?.frontmatter?.title && p[0].frontmatter.title.length > 29
        ? p[0]?.frontmatter?.title.slice(0, 29) + "..."
        : p[0]?.frontmatter?.title;

    element = html`
      <div tw="w-full h-full flex flex-col justify-between items-start p-6">
        <span tw="text-7xl mb-7">${widthSafeTitle}</span>
        <span tw="text-4xl text-gray-600">${p[0]?.frontmatter.date}</span>
      </div>
    `;
  }
  const OpenSansBold = Buffer.from(openSansBoldTTF);

  // element =

  const svg = await satori(element, {
    fonts: [
      {
        data: OpenSansBold,
        name: "Open Sans Bold",
        style: "normal",
        weight: 700,
      },
    ],
    height: 400,
    width: 700,
  });

  const img = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 800,
    },
  });
  const png = img.render().asPng();

  const ret = {
    headers: {
      "Content-Type": "image/png",
    },
    body: png,
  };

  return ret;
};
