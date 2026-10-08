"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { event } from "@/lib/event";

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:28px;height:28px;border-radius:999px;background:#C87D87;border:3px solid #FBEAD6;box-shadow:0 6px 16px rgba(61,52,46,.25)"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export function LocationsMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const instance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || instance.current) return;

    const [first, ...rest] = event.locations;
    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      zoomControl: false,
      center: [first.lat, first.lng],
      zoom: 13,
    });

    // OpenStreetMap — free, no API key
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const bounds = L.latLngBounds([[first.lat, first.lng]]);
    [first, ...rest].forEach((loc) => {
      const marker = L.marker([loc.lat, loc.lng], { icon: pinIcon }).addTo(map);
      marker.bindPopup(
        `<strong>${loc.name}</strong><br/><span style="font-size:12px;opacity:.75">${loc.label}</span>`,
      );
      bounds.extend([loc.lat, loc.lng]);
    });

    map.fitBounds(bounds.pad(0.45));
    // Ensure tiles paint correctly after layout
    requestAnimationFrame(() => map.invalidateSize());
    instance.current = map;

    return () => {
      map.remove();
      instance.current = null;
    };
  }, []);

  return (
    <div className="h-[320px] overflow-hidden rounded-[28px] border border-blush/50 shadow-[0_20px_50px_rgba(200,125,135,0.12)] md:h-[420px]">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}
