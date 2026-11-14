"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight, CircleCheck,
  CircleDot, Focus, Layers3, Menu, Minus, Plus, Sparkles, X
} from "lucide-react";

type Decision = "scale" | "iterate" | "stop";
type DocumentName = "letter" | "resume" | null;
type Experiment = {
  id: string;
  channel: string;
  name: string;
  hypothesis: string;
  metric: string;
  result: string;
  context: string;
  decision: Decision;
  verdict: string;
  next: string;
  guardrail: string;
};

const experiments: Experiment[] = [
  {
    id: "A01", channel: "Meta", name: "First value, faster",
    hypothesis: "Showing a complete team workflow before signup may bring fewer, better-fit users into activation.",
    metric: "Activated-user rate", result: "+12.4%",
    context: "Promising activation lift; confidence and sample adequacy need further review.",
    decision: "iterate", verdict: "The direction looks useful. Attribution is not yet strong enough to justify scaling.",
    next: "Replicate with a longer measurement window and segmented activation cohorts.",
    guardrail: "Do not recommend a larger budget until activation and incrementality are validated."
  },
  {
    id: "B02", channel: "LinkedIn", name: "From feature to outcome",
    hypothesis: "An operations-led story may outperform generic AI messaging with growing teams.",
    metric: "Qualified trial rate", result: "+18.2%",
    context: "Stronger trial quality across two illustrative cohorts, with stable cost per qualified trial.",
    decision: "scale", verdict: "Move to a controlled expansion, while keeping an explicit holdout.",
    next: "Scale in stages. Monitor qualified trials, payback proxy and creative fatigue.",
    guardrail: "Pause expansion if cost per qualified trial increases beyond the agreed limit."
  },
  {
    id: "C03", channel: "Google", name: "A narrower intent signal",
    hypothesis: "A new audience and ad pairing could lift signup efficiency in high-intent searches.",
    metric: "Cost per activated user", result: "+27.0%",
    context: "Cost rose while activation remained flat. Direction is unfavorable in the demo.",
    decision: "stop", verdict: "Stop this variant. Keep the learning, not the spend.",
    next: "Archive the hypothesis and return the budget to the next prioritized test.",
    guardrail: "Maintain control performance and log the negative result for future agents."
  }
];

const decisionLabels: Record<Decision, string> = {
  scale: "Scale carefully", iterate: "Iterate", stop: "Stop"
};

const steps = [
  ["01", "Observe", "Bring creative, channel, cohort, spend and activation signals into one view."],
  ["02", "Interpret", "Have agents surface patterns, missing context and falsifiable hypotheses."],
  ["03", "Test", "Check sample size, tracking, audience overlap and creative quality before launch."],
  ["04", "Decide", "A human reviewer sees evidence, uncertainty and a recommended next move."],
  ["05", "Remember", "Save outcomes and exceptions so future experiments start smarter."]
];

const letterParagraphs = [
  "The part of this role that caught my attention was the idea of turning a growth experimentation prototype into a real operating system. I like building things at the intersection of product, creative work and systems, especially when the point of automation is to make human decisions better—not just faster.",
  "I started on the marketing side. Through Fofo Labs, I worked directly with small businesses, built a four-person team and helped shape campaigns around what customers actually responded to. For La Estancia Steakhouse, one short-form strategy reached about 540,000 TikTok views and brought in over 1,200 followers in its first month. It taught me that creative performance only matters when you can connect it to what a business needs next.",
  "That curiosity pushed me further into product. With SAVRON and NxtSeat, I've been designing software for appointment booking, customer communications, staff workflows and bilingual AI assistance. I've had to connect the interface, the automation and the real-world operation—and simplify all three until they make sense together.",
  "I know this position calls for serious depth in paid growth, experimentation and measurement at a scale beyond the businesses I've worked with. I wouldn't pretend otherwise. What I can show is how I think, build, learn and connect disciplines. So I put together a small independent concept: a Growth Experimentation OS that makes hypotheses, evidence, guardrails and kill/iterate/scale decisions easier to see. It's a conversation starter, not a claim that I know Notion's internal systems.",
  "I would love the chance to bring that combination of curiosity, hands-on execution and care for the details to Notion. I believe great tools should give people more room to think. I'd be excited to help make that true for the teams growing Notion, too."
];

export default function NotionExperience() {
  const [selected, setSelected] = useState(0);
  const [focus, setFocus] = useState(false);
  const [showReasoning, setShowReasoning] = useState(true);
  const [documentName, setDocumentName] = useState<DocumentName>(null);
  const [progress, setProgress] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const experiment = experiments[selected];

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable <= 0 ? 0 : Math.min(100, (window.scrollY / scrollable) * 100));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const updateHash = () => {
      const hash = window.location.hash;
      if (hash === "#cover-letter") setDocumentName("letter");
      else if (hash === "#resume") setDocumentName("resume");
      else setDocumentName(null);
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    if (!documentName) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        history.replaceState(null, "", window.location.pathname);
        setDocumentName(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = old; window.removeEventListener("keydown", onKey); };
  }, [documentName]);

  const closeDoc = () => {
    history.replaceState(null, "", window.location.pathname);
    setDocumentName(null);
  };

  return (
    <div className="nt-app">
      <div className="nt-progress" style={{ width: progress + "%" }} aria-hidden="true" />
      <a className="nt-skip" href="#idea">Skip to the proposal</a>
      <header className="nt-header">
        <div className="nt-header-inner nt-shell">
          <Link className="nt-lockup" href="/" aria-label="Sergio Piñeros home">
            <span className="nt-monogram">s<span>.</span></span>
            <span>Sergio Piñeros</span>
          </Link>
          <span className="nt-header-cross" aria-hidden="true">×</span>
          <span className="nt-for">for <strong>Notion</strong></span>
          <nav className={mobileMenu ? "nt-nav nt-open" : "nt-nav"} aria-label="Page navigation">
            <a href="#idea" onClick={() => setMobileMenu(false)}>The idea</a>
            <a href="#demo" onClick={() => setMobileMenu(false)}>Try the prototype</a>
            <a href="#me" onClick={() => setMobileMenu(false)}>About me</a>
            <a className="nt-nav-cta" href="#cover-letter" onClick={() => setMobileMenu(false)}>Read my letter <ArrowUpRight size={15} /></a>
          </nav>
          <button className="nt-mobile-menu" type="button" aria-label="Toggle menu" aria-expanded={mobileMenu} onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>
        <section className="nt-hero">
          <div className="nt-shell nt-hero-center">
            <div className="nt-crumb"><span className="nt-crumb-icon">✳</span> Application / AI Product Manager, Growth Marketing</div>
            <p className="nt-hero-kicker">An independent product exploration for Notion</p>
            <h1>Less busywork.<br /><span>Better decisions.</span></h1>
            <p className="nt-hero-description">What if a growth team had a workspace that did more than report the numbers—one that helped turn every experiment into better judgment?</p>
            <a className="nt-pill nt-pill-dark" href="#idea">Explore the idea <ArrowRight size={17}/></a>
          </div>
          <div className="nt-hero-art" aria-hidden="true">
            <div className="nt-art-window">
              <div className="nt-art-top"><span>✳ Growth / Experiments</span><span>•••</span></div>
              <div className="nt-art-title"><span>Good questions.</span><strong>Clear next steps.</strong></div>
              <div className="nt-art-block"><span className="nt-art-bullet">✓</span> What&apos;s changing?</div>
              <div className="nt-art-block"><span className="nt-art-bullet">↗</span> Why might it matter?</div>
              <div className="nt-art-block nt-art-last"><span className="nt-art-bullet">✦</span> What should we try next?</div>
            </div>
            <span className="nt-art-sticker nt-sticker-a">Less noise ✳</span>
            <span className="nt-art-sticker nt-sticker-b">More signal ↗</span>
          </div>
          <a className="nt-scroll-indicator" href="#idea">A concept, not just a pitch <ArrowDown size={17}/></a>
        </section>

        <section id="idea" className="nt-statement">
          <div className="nt-shell">
            <p className="nt-eyebrow">01 / The opportunity</p>
            <h2>Dashboards show<br />what happened.<br /><em>Good systems help<br />us decide what&apos;s next.</em></h2>
            <div className="nt-statement-bottom">
              <p>The role describes a shift from running individual paid-growth experiments to building an operating system for experimentation. The hard part isn&apos;t generating more ideas. It&apos;s connecting the evidence to a defensible decision.</p>
              <p className="nt-tiny-note">Based on Notion&apos;s public job description. No internal access or proprietary data was used.</p>
            </div>
          </div>
        </section>

        <section className="nt-transition">
          <div className="nt-shell nt-transition-grid">
            <p className="nt-eyebrow">02 / A clearer loop</p>
            <div>
              <h2>From the signal<br /><span>to the next move.</span></h2>
              <p>A lightweight space for your growth team and its agents to think together—with fewer scattered tabs, clearer evidence, and explicit human approval.</p>
            </div>
            <div className="nt-loop" aria-label="Proposed growth experimentation workflow">
              <span>Signal</span><ChevronRight/><span>Hypothesis</span><ChevronRight/><span>Experiment</span><ChevronRight/><strong>Decision</strong><ChevronRight/><span>Learning</span>
            </div>
          </div>
        </section>

        <section id="demo" className="nt-demo-section">
          <div className="nt-shell">
            <div className="nt-demo-intro">
              <div><p className="nt-eyebrow">03 / Working concept</p><h2>See the signal.<br />Keep the context.</h2></div>
              <p>Try the concept. Select an experiment, inspect the reasoning, or switch to Focus mode. Every number below is <strong>simulated</strong> to demonstrate the interaction.</p>
            </div>
            <div className={focus ? "nt-console nt-console-focus" : "nt-console"}>
              <div className="nt-console-topbar">
                <div className="nt-console-breadcrumb"><span className="nt-console-icon">✳</span><span>Growth Lab</span><ChevronRight size={14}/><strong>Experiments</strong></div>
                <div className="nt-console-actions">
                  <span className="nt-demo-tag">SIMULATED DATA</span>
                  <button type="button" onClick={() => setFocus(!focus)} className={focus ? "nt-mini-button is-active" : "nt-mini-button"} aria-pressed={focus}>
                    <Focus size={15}/>{focus ? "Exit focus" : "Focus mode"}
                  </button>
                </div>
              </div>
              <div className="nt-console-main">
                {!focus && <aside className="nt-experiments" aria-label="Sample experiments">
                  <div className="nt-panel-heading">Experiments <span>03</span></div>
                  <p className="nt-panel-small">Choose an experiment</p>
                  {experiments.map((item, index) => (
                    <button key={item.id} type="button" className={selected === index ? "nt-experiment is-selected" : "nt-experiment"} aria-pressed={selected === index} onClick={() => setSelected(index)}>
                      <span className="nt-experiment-top"><span>{item.id} · {item.channel}</span><span className={"nt-status-dot nt-" + item.decision}/></span>
                      <strong>{item.name}</strong>
                      <span>{item.metric}</span>
                    </button>
                  ))}
                  <div className="nt-experiments-bottom"><Layers3 size={17}/><span>One question at a time.</span></div>
                </aside>}
                <div className="nt-decision-panel" key={experiment.id}>
                  <div className="nt-decision-heading"><span>EXPERIMENT / {experiment.id}</span><span>{experiment.channel}</span></div>
                  <h3>{experiment.name}</h3>
                  <p className="nt-hypothesis">{experiment.hypothesis}</p>
                  <div className="nt-result-grid">
                    <div className="nt-result-card"><span>Primary metric</span><strong>{experiment.metric}</strong><small>Define before launch</small></div>
                    <div className="nt-result-card"><span>Illustrative delta</span><strong>{experiment.result}</strong><small>vs. a hypothetical control</small></div>
                  </div>
                  <div className="nt-decision-recommendation">
                    <span className={"nt-decision-label nt-label-" + experiment.decision}>{experiment.decision === "scale" ? <ArrowUpRight size={15}/> : experiment.decision === "stop" ? <X size={15}/> : <CircleDot size={15}/>} {decisionLabels[experiment.decision]}</span>
                    <p>{experiment.verdict}</p>
                  </div>
                  <div className="nt-reason-header">
                    <button type="button" onClick={() => setShowReasoning(!showReasoning)} aria-expanded={showReasoning}>
                      <Sparkles size={16}/> Evidence & safeguards {showReasoning ? <Minus size={15}/> : <Plus size={15}/>}
                    </button>
                  </div>
                  {showReasoning && <div className="nt-evidence">
                    <div><small>WHAT WE KNOW</small><p>{experiment.context}</p></div>
                    <div><small>WHAT TO CHECK</small><p>{experiment.guardrail}</p></div>
                  </div>}
                  <div className="nt-next-step"><Check size={17}/><div><strong>Suggested next step</strong><p>{experiment.next}</p></div></div>
                  <div className="nt-review-line"><span>✳ Agent suggestion · Human review required</span><span>Illustrative concept only</span></div>
                </div>
              </div>
            </div>
            <div className="nt-demo-caption"><span><CircleCheck size={16}/> Designed to reduce cognitive load, not remove necessary context.</span><span>Focus mode is an interface idea, not a medical claim.</span></div>
          </div>
        </section>

        <section className="nt-principles">
          <div className="nt-shell">
            <p className="nt-eyebrow">04 / Better than autopilot</p>
            <h2>The agent can suggest.<br /><em>The team stays in control.</em></h2>
            <div className="nt-steps">
              {steps.map(([number,title,description]) => <div className="nt-step" key={number}><span>{number}</span><strong>{title}</strong><p>{description}</p><ArrowUpRight size={19}/></div>)}
            </div>
            <p className="nt-principle-note">Design principle: no automatic budget reallocation without explicit thresholds, review and logging. The system should expose uncertainty—not hide it behind a confident sentence.</p>
          </div>
        </section>

        <section className="nt-roadmap">
          <div className="nt-shell nt-roadmap-grid">
            <div><p className="nt-eyebrow">05 / First 90 days, hypothetically</p><h2>Start small.<br />Learn precisely.<br /><span>Earn the right<br />to scale.</span></h2></div>
            <div className="nt-roadmap-list">
              <div><span>Days 01—30</span><h3>Map the actual system.</h3><p>Listen to Growth, Marketing, Finance and engineering; audit signal reliability, workflows, experimentation bottlenecks and the meaning of activation.</p></div>
              <div><span>Days 31—60</span><h3>Make one loop useful.</h3><p>Prototype one narrow agent-assisted experiment flow. Establish QA, approval points, measurement definitions and a shared decision log.</p></div>
              <div><span>Days 61—90</span><h3>Measure decision quality.</h3><p>Evaluate time-to-decision, quality of experiment documentation, repeated learning and downstream activation—not just number of tests shipped.</p></div>
            </div>
          </div>
        </section>

        <section id="me" className="nt-about">
          <div className="nt-shell nt-about-grid">
            <div>
              <p className="nt-eyebrow">06 / The human behind the concept</p>
              <h2>Hi, I&apos;m<br />Sergio<span className="nt-about-period">.</span></h2>
              <p className="nt-about-lead">I&apos;ve built campaigns, led creative teams, made software with business owners, and kept asking how the pieces could work better together.</p>
              <div className="nt-about-links">
                <a href="#cover-letter">Read my cover letter <ArrowUpRight size={16}/></a>
                <a href="#resume">View my résumé <ArrowUpRight size={16}/></a>
                <a href="https://www.linkedin.com/in/sergio-pineros-c/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a>
              </div>
            </div>
            <div className="nt-proof">
              <div className="nt-proof-label">A few things I&apos;ve actually worked on</div>
              <div><span>01</span><div><h3>Fofo Labs</h3><p>Growth strategy and content for small businesses. One client&apos;s first-month short-form campaign reached ~540K views and 1.2K+ new followers.</p></div></div>
              <div><span>02</span><div><h3>SAVRON + NxtSeat</h3><p>Booking, operations, membership and bilingual AI-assisted customer experiences—designed with real service businesses.</p></div></div>
              <div><span>03</span><div><h3>Sergio & Co.</h3><p>Hands-on websites, product prototypes and practical growth systems. Strategy, creative work and code under one roof.</p></div></div>
              <p className="nt-proof-footnote">I&apos;m a builder with smaller-scale operating experience, not someone claiming to have run Notion-scale paid budgets.</p>
            </div>
          </div>
        </section>

        <section className="nt-close">
          <div className="nt-shell">
            <p className="nt-eyebrow">A thought to leave with you</p>
            <h2>Make the work<br /><em>more human.</em></h2>
            <p>AI should give us more time to notice what matters. Less busywork. Better decisions. More room for the work worth doing.</p>
            <a href="mailto:s.dpineros@gmail.com?subject=Hello%20Sergio%20%E2%80%94%20Notion" className="nt-pill nt-pill-light">Let&apos;s talk <ArrowUpRight size={17}/></a>
            <a className="nt-close-secondary" href="#cover-letter">Or start with my letter <ArrowRight size={16}/></a>
          </div>
        </section>
      </main>

      <footer className="nt-footer">
        <div className="nt-shell nt-footer-inner">
          <div><Link href="/">Sergio Piñeros</Link><span>Made with curiosity, not inside Notion.</span></div>
          <span>Independent hiring exercise, not affiliated with or endorsed by Notion. Notion is a trademark of Notion Labs, Inc. Illustrative experiment data only.</span>
          <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Back to top ↑</a>
        </div>
      </footer>

      {documentName && <div className="nt-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDoc(); }}>
        <div className="nt-modal" role="dialog" aria-modal="true" aria-label={documentName === "letter" ? "Sergio's cover letter" : "Sergio's resume"}>
          <div className="nt-modal-header">
            <div><span>APPLICATION / NOTION</span><strong>{documentName === "letter" ? "Cover letter" : "Résumé"}</strong></div>
            <div className="nt-modal-header-actions"><a href={documentName === "letter" ? "#resume" : "#cover-letter"}>{documentName === "letter" ? "Next: Résumé" : "Read letter"} <ArrowRight size={14}/></a><button type="button" onClick={closeDoc} aria-label="Close document"><X size={21}/></button></div>
          </div>
          <div className="nt-modal-scroll" key={documentName}>
            <article className="nt-document">
              <h2>Sergio Piñeros</h2>
              <p className="nt-document-subtitle">{documentName === "letter" ? "AI PRODUCT MANAGER, GROWTH MARKETING — NOTION" : "GROWTH SYSTEMS · PRODUCT · APPLIED AI"}</p>
              <p className="nt-document-contact">Minneapolis, MN · s.dpineros@gmail.com · sergiopineros.com</p>
              {documentName === "letter" ? <><p>Dear Notion team,</p>{letterParagraphs.map((p,i) => <p key={i}>{p}</p>)}<p>Best,<br/><strong>Sergio Piñeros</strong></p><a className="nt-document-next" href="#resume">Continue to the résumé <ArrowRight size={16}/></a></> : <>
                <h3>Profile</h3><p>Founder and hands-on product/growth builder connecting marketing, experimentation and software. Fluent in English and Spanish; experienced in creative strategy, customer workflows and practical AI prototyping.</p>
                <h3>Experience</h3>
                <h4>Sergio & Co. <span>Founder & Digital Strategy Lead · Jan 2026–Present</span></h4><p>Website, product and growth-system projects from discovery and digital strategy through execution and iteration.</p>
                <h4>Fofo Labs <span>Founder & Growth Lead · Apr 2025–Jan 2026</span></h4><p>Built a four-person creative practice. Helped develop La Estancia content that generated ~540K first-month views and 1,200+ followers.</p>
                <h4>17 Bits Records <span>Co-Founder & Creative Director · 2021–Present, part-time</span></h4><p>Artist releases, brand storytelling, creative coordination and live events.</p>
                <h4>HP Tech Ventures <span>Startup Analysis Extern · Mar–May 2026</span></h4><p>Startup research, landscape analysis and synthesized recommendations.</p>
                <h3>Selected product work</h3>
                <h4>SAVRON + NxtSeat <span>2026–Present</span></h4><p>Real-world booking, scheduling, walk-in, membership and operations workflows; explorations in bilingual AI customer assistance.</p>
                <h3>Skills</h3><p>Product discovery · Experiment design · Meta Business Suite · TikTok Ads · Creative strategy · Python · HTML/CSS · Workflow automation · AI prototyping · Figma · Adobe Creative Suite</p>
                <h3>Education</h3><p>Dunwoody College of Technology — Electronics Technology Certificate (2024–2025)<br/>Masterschool — Cybersecurity Bootcamp (2023–2024)</p>
                <p className="nt-document-note">A concise website copy. The full two-page résumé is available in the application attachment.</p>
              </>}
            </article>
          </div>
        </div>
      </div>}
    </div>
  );
}
