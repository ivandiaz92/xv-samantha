import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Great_Vibes } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Samantha Abigail · Mis XV",
  description:
    "Con la bendición de Dios y de mis padres, te invito a celebrar mis XV años.",
  openGraph: {
    title: "Samantha Abigail · Mis XV",
    description: "Te invito a una noche especial llena de magia y alegría.",
    images: ["/fotos/0I3A5827.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full font-body text-ink">{children}</body>
    </html>
  );
}
