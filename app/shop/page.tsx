import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Objects | Sergio Piñeros",
  description: "What Are We Making Sacred? A bilingual card deck in progress.",
};
export default function Shop() {
  return <main className="artist-shop">
    <header className="artist-shop-header"><Link href="/">← Sergio Piñeros</Link><span>Objects / 01</span></header>
    <section className="artist-shop-section">
      <p className="artist-eyebrow">An object in the making</p>
      <h1>What Are We<br />Making Sacred?</h1>
      <p className="artist-shop-lead">A bilingual deck of cards that turns a moment of resistance into a moment of inquiry.
        Not every difficulty is positive. But it might be worth looking at more closely.</p>
      <div className="artist-card-preview">
        <span>01 / ATTENTION</span>
        <p>My resistance is information, not a verdict.</p>
        <small>Mi resistencia es información, no una sentencia.</small>
        <span>What is it protecting?</span>
      </div>
      <p className="artist-shop-status">The deck is being written and prototyped. No checkout, preorders, or shipping dates are open yet.</p>
      <a href="https://sergwrites.substack.com">Follow the process on Substack ↗</a>
    </section><footer className="artist-shop-footer">An invitation to pay attention.</footer>
  </main>;
}
