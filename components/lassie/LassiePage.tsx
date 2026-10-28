"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import "./lassie.css";

const TICKER = [
  "Mapped the workflow before kickoff",
  "Kept 90% of monday.com accounts",
  "Stood up a shop CRM from zero",
  "Wrote the playbook the next hire can run",
  "Used AI to finish the busywork first",
];

const FAQ = [
  {
    q: "Why a designer for a deployment role?",
    a: "I spent a year and a half as the post-sale owner for monday.com accounts: requirements, workflow setup, onboarding, and retention. The design work came after, sitting inside the businesses I was already responsible for. This role is that same loop, with agents instead of boards.",
  },
  {
    q: "Have you built playbooks from scratch?",
    a: "Yes. At Fast Cloud I led onboarding for a LATAM book of accounts and had to make the path repeatable. At Savron I designed and shipped the system the shop actually runs on: scheduling, records, passes, SMS. Playbooks only count if someone else can run them.",
  },
  {
    q: "Do you already use AI in the work?",
    a: "Daily. I use it to draft, automate, and debug. I also build agent workflows for founders. I am comfortable sitting next to an owner and explaining what an agent did, why it stalled, and what we change next.",
  },
  {
    q: "The role is on-site in San Francisco or Toronto.",
    a: "I know. I am based in Bogotá today. I am applying because the work is the work I want, and I am ready to talk about being in one of those offices. If the first conversations feel mutual, we can be specific about timing.",
  },
  {
    q: "Do you know dental or medical ops?",
    a: "Not as a practitioner. I know small businesses that run on software they did not choose, staff who are already busy, and owners who will churn if week eight still feels like a project. I learn the office by sitting in it.",
  },
  {
    q: "What happens if we email you?",
    a: "You get a short, direct reply with a time to talk. No deck. I would rather walk a real workflow with you than perform excitement.",
  },
];

const MAIL = "hello@sergioatelier.co";
const APPLY =
  "https://jobs.ashbyhq.com/lassie/19493179-d4ea-476e-af9f-218684228879";

function Flower({ className }: { className?: string }) {
  return (
    <img
      src="/lassie/mark.svg"
      alt=""
      className={className}
      width={54}
      height={54}
    />
  );
}

function TerminalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1.2" y="2" width="13.6" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 6.2 6.2 8 4 9.8M8.2 10.2H12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmailForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [email, setEmail] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const from = email.trim();
    const subject = encodeURIComponent("Lassie — Deployment Strategist, Sergio Piñeros");
    const body = encodeURIComponent(
      from
        ? `Reply to ${from}.\n\nI want the first eight weeks.`
        : "I want the first eight weeks."
    );
    window.location.href = `mailto:${MAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form className={`lassie-form${variant === "light" ? " lassie-form--light" : ""}`} onSubmit={onSubmit}>
      <label className="sr-only" htmlFor={`lassie-email-${variant}`}>
        Your email
      </label>
      <input
        id={`lassie-email-${variant}`}
        type="email"
        name="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
      />
      <button className="lassie-btn" type="submit">
        Get started
      </button>
    </form>
  );
}

export default function LassiePage() {
  const [tick, setTick] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      setTick((value) => (value + 1) % TICKER.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="lassie">
      <header className="lassie-nav">
        <nav className="lassie-nav__cluster" aria-label="Primary">
          <Link className="lassie-nav__brand" href="/">
            <Flower />
            Sergio
          </Link>
          <a className="lassie-nav__link" href="#work">
            Work
          </a>
          <a className="lassie-nav__link" href="#how">
            Role
          </a>
        </nav>
        <div className="lassie-nav__actions">
          <a className="lassie-nav__link" href={`mailto:${MAIL}?subject=${encodeURIComponent("Resume request")}`}>
            Résumé
          </a>
          <a className="lassie-nav__cta" href="#start">
            Write
          </a>
        </div>
      </header>

      <section className="lassie-hero" aria-label="Hero">
        <div className="lassie-hero__media">
          <Image
            src="/lassie/hero-office.jpg"
            alt="An empty office in morning light."
            fill
            priority
            sizes="100vw"
          />
          <div className="lassie-hero__grade" />
        </div>
        <div className="lassie-hero__copy">
          <h1>
            <span>You&apos;re hiring for week eight.</span>
            <em>Not for a ticket queue.</em>
          </h1>
          <p className="lassie-hero__sub">Let Sergio own deployment</p>
          <p className="lassie-ticker">
            <TerminalIcon />
            <span key={tick} className="lassie-ticker__line">
              {TICKER[tick]}
            </span>
          </p>
        </div>
        <div className="lassie-hero__form">
          <EmailForm />
        </div>
      </section>

      <section className="lassie-section" id="work">
        <div className="lassie-kicker">
          <Flower />
          <h2>CS that leaves a playbook, not a personality</h2>
        </div>

        <div className="lassie-windows">
          <article className="lassie-window lassie-window--a">
            <div className="lassie-window__bg">
              <Image src="/lassie/window-amber.jpg" alt="" fill sizes="1100px" />
            </div>
            <div className="lassie-window__copy">
              <h3>Lead onboarding and deployment</h3>
              <p>
                Sit in the practice, map the real workflow, configure the agent, and stay until the first job completes without you.
              </p>
            </div>
            <div className="lassie-card lassie-card--center">
              <div className="lassie-card__head">
                <Flower />
                Sergio working…
              </div>
              <div className="lassie-row">
                <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span className="lassie-dot lassie-dot--spin" />
                  Map intake before kickoff
                </span>
                <span className="lassie-row__meta">In progress</span>
              </div>
              <div className="lassie-row">
                <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span className="lassie-dot" />
                  Train the owner, then the staff
                </span>
                <span className="lassie-row__meta">Up next</span>
              </div>
            </div>
          </article>

          <article className="lassie-window lassie-window--b">
            <div className="lassie-window__bg">
              <Image src="/lassie/window-green.jpg" alt="" fill sizes="1100px" />
            </div>
            <div className="lassie-card lassie-card--offset">
              <p className="lassie-row__meta" style={{ margin: "0 0 10px" }}>
                How is week three looking?
              </p>
              <div className="lassie-card__head" style={{ marginBottom: 0 }}>
                <Flower />
                First agent posted without a call. Owner still in the loop on the two exceptions.
              </div>
            </div>
            <div className="lassie-window__copy">
              <h3>Keeps you in the loop</h3>
              <p>
                Account health in writing. Exceptions flagged. No disappearing until renewal.
              </p>
            </div>
          </article>

          <article className="lassie-window lassie-window--c">
            <div className="lassie-window__bg">
              <Image src="/lassie/still-desk.jpg" alt="" fill sizes="1100px" />
            </div>
            <div className="lassie-window__copy">
              <h3>And answers the hard questions</h3>
              <p>
                Why it stalled. What we change. Whether they should stay. Direct, without theater.
              </p>
            </div>
            <div className="lassie-card lassie-card--center">
              <div className="lassie-card__head">
                <Flower />
                Last book: 90% retained, 40% more expansion conversations
              </div>
              <div className="lassie-row">
                <span>Fast Cloud · monday.com CS</span>
                <span className="lassie-chip">Closed the books</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="lassie-learn">
        <div className="lassie-float lassie-float--photo lassie-float--tl">
          <Image src="/lassie/still-clinic.jpg" alt="" width={180} height={140} />
        </div>
        <div className="lassie-float lassie-float--card lassie-float--tr">
          <div className="lassie-card__head">
            <span className="lassie-chip">Received</span>
            Savron CRM
          </div>
          <div className="lassie-row">
            <span>Scheduling, records, Wallet, SMS</span>
            <span className="lassie-row__meta">Shipped</span>
          </div>
        </div>
        <h2>The more I learn the office, the less the owner has to hover</h2>
        <div className="lassie-float lassie-float--card lassie-float--bl">
          <div className="lassie-card__head">
            <Flower />
            Account health
          </div>
          <div className="lassie-row">
            <span>Retention</span>
            <strong>90%</strong>
          </div>
          <div className="lassie-row">
            <span>Expansion talks</span>
            <strong>+40%</strong>
          </div>
        </div>
        <div className="lassie-float lassie-float--photo lassie-float--br">
          <Image src="/lassie/window-green.jpg" alt="" width={180} height={140} />
        </div>
      </section>

      <section className="lassie-how" id="how">
        <h2>How I would run the seat</h2>
        <div className="lassie-how__grid">
          <article className="lassie-how__item">
            <div className="lassie-mock">
              <div className="lassie-row">
                <span>Kickoff notes</span>
                <span className="lassie-row__meta">Day 1</span>
              </div>
              <div className="lassie-row">
                <span>Who still touches paper</span>
                <span className="lassie-chip">Mapped</span>
              </div>
            </div>
            <div>
              <h3>Map the office</h3>
              <p>
                Understand the practice as it actually runs. Configure the agent to that, not to a generic template.
              </p>
            </div>
          </article>
          <article className="lassie-how__item">
            <div className="lassie-mock">
              <div className="lassie-row">
                <span>First automated workflow</span>
                <span className="lassie-chip">Live</span>
              </div>
              <div className="lassie-row">
                <span>Owner trained · staff next</span>
                <span className="lassie-row__meta">Week 3</span>
              </div>
            </div>
            <div>
              <h3>Get value inside eight weeks</h3>
              <p>
                Activation is the job. Faster onboarding, higher launch rates, less time until the agent is useful without a call.
              </p>
            </div>
          </article>
          <article className="lassie-how__item">
            <div className="lassie-mock">
              <div className="lassie-row">
                <span>Playbook v1</span>
                <span className="lassie-row__meta">Shared</span>
              </div>
              <div className="lassie-row">
                <span>Notes to Product</span>
                <span className="lassie-chip">Weekly</span>
              </div>
            </div>
            <div>
              <h3>Leave something repeatable</h3>
              <p>
                Implementation, health, and retention written down so the next hire inherits a bar, not folklore.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="lassie-faq" id="faq">
        <h2>FAQ</h2>
        <div className="lassie-acc">
          {FAQ.map((item, index) => {
            const isOpen = open === index;
            return (
              <div className="lassie-acc__item" data-open={isOpen} key={item.q}>
                <button
                  className="lassie-acc__trigger"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  {item.q}
                  <svg className="lassie-acc__icon" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </button>
                <div className="lassie-acc__panel">
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="lassie-end" id="start">
        <div className="lassie-end__frame">
          <Image src="/lassie/footer.jpg" alt="" fill sizes="1200px" />
          <div className="lassie-end__grade" />
          <div className="lassie-end__copy">
            <Flower />
            <h2>Let&apos;s talk about week eight</h2>
            <EmailForm variant="light" />
          </div>
        </div>
      </section>

      <footer className="lassie-foot">
        <p>Sergio Piñeros · applying for Deployment Strategist at Lassie.</p>
        <nav aria-label="Footer">
          <a href={`mailto:${MAIL}`}>Email</a>
          <a href={APPLY} target="_blank" rel="noopener noreferrer">
            The role
          </a>
          <a href="https://www.linkedin.com/in/sergio-pi%C3%B1eros" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <Link href="/">Home</Link>
        </nav>
      </footer>

    </div>
  );
}
