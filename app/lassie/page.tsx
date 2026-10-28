import type { Metadata } from "next";
import LassiePage from "@/components/lassie/LassiePage";

export const metadata: Metadata = {
  title: "Sergio Piñeros — Deployment Strategist, Lassie",
  description:
    "An application for Lassie's Deployment Strategist seat. The first eight weeks, owned.",
  openGraph: {
    title: "You're hiring for week eight.",
    description: "Let Sergio own deployment at Lassie.",
    type: "website",
  },
};

export default function Page() {
  return <LassiePage />;
}
