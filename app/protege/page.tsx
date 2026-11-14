import type { Metadata } from "next";
import "./protege.css";

export const metadata: Metadata = {
  title: "For Protege | A Gen Marketer growth exercise by Sergio Piñeros",
  description: "Three practical growth experiments for Protege, with proof of work and a 90-day plan. An independent application by Sergio Piñeros.",
  alternates: { canonical: "/protege" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "For Protege | From real-world data to real-world conversations",
    description: "A Gen Marketer growth exercise by Sergio Piñeros.",
    url: "https://www.sergiopineros.com/protege",
    type: "website"
  }
};

const campaigns = [
  {
    number: "01",
    audience: "MODEL BUILDERS",
    symbol: "↗",
    title: "The data behind the model.",
    description: "Turn one technical use case into a simple story. Pair a research-backed explainer with a focused landing page, technical distribution and a useful follow-up.",
    metric: "Success signal",
    outcome: "Qualified dataset conversations"
  },
  {
    number: "02",
    audience: "DATA PROVIDERS",
    symbol: "◇",
    title: "The value already inside.",
    description: "Show data owners what responsible licensing could unlock. Make rights, governance and the partner process understandable before asking for a meeting.",
    metric: "Success signal",
    outcome: "Qualified partner introductions"
  },
  {
    number: "03",
    audience: "FIELD + COMMUNITY",
    symbol: "↻",
    title: "The event is the start.",
    description: "Connect a live session to before-and-after content, audience-specific follow-up and a clear handoff. Let one good event keep creating value.",
    metric: "Success signal",
    outcome: "Meetings and opportunities after events"
  }
];

const steps = [
  ["01", "Listen", "One real audience, one specific pain point."],
  ["02", "Shape", "A story built from product and research insight."],
  ["03", "Make", "Copy, landing page, creative and useful assets."],
  ["04", "Distribute", "The channels that actually reach that audience."],
  ["05", "Follow up", "Connect interest to an intentional next step."],
  ["06", "Learn", "Measure commercial signal, then improve."],
];

const months = [
  ["DAY 01–30", "Learn the system.", "Meet the team, understand the buyer and provider journeys, audit current channels, and own recurring production."],
  ["DAY 31–60", "Ship one full loop.", "Launch a focused cross-channel campaign, from brief and page through distribution, tracking and follow-up."],
  ["DAY 61–90", "Make it repeatable.", "Improve the workflow, report on commercial outcomes, and double down on the few experiments with signal."]
];

export default function ProtegePage() {
  return (
    <div className="pg-page" id="top">
      <a className="pg-skip" href="#experiments">Skip to proposed experiments</a>
      <header className="pg-nav">
        <div className="pg-shell pg-nav-content">
          <div className="pg-identity">
            <a href="https://withprotege.ai/" target="_blank" rel="noopener noreferrer" className="pg-identity" aria-label="Visit Protege">
              <span className="pg-mark" aria-hidden="true"><i /><i /><i /><i /></span>
              <span className="pg-brand">protege</span>
            </a>
            <span className="pg-brand-divider" aria-hidden="true">/</span>
            <span className="pg-byline">a growth exercise by Sergio Piñeros</span>
          </div>
          <nav className="pg-navlinks" aria-label="Page navigation">
            <a href="#experiments">Ideas</a>
            <a href="#proof">Proof</a>
            <a href="#plan">90 days</a>
            <a className="pg-navcta" href="#letter">Cover letter ↗</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="pg-hero" aria-labelledby="pg-title">
          <div className="pg-shell pg-hero-inner">
            <div>
              <div className="pg-pill">Independent application · Gen Marketer</div>
              <h1 id="pg-title" className="pg-serif">Make good<br />data <em>move.</em></h1>
              <p className="pg-intro">The right real-world data changes what AI can do. The right story gets it to the people who need it. I want to help Protege connect the two.</p>
              <div className="pg-hero-actions">
                <a className="pg-button" href="#experiments">Explore the ideas <span aria-hidden="true">↗</span></a>
                <a href="#proof" className="pg-text-link">The work behind them</a>
              </div>
            </div>
            <div className="pg-art" role="img" aria-label="Abstract geometric visualization of curated data connecting across several AI domains">
              <div className="pg-art-orbit"/><div className="pg-art-orbit"/><div className="pg-art-orbit"/>
              <div className="pg-cube" aria-hidden="true">
                <div className="pg-cube-top"/><div className="pg-cube-left"/><div className="pg-cube-right"/><div className="pg-cube-small"/>
              </div>
              <div className="pg-art-tag tag-a"><b/> HEALTHCARE</div>
              <div className="pg-art-tag tag-b"><b/> AUDIO &amp; SPEECH</div>
              <div className="pg-art-tag tag-c"><b/> VIDEO</div>
              <div className="pg-art-tag tag-d"><b/> SPATIAL &amp; PHYSICAL</div>
              <span className="pg-art-cross">real-world signals, connected</span>
            </div>
          </div>
          <div className="pg-shell pg-hero-bottom">A proposal, not an official Protege page. Built from publicly available information.</div>
        </section>

        <div className="pg-stripe" aria-label="Approach">
          <div className="pg-shell pg-stripe-inner"><span>Audience</span><span>Narrative</span><span>Execution</span><span>Distribution</span><span>Outcome</span></div>
        </div>

        <section id="experiments" className="pg-section pg-experiments" aria-labelledby="pg-experiments-title">
          <div className="pg-shell">
            <div className="pg-section-head">
              <div><span className="pg-eyebrow pg-number">01 / WHERE I WOULD START</span><h2 id="pg-experiments-title" className="pg-serif">Three ideas.<br />One clear goal.</h2></div>
              <p>Make Protege&apos;s expertise travel, then turn relevant interest into commercial conversations. These are proposed tests, not claims about existing performance.</p>
            </div>
            <div className="pg-campaigns">
              {campaigns.map((c) => (
                <article className="pg-campaign" key={c.number}>
                  <div className="pg-topline"><span className="pg-number">{c.number} / EXPERIMENT</span><span>{c.audience}</span></div>
                  <div className="pg-card-orb" aria-hidden="true">{c.symbol}</div>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <div className="pg-metric"><b>{c.metric}</b><span>{c.outcome}</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="system" className="pg-section pg-method" aria-labelledby="pg-method-title">
          <div className="pg-shell pg-method-inner">
            <div className="pg-section-head">
              <div><span className="pg-eyebrow pg-number">02 / HOW I BUILD</span><h2 id="pg-method-title" className="pg-serif">Not more marketing.<br /><em>More connection.</em></h2></div>
              <p>I like doing the whole job: understand the problem, make the thing, get it out, and find out what happened.</p>
            </div>
            <div className="pg-steps">
              {steps.map(([number,title,description]) => (
                <div className="pg-step" key={number}><span className="pg-index">{number}</span><h3>{title}</h3><p>{description}</p></div>
              ))}
            </div>
            <div className="pg-method-note"><strong>From idea to impact, without losing the thread.</strong><span>Every campaign has an audience, owner, CTA and learning goal.</span></div>
          </div>
        </section>

        <section id="proof" className="pg-section pg-proof" aria-labelledby="pg-proof-title">
          <div className="pg-shell">
            <div className="pg-proof-top">
              <div><span className="pg-eyebrow pg-number">03 / PROOF OF WORK</span><h2 id="pg-proof-title" className="pg-serif">I don&apos;t just<br />make plans.<br /><em>I ship.</em></h2></div>
              <p>I&apos;ve found clients, built campaigns, led creative work, launched experiences, and made AI prototypes for real businesses. I&apos;m comfortable owning both the story and what it takes to deliver it.</p>
            </div>
            <div className="pg-proof-grid">
              <div className="pg-proof-item"><strong>540K</strong><p>Approximate TikTok views in the first month of a La Estancia short-form content campaign.</p></div>
              <div className="pg-proof-item"><strong>1,200+</strong><p>New followers gained during that same first-month campaign.</p></div>
              <div className="pg-proof-item"><strong>04</strong><p>People in the creative and campaign team I built and led at Fofo Labs.</p></div>
            </div>
            <div className="pg-proof-detail">
              <h3>Creative taste, technical curiosity and actual operational follow-through.</h3>
              <p>At Sergio &amp; Co., I build websites and product experiences. At 17 Bits Records, I&apos;ve worked on artist launches and live events. With SAVRON and NxtSeat, I&apos;ve explored customer journeys, automation and a bilingual AI voice concierge. Different projects, same instinct: understand the human problem and build something useful.</p>
            </div>
          </div>
        </section>

        <section id="plan" className="pg-section pg-roadmap" aria-labelledby="pg-roadmap-title">
          <div className="pg-shell">
            <div className="pg-section-head">
              <div><span className="pg-eyebrow pg-number">04 / FIRST 90 DAYS</span><h2 id="pg-roadmap-title" className="pg-serif">Earn context.<br />Create momentum.</h2></div>
              <p>A starting approach to discuss with the team, not a strategy written without access to the real numbers.</p>
            </div>
            <div className="pg-roadmap-grid">
              {months.map(([day,title,description]) => (
                <article className="pg-month" key={day}><span>{day}</span><h3>{title}</h3><p>{description}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-belief" aria-labelledby="pg-belief-title">
          <div className="pg-shell">
            <span className="pg-eyebrow">WHY THIS SPACE MATTERS TO ME</span>
            <h2 id="pg-belief-title" className="pg-serif">Data isn&apos;t just<br />a resource.<br /><em>It has a story.</em></h2>
            <p>AI needs to understand the world we actually live in. That starts with high-quality data, responsible access, context and trust. I&apos;m fascinated by the work behind that, and by making it understandable to the people whose decisions move it forward.</p>
          </div>
        </section>

        <section className="pg-outro" aria-labelledby="pg-outro-title">
          <div className="pg-shell pg-outro-inner">
            <div><span className="pg-eyebrow">SERGIO PIÑEROS · GEN MARKETER APPLICATION</span><h2 id="pg-outro-title" className="pg-serif">Let&apos;s make<br />something <em>matter.</em></h2><p style={{color:"#bcb0c9",maxWidth:500,lineHeight:1.75}}>I would love to bring thoughtful creative, fast execution and useful measurement to Protege.</p></div>
            <div className="pg-buttons"><a className="pg-button" href="#letter">Read cover letter <span>↗</span></a><a className="pg-outline" href="#resume">View résumé ↗</a><a className="pg-outline" href="mailto:s.dpineros@gmail.com">Say hello ↗</a></div>
          </div>
        </section>
      </main>

      <footer className="pg-footer">
        <div className="pg-shell pg-footer-inner">
          <span>© 2026 Sergio Piñeros. Independent growth exercise, not affiliated with Protege.</span>
          <div className="pg-footer-links"><a href="https://withprotege.ai/" target="_blank" rel="noopener noreferrer">Protege</a><a href="https://www.sergiopineros.com" target="_blank" rel="noopener noreferrer">Portfolio</a><a href="https://www.linkedin.com/in/sergio-pineros-c/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>

      <section id="letter" className="pg-modal" role="dialog" aria-modal="true" aria-labelledby="pg-letter-title">
        <div className="pg-modal-panel">
          <div className="pg-modal-head"><div><span className="pg-eyebrow pg-number">APPLICATION / 01</span><h2 id="pg-letter-title">Cover letter</h2></div><a className="pg-close" href="#outro" aria-label="Close cover letter">Close ×</a></div>
          <div className="pg-doc">
            <p className="pg-doc-meta">Sergio Piñeros · November 13, 2026 · Gen Marketer</p>
            <p>Hi Protege team,</p>
            <p>The best part of marketing, to me, is making something complex feel clear and important to the right person. That is why Protege caught my attention. The problem you are solving is genuinely interesting: AI progress depends on high-quality, real-world data, and access needs to work for the people who own that data, too.</p>
            <p>I have built the kind of work this role asks for. At Fofo Labs, I found clients, led a small creative team and took campaigns from first conversation to published work and results. One short-form strategy for La Estancia reached roughly 540,000 TikTok views and 1,200 new followers in its first month. Through Sergio &amp; Co. and my product projects, I also build landing pages, digital experiences and AI workflows myself. I like being able to write the story and build the system behind it.</p>
            <p>What excites me about this role is the combination of content, events, partners, AI tools and real commercial measurement. I would love to turn the research and expertise already inside Protege into sharp campaigns that bring qualified model builders and data partners into conversations with your team. Less random activity. More useful signals, better follow-up and work we can actually learn from.</p>
            <p>I recently connected with Melissa Lang at an event, which gave me another reason to explore the team. I also put together a short growth exercise to show how I think. I would love to talk about what I could ship with you.</p>
            <p>Best,<br/>Sergio</p>
            <a className="pg-text-link" href="#resume">Read résumé next ↗</a>
          </div>
        </div>
      </section>

      <section id="resume" className="pg-modal" role="dialog" aria-modal="true" aria-labelledby="pg-resume-title">
        <div className="pg-modal-panel">
          <div className="pg-modal-head"><div><span className="pg-eyebrow pg-number">APPLICATION / 02</span><h2 id="pg-resume-title">Résumé</h2></div><a className="pg-close" href="#outro" aria-label="Close résumé">Close ×</a></div>
          <div className="pg-doc">
            <p className="pg-doc-meta">Sergio Piñeros · Minneapolis, MN · s.dpineros@gmail.com</p>
            <p>Founder and hands-on growth generalist combining audience insight, creative execution, web, AI workflows and measurable results.</p>
            <div className="pg-doc-section"><h3>Sergio &amp; Co.</h3><p className="pg-doc-meta">Founder · Jan 2026 to Present</p><p>Digital experiences, websites, campaigns and practical AI workflows. Built product experiences for SAVRON and a bilingual voice concierge pilot.</p></div>
            <div className="pg-doc-section"><h3>Fofo Labs</h3><p className="pg-doc-meta">Founder · Apr 2025 to Jan 2026</p><p>Won and managed clients, led a four-person team, and owned work from discovery to distribution. La Estancia campaign: approximately 540K TikTok views and 1,200+ new followers in month one.</p></div>
            <div className="pg-doc-section"><h3>17 Bits Records</h3><p className="pg-doc-meta">Co-founder · Part-time · 2021 to Present</p><p>Artist marketing, creative releases, live activations and community building.</p></div>
            <div className="pg-doc-section"><h3>Esperanza United / Ecuabet</h3><p>Community programs and youth leadership (2022 to 2025); graphic design and social content strategy (2020).</p></div>
            <div className="pg-doc-section"><h3>Skills</h3><p>Campaign strategy, content, event activations, audience research, web experiences, creative production, AI-assisted workflows, English and Spanish.</p></div>
            <div className="pg-doc-section"><h3>Education</h3><p>Dunwoody, Electronics Technology Certificate (2024 to 2025). Masterschool, Cybersecurity Bootcamp (2023 to 2024).</p></div>
            <p className="pg-doc-meta">Full two-page PDF résumé available in the application package.</p>
            <a href="#letter" className="pg-text-link">Read cover letter ↗</a>
          </div>
        </div>
      </section>
    </div>
  );
}
