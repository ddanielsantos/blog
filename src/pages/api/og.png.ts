import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import openSansBoldTTF from "../../../public/fonts/OpenSans-Bold.ttf";

export async function get() {
  const OpenSansBold = Buffer.from(openSansBoldTTF);

  const element = html`
    <div tw="w-full h-full flex flex-col justify-center items-center">
      <span tw="text-7xl">ddaniel.me</span>
      <span tw="text-4xl text-gray-600">building and sharing</span>
    </div>
  `;

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
}
