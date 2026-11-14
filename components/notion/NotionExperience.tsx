"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight,
  Focus, Menu, X, Sparkles, BookOpenText, Database, FilePlus2,
  AudioLines, Lightbulb, ChartNoAxesCombined, Target,
  Workflow, UserRoundCheck
} from "lucide-react";
import ApplicationDoc from "./ApplicationDoc";

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
    id: "A01", channel: "Paid social", name: "First value, faster",
    hypothesis: "Would a complete example workspace help new users reach their first meaningful action?",
    metric: "Activation rate", result: "+12.4%",
    context: "The example shows higher activation. We would check cohort quality, tracking and sample size before making a decision.",
    decision: "iterate",
    verdict: "The early signal is worth another test. I&apos;d run it with a longer measurement window.",
    next: "Repeat with segmented new-user cohorts. Review activation quality and incrementality.",
    guardrail: "Keep spending steady until the activation lift is validated."
  },
  {
    id: "B02", channel: "LinkedIn", name: "Show a real team workflow",
    hypothesis: "Could showing how a team uses Notion bring in more qualified trials?",
    metric: "Qualified trial rate", result: "+18.2%",
    context: "The example shows stronger trial quality across two cohorts and a stable cost per qualified trial.",
    decision: "scale",
    verdict: "I&apos;d expand this gradually and keep a holdout to measure impact.",
    next: "Increase the budget in stages, track qualified trials and review creative fatigue.",
    guardrail: "Agree on a cost-per-qualified-trial threshold before increasing spend."
  },
  {
    id: "C03", channel: "Search", name: "Narrower search intent",
    hypothesis: "Could a more specific search audience lower the cost of activating new users?",
    metric: "Cost per activated user", result: "+27.0%",
    context: "The example shows rising cost with no meaningful change in activation.",
    decision: "stop",
    verdict: "I&apos;d end this variant, document the result and move the budget to the next test.",
    next: "Save the negative result in the experiments database so future work can reference it.",
    guardrail: "Keep control results and attribution notes attached to the experiment."
  }
];

const decisionLabels: Record<Decision,string> = {
  scale: "Consider scaling", iterate: "Test again", stop: "Stop this variant"
};

export default function NotionExperience() {
  const [selected, setSelected] = useState(0);
  const [focus, setFocus] = useState(false);
  const [reasoning, setReasoning] = useState(false);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const current = experiments[selected];

  useEffect(() => {
    const sync = () => setApplicationOpen(["#application","#cover-letter","#resume"].includes(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!applicationOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        history.replaceState(null, "", window.location.pathname);
        setApplicationOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [applicationOpen]);

  const closeApplication = () => {
    history.replaceState(null, "", window.location.pathname);
    setApplicationOpen(false);
  };

  return <div className="nt-app" id="top">
    <a className="nt-skip" href="#feature">Skip to the feature</a>
    <header className="nt-header">
      <div className="nt-container nt-nav-row">
        <div className="nt-logos">
          <a href="https://www.notion.com/product" target="_blank" rel="noopener noreferrer" className="nt-logo-link" aria-label="Visit Notion">
            <img src="https://www.notion.com/front-static/favicon.ico" width="36" height="36" alt="Notion logo" />
          </a>
          <span className="nt-multiply" aria-hidden="true">×</span>
          <Link href="/" className="nt-logo-link nt-logo-personal" aria-label="Sergio Piñeros portfolio">
            <img src="/icon.svg" alt="Sergio Piñeros logo" width="36" height="36" />
          </Link>
        </div>
        <button className="nt-menu-toggle" type="button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu" aria-expanded={mobileMenu}>
          {mobileMenu ? <X size={22}/> : <Menu size={22}/>}
        </button>
        <nav className={mobileMenu ? "nt-nav nt-nav-show" : "nt-nav"} aria-label="Page navigation">
          <a href="#feature" onClick={() => setMobileMenu(false)}>The feature</a>
          <a href="#growth" onClick={() => setMobileMenu(false)}>Growth use case</a>
          <a href="#me" onClick={() => setMobileMenu(false)}>About me</a>
          <a className="nt-top-cta" href="#application" onClick={() => setMobileMenu(false)}>Application <ArrowUpRight size={19}/></a>
        </nav>
      </div>
    </header>

    <main>
      <section className="nt-hero">
        <div className="nt-container nt-hero-grid">
          <div className="nt-hero-content">
            <div className="nt-doodle-row" aria-hidden="true">
              <span className="nt-doodle nt-doodle-blue"><Lightbulb size={30}/></span>
              <span className="nt-doodle nt-doodle-orange"><Database size={30}/></span>
              <span className="nt-doodle nt-doodle-yellow"><Sparkles size={30}/></span>
            </div>
            <h1>Experiments,<br/><em>built into Notion.</em></h1>
            <p className="nt-intro">Imagine a Notion feature that turns ideas, meeting notes, and linked data into experiments your whole team can follow. A clear question, one next step, and a record of what worked.</p>
            <div className="nt-hero-actions">
              <a className="nt-button nt-button-dark" href="#feature">Explore the feature <ArrowDown size={20}/></a>
              <a className="nt-button nt-button-outline" href="#growth">See it for growth <ArrowRight size={20}/></a>
            </div>
          </div>
          <div className="nt-hero-art" aria-label="Conceptual Notion Experiments page with an experiment connected to meeting notes and database">
            <div className="nt-art-page">
              <div className="nt-art-breadcrumb"><img src="https://www.notion.com/front-static/favicon.ico" alt="" width="24" height="24"/> Workspace <ChevronRight size={17}/> Experiments</div>
              <div className="nt-art-page-icon"><Lightbulb size={31}/></div>
              <h2>Experiments</h2>
              <p>What should we try next?</p>
              <div className="nt-art-question"><span className="nt-art-check"><Check size={19}/></span> Will a guided first project improve activation?</div>
              <div className="nt-art-grid">
                <div><BookOpenText size={20}/><span>Linked meeting notes</span></div>
                <div><Database size={20}/><span>Experiment database</span></div>
                <div><FilePlus2 size={20}/><span>Agent-created page</span></div>
              </div>
              <div className="nt-art-bottom"><span className="nt-art-status"><span className="nt-dot"/> In review</span><span>Next: Review evidence</span></div>
            </div>
            <span className="nt-art-doodle nt-art-doodle-one" aria-hidden="true">✳</span>
            <span className="nt-art-doodle nt-art-doodle-two" aria-hidden="true">✦</span>
          </div>
        </div>
      </section>

      <section className="nt-feature" id="feature">
        <div className="nt-container">
          <div className="nt-section-header nt-feature-head">
            <h2>Everything is already<br/><em>in your workspace.</em></h2>
            <p>Notion has the pieces to make this possible. Experiments could connect them into a repeatable workflow, built on the pages and databases teams already use.</p>
          </div>
          <div className="nt-feature-grid">
            <article className="nt-feature-card">
              <div className="nt-feature-icon nt-icon-peach"><AudioLines size={32}/></div>
              <h3>Capture an idea</h3>
              <p>AI Meeting Notes can capture questions and decisions. Select an idea from a meeting and propose an experiment.</p>
              <a href="https://www.notion.com/help/ai-meeting-notes" target="_blank" rel="noopener noreferrer">AI Meeting Notes <ArrowUpRight size={18}/></a>
            </article>
            <article className="nt-feature-card">
              <div className="nt-feature-icon nt-icon-blue"><Database size={32}/></div>
              <h3>Give it structure</h3>
              <p>Store the hypothesis, owner, metric, source material, and status in a Notion database. Every test stays connected.</p>
              <a href="https://www.notion.com/help/create-a-database" target="_blank" rel="noopener noreferrer">Notion databases <ArrowUpRight size={18}/></a>
            </article>
            <article className="nt-feature-card">
              <div className="nt-feature-icon nt-icon-purple"><FilePlus2 size={32}/></div>
              <h3>Make a working page</h3>
              <p>Notion Agent could draft an experiment page, organize the next actions, and update the record as the team learns.</p>
              <a href="https://www.notion.com/help/notion-agent" target="_blank" rel="noopener noreferrer">Notion Agent <ArrowUpRight size={18}/></a>
            </article>
          </div>
          <div className="nt-feature-bridge">
            <div className="nt-bridge-mark"><Workflow size={31}/></div>
            <p><strong>One connected flow:</strong> Meeting insight <ArrowRight size={18}/> Experiment page <ArrowRight size={18}/> Evidence <ArrowRight size={18}/> Decision saved.</p>
          </div>
        </div>
      </section>

      <section className="nt-focus-story">
        <div className="nt-container nt-focus-grid">
          <div className="nt-focus-copy">
            <h2>Built for the way<br/><em>we actually focus.</em></h2>
            <p>Experiments could offer a calmer, ADHD-friendly way to work through complex decisions. Each page brings one question forward and keeps the supporting details close.</p>
          </div>
          <div className="nt-focus-principles">
            <div><span className="nt-principle-icon"><Target size={25}/></span><div><h3>One clear question</h3><p>Lead with what the team is trying to learn and the metric that matters.</p></div></div>
            <div><span className="nt-principle-icon"><Focus size={25}/></span><div><h3>Focus when you need it</h3><p>Hide competing experiments, then bring them back with one click.</p></div></div>
            <div><span className="nt-principle-icon"><BookOpenText size={25}/></span><div><h3>Context on demand</h3><p>Meeting notes, past tests, and reasoning stay linked, with details you can open when you&apos;re ready.</p></div></div>
          </div>
        </div>
      </section>

      <section className="nt-growth" id="growth">
        <div className="nt-container">
          <div className="nt-growth-intro">
            <div>
              <h2>Now, let&apos;s use it<br/><em>for growth.</em></h2>
            </div>
            <div>
              <p>I&apos;d use Experiments to connect growth conversations with acquisition and activation data. A hypothesis could move from a planning meeting into a test page, with creative, metrics, owners, and decisions in one place.</p>
              <p>Teams could add results from connected tools or imported reports, and use Notion Agent to help summarize the evidence. Budget changes would still need human approval.</p>
            </div>
          </div>

          <div className={focus ? "nt-workspace nt-focused" : "nt-workspace"}>
            <div className="nt-workspace-top">
              <div className="nt-ws-path"><img src="https://www.notion.com/front-static/favicon.ico" alt="" width="24" height="24" /><span>Growth experiments</span><ChevronRight size={19}/><strong>{current.name}</strong></div>
              <button type="button" className="nt-focus-button" aria-pressed={focus} onClick={() => setFocus(!focus)}><Focus size={20}/>{focus ? "Show all experiments" : "Focus on this experiment"}</button>
            </div>
            <div className="nt-workspace-body">
              {!focus && <aside className="nt-sidebar">
                <h3>Experiments</h3>
                {experiments.map((item, index) =>
                  <button key={item.id} type="button" onClick={() => { setSelected(index); setReasoning(false); }} aria-pressed={selected === index} className={selected === index ? "nt-experiment nt-experiment-selected" : "nt-experiment"}>
                    <span className="nt-exp-symbol">{index === 0 ? <Target size={23}/> : index === 1 ? <ChartNoAxesCombined size={23}/> : <Lightbulb size={23}/>}</span>
                    <span><strong>{item.name}</strong><span>{item.channel}</span></span>
                    {selected === index && <Check size={20}/>}
                  </button>
                )}
              </aside>}
              <article className="nt-readout" key={current.id}>
                <div className="nt-readout-channel">{current.channel} · Experiment {current.id}</div>
                <h3>{current.name}</h3>
                <p className="nt-hypothesis">{current.hypothesis}</p>
                <div className="nt-metric-grid">
                  <div><span>Primary metric</span><strong>{current.metric}</strong></div>
                  <div><span>Sample result</span><strong>{current.result}</strong></div>
                </div>
                <div className={"nt-recommendation nt-rec-" + current.decision}>
                  <div className="nt-rec-heading"><span><Sparkles size={22}/> Suggested next step</span><strong>{decisionLabels[current.decision]}</strong></div>
                  <p>{current.verdict}</p>
                </div>
                <button className="nt-reason-toggle" aria-expanded={reasoning} type="button" onClick={() => setReasoning(!reasoning)}>
                  <BookOpenText size={22}/> {reasoning ? "Hide the evidence" : "Review the evidence and safeguards"} <ChevronDown size={22} className={reasoning ? "nt-chevron-open" : ""}/>
                </button>
                {reasoning && <div className="nt-reason-grid">
                  <div><h4>Evidence to review</h4><p>{current.context}</p></div>
                  <div><h4>Guardrail</h4><p>{current.guardrail}</p></div>
                </div>}
                <div className="nt-next-step"><Check size={22}/><div><strong>What I&apos;d do next</strong><p>{current.next}</p></div></div>
              </article>
            </div>
          </div>
          <p className="nt-demo-note">This is a working UI prototype with fictional results. The suggestions are examples, and the concept is not a released Notion feature.</p>
          <div className="nt-growth-elsewhere"><h3>And it works beyond growth.</h3><p>Product teams could test onboarding changes. Researchers could compare approaches. Operations teams could review process improvements. Every experiment has a question, evidence, and a decision the team can revisit.</p></div>
        </div>
      </section>

      <section className="nt-about" id="me">
        <div className="nt-container">
          <div className="nt-about-head">
            <div>
              <h2>A bit about me.</h2>
              <p>I&apos;m Sergio, a founder who works across growth, product, and creative execution. My experience comes from building with small businesses, running campaigns, and developing software around real customer needs.</p>
            </div>
            <div className="nt-about-links">
              <a className="nt-button nt-button-white" href="#application">Cover letter + résumé <ArrowUpRight size={20}/></a>
              <a className="nt-button nt-button-border" href="https://www.linkedin.com/in/sergio-pineros-c/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={20}/></a>
            </div>
          </div>
          <div className="nt-experience">
            <article>
              <div className="nt-exp-glyph"><ChartNoAxesCombined size={30}/></div>
              <div><h3>Growth strategy and measurement</h3><p>I founded Fofo Labs, built a four-person creative team, and worked with small businesses on campaigns, content, and performance. A La Estancia Steakhouse campaign reached about <strong>540K TikTok views and 1,200+ followers</strong> in its first month.</p></div>
            </article>
            <article>
              <div className="nt-exp-glyph"><Database size={30}/></div>
              <div><h3>Product development with real operators</h3><p>With SAVRON and NxtSeat, I&apos;ve built booking, staff, membership, and customer communication workflows. I&apos;ve also piloted bilingual AI voice assistance, working closely with the teams using these systems.</p></div>
            </article>
            <article>
              <div className="nt-exp-glyph"><UserRoundCheck size={30}/></div>
              <div><h3>From insight to working prototype</h3><p>Through Sergio & Co., I combine discovery, creative direction, design, and development. I work with HTML, CSS, Python, marketing tools, and AI systems. This experiment concept shows how I approach an unfamiliar product problem.</p></div>
            </article>
          </div>
          <div className="nt-about-end">
            <img src="/linq/sergio-co.svg" alt="Sergio & Co. logo" width="185" height="44"/>
            <a href="#application">Read my application <ArrowRight size={23}/></a>
          </div>
        </div>
      </section>
    </main>
    <footer className="nt-footer"><div className="nt-container"><Link href="/" aria-label="Sergio Piñeros portfolio"><img src="/icon.svg" alt="Sergio Piñeros logo" width="38" height="38"/></Link><a href="#top">Back to top <ArrowUpRight size={20}/></a></div></footer>
    {applicationOpen && <ApplicationDoc onClose={closeApplication}/>}
  </div>;
}
