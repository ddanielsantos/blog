import satori from "satori";
import { getSlugs } from "@lib/getSlugs";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import openSansFile from "../../../public/fonts/OpenSans-Bold.ttf";
import { getPosts } from "@lib/getPosts";
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
        tw="flex bg-white w-full h-full border-red-600 px-14 py-48 justify-center items-center"
      >
        <div tw="flex flex-col border-blue-600">
          <div tw="flex border-red-600 items-center">
            <div tw="bg-black w-[40px] h-full flex"></div>
            <div tw="flex flex-col ml-15">
              <h2 tw="text-7xl font-bold">ddaniel.me</h2>
              <h3 tw="text-4xl font-bold">documenting my journey</h3>
            </div>
          </div>
        </div>
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
    <div tw="bg-white w-full h-full flex flex-col justify-around px-24 ">
      <div tw="flex flex-col">
        <span tw="text-7xl mb-20">${widthSafeTitle}</span>
        <span tw="text-4xl">${p[0]?.data.description}</span>
      </div>
      <span tw="self-end text-4xl text-gray-600">${p[0]?.data.date}</span>
    </div>
  `;
};

export const get = async ({ params }: APIContext) => {
  const element = await getHmtlForOGImage(params);
  const OpenSans = Buffer.from(openSansFile);

  const svg = await satori(element, {
    fonts: [
      {
        data: OpenSans,
        name: "Open Sans Bold",
        style: "normal",
        weight: 700,
      },
    ],
    height: 630,
    width: 1200,
  });

  const img = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
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
