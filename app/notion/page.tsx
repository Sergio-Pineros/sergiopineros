import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design exploration | Sergio Piñeros",
  robots: { index: false, follow: false },
};

export default function NotionPage() {
  return <iframe title="Sergio Piñeros — design exploration" src="/notion-experience/index.html" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0, background: "#f5f1ee" }} />;
}
