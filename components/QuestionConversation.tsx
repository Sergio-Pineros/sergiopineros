"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { QUESTIONS } from "@/lib/projects";

export default function QuestionConversation({ paused = false }: { paused?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const questionRef = useRef<HTMLSpanElement>(null);
  const answerRef = useRef<HTMLParagraphElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const requestedRef = useRef(0);
  const hintedRef = useRef(false);
  const gestureRef = useRef<{ x: number; y: number; dragging: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [rippling, setRippling] = useState(false);
  const current = QUESTIONS[index];

  // Fit each complete phrase independently so even the longest answer title
  // remains exactly two lines across phone sizes, zoom, and font loading.
  useLayoutEffect(() => {
    const text = questionRef.current;
    const button = text?.parentElement;
    if (!text || !button) return;
    let disposed = false;
    let previousWidth = -1;
    let frame = 0;
    const fit = () => {
      if (disposed) return;
      const baseSize = parseFloat(getComputedStyle(button).fontSize);
      const available = button.clientWidth - 4;
      if (available <= 0) return;
      for (const line of Array.from(text.children) as HTMLElement[]) {
        line.style.fontSize = `${baseSize}px`;
        const natural = line.getBoundingClientRect().width;
        line.style.fontSize = `${Math.floor(Math.min(baseSize, baseSize * available / Math.max(natural, 1)))}px`;
      }
    };
    fit();
    const scheduleFit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width === previousWidth) return;
      previousWidth = entry.contentRect.width;
      scheduleFit();
    });
    observer.observe(button);
    document.fonts.ready.then(() => { if (!disposed) scheduleFit(); });
    window.addEventListener("resize", scheduleFit);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", scheduleFit);
    };
  }, [index]);

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

  const moveLight = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--light-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--light-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    const gesture = gestureRef.current;
    if (!gesture) return;
    if (event.pointerType === "mouse" && event.buttons === 0) { gestureRef.current = null; return; }
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.dragging && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      resetLiquid();
      setInteracted(true);
      gesture.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!gesture.dragging) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([questionRef.current, answerRef.current], { filter: "url(#conversation-liquid)" });
      displacementRef.current?.setAttribute("scale", String(Math.max(-70, Math.min(70, dx * 0.65))));
    }
  };

  const finishGesture = (event: PointerEvent<HTMLButtonElement>) => {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    if (!gesture?.dragging) return;
    suppressClickRef.current = true;
    const dx = event.clientX - gesture.x;
    if (Math.abs(dx) >= 36) {
      const direction = dx < 0 ? 1 : -1;
      showQuestion((requestedRef.current + direction + QUESTIONS.length) % QUESTIONS.length);
    } else {
      resetLiquid();
      setRippling(false);
    }
  };

  return (
    <section id="conversation" ref={sectionRef} className="conversation" aria-label="About Sergio" data-question={current.id} data-rippling={rippling}>
      <svg className="liquid-filter" aria-hidden="true" focusable="false">
        <defs>
          <filter id="conversation-liquid" x="-25%" y="-30%" width="150%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves="1" seed="8" result="water" />
            <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="water" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className="conversation-prompt">
        <h2 id="conversation-question">
          <button type="button" className="conversation-question" aria-label={`${current.question} Next question`} aria-controls="conversation-answer" onClick={(event) => {
            if (suppressClickRef.current && event.detail > 0) { suppressClickRef.current = false; return; }
            suppressClickRef.current = false;
            showQuestion((requestedRef.current + 1) % QUESTIONS.length);
          }} onKeyDown={onKeyDown}
            onPointerDown={(event) => {
              if (!event.isPrimary || event.button !== 0) return;
              suppressClickRef.current = false;
              gestureRef.current = { x: event.clientX, y: event.clientY, dragging: false };
            }}
            onPointerMove={moveLight}
            onPointerUp={finishGesture}
            onPointerCancel={() => { gestureRef.current = null; resetLiquid(); setIndex(requestedRef.current); setRippling(false); }}
          >
            <span ref={questionRef} className="conversation-question__text">
              {current.lines.map((line) => <span key={line}>{line}</span>)}
            </span>
            <span className="conversation-vellum" aria-hidden="true" />
          </button>
        </h2>
      </div>
      <div id="conversation-answer" className="conversation-answer" aria-live="polite" aria-atomic="true">
        <p ref={answerRef} />
      </div>
    </section>
  );
}
