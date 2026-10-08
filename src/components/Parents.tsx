"use client";

import { useEffect, useRef } from "react";
import { event } from "@/lib/event";
import { withBasePath } from "@/lib/paths";

/** Parents blessing — dedicated romantic entrance */
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
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="padres"
      className="parents-scene relative overflow-x-clip px-5 pb-20 pt-28 md:overflow-hidden md:px-8 md:pb-28 md:pt-14"
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

        <p className="parents-copy mx-auto max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
          Con el corazón lleno de ilusión, doy gracias a Dios por regalarme la
          vida
        </p>

        <p className="parents-script mt-10 font-script text-4xl text-antique-rose md:mt-12 md:text-5xl">
          A mis padres,
        </p>

        <div className="parents-names mt-4 font-display text-2xl leading-snug text-ink md:text-3xl">
          <p>{event.parents.father}</p>
          <p className="my-1 text-xl text-antique-rose md:text-2xl">&</p>
          <p>{event.parents.mother}</p>
        </div>

        <div className="parents-rule mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-antique-rose/70 to-transparent" />

        <p className="parents-copy-2 mx-auto mt-8 max-w-lg text-base leading-relaxed text-ink-soft md:mt-10 md:text-lg">
          Gracias por ser mi hogar, mi fuerza y mi ejemplo. Gracias por cada
          abrazo, cada sacrificio, cada consejo y por hacer realidad tantos
          sueños.
        </p>

        <p className="parents-copy-3 mx-auto mt-6 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
          Gracias por compartir conmigo este momento que guardaré para siempre
          en mi corazón.
        </p>

        <p className="parents-sign-label mt-12 font-script text-3xl text-antique-rose md:mt-14 md:text-4xl">
          atentamente:
        </p>
        <p className="parents-sign-name mt-2 font-display text-2xl leading-snug text-ink md:text-3xl">
          Samantha Abigail Lara de la Garza
        </p>
      </div>
    </section>
  );
}
