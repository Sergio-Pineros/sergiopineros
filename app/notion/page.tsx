import type { Metadata } from "next";
import NotionExperience from "@/components/notion/NotionExperience";
import "./notion.css";

export const metadata: Metadata = {
  title: "Experiments, built into Notion | Sergio Piñeros",
  description: "An independent feature concept showing how Notion AI Meeting Notes, databases, and Notion Agent could make experimentation easier for every team.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Experiments, built into Notion | Sergio Piñeros",
    description: "One place for ideas, experiments, decisions, and what we learn next.",
    type: "website",
    url: "https://www.sergiopineros.com/notion"
  }
};

export default function NotionPage() {
  return <NotionExperience />;
}
