"use client";

import dynamic from "next/dynamic";
import { event } from "@/lib/event";
import { Reveal } from "./Reveal";

const LocationsMap = dynamic(
  () => import("./LocationsMap").then((m) => m.LocationsMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[320px] items-center justify-center rounded-[28px] bg-bisque/30 text-sm text-ink-soft md:h-[420px]">
        Cargando mapa…
      </div>
    ),
  },
);

export function Locations() {
  return (
    <section
      id="ubicaciones"
      className="relative bg-blush/20 px-5 pb-16 pt-24 md:px-8 md:pb-24 md:pt-28"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-dried-thyme">
            ¿Cómo llegar?
          </p>
          <h2 className="mt-3 text-center font-display text-4xl text-ink md:text-5xl">
            Ubicaciones
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10">
            <LocationsMap />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {event.locations.map((loc, i) => (
            <Reveal key={loc.id} delay={(i + 1) as 1 | 2}>
              <article className="relative overflow-hidden rounded-[28px] bg-paper/80 px-6 py-7 shadow-[0_12px_40px_rgba(61,52,46,0.06)]">
                <img
                  src="/decor/xv-sam-flor.png"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-2 w-16 object-contain opacity-60 md:w-[4.5rem]"
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-antique-rose">
                  {loc.label}
                </p>
                <h3 className="mt-2 font-display text-2xl leading-snug text-ink md:text-3xl">
                  {loc.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {loc.address}
                </p>
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-dried-thyme transition hover:text-ink"
                >
                  Abrir en Maps
                  <span aria-hidden>→</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
