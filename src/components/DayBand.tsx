import { Countdown } from "@/components/Countdown";
import { Itinerary } from "@/components/Itinerary";
import { withBasePath } from "@/lib/paths";

/** Shared watercolor atmosphere for countdown + itinerary */
export function DayBand() {
  return (
    <div className="relative overflow-hidden bg-[#fbead6]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("${withBasePath("/textures/watercolor-washes.jpg")}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.58,
        }}
      />

      <div className="relative">
        <Countdown />
        <div className="relative flex justify-center px-5 py-8 md:py-12">
          <img
            src={withBasePath("/decor/ornate-divider.png")}
            alt=""
            aria-hidden
            className="w-full max-w-xl object-contain opacity-60 md:max-w-3xl"
            style={{
              filter:
                "sepia(0.35) saturate(0.85) hue-rotate(320deg) brightness(0.85)",
            }}
          />
        </div>
        <Itinerary />
      </div>
    </div>
  );
}
