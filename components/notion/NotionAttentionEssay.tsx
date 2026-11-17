"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Archive, ArrowDown, ArrowRight, ArrowUpRight, BookOpenText, Brain,
  Check, ChevronDown, Database, Eye, FileText, FlaskConical,
  FolderClosed, Lightbulb, Pencil, RotateCcw, Sparkles, Target, X
} from "lucide-react";

type DrawerId = "hypothesis" | "sources" | "metrics" | "budget" | "agent" | "decision";
type IconChoice = "flask" | "notes" | "chart" | "wallet" | "spark" | "check" | "folder" | "target" | "brain" | "book";
type Drawer = { id: DrawerId; title: string; icon: IconChoice; accent: string; wide?: boolean };

const ICONS = {
  flask: FlaskConical, notes: FileText, chart: Target, wallet: Archive,
  spark: Sparkles, check: Check, folder: FolderClosed, target: Lightbulb,
  brain: Brain, book: BookOpenText
};
const ICON_OPTIONS = Object.keys(ICONS) as IconChoice[];
const DRAWERS: Drawer[] = [
  {id:"hypothesis",title:"Hypothesis",icon:"flask",accent:"lavender",wide:true},
  {id:"sources",title:"Sources",icon:"notes",accent:"cream"},
  {id:"metrics",title:"Metrics",icon:"chart",accent:"blue"},
  {id:"budget",title:"Budget",icon:"wallet",accent:"coral"},
  {id:"agent",title:"Agent",icon:"spark",accent:"green"},
  {id:"decision",title:"Decision",icon:"check",accent:"yellow",wide:true}
];
const closed = DRAWERS.reduce((acc,d)=>({...acc,[d.id]:false}),{} as Record<DrawerId,boolean>);
const originalIcons = DRAWERS.reduce((acc,d)=>({...acc,[d.id]:d.icon}),{} as Record<DrawerId,IconChoice>);

function Contents({id,choice,onChoice}:{id:DrawerId;choice:string;onChoice:(choice:string)=>void}) {
  switch(id){
    case "hypothesis": return <div className="nce-content">
      <strong className="nce-big-thought">Will a guided first workspace improve activation?</strong>
      <span className="nce-content-foot">From Monday growth sync</span>
    </div>;
    case "sources": return <div className="nce-content">
      <div className="nce-data-row"><FileText size={15}/> Meeting notes</div>
      <div className="nce-data-row"><Database size={15}/> Acquisition data</div>
    </div>;
    case "metrics": return <div className="nce-content nce-metric-content">
      <div><span>Signups</span><strong>410</strong></div>
      <div><span>Activation</span><strong>31%</strong></div>
      <div><span>CTR</span><strong>2.8%</strong></div>
      <div><span>CPC</span><strong>$4.20</strong></div>
    </div>;
    case "budget": return <div className="nce-content">
      <div className="nce-budget-row"><span>Planned</span><strong>$30,000</strong></div>
      <div className="nce-budget-row"><span>Spent</span><strong>$11,850</strong></div>
      <div className="nce-budget-row"><span>Test</span><strong>$2,000</strong></div>
    </div>;
    case "agent": return <div className="nce-content">
      <strong className="nce-content-label">Validate before scaling.</strong>
      <p>Clicks rose faster than activation. Check attribution first.</p>
    </div>;
    case "decision": return <div className="nce-content">
      <strong className="nce-content-label">Choose the next step.</strong>
      <div className="nce-choice-row">
        <button type="button" className={choice==="Validate"?"is-selected":""} onClick={()=>onChoice("Validate")}>Validate $2k</button>
        <button type="button" className={choice==="Hold"?"is-selected":""} onClick={()=>onChoice("Hold")}>Hold budget</button>
      </div>
      {choice&&<span className="nce-choice-status"><Check size={13}/> {choice} selected</span>}
    </div>;
  }
}

function Drawers(){
  const [open,setOpen] = useState<Record<DrawerId,boolean>>({...closed});
  const [icons,setIcons] = useState<Record<DrawerId,IconChoice>>({...originalIcons});
  const [editing,setEditing] = useState<DrawerId|null>(null);
  const [choice,setChoice] = useState("");
  const [saved,setSaved] = useState(false);
  const all = DRAWERS.every(d=>open[d.id]);
  const toggle = (id:DrawerId)=>{setOpen(current=>({...current,[id]:!current[id]}));setEditing(null);};
  const showAll = (value:boolean)=>{setOpen(DRAWERS.reduce((acc,d)=>({...acc,[d.id]:value}),{} as Record<DrawerId,boolean>));setEditing(null);};
  const reset = ()=>{setOpen({...closed});setIcons({...originalIcons});setEditing(null);setChoice("");setSaved(false);};

  return <section className="nce-demo" id="try-the-drawers">
    <div className="nce-demo-head">
      <div><span className="nce-eyebrow">INTERACTIVE STUDY</span><h2>Open a drawer.</h2></div>
      <div className="nce-controls">
        <label className="nce-switch"><span><Eye size={16}/> Show all</span>
          <input role="switch" type="checkbox" checked={all} onChange={e=>showAll(e.target.checked)} aria-label="Show all drawer contents"/>
          <span className="nce-track" aria-hidden="true"><span/></span>
        </label>
        <button type="button" onClick={reset} className="nce-reset"><RotateCcw size={15}/> Reset</button>
      </div>
    </div>
    <div className="nce-browser">
      <div className="nce-browser-bar"><span className="nce-browser-badge">N</span><span>Experiments</span><span>/</span><strong>Guided onboarding</strong></div>
      <div className="nce-browser-inner">
        <h3>Guided onboarding</h3>
        <div className="nce-grid">
          {DRAWERS.map(d=>{
            const Icon=ICONS[icons[d.id]];
            const isOpen=open[d.id];
            return <article key={d.id} role="button" tabIndex={0} aria-label={(isOpen?"Close ":"Open ")+d.title} aria-expanded={isOpen} onClick={(event)=>{if((event.target as HTMLElement).closest("button, input, a, [role=group]"))return;toggle(d.id);}} onKeyDown={(event)=>{if(event.target!==event.currentTarget)return;if(event.key==="Enter"||event.key===" "){event.preventDefault();toggle(d.id);}}} className={"nce-tile nce-"+d.accent+(d.wide?" nce-wide-tile":"")+(isOpen?" is-open":"")}>
              <div className="nce-tile-top">
                <div className="nce-icon-container">
                  <button type="button" className="nce-icon-button" aria-label={"Change "+d.title+" icon"} title="Change icon" aria-expanded={editing===d.id} onClick={()=>setEditing(editing===d.id?null:d.id)}><Icon size={23}/><Pencil className="nce-mini-pencil" size={11}/></button>
                  {editing===d.id&&<div className="nce-picker" role="group" aria-label={"Choose "+d.title+" icon"}>
                    {ICON_OPTIONS.map(name=>{const ChoiceIcon=ICONS[name];return <button type="button" key={name} title={name} aria-label={name} onClick={()=>{setIcons(current=>({...current,[d.id]:name}));setEditing(null);}}><ChoiceIcon size={17}/></button>})}
                  </div>}
                </div>
                <button type="button" className="nce-tile-toggle" onClick={()=>toggle(d.id)} aria-label={(isOpen?"Close ":"Open ")+d.title} aria-expanded={isOpen}>{isOpen?<X size={17}/>:<ArrowUpRight size={18}/>}</button>
              </div>
              <button type="button" tabIndex={isOpen?-1:0} aria-label={"Open "+d.title} aria-expanded={isOpen} className="nce-tile-front" onClick={()=>toggle(d.id)}>
                <strong>{d.title}</strong>
              </button>
              <div className="nce-tile-back" aria-hidden={!isOpen} inert={!isOpen}>
                <Contents id={d.id} choice={choice} onChoice={next=>{setChoice(next);setSaved(false);}}/>
              </div>
            </article>;
          })}
        </div>
        <div className="nce-demo-bottom">
          <span>{saved?"Saved in this preview":"All metrics are illustrative."}</span>
          <button type="button" disabled={saved} onClick={()=>setSaved(true)}>{saved?"Saved":"Save experiment"} <ArrowRight size={14}/></button>
        </div>
      </div>
    </div>
    <p className="nce-small-note">Interactive concept. Not connected to Notion.</p>
  </section>;
}

const RESEARCH = [
  {name:"Distractibility in adults with ADHD",source:"Forster et al., 2014",url:"https://pubmed.ncbi.nlm.nih.gov/24219607/"},
  {name:"Intention offloading and external reminders",source:"Gilbert et al., 2023",url:"https://doi.org/10.3758/s13423-022-02139-4"},
  {name:"Layered interfaces and learnability",source:"Forsey et al., 2025",url:"https://doi.org/10.1177/10648046241273291"}
];

export default function NotionAttentionEssay(){
  return <div className="nce-page">
    <header className="nce-nav"><Link href="/" className="nce-logo" aria-label="Home">s.</Link><nav><a href="#idea">Idea</a><a href="#try-the-drawers">Prototype</a><a href="#research">Research</a></nav></header>
    <main>
      <section className="nce-hero" id="idea">
        <div className="nce-hero-text"><span className="nce-eyebrow">DESIGN NOTE · 001</span><h1>What if software<br/>had <em>drawers?</em></h1><p>I want to choose how much information I see.</p><a href="#try-the-drawers" className="nce-hero-link">Try it <ArrowDown size={17}/></a></div>
        <div className="nce-hero-drawers" aria-hidden="true"><span>✳</span><span>⌁</span><span>◈</span></div>
      </section>
      <section className="nce-thought"><p>ADHD can make irrelevant information harder to ignore. Familiar visual cues may help us find things again. My hypothesis: <strong>fixed-size drawers could make dense interfaces easier to navigate.</strong></p></section>
      <Drawers/>
      <section className="nce-after" id="research">
        <div><span className="nce-eyebrow">THE HYPOTHESIS</span><h2>Less to hold<br/>in your head.</h2></div>
        <div className="nce-after-right"><p>Stable icons help locate information. Opening a drawer reveals the detail. Show all gives you the full picture.</p>
          <p className="nce-hypothesis-note">This design is a hypothesis. It has not been tested with ADHD users.</p>
          <details className="nce-research-details"><summary>Research behind the idea <ChevronDown size={16}/></summary><div className="nce-research-list">
            {RESEARCH.map(r=><a href={r.url} key={r.url} target="_blank" rel="noopener noreferrer"><span><strong>{r.name}</strong><small>{r.source}</small></span><ArrowUpRight size={17}/></a>)}
            <p>These papers support the design principles, not this particular interface.</p>
          </div></details>
        </div>
      </section>
    </main>
    <footer className="nce-footer"><span>Sergio Piñeros · 2026</span><span>Independent design experiment</span></footer>
  </div>;
}
