"use client";

import { useEffect, useRef, useState } from "react";

export default function ScreenLoader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setVisible(false);
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    let frame = 0;
    let cancelled = false;
    let exitTimer = 0;
    let fallbackTimer = 0;
    const start = performance.now();
    const duration = 1450;

    wordmarkRef.current?.animate(
      [
        { opacity: 0, transform: "translateY(24px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 560, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
    );

    const complete = () => {
      if (cancelled) return;
      document.body.style.overflow = "";
      setVisible(false);
      onComplete();
    };

    const finish = () => {
      wordmarkRef.current?.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(-18px)" },
        ],
        { duration: 280, easing: "ease-in", fill: "forwards" }
      );

      overlayRef.current?.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-100%)" },
        ],
        { duration: 820, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" }
      );

      // Timer is the source of truth so background-tab animation throttling
      // can never trap the visitor behind the loader.
      exitTimer = window.setTimeout(complete, 900);
    };

    const update = (now: number) => {
      const linear = Math.min((now - start) / duration, 1);
      const eased = linear < 0.5
        ? 2 * linear * linear
        : 1 - Math.pow(-2 * linear + 2, 2) / 2;
      const value = Math.round(eased * 100);

      if (counterRef.current) counterRef.current.textContent = String(value);
      if (barRef.current) barRef.current.style.width = `${eased * 100}%`;

      if (linear < 1) {
        frame = requestAnimationFrame(update);
      } else {
        finish();
      }
    };

    frame = requestAnimationFrame(update);
    fallbackTimer = window.setTimeout(complete, 2900);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(fallbackTimer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={overlayRef} className="screen-loader" aria-hidden="true">
      <div className="screen-loader__meta">
        <span>Portfolio / 2026</span>
        <span>Brand · Product · Systems</span>
      </div>
      <div ref={wordmarkRef} className="screen-loader__wordmark">
        serg
      </div>
      <div className="screen-loader__bottom">
        <div className="screen-loader__track">
          <div ref={barRef} className="screen-loader__bar" />
        </div>
        <div className="screen-loader__counter">
          <span ref={counterRef}>0</span>
          <span className="screen-loader__percent">%</span>
        </div>
      </div>
    </div>
  );
}
