"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor({ active = true }: { active?: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    document.body.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.08, ease: "power3.out" });
    };

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.15;
      ringPos.y += (pos.y - ringPos.y) * 0.15;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    };
    gsap.ticker.add(tick);

    const onEnterProject = () => {
      gsap.to(ring, { scale: 2.2, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    const onLeaveProject = () => {
      gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);

    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", onEnterProject);
      card.addEventListener("mouseleave", onLeaveProject);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
      document.body.classList.remove("custom-cursor-active");
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", onEnterProject);
        card.removeEventListener("mouseleave", onLeaveProject);
      });
    };
  }, [active]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
