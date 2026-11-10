"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ThemeProvider } from "next-themes";
import ScreenLoader from "@/components/ScreenLoader";
import StudioDesktop from "@/components/StudioDesktop";
import QuestionConversation from "@/components/QuestionConversation";
import { CREATIVE_LINKS } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [desktopOrigin, setDesktopOrigin] = useState<DOMRect | null>(null);
  const handleLoaderComplete = useCallback(() => setLoaded(true), []);
  const closeDesktop = useCallback(() => setDesktopOpen(false), []);

  useGSAP(() => {
    if (!loaded || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".hero-headline", { y: 24, opacity: 0, duration: 1.1, ease: "power3.out" });
    gsap.from(".site-nav", { y: -12, opacity: 0, duration: 0.7, ease: "power2.out" });
    gsap.from(".footer__logotype", {
      y: 28, opacity: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: ".footer", start: "top 88%" },
    });
  }, { scope: rootRef, dependencies: [loaded] });

  return (
    <>
      <ScreenLoader onComplete={handleLoaderComplete} />
      <div id="top" ref={rootRef} className={loaded ? "site-visible" : "site-hidden"} inert={desktopOpen}>
        <a href="#conversation" className="skip-link">Skip to the conversation</a>
        <header className="site-nav">
          <div className="site-nav__bar">
            <a href="#hero" className="nav-logo" aria-label="Sergio Piñeros home">
              <Image src="/horizontal.svg" alt="" width={180} height={44} className="nav-logo__mark" priority />
            </a>
            <button type="button" className="desktop-entry" aria-label="Open studio desktop" onClick={(event) => {
              setDesktopOrigin(event.currentTarget.getBoundingClientRect());
              setDesktopOpen(true);
            }}>
              Look around
            </button>
          </div>
        </header>
        <main>
          <section id="hero" className="hero" aria-label="A way of making sense">
            <h1 className="hero-headline">
              <span className="hero-line hero-line--opening">I make things to</span>{" "}
              <em className="hero-line hero-line--emphasis">understand</em>{" "}
              <span className="hero-line hero-line--ending">the world <span>&amp; myself.</span></span>
            </h1>
          </section>
          <QuestionConversation paused={desktopOpen || !loaded} />
          <footer id="contact" className="footer">
            <div className="footer-question"><p>What Are We<br />Making <em>Sacred?</em></p></div>
            <div className="footer__logo-wrap">
              <div className="footer__logotype" role="img" aria-label="Sergio Piñeros" />
            </div>
            <nav className="footer__actions" aria-label="Footer">
              <a href="mailto:hello@sergioatelier.co" className="footer__pill">email</a>
              {CREATIVE_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="footer__pill" target="_blank" rel="noopener noreferrer">{link.label}</a>
              ))}
            </nav>
          </footer>
        </main>
      </div>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <StudioDesktop open={desktopOpen} onClose={closeDesktop} origin={desktopOrigin} />
      </ThemeProvider>
    </>
  );
}
