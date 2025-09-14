'use client';
import { useState } from 'react';

export default function Home() {
  const [q, setQ] = useState('SAWA 시스템의 핵심 모듈과 단계별 흐름을 요약해줘');
  const [loading, setLoading] = useState(false);
  const [ans, setAns] = useState<string>('');
  const [cites, setCites] = useState<{id:number, rank:number, score:number}[]>([]);

  async function ask() {
    setLoading(true);
    setAns('');
    const res = await fetch('/api/ask', { method: 'POST', body: JSON.stringify({ query: q }) });
    const data = await res.json();
    setAns(data.answer);
    setCites(data.citations || []);
    setLoading(false);
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">SAWA – Scientific Argumentative Writing Assistant</h1>
      <div className="flex gap-2 mb-4">
        <input className="flex-1 border p-2 rounded" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="px-4 py-2 bg-black text-white rounded" onClick={ask} disabled={loading}>
          {loading ? 'Thinking…' : 'Ask'}
        </button>
      </div>
      {ans && (
        <div className="space-y-3">
          <div className="whitespace-pre-wrap border p-3 rounded">{ans}</div>
          <div>
            <h3 className="font-semibold mb-2">Citations</h3>
            <ul className="list-disc pl-6">
              {cites.map(c => (
                <li key={c.id}>[C{c.rank}] chunk #{c.id} (score {c.score.toFixed(3)})</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
