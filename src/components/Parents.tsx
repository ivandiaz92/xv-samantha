import { event } from "@/lib/event";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "./Reveal";

/** Parents blessing / names — text only, below hero */
export function Parents() {
  return (
    <section
      id="padres"
      className="relative overflow-hidden px-5 pb-20 pt-10 md:px-8 md:pb-28 md:pt-14"
    >
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal className="reveal-soft">
          <img
            src={withBasePath("/decor/flor-divisor.png")}
            alt=""
            aria-hidden
            className="mx-auto mb-10 w-full max-w-[280px] object-contain sm:max-w-[340px] md:mb-12 md:max-w-[400px]"
          />
        </Reveal>

        <Reveal className="reveal-soft" delay={1}>
          <p className="font-script text-4xl text-antique-rose md:text-5xl">
            Con amor
          </p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            Mis papás
          </h2>
        </Reveal>

        <Reveal className="reveal-soft" delay={2}>
          <p className="mx-auto mt-10 max-w-lg text-base leading-relaxed text-ink-soft md:mt-12 md:text-lg">
            Con la bendición de Dios y de mis padres,{" "}
            <span className="text-ink">{event.celebrant.fullName}</span>, te
            invita a compartir este momento tan especial.
          </p>
        </Reveal>

        <Reveal className="reveal-soft" delay={3}>
          <div className="mx-auto mt-12 grid max-w-xl gap-8 sm:grid-cols-2 sm:gap-10 md:mt-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dried-thyme">
                Papá
              </p>
              <p className="mt-2 font-display text-2xl leading-snug text-ink md:text-3xl">
                {event.parents.father}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dried-thyme">
                Mamá
              </p>
              <p className="mt-2 font-display text-2xl leading-snug text-ink md:text-3xl">
                {event.parents.mother}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
