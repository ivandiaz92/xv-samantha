import { event } from "@/lib/event";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "./Reveal";

export function DressCode() {
  const pattern = `url('${withBasePath("/textures/bg-dc.webp")}')`;

  return (
    <section
      id="vestimenta"
      className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28"
    >
      {/* Base black */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#121212]"
      />

      {/* Pattern: full width on mobile; black side only on desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.26] mix-blend-soft-light md:right-[38%]"
        style={{
          backgroundImage: pattern,
          backgroundSize: "340px",
          backgroundRepeat: "repeat",
          backgroundPosition: "center top",
        }}
      />
      {/* Extra soft veil so pattern reads as texture, not wallpaper */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#121212]/45 md:right-[38%]"
      />

      {/* Desktop light panel — stays clean, no pattern */}
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
            Dress Code
          </p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
            Código de vestimenta
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10 flex items-center justify-center gap-3 md:justify-start">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-white" />
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full bg-[#121212] ring-1 ring-white/70"
            />
          </div>
          <p className="mt-5 font-display text-3xl tracking-[0.06em] text-white md:text-4xl">
            {event.dressCode}
          </p>
          <a
            href={event.dressCodeInspoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 border-b border-white/25 pb-0.5 font-display text-xl tracking-[0.04em] text-white/85 transition hover:border-white/50 hover:text-white md:text-2xl"
          >
            Inspiración
            <span
              aria-hidden
              className="translate-y-px text-sm text-white/50 transition group-hover:translate-x-0.5 group-hover:text-white/80 md:text-base"
            >
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
