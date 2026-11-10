import type { Metadata, Viewport } from "next";
import { Baskervville, Caveat, DM_Sans } from "next/font/google";
import "./globals.css";

const serif = Baskervville({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-baskervville",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const display = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sergiopineros.com"),
  title: "Sergio Piñeros — artist, writer & maker",
  description:
    "Words, sounds, images, and things you can hold. The creative world of Sergio Piñeros, a Colombian artist, writer, and maker exploring attention, technology, and being alive.",
  alternates: { canonical: "/" },
  twitter: {
    card: "summary",
    title: "Sergio Piñeros — artist, writer & maker",
    description: "Words, sounds, images, and questions. A personal world of art, writing, music, and making.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Sergio Piñeros — artist, writer & maker",
    description: "Words, sounds, images, and questions. Step into the creative world of Colombian artist, writer, and maker Sergio Piñeros.",
    type: "website",
    url: "https://sergiopineros.com",
    locale: "en_US",
    siteName: "Sergio Piñeros",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
