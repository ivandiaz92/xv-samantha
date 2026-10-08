import { event } from "@/lib/event";
import { Reveal } from "./Reveal";

export function DressCode() {
  return (
    <section
      id="vestimenta"
      className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#121212]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] bg-[#f2f2f2] md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[38%] hidden w-px bg-white/25 md:block"
      />

      <div className="relative mx-auto max-w-lg text-center md:mr-auto md:ml-[8%] md:max-w-md md:text-left">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
            Etiqueta
          </p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
            Código de vestimenta
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10 flex items-center justify-center gap-3 md:justify-start">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#121212] ring-1 ring-white/70" />
          </div>
          <p className="mt-5 font-display text-3xl tracking-[0.06em] text-white md:text-4xl">
            {event.dressCode}
          </p>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/60 md:mx-0 md:text-base">
            Formal · blanco y negro. Viste elegante para celebrar esta noche.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
