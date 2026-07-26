"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AssetPlaceholder from "@/components/AssetPlaceholder";
import ScreenLoader from "@/components/ScreenLoader";
import CustomCursor from "@/components/CustomCursor";
import { getHoverConfig } from "@/lib/animations";
import { HERO_TABS, HERO_HEADLINE, PROJECTS, type Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const hoverIn = useCallback(() => {
    const cfg = getHoverConfig(project);
    const tl = gsap.timeline({ defaults: { duration: 0.55, ease: "power3.out" } });

    if (screenshotRef.current) {
      tl.to(screenshotRef.current, { width: cfg.screenshot.width, top: cfg.screenshot.top }, 0);
    }
    if (tabRef.current) {
      tl.to(tabRef.current, { height: cfg.tabHeight }, 0);
    }

    tagRefs.current.forEach((tag, i) => {
      const target = cfg.tags[i];
      if (!tag || !target) return;
      tl.to(
        tag,
        {
          top: target.top,
          left: target.left ?? "auto",
          right: target.right ?? "auto",
          rotation: target.rotation ?? parseFloat(tag.dataset.rotation || "0"),
        },
        0
      );
    });
  }, [project]);

  const hoverOut = useCallback(() => {
    gsap.to([screenshotRef.current, tabRef.current, ...tagRefs.current.filter(Boolean)], {
      clearProps: "top,left,right,width,height,rotation",
      duration: 0.45,
      ease: "power2.inOut",
    });
  }, []);

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
          data-rotation={tag.rotation}
          style={{
            top: tag.top,
            left: tag.left,
            right: tag.right,
            transform: `rotate(${tag.rotation}deg)`,
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

      <div
        ref={tabRef}
        className="project-card__tab"
        style={{ background: project.theme.tagBg }}
      />
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
        <p className="project-tags-line">{project.tagsLine.replace(/ ∙ /g, " · ")}</p>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [activeTab, setActiveTab] = useState<(typeof HERO_TABS)[number]["id"]>("who");
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const handleLoaderComplete = useCallback(() => setLoaded(true), []);

  const handleTabClick = (id: (typeof HERO_TABS)[number]["id"]) => {
    setActiveTab(id);
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
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
        delay: 0.1,
      });

      gsap.from(".hero-tab", {
        opacity: 0.001,
        y: 8,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(1.2)",
        delay: 0.2,
      });

      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.35,
      });

      gsap.from(".hero-sticker", {
        opacity: 0.001,
        scale: 0.92,
        duration: 2,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.45,
      });

      gsap.from(".scroll-cue", {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.9,
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
          <div className="site-nav__inner">
            <div className="nav-pill-group">
              <a href="#hero" className="nav-link">
                Sergio Piñeros
              </a>

              <button
                type="button"
                className="mobile-menu-btn"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
              >
                ☰
              </button>

              <div className="nav-links-desktop">
                <a
                  href="https://sergioatelier.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  studio
                </a>
                <a href="#contact" className="nav-link">
                  contact
                </a>
                <a href="#projects" className="nav-link nav-link--active">
                  work
                </a>
              </div>
            </div>
          </div>
        </header>

        {menuOpen && (
          <div className="mobile-menu-overlay" role="dialog" aria-modal="true">
            <button
              type="button"
              className="mobile-menu-btn"
              style={{ position: "absolute", top: 16, right: 16 }}
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
            {["work", "studio", "contact", "email"].map((item, i) => (
              <a
                key={item}
                href={
                  item === "work"
                    ? "#projects"
                    : item === "studio"
                      ? "https://sergioatelier.co/"
                      : item === "contact"
                        ? "#contact"
                        : "mailto:hello@sergioatelier.co"
                }
                className="mobile-menu-overlay__link mobile-menu-item"
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}

        <main>
          <section id="hero" ref={heroRef} className="hero">
            <div className="hero-sticker hero-sticker--1">
              <div className="sticker-placeholder">
                <span className="sticker-placeholder__text">Sticker 1</span>
              </div>
            </div>
            <div className="hero-sticker hero-sticker--2">
              <div className="sticker-placeholder">
                <span className="sticker-placeholder__text">Sticker 2</span>
              </div>
            </div>
            <div className="hero-sticker hero-sticker--3">
              <div className="sticker-placeholder">
                <span className="sticker-placeholder__text">Sticker 3</span>
              </div>
            </div>
            <div className="hero-sticker hero-sticker--4">
              <div className="sticker-placeholder">
                <span className="sticker-placeholder__text">Sticker 4</span>
              </div>
            </div>

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

            <h1 ref={headlineRef} className="hero-headline">
              <span className="hero-headline__line">{HERO_HEADLINE.line1} </span>
              <span className="hero-headline__accent">{HERO_HEADLINE.accent1}</span>
              <span className="hero-headline__line"> {HERO_HEADLINE.line2} </span>
              <span className="hero-headline__accent">{HERO_HEADLINE.accent2}</span>
            </h1>

            <div className="scroll-cue">
              <span className="scroll-cue__text">scroll to see work</span>
              <div className="scroll-cue__arrow" />
            </div>
          </section>

          <section id="projects" className="projects">
            {PROJECTS.slice(0, 3).map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}

            <div className="coming-soon-block">
              <p className="coming-soon-block__text">more work coming soon</p>
              <p className="coming-soon-block__sub">
                I&apos;m supporting founders in building design-first products — case studies on the
                way.
              </p>
            </div>

            {PROJECTS.slice(3).map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </section>

          <footer id="contact" className="footer">
            <div className="footer__logo-wrap">
              <span className="footer__wordmark">Sergio Piñeros</span>
            </div>

            <p className="footer__body">
              Brand & visual designer bridging craft and systems thinking. English & Spanish. Open
              to visual and brand design roles at AI infrastructure companies — remote worldwide.
            </p>

            <div className="footer__actions">
              <a href="mailto:hello@sergioatelier.co" className="footer__pill">
                email
              </a>
              <a
                href="https://sergioatelier.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__pill"
              >
                studio
              </a>
              <a href="#projects" className="footer__pill">
                work
              </a>
            </div>

            <p className="footer__copy">
              Sergio Piñeros © {new Date().getFullYear()} · Brand · Product · Systems · All rights
              reserved ✦
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
