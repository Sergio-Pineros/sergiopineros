"use client";

import { useEffect, useRef, useState } from "react";
import { Power } from "lucide-react";
import { cn } from "@/lib/utils";

export function PowerKey({ onPowerOn, className }: { onPowerOn: () => void; className?: string }) {
  const [starting, setStarting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <button type="button" className={cn("power-key", className)}
      data-starting={starting} aria-label="Power on studio desktop" aria-busy={starting}
      title="Power on" onClick={() => {
        if (starting) return;
        setStarting(true);
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        timer.current = setTimeout(() => {
          onPowerOn();
          setStarting(false);
        }, reduced ? 0 : 760);
      }}>
      <span className="power-key__halo" aria-hidden="true" />
      <span className="power-key__housing" aria-hidden="true">
        <span className="power-key__corner" />
        <span className="power-key__inner">
          <Power className="power-key__engraving" size={25} strokeWidth={2.2} />
          <Power className="power-key__path power-key__path--glow" size={25} strokeWidth={2.2} />
          <Power className="power-key__path" size={25} strokeWidth={2.2} />
        </span>
      </span>
      <span className="power-key__led" aria-hidden="true" />
    </button>
  );
}
