import { NextRequest, NextResponse } from 'next/server';
import { answerFacet, getNextQuestion } from '@/lib/flow';
import { loadSession, saveSession } from '@/lib/store';
import { Facet, SessionState } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { id, facet, answer, state: clientState } = await req.json();
  if (!id || !facet) {
    return NextResponse.json({ error: 'id and facet are required' }, { status: 400 });
  }

  // Try loading state from server store; fall back to client-provided state to
  // survive serverless instance changes where in-memory state is lost.
  let state: SessionState | null = await loadSession(id);
  if (!state && clientState) {
    state = clientState as SessionState;
  }
  if (!state) {
    return NextResponse.json({ error: 'session not found' }, { status: 404 });
  }

  const res = await answerFacet(state, facet as Facet, String(answer || ''));
  await saveSession(res.state);
  const next = await getNextQuestion(res.state);
  return NextResponse.json({ evaluation: res.evaluation, next, state: res.state });
}
