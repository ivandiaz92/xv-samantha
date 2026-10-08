import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

export async function appendLocalJson<T>(file: string, entry: T) {
  await ensureDataDir();
  const filePath = path.join(dataDir, file);
  let list: T[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf8");
    list = JSON.parse(raw) as T[];
  } catch {
    list = [];
  }
  list.unshift(entry);
  await fs.writeFile(filePath, JSON.stringify(list, null, 2), "utf8");
  return list;
}

export async function readLocalJson<T>(file: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(dataDir, file), "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export async function postToSheets(payload: Record<string, unknown>) {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!url) return { ok: false as const, reason: "missing_url" as const };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return { ok: false as const, reason: "http_error" as const, status: res.status };
  }

  try {
    const data = await res.json();
    return { ok: true as const, data };
  } catch {
    return { ok: true as const, data: null };
  }
}

export async function getFromSheets(action: string) {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!url) return null;

  const endpoint = `${url}${url.includes("?") ? "&" : "?"}action=${encodeURIComponent(action)}`;
  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
