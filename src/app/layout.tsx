import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Great_Vibes } from "next/font/google";
import { withBasePath } from "@/lib/paths";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

const siteUrl = "https://rendevu.mx/xv-samantha";
// Relative to metadataBase (already includes /xv-samantha) — do not withBasePath
const ogImage = "/og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Samantha · Mis XV",
  description:
    "Con la bendición de Dios y de mis padres, te invito a celebrar mis XV años.",
  openGraph: {
    title: "Samantha · Mis XV",
    description: "Te invito a una noche especial llena de magia y alegría.",
    url: siteUrl,
    siteName: "Samantha · Mis XV",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Samantha · Mis XV",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samantha · Mis XV",
    description: "Te invito a una noche especial llena de magia y alegría.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const paperTexture = `url('${withBasePath("/textures/paper.jpg")}')`;

  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} ${script.variable} h-full antialiased`}
      style={{ ["--paper-texture"]: paperTexture } as CSSProperties}
    >
      <body className="min-h-full font-body text-ink">{children}</body>
    </html>
  );
}
