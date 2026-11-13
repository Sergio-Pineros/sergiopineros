"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { GROWTH_IDEAS, type GrowthIdea } from "@/lib/linq";

function Demo({ idea, index }: { idea: GrowthIdea; index: number }) {
  const [step, setStep] = useState(0);
  const current = idea.steps[step];

  return (
    <div className={`lq-demo lq-dark lq-demo-${index}`}>
      <div className="lq-demo-heading">
        <p className="lq-eyebrow"><span className="lq-dot lq-dot-lime" /> The idea at Linq</p>
        <p>{idea.demoTitle}</p>
      </div>
      <div className="lq-demo-switches" role="group" aria-label={idea.demoHint}>
        {idea.steps.map((s, i) => (
          <button key={s.label} type="button" aria-pressed={step === i} onClick={() => setStep(i)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="lq-demo-stage" aria-live="polite" aria-atomic="true">
        <div key={step} className="lq-demo-frame">
          <span className="lq-demo-count">0{step + 1} / 0{idea.steps.length}</span>
          <h4>{current.title}</h4>
          <p className={index === 0 ? "lq-message-example" : "lq-demo-action"}>{current.text}</p>
          <p className="lq-demo-detail">{current.detail}</p>
        </div>
      </div>
      <div className="lq-demo-bottom">
        <p>Illustrative journey · no live API calls</p>
        <button className="lq-demo-next" type="button" onClick={() => setStep(s => (s + 1) % idea.steps.length)} aria-label={step === idea.steps.length - 1 ? "Restart this walkthrough" : "Next step in this walkthrough"}>
          {step === idea.steps.length - 1 ? "Replay" : "Next"}
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}

export default function ExperimentExplorer() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const syncHash = () => {
      const i = GROWTH_IDEAS.findIndex(idea => `#${idea.id}` === window.location.hash);
      if (i >= 0) {
        setActive(i);
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(() => document.getElementById("experiments")?.scrollIntoView({ block: "start", behavior: "instant" }));
      }
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function selectTab(index: number) {
    setActive(index);
    window.history.replaceState(null, "", `#${GROWTH_IDEAS[index].id}`);
  }

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % GROWTH_IDEAS.length;
    else if (event.key === "ArrowLeft") next = (index + GROWTH_IDEAS.length - 1) % GROWTH_IDEAS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = GROWTH_IDEAS.length - 1;
    else return;
    event.preventDefault();
    selectTab(next);
    buttons.current[next]?.focus();
  }

  return (
    <section id="experiments" className="lq-explorer lq-wrap" aria-labelledby="ideas-title">
      <header className="lq-explorer-intro">
        <div><p className="lq-eyebrow">Three experiments / Start anywhere</p><h2 id="ideas-title">Pick an idea.<br /><em>See how it works.</em></h2></div>
        <p>Linq gives developers the messaging layer for their own agents. These tests build on the tools it already ships.</p>
      </header>
      <div className="lq-idea-tabs" role="tablist" aria-label="Growth experiments">
        {GROWTH_IDEAS.map((idea, i) => (
          <button ref={el => { buttons.current[i] = el; }} id={`idea-tab-${i}`} role="tab" type="button" key={idea.id} aria-selected={active === i} aria-controls={idea.id} tabIndex={active === i ? 0 : -1} onClick={() => selectTab(i)} onKeyDown={e => navigateTabs(e, i)}>
            <span>0{i + 1}</span><span>{idea.label}</span>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="m6 9 6 6 6-6" /></svg>
          </button>
        ))}
      </div>
      {GROWTH_IDEAS.map((idea, i) => (
        <div className="lq-idea-panel" role="tabpanel" id={idea.id} aria-labelledby={`idea-tab-${i}`} hidden={active !== i} tabIndex={0} key={idea.id}>
          <div className="lq-idea-copy">
            <p className="lq-eyebrow">{idea.category}</p>
            <h3>{idea.title}</h3>
            <p className="lq-idea-audience"><span>For</span> {idea.audience}</p>
            <p className="lq-idea-description">{idea.description}</p>
            <dl className="lq-idea-plan">
              <div><dt>The first test</dt><dd>{idea.pilot}</dd></div>
              <div><dt>What matters</dt><dd>{idea.measure}</dd></div>
            </dl>
            <details className="lq-proof">
              <summary>Why Linq + how I’d test it <span aria-hidden="true">+</span></summary>
              <div className="lq-proof-content">
                <h4>The product basis</h4><p>{idea.basis}</p>
                <div className="lq-source-links" aria-label="Official product sources">{idea.sources.map(source => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>)}</div>
                <h4>Test design</h4><p>{idea.design}</p>
                <h4>What to watch</h4><p>{idea.guardrail}</p>
                <h4>My contribution</h4><p>{idea.proof}</p>
              </div>
            </details>
          </div>
          <Demo idea={idea} index={i} />
        </div>
      ))}
      <p className="lq-explorer-note">Product-informed hypotheses. Validate the baseline with Linq’s team before running them.</p>
    </section>
  );
}
