import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import OpenAI from 'openai';

export const runtime = 'nodejs';

function cosineSim(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const dbPath = path.join(process.cwd(), 'storage', 'vectorstore.json');
  const raw = await fs.readFile(dbPath, 'utf-8');
  const db = JSON.parse(raw) as { id: number, text: string, embedding: number[] }[];

  // Compute query embedding (OpenAI if available, else offline fallback to hashed BOW)
  let q: number[];
  if (process.env.OPENAI_API_KEY) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const qEmbedRes = await openai.embeddings.create({ model: 'text-embedding-3-small', input: query });
    q = qEmbedRes.data[0].embedding as number[];
  } else {
    const dim = 256;
    const vector = new Array(dim).fill(0);
    const tokens = String(query).toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    for (const token of tokens) {
      let h = 0;
      for (let i = 0; i < token.length; i++) {
        h = (h * 31 + token.charCodeAt(i)) >>> 0;
      }
      vector[h % dim] += 1;
    }
    let norm = 0;
    for (const x of vector) norm += x * x;
    norm = Math.sqrt(norm) || 1;
    q = vector.map(x => x / norm);
  }

  const scored = db.map(item => ({...item, score: cosineSim(item.embedding, q)}))
                   .sort((a,b) => b.score - a.score)
                   .slice(0, 5);

  const context = scored.map((s, i) => `[C${i+1}]\n` + s.text).join('\n\n---\n\n');

  const sys = 'You are SAWA, a Scientific Argumentative Writing Assistant. Answer concisely with numbered steps and cite sources as [C1], [C2] based on provided context. If uncertain, say so.';
  const user = `Question: ${query}\n\nContext:\n${context}`;

  // Generate answer (OpenAI if available; otherwise return top context as summary)
  let answer = '';
  if (process.env.OPENAI_API_KEY) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const chat = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: user }
      ],
      temperature: 0.2
    });
    answer = chat.choices[0]?.message?.content ?? '';
  } else {
    answer = 'No OPENAI_API_KEY set. Returning top-matching context as summary.\n\n' + context.slice(0, 1500);
  }

  return NextResponse.json({
    answer,
    citations: scored.map((s, i) => ({ id: s.id, rank: i+1, score: s.score }))
  });
}
