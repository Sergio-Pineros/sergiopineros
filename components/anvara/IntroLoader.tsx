"use client";

import { useEffect, useState } from "react";
import { GlassIconReveal } from "@/components/ui/liquid-glass-logo-reveal";

const STORAGE_KEY = "anvara-intro-seen";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {}
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reducedMotion) {
      setVisible(false);
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setVisible(false), 2700);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (visible) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {}
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="av-intro-loader" aria-label="Anvara exploration loading">
      <GlassIconReveal
        className="av-intro-glass"
        logo="/anvara-mark.svg"
        label="Anvara logo"
        background="#f4f6fd"
        logoColor="#2346f9"
        originalColors
        tileSize={320}
        logoScale={0.72}
        finalScale={0.8}
        loop={false}
        speed={1.6}
      />
      <button type="button" className="av-intro-skip" onClick={() => setVisible(false)}>
        Skip intro
      </button>
    </div>
  );
}
