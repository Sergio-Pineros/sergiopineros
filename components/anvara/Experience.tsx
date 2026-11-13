"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MotionConfig, motion, useScroll, useTransform } from "motion/react";
import { Check, Mail, Globe } from "lucide-react";
import Scene from "./Scene";
import { LinkedInIcon } from "@/components/SocialIcons";
import { ExplorationProvider } from "./State";
import { DecisionSpace, Roadmap } from "./DecisionSpace";
import Journey from "./Journey";
import MatchLab from "./MatchLab";
import Measurement from "./Measurement";
import Guide from "./Guide";
function Perspectives() {
  const [side, setSide] = useState<"brand" | "rightsholder">("brand");
  const brands = side === "brand";
  return (
    <section
      id="marketplace"
      className={`av-section av-perspectives ${brands ? "is-brand" : "is-rightsholder"}`}
    >
      <div className="av-wrap">
        <div className="av-section-intro">
          <h2>Two sides of the marketplace.</h2>
        </div>
        <div className="av-perspective-layout">
          <div className="av-perspective-copy">
            <div className="av-toggle">
              <button aria-pressed={brands} onClick={() => setSide("brand")}>
                For brands
              </button>
              <button
                aria-pressed={!brands}
                onClick={() => setSide("rightsholder")}
              >
                For rightsholders
              </button>
            </div>
            <p className="av-perspective-question">
              {brands
                ? "“Is this the right place for our brand?”"
                : "“Is this the right partner for our property?”"}
            </p>
            <ul>
              {(brands
                ? [
                    "Find relevant audiences",
                    "Evaluate and compare opportunities",
                    "Work within a real budget",
                    "Understand campaign outcomes",
                  ]
                : [
                    "Present inventory and communicate value",
                    "Reach qualified brands",
                    "Coordinate clear agreements",
                    "Deliver a successful activation",
                  ]
              ).map((s) => (
                <li key={s}>
                  <Check size={14} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="av-shared-system">
            <div className="av-participant-node av-brand-node">
              <span>BRAND</span>
              <strong>{brands ? "Intent" : "Clarity"}</strong>
            </div>
            <svg viewBox="0 0 600 240" aria-hidden="true">
              <defs>
                <linearGradient id="shared-gradient">
                  <stop stopColor="#2369e8" />
                  <stop offset="1" stopColor="#6439cf" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3, 4].map((i) => (
                <path
                  key={i}
                  d={`M80 120 C230 ${35 + i * 40} 370 ${205 - i * 40} 520 120`}
                  stroke="url(#shared-gradient)"
                  strokeWidth={i === 2 ? 2 : 1}
                  opacity={i === 2 ? 0.7 : 0.2}
                  fill="none"
                />
              ))}
              <circle cx="300" cy="120" r="38" fill="#fff" stroke="#e0e1f2" />
              <circle cx="300" cy="120" r="6" fill="url(#shared-gradient)" />
            </svg>
            <div className="av-participant-node av-rightsholder-node">
              <span>RIGHTSHOLDER</span>
              <strong>{brands ? "Context" : "Value"}</strong>
            </div>
            <div className="av-shared-caption">
              <span>THE SHARED OUTCOME</span>
              <strong>A partnership that works for both sides.</strong>
              <p>
                Brands need enough information to choose.
                <br />
                Rightsholders need inquiries worth responding to.
              </p>
            </div>
          </div>
        </div>
        <div className="av-marketplace-insight">
          <span>THE PRODUCT QUESTION</span>
          <p>
            How can we help both sides find the right fit <br />
            and <strong>move from interest to a deal?</strong>
          </p>
        </div>
        <div className="av-source-note">
          <a
            href="https://www.anvara.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Public product reference
          </a>
        </div>
      </div>
    </section>
  );
}
function Hero() {
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: hero,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  return (
    <section className="av-hero" ref={hero} aria-labelledby="av-title">
      <div className="av-hero-orbit" aria-hidden="true" />
      <motion.div className="av-hero-copy" style={{ y }}>
        <p className="av-kicker">
          ANVARA / PRODUCT EXPLORATION / SERGIO PIÑEROS
        </p>
        <h1 id="av-title">
          Every opportunity
          <br />
          deserves to be <span>found.</span>
        </h1>
        <p className="av-hero-lead">
          A look at how Anvara could help brands and rightsholders
          <br className="av-desktop-break" /> find the right fit and move a partnership forward.
        </p>
        <Guide />
      </motion.div>
      <div className="av-hero-spatial">
        <Scene variant="hero" />
      </div>
    </section>
  );
}
function Background() {
  return (
    <section id="about-sergio" className="av-section av-background">
      <div className="av-wrap">
        <p className="av-kicker">WHY THIS SPACE IS PERSONAL</p>
        <h2>
          I’ve seen what happens
          <br />
          <span>between the idea and the deal.</span>
        </h2>
        <div className="av-background-intro">
          <span className="av-personal-signature">Sergio Piñeros</span>
          <p>
            I’ve worked with artists, event organizers and small businesses. I know that making an introduction is only the first step: people still need to agree on the details and make the idea happen.
          </p>
        </div>
        <div className="av-experience-thread">
          {[
            {
              name: "17 Bits Records",
              tag: "UNDERSTAND THE PEOPLE",
              text: "Co-founded an independent record label and worked with artists and collaborators on concerts and cultural projects.",
            },
            {
              name: "MusicConnect",
              tag: "EXPLORE THE MARKETPLACE",
              text: "Explored a marketplace for musicians and event organizers to find each other. It did not commercially launch.",
            },
            {
              name: "SAVRON / NxtSeat",
              tag: "BUILD THE WORKFLOW",
              text: "Helped shape booking and operational workflows, including a bilingual AI voice concierge pilot. NxtSeat is exploring voice-first business software with a marketplace planned for the future.",
            },
            {
              name: "Fofo Labs",
              tag: "CONNECT WORK TO OUTCOMES",
              text: "Founded a marketing and creative services business, led a small team and helped host hackathons and dinners for our client La Estancia.",
            },
          ].map((p) => (
            <article key={p.name}>
              <div>
                <small>{p.tag}</small>
                <h3>{p.name}</h3>
              </div>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
        <div className="av-campaign-proof">
          <div>
            <strong>≈540k</strong>
            <span>TikTok views</span>
          </div>
          <div>
            <strong>1,200+</strong>
            <span>new followers</span>
          </div>
          <p>
            La Estancia / first campaign month.
            <br />
            <span>
              Campaign marketing results, not product usage or retention
              metrics.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
function Closing() {
  return (
    <footer className="av-closing">
      <div className="av-closing-scene">
        <Scene variant="closing" />
      </div>
      <div className="av-wrap av-closing-copy">
        <h2>
          Great products make
          <br />
          complex things feel <span>simple.</span>
        </h2>
        <p>I’m ready to build what comes next with you.</p>
        <div className="av-final-signature">
          <strong>Sergio Piñeros</strong>
          <span>Founder / Product Builder</span>
        </div>
        <div className="av-footer-links">
          <a
            href="https://www.linkedin.com/in/sergio-pineros-c/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon size={18} /> LinkedIn
          </a>
          <Link href="/">
            <Globe size={18} aria-hidden="true" /> Portfolio
          </Link>
          <a href="mailto:s.dpineros@gmail.com">
            <Mail size={18} aria-hidden="true" /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}
export default function Experience() {
  const page = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [menu, setMenu] = useState(false);
  const [compactNav, setCompactNav] = useState(false);
  useEffect(() => {
    const update = () => {
      const hero = document.querySelector<HTMLElement>(".av-hero");
      if (hero) setCompactNav(hero.getBoundingClientRect().bottom <= 90);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  useEffect(() => {
    const showLinkedSection = () => {
      const section = window.location.hash.slice(1);
      if (!["decisions", "journey", "measurement", "roadmap"].includes(section)) return;
      const details = document.querySelector<HTMLDetailsElement>("#deeper-exploration");
      if (details && !details.open) {
        details.open = true;
        requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView());
      }
    };
    showLinkedSection();
    window.addEventListener("hashchange", showLinkedSection);
    return () => window.removeEventListener("hashchange", showLinkedSection);
  }, []);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let revert: (() => void) | undefined;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".av-section-intro").forEach((el) =>
            gsap.fromTo(
              el,
              { y: 24 },
              {
                y: 0,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              },
            ),
          );
        }, page);
        revert = () => context.revert();
      },
    );
    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <ExplorationProvider>
        <div className="av-page" ref={page}>
          <a className="av-skip" href="#prototype">
            Skip to the prototype
          </a>
          <motion.div
            className="av-reading-progress"
            style={{ scaleX: scrollYProgress }}
          />
          <header className="av-nav">
            <div className={`av-nav-lockup ${compactNav ? "is-compact" : ""}`}>
              <Link href="/" aria-label="Sergio Piñeros portfolio" className="av-sergio-logo">
                <Image src={compactNav ? "/icon.svg" : "/horizontal.svg"} alt="" width={104} height={40} unoptimized />
              </Link>
              <span className="av-nav-divider" />
              <a href="#av-title" className="av-anvara-wordmark" aria-label="Anvara exploration">
                <span className="av-anvara-icon"><Image src="https://framerusercontent.com/assets/fB4H5emI4EbXPc5yoCie0UEN2T4.svg" alt="" width={96} height={60} unoptimized /></span>
                {!compactNav && <span className="av-anvara-name">anvara<span>exploration</span></span>}
              </a>
            </div>
            <nav
              className={menu ? "is-open" : ""}
              aria-label="Case study navigation"
            >
              {[
                { href: "#marketplace", text: "The system" },
                { href: "#prototype", text: "Try the prototype" },
                { href: "#about-sergio", text: "About Sergio" },
                { href: "#deeper-exploration", text: "Explore more" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenu(false)}
                >
                  {item.text}
                </a>
              ))}
            </nav>
            <button
              className="av-mobile-menu"
              aria-expanded={menu}
              aria-label="Toggle navigation"
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? "Close" : "Explore"}
              <span>{menu ? "−" : "+"}</span>
            </button>
          </header>
          <main>
            <Hero />
            <Perspectives />
            <MatchLab />
            <Background />
            <details id="deeper-exploration" className="av-deeper-exploration">
              <summary>
                <span><small>CURIOUS TO GO DEEPER?</small><strong>Explore the product thinking.</strong><em>The journey, decision space, measurement and roadmap.</em></span>
                <span className="av-deeper-plus" aria-hidden="true">+</span>
              </summary>
              <Journey />
              <DecisionSpace />
              <Measurement />
              <Roadmap />
            </details>
          </main>
          <Closing />
          <a className="av-quick-prototype" href="#prototype">
            Try the working prototype
          </a>
        </div>
      </ExplorationProvider>
    </MotionConfig>
  );
}
