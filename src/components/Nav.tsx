"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/paths";

const links = [
  { href: "#itinerario", label: "Itinerario" },
  { href: "#ubicaciones", label: "Ubicaciones" },
  { href: "#padres", label: "Familia" },
  { href: "#fotos", label: "Fotos" },
  { href: "#firmas", label: "Firmas" },
  { href: "#rsvp", label: "Confirmar" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Desktop only: solid bar after scroll. Mobile stays transparent unless menu open.
    const mq = window.matchMedia("(min-width: 768px)");
    const onScroll = () => {
      setScrolled(mq.matches && window.scrollY > 40);
    };
    onScroll();
    mq.addEventListener("change", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", onScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        open
          ? "bg-champagne/95 backdrop-blur-md"
          : scrolled
            ? "bg-champagne/90 backdrop-blur-md shadow-[0_1px_0_rgba(200,125,135,0.18)]"
            : "bg-transparent"
      }`}
    >
      <div className="relative z-20 mx-auto flex max-w-6xl items-center justify-end gap-6 px-4 py-3 md:px-6">
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-soft transition hover:text-antique-rose"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden ${
            open
              ? "border-antique-rose/40 bg-paper/70 text-antique-rose"
              : "border-antique-rose/30 bg-transparent text-ink"
          }`}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menú</span>
          <span className="relative flex h-3.5 w-4 flex-col justify-between">
            <span
              className={`block h-px w-full origin-center bg-current transition duration-300 ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-full bg-current transition duration-300 ${
                open ? "scale-x-0 opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-full origin-center bg-current transition duration-300 ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Soft full-panel mobile menu */}
      <div
        className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`fixed inset-0 z-10 bg-ink/20 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute inset-x-0 top-0 z-10 origin-top overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open
              ? "max-h-[100svh] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative min-h-[100svh] bg-gradient-to-b from-champagne via-paper to-blush/35 px-6 pb-12 pt-20">
            <img
              src={withBasePath("/decor/seal.png")}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-6 top-24 w-28 opacity-[0.12]"
            />
            <img
              src={withBasePath("/decor/eucalyptus.png")}
              alt=""
              aria-hidden
              className="pointer-events-none absolute -left-4 bottom-16 w-24 rotate-[-18deg] opacity-30"
            />

            <div className="relative mx-auto flex max-w-sm flex-col">
              <p className="text-center font-script text-3xl text-antique-rose/90">
                Menú
              </p>
              <div className="mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-antique-rose/50 to-transparent" />

              <nav className="mt-10 flex flex-col items-center gap-1">
                {links.map((link, i) => {
                  const isCta = link.href === "#rsvp";
                  if (isCta) {
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="mt-8 inline-flex min-w-[12rem] items-center justify-center rounded-full bg-dried-thyme px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-champagne transition hover:bg-ink"
                        style={{
                          transitionDelay: open ? `${120 + i * 40}ms` : "0ms",
                          opacity: open ? 1 : 0,
                          transform: open ? "translateY(0)" : "translateY(10px)",
                          transitionProperty: "opacity, transform, background-color",
                          transitionDuration: "500ms",
                        }}
                      >
                        {link.label}
                      </a>
                    );
                  }

                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="w-full py-3 text-center font-display text-[1.85rem] tracking-[0.02em] text-ink transition hover:text-antique-rose"
                      style={{
                        transitionDelay: open ? `${80 + i * 40}ms` : "0ms",
                        opacity: open ? 1 : 0,
                        transform: open ? "translateY(0)" : "translateY(10px)",
                        transitionProperty: "opacity, transform, color",
                        transitionDuration: "500ms",
                      }}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
