import Image from "next/image";
import { event } from "@/lib/event";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "./Reveal";

function HeroCopy({
  variant = "default",
}: {
  variant?: "default" | "overPhoto";
}) {
  const over = variant === "overPhoto";

  return (
    <div
      className={`w-full ${
        over ? "max-w-[92%] text-left" : "max-w-xl md:max-w-2xl"
      }`}
    >
      <Reveal>
        <p
          className={`mb-2 font-script leading-none ${
            over
              ? "text-[3.65rem] text-blush drop-shadow-[0_2px_10px_rgba(61,52,46,0.35)] sm:text-[3.85rem]"
              : "text-6xl text-antique-rose sm:text-7xl md:text-8xl"
          }`}
        >
          XV años
        </p>
      </Reveal>

      <Reveal delay={1}>
        <h1
          className={`font-display leading-[0.95] tracking-tight ${
            over
              ? "whitespace-nowrap text-[2.95rem] text-champagne drop-shadow-[0_3px_16px_rgba(61,52,46,0.45)] sm:text-[3.85rem]"
              : "text-[3.9rem] text-ink sm:text-7xl md:text-8xl"
          }`}
        >
          {event.celebrant.firstName}
        </h1>
      </Reveal>

      {!over && (
        <Reveal delay={2}>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.22em] text-[#C87D87]">
            {event.dateLabel}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-champagne">
      {/* —— Mobile: full viewport; subject right; copy top-left —— */}
      <div className="md:hidden">
        <div className="relative h-[100svh] min-h-[100svh] w-full">
          <Image
            src={event.heroImageMobile}
            alt={event.celebrant.fullName}
            fill
            priority
            className="object-cover object-[50%_42%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-x-0 top-0 h-[48%]"
            style={{
              background: `
                linear-gradient(
                  to bottom,
                  rgba(61, 52, 46, 0.5) 0%,
                  rgba(61, 52, 46, 0.22) 55%,
                  rgba(61, 52, 46, 0) 100%
                )
              `,
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
            style={{
              // Longer, softer fade so the champagne seam doesn’t read as a hard line
              background: `
                linear-gradient(
                  to top,
                  rgba(251, 234, 214, 1) 0%,
                  rgba(251, 234, 214, 0.92) 12%,
                  rgba(251, 234, 214, 0.62) 32%,
                  rgba(251, 234, 214, 0.28) 55%,
                  rgba(251, 234, 214, 0.08) 78%,
                  rgba(251, 234, 214, 0) 100%
                )
              `,
            }}
          />

          <div className="relative z-10 flex h-full flex-col justify-start px-5 pb-16 pt-24">
            <HeroCopy variant="overPhoto" />
          </div>
        </div>
      </div>

      {/* —— Desktop: boat — Samantha right, copy left —— */}
      <div className="relative hidden min-h-[100svh] md:block">
        <div className="absolute inset-0">
          <Image
            src={event.heroImage}
            alt={event.celebrant.fullName}
            fill
            priority
            className="object-cover object-[58%_42%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  90deg,
                  rgba(251, 234, 214, 0.72) 0%,
                  rgba(251, 234, 214, 0.42) 26%,
                  rgba(251, 234, 214, 0.12) 44%,
                  rgba(251, 234, 214, 0) 58%
                )
              `,
            }}
          />
        </div>

        <img
          src={withBasePath("/decor/eucalyptus.png")}
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-6 top-24 w-32 opacity-45 float-soft lg:w-40"
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-8 pb-28 pt-16 lg:px-12">
          <HeroCopy />
        </div>
      </div>
    </section>
  );
}
