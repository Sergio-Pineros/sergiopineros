import type { Metadata } from "next";
import TomoProductStudy from "@/components/tomo/TomoProductStudy";

export const metadata: Metadata = {
  title: "What happens after you text Tomo? — Sergio Piñeros",
  description: "A small, interactive product design exploration: from a message to a personalized interface and back. Designed and built by Sergio Piñeros.",
  alternates: { canonical: "/tomo" },
  robots: { index: false, follow: false },
};

export default function TomoPage() {
  return <TomoProductStudy />;
}
