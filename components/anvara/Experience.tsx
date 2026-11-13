"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MotionConfig, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Scene from "./Scene";
import { ExplorationProvider } from "./State";
import { DecisionSpace, Roadmap } from "./DecisionSpace";
import Journey from "./Journey";
import MatchLab from "./MatchLab";
import Measurement from "./Measurement";
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
          <div>
            <p className="av-kicker">
              TWO SIDES OF THE MARKETPLACE
            </p>
            <h2>
              Two perspectives.
              <br />
              <span>One marketplace.</span>
            </h2>
          </div>
          <p>
            Making the connection
            <br />
            is only the beginning.
          </p>
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
          <p>
            <strong>Starting from what exists.</strong> Anvara publicly
            describes AI matching, end-to-end deal execution and performance
            reporting. I’m exploring how those experiences might help brands understand a match and help both sides get to a useful first conversation.
          </p>
          <a
            href="https://www.anvara.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Public product reference <ArrowUpRight size={13} />
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
      </motion.div>
      <div className="av-hero-spatial">
        <Scene variant="hero" />
      </div>
      <div className="av-hero-bottom">
        <span>
          FROM OPPORTUNITY
          <br />
          TO OUTCOME
        </span>
        <a href="#marketplace">
          Explore the case study <ArrowDown size={15} />
        </a>
        <span>
          INDEPENDENT THINKING.
          <br />A WORKING EXPLORATION.
        </span>
      </div>
      <span className="av-hero-caption">
        Conceptual matching visualization, not Anvara’s algorithm.
      </span>
    </section>
  );
}
function Background() {
  return (
    <section className="av-section av-background">
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
              text: "Helped shape customer-facing booking and operational workflows, including a bilingual AI voice concierge pilot. Now exploring voice-first business software.",
            },
            {
              name: "Fofo Labs",
              tag: "CONNECT WORK TO OUTCOMES",
              text: "Founded a marketing and creative services business, coordinated a small team and worked on measurable customer-facing campaigns.",
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
        <p className="av-kicker">FROM OPPORTUNITY TO OUTCOME</p>
        <h2>
          Great products make
          <br />
          complex things feel <span>simple.</span>
        </h2>
        <p>I’d love to help build what comes next.</p>
        <a
          className="av-button av-button-dark"
          href="mailto:s.dpineros@gmail.com"
        >
          Let’s talk <ArrowUpRight size={17} />
        </a>
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
            LinkedIn <ArrowUpRight size={13} />
          </a>
          <Link href="/">
            Portfolio <ArrowUpRight size={13} />
          </Link>
          <a href="mailto:s.dpineros@gmail.com">
            Email <ArrowUpRight size={13} />
          </a>
        </div>
        <div className="av-colophon">
          <span>
            Independent product exploration. Not affiliated with or endorsed by
            Anvara.
          </span>
          <span>Public references reviewed November 13, 2026.</span>
        </div>
        <details className="av-method-note">
          <summary>Sources & limits of this exploration</summary>
          <p>
            Based on Anvara’s{" "}
            <a
              href="https://www.anvara.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              public product site
            </a>{" "}
            and{" "}
            <a
              href="https://www.anvara.com/careers/product-manager"
              target="_blank"
              rel="noopener noreferrer"
            >
              Product Manager role
            </a>
            . No access to the production app, internal analytics, proprietary
            matching logic or customer research. All prioritization scores are
            illustrative assumptions. All sponsorship inventory and prototype
            outcomes are fictional. Proposed experiments have not been tested.
            Built as an independent, AI-assisted frontend exploration by Sergio
            Piñeros.
          </p>
        </details>
      </div>
    </footer>
  );
}
export default function Experience() {
  const page = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [menu, setMenu] = useState(false);
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
          <a className="av-skip" href="#decisions">
            Skip to the decision space
          </a>
          <motion.div
            className="av-reading-progress"
            style={{ scaleX: scrollYProgress }}
          />
          <header className="av-nav">
            <div className="av-nav-lockup">
              <Link href="/" aria-label="Sergio Piñeros portfolio">
                SP<span>®</span>
              </Link>
              <span className="av-nav-divider" />
              <a href="#av-title" className="av-anvara-wordmark">
                anvara<span>exploration</span>
              </a>
            </div>
            <nav
              className={menu ? "is-open" : ""}
              aria-label="Case study navigation"
            >
              {[
                { href: "#marketplace", text: "The system" },
                { href: "#decisions", text: "Decisions" },
                { href: "#journey", text: "Journey" },
                { href: "#prototype", text: "Try the prototype" },
                { href: "#roadmap", text: "Roadmap" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenu(false)}
                >
                  {item.text}
                  {item.href === "#prototype" && <ArrowUpRight size={12} />}
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
            <a className="av-nav-contact" href="mailto:s.dpineros@gmail.com">
              Let’s talk <ArrowUpRight size={13} />
            </a>
          </header>
          <main>
            <Hero />
            <Perspectives />
            <DecisionSpace />
            <Journey />
            <MatchLab />
            <Measurement />
            <Roadmap />
            <Background />
          </main>
          <Closing />
          <a className="av-quick-prototype" href="#prototype">
            Try the working prototype <ArrowRight size={13} />
          </a>
        </div>
      </ExplorationProvider>
    </MotionConfig>
  );
}
