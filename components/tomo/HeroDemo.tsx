"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_EXAMPLES } from "@/lib/tomo";
import { Bubble } from "./ChatThread";

type Phase = "idle" | "typing" | "answered";

export default function HeroDemo() {
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [interacted, setInteracted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // Rotate the highlighted example until the visitor takes over.
  useEffect(() => {
    if (interacted || reducedMotion) return;
    const id = window.setInterval(() => {
      setSelected((current) => (current + 1) % HERO_EXAMPLES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [interacted, reducedMotion]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const choose = (index: number) => {
    setInteracted(true);
    setSelected(index);
    if (timer.current) window.clearTimeout(timer.current);
    if (reducedMotion) {
      setPhase("answered");
      return;
    }
    setPhase("typing");
    timer.current = window.setTimeout(() => setPhase("answered"), 1100);
  };

  const example = HERO_EXAMPLES[selected];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-[2.5rem] bg-[#fffdf8] p-4 shadow-[0_24px_60px_rgba(43,33,24,0.14)] ring-1 ring-[#2b2118]/10 sm:p-5">
        <div className="flex items-center gap-3 border-b border-[#2b2118]/8 pb-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffc531] text-[17px] font-bold text-[#2b2118]"
          >
            T
          </span>
          <div>
            <p className="text-[15px] font-semibold leading-tight text-[#2b2118]">Tomo</p>
            <p className="text-[12px] leading-tight text-[#2b2118]/55">your personal AI, in your texts</p>
          </div>
        </div>

        <div className="flex min-h-[190px] flex-col justify-end space-y-3 py-4" aria-live="polite">
          <Bubble message={{ from: "user", text: example.prompt }} />
          {phase === "typing" ? (
            <div className="flex items-end gap-2">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ffc531] text-[13px] font-bold text-[#2b2118]"
              >
                T
              </span>
              <p className="rounded-3xl rounded-bl-md bg-white px-4 py-3 ring-1 ring-[#2b2118]/5">
                <span className="sr-only">Tomo is typing</span>
                <span aria-hidden="true" className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#2b2118]/40 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#2b2118]/40 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#2b2118]/40 [animation-delay:300ms]" />
                </span>
              </p>
            </div>
          ) : null}
          {phase === "answered" ? (
            <Bubble message={{ from: "tomo", text: example.response }} />
          ) : null}
          {phase === "idle" ? (
            <p className="pl-9 text-[14px] italic leading-relaxed text-[#2b2118]/50">
              Pick a message below and see how Tomo might answer.
            </p>
          ) : null}
        </div>

        <div className="border-t border-[#2b2118]/8 pt-3">
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#2b2118]/45">
            Try one
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {HERO_EXAMPLES.map((item, index) => (
              <button
                key={item.prompt}
                type="button"
                onClick={() => choose(index)}
                aria-pressed={selected === index && phase !== "idle"}
                className={`rounded-full px-4 py-2.5 text-[14px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b2118] focus-visible:ring-offset-2 ${
                  selected === index
                    ? "bg-[#2b2118] text-[#fff9ef]"
                    : "bg-[#fdf3e0] text-[#2b2118] hover:bg-[#ffc531]/50"
                }`}
              >
                {item.prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-[13px] leading-relaxed text-[#2b2118]/55">
        Scripted demo for this concept. Nothing you tap here sends a message or reaches a live AI.
      </p>
    </div>
  );
}
