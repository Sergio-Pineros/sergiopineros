import type { Metadata } from "next";
import { Baskervville, Inter } from "next/font/google";
import "./globals.css";

const serif = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-baskervville",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sergio Piñeros, brand & product designer",
  description:
    "Founder & Creative Director at Sergio Atelier. Brand identity, product design, AI systems, and visual storytelling.",
  icons: {
    icon: "/watermark.svg",
    apple: "/watermark.svg",
  },
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
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
