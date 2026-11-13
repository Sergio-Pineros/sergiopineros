"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  Copy,
  GitCompareArrows,
  Send,
  SlidersHorizontal,
} from "lucide-react";
import { experiments, sponsorships } from "@/lib/anvara/data";
import { makeBrief, match } from "@/lib/anvara/model";
import { useExploration } from "./State";
import Drawer from "./Drawer";
const money = (n: number) => `$${n.toLocaleString()}`;
export default function MatchLab() {
  const {
    campaign,
    setCampaign,
    shortlist,
    toggleShortlist,
    lab,
    setLab,
    activeSponsor: active,
    setActiveSponsor: setActive,
  } = useExploration();
  const [compare, setCompare] = useState(false);
  const [pair, setPair] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [draft, setDraft] = useState("");
  const [view, setView] = useState<"brand" | "rightsholder">("brand");
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [shortOnly, setShortOnly] = useState(false);
  const exp = experiments.find((e) => e.id === lab)!;
  const ranked = sponsorships
    .map((s) => ({ ...s, ...match(campaign, s) }))
    .sort(
      (a, b) =>
        Number(b.eligible) - Number(a.eligible) ||
        b.score - a.score ||
        a.cost - b.cost,
    );
  const chosen = ranked.find((s) => s.id === active)!;
  const visible = ranked.filter((s) => !shortOnly || shortlist.includes(s.id));
  const comparisons = pair
    .map((id) => ranked.find((s) => s.id === id)!)
    .filter(Boolean);
  function prepare() {
    setLab("brief");
    setDraft("");
    setView("brand");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }
  return (
    <section id="prototype" className="av-section av-lab-section">
      <div className="av-wrap">
        <div className="av-section-intro">
          <div>
            <p className="av-kicker">
              PRODUCT EXPERIMENTS / WORKING PROTOTYPE
            </p>
            <h2>
              Not more features.
              <br />
              <span>Better decisions.</span>
            </h2>
          </div>
          <p>
            Improvements to existing experiences.
            <br />
            Hypotheses to test together,
            <br />
            not findings dressed as features.
          </p>
        </div>
        <div className="av-experiment-tabs" aria-label="Product experiments">
          {experiments.map((e) => (
            <button
              key={e.id}
              aria-pressed={lab === e.id}
              onClick={() => setLab(e.id)}
            >
              <strong>{e.title}</strong>
              <ArrowUpRight size={21} />
            </button>
          ))}
        </div>
        <div className="av-experiment-reasoning">
          <h3>{exp.question}</h3>
          <div>
            <p>
              <span>PROBLEM</span>
              {exp.problem}
            </p>
            <p>
              <span>HYPOTHESIS</span>
              {exp.hypothesis}
            </p>
          </div>
        </div>
        <div className="av-prototype-shell">
          <div className="av-prototype-title">
            <span>
              <i />
              PARTNERSHIP LAB
            </span>
            <span>Fictional data · Frontend prototype</span>
          </div>
          <div className="av-lab-progress">
            {[
              { id: "match", label: "Explore & compare" },
              { id: "brief", label: "Prepare a brief" },
              { id: "outcomes", label: "Understand outcomes" },
            ].map((s) => (
              <button
                key={s.id}
                aria-pressed={lab === s.id}
                onClick={() => setLab(s.id as typeof lab)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={lab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {lab === "match" ? (
                <div className="av-match-layout">
                  <aside className="av-campaign">
                    <span className="av-mini-label">
                      <SlidersHorizontal size={13} /> YOUR HYPOTHETICAL CAMPAIGN
                    </span>
                    <h4>
                      Find your kind <br />
                      of connection.
                    </h4>
                    <label>
                      Budget ceiling
                      <select
                        value={campaign.budget}
                        onChange={(e) =>
                          setCampaign({
                            ...campaign,
                            budget: Number(e.target.value),
                          })
                        }
                      >
                        {[10000, 20000, 40000, 75000].map((v) => (
                          <option key={v} value={v}>
                            {money(v)}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Who do you want to reach?
                      <select
                        value={campaign.audience}
                        onChange={(e) =>
                          setCampaign({ ...campaign, audience: e.target.value })
                        }
                      >
                        {[
                          "Young professionals",
                          "Sports fans",
                          "Culture seekers",
                          "Local families",
                        ].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Market
                      <select
                        value={campaign.location}
                        onChange={(e) =>
                          setCampaign({ ...campaign, location: e.target.value })
                        }
                      >
                        {[
                          "New York",
                          "Chicago",
                          "Minneapolis",
                          "Any US market",
                        ].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Campaign goal
                      <select
                        value={campaign.goal}
                        onChange={(e) =>
                          setCampaign({ ...campaign, goal: e.target.value })
                        }
                      >
                        {[
                          "Brand awareness",
                          "Product sampling",
                          "Community engagement",
                        ].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    <p className="av-footnote">
                      A transparent rule-based illustration: audience 30 +
                      budget 25 + goal 25 + market 20. This is not Anvara’s AI
                      or a predicted outcome.
                    </p>
                  </aside>
                  <div className="av-results">
                    <div className="av-results-top">
                      <div>
                        <span className="av-mini-label">
                          FICTIONAL INVENTORY
                        </span>
                        <h4>
                          {ranked.filter((s) => s.eligible).length} within
                          budget.
                          <br />
                          <span>Let’s look beyond the score.</span>
                        </h4>
                      </div>
                      <button
                        className="av-text-button"
                        aria-pressed={shortOnly}
                        onClick={() => setShortOnly((v) => !v)}
                      >
                        <Bookmark
                          size={14}
                          fill={shortOnly ? "currentColor" : "none"}
                        />
                        Shortlist ({shortlist.length})
                      </button>
                    </div>
                    <div className="av-result-list">
                      {visible.length ? (
                        visible.map((s) => (
                          <div
                            key={s.id}
                            className={`av-result ${s.id === active ? "is-active" : ""}`}
                          >
                            <button
                              className="av-result-main"
                              onClick={() => setActive(s.id)}
                              aria-pressed={s.id === active}
                            >
                              <span
                                className="av-event-mark"
                                style={
                                  {
                                    "--event-color": s.color,
                                  } as React.CSSProperties
                                }
                              >
                                {s.name
                                  .split(" ")
                                  .map((w) => w[0])
                                  .slice(0, 2)
                                  .join("")}
                              </span>
                              <span className="av-event-info">
                                <small>
                                  {s.category} / {s.location}
                                </small>
                                <strong>{s.name}</strong>
                                <span>
                                  {money(s.cost)}{" "}
                                  <em>
                                    {s.eligible
                                      ? `${s.score}/100 illustrative fit`
                                      : "Over budget"}
                                  </em>
                                </span>
                              </span>
                              <ArrowUpRight size={15} />
                            </button>
                            <button
                              className="av-save"
                              aria-label={`${shortlist.includes(s.id) ? "Remove" : "Shortlist"} ${s.name}`}
                              aria-pressed={shortlist.includes(s.id)}
                              onClick={() => toggleShortlist(s.id)}
                            >
                              <Bookmark
                                size={16}
                                fill={
                                  shortlist.includes(s.id)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="av-empty-inline">
                          <p>Your shortlist is empty.</p>
                          <button onClick={() => setShortOnly(false)}>
                            Explore the fictional inventory{" "}
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="av-match-explanation">
                      <div>
                        <span className="av-mini-label">
                          WHY {chosen.name.toUpperCase()}?
                        </span>
                        <strong>
                          {chosen.score}
                          <small>/100</small>
                        </strong>
                      </div>
                      <div className="av-fit-signals">
                        {chosen.parts.map((p) => (
                          <p key={p.label}>
                            <span
                              className={
                                p.points ? "av-signal-yes" : "av-signal-no"
                              }
                            >
                              {p.points ? <Check size={12} /> : <span>−</span>}
                            </span>
                            <span>
                              <strong>{p.label}</strong>
                              {p.why}
                            </span>
                          </p>
                        ))}
                      </div>
                      <p className="av-tradeoff">
                        <strong>The trade-off</strong>
                        {chosen.tradeoff}
                      </p>
                    </div>
                    <div className="av-results-actions">
                      <button
                        className="av-text-button"
                        onClick={() => {
                          setPair(shortlist.slice(0, 2));
                          setCompare(true);
                        }}
                      >
                        <GitCompareArrows size={16} />
                        Compare two alternatives
                      </button>
                      <button
                        className="av-button av-button-dark"
                        disabled={!chosen.eligible}
                        onClick={prepare}
                      >
                        Prepare inquiry <ArrowRight size={14} />
                      </button>
                    </div>
                    {!chosen.eligible && (
                      <p className="av-footnote">
                        Raise the hypothetical budget or choose another package
                        to prepare a brief.
                      </p>
                    )}
                  </div>
                </div>
              ) : lab === "brief" ? (
                <div className="av-brief-layout">
                  <div>
                    <span className="av-mini-label">
                      SHARED EXPECTATIONS
                    </span>
                    <h4>
                      Better context.
                      <br />
                      Better conversations.
                    </h4>
                    <p>
                      Prepare a draft for <strong>{chosen.name}</strong>. This
                      stays in the prototype; nothing is sent.
                    </p>
                    <div className="av-toggle">
                      <button
                        aria-pressed={view === "brand"}
                        onClick={() => setView("brand")}
                      >
                        Brand view
                      </button>
                      <button
                        aria-pressed={view === "rightsholder"}
                        onClick={() => setView("rightsholder")}
                      >
                        Rightsholder view
                      </button>
                    </div>
                    <dl className="av-brief-facts">
                      <div>
                        <dt>Goal</dt>
                        <dd>{campaign.goal}</dd>
                      </div>
                      <div>
                        <dt>Audience</dt>
                        <dd>{campaign.audience}</dd>
                      </div>
                      <div>
                        <dt>Budget / package</dt>
                        <dd>
                          {money(campaign.budget)} / {money(chosen.cost)}
                        </dd>
                      </div>
                      <div>
                        <dt>Market</dt>
                        <dd>{campaign.location}</dd>
                      </div>
                    </dl>
                    <button
                      className="av-text-button"
                      onClick={() => setLab("match")}
                    >
                      Edit campaign & opportunity <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <div className="av-inquiry-editor">
                    {view === "brand" ? (
                      <>
                        <span className="av-mini-label">
                          YOUR BRIEF / {chosen.name}
                        </span>
                        <label htmlFor="av-inquiry-notes">
                          Timing, activation needs & constraints
                        </label>
                        <textarea
                          id="av-inquiry-notes"
                          value={notes}
                          onChange={(e) => {
                            setNotes(e.target.value);
                            setDraft("");
                          }}
                          rows={5}
                          placeholder="e.g. A spring launch, an on-site sampling team, and a need to confirm category exclusivity."
                          minLength={20}
                        />
                        <p className="av-footnote">
                          Add at least 20 characters. A useful brief includes
                          timing and what the partner needs to confirm.
                        </p>
                        <button
                          className="av-button av-button-dark"
                          disabled={
                            notes.trim().length < 20 || !chosen.eligible
                          }
                          onClick={() => {
                            setDraft(makeBrief(campaign, chosen, notes));
                            setCopied(false);
                          }}
                        >
                          Generate local draft <Send size={14} />
                        </button>
                        {!chosen.eligible && (
                          <p role="status">
                            The selected package exceeds your budget. Edit the
                            campaign first.
                          </p>
                        )}
                        {draft &&
                          draft === makeBrief(campaign, chosen, notes) && (
                            <div className="av-generated-brief" role="status">
                              <pre>{draft}</pre>
                              <button className="av-text-button" onClick={copy}>
                                <Copy size={14} />
                                {copied
                                  ? "Copied"
                                  : copyFailed
                                    ? "Select the draft text to copy"
                                    : "Copy draft"}
                              </button>
                            </div>
                          )}
                      </>
                    ) : (
                      <>
                        <span className="av-mini-label">
                          RECEIVING TEAM / ILLUSTRATIVE RESPONSE VIEW
                        </span>
                        <h5>A brief worth responding to.</h5>
                        <div className="av-readiness-checks">
                          {[
                            "Goal defined",
                            "Audience stated",
                            "Market stated",
                            chosen.eligible
                              ? "Budget fits package"
                              : "Budget needs clarification",
                            notes.trim().length >= 20
                              ? "Timing and requirements added"
                              : "Timing and requirements missing",
                          ].map((s, i) => (
                            <p key={s}>
                              <span>
                                {i < 3 ||
                                (i === 3 && chosen.eligible) ||
                                (i === 4 && notes.trim().length >= 20) ? (
                                  <Check size={15} />
                                ) : (
                                  <span>−</span>
                                )}
                              </span>
                              {s}
                            </p>
                          ))}
                        </div>
                        <p className="av-tradeoff">
                          <strong>Next step to confirm</strong>Availability,
                          category exclusivity, delivery requirements and
                          audience evidence. Completeness is not a guarantee of
                          buyer intent.
                        </p>
                        <label>
                          Proposed response
                          <textarea
                            readOnly
                            rows={4}
                            value={`Thanks for the context. Before preparing a proposal for ${chosen.name}, let’s confirm your dates, category restrictions and activation requirements. We’ll share available inventory and supporting audience information.`}
                          />
                        </label>
                        <p className="av-footnote">
                          Illustrative response. Not delivered to any brand.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="av-outcome-layout">
                  <div>
                    <span className="av-mini-label">
                      FICTIONAL POST-ACTIVATION SCENARIO
                    </span>
                    <h4>
                      What happened.
                      <br />
                      What it means.
                      <br />
                      <span>What comes next.</span>
                    </h4>
                    <p>
                      {chosen.name} / {campaign.goal}
                    </p>
                    <p>
                      These sample outcomes illustrate the reporting format.
                      They are not a forecast from the match score.
                    </p>
                    <div className="av-toggle">
                      <button
                        aria-pressed={view === "brand"}
                        onClick={() => setView("brand")}
                      >
                        Brand interpretation
                      </button>
                      <button
                        aria-pressed={view === "rightsholder"}
                        onClick={() => setView("rightsholder")}
                      >
                        Rightsholder interpretation
                      </button>
                    </div>
                  </div>
                  <div className="av-outcome-report">
                    <span className="av-mini-label">
                      ILLUSTRATIVE REPORT / NO REAL CAMPAIGN
                    </span>
                    <div className="av-outcome-numbers">
                      <div>
                        <strong>1,250</strong>
                        <span>Recorded on-site interactions</span>
                      </div>
                      <div>
                        <strong>3 / 4</strong>
                        <span>Agreed deliverables accepted</span>
                      </div>
                    </div>
                    <div className="av-deliverables">
                      <p>
                        <Check size={14} />
                        Activation space delivered
                      </p>
                      <p>
                        <Check size={14} />
                        Creative placement confirmed
                      </p>
                      <p>
                        <Check size={14} />
                        On-site interaction log received
                      </p>
                      <p>
                        <span>○</span>Audience validation pending
                      </p>
                    </div>
                    <div className="av-outcome-insight">
                      <span className="av-mini-label">
                        {view === "brand"
                          ? "A BRAND DECISION"
                          : "A RIGHTSHOLDER DECISION"}
                      </span>
                      <h5>
                        {view === "brand"
                          ? "Resolve the evidence gap before renewal."
                          : "Close the reporting gap before asking for renewal."}
                      </h5>
                      <p>
                        {view === "brand"
                          ? "Request audience validation and compare delivery to the original objective. Interaction counts do not establish incremental sales or ROI."
                          : "Confirm the remaining deliverable, document counting methodology and agree a joint debrief. Do not turn observed interactions into an unsupported return claim."}
                      </p>
                    </div>
                    <p className="av-footnote">
                      Source: fictional organizer log. No control group,
                      deduplication audit or sales attribution. Example status:
                      awaiting validation.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="av-experiment-measurement">
          <div>
            <span className="av-mini-label">MEASUREMENT</span>
            <p>{exp.measurement}</p>
          </div>
          <div>
            <span className="av-mini-label">DECISION RULE</span>
            <p>{exp.decision}</p>
          </div>
          <details>
            <summary>How I would test this</summary>
            <p>{exp.method}</p>
            <p>
              Guardrails: listing abandonment, brand inquiry abandonment,
              rightsholder workload and spam. Check both participant cohorts; a
              faster buyer action is not a win if partner quality declines. No
              experiment has been run. Targets and timelines are proposed
              starting points to validate with the team, not actual results.
            </p>
          </details>
        </div>
        <Drawer
          open={compare}
          onClose={() => setCompare(false)}
          title="Make the trade-off visible."
          label="FICTIONAL OPPORTUNITY COMPARISON"
        >
          <p>
            Choose two alternatives. Both are evaluated against the same
            campaign settings.
          </p>
          <div className="av-compare-selectors">
            {[0, 1].map((_, i) => (
              <label key={i}>
                {i === 0 ? "Opportunity" : "Compare with"}
                <select
                  value={pair[i] || ""}
                  onChange={(e) =>
                    setPair((p) => {
                      const next = [...p];
                      next[i] = e.target.value;
                      return next;
                    })
                  }
                >
                  <option value="">Choose an opportunity</option>
                  {ranked
                    .filter((s) => s.id !== pair[1 - i])
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                </select>
              </label>
            ))}
          </div>
          {comparisons.length === 2 ? (
            <>
              <div className="av-comparison-table">
                <table>
                  <caption>
                    Illustrative comparison; organizer claims are unverified.
                  </caption>
                  <thead>
                    <tr>
                      <th>Campaign fit</th>
                      {comparisons.map((s) => (
                        <th key={s.id}>{s.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        label: "Category",
                        values: comparisons.map((s) => s.category),
                      },
                      {
                        label: "Package",
                        values: comparisons.map((s) => money(s.cost)),
                      },
                      {
                        label: "Market",
                        values: comparisons.map((s) => s.location),
                      },
                      {
                        label: "Illustrative fit",
                        values: comparisons.map((s) => `${s.score}/100`),
                      },
                      {
                        label: "Included inventory",
                        values: comparisons.map((s) => s.inventory),
                      },
                      {
                        label: "Planning reach",
                        values: comparisons.map(
                          (s) => `${s.reach.toLocaleString()} / unverified`,
                        ),
                      },
                      {
                        label: "Trade-off",
                        values: comparisons.map((s) => s.tradeoff),
                      },
                    ].map((row) => (
                      <tr key={row.label}>
                        <th>{row.label}</th>
                        {row.values.map((v, i) => (
                          <td key={i}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="av-compare-actions">
                {comparisons.map((s) => (
                  <button
                    key={s.id}
                    className="av-button"
                    onClick={() => toggleShortlist(s.id)}
                  >
                    <Bookmark
                      size={14}
                      fill={shortlist.includes(s.id) ? "currentColor" : "none"}
                    />
                    {shortlist.includes(s.id) ? "Saved" : "Save"} {s.name}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="av-empty-inline">
              Select two distinct alternatives to compare their fit and
              limitations.
            </p>
          )}
        </Drawer>
      </div>
    </section>
  );
}
