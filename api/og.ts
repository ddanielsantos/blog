import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler() {
  try {
    const html = {
      type: "div",
      props: {
        children: [
          {
            type: "h1",
            props: {
              children: "Hello World",
            },
          },
        ],
      },
    };

    return new ImageResponse(html, { width: 1200, height: 630 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
