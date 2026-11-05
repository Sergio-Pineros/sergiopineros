"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ThemeProvider } from "next-themes";
import ScreenLoader from "@/components/ScreenLoader";
import StudioDesktop from "@/components/StudioDesktop";
import { HERO_TABS, HERO_PANELS } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scriptRef = useRef<HTMLSpanElement>(null);
  const [activeTab, setActiveTab] = useState<(typeof HERO_TABS)[number]["id"]>("who");
  const [loaded, setLoaded] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [desktopOrigin, setDesktopOrigin] = useState<DOMRect | null>(null);
  const handleLoaderComplete = useCallback(() => setLoaded(true), []);
  const activePanel = HERO_PANELS[activeTab];

  const openDesktop = useCallback((origin?: DOMRect | null) => {
    setDesktopOrigin(origin ?? null);
    setDesktopOpen(true);
  }, []);

  const closeDesktop = useCallback(() => {
    setDesktopOpen(false);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", onResize);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("resize", onResize);
    };
  }, [loaded]);

  const handleTabClick = (id: (typeof HERO_TABS)[number]["id"]) => {
    if (id === activeTab || !headlineRef.current || !scriptRef.current) return;

    const headline = headlineRef.current;
    const script = scriptRef.current;

    gsap
      .timeline({ defaults: { ease: "power2.in" } })
      .to([headline, script], { opacity: 0, y: 14, duration: 0.28 })
      .call(() => {
        flushSync(() => setActiveTab(id));
      })
      .fromTo(
        [headline, script],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power3.out" }
      );
  };

  useGSAP(
    () => {
      if (!loaded) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".site-nav", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.05,
      });

      gsap.from(".hero-tab", {
        y: 8,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(1.2)",
        delay: 0.15,
      });

      gsap.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(scriptRef.current, {
        scale: 0.92,
        opacity: 0,
        rotation: -4,
        duration: 1.8,
        ease: "power2.out",
        delay: 0.4,
      });

      gsap.from(".studio-gate", {
        y: 10,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.85,
      });

      gsap.from(".footer__logotype", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 88%",
        },
      });

      gsap.from(".footer__pill", {
        y: 16,
        opacity: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 85%",
        },
      });
    },
    { scope: rootRef, dependencies: [loaded] }
  );

  return (
    <>
      <ScreenLoader onComplete={handleLoaderComplete} />

      <div id="top" ref={rootRef} className={loaded ? "site-visible" : "site-hidden"}>
        <header className="site-nav">
          <div className="site-nav__bar">
            <a href="#hero" className="nav-logo" aria-label="Sergio Piñeros home">
              <Image
                src="/horizontal.svg"
                alt=""
                width={180}
                height={44}
                className="nav-logo__mark"
                priority
              />
            </a>
          </div>
        </header>

        <main>
          <section id="hero" ref={heroRef} className="hero">
            <div className="hero-tabs-wrap">
              <div className="hero-tabs" role="tablist" aria-label="About Sergio">
                {HERO_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`hero-tab ${activeTab === tab.id ? "hero-tab--active" : ""}`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-statement" data-tab={activeTab}>
              <h1 ref={headlineRef} className="hero-headline">
                {activePanel.headline}
              </h1>
              <span ref={scriptRef} className="hero-script" aria-hidden="true">
                {activePanel.script}
              </span>
            </div>

            <div id="projects" className="studio-gate">
              <span className="studio-gate__halo" aria-hidden="true" />
              <span className="studio-gate__ring" aria-hidden="true" />
              <span className="studio-gate__ring studio-gate__ring--late" aria-hidden="true" />
              <button
                type="button"
                className="studio-gate__btn"
                aria-label="Open studio desktop"
                onClick={(event) => openDesktop(event.currentTarget.getBoundingClientRect())}
              >
                <Image src="/icon.svg" alt="" width={84} height={77} priority />
              </button>
            </div>
          </section>

          <footer id="contact" className="footer">
            <div className="footer__logo-wrap">
              <div className="footer__logotype" role="img" aria-label="Sergio Piñeros" />
            </div>

            <nav className="footer__actions" aria-label="Footer">
              <a href="mailto:hello@sergioatelier.co" className="footer__pill">
                ✉ email
              </a>
              <a
                href="mailto:hello@sergioatelier.co?subject=Resume%20request"
                className="footer__pill"
              >
                ▤ résumé
              </a>
              <a href="https://www.linkedin.com/" className="footer__pill footer__pill--icon">
                in
              </a>
              <a href="#hero" className="footer__pill footer__pill--icon">
                ×
              </a>
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
