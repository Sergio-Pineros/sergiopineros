"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LOADER_KEY = "sergio-portfolio-loaded";

export default function ScreenLoader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasLoaded = sessionStorage.getItem(LOADER_KEY);

    if (reduced || hasLoaded) {
      setVisible(false);
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(LOADER_KEY, "1");
        document.body.style.overflow = "";
        setVisible(false);
        onComplete();
      },
    });

    tl.fromTo(
      wordmarkRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    tl.to(
      counter,
      {
        value: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.round(counter.value)}`;
          }
          if (barRef.current) {
            barRef.current.style.width = `${counter.value}%`;
          }
        },
      },
      0.1
    );

    tl.to(wordmarkRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.35,
      ease: "power2.in",
    });

    tl.to(
      overlayRef.current,
      {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={overlayRef} className="screen-loader" aria-hidden="true">
      <div ref={wordmarkRef} className="screen-loader__wordmark">
        Sergio Piñeros
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
