"use client";

import { useEffect, useRef, useState } from "react";
import { useExploration } from "./State";
import { createPortal } from "react-dom";

const steps = [
  { target: "#marketplace .av-section-intro", label: "THE MARKETPLACE", title: "Two sides, one deal", text: "Brands need to find a good fit. Rightsholders need the right context to respond. Both sides shape the experience." },
  { target: ".av-campaign", label: "THE PROTOTYPE", title: "Start with a campaign", text: "Choose a budget, audience, location and goal. The sample opportunities update as you go." },
  { target: ".av-match-explanation", label: "THE IDEA", title: "Look beyond the score", text: "See which campaign details match and what to check before reaching out. Shortlist or compare the options that interest you." },
  { target: "#about-sergio h2", label: "WHY THIS MATTERS TO ME", title: "From experience to product", text: "My work with artists, events and small businesses is why I care about what happens after an introduction." },
  { target: "#deeper-exploration > summary", label: "GO DEEPER", title: "Explore the thinking", text: "Open the product notes for the journey, decision matrix, measurement plan and a working spec." },
];

export default function Guide() {
  const [step, setStep] = useState<number | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const { setLab } = useExploration();

  useEffect(() => {
    if (step === null) return;
    const element = document.querySelector<HTMLElement>(steps[step].target);
    if (!element) return;
    element.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: window.innerWidth < 700 ? "start" : "center" });
    element.classList.add("av-tour-target");
    const update = () => {
      const rect = element.getBoundingClientRect();
      const mobile = window.innerWidth < 700;
      setIsMobile(mobile);
      if (mobile) { setPosition(null); return; }
      const width = Math.min(340, window.innerWidth - 32);
      const height = panel.current?.offsetHeight || 230;
      const right = rect.right + 18;
      const left = right + width <= window.innerWidth - 16 ? right : Math.max(16, rect.left - width - 18);
      setPosition({ left, top: Math.max(90, Math.min(window.innerHeight - height - 16, rect.top)) });
    };
    update();
    const frame = requestAnimationFrame(() => { update(); if (step === 0) panel.current?.querySelector<HTMLButtonElement>(".av-guide-next")?.focus({ preventScroll: true }); });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const escape = (e: KeyboardEvent) => { if (e.key === "Escape") { setStep(null); trigger.current?.focus(); } };
    window.addEventListener("keydown", escape);
    return () => { cancelAnimationFrame(frame); element.classList.remove("av-tour-target"); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); window.removeEventListener("keydown", escape); };
  }, [step]);

  const close = () => { setStep(null); trigger.current?.focus({ preventScroll: true }); };
  return (
    <>
      <button ref={trigger} className="av-guide-start" onClick={() => { setLab("match"); setStep(0); }} aria-expanded={step !== null} aria-controls="av-guide-panel">
        Take a quick tour <span aria-hidden="true">✳</span>
      </button>
      {step !== null && typeof document !== "undefined" && createPortal(
        <div id="av-guide-panel" className="av-guide-panel" ref={panel} role="region" aria-label="Case study tour" aria-live="polite" style={!isMobile && position ? { top: position.top, left: position.left, bottom: "auto", right: "auto" } : undefined}>
          <button className="av-guide-close" onClick={close} aria-label="Close tour">×</button>
          <span className="av-guide-label">{steps[step].label}</span>
          <h3>{steps[step].title}</h3>
          <p>{steps[step].text}</p>
          <div className="av-guide-bottom">
            <div className="av-guide-dots" aria-label={`Tour step ${step + 1} of ${steps.length}`}>
              {steps.map((item, i) => <span key={item.target} className={i === step ? "is-current" : ""} />)}
            </div>
            <div className="av-guide-actions">
              {step > 0 ? <button onClick={() => setStep(step - 1)}>Back</button> : <button onClick={close}>Skip</button>}
              <button className="av-guide-next" onClick={() => step === steps.length - 1 ? close() : setStep(step + 1)}>{step === steps.length - 1 ? "Finish" : "Next"}</button>
            </div>
          </div>
        </div>,
        document.querySelector(".av-page") || document.body
      )}
    </>
  );
}
