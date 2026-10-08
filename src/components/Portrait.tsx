import Image from "next/image";
import { event } from "@/lib/event";
import { Reveal } from "./Reveal";

/** Portrait feature — photo only (separated from parents text) */
export function Portrait() {
  return (
    <section id="retrato" className="section-pad relative overflow-hidden">
      <div className="relative mx-auto w-full max-w-sm md:max-w-md">
        <Reveal>
          <div className="relative">
            <div className="arch relative aspect-[3/4] overflow-hidden shadow-[0_24px_60px_rgba(200,125,135,0.2)]">
              <Image
                src={event.parentsImage}
                alt={event.celebrant.fullName}
                fill
                className="object-cover object-center"
                sizes="(max-width:768px) 90vw, 420px"
              />
            </div>
            <img
              src="/decor/wreath.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -bottom-8 -left-8 w-36 opacity-90 float-soft md:w-44"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
