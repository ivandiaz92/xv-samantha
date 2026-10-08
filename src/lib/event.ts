export const event = {
  celebrant: {
    firstName: "Samantha",
    fullName: "Samantha Abigail Lara González",
  },
  parents: {
    father: "Ignacio Alberto Lara Beltrán",
    mother: "Adriana Abigail González de la Garza",
  },
  dateLabel: "20 de noviembre de 2026",
  /** Viernes — misa 5:30 (America/Monterrey) */
  eventDateISO: "2026-11-20T17:30:00-06:00",
  /** Fin aproximado de la celebración */
  eventEndISO: "2026-11-20T23:30:00-06:00",
  calendarTitle: "XV años de Samantha Abigail",
  dressCode: "Black & White",
  itinerary: [
    {
      time: "5:30",
      title: "Misa",
      note: "Consideren sus tiempos de traslado: es viernes y la capilla está en carretera.",
      icon: "/generated/icon-misa-t.png",
    },
    {
      time: "8:00",
      title: "Recepción",
      note: null,
      icon: "/generated/icon-recepcion-t.png",
    },
    {
      time: "8:45",
      title: "Vals",
      note: null,
      icon: "/generated/icon-vals-t.png",
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
    "/fotos/0I3A1900.jpg",
    "/fotos/0I3A5743.jpg",
    "/fotos/0I3A2145.jpg",
    "/fotos/0I3A5940.jpg",
    "/fotos/0I3A6027.jpg",
    "/fotos/0I3A6152.jpg",
    "/fotos/0I3A6217.jpg",
    "/fotos/0I3A1741.jpg",
    "/fotos/0I3A2299.jpg",
    "/fotos/0I3A2403.jpg",
    "/fotos/0I3A5997.jpg",
    "/fotos/0I3A6094.jpg",
  ],
  // Desktop: boat landscape — Samantha on the right, open boat/water on the left
  heroImage: "/fotos/0I3A5827.jpg",
  // Mobile: twirl portrait
  heroImageMobile: "/fotos/0I3A5940.jpg",
  parentsImage: "/fotos/0I3A5743.jpg",
  parallaxImage: "/fotos/0I3A2409.jpg",
} as const;
