import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tomo, thoughtfully reimagined | Sergio Piñeros",
  description: "An independent product design exploration for Tomo.",
  robots: { index: false, follow: false },
};

export default function TomoPage() {
  return <iframe title="Tomo — a product design exploration by Sergio Piñeros" src="/tomo-experience/index.html" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: 0, background: "#f5f1ee" }} />;
}
