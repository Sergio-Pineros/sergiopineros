import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";

const preloadedFonts = [
  "baskervville-italic-latin",
  "baskervville-latin",
  "dm-sans-latin",
  "caveat-latin",
];

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {preloadedFonts.map((font) => (
          <link
            key={font}
            rel="preload"
            href={`/fonts/portfolio/${font}.woff2`}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
