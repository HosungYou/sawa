import fs from "fs/promises";
import path from "path";
import { PlaybookConfig, PlaybookItem, Facet } from "./types";

let cache: PlaybookConfig | null = null;

export async function loadPlaybook(): Promise<PlaybookConfig> {
  if (cache) return cache;
  const cfgPath = path.join(process.cwd(), "config", "sawa-playbook.json");
  const raw = await fs.readFile(cfgPath, "utf-8");
  const json = JSON.parse(raw) as PlaybookConfig;
  cache = json;
  return json;
}

export async function getSequence(): Promise<Facet[]> {
  const cfg = await loadPlaybook();
  return cfg.items.map((it: PlaybookItem) => it.facet);
}

export async function getItem(facet: Facet): Promise<PlaybookItem> {
  const cfg = await loadPlaybook();
  const item = cfg.items.find((i) => i.facet === facet);
  if (!item) throw new Error(`Playbook facet not found: ${facet}`);
  return item;
}
