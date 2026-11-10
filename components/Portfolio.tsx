"use client";

import { useRef, useState, useCallback, useEffect, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { ThemeProvider } from "next-themes";
import ScreenLoader from "@/components/ScreenLoader";
import StudioDesktop from "@/components/StudioDesktop";
import AttentionEye from "@/components/AttentionEye";
import { HERO_TABS, HERO_PANELS, CREATIVE_LINKS, type HeroTabId } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scriptRef = useRef<HTMLSpanElement>(null);
  const transitionRef = useRef<gsap.core.Timeline | null>(null);
  const requestedTabRef = useRef<HeroTabId>("who");
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

  useEffect(() => () => { transitionRef.current?.kill(); }, []);

  const handleTabClick = (id: HeroTabId) => {
    if (id === requestedTabRef.current || !headlineRef.current || !scriptRef.current) return;
    requestedTabRef.current = id;
    transitionRef.current?.kill();
    const elements = [headlineRef.current, scriptRef.current];
    gsap.killTweensOf(elements);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveTab(id);
      gsap.set(elements, { clearProps: "opacity,transform" });
      return;
    }
    transitionRef.current = gsap.timeline({ defaults: { ease: "power2.inOut" } })
      .to(elements, { opacity: 0, y: -8, duration: 0.16 })
      .call(() => { flushSync(() => setActiveTab(id)); })
      .fromTo(elements, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.04 });
  };

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % HERO_TABS.length;
    else if (event.key === "ArrowLeft") next = (index + HERO_TABS.length - 1) % HERO_TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = HERO_TABS.length - 1;
    else return;
    event.preventDefault();
    const tab = HERO_TABS[next];
    document.getElementById(`question-${tab.id}`)?.focus();
    handleTabClick(tab.id);
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

      <div id="top" ref={rootRef} className={loaded ? "site-visible" : "site-hidden"} inert={desktopOpen}>
        <a href="#hero-panel" className="skip-link">Skip to the conversation</a>
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
            <span className="nav-aside">a work in progress, like the rest of us.</span>
          </div>
        </header>

        <main>
          <section id="hero" ref={heroRef} className="hero">
            <div className="hero-folio"><span>A few things about me</span><span>an ongoing conversation</span></div>
            <div className="hero-tabs-wrap">
              <div className="hero-tabs" role="tablist" aria-label="About Sergio">
                {HERO_TABS.map((tab, index) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`question-${tab.id}`}
                    aria-controls="hero-panel"
                    tabIndex={activeTab === tab.id ? 0 : -1}
                    onKeyDown={(event) => handleTabKey(event, index)}
                    aria-selected={activeTab === tab.id}
                    className={`hero-tab ${activeTab === tab.id ? "hero-tab--active" : ""}`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    <span className="hero-tab__number" aria-hidden="true">0{index + 1}</span>{tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div id="hero-panel" className="hero-statement" data-tab={activeTab} role="tabpanel" aria-labelledby={`question-${activeTab}`} tabIndex={0}>
              <p className="hero-note">{activePanel.note}</p>
              <h1 ref={headlineRef} className="hero-headline">
                <span className="hero-line hero-line--opening">{activePanel.opening}</span>
                <em className="hero-line hero-line--emphasis">{activePanel.emphasis}</em>
                <span className="hero-line hero-line--ending">{activePanel.ending}</span>
              </h1>
              <AttentionEye />
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
                <Image src="/icon.svg" alt="" width={56} height={51} priority />
                <span>Come in. Have a look around.<small>Projects, experiments & other things I make <ArrowUpRight size={12} aria-hidden="true" /></small></span>
              </button>
            </div>
          </section>

          <footer id="contact" className="footer">
            <div className="footer-question"><span>A question I keep returning to</span><p>What Are We<br />Making <em>Sacred?</em></p><small>In the things we notice. In the things we make.</small></div>
            <div className="footer__logo-wrap">
              <div className="footer__logotype" role="img" aria-label="Sergio Piñeros" />
            </div>

            <nav className="footer__actions" aria-label="Footer">
              <a href="mailto:hello@sergioatelier.co" className="footer__pill">
                <Mail size={14} aria-hidden="true" /> email
              </a>
              {CREATIVE_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="footer__pill" target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={14} aria-hidden="true" /></a>
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
