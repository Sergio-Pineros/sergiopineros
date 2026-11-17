import type { Metadata } from "next";
import NotionAttentionEssay from "@/components/notion/NotionAttentionEssay";
import "./notion-essay.css";

export const metadata: Metadata = {
  title: "What if software had drawers? | Sergio Piñeros",
  description: "An independent, research-informed experiment in ADHD, attention, progressive disclosure, and interactive bento design. Explore the working drawers prototype.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "What if software had drawers?",
    description: "A design hypothesis about ADHD, cognitive load, and interfaces that let people choose how much they see.",
    type: "article",
    url: "https://www.sergiopineros.com/notion"
  }
};

export default function NotionPage() {
  return <NotionAttentionEssay />;
}
