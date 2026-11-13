"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, ArrowRight } from "lucide-react";
import { journey, Stage, stages, sponsorships } from "@/lib/anvara/data";
import { useExploration } from "./State";
export default function Journey() {
  const [stage, setStage] = useState<Stage>("Discover");
  const { data, select, campaign, activeSponsor, setLab } = useExploration();
  const step = journey[stage];
  const idea = data.find((o) => o.id === step.opportunity)!;
  const s = sponsorships.find((s) => s.id === activeSponsor) || sponsorships[1];
  const index = stages.indexOf(stage);
  function choose(s: Stage) {
    setStage(s);
    select(journey[s].opportunity);
    setLab(
      s === "Connect"
        ? "brief"
        : s === "Measure" || s === "Execute"
          ? "outcomes"
          : "match",
    );
  }
  return (
    <section id="journey" className="av-section av-journey-section">
      <div className="av-wrap">
        <div className="av-section-intro">
          <div>
            <p className="av-kicker">03 / THE ENTIRE RELATIONSHIP</p>
            <h2>
              From discovery
              <br />
              <span>to outcome.</span>
            </h2>
          </div>
          <p>
            A successful match opens a door.
            <br />
            The product has to help
            <br />
            both sides walk through it.
          </p>
        </div>
        <div className="av-journey-visual">
          <div className="av-journey-labels">
            <span>
              <i className="av-blue-dot" />
              BRAND JOURNEY
            </span>
            <span>
              <i className="av-violet-dot" />
              RIGHTSHOLDER JOURNEY
            </span>
          </div>
          <svg
            viewBox="0 0 1000 150"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="journey-line">
                <stop stopColor="#2369e8" />
                <stop offset="1" stopColor="#8952dc" />
              </linearGradient>
            </defs>
            <path
              className="av-journey-track"
              d="M30 35 C130 35 140 110 260 75 S390 35 500 75 S650 115 740 75 S880 35 970 75"
            />
            <path
              className="av-journey-track"
              d="M30 115 C130 115 140 40 260 75 S390 115 500 75 S650 35 740 75 S880 115 970 75"
            />
            <path
              className="av-journey-trace"
              d="M30 35 C130 35 140 110 260 75 S390 35 500 75 S650 115 740 75 S880 35 970 75"
            />
            {stages.map((s, i) => (
              <g key={s}>
                <circle
                  cx={30 + i * 235}
                  cy={i === 0 ? 35 : 75}
                  r={i === index ? 15 : 6}
                  fill={i === index ? "#ffffff" : "#b0b8d8"}
                  stroke={i === index ? "#7a75df" : "none"}
                  strokeWidth="2"
                />
                <circle
                  cx={30 + i * 235}
                  cy={i === 0 ? 35 : 75}
                  r="4"
                  fill={i <= index ? "#6d68d8" : "#c3c8dc"}
                />
              </g>
            ))}
          </svg>
          <div className="av-journey-stages" aria-label="Journey stages">
            {stages.map((s, i) => (
              <button
                key={s}
                onClick={() => choose(s)}
                aria-pressed={s === stage}
              >
                <span>0{i + 1}</span>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="av-journey-detail">
          <div>
            <span className="av-mini-label">
              {stage.toUpperCase()} / TWO JOBS TO BE DONE
            </span>
            <div className="av-paired-goals">
              <p>
                <span className="av-blue-text">BRAND</span>
                {step.brand}
              </p>
              <p>
                <span className="av-violet-text">RIGHTSHOLDER</span>
                {step.rightsholder}
              </p>
            </div>
            <div className="av-friction">
              <span className="av-mini-label">POTENTIAL FRICTION</span>
              <p>{step.friction}</p>
            </div>
            <h3>{idea.title}</h3>
            <p>{idea.hypothesis}</p>
            <p className="av-journey-metric">
              <span>MEASURE</span>
              {step.metric}
            </p>
            <a
              className="av-text-link"
              href="#decisions"
              onClick={() => select(idea.id)}
            >
              Inspect the hypothesis <ArrowUpRight size={15} />
            </a>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              className="av-journey-ui"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="av-ui-chrome">
                <span />
                <span />
                <span />
                <small>FICTIONAL WORKFLOW / {stage.toUpperCase()}</small>
              </div>
              <div className="av-ui-inner">
                <span className="av-mini-label">
                  {s.name} / {campaign.location}
                </span>
                <h4>{step.interfaceTitle}</h4>
                {stage === "Discover" ? (
                  <>
                    <div className="av-listing-art">
                      <div />
                      <div />
                      <div />
                      <span>{s.category}</span>
                    </div>
                    <dl className="av-ui-fields">
                      <div>
                        <dt>Audience</dt>
                        <dd>{s.audiences.join(" / ")}</dd>
                      </div>
                      <div>
                        <dt>Package</dt>
                        <dd>${s.cost.toLocaleString()}</dd>
                      </div>
                      <div>
                        <dt>Included</dt>
                        <dd>{s.inventory}</dd>
                      </div>
                    </dl>
                  </>
                ) : stage === "Evaluate" ? (
                  <>
                    <div className="av-fit-display">
                      <i />
                      <span>
                        YOUR CAMPAIGN GOAL<strong>{campaign.goal}</strong>
                      </span>
                    </div>
                    <p>
                      Compare the audience, budget and market with your
                      campaign.
                    </p>
                    <div className="av-ui-note">
                      <span>KNOWN LIMITATION</span>
                      {s.tradeoff}
                    </div>
                  </>
                ) : stage === "Connect" ? (
                  <>
                    <div className="av-message">
                      <span>BRAND / CAMPAIGN BRIEF</span>We’re exploring{" "}
                      {campaign.goal.toLowerCase()} for{" "}
                      {campaign.audience.toLowerCase()}. Our ceiling is $
                      {campaign.budget.toLocaleString()}.
                    </div>
                    <div className="av-message av-message-reply">
                      <span>RIGHTSHOLDER / NEXT STEP</span>Let’s confirm your
                      dates, category requirements and what success means.
                    </div>
                  </>
                ) : stage === "Execute" ? (
                  <div className="av-milestone-list">
                    {[
                      "Confirm activation scope",
                      "Approve creative assets",
                      "Deliver on-site experience",
                      "Validate audience report",
                    ].map((s, i) => (
                      <div key={s}>
                        <span>
                          {i < 3 ? (
                            <Check size={15} />
                          ) : (
                            String(i + 1).padStart(2, "0")
                          )}
                        </span>
                        <p>
                          {s}
                          <small>
                            {i < 3
                              ? "Illustrative: accepted"
                              : "Illustrative: awaiting partner input"}
                          </small>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="av-outcome-mini">
                      <strong>3 / 4</strong>
                      <span>Illustrative deliverables accepted</span>
                    </div>
                    <div className="av-ui-note">
                      <span>BEFORE THE NEXT DECISION</span>Validate the
                      remaining audience report. Observed interactions do not
                      establish incremental revenue.
                    </div>
                  </>
                )}
                <a href="#prototype" className="av-ui-action">
                  Explore this part of the prototype <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
