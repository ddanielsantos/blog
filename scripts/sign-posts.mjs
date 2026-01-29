#!/usr/bin/env node

import { createPrivateKey, sign } from 'crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { resolve } from 'path';

const privateKeyPath = resolve(process.cwd(), 'keys/private.pem');
const blogDir = resolve(process.cwd(), 'src/content/blog');

function getPrivateKey() {
  const keyData = readFileSync(privateKeyPath, 'utf-8');
  return createPrivateKey({
    key: keyData,
    format: 'pem',
  });
}

function signContent(content) {
  const privateKey = getPrivateKey();
  const signature = sign(null, Buffer.from(content), privateKey);
  return signature.toString('base64');
}

function extractFrontmatterAndBody(fileContent) {
  const normalized = fileContent.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`Invalid markdown format: missing frontmatter`);
  }
  return {
    frontmatter: match[1],
    body: match[2],
  };
}

function reconstructFile(frontmatter, body, signature) {
  const lines = frontmatter.split(/\r?\n/);
  const updated = [];
  let foundSignature = false;

  for (const line of lines) {
    if (line.startsWith('signature:')) {
      updated.push(`signature: ${signature}`);
      foundSignature = true;
    } else {
      updated.push(line);
    }
  }

  if (!foundSignature) {
    updated.push(`signature: ${signature}`);
  }

  return `---\n${updated.join('\n')}\n---\n${body}`;
}

function getAllMarkdownFiles(dir) {
  const files = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = resolve(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function signPosts() {
  try {
    const files = getAllMarkdownFiles(blogDir);
    console.log(`\n📝 Signing ${files.length} blog posts...\n`);

    for (const filePath of files) {
      try {
        const content = readFileSync(filePath, 'utf-8');
        const { frontmatter, body } = extractFrontmatterAndBody(content);
        const signature = signContent(body);
        const updated = reconstructFile(frontmatter, body, signature);

        writeFileSync(filePath, updated, 'utf-8');
        console.log(`  ✓ ${filePath.replace(process.cwd(), '')}`);
      } catch (error) {
        console.error(`  ✗ Error signing ${filePath.replace(process.cwd(), '')}: ${error.message}`);
        process.exit(1);
      }
    }

    console.log('\n✅ Post signing complete\n');
  } catch (error) {
    console.error('\n❌ Failed to sign posts:', error.message);
    process.exit(1);
  }
}

signPosts();
