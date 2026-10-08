"use client";

import { FormEvent, useState } from "react";
import { Reveal } from "./Reveal";

export function Rsvp() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    guests: "1",
    allergies: "",
    phone: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          guests: Number(form.guests),
        }),
      });

      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      setForm({
        firstName: "",
        lastName: "",
        guests: "1",
        allergies: "",
        phone: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="rsvp" className="section-pad bg-blush/25">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <div className="text-center">
            <img
              src="/decor/seal.png"
              alt=""
              aria-hidden
              className="mx-auto mb-5 w-20 seal-pulse md:w-24"
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-dried-thyme">
              Confirmación
            </p>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
              ¿Nos acompañas?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              Confirma tu asistencia para preparar todo con cariño. Si hay
              alergias o restricciones, cuéntanoslas aquí.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          {status === "ok" ? (
            <div className="mt-10 rounded-[28px] bg-paper/90 px-6 py-12 text-center shadow-[0_16px_40px_rgba(200,125,135,0.12)]">
              <p className="font-script text-3xl text-antique-rose">¡Listo!</p>
              <p className="mt-3 text-sm text-ink-soft">
                Gracias por confirmar. Nos emociona celebrar contigo.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-dried-thyme"
              >
                Enviar otra confirmación
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mt-10 space-y-4 rounded-[28px] bg-paper/90 px-5 py-8 shadow-[0_16px_40px_rgba(200,125,135,0.12)] md:px-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-dried-thyme">
                    Nombre
                  </span>
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    className="w-full rounded-2xl border border-antique-rose/25 bg-champagne/70 px-4 py-3 text-sm outline-none focus:border-antique-rose"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-dried-thyme">
                    Apellido
                  </span>
                  <input
                    required
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    className="w-full rounded-2xl border border-antique-rose/25 bg-champagne/70 px-4 py-3 text-sm outline-none focus:border-antique-rose"
                  />
                </label>
              </div>

              <fieldset>
                <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-dried-thyme">
                  ¿Cuántos invitados?
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  {(["1", "2"] as const).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => update("guests", n)}
                      className={`rounded-2xl border px-4 py-3 text-sm transition ${
                        form.guests === n
                          ? "border-dried-thyme bg-dried-thyme text-champagne"
                          : "border-antique-rose/25 bg-champagne/70 text-ink hover:border-antique-rose"
                      }`}
                    >
                      {n} {n === "1" ? "persona" : "personas"}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-dried-thyme">
                  Alergias / restricciones
                </span>
                <input
                  value={form.allergies}
                  onChange={(e) => update("allergies", e.target.value)}
                  placeholder="Ninguna / gluten / mariscos…"
                  className="w-full rounded-2xl border border-antique-rose/25 bg-champagne/70 px-4 py-3 text-sm outline-none focus:border-antique-rose"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-dried-thyme">
                  Celular
                </span>
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="81 0000 0000"
                  className="w-full rounded-2xl border border-antique-rose/25 bg-champagne/70 px-4 py-3 text-sm outline-none focus:border-antique-rose"
                />
              </label>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-dried-thyme px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-champagne transition hover:bg-ink disabled:opacity-60"
              >
                {status === "loading" ? "Enviando…" : "Confirmar asistencia"}
              </button>

              {status === "error" && (
                <p className="text-center text-sm text-antique-rose">
                  No se pudo enviar. Revisa la conexión a Sheets o intenta de
                  nuevo.
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
