import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReadingProgress from "@/components/linq/ReadingProgress";
import { LINQ_EXPERIMENTS, LINQ_LINKS, type LinqExperiment } from "@/lib/linq";
import "./linq.css";

export const metadata: Metadata = {
  title: "Linq × Sergio — a conversation about growth",
  description: "Three growth experiments for Linq, informed by the businesses, campaigns and communities I’ve helped build. An independent exercise by Sergio Piñeros.",
  alternates: { canonical: "/linq" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Linq × Sergio — a conversation about growth",
    description: "Your infrastructure. My human perspective. Three experiments worth exploring together.",
    type: "article",
    url: "https://sergiopineros.com/linq",
    siteName: "Sergio Piñeros",
  },
};

const CHAPTERS = [
  { label: "Make it click", category: "Content & storytelling", note: "From recognising a problem to seeing what’s possible." },
  { label: "Make it together", category: "Community & activation", note: "From watching someone build to building something yourself." },
  { label: "Make it measurable", category: "Research & conversion", note: "From a promising idea to a useful learning loop." },
];

function Arrow() {
  return <span className="lq-arrow" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M6 6h12v12" /></svg></span>;
}

function ExperimentSection({ experiment, index }: { experiment: LinqExperiment; index: number }) {
  return (
    <section id={experiment.id} aria-labelledby={`${experiment.id}-title`} className="lq-experiment">
      <div className="lq-wrap">
        <header className="lq-experiment-heading">
          <span className="lq-chapter-number">{experiment.number}</span>
          <div>
            <p className="lq-eyebrow">{CHAPTERS[index].category}</p>
            <h2 id={`${experiment.id}-title`}>{experiment.title}</h2>
          </div>
        </header>
        <div className="lq-experiment-grid">
          <div className="lq-experience">
            <p className="lq-world-label"><span className="lq-dot" /> From my world</p>
            <h3>The experience behind the idea.</h3>
            <div className="lq-prose">{experiment.experience.map(p => <p key={p.slice(0, 32)}>{p}</p>)}</div>
            <details className="lq-details">
              <summary>My contribution & what I learned <span aria-hidden="true">+</span></summary>
              <div className="lq-prose">
                <h4>What I did</h4>
                {experiment.did.map(p => <p key={p.slice(0, 32)}>{p}</p>)}
                <h4>What I learned</h4><p>{experiment.learned}</p>
              </div>
            </details>
            <blockquote>{experiment.takeaway}</blockquote>
          </div>
          <div className="lq-proposal lq-dark">
            <p className="lq-world-label"><span className="lq-dot lq-dot-lime" /> Into Linq’s world <Arrow /></p>
            <h3>What I’d test at Linq.</h3>
            <div className="lq-prose">{experiment.testIntro.map(p => <p key={p.slice(0, 32)}>{p}</p>)}</div>
            <h4 className="lq-pilot-title">{experiment.pilotTitle}</h4>
            <ol className="lq-pilot">{experiment.pilot.map((step, i) => <li key={step.slice(0, 32)}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
            <details className="lq-details">
              <summary>How I’d measure it <span aria-hidden="true">+</span></summary>
              <ul className="lq-metrics">{experiment.metrics.map(m => <li key={m.slice(0, 32)}>{m}</li>)}</ul>
              <p className="lq-measure-note">{experiment.metricsNote}</p>
            </details>
            <p className="lq-margin-note">{experiment.annotation}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LinqPage() {
  return (
    <div className="lq-page">
      <ReadingProgress />
      <a className="lq-skip" href="#introduction">Skip to the introduction</a>
      <main>
      <div className="lq-opening lq-dark">
        <header className="lq-header lq-wrap">
          <Link href="/" className="lq-personal-mark" aria-label="Sergio Piñeros — home">
            <Image src="/icon.svg" alt="" width={35} height={35} />
            <span>Sergio Piñeros</span>
          </Link>
          <nav aria-label="Main navigation">
            <a href="#experiments">The experiments</a>
            <a href="#about">The person</a>
            <a className="lq-nav-cta" href={`mailto:${LINQ_LINKS.email}`}>Let’s talk <Arrow /></a>
          </nav>
        </header>
        <div id="introduction">
          <section className="lq-hero lq-wrap" aria-labelledby="linq-title">
            <div className="lq-hero-copy">
              <p className="lq-eyebrow"><span className="lq-dot lq-dot-lime" /> A growth exercise, made for Linq</p>
              <h1 id="linq-title">Good growth starts with <em>understanding</em> people.</h1>
              <p className="lq-hero-description">Your infrastructure. My human perspective.<br />Three experiments I’d love to explore together.</p>
              <a href="#experiments" className="lq-button">Explore the ideas <Arrow /></a>
              <p className="lq-hero-footnote">Prepared by Sergio Piñeros · Growth Strategist application</p>
            </div>
            <div className="lq-conversation" aria-label="Two perspectives, one conversation">
              <svg className="lq-orbits" viewBox="0 0 600 650" fill="none" aria-hidden="true">
                <ellipse cx="300" cy="325" rx="248" ry="195" transform="rotate(-48 300 325)" />
                <ellipse cx="300" cy="325" rx="267" ry="215" transform="rotate(-48 300 325)" />
                <ellipse cx="300" cy="325" rx="286" ry="235" transform="rotate(-48 300 325)" />
                <circle cx="499" cy="148" r="5" className="lq-orbit-point" />
              </svg>
              <div className="lq-conversation-title"><span>Two worlds</span><span>One conversation</span></div>
              <div className="lq-bubble lq-bubble-linq">
                <a href={LINQ_LINKS.linq} target="_blank" rel="noopener noreferrer" aria-label="Visit Linq"><Image src="/linq/linq-logo.png" alt="Linq" width={88} height={41} /></a>
                <p>The technology to make conversations possible.</p>
                <span className="lq-bubble-tag">Infrastructure · Messaging · Possibility</span>
              </div>
              <span className="lq-hand-note" aria-hidden="true">what happens in between?</span>
              <div className="lq-bubble lq-bubble-sergio">
                <span className="lq-signature">Sergio.</span>
                <p>The stories, people & experiments that help them grow.</p>
                <span className="lq-bubble-tag">Curiosity · Creativity · Connection</span>
              </div>
              <span className="lq-conversation-end" aria-hidden="true"><i /><i /><i /></span>
            </div>
          </section>
          <div className="lq-color-bridge lq-wrap">
            <p>A little of your world.<br /><em>A little of mine.</em></p>
            <div className="lq-palette" aria-label="Linq’s dark atmosphere and lime accent meet Sergio’s purple and cream palette"><span /><span /><span /><span /></div>
            <p>Same curiosity.<br /><em>Something new in the middle.</em></p>
          </div>
        </div>
      </div>

      <div id="experiments" className="lq-index lq-wrap">
        <div className="lq-section-intro">
          <p className="lq-eyebrow">The starting point / 01—03</p>
          <h2>From things I’ve done<br />to things <em>we could try.</em></h2>
          <p>I’m Sergio. I’ve helped small businesses find customers, brought creative communities together, and built digital experiences. Here’s how I’d bring that work to Linq.</p>
        </div>
        <nav aria-label="The three experiments" className="lq-chapters">
          {LINQ_EXPERIMENTS.map((e, i) => <a key={e.id} href={`#${e.id}`}><span className="lq-eyebrow">{e.number} / {CHAPTERS[i].category}</span><h3>{CHAPTERS[i].label}</h3><p>{CHAPTERS[i].note}</p><Arrow /></a>)}
        </nav>
        <div className="lq-reading-key"><span><i className="lq-dot" /> Cream: the experience I bring</span><span><i className="lq-dot lq-dot-purple" /> Purple: what I’d explore at Linq</span></div>
      </div>

      {LINQ_EXPERIMENTS.map((experiment, index) => <ExperimentSection key={experiment.id} experiment={experiment} index={index} />)}

      <section className="lq-system lq-dark" aria-labelledby="system-title">
        <div className="lq-wrap">
          <p className="lq-eyebrow"><span className="lq-dot lq-dot-lime" /> Bringing it together</p>
          <div className="lq-system-heading"><h2 id="system-title">Three experiments.<br /><em>One learning system.</em></h2><p>Understand a real problem. Make the value visible. Give people a reason to build. Learn from what they do next.</p></div>
          <ol className="lq-sequence">{["Discover", "Demonstrate", "Activate", "Learn", "Repeat"].map((s, i) => <li key={s}><span className="lq-eyebrow">0{i + 1}</span><span>{s}</span><span className="lq-sequence-arrow" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">{i === 4 ? <path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}</svg></span></li>)}</ol>
          <blockquote>I wouldn’t assume these are the right experiments before speaking with Linq’s team and customers. They’re where I’d start asking better questions.</blockquote>
        </div>
      </section>

      <section id="about" className="lq-about lq-wrap" aria-labelledby="about-title">
        <div className="lq-about-portrait">
          <Image src="/story-photos/2026 mid freelance.jpeg" alt="Sergio Piñeros" width={700} height={850} sizes="(max-width: 760px) 88vw, 36vw" />
          <span className="lq-hand-note">a person behind the pixels.</span>
        </div>
        <div>
          <p className="lq-eyebrow">The person / Why Linq</p>
          <h2 id="about-title">Curious about technology.<br /><em>Even more about people.</em></h2>
          <div className="lq-prose"><p>I’m Sergio Piñeros, a Colombian founder, creative strategist and builder working across growth, digital experiences and applied technology. I’m bilingual in English and Spanish.</p><p>My work has gradually moved from helping businesses communicate with customers to exploring how technology can make those interactions more natural and useful.</p><p>That’s what caught my attention about Linq: the infrastructure behind new ways of communicating, and the challenge of helping people discover what they can build with it.</p></div>
          <Link className="lq-text-link" href="/">Step into my world <Arrow /></Link>
        </div>
      </section>

      <section className="lq-contact lq-dark" aria-labelledby="contact-title">
        <div className="lq-wrap">
          <p className="lq-eyebrow">An open invitation</p>
          <h2 id="contact-title">What could we<br /><em>test together?</em></h2>
          <a className="lq-button" href={`mailto:${LINQ_LINKS.email}`}>Let’s start a conversation <Arrow /></a>
          <div className="lq-contact-links"><a href={`mailto:${LINQ_LINKS.email}`}>{LINQ_LINKS.email}</a><a href={LINQ_LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a></div>
        </div>
      </section>

      </main>
      <footer className="lq-footer lq-wrap">
        <div className="lq-studio"><div><p className="lq-eyebrow">A little more of my world</p><p>Strategy, websites & creative work.<br />Made with care at my studio.</p></div><a href={LINQ_LINKS.studio} target="_blank" rel="noopener noreferrer" className="lq-studio-link" aria-label="Visit Sergio & Co. creative studio"><Image src="/linq/sergio-co.svg" alt="Sergio & Co." width={360} height={90} /><Arrow /></a></div>
        <div className="lq-colophon"><Link href="/">© {new Date().getFullYear()} Sergio Piñeros</Link><p>Independent exercise for Linq’s Growth Strategist position.<br />Not commissioned, approved or endorsed by Linq. Proposed experiments are hypotheses based on public information.</p><a href={LINQ_LINKS.linq} target="_blank" rel="noopener noreferrer">Visit Linq <Arrow /></a></div>
      </footer>
    </div>
  );
}
