import type { Metadata } from "next";
import { Averia_Serif_Libre, Inclusive_Sans, Caveat } from "next/font/google";
import "./globals.css";

const serif = Averia_Serif_Libre({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-averia-serif-libre",
  display: "swap",
});

const sans = Inclusive_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inclusive-sans",
  display: "swap",
});

const display = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sergio Piñeros, brand & product designer",
  description:
    "Founder & Creative Director at Sergio Atelier. Brand identity, product design, AI systems, and visual storytelling.",
  openGraph: {
    title: "Sergio Piñeros",
    description: "Designer who creates meaningful experiences through brand, product, and systems design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
