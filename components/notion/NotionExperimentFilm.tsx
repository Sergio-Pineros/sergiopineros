"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronRight, Database, FileText, Lightbulb, Link2, MoreHorizontal, Play, RotateCcw, Sparkles, X } from "lucide-react";

/**
 * A short, self-running HTML product walkthrough, not an actual Notion integration.
 * Notes, campaign metrics and AI output are deliberately fictional.
 */
export default function NotionExperimentFilm() {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduced);
    if (reduced || stopped) {
      setStep(7);
      return;
    }
    // An intentionally short, watchable product narrative.
    const beats = [1100, 2700, 4100, 5800, 7900, 9900, 11600];
    const timeouts = beats.map((time, index) => window.setTimeout(() => setStep(index + 1), time));
    return () => timeouts.forEach(window.clearTimeout);
  }, [run, stopped]);

  const restart = () => {
    if (reducedMotion) {
      setStep(7);
    } else {
      setStopped(false);
      setStep(0);
      setRun((current) => current + 1);
    }
  };

  const beforeDraft = step < 3;
  const saved = step === 7;
  const progress = Math.min(100, Math.round(step / 7 * 100));

  return (
    <section className="nxf-section" id="watch-demo" aria-label="Illustrated Notion Experiments product walkthrough">
      <div className="nxf-heading">
        <div>
          <div className="nxf-eyebrow"><span className="nxf-live-dot" /> THE PRODUCT EXPERIENCE · 12-SECOND WALKTHROUGH</div>
          <h3>From meeting notes to a team experiment.</h3>
          <p>Type one command. Review what Notion already knows. Save a shared experiment — without starting from a blank form.</p>
        </div>
        <div className="nxf-controls">
          <button type="button" onClick={restart}><RotateCcw size={16} /> Replay</button>
          {step < 7 && <button type="button" className="nxf-skip" onClick={() => { setStopped(true); setStep(7); }}><Play size={14} /> Skip to result</button>}
        </div>
      </div>
      <div className="nxf-story">
        <div className="nxf-frame" aria-label="Simulated Notion interface">
          <div className="nxf-sidebar" aria-hidden="true">
            <div className="nxf-workspace-avatar">G</div>
            <strong>Growth team <ChevronDown size={13}/></strong>
            <div className="nxf-sidebar-item"><FileText size={15}/> Home</div>
            <div className="nxf-sidebar-item nxf-selected"><FileText size={15}/> Meeting notes</div>
            <div className="nxf-sidebar-item"><Database size={15}/> Campaigns</div>
            <div className="nxf-sidebar-item"><Lightbulb size={15}/> Experiments</div>
            <div className="nxf-sidebar-sub">PRIVATE DEMO WORKSPACE</div>
          </div>
          <div className="nxf-main">
            <div className="nxf-topbar">
              <span>Growth team <ChevronRight size={12}/> {saved ? "Experiments" : beforeDraft ? "Monday growth sync" : "New experiment"}</span>
              <div><span className="nxf-topbar-share">Share</span><MoreHorizontal size={17}/></div>
            </div>
            {beforeDraft && (
              <div className="nxf-paper nxf-appear" key="notes">
                <span className="nxf-page-emoji">📝</span>
                <h4>Monday growth sync</h4>
                <div className="nxf-muted">AI Meeting Notes · Growth / Nov 2026</div>
                <div className="nxf-rule"/>
                <p><strong>Idea:</strong> Test whether a guided first workspace improves activation from paid acquisition.</p>
                <p><strong>Goal:</strong> Increase qualified signups and first workspace activation.</p>
                <p><strong>Team agreement:</strong> Start with a controlled $2,000 validation test.</p>
                <div className="nxf-editor">
                  <span className="nxf-plus">＋</span>
                  {step === 0 ? <span className="nxf-placeholder">Click to add a block...</span> : <span className={step === 1 ? "nxf-typed nxf-typing" : "nxf-typed"}>/experiment</span>}
                  {step === 2 && <div className="nxf-command">
                    <span className="nxf-command-icon">✳</span>
                    <span><strong>Experiment</strong><small>Generate from notes and connected workspace data</small></span><span>↵</span>
                  </div>}
                </div>
              </div>
            )}
            {!beforeDraft && !saved && (
              <div className="nxf-paper nxf-draft" key="draft">
                <div className="nxf-ai-label"><Sparkles size={15}/> DRAFTED WITH NOTION AGENT <span>· Review before saving</span></div>
                <span className="nxf-page-emoji">🧪</span>
                <h4>Guided onboarding activation test</h4>
                <p className="nxf-draft-sub">Generated from <u>Monday growth sync</u>, <u>Campaigns</u>, and a linked performance report.</p>
                <div className="nxf-properties">
                  <div><span>Status</span><strong className="nxf-pill">Draft · needs review</strong></div>
                  <div><span>Planned campaign budget</span><strong>$30,000</strong></div>
                  <div><span>Proposed test</span><strong>$2,000</strong></div>
                </div>
                <div className={"nxf-draft-content " + (step >= 4 ? "nxf-shift-up" : "") + (step >= 5 ? " nxf-shift-more" : "")}>
                  <div className="nxf-section-card nxf-highlight-card">
                    <span className="nxf-card-kicker">01 / HYPOTHESIS</span>
                    <h5>A guided first workspace will improve activation.</h5>
                    <p>Test a ready-to-use team workflow for new qualified signups.</p>
                    <small>Source: Monday growth sync · AI Meeting Notes</small>
                  </div>
                  <div className="nxf-section-card">
                    <span className="nxf-card-kicker">02 / CONNECTED CONTEXT</span>
                    <div className="nxf-source"><FileText size={16}/> Meeting notes <Check size={15}/></div>
                    <div className="nxf-source"><Database size={16}/> Campaign database <Check size={15}/></div>
                    <div className="nxf-source"><Link2 size={16}/> Performance report (sample CSV) <Check size={15}/></div>
                  </div>
                  <div className="nxf-section-card nxf-ad-card">
                    <span className="nxf-card-kicker">03 / PERFORMANCE & TRACKING</span>
                    <div className="nxf-metrics">
                      <div><small>Planned budget</small><strong>$30,000</strong></div>
                      <div><small>Spend in report</small><strong>$9,800</strong></div>
                      <div><small>Qualified signups</small><strong>1,240</strong></div>
                      <div><small>Activation rate</small><strong>31%</strong></div>
                    </div>
                    <div className="nxf-connect"><span><strong>Meta Ads</strong><small>Not connected · authorize to track live spend</small></span><span className="nxf-connect-button">Connect Meta Ads</span></div>
                  </div>
                  <div className="nxf-section-card nxf-verification">
                    <span className="nxf-card-kicker">04 / HUMAN REVIEW</span>
                    <strong>Does this experiment look right?</strong>
                    <p>Review the hypothesis, budget, sources, and metrics before saving to your team workspace.</p>
                    <span className={"nxf-confirm-button " + (step >= 6 ? "nxf-confirm-pressed" : "")}><Check size={15}/> {step >= 6 ? "Looks correct" : "Yes, looks correct"}</span>
                  </div>
                </div>
                {step === 6 && <div className="nxf-modal-layer">
                  <div className="nxf-confirm-modal nxf-appear" role="status">
                    <button type="button" className="nxf-modal-close" aria-label="Close preview" onClick={() => setStep(5)}><X size={17}/></button>
                    <span className="nxf-modal-icon">🗂️</span>
                    <h5>Save to the shared workspace?</h5>
                    <p>Confirm these values and add this experiment to <strong>Growth team / Experiments</strong>. Your sources stay linked.</p>
                    <div className="nxf-save-button"><Check size={15}/> Save experiment</div>
                  </div>
                </div>}
              </div>
            )}
            {saved && <div className="nxf-paper nxf-appear nxf-saved" key="saved">
              <span className="nxf-page-emoji">🧪</span>
              <h4>Experiments</h4>
              <p className="nxf-muted">Shared team database · One place for evidence and decisions.</p>
              <div className="nxf-success"><Check size={19}/> Experiment saved to Growth team</div>
              <div className="nxf-db-head"><span>Name</span><span>Status</span><span>Budget</span></div>
              <div className="nxf-db-row"><span>🧪 Guided onboarding activation test</span><span className="nxf-pill">In review</span><strong>$30,000</strong></div>
              <p className="nxf-end-hint"><Link2 size={14}/> Meeting notes and performance report remain linked.</p>
            </div>}
          </div>
          <div className="nxf-chapter"><span>{beforeDraft ? "01 / CAPTURE" : saved ? "04 / SAVED" : step < 5 ? "02 / GENERATE" : step < 6 ? "03 / REVIEW" : "04 / CONFIRM"}</span><strong>{beforeDraft ? "Type /experiment" : saved ? "Ready for your team" : step < 5 ? "The context is already here" : step < 6 ? "Review metrics & connect ads" : "Confirm and save"}</strong></div>
        </div>
        <div className="nxf-progress"><span style={{width: progress + "%"}}/></div>
        <div className="nxf-foot"><span>Illustrative product animation · All data and clicks are simulated.</span><span>{saved ? "Complete" : "Playing"}</span></div>
      </div>
    </section>
  );
}
