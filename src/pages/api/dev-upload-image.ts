import type {APIRoute} from 'astro';
import fs from 'fs/promises';
import path from 'path';
import {randomUUID} from 'crypto';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (import.meta.env.MODE !== 'development') {
    return new Response('Proibido', { status: 403 });
  }
  const formData = await request.formData();
  const file = formData.get('file');
  if (!file || typeof file === 'string') {
    return new Response('Arquivo não enviado', { status: 400 });
  }
  const originalName = formData.get('filename') || file.name;
  const originalNameStr = typeof originalName === 'string' ? originalName : String(originalName);
  const normalized = originalNameStr
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  const ext = normalized.includes('.') ? normalized.substring(normalized.lastIndexOf('.')) : '';
  const filename = randomUUID() + ext;
  const buffer = Buffer.from(await file.arrayBuffer());
  const assetsDir = path.join(process.cwd(), 'src/assets');
  await fs.mkdir(assetsDir, { recursive: true });
  const filePath = path.join(assetsDir, filename);
  try {
    await fs.access(filePath);
    return new Response('Arquivo já existe', { status: 409 });
  } catch {
    await fs.writeFile(filePath, buffer);
    return new Response(JSON.stringify({ url: `/src/assets/${filename}` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
