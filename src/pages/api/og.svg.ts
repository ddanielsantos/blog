import satori from "satori";
import { html } from "satori-html";

const openSansBoldTTF = fetch(
  new URL("../../../public/fonts/OpenSans-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function get() {
  const OpenSansBold = await openSansBoldTTF;

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

  return {
    headers: {
      "Content-Type": "image/svg+xml",
    },
    body: svg,
  };
}
