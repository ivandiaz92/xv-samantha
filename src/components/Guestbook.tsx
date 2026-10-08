"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "./Reveal";

type Message = {
  name: string;
  message: string;
  createdAt?: string;
};

export function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState<Message[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );

  const load = useCallback(async () => {
    try {
      const res = await fetch(withBasePath("/api/guestbook"));
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.messages)) setEntries(data.messages);
    } catch {
      /* local-only until sheets is connected */
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus("loading");

    const optimistic: Message = {
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(withBasePath("/api/guestbook"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(optimistic),
      });

      if (!res.ok) throw new Error("fail");

      setEntries((prev) => [optimistic, ...prev]);
      setName("");
      setMessage("");
      setStatus("ok");
    } catch {
      setEntries((prev) => [optimistic, ...prev]);
      setName("");
      setMessage("");
      setStatus("ok");
    }
  }

  return (
    <section id="firmas" className="section-pad relative overflow-hidden">
      <img
        src="/decor/hojitas.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-2 top-10 w-44 opacity-40 md:top-12 md:w-64 lg:w-72"
      />

      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-dried-thyme">
            Libro de firmas
          </p>
          <h2 className="mt-3 text-center font-display text-4xl text-ink md:text-5xl">
            Déjame un mensaje
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-ink-soft">
            Un cariño, un deseo o un recuerdo, tu firma queda en esta
            invitación.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <form
            onSubmit={onSubmit}
            className="relative mx-auto mt-10 max-w-lg overflow-hidden rounded-[28px] px-8 py-12 sm:px-10 sm:py-14 md:max-w-xl md:px-14 md:py-16"
            style={{
              backgroundImage: "url('/decor/paper-deckle.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-dried-thyme">
                  Tu nombre
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={80}
                  className="w-full rounded-2xl border border-antique-rose/25 bg-champagne/80 px-4 py-3 text-sm text-ink outline-none transition focus:border-antique-rose"
                  placeholder="Nombre"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-dried-thyme">
                  Mensaje
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  maxLength={500}
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-antique-rose/25 bg-champagne/80 px-4 py-3 text-sm text-ink outline-none transition focus:border-antique-rose"
                  placeholder="Escribe tu mensaje…"
                />
              </label>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-antique-rose px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-champagne transition hover:bg-ink disabled:opacity-60"
              >
                {status === "loading" ? "Enviando…" : "Firmar"}
              </button>
              {status === "ok" && (
                <p className="text-center text-sm text-dried-thyme">
                  ¡Gracias por tu mensaje!
                </p>
              )}
            </div>
          </form>
        </Reveal>

        {entries.length > 0 && (
          <div className="mt-12 space-y-4">
            {entries.map((entry, i) => (
              <Reveal key={`${entry.name}-${i}`}>
                <blockquote className="rounded-[24px] border border-blush/60 bg-paper/70 px-5 py-5">
                  <p className="font-script text-2xl text-antique-rose">
                    {entry.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {entry.message}
                  </p>
                </blockquote>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
