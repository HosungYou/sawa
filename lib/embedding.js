import OpenAI from 'openai';

export async function embedTexts(texts) {
  const input = texts.map(t => t.substring(0, 8000));

  // Offline fallback: hashed bag-of-words embeddings (256-dim)
  if (!process.env.OPENAI_API_KEY) {
    const dim = 256;
    const vectors = input.map(text => {
      const vector = new Array(dim).fill(0);
      const tokens = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
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
      return vector.map(x => x / norm);
    });
    return vectors;
  }

  // OpenAI embeddings (preferred when key available)
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const res = await client.embeddings.create({
    model: 'text-embedding-3-small',
    input
  });
  return res.data.map(d => d.embedding);
}
