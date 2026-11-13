"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { LINQ_PLANS } from "@/lib/linq";

function PlanArtwork({ index }: { index: number }) {
  return (
    <div className={`lq-plan-art lq-plan-art-${index}`} aria-hidden="true">
      {index === 0 ? <><div className="lq-demo-window"><div className="lq-demo-top"><i /><i /><i /></div><div className="lq-demo-play"><svg width="32" height="38" viewBox="0 0 32 38"><path d="M2 2 30 19 2 36Z" fill="currentColor" /></svg></div><span>Built with Linq</span><div className="lq-demo-progress" /></div><span className="lq-art-note">see it. get it. build it.</span></> : null}
      {index === 1 ? <><svg className="lq-community-lines" viewBox="0 0 440 260" fill="none"><path d="M76 60 220 130 350 48M220 130 362 207M220 130 85 219" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 8" /></svg><span className="lq-member lq-member-a">hello.</span><span className="lq-member lq-member-b">let’s build.</span><span className="lq-member lq-member-c">shipped!</span><span className="lq-member lq-member-d">see you next time.</span><span className="lq-community-core"><span className="lq-community-logo" /></span></> : null}
      {index === 2 ? <><div className="lq-message lq-message-a">A real problem.</div><div className="lq-message lq-message-b">A clearer message.</div><div className="lq-message lq-message-c">A first working build.<span className="lq-message-check">✓</span></div></> : null}
    </div>
  );
}

export default function PlansExplorer() {
  const [planIndex, setPlanIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const planTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stepTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const plan = LINQ_PLANS[planIndex];
  const step = plan.steps[stepIndex];

  const choosePlan = (index: number) => {
    setPlanIndex(index);
    setStepIndex(0);
    window.history.replaceState(null, "", `#${LINQ_PLANS[index].id}`);
  };

  useEffect(() => {
    let frame = 0;
    function readHash() {
      const index = LINQ_PLANS.findIndex(item => `#${item.id}` === window.location.hash);
      if (index < 0) return;
      setPlanIndex(index);
      setStepIndex(0);
      frame = requestAnimationFrame(() => document.getElementById("plans")?.scrollIntoView({ block: "start" }));
    }
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", readHash); };
  }, []);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number, kind: "plan" | "step") {
    const count = kind === "plan" ? LINQ_PLANS.length : plan.steps.length;
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % count;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + count - 1) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    if (kind === "plan") { choosePlan(next); planTabs.current[next]?.focus(); }
    else { setStepIndex(next); stepTabs.current[next]?.focus(); }
  }

  return (
    <div className="lq-explorer">
      <div role="tablist" aria-label="Growth plans" className="lq-plan-tabs">
        {LINQ_PLANS.map((item, index) => <button ref={el => { planTabs.current[index] = el; }} key={item.id} role="tab" id={`tab-${item.id}`} aria-selected={index === planIndex} aria-controls={`panel-${item.id}`} tabIndex={index === planIndex ? 0 : -1} type="button" onClick={() => choosePlan(index)} onKeyDown={event => navigate(event, index, "plan")}>{item.tab}<span className="lq-tab-dot" aria-hidden="true" /></button>)}
      </div>
      {LINQ_PLANS.map((item, index) => <div key={item.id} role="tabpanel" hidden={index !== planIndex} id={`panel-${item.id}`} aria-labelledby={`tab-${item.id}`} tabIndex={0}>
        {index === planIndex ? <>
          <div className="lq-plan-heading"><div><h3>{plan.title}</h3><p>{plan.intro}</p></div><PlanArtwork index={index} /></div>
          <div className="lq-journey" role="tablist" aria-label={`${plan.tab} journey`} style={{ "--journey-progress": stepIndex / (plan.steps.length - 1) } as CSSProperties}>
            {plan.steps.map((item, index) => <button key={item.name} ref={el => { stepTabs.current[index] = el; }} type="button" role="tab" id={`${plan.id}-step-${index}`} aria-selected={index === stepIndex} aria-controls={`${plan.id}-detail`} tabIndex={index === stepIndex ? 0 : -1} onClick={() => setStepIndex(index)} onKeyDown={event => navigate(event, index, "step")}><span aria-hidden="true" className="lq-journey-node" />{item.name}</button>)}
          </div>
          <div className="lq-detail" id={`${plan.id}-detail`} role="tabpanel" aria-labelledby={`${plan.id}-step-${stepIndex}`} tabIndex={0}>
            <div key={stepIndex} className="lq-detail-inner"><div><h4>{step.text}</h4><p className="lq-output"><span>Comes out of it</span>{step.produces}</p></div><aside aria-label="Have ready"><h5>Have ready</h5><ul>{step.ready.map(item => <li key={item}>{item}</li>)}</ul></aside></div>
            <div className="lq-detail-nav"><div className="lq-journey-dots" aria-hidden="true">{plan.steps.map((item,index) => <span key={item.name} className={index === stepIndex ? "is-active" : ""} />)}</div><button type="button" onClick={() => setStepIndex(value => (value + 1) % plan.steps.length)}>{stepIndex === plan.steps.length - 1 ? "Explore again" : `Next: ${plan.steps[stepIndex + 1].name}`}</button></div>
          </div>
          <div className="lq-business"><div><h4>Why it matters</h4><p>{plan.goal}</p></div><div><h4>Look for</h4><ul>{plan.measure.map(item => <li key={item}>{item}</li>)}</ul></div></div>
          <details className="lq-experience" key={plan.id}><summary>{plan.experienceTitle}<span aria-hidden="true">+</span></summary><div>{plan.experience.map(paragraph => <p key={paragraph.slice(0,32)}>{paragraph}</p>)}</div></details>
        </> : null}
      </div>)}
    </div>
  );
}
