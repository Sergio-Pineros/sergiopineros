"use client";

import { useRef, useState, useCallback, useLayoutEffect } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AssetPlaceholder from "@/components/AssetPlaceholder";
import ScreenLoader from "@/components/ScreenLoader";
import CustomCursor from "@/components/CustomCursor";
import {
  NavIconPlay,
  NavIconResume,
  NavIconStory,
  NavIconWork,
} from "@/components/NavIcons";
import { getHoverConfig, tagToPosition, type TagPosition } from "@/lib/animations";
import { HERO_TABS, HERO_PANELS, PROJECTS, type Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function applyTagPosition(
  tag: HTMLElement,
  pos: TagPosition,
  options: { duration: number; delay?: number; ease: string }
) {
  const vars: gsap.TweenVars = {
    top: pos.top,
    rotation: pos.rotation,
    duration: options.duration,
    delay: options.delay ?? 0,
    ease: options.ease,
    overwrite: "auto",
    force3D: true,
  };

  if (pos.left !== undefined) {
    vars.left = pos.left;
    vars.right = "auto";
  } else if (pos.right !== undefined) {
    vars.right = pos.right;
    vars.left = "auto";
  }

  gsap.to(tag, vars);
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    tagRefs.current.forEach((tag, i) => {
      const initial = project.tags[i];
      if (!tag || !initial) return;
      gsap.set(tag, {
        rotation: initial.rotation,
        transformOrigin: "50% 50%",
        force3D: true,
      });
    });
  }, [project]);

  const hoverIn = useCallback(() => {
    const cfg = getHoverConfig(project);

    gsap.to(screenshotRef.current, {
      width: cfg.screenshot.width,
      top: cfg.screenshot.top,
      duration: 0.68,
      ease: "power3.inOut",
      overwrite: "auto",
    });

    gsap.to(tabRef.current, {
      height: cfg.tabHeight,
      duration: 0.68,
      ease: "power3.inOut",
      overwrite: "auto",
    });

    tagRefs.current.forEach((tag, i) => {
      const target = cfg.tags[i];
      if (!tag || !target) return;
      applyTagPosition(tag, target, {
        duration: 0.72,
        delay: i * 0.04,
        ease: "power2.out",
      });
    });
  }, [project]);

  const hoverOut = useCallback(() => {
    gsap.to(screenshotRef.current, {
      width: "50%",
      top: "126px",
      duration: 0.58,
      ease: "power3.inOut",
      overwrite: "auto",
    });

    gsap.to(tabRef.current, {
      height: "70%",
      duration: 0.58,
      ease: "power3.inOut",
      overwrite: "auto",
    });

    tagRefs.current.forEach((tag, i) => {
      const initial = project.tags[i];
      if (!tag || !initial) return;
      applyTagPosition(tag, tagToPosition(initial), {
        duration: 0.58,
        delay: i * 0.025,
        ease: "power2.inOut",
      });
    });
  }, [project]);

  const folder = (
    <div
      ref={folderRef}
      className="project-card__folder"
      style={{
        background: project.theme.bg,
        boxShadow: project.theme.insetShadow,
      }}
    >
      {project.tags.map((tag, i) => (
        <span
          key={tag.label}
          ref={(el) => {
            tagRefs.current[i] = el;
          }}
          className="tag-pill"
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            background: project.theme.tagBg,
            borderColor: project.theme.tagBorder,
          }}
        >
          {tag.label}
        </span>
      ))}

      <div ref={screenshotRef} className="project-card__screenshot">
        <AssetPlaceholder project={project} />
      </div>

      <div ref={tabRef} className="project-card__tab" />
    </div>
  );

  const handlers = {
    onMouseEnter: hoverIn,
    onMouseLeave: hoverOut,
    onFocus: hoverIn,
    onBlur: hoverOut,
  };

  if (project.href && !project.comingSoon) {
    return (
      <a
        ref={cardRef as React.RefObject<HTMLAnchorElement>}
        className="project-card"
        href={project.href}
        target={project.href.startsWith("http") ? "_blank" : undefined}
        rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...handlers}
      >
        {folder}
      </a>
    );
  }

  return (
    <div ref={cardRef as React.RefObject<HTMLDivElement>} className="project-card" {...handlers}>
      {folder}
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <article
      id={project.slug}
      className={`project-row ${project.reverse ? "project-row--reverse" : ""}`}
    >
      <div className="project-row__card-col">
        <ProjectCard project={project} />
      </div>
      <div className="project-row__text-col fade-up">
        <p className="project-description">{project.description}</p>
        <p className="project-tags-line">{project.tagsLine}</p>
      </div>
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
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
        gsap.from(row.querySelector(".project-card"), {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".coming-soon-block__text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".coming-soon-block",
          start: "top 80%",
        },
      });

      gsap.from(".footer__wordmark", {
        y: 20,
        opacity: 0,
        duration: 0.8,
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
            <a href="#hero" className="nav-logo">
              serg
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

          <section id="projects" className="projects">
            {PROJECTS.slice(0, 3).map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}

            <div className="coming-soon-block">
              <p className="coming-soon-block__text">
                I&apos;m supporting founders in building design-first products. Case studies coming
                soon.
              </p>
            </div>

            {PROJECTS.slice(3).map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </section>

          <footer id="contact" className="footer">
            <div className="footer__hero">
              <div className="footer__logo-wrap">
                <span className="footer__wordmark">Sergio Piñeros</span>
              </div>

              <div className="footer__actions">
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
              </div>
            </div>

            <p className="footer__body">
              hey there, thanks for stopping by.
              <br />
              i build brand systems, product experiences, and the automations behind them.
              <br />
              if you&apos;re building something ambitious, let&apos;s talk.
            </p>

            <p className="footer__copy">
              © Sergio Piñeros {new Date().getFullYear()}.
              <br />
              All rights &amp; wrongs reserved ✦ human-directed work ✦ created between Colombia and
              the internet
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
