import Image from "next/image";
import { event } from "@/lib/event";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "./Reveal";

export function GiftTable() {
  return (
    <section
      id="regalos"
      className="relative overflow-hidden bg-[#fdece4] px-5 py-20 md:px-8 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.09] md:opacity-[0.14]"
        style={{
          backgroundImage: `url("${withBasePath("/textures/gift-tile.webp")}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative mx-auto max-w-xl text-center">
        <Reveal className="pt-8 md:pt-10">
          <h2 className="font-display text-4xl text-ink md:text-5xl">
            Mesa de regalos
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-antique-rose/70 to-transparent" />
        </Reveal>

        <Reveal delay={1}>
          <div className="relative mx-auto mt-12 inline-flex items-center justify-center md:mt-14">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[14.5rem] w-[14.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#fdece4] md:h-[17.5rem] md:w-[17.5rem]"
              style={{
                boxShadow: "0 0 36px 28px #fdece4",
              }}
            />
            <Image
              src={event.giftIcon}
              alt=""
              width={320}
              height={320}
              unoptimized
              className="relative mx-auto h-auto w-[13.5rem] object-contain md:w-[16.5rem]"
              sizes="(max-width:768px) 216px, 264px"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
