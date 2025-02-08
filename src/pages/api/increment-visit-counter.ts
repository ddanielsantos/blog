import type {APIRoute} from "astro";
import { REDIS_URL } from "astro:env/server"
import Redis from "ioredis";

export const prerender = false;

export type IncrementVisitCounter = {
    visitCount: number;
}

const client = new Redis(REDIS_URL);

type Body = {
    page: string;
};

export const POST: APIRoute = async (ctx) => {
    try {
        const {page} = await ctx.request.json() as Body;
        const ip = ctx.request.headers.get('x-forwarded-for') || ctx.request.headers.get('remote-host') || 'unknown-ip';
        const rateLimitKey = `rate-limit:${ip}:${page}`;

        const isRateLimited = await client.exists(rateLimitKey);

        if (isRateLimited) {
            return new Response(null, {status: 429});
        }

        await client.set(rateLimitKey, '1', 'EX', 60);

        const r: IncrementVisitCounter = {
            visitCount: await client.hincrby(page, 'visitCount', 1)
        };

        return new Response(JSON.stringify(r));
    } catch (error) {
        return new Response(null, {status: 400});
    }
}