import satori from "satori";
import { getSlugs } from "@lib/getSlugs.astro";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import openSansBoldTTF from "../../../public/fonts/OpenSans-Bold.ttf";
import { getPosts } from "@lib/getPosts.astro";
import type { APIContext, Params } from "astro";

const toPrefixed = (value: string | undefined) => {
  if (value) {
    value = "-" + value;
  }

  return value;
};

export const getStaticPaths = async () => {
  let urls: (string | undefined)[] = (await getSlugs()).map(toPrefixed);
  urls.push(undefined);

  return urls.map((u) => ({
    params: { id: u },
  }));
};

type VNode = ReturnType<typeof html>;

const getHmtlForOGImage = async (params: Params): Promise<VNode> => {
  if (!params.id) {
    return html`
      <div
        tw="bg-white w-full h-full flex flex-col justify-center items-center"
      >
        <span tw="text-7xl">ddaniel.me</span>
        <span tw="text-4xl text-gray-600">building and sharing</span>
      </div>
    `;
  }

  const slug = params.id.replace("-", "");

  const p = await getPosts({
    filter: {
      slug,
    },
  });

  const widthSafeTitle =
    p[0]?.data?.title && p[0].data.title.length > 29
      ? p[0]?.data?.title.slice(0, 29) + "..."
      : p[0]?.data?.title;

  return html`
    <div
      tw="bg-white w-full h-full flex flex-col justify-around items-start p-10"
    >
      <span tw="text-7xl mb-7">${widthSafeTitle}</span>
      <span tw="self-end text-4xl text-gray-600">${p[0]?.data.date}</span>
    </div>
  `;
};

export const get = async ({ params }: APIContext) => {
  const element = await getHmtlForOGImage(params);
  const OpenSansBold = Buffer.from(openSansBoldTTF);

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
    width: 800,
  });

  const img = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 800,
    },
  });
  const png = img.render().asPng();

  return {
    headers: {
      "Content-Type": "image/png",
    },
    body: png,
  };
};
