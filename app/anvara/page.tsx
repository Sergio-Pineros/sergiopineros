import type { Metadata } from "next";
import Experience from "@/components/anvara/Experience";
import "./anvara.css";
export const metadata: Metadata = {
  title: "Anvara — From opportunity to outcome | Sergio Piñeros",
  description:
    "An independent product exploration: two marketplace journeys, a living decision space and a working sponsorship prototype by Sergio Piñeros.",
  alternates: { canonical: "/anvara" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Making the connection is only the beginning.",
    description: "Anvara / Independent product exploration / Sergio Piñeros",
    url: "https://sergiopineros.com/anvara",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anvara — From opportunity to outcome",
    description: "An independent product exploration by Sergio Piñeros.",
  },
};
export default function AnvaraPage() {
  return <Experience />;
}
