import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import { embedTexts } from '../lib/embedding.js';

const DATA_PDF = path.resolve('data/sawa-db.pdf');
const STORAGE_DIR = path.resolve('storage');

function chunkText(text, maxLen = 1200, overlap = 150) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + maxLen, text.length);
    const slice = text.slice(start, end);
    chunks.push(slice.trim());
    start = end - overlap;
    if (start < 0) start = 0;
    if (end === text.length) break;
  }
  return chunks.filter(c => c.length > 50);
}

async function main() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
    const buf = await fs.readFile(DATA_PDF);
    const data = await pdf(buf);
    const rawText = data.text.replace(/\s+\n/g, '\n').replace(/\n{2,}/g, '\n\n');
    const chunks = chunkText(rawText);
    console.log(`Parsed PDF into ${chunks.length} chunks`);

    const embeddings = await embedTexts(chunks);
    const db = chunks.map((text, i) => ({ id: i, text, embedding: embeddings[i] }));
    await fs.writeFile(path.join(STORAGE_DIR, 'vectorstore.json'), JSON.stringify(db));
    console.log('Saved embeddings to storage/vectorstore.json');
  } catch (err) {
    console.error('Ingestion failed:', err?.message || err);
    process.exit(1);
  }
}

main();
