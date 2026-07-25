"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SKILLS = [
  "Brand & Visual Design",
  "Product UX",
  "AI Agents & Automations",
  "E-commerce Growth",
  "Newsletter & Content",
  "ICP Research",
];

const CRM_FEATURES = [
  {
    title: "Live Operations",
    desc: "Real-time host dashboard with status tracking — Waiting, Confirmed, Done, No-Show, Cancelled — and an interactive barber time-slot grid with drag-to-move scheduling.",
    tag: "Schedule",
  },
  {
    title: "Staff & Clients",
    desc: "Barber profiles with shift management, GCAL sync, commission tracking. Client database with booking history, notes, and attendance patterns.",
    tag: "Database",
  },
  {
    title: "Digital Passes",
    desc: "Apple Wallet & Google Wallet ePass integration for scan-in check-ins. Membership tiers with recurring perks and subscription management.",
    tag: "Wallet",
  },
  {
    title: "Communications",
    desc: "Automated SMS and email confirmations, booking updates, and appointment reminders — reducing no-shows and keeping the shop in rhythm.",
    tag: "Outreach",
  },
  {
    title: "Analytics",
    desc: "Revenue metrics, daily performance tracking, and service menu configuration — from Signature Cut to The Executive.",
    tag: "Dashboard",
  },
];

export default function Portfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroMeshRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);

  const handleMagneticMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const btn = magneticRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: "power2.out" });
    },
    []
  );

  const handleMagneticLeave = useCallback(() => {
    const btn = magneticRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }, []);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // Ambient hero mesh
      if (heroMeshRef.current) {
        gsap.to(heroMeshRef.current, {
          backgroundPosition: "100% 50%",
          duration: 18,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }

      // Hero reveal
      gsap.from(".hero-reveal", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      });

      // Section fade-ups
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Stagger groups
      gsap.utils.toArray<HTMLElement>(".stagger-group").forEach((group) => {
        const items = group.querySelectorAll(".stagger-item");
        gsap.from(items, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Parallax shapes
      gsap.utils.toArray<HTMLElement>(".parallax-shape").forEach((shape) => {
        const speed = parseFloat(shape.dataset.speed || "0.3");
        gsap.to(shape, {
          y: () => speed * 120,
          ease: "none",
          scrollTrigger: {
            trigger: shape.closest("section") || shape,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // SAVRON section pin + scale
      ScrollTrigger.create({
        trigger: "#savron",
        start: "top 20%",
        end: "bottom 60%",
        onEnter: () => gsap.to("#savron .brand-accent", { scale: 1, opacity: 1, duration: 0.8 }),
        onLeaveBack: () => gsap.to("#savron .brand-accent", { scale: 0.95, opacity: 0.6, duration: 0.5 }),
      });

      // Grafti color shift (opacity overlay via CSS variable)
      gsap.to("#grafti", {
        "--section-tint": "0.04",
        ease: "none",
        scrollTrigger: {
          trigger: "#grafti",
          start: "top 70%",
          end: "bottom 30%",
          scrub: true,
        },
      });

      // Sergio & Co bento reveal
      gsap.from(".bento-cell", {
        scale: 0.92,
        opacity: 0,
        duration: 0.7,
        stagger: { amount: 0.5, grid: [2, 3], from: "start" },
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#sergio-co",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // CRM horizontal scroll
      const crmSection = document.querySelector("#crm");
      const crmTrack = document.querySelector(".crm-horizontal-wrap");
      if (crmSection && crmTrack) {
        const trackWidth = () => (crmTrack as HTMLElement).scrollWidth - window.innerWidth;

        gsap.to(crmTrack, {
          x: () => -trackWidth(),
          ease: "none",
          scrollTrigger: {
            trigger: crmSection,
            start: "top top",
            end: () => `+=${trackWidth()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      // CRM UI cards float in
      gsap.from(".crm-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#crm",
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Section nav dots
      const sections = ["hero", "savron", "grafti", "sergio-co", "crm", "contact"];
      sections.forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => document.querySelector(`[data-nav="${id}"]`)?.classList.add("active"),
          onEnterBack: () => document.querySelector(`[data-nav="${id}"]`)?.classList.add("active"),
          onLeave: () => document.querySelector(`[data-nav="${id}"]`)?.classList.remove("active"),
          onLeaveBack: () => document.querySelector(`[data-nav="${id}"]`)?.classList.remove("active"),
        });
      });

      // Footer CTA
      gsap.from(".footer-cta", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <header className="fixed top-0 right-0 left-0 z-50 mix-blend-difference">
        <div className="grid-12 items-center py-6">
          <a
            href="#hero"
            className="col-span-6 text-xs font-medium tracking-[0.18em] uppercase text-[var(--color-ivory)] md:col-span-3"
          >
            Sergio Piñeros
          </a>
          <nav
            className="col-span-6 hidden justify-end gap-8 md:col-span-9 md:flex"
            aria-label="Primary"
          >
            {[
              { href: "#savron", label: "Work" },
              { href: "#crm", label: "Product" },
              { href: "#contact", label: "Contact" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--color-ivory)] opacity-70 transition-opacity hover:opacity-100"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Section navigation */}
      <nav
        className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 md:flex"
        aria-label="Section navigation"
      >
        {["hero", "savron", "grafti", "sergio-co", "crm", "contact"].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            data-nav={id}
            className="nav-dot"
            aria-label={`Go to ${id}`}
          />
        ))}
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="hero"
        className="relative flex min-h-[100dvh] items-end overflow-hidden pb-[var(--section-pad)]"
      >
        <div
          ref={heroMeshRef}
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 40%, color-mix(in srgb, var(--color-clay) 22%, transparent), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 20%, color-mix(in srgb, var(--color-charcoal) 8%, transparent), transparent 55%), radial-gradient(ellipse 60% 70% at 60% 80%, color-mix(in srgb, var(--color-clay) 12%, transparent), transparent 50%)",
            backgroundSize: "200% 200%",
            filter: "blur(40px)",
          }}
        />
        <div className="glass absolute right-[8%] top-[18%] h-48 w-48 rounded-full opacity-40" />
        <div className="glass absolute bottom-[25%] left-[5%] h-32 w-64 rounded-2xl opacity-30" />

        <div className="grid-12 relative z-10 w-full">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <p className="hero-reveal eyebrow mb-6">Founder & Creative Director</p>
            <h1 className="hero-reveal display-xl mb-8">
              Sergio
              <br />
              <em className="not-italic text-[color:var(--color-clay)]">Piñeros</em>
            </h1>
            <p className="hero-reveal body-lg col-span-6 max-w-xl">
              I design silent luxury — brand systems, product experiences, and AI-powered
              workflows that feel inevitable. Bridging visual craft with technical depth since
              2019.
            </p>
          </div>
          <div className="col-span-12 mt-16 flex flex-wrap gap-x-8 gap-y-3 md:col-span-10 md:col-start-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="hero-reveal text-xs font-medium tracking-[0.14em] uppercase opacity-50"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 opacity-40">
            <span className="text-[0.625rem] tracking-[0.2em] uppercase">Scroll</span>
            <div className="h-8 w-px bg-[var(--color-charcoal)]" />
          </div>
        </div>
      </section>

      {/* ─── SAVRON BRAND ─── */}
      <section id="savron" className="relative py-[var(--section-pad)]">
        <span className="section-label">01 — Savron</span>

        <div className="grid-12">
          <div className="fade-up col-span-12 mb-4 md:col-span-3">
            <p className="eyebrow">Brand Identity</p>
          </div>
          <div className="fade-up col-span-12 mb-12 md:col-span-8 md:col-start-5">
            <h2 className="display-lg mb-6">Savron</h2>
            <p className="body-lg max-w-2xl">
              A luxury barbershop brand built on restraint — where precision grooming meets
              editorial typography and warm, tactile materials. Every touchpoint, from signage to
              digital passes, speaks the same quiet confidence.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div
              className="parallax-shape brand-accent shape-block aspect-[4/5] w-full opacity-60"
              data-speed="0.4"
              style={{ transform: "scale(0.95)" }}
            />
          </div>
          <div className="col-span-12 flex flex-col justify-center gap-6 md:col-span-6 md:col-start-7">
            <div className="parallax-shape glass fade-up p-8" data-speed="0.2">
              <p className="eyebrow mb-3">Logo Mark</p>
              <div className="shape-block mx-auto aspect-square w-32" />
              <p className="mt-4 text-sm opacity-60">
                Monogram system with golden-ratio proportions
              </p>
            </div>
            <div className="stagger-group grid grid-cols-3 gap-3">
              {["Primary", "Secondary", "Accent"].map((label) => (
                <div key={label} className="stagger-item glass p-4 text-center">
                  <div
                    className="mx-auto mb-2 h-10 w-10 rounded-full"
                    style={{
                      background:
                        label === "Primary"
                          ? "var(--color-charcoal)"
                          : label === "Secondary"
                            ? "var(--color-clay)"
                            : "var(--color-ivory)",
                      border: label === "Accent" ? "1px solid var(--color-charcoal)" : "none",
                    }}
                  />
                  <span className="text-[0.625rem] tracking-wider uppercase opacity-50">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 mt-12 grid grid-cols-2 gap-[var(--grid-gap)] md:col-span-10 md:col-start-2 md:grid-cols-4">
            {["Business Cards", "Signage", "Menu Design", "Social Templates"].map((asset) => (
              <div key={asset} className="fade-up glass flex aspect-[3/4] flex-col justify-end p-5">
                <div className="shape-block mb-auto h-2/3 w-full" />
                <p className="mt-4 text-xs tracking-wide uppercase opacity-60">{asset}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GRAFTI BRAND ─── */}
      <section
        id="grafti"
        className="relative py-[var(--section-pad)]"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in srgb, var(--color-clay) 6%, var(--color-ivory)) 50%, transparent)",
        }}
      >
        <span className="section-label">02 — Grafti</span>

        <div className="grid-12">
          <div className="fade-up col-span-12 md:col-span-4 md:col-start-9 md:row-start-1">
            <p className="eyebrow text-right md:text-left">Agrotech Brand</p>
          </div>
          <div className="fade-up col-span-12 mb-8 md:col-span-6 md:col-start-1">
            <h2 className="display-lg">Grafti</h2>
          </div>
          <div className="fade-up col-span-12 mb-16 md:col-span-5 md:col-start-7">
            <p className="body-lg">
              An agrotech identity rooted in growth — asymmetrical layouts, organic geometry, and
              a palette that breathes. Logo systems, field-ready marketing assets, and digital
              presence designed for farmers who expect substance over spectacle.
            </p>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="parallax-shape shape-block aspect-[16/10] w-full" data-speed="0.35" />
          </div>
          <div className="col-span-12 flex flex-col gap-4 md:col-span-4 md:col-start-9 md:justify-center">
            <div className="fade-up glass p-6">
              <p className="eyebrow mb-4">Color System</p>
              <div className="flex gap-2">
                {[100, 70, 40, 15].map((op) => (
                  <div
                    key={op}
                    className="h-16 flex-1 rounded-sm"
                    style={{
                      background: `color-mix(in srgb, var(--color-clay) ${op}%, var(--color-ivory))`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="fade-up glass p-6">
              <p className="eyebrow mb-4">Typography</p>
              <p className="display-md">Aa</p>
              <p className="text-sm opacity-50">Geometric sans + humanist serif pairing</p>
            </div>
          </div>

          <div className="stagger-group col-span-12 mt-12 grid grid-cols-1 gap-4 md:col-span-10 md:col-start-2 md:grid-cols-3">
            {["Packaging", "Field Guides", "Digital Campaign"].map((item) => (
              <div key={item} className="stagger-item glass p-6">
                <div className="shape-circle mb-6 h-20 w-20" />
                <h3 className="mb-2 font-medium">{item}</h3>
                <p className="text-sm opacity-60">
                  Marketing collateral designed for clarity in any environment.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERGIO & CO ─── */}
      <section id="sergio-co" className="relative py-[var(--section-pad)]">
        <span className="section-label">03 — Studio</span>

        <div className="grid-12">
          <div className="fade-up col-span-12 mb-16 text-center md:col-span-8 md:col-start-3">
            <p className="eyebrow mb-4">Sergio & Co.</p>
            <h2 className="display-lg mb-6">The Atelier</h2>
            <p className="body-lg mx-auto max-w-xl">
              My studio practice — where brand direction, concept ideation, and systems thinking
              converge. Freelance since 2019, refining taste through every client engagement.
            </p>
          </div>

          <div className="col-span-12 grid grid-cols-2 gap-[var(--grid-gap)] md:col-span-10 md:col-start-2 md:grid-cols-4 md:grid-rows-2">
            <div className="bento-cell glass col-span-2 row-span-2 flex flex-col justify-between md:col-span-2">
              <p className="eyebrow">Creative Direction</p>
              <div>
                <p className="display-md mb-2">Concept to Launch</p>
                <p className="text-sm opacity-60">
                  End-to-end brand systems — identity, voice, visual language, and rollout
                  strategy for premium clients.
                </p>
              </div>
            </div>
            <div className="bento-cell glass flex flex-col justify-between">
              <p className="eyebrow">Writing</p>
              <p className="text-sm opacity-70">
                Essays on creativity, philosophy, and the discipline of taste.
              </p>
            </div>
            <div className="bento-cell glass flex flex-col justify-between">
              <p className="eyebrow">Newsletters</p>
              <p className="text-sm opacity-70">
                Audience-building through intentional, high-signal content.
              </p>
            </div>
            <div className="bento-cell glass flex flex-col justify-between">
              <p className="eyebrow">Video & Photo</p>
              <p className="text-sm opacity-70">
                Recording and directing visual narratives for brands.
              </p>
            </div>
            <div className="bento-cell glass flex flex-col justify-between">
              <p className="eyebrow">ICP Research</p>
              <p className="text-sm opacity-70">
                Reading markets, identifying ideal customers, shaping offer architecture.
              </p>
            </div>
          </div>

          <div className="fade-up col-span-12 mt-12 text-center md:col-span-6 md:col-start-4">
            <a
              href="https://sergioatelier.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-[0.14em] uppercase underline underline-offset-4 opacity-60 transition-opacity hover:opacity-100"
            >
              sergioatelier.co →
            </a>
          </div>
        </div>
      </section>

      {/* ─── SAVRON CRM ─── */}
      <section id="crm" className="relative overflow-hidden">
        <span className="section-label">04 — Product</span>

        <div className="grid-12 py-[var(--section-pad)]">
          <div className="fade-up col-span-12 mb-4 md:col-span-3">
            <p className="eyebrow">Product Design</p>
          </div>
          <div className="fade-up col-span-12 mb-8 md:col-span-8 md:col-start-5">
            <h2 className="display-lg mb-6">Savron CRM</h2>
            <p className="body-lg max-w-2xl">
              From brand to platform — a full-stack management system for a luxury barbershop.
              I bridged visual identity with product logic: scheduling, client databases,
              digital wallet passes, and automated communications in one cohesive experience.
            </p>
          </div>
        </div>

        {/* UX decisions strip */}
        <div className="grid-12 mb-12">
          <div className="col-span-12 grid gap-4 md:col-span-10 md:col-start-2 md:grid-cols-3">
            {[
              {
                title: "Host-First Operations",
                desc: "The front desk is the nerve center. Every screen prioritizes speed — scan ePass, drag appointments, toggle day/week/month views without friction.",
              },
              {
                title: "Data as Design",
                desc: "Client attendance patterns, barber commission logic, and service runtimes aren't backend details — they're UX decisions that shape daily workflows.",
              },
              {
                title: "Automated Touchpoints",
                desc: "SMS confirmations, email reminders, and wallet pass updates run silently. Staff focus on craft; the system handles the rest.",
              },
            ].map((decision) => (
              <div key={decision.title} className="crm-card glass p-6">
                <p className="eyebrow mb-3">UX Decision</p>
                <h3 className="mb-3 font-medium">{decision.title}</h3>
                <p className="text-sm opacity-60">{decision.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal scroll feature panels */}
        <div className="crm-horizontal-wrap horizontal-track pb-[var(--section-pad)]">
          {CRM_FEATURES.map((feature, i) => (
            <div key={feature.title} className="crm-panel">
              <div className="glass flex h-full min-h-[420px] flex-col p-8">
                <div className="mb-auto">
                  <span className="eyebrow">{feature.tag}</span>
                  <span className="ml-4 text-xs opacity-30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="shape-block my-8 aspect-[16/10] w-full opacity-80" />
                <h3 className="display-md mb-3">{feature.title}</h3>
                <p className="text-sm leading-relaxed opacity-60">{feature.desc}</p>
              </div>
            </div>
          ))}

          {/* Schema visualization panel */}
          <div className="crm-panel">
            <div className="glass flex h-full min-h-[420px] flex-col p-8">
              <p className="eyebrow mb-6">System Architecture</p>
              <div className="flex flex-1 flex-col justify-center gap-3 font-mono text-xs">
                {[
                  "Clients ←→ Appointments ←→ Barbers",
                  "Services → Pricing → Commission",
                  "Membership → ePass → Wallet API",
                  "Communications → SMS / Email",
                  "Analytics → Dashboard → Revenue",
                ].map((line, idx) => (
                  <div key={line} className="flex items-center gap-3">
                    <span className="opacity-30">{String(idx + 1).padStart(2, "0")}</span>
                    <div className="shape-line flex-1" />
                    <span className="opacity-70">{line}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm opacity-50">
                Relational logic flows designed for operational clarity — not engineering
                complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER / CTA ─── */}
      <section id="contact" className="py-[var(--section-pad)]">
        <div className="grid-12">
          <div className="footer-cta col-span-12 text-center md:col-span-8 md:col-start-3">
            <p className="eyebrow mb-6">Open to Opportunities</p>
            <h2 className="display-lg mb-8">
              Let&apos;s build something
              <br />
              <em className="not-italic text-[color:var(--color-clay)]">remarkable.</em>
            </h2>
            <p className="body-lg mx-auto mb-12 max-w-lg">
              Visual & brand design roles at AI infrastructure companies — where craft meets
              systems thinking. English & Spanish. Based for remote collaboration worldwide.
            </p>

            <a
              ref={magneticRef}
              href="mailto:hello@sergioatelier.co"
              className="magnetic-btn"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
            >
              <span>Get in Touch</span>
            </a>

            <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs tracking-[0.14em] uppercase opacity-40">
              <a
                href="https://sergioatelier.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-100"
              >
                Studio
              </a>
              <span>Sergio Piñeros © {new Date().getFullYear()}</span>
              <span>Brand · Product · Systems</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
