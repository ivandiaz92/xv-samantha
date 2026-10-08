"use client";

import { useEffect, useRef } from "react";
import { event } from "@/lib/event";

/**
 * Desktop: CSS background-attachment:fixed (smooth, no JS wobble).
 * Mobile: soft JS pan only — never overwrite the mobile crop that worked.
 */
export function ParallaxPhoto() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section || !media) return;

    // Desktop uses CSS fixed attachment — leave transforms alone
    const desktop = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 768px)",
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let vh = window.innerHeight;

    const layout = () => {
      vh = window.innerHeight;
      if (desktop.matches) {
        media.style.height = "100%";
        media.style.transform = "";
        return;
      }
      // Mobile: taller than the band for a gentle pan
      media.style.height = `${Math.round(section.offsetHeight * 1.5)}px`;
    };

    const update = () => {
      frame = 0;
      if (desktop.matches || reduced.matches) {
        media.style.transform = desktop.matches ? "" : "translate3d(0,0,0)";
        return;
      }

      const rect = section.getBoundingClientRect();
      const extra = section.offsetHeight * 0.5;
      const progress = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh + rect.height)),
      );
      // Integer px, soft travel — avoids the 1:1 lock that made iOS shake
      media.style.transform = `translate3d(0, ${Math.round(-progress * extra)}px, 0)`;
    };

    const onScroll = () => {
      if (desktop.matches) return;
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      layout();
      update();
    };

    layout();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      desktop.removeEventListener("change", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Retrato"
      className="relative h-[58vh] min-h-[280px] max-h-[520px] w-full overflow-hidden md:h-[75vh] md:max-h-none"
    >
      <div
        ref={mediaRef}
        className="parallax-media absolute left-0 top-0 w-full bg-cover bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${event.parallaxImage})`,
        }}
        role="img"
        aria-label={event.celebrant.fullName}
      />
    </section>
  );
}
