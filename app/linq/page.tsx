import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import PlansExplorer from "@/components/linq/PlansExplorer";
import LinqSignal from "@/components/linq/LinqSignal";
import { LINQ_LINKS } from "@/lib/linq";
import "./linq.css";

const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-linq-sans", display: "swap" });

export const metadata: Metadata = {
  title: "For Linq: a growth exercise by Sergio Piñeros",
  description:
    "Experiments I would explore at Linq, and the real work behind each one. An independent exercise by Sergio Piñeros for the Growth Strategist position.",
  alternates: { canonical: "/linq" },
  robots: { index: false, follow: false },
  twitter: {
    card: "summary",
    title: "For Linq: a growth exercise by Sergio Piñeros",
    description:
      "Practical demos, builder sessions and campaigns that help the right teams discover and use Linq.",
  },
  openGraph: {
    title: "For Linq: a growth exercise by Sergio Piñeros",
    description:
      "Practical demos, builder sessions and campaigns that help the right teams discover and use Linq.",
    type: "article",
    url: "https://sergiopineros.com/linq",
    siteName: "Sergio Piñeros",
  },
};


export default function LinqPage() {
  return (
    <div className={`${openSans.variable} lq-page`}>
      <a className="lq-skip" href="#plans">Skip to the plans</a>
      <header className="lq-header"><div className="lq-wrap lq-header-inner">
        <div className="lq-lockup">
          <a href={LINQ_LINKS.linq} target="_blank" rel="noopener noreferrer" aria-label="Visit Linq"><Image src="/linq/linq-logo.png" alt="Linq" width={100} height={50} priority /></a>
          <span aria-hidden="true">×</span><Link href="/">Sergio Piñeros</Link>
        </div>
        <nav aria-label="Page"><a href="#plans">Explore the plans</a></nav>
      </div></header>
      <main>
        <section className="lq-hero" aria-labelledby="linq-title">
          <Image className="lq-hero-art" src="/linq/city-hero.webp" alt="" fill sizes="100vw" priority />
          <div className="lq-hero-tint" aria-hidden="true" />
          <div className="lq-wrap lq-hero-grid">
            <div className="lq-hero-copy">
              <p className="lq-eyebrow">A growth proposal for Linq</p>
              <h1 id="linq-title">Make it click.<br /><span>Get builders building.</span></h1>
              <p className="lq-hero-lead">Show what Linq makes possible. Bring the right people together. Turn that interest into lasting use.</p>
              <a className="lq-hero-link" href="#plans">Explore the plans<span aria-hidden="true" className="lq-link-line" /></a>
            </div>
            <LinqSignal />
          </div>
        </section>
        <section id="plans" className="lq-plans" aria-labelledby="plans-title">
          <div className="lq-wrap">
            <header className="lq-plans-intro"><h2 id="plans-title">Good ideas.<br /><span>A clear way to test them.</span></h2><p>From the first impression<br />to the first working build.</p></header>
            <PlansExplorer />
          </div>
        </section>
        <section className="lq-about" aria-labelledby="about-title"><div className="lq-wrap lq-about-inner">
          <h2 id="about-title">I can connect the story<br /><span>to the work behind it.</span></h2>
          <div><p>I’m Sergio. I’ve found clients, made campaigns, organised events and worked with creative teams. I’d bring that same hands-on approach to helping builders discover and use Linq.</p><a href={`mailto:${LINQ_LINKS.email}`}>{LINQ_LINKS.email}</a></div>
        </div></section>
      </main>
      <footer className="lq-footer"><div className="lq-wrap">
        <div className="lq-footer-main"><div><Link href="/">Sergio Piñeros</Link><a href={LINQ_LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></div><a href={LINQ_LINKS.studio} className="lq-studio-link" target="_blank" rel="noopener noreferrer" aria-label="Visit Sergio & Co."><Image src="/linq/sergio-co.svg" alt="Sergio & Co." width={280} height={62} /></a></div>
        <p className="lq-colophon">An independent exercise for Linq’s Growth Strategist role. Proposed tests, based on public information. Not endorsed by Linq. Hero artwork: Linq.</p>
      </div></footer>
    </div>
  );
}
