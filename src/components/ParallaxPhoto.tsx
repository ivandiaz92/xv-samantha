import { event } from "@/lib/event";

type ParallaxPhotoProps = {
  image: string;
  imageDesktop?: string;
};

/**
 * Mobile: full photo at content width (natural height).
 * Desktop: fixed-height band; photo complete via object-contain (no crop).
 */
export function ParallaxPhoto({ image, imageDesktop }: ParallaxPhotoProps) {
  const desktopSrc = imageDesktop ?? image;

  return (
    <section aria-label="Retrato" className="w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={event.celebrant.fullName}
        className="block w-full h-auto md:hidden"
        draggable={false}
      />

      <div className="relative hidden h-[62vh] max-h-[580px] w-full overflow-hidden bg-[#b9b6b3] md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={desktopSrc}
          alt={event.celebrant.fullName}
          className="h-full w-full object-contain"
          draggable={false}
        />
      </div>
    </section>
  );
}
