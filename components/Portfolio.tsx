"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AssetPlaceholder from "@/components/AssetPlaceholder";
import {
  HERO_TABS,
  HERO_COPY,
  PROJECTS,
  type Project,
} from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function ProjectCard({ project }: { project: Project }) {
  const folder = (
    <div
      className="project-card__folder"
      style={{
        background: project.theme.bg,
        boxShadow: project.theme.insetShadow,
      }}
    >
      {project.tags.map((tag) => (
        <span
          key={tag.label}
          className="tag-pill"
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

      <div className="project-card__screenshot">
        <AssetPlaceholder project={project} />
      </div>

      <div
        className="project-card__tab"
        style={{ background: project.theme.tagBg }}
      />
    </div>
  );

  if (project.href && !project.comingSoon) {
    return (
      <a
        className="project-card"
        href={project.href}
        target={project.href.startsWith("http") ? "_blank" : undefined}
        rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {folder}
      </a>
    );
  }

  return <div className="project-card">{folder}</div>;
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
  const [activeTab, setActiveTab] = useState<(typeof HERO_TABS)[number]["id"]>("who");
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".hero-tab", {
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(1.2)",
        delay: 0.15,
      });

      gsap.from(".hero-headline", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(".hero-sticker", {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.5,
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
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      {/* ─── NAV ─── */}
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
              <a href="https://sergioatelier.co/" target="_blank" rel="noopener noreferrer" className="nav-link">
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
          <a href="#projects" className="mobile-menu-overlay__link" onClick={() => setMenuOpen(false)}>
            work
          </a>
          <a href="https://sergioatelier.co/" className="mobile-menu-overlay__link" onClick={() => setMenuOpen(false)}>
            studio
          </a>
          <a href="#contact" className="mobile-menu-overlay__link" onClick={() => setMenuOpen(false)}>
            contact
          </a>
          <a href="mailto:hello@sergioatelier.co" className="mobile-menu-overlay__link" onClick={() => setMenuOpen(false)}>
            email
          </a>
        </div>
      )}

      <main>
        {/* ─── HERO ─── */}
        <section id="hero" className="hero">
          {/* Sticker placeholders — swap for PNGs */}
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
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <h1 className="hero-headline">{HERO_COPY[activeTab]}</h1>

          <div className="scroll-cue">
            <span className="scroll-cue__text">scroll to see work</span>
            <div className="scroll-cue__arrow" />
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section id="projects" className="projects">
          {PROJECTS.slice(0, 3).map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}

          <div className="coming-soon-block">
            <p className="coming-soon-block__text">more work coming soon</p>
            <p className="coming-soon-block__sub">
              I&apos;m supporting founders in building design-first products — case studies on the way.
            </p>
          </div>

          {PROJECTS.slice(3).map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </section>

        {/* ─── FOOTER ─── */}
        <footer id="contact" className="footer">
          <div className="footer__logo-wrap">
            <span className="footer__wordmark">Sergio Piñeros</span>
          </div>

          <p className="footer__body">
            Brand & visual designer bridging craft and systems thinking. English & Spanish.
            Open to visual and brand design roles at AI infrastructure companies — remote worldwide.
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
            Sergio Piñeros © {new Date().getFullYear()} · Brand · Product · Systems · All rights reserved ✦
          </p>
        </footer>
      </main>
    </div>
  );
}
