"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Archive, ArrowDown, ArrowRight, ArrowUpRight, BookOpenText, Brain,
  Check, ChevronDown, ChevronUp, Coffee, Database, Eye, EyeOff,
  FileText, FlaskConical, Focus, FolderClosed, Lightbulb, Link2,
  ListChecks, Pencil, RotateCcw, Sparkles, Target, X
} from "lucide-react";

type DrawerId = "hypothesis" | "sources" | "metrics" | "budget" | "agent" | "decision";
type IconChoice = "flask" | "notes" | "chart" | "wallet" | "spark" | "check" | "folder" | "target" | "brain" | "book";
type Drawer = {
  id: DrawerId; number: string; title: string; hint: string; icon: IconChoice;
  className: string; accent: string;
};

const ICONS = {
  flask: FlaskConical, notes: FileText, chart: Target, wallet: Archive,
  spark: Sparkles, check: Check, folder: FolderClosed, target: Lightbulb,
  brain: Brain, book: BookOpenText
};
const ICON_LABELS: Record<IconChoice, string> = {
  flask: "Flask", notes: "Notes", chart: "Metrics", wallet: "Budget",
  spark: "Sparkle", check: "Check", folder: "Folder", target: "Idea",
  brain: "Brain", book: "Book"
};
const ICON_OPTIONS = Object.keys(ICONS) as IconChoice[];
const DRAWERS: Drawer[] = [
  {id:"hypothesis",number:"01",title:"The hypothesis",hint:"What are we trying to learn?",icon:"flask",className:"nce-wide",accent:"lavender"},
  {id:"sources",number:"02",title:"The context",hint:"Where did this idea come from?",icon:"notes",className:"nce-normal",accent:"cream"},
  {id:"metrics",number:"03",title:"Success signals",hint:"What would count as working?",icon:"chart",className:"nce-normal",accent:"blue"},
  {id:"budget",number:"04",title:"The budget",hint:"What can we safely test?",icon:"wallet",className:"nce-normal",accent:"coral"},
  {id:"agent",number:"05",title:"Agent's reasoning",hint:"What does the evidence suggest?",icon:"spark",className:"nce-normal",accent:"green"},
  {id:"decision",number:"06",title:"The next decision",hint:"What needs a human?",icon:"check",className:"nce-wide",accent:"yellow"}
];
const defaultOpen: Record<DrawerId, boolean> = {
  hypothesis:true, sources:false, metrics:false, budget:false, agent:false, decision:false
};
const defaultIcons = DRAWERS.reduce((acc, d) => {
  acc[d.id] = d.icon; return acc;
}, {} as Record<DrawerId, IconChoice>);

const SOURCES = [
  {
    key:"01", subject:"ATTENTION", title:"Perceptual load and distraction in adult ADHD",
    authors:"Forster et al. · Neuropsychology · 2014",
    url:"https://pubmed.ncbi.nlm.nih.gov/24219607/",
    summary:"Adults with ADHD showed greater distractor interference in a visual task. Increasing task-relevant perceptual load reduced interference. Less visual content is not universally better; what earns attention matters."
  },
  {
    key:"02", subject:"MEMORY", title:"Strategies for managing productivity with ADHD",
    authors:"Strategies for Coping… · 2019",
    url:"https://pmc.ncbi.nlm.nih.gov/articles/PMC6406620/",
    summary:"A qualitative study of young people with learning disabilities/ADHD describes environmental cues as reminders. It motivates recognizable labels and locations, not a proof that icons alone work."
  },
  {
    key:"03", subject:"INTERFACE DESIGN", title:"Designing for learnability with layered interfaces",
    authors:"Forsey et al. · 2025",
    url:"https://doi.org/10.1177/10648046241273291",
    summary:"Progressive disclosure was studied as a way to make complex interfaces easier to learn. The study reported suggestive trends, not statistically significant between-group performance differences."
  },
  {
    key:"04", subject:"COGNITIVE OFFLOADING", title:"Outsourcing memory to external tools",
    authors:"Gilbert et al. · Psychonomic Bulletin & Review · 2023",
    url:"https://doi.org/10.3758/s13423-022-02139-4",
    summary:"A review of intention offloading: external tools and reminders can reduce reliance on remembering future actions. A useful rationale for stable, recognizable places for information."
  },
  {
    key:"05", subject:"USER CONTROL", title:"Progressive disclosure in AI-assisted exploration",
    authors:"Kim & Ji · Int. J. Human–Computer Studies · 2026",
    url:"https://doi.org/10.1016/j.ijhcs.2026.103771",
    summary:"In a 36-person exploratory-search study, progressive responses and greater user initiative influenced engagement and cognitive-load measures. It was not an ADHD-specific interface trial."
  }
];

function DrawerBody({id, decision, onDecision}:{id:DrawerId;decision:string;onDecision:(next:string)=>void}) {
  if(id==="hypothesis") return <div className="nce-drawer-body">
    <span className="nce-overline">THE QUESTION</span>
    <h5>Will a guided first workspace improve activation?</h5>
    <p>Start with one testable claim. Give the team a shared definition of success before we spend more.</p>
    <div className="nce-inline-note"><FlaskConical size={14}/> Drafted from Monday growth sync</div>
  </div>;
  if(id==="sources") return <div className="nce-drawer-body">
    <p>This experiment is linked to the information that inspired it.</p>
    <div className="nce-source-line"><BookOpenText size={15}/> Monday growth sync <span>Meeting notes</span></div>
    <div className="nce-source-line"><Database size={15}/> Acquisition dashboard <span>Database</span></div>
    <div className="nce-inline-note">Sources are illustrative; no Notion account is connected.</div>
  </div>;
  if(id==="metrics") return <div className="nce-drawer-body">
    <div className="nce-number-grid">
      <div><span>Qualified signups</span><strong>410</strong></div>
      <div><span>Activation</span><strong>31%</strong></div>
      <div><span>CTR</span><strong>2.8%</strong></div>
      <div><span>Cost per click</span><strong>$4.20</strong></div>
    </div>
    <div className="nce-inline-note">Illustrative numbers · attribution still needs validation</div>
  </div>;
  if(id==="budget") return <div className="nce-drawer-body">
    <div className="nce-budget-row"><span>Total planned</span><strong>$30,000</strong></div>
    <div className="nce-budget-row"><span>Reported spend</span><strong>$11,850</strong></div>
    <div className="nce-budget-row"><span>Next validation test</span><strong>$2,000</strong></div>
    <div className="nce-budget-track"><span/></div>
    <div className="nce-inline-note">Budget changes always require approval.</div>
  </div>;
  if(id==="agent") return <div className="nce-drawer-body">
    <div className="nce-agent-sentence"><Sparkles size={15}/> A cautious recommendation</div>
    <p>Clicks rose faster than activation. More traffic is promising, but it does not yet prove improved user quality.</p>
    <p className="nce-small"><strong>Suggestion:</strong> validate attribution and run a smaller controlled test before scaling.</p>
  </div>;
  return <div className="nce-drawer-body">
    <span className="nce-overline">HUMAN IN THE LOOP</span>
    <h5>What should we do next?</h5>
    <p>Keep the decision visible, and save the reasoning alongside it.</p>
    <div className="nce-decision-actions">
      <button type="button" className={decision==="Validate with $2,000"?"nce-decision-selected":""} onClick={()=>onDecision("Validate with $2,000")}><Check size={14}/> Validate with $2,000</button>
      <button type="button" className={decision==="Hold budget"?"nce-decision-selected":""} onClick={()=>onDecision("Hold budget")}>Hold budget</button>
    </div>
    <div className="nce-inline-note">{decision?"Selected: "+decision+" · local preview only":"No change until someone approves it."}</div>
  </div>;
}

function DrawerPlayground() {
  const [opened,setOpened] = useState<Record<DrawerId,boolean>>({...defaultOpen});
  const [iconChoices,setIconChoices] = useState<Record<DrawerId,IconChoice>>({...defaultIcons});
  const [iconEditor,setIconEditor] = useState<DrawerId|null>(null);
  const [decision,setDecision] = useState("");
  const [saved,setSaved] = useState(false);
  const allOpen = DRAWERS.every((d)=>opened[d.id]);
  const openCount = DRAWERS.filter((d)=>opened[d.id]).length;
  const setAll = (next:boolean) => {
    const state = {} as Record<DrawerId,boolean>;
    DRAWERS.forEach((d)=>{state[d.id]=next;});
    setOpened(state); setIconEditor(null);
  };
  const reset = () => {
    setOpened({...defaultOpen});setIconChoices({...defaultIcons});
    setIconEditor(null);setDecision("");setSaved(false);
  };
  return <div className="nce-demo-wrap" id="try-the-drawers">
    <div className="nce-demo-intro">
      <div><span className="nce-tag"><span className="nce-live"/> LIVE PROTOTYPE</span>
        <h3>Try the drawers.</h3>
        <p>Same information. Your choice of how much is visible.</p>
      </div>
      <div className="nce-demo-controls">
        <label className="nce-switch-control">
          <span className="nce-switch-copy"><Eye size={16}/><strong>Show everything</strong></span>
          <input type="checkbox" role="switch" checked={allOpen} onChange={(e)=>setAll(e.target.checked)} aria-label="Show all drawer contents"/>
          <span className="nce-switch-track" aria-hidden="true"><span/></span>
        </label>
        <button type="button" className="nce-reset" onClick={reset}><RotateCcw size={15}/> Reset</button>
      </div>
    </div>
    <div className="nce-prototype">
      <div className="nce-browser-bar">
        <div className="nce-browser-path"><span className="nce-notion-mark">N</span><span>Workspace</span><span className="nce-chevron">/</span><span>Experiments</span><span className="nce-chevron">/</span><strong>Guided onboarding</strong></div>
        <span className="nce-browser-status"><span/> Prototype</span>
      </div>
      <div className="nce-prototype-head">
        <div><span className="nce-page-icon">✳</span><h4>Guided onboarding</h4>
        <p>One experiment, six drawers. Created from <span className="nce-highlight">/experiment</span> using meeting notes and connected project context.</p></div>
        <div className="nce-prototype-count"><span>{openCount} / 6</span><small>drawers open</small></div>
      </div>
      <div className="nce-bento-grid">
        {DRAWERS.map((d)=>{
          const Icon = ICONS[iconChoices[d.id]];
          const isOpen = opened[d.id];
          const editing = iconEditor===d.id;
          return <article className={"nce-drawer "+d.className+" nce-"+d.accent+(isOpen?" nce-drawer-open":"")} key={d.id}>
            <div className="nce-drawer-top">
              <div className="nce-icon-wrap">
                <button type="button" className="nce-drawer-icon" aria-label={"Change icon for "+d.title} aria-expanded={editing} title="Change icon" onClick={()=>setIconEditor(editing?null:d.id)}><Icon size={23} strokeWidth={1.8}/><span className="nce-edit-mark"><Pencil size={10}/></span></button>
                {editing && <div className="nce-icon-picker" role="group" aria-label={"Choose icon for "+d.title}>
                  <div className="nce-picker-title">Choose an icon</div>
                  <div className="nce-picker-grid">{ICON_OPTIONS.map((opt)=>{const Option=ICONS[opt];return <button type="button" key={opt} aria-label={ICON_LABELS[opt]} title={ICON_LABELS[opt]} className={iconChoices[d.id]===opt?"nce-picked":""} onClick={()=>{setIconChoices(old=>({...old,[d.id]:opt}));setIconEditor(null)}}><Option size={17}/></button>})}</div>
                  <button type="button" className="nce-picker-close" onClick={()=>setIconEditor(null)}><X size={12}/> Close</button>
                </div>}
              </div>
              <span className="nce-drawer-num">{d.number} / 06</span>
            </div>
            <button className="nce-drawer-trigger" type="button" aria-expanded={isOpen} aria-controls={"nce-content-"+d.id} onClick={()=>{setOpened(old=>({...old,[d.id]:!old[d.id]}));setIconEditor(null)}}>
              <span className="nce-drawer-title"><strong>{d.title}</strong><small>{d.hint}</small></span>
              <span className="nce-drawer-chevron">{isOpen?<ChevronUp size={19}/>:<ChevronDown size={19}/>}</span>
            </button>
            <div className="nce-drawer-reveal" id={"nce-content-"+d.id} hidden={!isOpen}>
              <DrawerBody id={d.id} decision={decision} onDecision={setDecision}/>
            </div>
            {!isOpen&&<span className="nce-tap-prompt"><Eye size={13}/> Click to look inside</span>}
          </article>;
        })}
      </div>
      <div className="nce-prototype-bottom">
        <span>{saved?<><Check size={15}/> Saved in this demo · no data left your browser</>:<><Focus size={15}/> No new tabs. Nothing else asking for attention.</>}</span>
        <button type="button" onClick={()=>setSaved(true)} disabled={saved}>{saved?"Saved in preview":"Save experiment in preview"} <ArrowRight size={14}/></button>
      </div>
    </div>
    <p className="nce-demo-disclaimer">Interactive illustration, not a live Notion integration. All campaign metrics, AI analysis, and save actions are simulated.</p>
  </div>;
}

export default function NotionAttentionEssay() {
  return <div className="nce-page">
    <header className="nce-site-nav">
      <Link href="/" className="nce-monogram" aria-label="Sergio Piñeros home">s.</Link>
      <nav aria-label="Article sections"><a href="#the-question">The idea</a><a href="#try-the-drawers">The prototype</a><a href="#the-research">Research</a></nav>
      <a className="nce-nav-end" href="https://www.sergiopineros.com/notion#try-the-drawers">An independent design experiment <ArrowUpRight size={13}/></a>
    </header>
    <main>
      <article>
        <div className="nce-intro-shell">
          <div className="nce-essay-meta"><span className="nce-essay-label">FIELD NOTE Nº 001</span><span>COGNITION × INTERFACE DESIGN</span><span>NOVEMBER 2026</span></div>
          <div className="nce-hero-content">
            <span className="nce-eyebrow">A thought experiment in neuroinclusive design</span>
            <h1>What if software<br/>had <em>drawers?</em></h1>
            <p className="nce-lead">An ADHD-informed hypothesis about bento layouts, visual memory, and the freedom to decide how much you want to see.</p>
            <a className="nce-jump" href="#try-the-drawers">Skip straight to the interactive prototype <ArrowDown size={16}/></a>
          </div>
          <div className="nce-hero-decoration" aria-hidden="true">
            <div className="nce-stack nce-stack-a"><span>✳</span></div>
            <div className="nce-stack nce-stack-b"><span>⌁</span></div>
            <div className="nce-stack nce-stack-c"><span>◈</span></div>
            <div className="nce-stack nce-stack-d"><span>↗</span></div>
          </div>
          <div className="nce-authorline"><span>Words, idea & working prototype by Sergio Piñeros</span><span>6 min read · Unproven hypothesis</span></div>
        </div>
        <section className="nce-essay-section nce-narrow" id="the-question">
          <div className="nce-section-index">01 / THE QUESTION</div>
          <h2>Maybe the interface isn't too complicated.<br/><em>Maybe it's too loud.</em></h2>
          <p>While designing a concept called <strong>Notion Experiments</strong>, I kept returning to a question: why should an experiment dashboard present every metric, comment, source, and next action simultaneously?</p>
          <p>Sometimes I want the whole picture. Sometimes I only want to answer one question. Both are valid ways to work, and my interface should let me switch between them.</p>
          <div className="nce-quote"><span>“</span><p>Keep the handles visible.<br/>Let the contents wait.</p></div>
          <p>I started imagining a bento grid as a chest of drawers. Each drawer has a memorable location, a descriptive name, and an icon. The information is still there. It simply waits for me to open it.</p>
        </section>
        <section className="nce-research-preview">
          <div className="nce-wide">
            <span className="nce-section-index">02 / THREE THINGS THE RESEARCH SUGGESTS</span>
            <div className="nce-principles">
              <div><span className="nce-principle-icon nce-pi-one"><EyeOff size={23}/></span><div><h3>Attention is selective.</h3><p>Research on adults with ADHD finds that irrelevant visual distractors can interfere with attention. But more demanding <em>relevant</em> information can also suppress distraction. The target is irrelevant competition, not maximum emptiness. <a href="#source-01">[1]</a></p></div></div>
              <div><span className="nce-principle-icon nce-pi-two"><Archive size={23}/></span><div><h3>Memory likes external places.</h3><p>Environmental cues can help with remembering and organizing. A stable icon and a visible label could act as a handle: “I know where that lives.” That's the design hypothesis—not a measured result for these cards. <a href="#source-02">[2]</a> <a href="#source-04">[4]</a></p></div></div>
              <div><span className="nce-principle-icon nce-pi-three"><Focus size={23}/></span><div><h3>Detail can arrive on demand.</h3><p>Progressive disclosure is an established interface pattern. Research suggests useful trade-offs for learning and exploration, but hiding too much can also increase navigation costs. An easy “show everything” option matters. <a href="#source-03">[3]</a> <a href="#source-05">[5]</a></p></div></div>
            </div>
          </div>
        </section>
        <section className="nce-experiment-section nce-wide" aria-label="Interactive drawer design experiment">
          <div className="nce-scribble"><span>↘</span> okay, but what does it feel like?</div>
          <DrawerPlayground/>
        </section>
        <section className="nce-essay-section nce-narrow">
          <div className="nce-section-index">03 / A SMALL DESIGN DECISION</div>
          <h2>An icon is a handle.<br/><em>Not a guessing game.</em></h2>
          <p>Icons can make locations recognizable, especially when they stay in the same place. But icon-only navigation may be ambiguous. So each drawer keeps its <strong>icon, label, and short description</strong> visible, even when the content is closed.</p>
          <p>Click the icon in the prototype to change it. Open one drawer. Close another. Turn <strong>Show everything</strong> on. Nothing is permanently hidden, and nothing asks you to remember the contents of a blank square.</p>
          <div className="nce-experiment-callout"><Coffee size={24}/><div><strong>About the caffeine thought.</strong><p>Some days I want quiet. Other days I want the entire map in front of me. I jokingly associate that with my caffeine and energy level, but that's a personal observation—not a scientific claim about caffeine or ADHD. The design takeaway is user control.</p></div></div>
        </section>
        <section className="nce-test-section">
          <div className="nce-wide nce-test-grid">
            <div><span className="nce-section-index">04 / THE HYPOTHESIS</span><h2>Let's test it,<br/>instead of declaring<br/>it a solution.</h2></div>
            <div className="nce-test-content">
              <p className="nce-test-statement">A labeled, individually collapsible bento interface—with a one-click “show all” option—<em>may</em> reduce perceived clutter and help people locate information, compared with a fully expanded dashboard.</p>
              <div className="nce-test-checks"><div><span>01</span><p>Compare collapsed-first and expanded-first layouts on the same tasks.</p></div><div><span>02</span><p>Measure time to find information, errors, and perceived workload.</p></div><div><span>03</span><p>Test with ADHD and non-ADHD participants; ask about preferences and forgotten hidden content.</p></div></div>
              <p className="nce-test-note"><strong>Possible failure:</strong> drawers could add clicks, hide critical information, or make recall worse. We should discover that, not bury it.</p>
            </div>
          </div>
        </section>
        <section className="nce-sources-section nce-wide" id="the-research">
          <div className="nce-sources-heading"><div><span className="nce-section-index">05 / OPEN NOTEBOOK</span><h2>The actual research.</h2><p>These studies inform the thinking. None directly validates this specific bento prototype as an ADHD treatment, accommodation, or universally better interface.</p></div><BookOpenText size={31}/></div>
          <div className="nce-source-list">{SOURCES.map((s)=><a href={s.url} key={s.key} id={"source-"+s.key} target="_blank" rel="noopener noreferrer" className="nce-research-source"><span className="nce-source-num">{s.key}</span><div><span className="nce-source-type">{s.subject}</span><h3>{s.title}</h3><p className="nce-source-by">{s.authors}</p><p className="nce-source-description">{s.summary}</p></div><ArrowUpRight size={20}/></a>)}</div>
        </section>
        <section className="nce-final-note nce-narrow">
          <span className="nce-section-index">A LAST THOUGHT</span>
          <p>Designing for different minds may begin with a small act of respect: <em>let people decide how much of the world they want on the screen.</em></p>
          <a href="#try-the-drawers">Go play with the drawers again <ArrowRight size={16}/></a>
        </section>
      </article>
    </main>
    <footer className="nce-footer"><div><span>© 2026 Sergio Piñeros</span><span>Independent research-informed concept · Not affiliated with Notion</span></div><div><Link href="/">More experiments</Link><a href="#the-question">Back to top ↑</a></div></footer>
  </div>;
}
