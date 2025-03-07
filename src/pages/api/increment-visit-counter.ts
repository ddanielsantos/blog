import type { APIRoute } from "astro";
import { API_KEY, ENDPOINT_URL } from "astro:env/server"

export const prerender = false;

export type IncrementVisitCounter = {
    visitCount: number;
}

type Body = {
    page: string;
};

export const POST: APIRoute = async (ctx) => {
    try {
        const { page } = await ctx.request.json() as Body;

        if (process.env.NODE_ENV !== 'production') {
            console.log('key', API_KEY);
            console.log('url', ENDPOINT_URL);
        }

        const resp = await fetch(`${ENDPOINT_URL}`, {
            method: 'POST',
            body: JSON.stringify({ page }),
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
        });

        if (process.env.NODE_ENV !== 'production') {
            console.log('resp', resp);
        }

        return resp;
    } catch (error) {
        return new Response(null, {status: 500});
    }
}