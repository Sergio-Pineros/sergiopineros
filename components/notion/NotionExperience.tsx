"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import ApplicationDoc from "./ApplicationDoc";
import {ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight, Focus, Menu, Minus, Plus, Sparkles, X, Lightbulb, ChartNoAxesCombined, WandSparkles} from "lucide-react";

type Decision = "scale" | "iterate" | "stop";
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
    hypothesis: "Showing a complete team workflow before signup might help new users reach their first useful moment faster.",
    metric: "Activated-user rate", result: "+12.4%",
    context: "The sample shows an activation lift. We still need to check the sample size and where those users came from.",
    decision: "iterate", verdict: "Let's test this with another cohort before increasing the budget.",
    next: "Run it again with a longer measurement window and separate activation cohorts.",
    guardrail: "Check tracking quality and incrementality before increasing spend."
  },
  {
    id: "B02", channel: "LinkedIn", name: "From feature to outcome",
    hypothesis: "A campaign showing a real team workflow might bring in more qualified trials.",
    metric: "Qualified trial rate", result: "+18.2%",
    context: "The sample shows more qualified trials across two cohorts, with a steady acquisition cost.",
    decision: "scale", verdict: "The early signal looks promising. I'd try a small budget increase and keep a holdout group.",
    next: "Increase the budget in steps and review trial quality and creative fatigue.",
    guardrail: "Set a cost-per-qualified-trial limit with the team before launching."
  },
  {
    id: "C03", channel: "Google", name: "A narrower intent signal",
    hypothesis: "Testing a new audience and ad combination might help us reach people with clearer intent.",
    metric: "Cost per activated user", result: "+27.0%",
    context: "In this sample, cost went up and activation stayed about the same.",
    decision: "stop", verdict: "I'd stop this version and save what we learned for the next test.",
    next: "Write down the result and move the budget to the next idea.",
    guardrail: "Keep the control results and give the agent access to the experiment notes."
  }
];

const decisionLabels: Record<Decision, string> = {
  scale: "Scale carefully", iterate: "Iterate", stop: "Stop"
};

export default function NotionExperience() {
 const [selected,setSelected]=useState(0);
 const [focus,setFocus]=useState(false);
 const [showReasoning,setShowReasoning]=useState(true);
 const [applicationOpen,setApplicationOpen]=useState(false);
 const [mobileMenu,setMobileMenu]=useState(false);
 const experiment=experiments[selected];


 useEffect(()=>{
  const sync=()=>setApplicationOpen(["#application","#cover-letter","#resume"].includes(window.location.hash));
  sync();window.addEventListener("hashchange",sync);
  return ()=>window.removeEventListener("hashchange",sync);
 },[]);
 useEffect(()=>{
  if(!applicationOpen)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow="hidden";
  const esc=(ev:KeyboardEvent)=>{if(ev.key==="Escape"){history.replaceState(null,"",window.location.pathname);setApplicationOpen(false)}};
  window.addEventListener("keydown",esc);
  return ()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",esc)};
 },[applicationOpen]);
 const closeDoc=()=>{history.replaceState(null,"",window.location.pathname);setApplicationOpen(false)};

 return <div className="nt-app" id="top">
  <a className="nt-skip" href="#demo">Skip to the demo</a>
  <header className="nt-header">
    <div className="nt-container nt-nav-row">
      <div className="nt-logos" aria-label="Notion application by Sergio Piñeros">
        <a href="https://www.notion.com/product" target="_blank" rel="noopener noreferrer" className="nt-logo-link" aria-label="Notion product site"><img src="https://www.notion.com/front-static/favicon.ico" width="32" height="32" alt="Notion logo"/></a>
        <span className="nt-multiply" aria-hidden="true">×</span>
        <Link href="/" className="nt-logo-link nt-logo-personal" aria-label="Sergio Piñeros portfolio"><img src="/icon.svg" alt="Sergio Piñeros personal mark" width="34" height="34" /></Link>
        <span className="nt-nav-label">A little idea I wanted to try</span>
      </div>
      <button type="button" className="nt-menu-toggle" aria-expanded={mobileMenu} aria-label="Toggle navigation" onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X size={21}/>:<Menu size={21}/>}</button>
      <nav className={mobileMenu?"nt-nav nt-nav-show":"nt-nav"} aria-label="Page">
       <a href="#idea" onClick={()=>setMobileMenu(false)}>The thought</a>
       <a href="#demo" onClick={()=>setMobileMenu(false)}>The prototype</a>
       <a href="#me" onClick={()=>setMobileMenu(false)}>The human</a>
       <a href="#application" className="nt-top-cta" onClick={()=>setMobileMenu(false)}>Application <ArrowUpRight size={15}/></a>
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
        <p className="nt-intro">I kept thinking about what happens after a growth experiment ends. So I built a little idea around it.</p>
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
          <h2>What did we learn?<br/>What should we try next?<br/><span>Keep the answers<br/>in one place.</span></h2>
          <p>An agent gathers the clues. The team can see the evidence and choose what to do next.</p>
          <div className="nt-three"><span><i>↗</i> Spot the signal</span><span><i>✳</i> Make the decision</span><span><i>✓</i> Save the learning</span></div>
        </div>
      </div>
    </section>

    <section id="demo" className="nt-demo">
      <div className="nt-container">
        <div className="nt-demo-head">
          <div><div className="nt-section-eyebrow">A TINY WORKING PROTOTYPE</div><h2>Okay. Your move.</h2></div>
          <p>Choose a sample experiment to see what the agent suggests. I made up the numbers for the demo.</p>
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
          <div className="nt-workspace-bottom"><span>● Sample data for this concept</span><span>Human approval required before any action</span></div>
        </div>
        <p className="nt-demo-outro">A quieter place to think through a decision.</p>
      </div>
    </section>

    <section id="me" className="nt-me">
      <div className="nt-container nt-me-layout">
        <div className="nt-me-copy">
          <div className="nt-section-eyebrow">A LITTLE ABOUT ME</div>
          <h2>I like making<br/>complex things<br/><em>feel simple.</em></h2>
          <p>I&apos;m Sergio. I started in marketing for small businesses, then got curious about building the software behind their day-to-day work. Lately, I&apos;ve been experimenting with AI agents.</p>
          <div className="nt-me-actions"><a className="nt-button nt-button-white" href="#application">Cover letter + résumé <ArrowUpRight size={16}/></a><a className="nt-button nt-button-line" href="https://www.linkedin.com/in/sergio-pineros-c/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16}/></a></div>
        </div>
        <div className="nt-me-proof">
          <div className="nt-me-tally"><strong>540K</strong><span>views in the first month of a client campaign</span></div>
          <div className="nt-me-tally"><strong>4</strong><span>people on the creative team I built</span></div>
          <div className="nt-me-tally"><strong>0 → 1</strong><span>booking and service workflows taken from idea to product</span></div>
          <div className="nt-me-logo"><img src="/linq/sergio-co.svg" alt="Sergio & Co. logo" /></div>
        </div>
      </div>
    </section>
  </main>

  <footer className="nt-footer"><div className="nt-container nt-footer-inside"><span>An independent application by Sergio. Demo numbers are illustrative. Not affiliated with Notion.</span><a href="https://www.linkedin.com/in/sergio-pineros-c/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={14}/></a></div></footer>

      {applicationOpen && <ApplicationDoc onClose={closeDoc}/>}
 </div>;
}
