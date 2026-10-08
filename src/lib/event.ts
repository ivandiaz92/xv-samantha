import { withBasePath } from "@/lib/paths";

const asset = (path: string) => withBasePath(path);

export const event = {
  celebrant: {
    firstName: "Samantha",
    fullName: "Samantha Abigail Lara González",
  },
  parents: {
    father: "Ignacio Alberto Lara Beltrán",
    mother: "Adriana Abigail González de la Garza",
  },
  dateLabel: "20 de noviembre 2026",
  /** Viernes — misa 5:30 (America/Monterrey) */
  eventDateISO: "2026-11-20T17:30:00-06:00",
  /** Fin aproximado de la celebración */
  eventEndISO: "2026-11-20T23:30:00-06:00",
  calendarTitle: "XV años de Samantha",
  dressCode: "Black & White",
  /** Black & White formal inspo board */
  dressCodeInspoUrl: "https://pin.it/4tfUZHXzU",
  itinerary: [
    {
      time: "5:30 PM",
      title: "Misa",
      note: "Capilla Santa María de Fuego Nuevo",
      icon: asset("/generated/icon-misa-t.png"),
    },
    {
      time: "8:00 PM",
      title: "Recepción",
      note: "Verité",
      icon: asset("/generated/icon-recepcion-one-t.png"),
    },
    {
      time: "8:45 PM",
      title: "Vals",
      note: "Verité",
      icon: asset("/generated/icon-vals-t.png"),
    },
  ],
  locations: [
    {
      id: "capilla",
      label: "Misa",
      name: "Capilla Santa María de Fuego Nuevo",
      address: "Antiguo Camino a Villa de Santiago 1011, Monterrey, N.L.",
      mapsUrl: "https://maps.app.goo.gl/SmAKC6zaYHHHSNLd7?g_st=ic",
      lat: 25.5652,
      lng: -100.2358,
    },
    {
      id: "verite",
      label: "Recepción",
      name: "Verité",
      address: "Carr. Nacional 268, Villas La Rioja, Monterrey, N.L.",
      mapsUrl: "https://maps.app.goo.gl/tL9PTFbNxS9yyjB99?g_st=ic",
      lat: 25.5788,
      lng: -100.2485,
    },
  ],
  gallery: [
    asset("/fotos/0I3A5940.jpg"),
    asset("/fotos/0I3A1900.jpg"),
    asset("/fotos/0I3A2145.jpg"),
    asset("/fotos/0I3A6027.jpg"),
    asset("/fotos/0I3A6152.jpg"),
    asset("/fotos/0I3A6217.jpg"),
    asset("/fotos/0I3A1741.jpg"),
    asset("/fotos/0I3A2299.jpg"),
    asset("/fotos/0I3A5997.jpg"),
    asset("/fotos/0I3A6094.jpg"),
  ],
  giftIcon: asset("/generated/icon-sobre-t.png"),
  // Desktop: boat landscape — Samantha on the right, open boat/water on the left
  heroImage: asset("/fotos/0I3A5827.jpg"),
  // Mobile: boat portrait
  heroImageMobile: asset("/fotos/0I3A5743.jpg"),
  parentsImage: asset("/fotos/0I3A5743.jpg"),
  parallaxImage: asset("/fotos/0I3A2409.jpg"),
  parallaxPortraitImage: asset("/fotos/0I3A5743.jpg"),
};
