"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import AssetPlaceholder from "@/components/AssetPlaceholder";
import ScreenLoader from "@/components/ScreenLoader";
import CustomCursor from "@/components/CustomCursor";
import {
  NavIconPlay,
  NavIconResume,
  NavIconStory,
  NavIconWork,
} from "@/components/NavIcons";
import { HERO_TABS, HERO_PANELS, PROJECTS, type Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function parseTags(tagsLine: string) {
  return tagsLine.split("·").map((tag) => tag.trim()).filter(Boolean);
}

function WorkCard({ project }: { project: Project }) {
  const tags = parseTags(project.tagsLine);
  const wide = Boolean(project.reverse);

  const body = (
    <>
      <div className="work-card__media">
        {project.comingSoon ? (
          <span className="work-card__badge">Coming soon</span>
        ) : null}
        <AssetPlaceholder project={project} className="work-card__placeholder" />
      </div>
      <div className="work-card__content">
        <div className="work-card__headline">
          <h3 className="work-card__title">{project.name}</h3>
          {!project.comingSoon && project.href ? (
            <span className="work-card__arrow" aria-hidden="true">
              ↗
            </span>
          ) : null}
        </div>
        <p className="work-card__description">{project.description}</p>
        <ul className="work-card__tags" aria-label={`Tags for ${project.name}`}>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </>
  );

  const className = `work-card fade-up${wide ? " work-card--wide" : ""}`;

  if (project.href && !project.comingSoon) {
    return (
      <a
        id={project.slug}
        className={className}
        href={project.href}
        target={project.href.startsWith("http") ? "_blank" : undefined}
        rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {body}
      </a>
    );
  }

  return (
    <article id={project.slug} className={className}>
      {body}
    </article>
  );
}

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scriptRef = useRef<HTMLSpanElement>(null);
  const [activeTab, setActiveTab] = useState<(typeof HERO_TABS)[number]["id"]>("who");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const handleLoaderComplete = useCallback(() => setLoaded(true), []);
  const activePanel = HERO_PANELS[activeTab];

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

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

      gsap.from(".scroll-cue", {
        y: 10,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.85,
      });

      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
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
      <CustomCursor active={loaded} />

      <div ref={rootRef} className={loaded ? "site-visible" : "site-hidden"}>
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

            <button
              type="button"
              className="mobile-menu-btn"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>

            <nav className="nav-pill-group" aria-label="Primary">
              <a href="#projects" className="nav-link nav-link--active">
                <NavIconWork /> work
              </a>
              <a
                href="https://sergioatelier.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <NavIconPlay /> play
              </a>
              <a
                href="mailto:hello@sergioatelier.co?subject=Resume%20request"
                className="nav-link"
              >
                <NavIconResume /> résumé
              </a>
              <a href="#hero" className="nav-link">
                <NavIconStory /> story
              </a>
            </nav>
          </div>
        </header>

        {menuOpen && (
          <div className="mobile-menu-overlay" role="dialog" aria-modal="true">
            <button
              type="button"
              className="mobile-menu-btn mobile-menu-btn--close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
            {[
              { label: "work", href: "#projects" },
              { label: "play", href: "https://sergioatelier.co/" },
              { label: "résumé", href: "mailto:hello@sergioatelier.co?subject=Resume%20request" },
              { label: "story", href: "#hero" },
            ].map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className="mobile-menu-overlay__link mobile-menu-item"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

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

            <div className="scroll-cue">
              <span className="scroll-cue__text">scroll to see work</span>
              <div className="scroll-cue__mouse" />
            </div>
          </section>

          <section id="projects" className="work-section">
            <header className="work-section__header fade-up">
              <p className="work-section__eyebrow">Selected work</p>
              <h2 className="work-section__title">Projects with clarity, craft, and care.</h2>
              <p className="work-section__lead">
                Brand systems, products, and automations for teams who want work that feels human
                and holds up in the real world.
              </p>
            </header>

            <div className="work-grid">
              {PROJECTS.slice(0, 3).map((project) => (
                <WorkCard key={project.slug} project={project} />
              ))}

              <div className="work-callout fade-up">
                <p className="work-callout__eyebrow">In progress</p>
                <p className="work-callout__text">
                  I&apos;m supporting founders in building design-first products. Case studies coming
                  soon.
                </p>
              </div>

              {PROJECTS.slice(3).map((project) => (
                <WorkCard key={project.slug} project={project} />
              ))}
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
    </>
  );
}
