"use client";

import { useEffect, useRef } from "react";
import { event } from "@/lib/event";
import { withBasePath } from "@/lib/paths";

/** Parents blessing — dedicated romantic entrance (not the generic reveal) */
export function Parents() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      section.classList.add("parents-in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.classList.add("parents-in");
        observer.unobserve(section);
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="padres"
      className="parents-scene relative overflow-hidden px-5 pb-20 pt-10 md:px-8 md:pb-28 md:pt-14"
    >
      <div className="relative mx-auto max-w-2xl text-center">
        <div className="parents-flor mx-auto mb-10 md:mb-12">
          <img
            src={withBasePath("/decor/flor-divisor.png")}
            alt=""
            aria-hidden
            className="mx-auto w-full max-w-[280px] object-contain sm:max-w-[340px] md:max-w-[400px]"
          />
        </div>

        <p className="parents-script font-script text-4xl text-antique-rose md:text-5xl">
          Con amor
        </p>

        <h2 className="parents-title mt-3 font-display text-4xl text-ink md:text-5xl">
          <span className="parents-title-inner">Mis papás</span>
        </h2>

        <div className="parents-rule mx-auto mt-7 h-px w-16 bg-gradient-to-r from-transparent via-antique-rose/70 to-transparent" />

        <p className="parents-copy mx-auto mt-10 max-w-lg text-base leading-relaxed text-ink-soft md:mt-12 md:text-lg">
          Con la bendición de Dios y de mis padres,{" "}
          <span className="text-ink">{event.celebrant.fullName}</span>, te
          invita a compartir este momento tan especial.
        </p>

        <div className="mx-auto mt-12 grid max-w-xl gap-8 sm:grid-cols-2 sm:gap-10 md:mt-14">
          <div className="parents-card parents-card-papa">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dried-thyme">
              Papá
            </p>
            <p className="mt-2 font-display text-2xl leading-snug text-ink md:text-3xl">
              {event.parents.father}
            </p>
          </div>
          <div className="parents-card parents-card-mama">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dried-thyme">
              Mamá
            </p>
            <p className="mt-2 font-display text-2xl leading-snug text-ink md:text-3xl">
              {event.parents.mother}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
