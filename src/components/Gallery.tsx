"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { event } from "@/lib/event";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "./Reveal";

export function Gallery() {
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopViewportRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const photos = event.gallery;

  const isDesktop = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches;

  const goTo = useCallback(
    (i: number) => {
      const next = Math.min(photos.length - 1, Math.max(0, i));
      setIndex(next);

      if (!isDesktop()) {
        const el = mobileRef.current;
        const slide = el?.querySelector<HTMLElement>(`[data-slide="${next}"]`);
        slide?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    },
    [photos.length],
  );

  const go = useCallback((dir: -1 | 1) => goTo(index + dir), [goTo, index]);

  // Center active slide on desktop by measuring real layout
  useLayoutEffect(() => {
    const measure = () => {
      if (!isDesktop()) return;
      const viewport = desktopViewportRef.current;
      const track = desktopTrackRef.current;
      const slide = track?.querySelector<HTMLElement>(
        `[data-dslide="${index}"]`,
      );
      if (!viewport || !track || !slide) return;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const viewCenter = viewport.clientWidth / 2;
      setOffset(viewCenter - slideCenter);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);

  // Sync index from mobile scroll
  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;

    const onScroll = () => {
      if (isDesktop()) return;
      const slides = Array.from(
        el.querySelectorAll<HTMLElement>("[data-slide]"),
      );
      if (!slides.length) return;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((slide, i) => {
        const center = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setIndex(best);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active) {
        if (e.key === "Escape") setActive(null);
        return;
      }
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  return (
    <section
      id="fotos"
      className="section-pad relative overflow-hidden bg-champagne/40"
    >
      {/* Olives texture — soft full-bleed atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none"
      >
        <Image
          src={withBasePath("/textures/olives-BG.png")}
          alt=""
          fill
          unoptimized
          priority={false}
          className="object-cover object-center opacity-[0.32] sm:opacity-[0.32] md:opacity-[0.36]"
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-ink md:text-5xl">
            Galería
          </h2>
        </Reveal>
      </div>

      <Reveal delay={1}>
        <div className="relative mt-10 md:mt-14">
          {/* Mobile */}
          <div
            ref={mobileRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[12vw] pb-4 pt-2 scroll-smooth scrollbar-none md:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {photos.map((src, i) => {
              const on = i === index;
              return (
                <button
                  key={src}
                  type="button"
                  data-slide={i}
                  onClick={() => setActive(src)}
                  className={`relative aspect-[3/4] w-[70vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-[28px] shadow-[0_18px_50px_rgba(61,52,46,0.12)] transition duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-antique-rose ${
                    on ? "scale-100 opacity-100" : "scale-[0.92] opacity-55"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Samantha — foto ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="70vw"
                  />
                </button>
              );
            })}
          </div>

          {/* Desktop */}
          <div className="relative mx-auto hidden max-w-5xl px-14 md:block">
            <div ref={desktopViewportRef} className="overflow-hidden py-6">
              <div
                ref={desktopTrackRef}
                className="flex w-max items-center gap-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translate3d(${offset}px, 0, 0)` }}
              >
                {photos.map((src, i) => {
                  const on = i === index;
                  return (
                    <button
                      key={src}
                      type="button"
                      data-dslide={i}
                      onClick={() => {
                        if (i === index) setActive(src);
                        else goTo(i);
                      }}
                      className={`relative aspect-[3/4] w-[300px] shrink-0 overflow-hidden rounded-[28px] shadow-[0_18px_50px_rgba(61,52,46,0.12)] transition duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-antique-rose lg:w-[340px] ${
                        on
                          ? "z-10 scale-100 opacity-100"
                          : "scale-[0.9] opacity-45 hover:opacity-70"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Samantha — foto ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="340px"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              aria-label="Anterior"
              onClick={() => go(-1)}
              disabled={index === 0}
              className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-antique-rose/35 bg-paper/90 text-ink shadow-sm transition hover:border-antique-rose hover:bg-champagne disabled:pointer-events-none disabled:opacity-30"
            >
              <span aria-hidden className="font-display text-xl leading-none">
                ←
              </span>
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={() => go(1)}
              disabled={index === photos.length - 1}
              className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-antique-rose/35 bg-paper/90 text-ink shadow-sm transition hover:border-antique-rose hover:bg-champagne disabled:pointer-events-none disabled:opacity-30"
            >
              <span aria-hidden className="font-display text-xl leading-none">
                →
              </span>
            </button>
          </div>

          <div className="mx-auto mt-8 flex max-w-6xl items-center justify-center gap-5 px-5 md:mt-2">
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => go(-1)}
              disabled={index === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-antique-rose/35 bg-paper/80 text-ink transition hover:border-antique-rose hover:bg-champagne disabled:opacity-30 md:hidden"
            >
              <span aria-hidden className="font-display text-xl leading-none">
                ←
              </span>
            </button>

            <div className="flex items-center gap-2">
              {photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Ir a foto ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-7 bg-antique-rose"
                      : "w-1.5 bg-antique-rose/30 hover:bg-antique-rose/55"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Siguiente"
              onClick={() => go(1)}
              disabled={index === photos.length - 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-antique-rose/35 bg-paper/80 text-ink transition hover:border-antique-rose hover:bg-champagne disabled:opacity-30 md:hidden"
            >
              <span aria-hidden className="font-display text-xl leading-none">
                →
              </span>
            </button>
          </div>

          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-dried-thyme">
            {index + 1} / {photos.length}
          </p>
        </div>
      </Reveal>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-champagne/90 px-4 py-2 text-xs uppercase tracking-[0.16em] text-ink"
            onClick={() => setActive(null)}
          >
            Cerrar
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[24px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active}
              alt="Vista ampliada"
              width={1400}
              height={1800}
              className="h-auto max-h-[90vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
