import { NextRequest, NextResponse } from 'next/server';
import { loadSession } from '@/lib/store';
import { buildPrepSheet } from '@/lib/flow';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const state = await loadSession(id);
  if (!state) return NextResponse.json({ error: 'session not found' }, { status: 404 });
  const md = buildPrepSheet(state);
  return NextResponse.json({ markdown: md });
}
