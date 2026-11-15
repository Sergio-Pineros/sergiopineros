"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  Focus, Menu, X, Sparkles, BookOpenText, Database, FilePlus2,
  AudioLines, Lightbulb, ChartNoAxesCombined, Target,
  Workflow, UserRoundCheck
} from "lucide-react";
import ApplicationDoc from "./ApplicationDoc";
import NotionWorkspaceDemo from "./NotionWorkspaceDemo";
import NotionExperimentFilm from "./NotionExperimentFilm";

export default function NotionExperience() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

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
          <a href="#implementation" onClick={() => setMobileMenu(false)}>Implementation</a>
          <a href="#me" onClick={() => setMobileMenu(false)}>About me</a>
          <a className="nt-top-cta" href="#application" onClick={() => setMobileMenu(false)}>Application</a>
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
            <p className="nt-intro">Turn meeting insights into experiments and better decisions. See evidence. Decide what to scale.</p>
            <p className="nt-hero-clarifier">Create with /experiment, connect campaign results, and approve your team’s next step inside the workspace.</p>
            <div className="nt-hero-actions">
              <a className="nt-button nt-button-dark" href="#feature">Explore the feature</a>
              <a className="nt-button nt-button-outline" href="#growth">See it for growth</a>
            </div>
          </div>
          <div className="nt-hero-art" aria-label="Conceptual Notion Experiments page with an experiment connected to meeting notes and database">
            <div className="nt-art-page">
              <div className="nt-art-breadcrumb"><img src="https://www.notion.com/front-static/favicon.ico" alt="" width="24" height="24"/> Workspace <span aria-hidden="true">·</span> Experiments</div>
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
            <h2>Turn ideas into<br/><em>experiments.</em></h2>
            <p>Capture a question from a meeting or page. Set a hypothesis and a success metric. Keep the evidence and next action together.</p>
          </div>
          <div className="nt-feature-grid">
            <article className="nt-feature-card">
              <div className="nt-feature-icon nt-icon-peach"><AudioLines size={32}/></div>
              <h3>Capture an idea</h3>
              <p>AI Meeting Notes can capture questions and decisions. Select an idea from a meeting and propose an experiment.</p>
              <a href="https://www.notion.com/help/ai-meeting-notes" target="_blank" rel="noopener noreferrer">AI Meeting Notes</a>
            </article>
            <article className="nt-feature-card">
              <div className="nt-feature-icon nt-icon-blue"><Database size={32}/></div>
              <h3>Give it structure</h3>
              <p>Store the hypothesis, owner, metric, source material, and status in a Notion database. Every test stays connected.</p>
              <a href="https://www.notion.com/help/create-a-database" target="_blank" rel="noopener noreferrer">Notion databases</a>
            </article>
            <article className="nt-feature-card">
              <div className="nt-feature-icon nt-icon-purple"><FilePlus2 size={32}/></div>
              <h3>Make a working page</h3>
              <p>Notion Agent could draft an experiment page, organize the next actions, and update the record as the team learns.</p>
              <a href="https://www.notion.com/help/notion-agent" target="_blank" rel="noopener noreferrer">Notion Agent</a>
            </article>
          </div>
          <div className="nt-feature-bridge">
            <div className="nt-bridge-mark"><Workflow size={31}/></div>
            <p><strong>One connected flow:</strong> Meeting insight <span aria-hidden="true">·</span> Experiment page <span aria-hidden="true">·</span> Evidence <span aria-hidden="true">·</span> Decision saved.</p>
          </div>
        </div>
      </section>

      <section className="nt-focus-story">
        <div className="nt-container nt-focus-grid">
          <div className="nt-focus-copy">
            <h2>Focus on<br/><em>one decision.</em></h2>
            <p>See the question, success metric, and next action first. Open the supporting evidence whenever you need it.</p>
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
              <h2>See evidence.<br/><em>Decide what to scale.</em></h2>
            </div>
            <div>
              <p>Connect campaign creatives, acquisition costs, and activation results to a shared experiment. Compare outcomes against the original hypothesis.</p>
              <p>Import performance reports or connect approved data sources. An agent could summarize evidence, suggest the next test, and request human approval for budget changes.</p>
            </div>
          </div>

          <NotionExperimentFilm />
          <NotionWorkspaceDemo />
          <div className="nt-growth-elsewhere"><h3>Experiments across your workspace.</h3><p>Product teams could test onboarding changes. Researchers could compare approaches. Operations teams could review process improvements. Every experiment has a question, evidence, and a decision the team can revisit.</p></div>
        </div>
      </section>

      <section className="nt-plan" id="implementation" aria-label="Proposed implementation as a native Notion feature">
        <div className="nt-container">
          <p className="nt-plan-eyebrow">A proposed product journey</p>
          <h2>Bring Experiments into Notion.</h2>
          <p className="nt-plan-intro">A five-part path to a native experiment workflow, using Notion pages, databases, connected evidence, and agents.</p>
          <div className="nt-plan-steps">
            {[
              {title:"Create with /experiment",body:"Add the Experiments block from any page or AI Meeting Notes."},
              {title:"Define the test",body:"Give each experiment a hypothesis, owner, metric, and linked source."},
              {title:"Connect results",body:"Import performance reports or connect approved campaign data sources."},
              {title:"Review with an agent",body:"Summarize evidence, explain trade-offs, and suggest a next test."},
              {title:"Decide and learn",body:"Approve changes, save decisions, and reuse learnings across the workspace."}
            ].map((step,index)=><article key={step.title} className="nt-plan-step">
              <span className="nt-plan-number">{index+1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>)}
          </div>
          <p className="nt-plan-note">Independent product concept and proposed implementation. The interactive example above uses fictional campaign data and local UI state.</p>
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
              <a className="nt-button nt-button-white" href="#application">Cover letter + résumé</a>
              <a className="nt-button nt-button-border" href="https://www.linkedin.com/in/sergio-pineros-c/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="nt-experience">
            <article>
              <div className="nt-exp-glyph"><ChartNoAxesCombined size={30}/></div>
              <div><h3>Growth strategy and measurement</h3><p>I built a four-person creative team at Sergio & Co., and worked with small businesses on campaigns, content, and performance. A La Estancia Steakhouse campaign reached about <strong>540K TikTok views and 1,200+ followers</strong> in its first month.</p></div>
            </article>
            <article>
              <div className="nt-exp-glyph"><Database size={30}/></div>
              <div><h3>Product development with real operators</h3><p>With SAVRON and NxtSeat, I&apos;ve built booking, staff, membership, and customer communication workflows. I&apos;ve also piloted bilingual AI voice assistance, working closely with the teams using these systems.</p></div>
            </article>
            <article>
              <div className="nt-exp-glyph"><UserRoundCheck size={30}/></div>
              <div><h3>From insight to working prototype</h3><p>Through <a className="nt-inline-link" href="http://sergioatelier.co/" target="_blank" rel="noopener noreferrer">Sergio &amp; Co.</a>, I combine discovery, creative direction, design, and development. I work with HTML, CSS, Python, marketing tools, and AI systems. This experiment concept shows how I approach an unfamiliar product problem.</p></div>
            </article>
          </div>
          <div className="nt-about-end">
            <a href="#application">Read my application</a>
          </div>
        </div>
      </section>
    </main>
    <footer className="nt-footer"><div className="nt-container"><Link href="/" aria-label="Sergio Piñeros portfolio"><img src="/icon.svg" alt="Sergio Piñeros logo" width="38" height="38"/></Link><a href="#top">Back to top</a></div></footer>
    {applicationOpen && <ApplicationDoc onClose={closeApplication}/>}
  </div>;
}
