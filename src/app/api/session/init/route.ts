import { NextRequest, NextResponse } from 'next/server';
import { initializeSession, getNextQuestion } from '@/lib/flow';
import { saveSession } from '@/lib/store';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

export async function POST(_req: NextRequest) {
  const id = randomUUID();
  const state = await initializeSession(id);
  await saveSession(state);
  const next = await getNextQuestion(state);
  return NextResponse.json({ id, next, state });
}
