"use client";
import { useRef, useState, PointerEvent, KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Box, Grid2X2, RotateCcw, Focus } from "lucide-react";
import { Opportunity, Side, Stage, stages } from "@/lib/anvara/data";
import { requirements } from "@/lib/anvara/requirements";
import { clamp, priority, quadrant, roadmap } from "@/lib/anvara/model";
import { useExploration } from "./State";
import Scene from "./Scene";
import Drawer from "./Drawer";
const px = (o: Opportunity) => 96 + ((o.effort - 1) / 9) * 808;
const py = (o: Opportunity) => 482 - ((o.impact - 1) / 9) * 390;
function layout(data: Opportunity[]) {
  const placed: { x: number; y: number; w: number }[] = [];
  return data.map((o) => {
    const w = Math.min(176, o.short.length * 7 + 20);
    const x = Math.max(100, Math.min(900 - w, px(o) + 15));
    // Keep labels away from the quadrant captions at the top and bottom.
    const candidates = Array.from({ length: 21 }, (_, i) => 100 + i * 18).sort(
      (a, b) => Math.abs(a - (py(o) - 15)) - Math.abs(b - (py(o) - 15)),
    );
    const y =
      candidates.find(
        (y) =>
          !placed.some(
            (p) =>
              Math.abs(p.y - y) < 25 && x < p.x + p.w + 6 && x + w + 6 > p.x,
          ),
      ) ?? candidates[0];
    placed.push({ x, y, w });
    return { ...o, lx: x, ly: y, lw: w };
  });
}
function Matrix({ data }: { data: Opportunity[] }) {
  const { update, select, selected } = useExploration();
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<string | null>(null);
  function move(e: PointerEvent<SVGSVGElement>) {
    if (!drag.current || !svg.current) return;
    const matrix = svg.current.getScreenCTM();
    if (!matrix) return;
    const point = new DOMPoint(e.clientX, e.clientY).matrixTransform(
      matrix.inverse(),
    );
    update(drag.current, {
      effort: clamp(1 + ((point.x - 96) / 808) * 9),
      impact: clamp(1 + ((482 - point.y) / 390) * 9),
    });
  }
  function key(e: KeyboardEvent<SVGGElement>, o: Opportunity) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(o.id);
    }
    if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      update(o.id, {
        effort:
          o.effort +
          (e.key === "ArrowRight" ? 0.5 : e.key === "ArrowLeft" ? -0.5 : 0),
        impact:
          o.impact +
          (e.key === "ArrowUp" ? 0.5 : e.key === "ArrowDown" ? -0.5 : 0),
      });
    }
  }
  return (
    <svg
      ref={svg}
      className="av-matrix"
      viewBox="0 0 1000 565"
      role="group"
      aria-label="Effort versus value matrix. Select a point; arrow keys adjust estimates."
      onPointerMove={move}
      onPointerUp={() => {
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
    >
      <defs>
        <linearGradient id="matrix-fill" x2="1" y2="1">
          <stop stopColor="#f3f6ff" />
          <stop offset="1" stopColor="#fbfaff" />
        </linearGradient>
        <radialGradient id="point-halo">
          <stop stopColor="#7182ee" stopOpacity=".25" />
          <stop offset="1" stopColor="#7182ee" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect
        x="65"
        y="45"
        width="870"
        height="468"
        rx="16"
        fill="url(#matrix-fill)"
        stroke="#e0e5f1"
      />
      <path
        d="M500 45V513 M65 279H935"
        stroke="#cbd2e3"
        strokeDasharray="5 6"
      />
      <g className="av-quadrants">
        <text x="87" y="76">
          Quick Wins
        </text>
        <text x="520" y="76">
          Strategic Bets
        </text>
        <text x="87" y="493">
          Nice to Have
        </text>
        <text x="520" y="493">
          Reconsider / Later
        </text>
      </g>
      <g className="av-chart-axes">
        <text x="65" y="550">
          Low effort
        </text>
        <text x="935" y="550" textAnchor="end">
          High effort →
        </text>
        <text transform="translate(25 70) rotate(-90)" textAnchor="end">
          Value →
        </text>
        <text x="935" y="25" textAnchor="end">
          Illustrative estimates · 1 to 10
        </text>
      </g>
      {layout(data).map((o) => (
        <g
          key={o.id}
          role="button"
          tabIndex={0}
          aria-pressed={selected === o.id}
          aria-label={`${o.title}: effort ${o.effort}, value ${o.impact}, ${quadrant(o)}. Arrow keys adjust.`}
          onKeyDown={(e) => key(e, o)}
          onClick={() => select(o.id)}
          onPointerDown={(e) => {
            e.preventDefault();
            drag.current = o.id;
            select(o.id);
            svg.current?.setPointerCapture(e.pointerId);
          }}
          className="av-chart-point"
        >
          <title>{`${o.title} · ${quadrant(o)}`}</title>
          <motion.circle
            animate={{ cx: px(o), cy: py(o), r: selected === o.id ? 32 : 22 }}
            transition={{ duration: 0.25 }}
            fill="url(#point-halo)"
          />
          <motion.path
            className="av-point-leader"
            animate={{ d: `M${px(o)},${py(o)} L${o.lx},${o.ly + 4}` }}
            stroke="#b7c0d7"
            fill="none"
          />
          <motion.circle
            animate={{ cx: px(o), cy: py(o) }}
            transition={{ duration: 0.2 }}
            r={selected === o.id ? 9 : 6}
            fill={
              o.side === "brand"
                ? "#2369e8"
                : o.side === "rightsholder"
                  ? "#6439cf"
                  : "#646bd2"
            }
            stroke="white"
            strokeWidth="3"
          />
          <motion.text
            className="av-point-label"
            animate={{ x: o.lx, y: o.ly }}
            transition={{ duration: 0.2 }}
            fill={selected === o.id ? "#151a34" : "#505b73"}
          >
            {o.short}
          </motion.text>
        </g>
      ))}
    </svg>
  );
}

// The phone chart uses its own viewBox so labels and touch targets stay legible.
// Its coordinates and selection come from the same opportunity model as desktop.
function MobileMatrix({ data }: { data: Opportunity[] }) {
  const { select, selected } = useExploration();
  return (
    <svg
      className="av-matrix-mobile"
      viewBox="0 0 400 338"
      role="group"
      aria-label="Effort versus value. Tap a point or select an opportunity below."
    >
      <rect
        x="28"
        y="18"
        width="344"
        height="274"
        rx="14"
        fill="#f5f7ff"
        stroke="#dce3f1"
      />
      <path
        d="M200 18V292 M28 155H372"
        stroke="#cbd2e3"
        strokeDasharray="4 5"
      />
      <g className="av-mobile-quadrants">
        <text x="40" y="42">
          Quick wins
        </text>
        <text x="212" y="42">
          Strategic bets
        </text>
        <text x="40" y="280">
          Nice to have
        </text>
        <text x="212" y="280">
          Reconsider / later
        </text>
      </g>
      {data.map((o) => {
        const x = 51 + ((o.effort - 1) / 9) * 298;
        const y = 258 - ((o.impact - 1) / 9) * 205;
        return (
          <g
            key={o.id}
            role="button"
            tabIndex={0}
            aria-pressed={selected === o.id}
            aria-label={`${o.title}: effort ${o.effort}, value ${o.impact}, ${quadrant(o)}. Select to edit.`}
            onClick={() => select(o.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                select(o.id);
              }
            }}
          >
            <circle cx={x} cy={y} r="21" fill="transparent" />
            <circle
              cx={x}
              cy={y}
              r={selected === o.id ? 14 : 12}
              fill={
                o.side === "brand"
                  ? "#2369e8"
                  : o.side === "rightsholder"
                    ? "#6439cf"
                    : "#5965c9"
              }
              stroke="#fff"
              strokeWidth="2"
            />
          </g>
        );
      })}
      <g className="av-mobile-axes">
        <text x="28" y="12">
          Value ↑
        </text>
        <text x="28" y="320">
          Low effort
        </text>
        <text x="372" y="320" textAnchor="end">
          High effort →
        </text>
      </g>
    </svg>
  );
}
export function DecisionSpace({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const { data, selected, select, update, reset } = useExploration();
  const [side, setSide] = useState<Side | "all">("all");
  const [stage, setStage] = useState<Stage | "all">("all");
  const [mode, setMode] = useState<"2d" | "3d">("2d");
  const [visited, setVisited] = useState(false);
  const [camera, setCamera] = useState(0);
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const featuredIds = ["rationale", "quality", "brief", "comparison", "readiness"];
  const available = featuredOnly ? data.filter((o) => featuredIds.includes(o.id) || o.id === selected) : data;
  const filtered = available.filter(
    (o) =>
      (side === "all" || o.side === side || o.side === "both") &&
      (stage === "all" || o.stage === stage),
  );
  const active = data.find((o) => o.id === selected)!;
  const peek = data.find((o) => o.id === hover);
  function filterSide(value: typeof side) {
    setSide(value);
    const first = available.find(
      (o) =>
        (value === "all" || o.side === value || o.side === "both") &&
        (stage === "all" || o.stage === stage),
    );
    if (
      first &&
      !filtered.some(
        (o) =>
          o.id === selected &&
          (value === "all" || o.side === value || o.side === "both"),
      )
    )
      select(first.id);
  }
  return (
    <section id="decisions" className="av-section av-decision-section">
      <div className="av-wrap">
        <div className="av-section-intro">
          <div>
            <p className="av-kicker">WHICH IDEA FIRST?</p>
            <h2>
              Which ideas should we test?
              <br />
              <span>Start with what we know.</span>
            </h2>
          </div>
          <p>
            Compare possible improvements by value, effort and evidence.
            <br />
            The scores are assumptions, not research findings.
          </p>
        </div>
        <div className="av-decision-shell">
          <div className="av-workspace-toolbar">
            <div className="av-toggle" aria-label="Visualization mode">
              {(["2d", "3d"] as const).map((v) => (
                <button
                  key={v}
                  aria-pressed={mode === v}
                  onClick={() => {
                    setMode(v);
                    setVisited(true);
                  }}
                >
                  {v === "2d" ? <Grid2X2 size={14} /> : <Box size={14} />}{" "}
                  {v === "2d" ? "2D Matrix" : "3D Decision Space"}
                </button>
              ))}
            </div>
            <button className="av-text-button" onClick={reset}>
              <RotateCcw size={13} />
              Reset estimates
            </button>
          </div>
          <div className="av-filter-row">
            <div
              className="av-participants"
              aria-label="Marketplace participant"
            >
              {(["all", "brand", "rightsholder"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => filterSide(s)}
                  aria-pressed={side === s}
                >
                  {s === "all"
                    ? "Both sides"
                    : s === "brand"
                      ? "Brands"
                      : "Rightsholders"}
                </button>
              ))}
            </div>
            <label>
              Journey{" "}
              <select
                value={stage}
                onChange={(e) => {
                  const val = e.target.value as Stage | "all";
                  setStage(val);
                  const first = available.find(
                    (o) =>
                      (side === "all" ||
                        o.side === side ||
                        o.side === "both") &&
                      (val === "all" || o.stage === val),
                  );
                  if (first) select(first.id);
                }}
              >
                <option value="all">All stages</option>
                {stages.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="av-decision-body">
            <div className={`av-plot ${mode === "3d" ? "is-spatial" : ""}`}>
              {visited && (
                <div className="av-prism-canvas">
                  <Scene
                    variant="prism"
                    data={filtered}
                    flat={mode === "2d"}
                    selected={selected}
                    onSelect={select}
                    resetKey={camera}
                    focus={focus}
                  />
                </div>
              )}
              <AnimatePresence>
                {mode === "2d" && (
                  <motion.div
                    className="av-matrix-layer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                  >
                    <Matrix data={filtered} />
                    <MobileMatrix data={filtered} />
                  </motion.div>
                )}
              </AnimatePresence>
              {!filtered.length && (
                <div className="av-empty">
                  No opportunities in this combination.
                  <button
                    onClick={() => {
                      setSide("all");
                      setStage("all");
                    }}
                  >
                    Show all opportunities
                  </button>
                </div>
              )}
              <div className="av-plot-footer">
                <span>
                  {mode === "2d" ? (
                    <>
                      <span className="av-desktop-instructions">
                        Drag a point, or select it to edit below.
                      </span>
                      <span className="av-mobile-instructions">
                        Tap a point; use the sliders below to adjust.
                      </span>
                    </>
                  ) : (
                    "Rotate the space · Select a point to inspect"
                  )}
                </span>
                {mode === "3d" && (
                  <div>
                    <button
                      title="Focus the selected point"
                      aria-pressed={focus}
                      onClick={() => setFocus((v) => !v)}
                    >
                      <Focus size={15} />
                      <span>Focus</span>
                    </button>
                    <button
                      title="Reset camera"
                      aria-label="Reset camera"
                      onClick={() => {
                        setFocus(false);
                        setCamera((v) => v + 1);
                      }}
                    >
                      <RotateCcw size={15} />
                    </button>
                  </div>
                )}
              </div>
              <div className="av-chart-preview" aria-live="polite">
                {peek
                  ? `${peek.title} · Value ${peek.impact} / Effort ${peek.effort} / Evidence ${peek.confidence}`
                  : "Blue: brand · Violet: rightsholder · Indigo: both"}
              </div>
            </div>
            <aside className="av-hypothesis" aria-label="Selected opportunity">
              <span className="av-mini-label">
                {active.stage} /{" "}
                {active.side === "both" ? "Shared value" : active.side}
              </span>
              <h3>{active.title}</h3>
              <span className="av-status">{quadrant(active)} · Proposed</span>
              <p className="av-problem">{active.problem}</p>
              <span className="av-mini-label">THE HYPOTHESIS</span>
              <p>{active.hypothesis}</p>
              <div className="av-estimates">
                {(
                  [
                    {
                      key: "effort",
                      label: "Effort",
                      hint: "Implementation complexity. Higher means more effort.",
                    },
                    {
                      key: "impact",
                      label: "Value",
                      hint: "Expected user and business value, not a measured outcome.",
                    },
                    {
                      key: "confidence",
                      label: "Evidence",
                      hint: "Confidence in the hypothesis. All initial scores are assumptions; no internal research was available.",
                    },
                  ] as const
                ).map(({ key, label, hint }) => (
                  <label key={key} title={hint}>
                    <span>
                      {label}
                      <small>{hint}</small>
                    </span>
                    <output>
                      {active[key]}
                      <small>/10</small>
                    </output>
                    <input
                      aria-label={`${label} estimate for ${active.title}`}
                      type="range"
                      min="1"
                      max="10"
                      step=".5"
                      value={active[key]}
                      onChange={(e) =>
                        update(active.id, { [key]: Number(e.target.value) })
                      }
                    />
                  </label>
                ))}
              </div>
              <span className="av-mini-label">MEASURE</span>
              <p className="av-metric-text">{active.metrics[0]}</p>
              <details>
                <summary>Assumptions & dependencies</summary>
                <ul>
                  {active.assumptions.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <p>
                  Depends on:{" "}
                  {active.dependencies.length
                    ? active.dependencies
                        .map((id) => data.find((o) => o.id === id)?.title)
                        .join(", ")
                    : "No modeled feature dependencies."}
                </p>
              </details>
            </aside>
          </div>
          <div
            className="av-opportunity-index"
            aria-label="All visible opportunities"
          >
            {filtered.map((o) => (
              <button
                key={o.id}
                aria-pressed={selected === o.id}
                onMouseEnter={() => setHover(o.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(o.id)}
                onBlur={() => setHover(null)}
                onClick={() => select(o.id)}
              >
                {o.short}

              </button>
            ))}
          </div>
        </div>
        <p className="av-footnote">
          Adjust the sliders to explore different priorities. Your changes stay in this browser.
        </p>
      </div>
    </section>
  );
}
export function Roadmap({ onOpenMatrix }: { onOpenMatrix: () => void }) {
  const { data, select } = useExploration();
  const plan = roadmap(data);
  const [spec, setSpec] = useState(false);
  const top = plan.top;
  const req = requirements[top.id];
  return (
    <section id="roadmap" className="av-section av-roadmap">
      <div className="av-wrap">
        <div className="av-section-intro">
          <div>
            <p className="av-kicker">FROM REASONING TO REQUIREMENTS</p>
            <h2>
              A possible plan.
              <br />
              <span>Start by talking to customers.</span>
            </h2>
          </div>
          <p>
            Change estimates in the matrix to see a suggested order.
            <br />
            Real customer research and engineering input would change the plan.
          </p>
        </div>
        <div className="av-roadmap-grid">
          {[
            {
              label: "Now",
              title: "Check if the problem is real",
              timing: "Weeks 1 to 2",
              action:
                "Talk to five brands and five rightsholders. Review recent inquiries with sales to see what information is missing and where deals stall.",
              items: plan.now,
              empty: "No high-value candidates require validation.",
            },
            {
              label: "Next",
              title: "Prototype the strongest candidate",
              timing: "Weeks 3 to 6, if ready",
              action:
                "Build a small prototype of the strongest idea. Agree on what to measure and check that it does not create more work for the other side.",
              items: plan.next,
              empty:
                "Await evidence. No candidate clears the readiness gate yet.",
            },
            {
              label: "Later",
              title: "Revisit after learning",
              timing: "Week 7+ / after testing",
              action:
                "Review the test results once enough time has passed. Decide whether to expand, change or stop.",
              items: plan.later,
              empty: "No lower-value candidates in this scenario.",
            },
          ].map((phase) => (
            <div className="av-roadmap-phase" key={phase.label}>
              <div className="av-phase-label">
                {phase.label}

              </div>
              <h3>{phase.title}</h3>
              <p className="av-phase-plan">
                <strong>{phase.timing}</strong>
                {phase.action}
              </p>
              {phase.items.length ? (
                phase.items.slice(0, 3).map((o) => (
                  <a key={o.id} href="#decisions" onClick={(e) => { e.preventDefault(); select(o.id); onOpenMatrix(); }}>
                    {o.short}
                    <small>
                      {o.confidence}/10 evidence · {o.dependencies.length}{" "}
                      {o.dependencies.length === 1
                        ? "dependency"
                        : "dependencies"}
                    </small>

                  </a>
                ))
              ) : (
                <p>{phase.empty}</p>
              )}
              {phase.items.length > 3 && (
                <small>
                  + {phase.items.length - 3} candidates; inspect the matrix
                </small>
              )}
            </div>
          ))}
        </div>
        <div className="av-priority-note">
          <p>
            <strong>How the suggestion works.</strong> Rank by value ×
            (confidence ÷ 10) ÷ effort. Value ≥ 5.5 enters validation.
            Confidence ≥ 6, including every dependency, unlocks prototyping.
            These thresholds and timeframes are working assumptions; recruiting,
            evidence and engineering estimates may change the sequence.
          </p>
          <button
            className="av-button av-button-dark"
            onClick={() => setSpec(true)}
          >
            Read the leading candidate’s brief
          </button>
        </div>
        <p className="av-footnote">
          Current leading candidate: {top.title} · score{" "}
          {priority(top).toFixed(2)}. A ranking suggests where to learn; it does
          not establish customer demand.
        </p>
        <Drawer
          open={spec}
          onClose={() => setSpec(false)}
          title={top.title}
          label="PRODUCT REQUIREMENTS / WORKING DRAFT"
        >
          <p className="av-drawer-lead">{top.problem}</p>
          <div className="av-spec-block">
            <h4>Target users & job to be done</h4>
            <p>
              {top.side === "brand"
                ? "Brand campaign planners"
                : top.side === "rightsholder"
                  ? "Rightsholder partnership teams"
                  : "Brand planners and rightsholder partnership teams"}{" "}
              at the {top.stage.toLowerCase()} stage. {req.job}
            </p>
          </div>
          <div className="av-spec-block">
            <h4>Hypothesis & scope</h4>
            <p>{top.hypothesis}</p>
            <p>{req.scope}</p>
          </div>
          <div className="av-spec-block">
            <h4>User stories</h4>
            <ul>
              {req.stories.map((story) => (
                <li key={story}>{story}</li>
              ))}
            </ul>
          </div>
          <div className="av-spec-block">
            <h4>Acceptance criteria</h4>
            <ul>
              {req.acceptance.map((criterion) => (
                <li key={criterion}>{criterion}</li>
              ))}
              <li>
                All controls work by keyboard and at 360px; missing data,
                loading and failure states preserve the user’s work.
              </li>
            </ul>
          </div>
          <div className="av-spec-block">
            <h4>Dependencies & edge cases</h4>
            <p>
              {top.dependencies.length
                ? top.dependencies
                    .map((id) => data.find((d) => d.id === id)?.title)
                    .join("; ")
                : "No feature dependencies modeled. Confirm source-field ownership with engineering."}
            </p>
            <p>
              Handle withdrawn inventory, changed prices, duplicate actions, no
              eligible options, unsupported locations and partial data. Preserve
              input after recoverable errors; do not silently replace a selected
              package.
            </p>
          </div>
          <div className="av-spec-block">
            <h4>Instrumentation & validation</h4>
            <p>{top.metrics.join("; ")}.</p>
            <p>
              Proposed event: {top.id}_experience_viewed. Include anonymous
              campaign ID, opportunity ID, actor side, experiment variant,
              schema version, UTC timestamp and event ID. Validate schemas and
              deduplicate server-side; exclude staff, bots and test traffic.
            </p>
            <p>
              Interview 5 brands and 5 rightsholders as a directional first
              pass, audit recent examples with sales, establish a baseline, then
              agree a test design and sample size. These activities have not
              been conducted.
            </p>
          </div>
          <div className="av-spec-block">
            <h4>Risks & open questions</h4>
            <ul>
              {top.assumptions.map((a) => (
                <li key={a}>{a}</li>
              ))}
              <li>
                What would disprove the hypothesis? Stop if comprehension does
                not improve, partner relevance declines or completion drops
                materially.
              </li>
              <li>Who owns data freshness and the operational follow-up?</li>
            </ul>
          </div>
        </Drawer>
      </div>
    </section>
  );
}
