import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ExperimentExplorer from "@/components/linq/ExperimentExplorer";
import { LINQ_LINKS } from "@/lib/linq";
import "./linq.css";

export const metadata: Metadata = {
  title: "For Linq — a growth proposal by Sergio Piñeros",
  description: "Three practical growth plans for Linq: customer proof, builder community and a clear path to production customers.",
  alternates: { canonical: "/linq" },
  robots: { index: false, follow: false },
  openGraph: { title: "For Linq — a growth proposal by Sergio Piñeros", description: "Customer stories, builder community and commercial adoption — step by step.", type: "article", url: "https://sergiopineros.com/linq", siteName: "Sergio Piñeros" },
};

function Arrow() {
  return <svg className="lq-arrow" aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M6 6h12v12" /></svg>;
}

export default function LinqPage() {
  return (
    <div className="lq-page">
      <a className="lq-skip" href="#introduction">Skip to the proposal</a>
      <header className="lq-header"><div className="lq-wrap lq-header-inner">
        <div className="lq-lockup"><a href={LINQ_LINKS.linq} target="_blank" rel="noopener noreferrer" aria-label="Visit Linq"><Image src="/linq/linq-logo.png" alt="Linq" width={100} height={50} priority /></a><span aria-hidden="true">×</span><Link href="/">Sergio Piñeros</Link></div>
        <nav aria-label="Main navigation"><a href="#experiments">The plans</a><a href={`mailto:${LINQ_LINKS.email}`}>Let’s talk <Arrow /></a></nav>
      </div></header>
      <main>
        <section id="introduction" className="lq-hero" aria-labelledby="linq-title">
          {/* Linq's own homepage illustration, used for this independent application proposal. */}
          <Image className="lq-hero-art" src="/linq/city-hero.webp" alt="" fill sizes="100vw" priority />
          <div className="lq-hero-tint" aria-hidden="true" />
          <div className="lq-wrap lq-hero-content">
            <p className="lq-hero-note">A growth proposal for Linq</p>
            <h1 id="linq-title">Help the right builders<br />choose Linq.</h1>
            <p className="lq-hero-lead">Customer stories, developer community, and campaigns that bring in qualified teams — and give them a reason to stay.</p>
            <a className="lq-hero-cta" href="#experiments">Explore the plans <Arrow /></a>
            <div className="lq-hero-outcomes"><span>Position the brand</span><svg aria-hidden="true" width="30" height="16" viewBox="0 0 30 16" fill="none" stroke="currentColor"><path d="M1 8h27m-6-6 6 6-6 6" /></svg><span>Earn trust</span><svg aria-hidden="true" width="30" height="16" viewBox="0 0 30 16" fill="none" stroke="currentColor"><path d="M1 8h27m-6-6 6 6-6 6" /></svg><span>Grow adoption</span></div>
          </div>
        </section>
        <ExperimentExplorer />
        <section className="lq-closing" aria-labelledby="closing-title"><div className="lq-wrap"><p>Creative strategy. Operational follow-through.</p><h2 id="closing-title">A good story opens the conversation.<br /><em>The work after it grows the business.</em></h2><a href={`mailto:${LINQ_LINKS.email}`}>Let’s talk about growth at Linq <Arrow /></a></div></section>
      </main>
      <footer className="lq-footer"><div className="lq-wrap lq-footer-inner">
        <div className="lq-footer-contact"><a href={`mailto:${LINQ_LINKS.email}`}>{LINQ_LINKS.email}</a><a href={LINQ_LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a></div>
        <a href={LINQ_LINKS.studio} target="_blank" rel="noopener noreferrer" className="lq-studio-link" aria-label="Visit Sergio & Co. creative studio"><Image src="/linq/sergio-co.svg" alt="Sergio & Co." width={280} height={62} /><Arrow /></a>
        <p className="lq-colophon">An independent proposal for Linq’s Growth Strategist role. Timelines are proposed pilots to validate with the team. Hero artwork: Linq.</p>
      </div></footer>
    </div>
  );
}
