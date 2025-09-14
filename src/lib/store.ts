import { SessionState } from "./types";

// In-memory storage for Vercel serverless environment
const sessionStore = new Map<string, SessionState>();

export async function ensureSessionDir() {
  // No-op for memory storage
}

export async function saveSession(state: SessionState) {
  sessionStore.set(state.id, state);
}

export async function loadSession(id: string): Promise<SessionState | null> {
  return sessionStore.get(id) || null;
}
