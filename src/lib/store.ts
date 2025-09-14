import fs from "fs/promises";
import path from "path";
import { SessionState } from "./types";

const SESS_DIR = path.join(process.cwd(), "storage", "sessions");

export async function ensureSessionDir() {
  await fs.mkdir(SESS_DIR, { recursive: true });
}

export async function saveSession(state: SessionState) {
  await ensureSessionDir();
  const p = path.join(SESS_DIR, `${state.id}.json`);
  await fs.writeFile(p, JSON.stringify(state, null, 2), "utf-8");
}

export async function loadSession(id: string): Promise<SessionState | null> {
  try {
    const p = path.join(SESS_DIR, `${id}.json`);
    const raw = await fs.readFile(p, "utf-8");
    return JSON.parse(raw) as SessionState;
  } catch (e) {
    return null;
  }
}
