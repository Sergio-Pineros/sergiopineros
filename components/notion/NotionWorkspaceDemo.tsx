"use client";

import { useState } from "react";
import {
  BookOpenText, Check, ChevronDown, ChevronRight, CircleDot, Database, FileText,
  LayoutList, Lightbulb, MoreHorizontal, Plus, Search, ShieldCheck,
  Sparkles, Table2, X, Pencil, BarChart3, RotateCcw
} from "lucide-react";

type Status = "In review" | "Approved" | "Held" | "Planned";
type Page = "Experiments" | "Meeting notes";
type View = "All" | "In review" | "Approved" | "Learnings";
type Experiment = {
  id: string;
  title: string;
  channel: string;
  hypothesis: string;
  owner: string;
  budget: number;
  spent: number;
  qualified: number;
  activation: number;
  ctr: number;
  cpc: number;
  status: Status;
  trend: string;
  insight: string;
  source: string;
  proposal: number;
  decision?: string;
  custom?: boolean;
};
type Draft = { title: string; channel: string; hypothesis: string; budget: string; owner: string };
type Results = { spent: string; qualified: string; activation: string; ctr: string; cpc: string };

const initial: Experiment[] = [
  {
    id: "EX-01", title: "AI team workspace launch", channel: "LinkedIn Ads",
    hypothesis: "Showing a real team workflow will bring in more qualified trials at an efficient acquisition cost.",
    owner: "Growth marketing", budget: 30000, spent: 11850, qualified: 410,
    activation: 31, ctr: 2.8, cpc: 4.2, status: "In review",
    trend: "Clicks +18% · Activated users +5% · Cost per activation +11%",
    insight: "The creative brings more visitors, and activation increased slightly. Cost per activation also rose. Review attribution and cohort quality before expanding spend.",
    source: "Monday growth sync", proposal: 2000
  },
  {
    id: "EX-02", title: "Guided first workspace", channel: "Paid social",
    hypothesis: "A guided starting workspace will help new users reach their first valuable action.",
    owner: "Lifecycle team", budget: 20000, spent: 9700, qualified: 520,
    activation: 42, ctr: 3.2, cpc: 3.45, status: "Approved",
    trend: "Activation +12% · Cost per qualified trial stable",
    insight: "Activation improved with stable trial acquisition costs. Expand the variant gradually and continue measurement with a holdout.",
    source: "Onboarding review", proposal: 2500,
    decision: "Gradual expansion approved in this example."
  },
  {
    id: "EX-03", title: "High-intent search messaging", channel: "Search ads",
    hypothesis: "More specific search messaging will improve activation efficiency.",
    owner: "Acquisition team", budget: 18000, spent: 8500, qualified: 250,
    activation: 24, ctr: 4.2, cpc: 6.2, status: "Held",
    trend: "Cost per activation +27% · Activation flat",
    insight: "Costs rose without an observed improvement in activation. Save the learning and test another message.",
    source: "Paid acquisition review", proposal: 1500,
    decision: "This variant was held in the example."
  }
];

const blank: Draft = { title: "", channel: "LinkedIn Ads", hypothesis: "", budget: "30000", owner: "Growth marketing" };
const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const preciseMoney = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value);

export default function NotionWorkspaceDemo() {
  const [experiments, setExperiments] = useState<Experiment[]>(initial);
  const [selectedId, setSelectedId] = useState("EX-01");
  const [page, setPage] = useState<Page>("Experiments");
  const [view, setView] = useState<View>("All");
  const [slash, setSlash] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(blank);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [results, setResults] = useState<Results>({ spent: "0", qualified: "0", activation: "0", ctr: "0", cpc: "0" });
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showSlash, setShowSlash] = useState(false);

  const active = experiments.find((experiment) => experiment.id === selectedId) || experiments[0];
  const visible = experiments.filter((item) =>
    view === "All" || (view === "Learnings" ? item.status === "Approved" || item.status === "Held" : item.status === view)
  );
  const spentRatio = active.budget > 0 ? Math.min(100, (active.spent / active.budget) * 100) : 0;
  const activations = Math.round(active.qualified * active.activation / 100);
  const remaining = Math.max(0, active.budget - active.spent);
  const proposal = Math.min(active.proposal, remaining);

  function openNew(fromNote = false) {
    setEditingId(null);
    setDraft(fromNote ? {
      ...blank, title: "Show real team workflows", hypothesis: "Showing a complete team workflow will improve qualified trial activation."
    } : { ...blank });
    setCreateOpen(true);
    setShowSlash(false);
    setSlash("");
  }
  function openEdit() {
    setEditingId(active.id);
    setDraft({ title: active.title, channel: active.channel, hypothesis: active.hypothesis, budget: String(active.budget), owner: active.owner });
    setCreateOpen(true);
  }
  function saveExperiment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const budget = Math.max(1000, Math.round(Number(draft.budget) || 30000));
    if (!draft.title.trim() || !draft.hypothesis.trim()) return;
    if (editingId) {
      setExperiments((previous) => previous.map((item) => item.id === editingId ? {
        ...item, title: draft.title.trim(), channel: draft.channel, hypothesis: draft.hypothesis.trim(), budget, owner: draft.owner.trim() || "Growth marketing"
      } : item));
    } else {
      const id = "EX-" + String(experiments.length + 1).padStart(2, "0");
      const created: Experiment = {
        id, title: draft.title.trim(), hypothesis: draft.hypothesis.trim(), channel: draft.channel,
        owner: draft.owner.trim() || "Growth marketing", budget, spent: 0, qualified: 0,
        activation: 0, ctr: 0, cpc: 0, status: "Planned", trend: "Awaiting campaign results",
        insight: "Connect a performance report and compare outcomes against the hypothesis before recommending a budget decision.",
        source: "Created from /experiment", proposal: 2000, custom: true
      };
      setExperiments((previous) => [...previous, created]);
      setSelectedId(id);
      setView("All");
      setPage("Experiments");
    }
    setCreateOpen(false);
    setEvidenceOpen(false);
  }
  function decide(kind: "approve" | "hold") {
    const decision = kind === "approve"
      ? "Approved a " + money(proposal) + " controlled validation test. Recorded in the experiment."
      : "Kept the current budget allocation. Recorded in the experiment.";
    setExperiments((previous) => previous.map((item) =>
      item.id === active.id ? { ...item, status: kind === "approve" ? "Approved" : "Held", decision } : item
    ));
  }
  function resetDecision() {
    setExperiments((previous) => previous.map((item) =>
      item.id === active.id ? { ...item, status: item.spent > 0 ? "In review" : "Planned", decision: undefined } : item
    ));
  }
  function openResults() {
    setResults({ spent: String(active.spent), qualified: String(active.qualified), activation: String(active.activation), ctr: String(active.ctr), cpc: String(active.cpc) });
    setResultsOpen(true);
  }
  function saveResults(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const spent = Math.min(active.budget, Math.max(0, Number(results.spent) || 0));
    const qualified = Math.max(0, Math.round(Number(results.qualified) || 0));
    const activation = Math.min(100, Math.max(0, Number(results.activation) || 0));
    const ctr = Math.min(100, Math.max(0, Number(results.ctr) || 0));
    const cpc = Math.max(0, Number(results.cpc) || 0);
    setExperiments((previous) => previous.map((item) => item.id === active.id ? {
      ...item, spent, qualified, activation, ctr, cpc, status: spent > 0 ? "In review" : "Planned",
      decision: undefined,
      trend: "Review campaign performance against a baseline",
      insight: "Metrics have been added to this experiment. Validate tracking, cohort mix, attribution and comparison data before approving budget changes."
    } : item));
    setResultsOpen(false);
    setEvidenceOpen(false);
  }
  function chooseExperiment(id: string) {
    setSelectedId(id);
    setPage("Experiments");
    setEvidenceOpen(false);
    setResultsOpen(false);
    setShowDetails(true);
  }

  return (
    <div className="nwx-wrap" aria-label="Interactive Notion-style Experiments prototype">
      <div className="nwx-explainer">
        <div><span className="nwx-eyebrow">Try the product concept</span><h3>Build an experiment inside Notion.</h3></div>
        <p>Use <strong>/experiment</strong>, explore a campaign, review the evidence, and approve the next step. Everything below is interactive.</p>
      </div>

      <div className="nwx-app">
        <aside className="nwx-sidebar" aria-label="Demo workspace sidebar">
          <div className="nwx-workspace-name"><span className="nwx-workspace-avatar">N</span><span>Growth workspace</span><ChevronDown size={16} /></div>
          <div className="nwx-side-group">
            <span className="nwx-side-heading">Teamspace</span>
            <button type="button" className={page === "Experiments" ? "nwx-side-active" : ""} onClick={() => {setPage("Experiments");setView("All");}}><Lightbulb size={18}/> Experiments</button>
            <button type="button" className={page === "Meeting notes" ? "nwx-side-active" : ""} onClick={() => setPage("Meeting notes")}><BookOpenText size={18}/> Meeting notes</button>
            <button type="button" onClick={() => {setPage("Experiments");setView("All");chooseExperiment("EX-01");}}><BarChart3 size={18}/> Campaigns</button>
            <button type="button" onClick={() => {setPage("Experiments");setView("Learnings");}}><Database size={18}/> Learnings</button>
          </div>
          <div className="nwx-side-footer"><Sparkles size={17}/> Notion AI concept</div>
        </aside>

        <div className="nwx-app-main">
          <div className="nwx-topbar"><div className="nwx-breadcrumb"><span>Growth workspace</span><ChevronRight size={15}/><strong>{page}</strong></div><span className="nwx-topbar-meta"><CircleDot size={15}/> Interactive concept</span></div>

          {page === "Meeting notes" ? (
            <div className="nwx-page nwx-note-page">
              <div className="nwx-page-icon">📝</div>
              <h3>Monday growth sync</h3>
              <div className="nwx-note-meta"><span><Sparkles size={16}/> AI Meeting Notes</span><span>Example meeting</span></div>
              <h4>What we learned</h4>
              <p>Team-workflow creative is attracting interest from potential customers. We want to learn whether it brings qualified users who activate.</p>
              <div className="nwx-note-highlight"><Lightbulb size={20}/><div><strong>Experiment idea</strong><p>Test a complete team-workflow example in our LinkedIn acquisition campaign.</p></div></div>
              <button type="button" className="nwx-primary" onClick={() => openNew(true)}><Plus size={18}/> Create experiment from note</button>
              <p className="nwx-hint">The new experiment carries the hypothesis into a structured page.</p>
            </div>
          ) : (
            <div className="nwx-page">
              <div className="nwx-page-icon">🧪</div>
              <div className="nwx-page-heading"><div><h3>Experiments</h3><p>Campaign ideas, evidence, and decisions.</p></div><button type="button" className="nwx-new" onClick={() => openNew()}><Plus size={17}/> New experiment</button></div>

              <div className="nwx-slash-area">
                <div className="nwx-slash-input-row"><Plus size={18}/><input aria-label="Type slash experiment to create a new experiment" value={slash} onFocus={() => setShowSlash(true)} onBlur={() => {}} onChange={(e) => {setSlash(e.target.value);setShowSlash(true);}} onKeyDown={(e) => {if(e.key === "Enter" && slash.includes("/")) {e.preventDefault();openNew();} if(e.key === "Escape")setShowSlash(false);}} placeholder="Type /experiment to add a block..." /></div>
                {showSlash && slash.includes("/") && (
                  <div className="nwx-slash-menu" role="listbox" aria-label="Slash commands">
                    <button type="button" role="option" aria-selected="true" onClick={() => openNew()}>
                      <span className="nwx-slash-icon"><Lightbulb size={19}/></span><span><strong>Experiment</strong><small>Create a linked experiment with properties and evidence</small></span><span className="nwx-enter">↵</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="nwx-database">
                <div className="nwx-db-tabs" role="tablist" aria-label="Experiment views">
                  {(["All","In review","Approved","Learnings"] as View[]).map((tab) => (
                    <button key={tab} role="tab" type="button" aria-selected={view === tab} className={view === tab ? "nwx-tab-active" : ""} onClick={() => setView(tab)}>{tab === "All" && <Table2 size={16}/>} {tab}</button>
                  ))}
                  <button className="nwx-db-add" type="button" onClick={() => openNew()} aria-label="Add an experiment"><Plus size={18}/></button>
                </div>
                <div className="nwx-db-head"><span><LayoutList size={16}/> Name</span><span>Status</span><span>Budget</span></div>
                {visible.length > 0 ? visible.map((item) => (
                  <button type="button" key={item.id} className={"nwx-db-row " + (item.id === active.id ? "nwx-db-selected" : "")} onClick={() => chooseExperiment(item.id)}>
                    <span className="nwx-db-title">🧪 <span>{item.title}</span></span>
                    <span><span className={"nwx-status nwx-status-" + item.status.toLowerCase().replaceAll(" ","-")}>{item.status}</span></span>
                    <span>{money(item.budget)}</span>
                  </button>
                )) : <div className="nwx-empty-view">No experiments in this view yet. <button type="button" onClick={() => setView("All")}>View all experiments</button></div>}
                <button type="button" className="nwx-db-new-row" onClick={() => openNew()}><Plus size={16}/> New</button>
              </div>

              {view === "Learnings" && <div className="nwx-learnings-note"><BookOpenText size={18}/><p>Approved and held decisions become part of the team’s learning history. Select a row to review the evidence.</p></div>}

              <div className="nwx-detail">
                <div className="nwx-detail-header"><div><span className="nwx-detail-label">Experiment page / {active.id}</span><h4>{active.title}</h4><span className={"nwx-status nwx-status-" + active.status.toLowerCase().replaceAll(" ","-")}>{active.status}</span></div><div className="nwx-detail-tools"><button type="button" onClick={openEdit} title="Edit experiment"><Pencil size={16}/> Edit</button><button type="button" onClick={() => setShowDetails((value)=>!value)} aria-expanded={showDetails}><MoreHorizontal size={20}/><span>{showDetails?"Hide":"Show"}</span></button></div></div>
                {showDetails && (
                  <>
                    <div className="nwx-properties">
                      <div><span>Channel</span><strong>{active.channel}</strong></div>
                      <div><span>Owner</span><strong>{active.owner}</strong></div>
                      <div><span>Hypothesis</span><strong>{active.hypothesis}</strong></div>
                      <div><span>Source</span><button type="button" onClick={() => setPage("Meeting notes")}><FileText size={15}/>{active.source}</button></div>
                    </div>

                    <div className="nwx-section-heading"><h5>Campaign performance</h5><button type="button" onClick={openResults}><Pencil size={15}/> Edit metrics</button></div>
                    <div className="nwx-metric-grid">
                      <div><span>Campaign budget</span><strong>{money(active.budget)}</strong></div>
                      <div><span>Spent to date</span><strong>{money(active.spent)}</strong></div>
                      <div><span>Qualified signups</span><strong>{active.spent ? active.qualified.toLocaleString("en-US") : "—"}</strong></div>
                      <div><span>Activation rate</span><strong>{active.spent ? active.activation + "%" : "—"}</strong></div>
                    </div>
                    <div className="nwx-budget-meter"><div><span>Budget used</span><strong>{Math.round(spentRatio)}%</strong></div><div className="nwx-meter-track"><span style={{width:spentRatio+"%"}} /></div><p>{money(remaining)} remains in the campaign budget</p></div>
                    <div className="nwx-secondary-metrics"><span>CTR <strong>{active.spent ? active.ctr + "%" : "—"}</strong></span><span>CPC <strong>{active.spent ? preciseMoney(active.cpc) : "—"}</strong></span><span>Cost / qualified signup <strong>{active.qualified ? preciseMoney(active.spent/active.qualified) : "—"}</strong></span><span>Cost / activated user <strong>{activations ? preciseMoney(active.spent/activations) : "—"}</strong></span></div>

                    <div className="nwx-agent">
                      <div className="nwx-agent-heading"><span><Sparkles size={19}/> Proposed agent review</span><span>Example reasoning</span></div>
                      <h5>{active.spent ? (active.status === "Held" ? "Save the learning." : active.status === "Approved" ? "Review the approved test." : "Validate before scaling.") : "Connect performance data."}</h5>
                      <p>{active.insight}</p>
                      <div className="nwx-trend"><BarChart3 size={17}/>{active.trend}</div>
                      <button type="button" className="nwx-evidence-toggle" aria-expanded={evidenceOpen} onClick={() => setEvidenceOpen(!evidenceOpen)}>Review the evidence <ChevronDown size={17} className={evidenceOpen ? "nwx-up" : ""}/></button>
                      {evidenceOpen && <div className="nwx-evidence"><div><strong>Source context</strong><p>{active.source}: {active.hypothesis}</p></div><div><strong>Checks before scaling</strong><p>Validate attribution, sample size, the comparison cohort, conversion quality and any cost thresholds.</p></div></div>}
                    </div>

                    <div className="nwx-decision">
                      <div className="nwx-decision-head"><ShieldCheck size={22}/><div><h5>Team decision</h5><p>Every change is reviewed and recorded.</p></div></div>
                      {active.decision ? <div className="nwx-decision-done"><Check size={19}/><span>{active.decision}</span><button type="button" onClick={resetDecision}><RotateCcw size={15}/> Reset demo</button></div> :
                        active.spent > 0 && remaining > 0 ? <div className="nwx-decision-action"><p>Proposed: <strong>{money(proposal)}</strong> from the remaining budget for a controlled validation cohort.</p><div className="nwx-decision-buttons"><button type="button" className="nwx-primary" onClick={() => decide("approve")}><Check size={16}/> Approve {money(proposal)}</button><button type="button" className="nwx-secondary" onClick={() => decide("hold")}>Keep current budget</button></div></div> :
                        <div className="nwx-awaiting">Add campaign results to review the next decision.</div>
                      }
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="nwx-demo-disclaimer">Interactive feature concept with fictional campaigns and locally simulated decisions. No live Notion workspace or advertising account is connected.</div>
        </div>

        {createOpen && (
          <div className="nwx-modal-layer">
            <button type="button" aria-label="Close experiment form" className="nwx-modal-backdrop" onClick={() => setCreateOpen(false)} />
            <form className="nwx-modal" onSubmit={saveExperiment}>
              <div className="nwx-modal-header"><span>🧪 {editingId ? "Edit experiment" : "New experiment"}</span><button type="button" onClick={() => setCreateOpen(false)} aria-label="Close"><X size={19}/></button></div>
              <h4>{editingId ? "Update experiment" : "Create an experiment"}</h4>
              <p>Each experiment becomes a page with linked context, metrics and a decision history.</p>
              <label>Experiment name<input required maxLength={100} value={draft.title} onChange={(e)=>setDraft((previous)=>({...previous,title:e.target.value}))} placeholder="e.g. Team workflow launch" /></label>
              <label>Hypothesis<textarea required rows={3} value={draft.hypothesis} onChange={(e)=>setDraft((previous)=>({...previous,hypothesis:e.target.value}))} placeholder="What do you want to learn?" /></label>
              <div className="nwx-modal-fields"><label>Channel<select value={draft.channel} onChange={(e)=>setDraft((previous)=>({...previous,channel:e.target.value}))}><option>LinkedIn Ads</option><option>Paid social</option><option>Search ads</option><option>Lifecycle</option><option>Product</option></select></label><label>Budget (USD)<input inputMode="numeric" type="number" min="1000" step="500" required value={draft.budget} onChange={(e)=>setDraft((previous)=>({...previous,budget:e.target.value}))}/></label></div>
              <label>Owner<input value={draft.owner} onChange={(e)=>setDraft((previous)=>({...previous,owner:e.target.value}))}/></label>
              <div className="nwx-modal-actions"><button type="button" className="nwx-secondary" onClick={()=>setCreateOpen(false)}>Cancel</button><button type="submit" className="nwx-primary">{editingId ? "Save changes" : "Create experiment"}</button></div>
            </form>
          </div>
        )}
        {resultsOpen && (
          <div className="nwx-modal-layer">
            <button type="button" aria-label="Close metrics form" className="nwx-modal-backdrop" onClick={()=>setResultsOpen(false)} />
            <form className="nwx-modal" onSubmit={saveResults}>
              <div className="nwx-modal-header"><span><BarChart3 size={18}/> Campaign metrics</span><button type="button" onClick={()=>setResultsOpen(false)} aria-label="Close"><X size={19}/></button></div>
              <h4>Update campaign results</h4>
              <p>Try new numbers and review the updated performance cards.</p>
              <div className="nwx-modal-fields">
                {([["spent","Spend to date ($)"],["qualified","Qualified signups"],["activation","Activation rate (%)"],["ctr","CTR (%)"],["cpc","CPC ($)"]] as const).map(([key,label])=><label key={key}>{label}<input type="number" min="0" step={key==="qualified" ? "1" : "0.01"} value={results[key]} onChange={(e)=>setResults((previous)=>({...previous,[key]:e.target.value}))}/></label>)}
              </div>
              <div className="nwx-modal-actions"><button type="button" className="nwx-secondary" onClick={()=>setResultsOpen(false)}>Cancel</button><button type="submit" className="nwx-primary">Save results</button></div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
