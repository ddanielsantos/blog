import satori from "satori";
import { getSlugs } from "@lib/getSlugs";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import openSansFile from "../../../public/fonts/OpenSans-Bold.ttf";
import { getFilteredPosts } from "@lib/getFilteredPosts";
import type { APIContext, Params } from "astro";
import type {ReactNode} from "react";

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

const getHtmlForOGImage = async (params: Params): Promise<VNode> => {
  if (!params.id) {
    return html`
      <div
        tw="flex bg-white w-full h-full border-red-600 px-14 py-48 justify-center items-center"
      >
        <div tw="flex flex-col border-blue-600">
          <div tw="flex border-red-600 items-center">
            <div tw="bg-[#374151] w-[40px] h-full flex"></div>
            <div tw="flex flex-col ml-15">
              <h2 tw="text-7xl font-bold text-[#374151]">ddaniel.me</h2>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const slug = params.id.replace("-", "");

  const p = await getFilteredPosts({
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
        <span tw="text-7xl mb-20 text-[#374151]">${widthSafeTitle}</span>
        <span tw="text-4xl text-[#374151]">${p[0]?.data.description}</span>
      </div>
      <span tw="self-end text-5xl text-[#374151]">${p[0]?.data.date}</span>
    </div>
  `;
};

export const GET = async ({ params }: APIContext) => {
  const element = await getHtmlForOGImage(params);
  const OpenSans = Buffer.from(openSansFile);

  const svg = await satori(element as ReactNode, {
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
  const buffer = img.render().asPng();

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
