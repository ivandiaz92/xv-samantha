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

const ogImage = withBasePath("/fotos/0I3A5827.jpg");

export const metadata: Metadata = {
  metadataBase: new URL("https://ivandiaz92.github.io/xv-samantha"),
  title: "Samantha Abigail · Mis XV",
  description:
    "Con la bendición de Dios y de mis padres, te invito a celebrar mis XV años.",
  openGraph: {
    title: "Samantha Abigail · Mis XV",
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
