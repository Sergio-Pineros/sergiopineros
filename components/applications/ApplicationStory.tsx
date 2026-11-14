"use client";

import { useState } from "react";
import type { ApplicationStoryData } from "@/lib/application-stories";
import "./application-story.css";

export default function ApplicationStory({ story }: { story: ApplicationStoryData }) {
  const [activeStep, setActiveStep] = useState(0);
  const selected = story.steps[activeStep];

  return (
    <main className="application-story" data-company={story.slug}>
      <a className="application-skip" href="#concept">Skip to concept</a>
      <header className="application-top">
        <a className="application-identity" href="https://www.sergiopineros.com">Sergio Piñeros <span>×</span> {story.company}</a>
        <nav aria-label="Page navigation">
          <a href="#concept">The concept</a>
          <a href="#proof">The work</a>
          <a className="application-header-cta" href="mailto:s.dpineros@gmail.com?subject=Let's%20talk%20about%20your%20team">Get in touch</a>
        </nav>
      </header>

      <section className="application-hero">
        <div className="application-hero-inner">
          <p className="application-kicker">Independent application concept <span> / </span> {story.role}</p>
          <h1>{story.headline}<em>{story.emphasis}</em></h1>
          <p className="application-lead">{story.intro}</p>
          <div className="application-actions">
            <a className="application-button application-button-primary" href="#concept">Explore the idea</a>
            <a className="application-button application-button-secondary" href="#proof">See my work</a>
          </div>
        </div>
        <div aria-hidden="true" className="application-orbit">
          <div className="application-orbit-ring application-orbit-ring-outer" />
          <div className="application-orbit-ring application-orbit-ring-mid" />
          <div className="application-orbit-core"><span>{story.monogram}</span></div>
          <div className="application-orbit-satellite application-orbit-satellite-one" />
          <div className="application-orbit-satellite application-orbit-satellite-two" />
        </div>
      </section>

      <section className="application-bridge" aria-label="Point of view">
        <p>{story.problem}</p>
      </section>

      <section className="application-concept" id="concept">
        <div className="application-section-intro">
          <p className="application-kicker">A working idea</p>
          <h2>{story.conceptTitle}</h2>
          <p>{story.conceptIntro}</p>
        </div>
        <div className="application-workspace">
          <div className="application-workspace-head">
            <span>{story.workspaceName}</span>
            <span>Illustrative concept, not a live integration</span>
          </div>
          <div className="application-workspace-body">
            <div className="application-stage-list" role="group" aria-label="Explore the concept stages">
              {story.steps.map((step, index) => (
                <button className={`application-stage ${index === activeStep ? "is-active" : ""}`} type="button" key={step.label} onClick={() => setActiveStep(index)} aria-pressed={index === activeStep}>
                  <span className="application-stage-number">{String(index + 1).padStart(2, "0")}</span>
                  <span>{step.label}</span>
                </button>
              ))}
            </div>
            <div className="application-stage-content" aria-live="polite">
              <p className="application-stage-eyebrow">{story.workspaceName} / {selected.label}</p>
              <h3>{selected.title}</h3>
              <p className="application-stage-copy">{selected.body}</p>
              <div className="application-signal"><div className="application-signal-symbol" aria-hidden="true"><span /><span /><span /></div><p>{selected.signal}</p></div>
              <p className="application-stage-footnote">{selected.takeaway}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="application-thesis">
        <p className="application-kicker">Why this matters</p>
        <h2>{story.thesis}</h2>
        <p>{story.thesisBody}</p>
      </section>

      <section className="application-proof" id="proof">
        <div className="application-section-intro">
          <p className="application-kicker">What I&apos;ve built</p>
          <h2>Ideas become useful when they ship.</h2>
          <p>A few real projects that inform how I would approach this role. The concept above is speculative. The work below comes from my own experience.</p>
        </div>
        <div className="application-proof-grid">
          {story.evidence.map((item) => (
            <article className="application-proof-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.url && <a href={item.url} target="_blank" rel="noreferrer">View project</a>}
            </article>
          ))}
        </div>
      </section>

      <footer className="application-end">
        <p className="application-kicker">A conversation worth having</p>
        <h2>{story.closing}</h2>
        <a className="application-button application-button-primary" href={`mailto:s.dpineros@gmail.com?subject=${encodeURIComponent(story.company + " | Sergio Piñeros")}`}>Talk with Sergio</a>
        <div className="application-fineprint"><span>Sergio Piñeros</span><span>Independent application project. Not affiliated with {story.company}.</span></div>
      </footer>
    </main>
  );
}
