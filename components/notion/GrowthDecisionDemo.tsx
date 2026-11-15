"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Database, FileText, ShieldCheck, Sparkles, RotateCcw } from "lucide-react";

type Approval = "pending" | "approved" | "held";

const metrics = [
  { label: "Click-through rate", value: "+18%", detail: "More visitors clicked", tone: "positive" },
  { label: "Activated users", value: "+5%", detail: "Slightly more people reached activation", tone: "positive" },
  { label: "Cost per activation", value: "+11%", detail: "Each activation became more expensive", tone: "caution" }
];

export default function GrowthDecisionDemo() {
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [approval, setApproval] = useState<Approval>("pending");

  return (
    <section className="nt-lab" aria-labelledby="nt-lab-title">
      <div className="nt-lab-topline">
        <span className="nt-lab-kicker">A closer look / Growth Marketing</span>
        <span className="nt-lab-sample">Illustrative campaign data</span>
      </div>

      <div className="nt-lab-heading">
        <div>
          <h3 id="nt-lab-title">One campaign. A clear next step.</h3>
          <p>Explore how an experiment could combine campaign data, agent reasoning, and a team decision inside Notion.</p>
        </div>
        <div className="nt-lab-source" aria-label="Illustrative linked sources">
          <span><FileText size={18} aria-hidden="true" /> Campaign brief</span>
          <span><Database size={18} aria-hidden="true" /> Metrics report</span>
        </div>
      </div>

      <div className="nt-lab-question">
        <div>
          <span className="nt-lab-overline">LinkedIn campaign / Hypothesis</span>
          <p>Will showing a real team workflow bring in more qualified trials at an efficient acquisition cost?</p>
        </div>
        <span className="nt-lab-id">EXP-04</span>
      </div>

      <div className="nt-lab-metrics" aria-label="Example campaign performance changes">
        {metrics.map((metric) => (
          <article className="nt-lab-metric" key={metric.label}>
            <span>{metric.label}</span>
            <strong className={metric.tone === "caution" ? "nt-lab-caution" : ""}>{metric.value}</strong>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>

      <div className="nt-lab-review">
        <div className="nt-lab-review-icon"><Sparkles size={24} aria-hidden="true" /></div>
        <div className="nt-lab-review-content">
          <span className="nt-lab-overline">Example agent recommendation</span>
          <h4>Investigate before scaling.</h4>
          <p>Clicks increased, and activated users rose slightly. Cost per activation also increased. Review conversion quality and attribution before committing more budget.</p>
          <button
            type="button"
            className="nt-lab-evidence-toggle"
            aria-expanded={evidenceOpen}
            aria-controls="nt-lab-evidence"
            onClick={() => setEvidenceOpen(!evidenceOpen)}
          >
            {evidenceOpen ? "Hide evidence and checks" : "Review evidence and checks"}
            {evidenceOpen ? <ChevronUp size={18} aria-hidden="true" /> : <ChevronDown size={18} aria-hidden="true" />}
          </button>
          {evidenceOpen && (
            <div className="nt-lab-evidence" id="nt-lab-evidence">
              <div>
                <strong>What the data suggests</strong>
                <p>The creative drew more interest. The increase in activation was smaller, while efficiency declined.</p>
              </div>
              <div>
                <strong>What to validate</strong>
                <p>Check tracking, attribution windows, sample size, cohort mix, and a holdout before interpreting the lift.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="nt-lab-approval">
        <div className="nt-lab-approval-copy">
          <div className="nt-lab-approval-title"><ShieldCheck size={23} aria-hidden="true" /><h4>Human approval</h4></div>
          <p className="nt-lab-approval-action">Proposed action: Reallocate $500 from the existing test budget to a controlled validation cohort.</p>
          <p className="nt-lab-approval-caption">The team reviews the evidence and approves any budget change before it happens.</p>
        </div>
        <div className="nt-lab-approval-controls" aria-live="polite">
          {approval === "pending" ? (
            <>
              <button type="button" className="nt-lab-approve" onClick={() => setApproval("approved")}>Approve validation test</button>
              <button type="button" className="nt-lab-hold" onClick={() => setApproval("held")}>Keep current allocation</button>
            </>
          ) : (
            <div className="nt-lab-complete">
              <span><Check size={19} aria-hidden="true" />{approval === "approved" ? "Validation test approved" : "Current allocation kept"}</span>
              <button type="button" onClick={() => setApproval("pending")}><RotateCcw size={15} aria-hidden="true" /> Reset demo</button>
            </div>
          )}
        </div>
      </div>
      <p className="nt-lab-disclaimer">Interactive UI demonstration. All campaign metrics and decisions are fictional. Approvals update this prototype only; no advertising accounts or live Notion data are connected.</p>
    </section>
  );
}
