import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { DateLockup } from "@/components/DateLockup";
import { Parents } from "@/components/Parents";
import { DayBand } from "@/components/DayBand";
import { Locations } from "@/components/Locations";
import { ParallaxPhoto } from "@/components/ParallaxPhoto";
import { DressCode } from "@/components/DressCode";
import { Gallery } from "@/components/Gallery";
import { GiftTable } from "@/components/GiftTable";
import { Guestbook } from "@/components/Guestbook";
import { Rsvp } from "@/components/Rsvp";
import { event } from "@/lib/event";
import { withBasePath } from "@/lib/paths";

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="relative">
        <Hero />
        {/* Bridges hero ↔ parents — does not belong to either section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-5 md:hidden">
          <div className="translate-y-1/2">
            <DateLockup />
          </div>
        </div>
      </div>
      <Parents />
      <div className="relative">
        <DayBand />
        {/* Overlays the natural seam — does not add section height */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-full max-w-2xl -translate-x-1/2 translate-y-1/2 px-5">
          <img
            src={withBasePath("/decor/rose-border.png")}
            alt=""
            aria-hidden
            className="mx-auto w-full max-w-[340px] opacity-90 sm:max-w-md md:max-w-xl"
          />
        </div>
      </div>

      <Locations />
      <ParallaxPhoto image={event.parallaxImage} />
      <DressCode />
      <div className="relative">
        <Gallery />
        {/* Soft floral seam between Galería and Mesa de regalos */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 flex w-full max-w-xl -translate-x-1/2 translate-y-[52%] items-end justify-center gap-0 px-4 -space-x-6 sm:-space-x-8">
          <img
            src={withBasePath("/decor/bouquet.png")}
            alt=""
            aria-hidden
            className="w-[38%] max-w-[155px] object-contain brightness-[0.96] saturate-[0.72] drop-shadow-[0_12px_28px_rgba(200,125,135,0.18)] sm:max-w-[180px] md:max-w-[200px]"
          />
          <img
            src={withBasePath("/decor/bouquet.png")}
            alt=""
            aria-hidden
            className="w-[38%] max-w-[155px] -scale-x-100 object-contain brightness-[0.96] saturate-[0.72] drop-shadow-[0_12px_28px_rgba(200,125,135,0.18)] sm:max-w-[180px] md:max-w-[200px]"
          />
        </div>
      </div>
      <GiftTable />
      <Guestbook />
      <Rsvp />
      <footer className="border-t border-blush/40 px-5 py-12 text-center">
        <p className="font-script text-3xl text-antique-rose">Con cariño</p>
        <p className="mt-2 font-display text-2xl text-ink">
          {event.celebrant.firstName}
        </p>
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C87D87]">
          {event.dateLabel}
        </p>
      </footer>
    </main>
  );
}
