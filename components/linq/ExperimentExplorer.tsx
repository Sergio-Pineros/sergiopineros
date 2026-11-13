"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { GROWTH_IDEAS } from "@/lib/linq";

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
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function select(index: number) {
    setActive(index);
    window.history.replaceState(null, "", `#${GROWTH_IDEAS[index].id}`);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % GROWTH_IDEAS.length;
    else if (event.key === "ArrowLeft") next = (index + GROWTH_IDEAS.length - 1) % GROWTH_IDEAS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = GROWTH_IDEAS.length - 1;
    else return;
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="experiments" className="lq-proposal lq-wrap" aria-label="Growth proposal">
      <div className="lq-tabs" role="tablist" aria-label="Ways to grow Linq">
        {GROWTH_IDEAS.map((idea, i) => (
          <button ref={el => { tabs.current[i] = el; }} id={`idea-tab-${i}`} role="tab" type="button" key={idea.id} aria-selected={active === i} aria-controls={idea.id} tabIndex={active === i ? 0 : -1} onClick={() => select(i)} onKeyDown={event => onKeyDown(event, i)}>
            {idea.label}
          </button>
        ))}
      </div>
      {GROWTH_IDEAS.map((idea, i) => (
        <div className="lq-idea" role="tabpanel" id={idea.id} aria-labelledby={`idea-tab-${i}`} hidden={active !== i} tabIndex={0} key={idea.id}>
          <h2>{idea.title}</h2>
          <p className="lq-idea-lead">{idea.idea}</p>
          <div className="lq-idea-columns">
            <div>
              <h3>The first move</h3><p>{idea.firstMove}</p>
              <h3>Why I can do it</h3><p>{idea.experience}</p>
            </div>
            <div>
              <h3>The business case</h3><p>{idea.businessCase}</p>
              <h3>What I’d measure</h3><p>{idea.measure}</p>
            </div>
          </div>
          <details className="lq-test">
            <summary>How I’d test it <span aria-hidden="true">+</span></summary>
            <p>{idea.test}</p>
            <div className="lq-sources">{idea.sources.map(source => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>)}</div>
          </details>
        </div>
      ))}
    </section>
  );
}
