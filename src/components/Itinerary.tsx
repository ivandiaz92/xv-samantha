import Image from "next/image";
import { event } from "@/lib/event";
import { Reveal } from "./Reveal";

export function Itinerary() {
  return (
    <section
      id="itinerario"
      className="relative px-5 pb-24 pt-6 md:px-8 md:pb-28 md:pt-8"
    >
      <div className="relative mx-auto max-w-xl">
        <Reveal>
          <h2 className="text-center font-display text-4xl text-ink md:text-5xl">
            Itinerario
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-antique-rose/70 to-transparent" />
        </Reveal>

        <ol className="relative mt-12 space-y-0 md:mt-14">
          {event.itinerary.map((item, index) => {
            const isLast = index === event.itinerary.length - 1;
            return (
              <li key={item.title} className="relative">
                {!isLast && (
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-[calc(100%-0.5rem)] z-0 h-8 w-px -translate-x-1/2 bg-gradient-to-b from-antique-rose/45 to-blush/20 md:h-10"
                  />
                )}

                <Reveal delay={(index % 3) as 0 | 1 | 2}>
                  <article
                    className={`relative z-10 mx-auto flex max-w-sm flex-col items-center px-2 text-center md:max-w-md ${
                      isLast ? "pb-0" : "pb-8 md:pb-10"
                    }`}
                  >
                    <div className="relative mb-6">
                      <div className="absolute -inset-3 rounded-full bg-blush/30 blur-xl" />
                      <div className="relative overflow-hidden rounded-[2rem] border border-blush/40 bg-paper/80 p-3 shadow-[0_18px_50px_rgba(200,125,135,0.14)] backdrop-blur-sm md:p-4">
                        <Image
                          src={item.icon}
                          alt=""
                          width={220}
                          height={220}
                          unoptimized
                          className="h-auto w-[9.5rem] object-contain md:w-[11.5rem]"
                          sizes="(max-width:768px) 152px, 184px"
                        />
                      </div>
                    </div>

                    <p className="font-display text-4xl leading-none text-antique-rose md:text-5xl">
                      {item.time}
                    </p>
                    <h3 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                      {item.title}
                    </h3>
                    {item.note && (
                      <p className="mt-4 max-w-xs text-lg leading-relaxed text-ink-soft md:max-w-sm md:text-xl">
                        {item.note}
                      </p>
                    )}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
