"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { funnel } from "@/lib/anvara/data";
const learning = [
  {
    label: "Customer feedback",
    detail:
      "Weekly conversations with brands and rightsholders. Add sales and business-development notes, lost-deal context and support themes. Separate anecdotes from observed prevalence.",
  },
  {
    label: "Identify friction",
    detail:
      "Triangulate interview patterns, event data and deal reviews. Check whether friction is concentrated in a participant, category or journey stage.",
  },
  {
    label: "Form hypothesis",
    detail:
      "State who struggles, what should change and why. Write a falsifiable prediction and the guardrails for the other marketplace participant.",
  },
  {
    label: "Prototype",
    detail:
      "Build the smallest working interaction that exposes the uncertainty. Use fictional data until a controlled, consented pilot is appropriate.",
  },
  {
    label: "Test",
    detail:
      "Start with comprehension and usability. Establish baselines before sizing a controlled experiment; agree assignment, exposure and stopping rules.",
  },
  {
    label: "Measure",
    detail:
      "Review the intended outcome and two-sided guardrails. Distinguish correlation, intent and observed behavior from causal evidence.",
  },
  {
    label: "Prioritize",
    detail:
      "Update value, effort and evidence in the shared decision model. Revisit dependencies with engineering and communicate the decision back to sales and customers.",
  },
];
export default function Measurement() {
  const [active, setActive] = useState(0);
  const [loop, setLoop] = useState(0);
  return (
    <section id="measurement" className="av-section av-measurement">
      <div className="av-wrap">
        <div className="av-section-intro">
          <div>
            <p className="av-kicker">
              05 / MEASURE WHAT MOVES THE RELATIONSHIP
            </p>
            <h2>
              A click is an event.
              <br />
              <span>A partnership is the outcome.</span>
            </h2>
          </div>
          <p>
            A proposed instrumentation plan.
            <br />
            No invented conversion rates.
            <br />
            No pretend product results.
          </p>
        </div>
        <div className="av-funnel">
          <svg viewBox="0 0 1000 100" aria-hidden="true">
            <defs>
              <linearGradient id="funnel-grad">
                <stop stopColor="#2369e8" />
                <stop offset="1" stopColor="#6439cf" />
              </linearGradient>
            </defs>
            <path d="M40 50H960" stroke="url(#funnel-grad)" strokeWidth="2" />
            {funnel.map((f, i) => (
              <g key={f.stage}>
                <circle
                  cx={40 + (i * 920) / 7}
                  cy="50"
                  r={i === active ? 20 : 7}
                  fill={i === active ? "#fff" : "#8d9ad6"}
                  stroke={i === active ? "#6e73ce" : "none"}
                  strokeWidth="2"
                />
                <circle cx={40 + (i * 920) / 7} cy="50" r="4" fill="#6c71cd" />
              </g>
            ))}
          </svg>
          <div>
            {funnel.map((f, i) => (
              <button
                key={f.stage}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                <span>0{i + 1}</span>
                {f.stage}
              </button>
            ))}
          </div>
        </div>
        <div className="av-instrumentation">
          <div>
            <span className="av-mini-label">
              STAGE / {funnel[active].stage.toUpperCase()}
            </span>
            <h3>{funnel[active].definition}</h3>
          </div>
          <div>
            <span className="av-mini-label">
              PROPOSED EVENT / NOT COLLECTED HERE
            </span>
            <code>{funnel[active].event}</code>
            <p>
              campaign_id · opportunity_id · actor_side
              <br />
              experiment_variant · event_id · schema_version · timestamp
            </p>
          </div>
        </div>
        <details className="av-instrumentation-plan">
          <summary>What makes these measurements trustworthy?</summary>
          <div>
            <p>
              <strong>Stage ≠ event.</strong> A stage describes relationship
              progress. Events record observed actions. A cohort model derives
              progression from validated events, not the visual order on this
              page.
            </p>
            <p>
              <strong>Collection plan.</strong> Log exposure and exploration in
              the client; validate inquiry, response and milestone state changes
              on the server. Use stable anonymous identifiers, deduplicate event
              IDs, exclude staff and bots, and omit brief text and personal data
              from analytics.
            </p>
            <p>
              <strong>Analysis plan.</strong> Review weekly by
              brand/rightsholder, acquisition cohort, category and campaign
              size. Set conversion windows before analysis, account for immature
              cohorts, use business hours for response times and pair rates with
              sample sizes.
            </p>
            <p>
              <strong>Marketplace guardrails.</strong> Track inquiry spam,
              rightsholder workload, response quality, supply concentration and
              abandonment. A lift for one side must not quietly shift cost onto
              the other.
            </p>
          </div>
        </details>
        <div className="av-learning-layout">
          <div className="av-learning-orbit">
            <svg viewBox="0 0 460 460" aria-hidden="true">
              <defs>
                <linearGradient id="learning-grad">
                  <stop stopColor="#2369e8" />
                  <stop offset="1" stopColor="#8c55db" />
                </linearGradient>
              </defs>
              <circle cx="230" cy="230" r="160" fill="none" stroke="#e1e5f2" />
              <circle
                className="av-loop-trace"
                cx="230"
                cy="230"
                r="160"
                fill="none"
                stroke="url(#learning-grad)"
                strokeDasharray="140 865"
                strokeWidth="2"
              />
            </svg>
            <div className="av-loop-center">
              <span>MAKE A DECISION.</span>
              <strong>Keep learning.</strong>
            </div>
            {learning.map((item, i) => {
              const angle = (i / learning.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <button
                  key={item.label}
                  style={{
                    left: `${50 + Math.cos(angle) * 34.8}%`,
                    top: `${50 + Math.sin(angle) * 34.8}%`,
                  }}
                  aria-pressed={i === loop}
                  onClick={() => setLoop(i)}
                >
                  <span>0{i + 1}</span>
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="av-learning-copy">
            <span className="av-mini-label">
              THE PRODUCT LEARNING LOOP / 0{loop + 1}
            </span>
            <h3>{learning[loop].label}.</h3>
            <p>{learning[loop].detail}</p>
            <div className="av-sales-input">
              <span>THE COMMERCIAL TEAM IS PART OF THE LOOP</span>
              <p>
                Sales and business development bring recurring objections and
                deal context into discovery. Product brings tested decisions and
                clear rationale back.
              </p>
            </div>
            <a className="av-text-link" href="#decisions">
              Return to the decision space <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
