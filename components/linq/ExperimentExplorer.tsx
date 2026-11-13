"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type CSSProperties } from "react";
import { GROWTH_IDEAS, type GrowthIdea } from "@/lib/linq";

function PlanTimeline({ idea }: { idea: GrowthIdea }) {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLButtonElement | null)[]>([]);
  const step = idea.steps[active];

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % idea.steps.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + idea.steps.length - 1) % idea.steps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = idea.steps.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    steps.current[next]?.focus();
  }

  return (
    <div className="lq-timeline">
      <div className="lq-step-track" role="tablist" aria-label={`${idea.label} timeline`} style={{ "--step-progress": String(active / (idea.steps.length - 1)) } as CSSProperties}>
        {idea.steps.map((s, i) => (
          <button key={s.label} ref={el => { steps.current[i] = el; }} id={`${idea.id}-step-${i}`} role="tab" aria-selected={active === i} aria-controls={`${idea.id}-stage`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={event => navigate(event, i)} type="button">
            <span className="lq-step-when">{s.when}</span>
            <span className="lq-step-dot" aria-hidden="true">0{i + 1}</span>
            <span className="lq-step-name">{s.label}</span>
          </button>
        ))}
      </div>
      <div id={`${idea.id}-stage`} role="tabpanel" aria-labelledby={`${idea.id}-step-${active}`} tabIndex={0} className="lq-stage">
        <div key={active} className="lq-stage-inner">
          <div className="lq-stage-action">
            <h4>{step.title}</h4>
            <p>{step.action}</p>
            <div className="lq-stage-output"><span>What this produces</span><p>{step.output}</p></div>
          </div>
          <div className="lq-stage-ready"><h5>Have ready</h5><ul>{step.needed.map(item => <li key={item}><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="m5 12 4 4L19 6" /></svg>{item}</li>)}</ul></div>
        </div>
        <div className="lq-stage-nav"><p aria-live="polite">Step {active + 1} of {idea.steps.length}</p><button type="button" onClick={() => setActive(s => (s + 1) % idea.steps.length)}>{active === idea.steps.length - 1 ? "Back to the beginning" : `Next: ${idea.steps[active + 1].label}`}<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></button></div>
      </div>
    </div>
  );
}

export default function ExperimentExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const syncHash = () => {
      const index = GROWTH_IDEAS.findIndex(idea => `#${idea.id}` === window.location.hash);
      if (index >= 0) {
        setActive(index);
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(() => document.getElementById("experiments")?.scrollIntoView({ block: "start", behavior: "instant" }));
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => { window.removeEventListener("hashchange", syncHash); window.cancelAnimationFrame(frame); };
  }, []);

  function select(index: number) {
    setActive(index);
    window.history.replaceState(null, "", `#${GROWTH_IDEAS[index].id}`);
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % GROWTH_IDEAS.length;
    else if (event.key === "ArrowLeft") next = (index + GROWTH_IDEAS.length - 1) % GROWTH_IDEAS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = GROWTH_IDEAS.length - 1;
    else return;
    event.preventDefault(); select(next); tabs.current[next]?.focus();
  }

  return (
    <section id="experiments" className="lq-plans" aria-labelledby="plans-title">
      <div className="lq-wrap">
        <header className="lq-plans-intro"><h2 id="plans-title">Three ways to grow Linq.</h2><p>Pick a plan. Explore what needs to happen at each step.</p></header>
        <div className="lq-plan-tabs" role="tablist" aria-label="Growth plans">
          {GROWTH_IDEAS.map((idea, i) => <button ref={el => { tabs.current[i] = el; }} id={`idea-tab-${i}`} role="tab" type="button" key={idea.id} aria-selected={active === i} aria-controls={idea.id} tabIndex={active === i ? 0 : -1} onClick={() => select(i)} onKeyDown={event => navigate(event, i)}><span>0{i + 1}</span>{idea.label}</button>)}
        </div>
        {GROWTH_IDEAS.map((idea, i) => (
          <div className="lq-idea" role="tabpanel" id={idea.id} aria-labelledby={`idea-tab-${i}`} hidden={active !== i} tabIndex={0} key={idea.id}>
            <header className="lq-idea-heading"><div><h3>{idea.title}</h3><p>{idea.idea}</p></div><span className="lq-duration">{idea.duration}</span></header>
            <PlanTimeline idea={idea} />
            <div className="lq-business"><div><h4>The business goal</h4><p>{idea.businessCase}</p></div><div><h4>What I’d measure</h4><p>{idea.measure}</p></div></div>
            <details className="lq-experience"><summary>Where my experience fits <span aria-hidden="true">+</span></summary><p>{idea.experience}</p><div className="lq-sources">{idea.sources.map(source => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>)}</div></details>
          </div>
        ))}
      </div>
    </section>
  );
}
