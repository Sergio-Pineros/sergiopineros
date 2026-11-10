"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ArrowRight, Waves } from "lucide-react";
import { QUESTIONS } from "@/lib/projects";

export default function QuestionConversation({ paused = false }: { paused?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const questionRef = useRef<HTMLSpanElement>(null);
  const answerRef = useRef<HTMLParagraphElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const requestedRef = useRef(0);
  const hintedRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [rippling, setRippling] = useState(false);
  const current = QUESTIONS[index];

  const resetLiquid = useCallback(() => {
    timelineRef.current?.kill();
    gsap.set([questionRef.current, answerRef.current].filter(Boolean), { clearProps: "filter,opacity" });
    displacementRef.current?.setAttribute("scale", "0");
  }, []);

  useEffect(() => () => { timelineRef.current?.kill(); }, []);

  // The invitation starts only after the visitor actually reaches this screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || interacted || paused || hintedRef.current) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      if (entry.intersectionRatio < 0.5) return;
      timer = setTimeout(() => {
        if (preference.matches || document.hidden) return;
        hintedRef.current = true;
        const targets = [questionRef.current, answerRef.current];
        setRippling(true);
        timelineRef.current = gsap.timeline({
          onComplete: () => {
            gsap.set(targets, { clearProps: "filter" });
            setRippling(false);
          },
        })
          .set(targets, { filter: "url(#conversation-liquid)" })
          .to(displacementRef.current, { attr: { scale: 22 }, duration: 0.7, ease: "sine.inOut" })
          .to(displacementRef.current, { attr: { scale: 0 }, duration: 0.9, ease: "sine.out" });
      }, 5000);
    }, { threshold: 0.5 });
    observer.observe(section);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [interacted, paused]);

  // Motion settings can change while the page is open, including mid-transition.
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (!preference.matches) return;
      resetLiquid();
      setIndex(requestedRef.current);
      setRippling(false);
    };
    preference.addEventListener("change", onChange);
    return () => preference.removeEventListener("change", onChange);
  }, [resetLiquid]);

  const showQuestion = (next: number) => {
    requestedRef.current = next;
    setInteracted(true);
    resetLiquid();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(next);
      setRippling(false);
      return;
    }
    setRippling(true);
    const targets = [questionRef.current, answerRef.current];
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        gsap.set(targets, { clearProps: "filter,opacity" });
        setRippling(false);
      },
    })
      .set(targets, { filter: "url(#conversation-liquid)", opacity: 1 })
      .to(displacementRef.current, { attr: { scale: 85 }, duration: 0.42, ease: "power2.in" }, 0)
      .to(targets, { opacity: 0, duration: 0.23 }, 0.2)
      .call(() => { flushSync(() => setIndex(next)); })
      .set(displacementRef.current, { attr: { scale: -65 } })
      .to(displacementRef.current, { attr: { scale: 0 }, duration: 0.65, ease: "power2.out" })
      .to(targets, { opacity: 1, duration: 0.5, ease: "sine.out" }, "<");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    let next = requestedRef.current;
    if (event.key === "ArrowRight") next = (next + 1) % QUESTIONS.length;
    else if (event.key === "ArrowLeft") next = (next + QUESTIONS.length - 1) % QUESTIONS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = QUESTIONS.length - 1;
    else return;
    event.preventDefault();
    showQuestion(next);
  };

  return (
    <section id="conversation" ref={sectionRef} className="conversation" aria-label="A few questions" data-question={current.id} data-rippling={rippling}>
      <svg className="liquid-filter" aria-hidden="true" focusable="false">
        <defs>
          <filter id="conversation-liquid" x="-25%" y="-30%" width="150%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="1" seed="8" result="water" />
            <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="water" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className="conversation-heading"><span>A few questions</span><span>Let’s keep talking.</span></div>
      <div className="conversation-prompt">
        <h2 id="conversation-question">
          <button type="button" className="conversation-question" aria-label={`${current.question} Next question`} aria-controls="conversation-answer" onClick={() => showQuestion((requestedRef.current + 1) % QUESTIONS.length)} onKeyDown={onKeyDown}>
            <span ref={questionRef} className="conversation-question__text">
              {current.lines.map((line) => <span key={line}>{line}</span>)}
            </span>
          </button>
        </h2>
        <span className="conversation-cue" aria-hidden="true"><Waves size={18} /> Tap the question <ArrowRight size={16} /></span>
      </div>
      <div id="conversation-answer" className="conversation-answer" aria-live="polite" aria-atomic="true">
        <p ref={answerRef}>{current.answer}</p>
      </div>
      <div className="conversation-bottom"><span>There’s always another question.</span><a href="#contact">Keep wandering <ArrowRight size={16} aria-hidden="true" /></a></div>
    </section>
  );
}
