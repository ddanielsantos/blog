import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (import.meta.env.MODE !== 'development') {
    return new Response('Proibido', { status: 403 });
  }
  try {
    const { filename, content } = await request.json();
    if (!filename || !filename.endsWith('.md') && !filename.endsWith('.mdx')) {
      return new Response('Nome de arquivo inválido', { status: 400 });
    }
    const filePath = path.join(process.cwd(), 'src/content/blog', filename);
    try {
      await fs.access(filePath);
      return new Response('Arquivo já existe', { status: 409 });
    } catch {
      // Arquivo não existe, pode criar
    }
    await fs.writeFile(filePath, content, 'utf-8');
    return new Response('OK');
  } catch (e) {
    return new Response('Erro ao salvar', { status: 500 });
  }
};
