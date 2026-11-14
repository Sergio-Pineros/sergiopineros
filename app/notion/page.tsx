import type { Metadata } from "next";
import NotionExperience from "@/components/notion/NotionExperience";
import "./notion.css";

export const metadata: Metadata = {
  title: "For Notion: Make every experiment count | Sergio Piñeros",
  description: "An interactive idea for Notion's AI Product Manager, Growth Marketing role. Built by Sergio Piñeros.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/notion" },
  openGraph: {
    title: "Make every experiment count | Sergio Piñeros for Notion",
    description: "A small, interactive growth experiment concept by Sergio Piñeros.",
    type: "article",
    url: "https://www.sergiopineros.com/notion"
  },
};

export default function NotionApplicationPage() {
  return <NotionExperience />;
}
