import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ExperimentExplorer from "@/components/linq/ExperimentExplorer";
import { LINQ_LINKS } from "@/lib/linq";
import "./linq.css";

export const metadata: Metadata = {
  title: "For Linq — a growth proposal by Sergio Piñeros",
  description: "How customer proof, developer community and deliberate brand positioning could drive adoption and long-term business value for Linq.",
  alternates: { canonical: "/linq" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "For Linq — a growth proposal by Sergio Piñeros",
    description: "Customer proof, builder community and a clear path to production customers.",
    type: "article",
    url: "https://sergiopineros.com/linq",
    siteName: "Sergio Piñeros",
  },
};

function Arrow() {
  return <svg className="lq-arrow" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M6 6h12v12" /></svg>;
}

export default function LinqPage() {
  return (
    <div className="lq-page">
      <a className="lq-skip" href="#introduction">Skip to the proposal</a>
      <header className="lq-header lq-wrap">
        <Link href="/" className="lq-name">Sergio Piñeros</Link>
        <a href={LINQ_LINKS.linq} target="_blank" rel="noopener noreferrer" aria-label="Visit Linq"><Image src="/linq/linq-logo.png" alt="Linq" width={100} height={50} priority /></a>
      </header>
      <main>
        <section id="introduction" className="lq-hero lq-wrap" aria-labelledby="linq-title">
          <h1 id="linq-title">Help the right builders<br /><em>choose Linq.</em></h1>
          <p>I’d connect customer stories, developer community, and campaigns around one goal: more qualified teams choosing Linq and staying with it.</p>
          <a className="lq-link" href="#experiments">The proposal <Arrow /></a>
        </section>
        <ExperimentExplorer />
      </main>
      <footer className="lq-footer"><div className="lq-wrap">
        <a className="lq-contact-line" href={`mailto:${LINQ_LINKS.email}`}>Let’s talk about growth at Linq <Arrow /></a>
        <div className="lq-footer-inner">
        <div className="lq-footer-contact"><a href={`mailto:${LINQ_LINKS.email}`}>{LINQ_LINKS.email}</a><a href={LINQ_LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a></div>
        <a href={LINQ_LINKS.studio} target="_blank" rel="noopener noreferrer" className="lq-studio-link" aria-label="Visit Sergio & Co. creative studio"><Image src="/linq/sergio-co.svg" alt="Sergio & Co." width={280} height={62} /><Arrow /></a>
        <p className="lq-colophon">An independent proposal for Linq’s Growth Strategist role. These are hypotheses to validate with the team, not claims about Linq’s internal performance.</p>
        </div>
      </div></footer>
    </div>
  );
}
