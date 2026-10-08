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

  try {
    // text/plain avoids Apps Script JSON content-type quirks
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const text = await res.text();
    const trimmed = text.trim();

    if (trimmed.startsWith("{")) {
      const data = JSON.parse(trimmed) as { ok?: boolean };
      return { ok: data.ok !== false, data };
    }

    // Redirect follow sometimes returns HTML even when the row was written
    if (res.ok || res.status === 302) {
      return { ok: true as const, data: null };
    }

    return {
      ok: false as const,
      reason: "http_error" as const,
      status: res.status,
    };
  } catch {
    return { ok: false as const, reason: "network" as const };
  }
}

export async function getFromSheets(action: string) {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (!url) return null;

  const endpoint = `${url}${url.includes("?") ? "&" : "?"}action=${encodeURIComponent(action)}`;
  const res = await fetch(endpoint, { cache: "no-store", redirect: "follow" });
  if (!res.ok) return null;
  const text = await res.text();
  if (!text.trim().startsWith("{")) return null;
  return JSON.parse(text);
}
