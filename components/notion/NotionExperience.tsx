"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight, CircleDot, Focus, Menu, Minus, Plus, Sparkles, X, Lightbulb, ChartNoAxesCombined, WandSparkles} from "lucide-react";

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

const letterParagraphs = [
  "The part of this role that caught my attention was the idea of turning a growth experimentation prototype into a real operating system. I like building things at the intersection of product, creative work and systems, especially when the point of automation is to make human decisions better—not just faster.",
  "I started on the marketing side. Through Fofo Labs, I worked directly with small businesses, built a four-person team and helped shape campaigns around what customers actually responded to. For La Estancia Steakhouse, one short-form strategy reached about 540,000 TikTok views and brought in over 1,200 followers in its first month. It taught me that creative performance only matters when you can connect it to what a business needs next.",
  "That curiosity pushed me further into product. With SAVRON and NxtSeat, I've been designing software for appointment booking, customer communications, staff workflows and bilingual AI assistance. I've had to connect the interface, the automation and the real-world operation—and simplify all three until they make sense together.",
  "I know this position calls for serious depth in paid growth, experimentation and measurement at a scale beyond the businesses I've worked with. I wouldn't pretend otherwise. What I can show is how I think, build, learn and connect disciplines. So I put together a small independent concept: a Growth Experimentation OS that makes hypotheses, evidence, guardrails and kill/iterate/scale decisions easier to see. It's a conversation starter, not a claim that I know Notion's internal systems.",
  "I would love the chance to bring that combination of curiosity, hands-on execution and care for the details to Notion. I believe great tools should give people more room to think. I'd be excited to help make that true for the teams growing Notion, too."
];


export default function NotionExperience() {
 const [selected,setSelected]=useState(0);
 const [focus,setFocus]=useState(false);
 const [showReasoning,setShowReasoning]=useState(true);
 const [documentName,setDocumentName]=useState<DocumentName>(null);
 const [mobileMenu,setMobileMenu]=useState(false);
 const experiment=experiments[selected];

 useEffect(()=>{
  const sync=()=>{const hash=window.location.hash;setDocumentName(hash==="#cover-letter"?"letter":hash==="#resume"?"resume":null)};
  sync();window.addEventListener("hashchange",sync);
  return ()=>window.removeEventListener("hashchange",sync);
 },[]);
 useEffect(()=>{
  if(!documentName)return;
  const previous=document.body.style.overflow;document.body.style.overflow="hidden";
  const esc=(ev:KeyboardEvent)=>{if(ev.key==="Escape"){history.replaceState(null,"",window.location.pathname);setDocumentName(null)}};
  window.addEventListener("keydown",esc);
  return ()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",esc)};
 },[documentName]);
 const closeDoc=()=>{history.replaceState(null,"",window.location.pathname);setDocumentName(null)};

 return <div className="nt-app" id="top">
  <a className="nt-skip" href="#demo">Skip to the demo</a>
  <header className="nt-header">
    <div className="nt-container nt-nav-row">
      <div className="nt-logos" aria-label="Notion application by Sergio Piñeros">
        <a href="https://www.notion.com/product" target="_blank" rel="noopener noreferrer" className="nt-logo-link" aria-label="Notion product site"><img src="https://www.notion.com/front-static/favicon.ico" width="32" height="32" alt="Notion logo"/></a>
        <span className="nt-multiply" aria-hidden="true">×</span>
        <Link href="/" className="nt-logo-link nt-logo-personal" aria-label="Sergio Piñeros portfolio"><img src="/icon.svg" alt="Sergio Piñeros personal mark" width="34" height="34" /></Link>
        <span className="nt-nav-label">An application, made with curiosity</span>
      </div>
      <button type="button" className="nt-menu-toggle" aria-expanded={mobileMenu} aria-label="Toggle navigation" onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X size={21}/>:<Menu size={21}/>}</button>
      <nav className={mobileMenu?"nt-nav nt-nav-show":"nt-nav"} aria-label="Page">
       <a href="#idea" onClick={()=>setMobileMenu(false)}>The thought</a>
       <a href="#demo" onClick={()=>setMobileMenu(false)}>The prototype</a>
       <a href="#me" onClick={()=>setMobileMenu(false)}>The human</a>
       <a href="#cover-letter" className="nt-top-cta" onClick={()=>setMobileMenu(false)}>Cover letter <ArrowUpRight size={15}/></a>
      </nav>
    </div>
  </header>

  <main>
    <section className="nt-hero">
      <div className="nt-container nt-hero-content">
        <div className="nt-doodle-row" aria-hidden="true">
          <span className="nt-doodle nt-doodle-blue"><ChartNoAxesCombined size={29} strokeWidth={2.3}/></span>
          <span className="nt-doodle nt-doodle-white"><Lightbulb size={32} strokeWidth={2.3}/></span>
          <span className="nt-doodle nt-doodle-orange"><Sparkles size={28} strokeWidth={2.3}/></span>
          <span className="nt-doodle nt-doodle-yellow"><WandSparkles size={30} strokeWidth={2.3}/></span>
        </div>
        <p className="nt-overline">A small product idea for Notion</p>
        <h1>Make every<br/>experiment <em>count.</em></h1>
        <p className="nt-intro">What if growth teams and AI agents could turn every test into a clearer decision?</p>
        <div className="nt-hero-actions">
          <a className="nt-button nt-button-blue" href="#demo">Try the prototype <ArrowRight size={16}/></a>
          <a className="nt-button nt-button-outline" href="#me">Why me? <ArrowDown size={16}/></a>
        </div>
      </div>
      <div className="nt-hero-bottom">An independent concept · Notion AI Product Manager, Growth Marketing</div>
    </section>

    <section id="idea" className="nt-idea">
      <div className="nt-container nt-idea-inner">
        <div className="nt-idea-note"><span className="nt-note-star">✳</span><span>THE IDEA</span></div>
        <div>
          <h2>Less time looking<br/>at dashboards.<br/><span>More time knowing<br/>what to do.</span></h2>
          <p>A growth lab where agents surface the evidence, and humans make the call.</p>
          <div className="nt-three"><span><i>↗</i> Spot the signal</span><span><i>✳</i> Make the decision</span><span><i>✓</i> Save the learning</span></div>
        </div>
      </div>
    </section>

    <section id="demo" className="nt-demo">
      <div className="nt-container">
        <div className="nt-demo-head">
          <div><div className="nt-section-eyebrow">A TINY WORKING PROTOTYPE</div><h2>Okay. Your move.</h2></div>
          <p>Pick an experiment. See how an agent could recommend whether to scale, iterate, or stop.</p>
        </div>
        <div className={focus?"nt-workspace nt-focused":"nt-workspace"}>
          <div className="nt-workspace-top">
            <div className="nt-ws-path"><img src="https://www.notion.com/front-static/favicon.ico" alt="Notion logo" width="19" height="19"/><span>Growth lab</span><ChevronRight size={13}/><strong>Experiments</strong></div>
            <button className="nt-focus" type="button" aria-pressed={focus} onClick={()=>setFocus(!focus)}><Focus size={15}/>{focus?"Exit focus":"Focus mode"}</button>
          </div>
          <div className="nt-workspace-body">
            {!focus&&<aside className="nt-sidebar">
              <div className="nt-sidebar-title">Experiments <span>03</span></div>
              {experiments.map((item,i)=><button key={item.id} type="button" className={selected===i?"nt-exp nt-exp-active":"nt-exp"} aria-pressed={selected===i} onClick={()=>setSelected(i)}>
                <span className="nt-exp-icon">{i===0?"✳":i===1?"↗":"□"}</span>
                <span><strong>{item.name}</strong><small>{item.channel} · {item.id}</small></span>
              </button>)}
              <div className="nt-sidebar-foot">✦ Agent-assisted · Human-approved</div>
            </aside>}
            <article className="nt-readout" key={experiment.id}>
              <div className="nt-readout-overline">EXPERIMENT {experiment.id} <span>·</span> {experiment.channel}</div>
              <h3>{experiment.name}</h3>
              <p className="nt-question">{experiment.hypothesis}</p>
              <div className="nt-metrics">
                <div><span>Primary metric</span><strong>{experiment.metric}</strong></div>
                <div><span>Illustrative delta</span><strong>{experiment.result}</strong></div>
              </div>
              <div className={"nt-verdict nt-verdict-"+experiment.decision}>
                <div className="nt-verdict-top"><span className="nt-verdict-icon">{experiment.decision==="scale"?"↗":experiment.decision==="stop"?"×":"✳"}</span><strong>{decisionLabels[experiment.decision]}</strong><span className="nt-agent-label">AI SUGGESTION</span></div>
                <p>{experiment.verdict}</p>
              </div>
              <button className="nt-expand" type="button" aria-expanded={showReasoning} onClick={()=>setShowReasoning(!showReasoning)}><Sparkles size={15}/> Why this recommendation? {showReasoning?<Minus size={15}/>:<Plus size={15}/>}</button>
              {showReasoning&&<div className="nt-reason"><div><span>EVIDENCE</span><p>{experiment.context}</p></div><div><span>GUARDRAIL</span><p>{experiment.guardrail}</p></div></div>}
              <div className="nt-next"><Check size={17}/><p><strong>Next:</strong> {experiment.next}</p></div>
            </article>
          </div>
          <div className="nt-workspace-bottom"><span>● Demo data, not real Notion results</span><span>Human approval required before any action</span></div>
        </div>
        <p className="nt-demo-outro">One clear question at a time. No extra tabs needed.</p>
      </div>
    </section>

    <section id="me" className="nt-me">
      <div className="nt-container nt-me-layout">
        <div className="nt-me-copy">
          <div className="nt-section-eyebrow">A LITTLE ABOUT ME</div>
          <h2>I like making<br/>complex things<br/><em>feel simple.</em></h2>
          <p>I&apos;m Sergio. I&apos;ve built growth campaigns for small businesses and product workflows for real teams. Now I&apos;m exploring how AI can make both better.</p>
          <div className="nt-me-actions"><a className="nt-button nt-button-white" href="#cover-letter">Cover letter <ArrowUpRight size={16}/></a><a className="nt-button nt-button-line" href="#resume">Résumé <ArrowUpRight size={16}/></a></div>
        </div>
        <div className="nt-me-proof">
          <div className="nt-me-tally"><strong>540K</strong><span>first-month video views on a client campaign</span></div>
          <div className="nt-me-tally"><strong>4</strong><span>people on the creative team I built</span></div>
          <div className="nt-me-tally"><strong>0 → 1</strong><span>real booking and service-workflow products built</span></div>
          <div className="nt-me-logo"><img src="/linq/sergio-co.svg" alt="Sergio & Co. logo" /></div>
        </div>
      </div>
    </section>
  </main>

  <footer className="nt-footer"><div className="nt-container nt-footer-inside"><span>Made by Sergio, independently. Not affiliated with Notion. Illustrative demo data.</span><a href="https://www.linkedin.com/in/sergio-pineros-c/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14}/></a></div></footer>

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

 </div>;
}
