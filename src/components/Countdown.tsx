"use client";

import { useEffect, useMemo, useState } from "react";
import { openCalendarEvent } from "@/lib/calendar";
import { event } from "@/lib/event";
import { Reveal } from "./Reveal";

type Parts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getParts(targetMs: number): Parts {
  const diff = Math.max(0, targetMs - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff <= 0,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown() {
  const targetMs = useMemo(
    () => new Date(event.eventDateISO).getTime(),
    [],
  );
  const [parts, setParts] = useState<Parts>(() => getParts(targetMs));

  useEffect(() => {
    setParts(getParts(targetMs));
    const id = window.setInterval(() => setParts(getParts(targetMs)), 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  const units = [
    { label: "Días", value: parts.days },
    { label: "Horas", value: parts.hours },
    { label: "Minutos", value: parts.minutes },
    { label: "Segundos", value: parts.seconds },
  ];

  return (
    <section
      id="cuenta"
      className="relative px-5 pb-6 pt-14 md:pb-8 md:pt-20"
    >
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-script text-5xl text-antique-rose sm:text-6xl md:text-7xl">
            {parts.done ? "¡Hoy es el día!" : "Faltan"}
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-antique-rose/70 to-transparent" />
        </Reveal>

        <Reveal delay={1}>
          {!parts.done ? (
            <div className="mt-8 grid grid-cols-4 gap-2 sm:mt-10 sm:gap-4 md:gap-6">
              {units.map((unit, i) => (
                <div
                  key={unit.label}
                  className="relative flex flex-col items-center"
                >
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="absolute -left-1 top-[0.85rem] hidden text-2xl text-blush sm:block md:-left-3 md:top-4 md:text-3xl"
                    >
                      ·
                    </span>
                  )}
                  <span className="font-display text-4xl tabular-nums leading-none text-ink sm:text-5xl md:text-6xl">
                    {unit.label === "Días" ? unit.value : pad(unit.value)}
                  </span>
                  <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-soft sm:text-xs">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 font-display text-2xl text-ink md:text-3xl">
              Bienvenidos a la celebración
            </p>
          )}
        </Reveal>

        <Reveal delay={2}>
          <p className="mt-8 font-display text-2xl leading-snug text-ink sm:text-3xl md:mt-10 md:text-4xl">
            para la gran celebración
          </p>
        </Reveal>

        <Reveal delay={3}>
          <button
            type="button"
            onClick={openCalendarEvent}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-antique-rose/40 bg-paper/80 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-ink shadow-[0_10px_30px_rgba(200,125,135,0.12)] transition hover:border-antique-rose hover:bg-champagne md:mt-10 md:px-9 md:text-base"
          >
            Agregar al calendario
          </button>
        </Reveal>
      </div>
    </section>
  );
}
