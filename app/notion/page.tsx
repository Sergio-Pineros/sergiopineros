import type { Metadata } from "next";
import NotionExperience from "@/components/notion/NotionExperience";
import "./notion.css";

export const metadata: Metadata = {
  title: "For Notion — Less busywork. Better decisions. | Sergio Piñeros",
  description: "An independent product exploration for Notion's AI Product Manager, Growth Marketing role. A human-centered growth experimentation OS, built by Sergio Piñeros.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/notion" },
  openGraph: {
    title: "Less busywork. Better decisions. — Sergio Piñeros × Notion",
    description: "From signals to experiments to decisions. An independent Notion growth systems concept.",
    type: "article",
    url: "https://www.sergiopineros.com/notion"
  },
};

export default function NotionApplicationPage() {
  return <NotionExperience />;
}
