export type Side = "brand" | "rightsholder" | "both";
export type Stage = "Discover" | "Evaluate" | "Connect" | "Execute" | "Measure";
export type Opportunity = {
  id: string;
  title: string;
  short: string;
  problem: string;
  side: Side;
  stage: Stage;
  hypothesis: string;
  impact: number;
  effort: number;
  confidence: number;
  assumptions: string[];
  dependencies: string[];
  metrics: string[];
  status: "Proposed experiment";
};
const proposed = "Proposed experiment" as const;
export const opportunities: Opportunity[] = [
  {
    id: "rationale",
    title: "Explainable Match Rationale",
    short: "Match rationale",
    problem:
      "A relevant recommendation can still leave a buyer unsure why it fits.",
    side: "brand",
    stage: "Evaluate",
    hypothesis:
      "Showing the strongest fit signals and an explicit trade-off will help buyers take a more informed next step.",
    impact: 9,
    effort: 4,
    confidence: 4,
    assumptions: [
      "Buyers struggle to interpret fit, rather than simply lack relevant inventory.",
      "Audience, budget and location data are sufficiently trustworthy.",
    ],
    dependencies: ["quality"],
    metrics: [
      "Campaigns with a qualified inquiry within 14 days / eligible campaigns exposed",
      "Median time to first meaningful action",
      "Rightsholder-reported inquiry relevance",
    ],
    status: proposed,
  },
  {
    id: "comparison",
    title: "Opportunity Comparison",
    short: "Comparison",
    problem:
      "Buyers must reconcile different packages before making a trade-off.",
    side: "brand",
    stage: "Evaluate",
    hypothesis:
      "A consistent comparison of inclusions, fit and uncertainty will make shortlists more intentional.",
    impact: 8,
    effort: 6,
    confidence: 3,
    assumptions: [
      "Comparable package attributes exist.",
      "Comparison reduces ambiguity without suggesting false equivalence.",
    ],
    dependencies: ["quality", "collections"],
    metrics: [
      "Shortlisted opportunities / viewed opportunities",
      "Qualified inquiry progression from compared pairs",
    ],
    status: proposed,
  },
  {
    id: "quality",
    title: "Listing Information Quality",
    short: "Listing quality",
    problem:
      "Incomplete inventory information can shift clarification work onto both parties.",
    side: "rightsholder",
    stage: "Discover",
    hypothesis:
      "A lightweight completeness prompt will improve decision-useful information without increasing listing abandonment.",
    impact: 8,
    effort: 3,
    confidence: 5,
    assumptions: [
      "Important missing fields can be identified through review.",
      "Rightsholders can provide the requested detail.",
    ],
    dependencies: [],
    metrics: [
      "Listings with required decision fields / active listings",
      "Listing completion rate",
      "Clarification requests per inquiry",
    ],
    status: proposed,
  },
  {
    id: "readiness",
    title: "Buyer Readiness Checklist",
    short: "Buyer readiness",
    problem:
      "A brand may start a conversation before defining its own requirements.",
    side: "brand",
    stage: "Connect",
    hypothesis:
      "A short optional readiness check will help brands state budget, timing and activation needs.",
    impact: 6,
    effort: 2,
    confidence: 4,
    assumptions: ["The checklist feels useful rather than obstructive."],
    dependencies: [],
    metrics: [
      "Brief completion rate",
      "Inquiry abandonment",
      "Rightsholder-rated readiness",
    ],
    status: proposed,
  },
  {
    id: "brief",
    title: "Qualified Inquiry Brief",
    short: "Inquiry brief",
    problem: "Rightsholders need enough context to respond meaningfully.",
    side: "both",
    stage: "Connect",
    hypothesis:
      "A structured, editable brief will reduce avoidable back-and-forth and improve proposal progression.",
    impact: 9,
    effort: 5,
    confidence: 4,
    assumptions: ["A small common brief can cover varied sponsorship formats."],
    dependencies: ["readiness"],
    metrics: [
      "Qualified inquiries / all inquiries",
      "Median business hours to first substantive response",
      "Inquiries reaching proposal / eligible inquiries",
    ],
    status: proposed,
  },
  {
    id: "response",
    title: "Response Coordination",
    short: "Response coordination",
    problem: "Unclear ownership can leave an interested partner waiting.",
    side: "rightsholder",
    stage: "Connect",
    hypothesis:
      "Visible response ownership and next steps will reduce unanswered qualified inquiries.",
    impact: 7,
    effort: 7,
    confidence: 3,
    assumptions: [
      "Response delay is operational, not a deliberate lack of interest.",
    ],
    dependencies: ["brief"],
    metrics: [
      "Unanswered qualified inquiries after 2 business days",
      "Median first substantive response time",
    ],
    status: proposed,
  },
  {
    id: "milestones",
    title: "Activation Milestone Visibility",
    short: "Activation milestones",
    problem:
      "Brands and properties may interpret the next deliverable differently.",
    side: "both",
    stage: "Execute",
    hypothesis:
      "Shared deliverables with owners and dates will reduce execution ambiguity.",
    impact: 8,
    effort: 8,
    confidence: 3,
    assumptions: ["Both parties will maintain shared milestone information."],
    dependencies: ["brief"],
    metrics: [
      "On-time accepted milestones / due milestones",
      "Disputes per activation",
    ],
    status: proposed,
  },
  {
    id: "summary",
    title: "Outcome Summary",
    short: "Outcome summary",
    problem: "Activity totals alone may not tell a partner what to do next.",
    side: "both",
    stage: "Measure",
    hypothesis:
      "A goal-linked summary that separates observed activity from attribution will support clearer follow-up decisions.",
    impact: 7,
    effort: 6,
    confidence: 2,
    assumptions: [
      "Partners can supply sufficiently consistent reporting.",
      "Renewal decisions can be observed over an appropriate sales cycle.",
    ],
    dependencies: ["milestones"],
    metrics: [
      "Reports completed / activations ended",
      "Renewal intent response rate",
      "Repeat qualified engagement at 90 days",
    ],
    status: proposed,
  },
  {
    id: "collections",
    title: "Saved Opportunity Collections",
    short: "Saved collections",
    problem: "A brand may lose the context behind an earlier consideration.",
    side: "brand",
    stage: "Evaluate",
    hypothesis:
      "Campaign-level saved collections with notes will help teams revisit decisions.",
    impact: 5,
    effort: 3,
    confidence: 4,
    assumptions: ["Research occurs across multiple sessions."],
    dependencies: [],
    metrics: [
      "Campaigns revisiting a saved opportunity within 14 days",
      "Collection-to-qualified-inquiry rate",
    ],
    status: proposed,
  },
  {
    id: "feedback",
    title: "Post-Deal Feedback Loop",
    short: "Post-deal feedback",
    problem:
      "Feedback can stay in individual conversations rather than inform product decisions.",
    side: "both",
    stage: "Measure",
    hypothesis:
      "A concise two-sided debrief, reviewed with sales, will surface repeated execution friction.",
    impact: 4,
    effort: 7,
    confidence: 3,
    assumptions: [
      "Both sides will share candid feedback.",
      "Sales can contribute context without treating anecdotes as prevalence.",
    ],
    dependencies: ["summary"],
    metrics: [
      "Two-sided debrief coverage",
      "Recurring friction themes validated in interviews",
    ],
    status: proposed,
  },
];
export const stages: Stage[] = [
  "Discover",
  "Evaluate",
  "Connect",
  "Execute",
  "Measure",
];
export const journey: Record<
  Stage,
  {
    brand: string;
    rightsholder: string;
    friction: string;
    opportunity: string;
    metric: string;
    interfaceTitle: string;
  }
> = {
  Discover: {
    brand: "Find an audience worth reaching.",
    rightsholder: "Make valuable inventory legible.",
    friction: "Missing context makes relevance harder to judge.",
    opportunity: "quality",
    metric: "Decision-ready listing coverage",
    interfaceTitle: "A useful first impression",
  },
  Evaluate: {
    brand: "Understand the fit and the trade-offs.",
    rightsholder: "Communicate value credibly.",
    friction: "A match score cannot answer every buyer question.",
    opportunity: "rationale",
    metric: "Qualified inquiry per eligible campaign",
    interfaceTitle: "A reason to feel confident",
  },
  Connect: {
    brand: "Share a clear, realistic brief.",
    rightsholder: "Respond with a relevant proposal.",
    friction: "An interested buyer is not always a ready buyer.",
    opportunity: "brief",
    metric: "Time to substantive response",
    interfaceTitle: "A better first conversation",
  },
  Execute: {
    brand: "Know what happens next.",
    rightsholder: "Deliver the agreed activation.",
    friction: "Owners, assets and deadlines can become ambiguous.",
    opportunity: "milestones",
    metric: "On-time accepted milestones",
    interfaceTitle: "One shared next step",
  },
  Measure: {
    brand: "Decide what to repeat or change.",
    rightsholder: "Demonstrate delivery and learn.",
    friction: "Observed activity is not proof of incremental sales.",
    opportunity: "summary",
    metric: "Reporting coverage + repeat engagement",
    interfaceTitle: "An outcome with context",
  },
};
export type Campaign = {
  budget: number;
  audience: string;
  location: string;
  goal: string;
};
export const defaultCampaign: Campaign = {
  budget: 40000,
  audience: "Young professionals",
  location: "New York",
  goal: "Brand awareness",
};
export type Sponsorship = {
  id: string;
  name: string;
  category: string;
  location: string;
  audiences: string[];
  goals: string[];
  cost: number;
  reach: number;
  inventory: string;
  tradeoff: string;
  color: string;
};
export const sponsorships: Sponsorship[] = [
  {
    id: "harbor",
    name: "Harbor City FC",
    category: "Professional sports",
    location: "New York",
    audiences: ["Young professionals", "Sports fans"],
    goals: ["Brand awareness", "Community engagement"],
    cost: 35000,
    reach: 18000,
    inventory: "Concourse activation + match-day screens",
    tradeoff: "One match-day window; no category exclusivity.",
    color: "#2369E8",
  },
  {
    id: "afterlight",
    name: "Afterlight Festival",
    category: "Music festival",
    location: "New York",
    audiences: ["Young professionals", "Culture seekers"],
    goals: ["Brand awareness", "Product sampling"],
    cost: 28000,
    reach: 12000,
    inventory: "Sampling space + artist-lounge placement",
    tradeoff:
      "Audience estimate is organizer-supplied, not independently audited.",
    color: "#6439CF",
  },
  {
    id: "moving",
    name: "Moving City Sessions",
    category: "Live entertainment",
    location: "Chicago",
    audiences: ["Culture seekers", "Young professionals"],
    goals: ["Brand awareness", "Community engagement"],
    cost: 18000,
    reach: 6500,
    inventory: "Venue takeover + pre-show integration",
    tradeoff: "Smaller reach; deeper on-site engagement is only a hypothesis.",
    color: "#477C8A",
  },
  {
    id: "mosaic",
    name: "Mosaic Culture Week",
    category: "Cultural event",
    location: "Minneapolis",
    audiences: ["Local families", "Culture seekers"],
    goals: ["Community engagement", "Product sampling"],
    cost: 12000,
    reach: 8000,
    inventory: "Community workshops + hosted pop-up",
    tradeoff:
      "Regional audience; limited relevance for a New York-only campaign.",
    color: "#9C5849",
  },
  {
    id: "openair",
    name: "Open Air Collective",
    category: "Experiential activation",
    location: "New York",
    audiences: ["Local families", "Young professionals"],
    goals: ["Product sampling", "Community engagement"],
    cost: 22000,
    reach: 4500,
    inventory: "Three-day branded pop-up + opt-in sampling",
    tradeoff: "Footfall is a planning estimate, not guaranteed attendance.",
    color: "#5F7960",
  },
];
export const experiments = [
  {
    id: "match",
    number: "01",
    title: "Match confidence",
    question:
      "Can clearer match explanations help brands act with greater confidence?",
    problem: "A recommendation can be relevant without being understandable.",
    hypothesis:
      "Showing why a listing fits—and one limitation—will help more brands submit relevant inquiries.",
    measurement:
      "Campaigns with at least one qualified inquiry within 14 days ÷ eligible campaigns exposed. Also track rightsholder-rated inquiry relevance.",
    decision:
      "Advance if the rate rises at least 10% relative to control, with no more than a 0.25-point drop in average relevance (1–5). These are proposed thresholds; if the sample is too small, continue learning rather than call a winner.",
    method:
      "Define a qualified inquiry as one with a goal, budget and timing that meet the listing’s stated requirements; ask rightsholders to rate relevance separately. Establish a baseline and sample size, compare both experiences for at least 4 weeks, and follow every exposed campaign for 14 days.",
  },
  {
    id: "brief",
    number: "02",
    title: "Deal readiness",
    question: "Can shared expectations improve early conversations?",
    problem: "Unclear intent creates clarification work for both parties.",
    hypothesis:
      "An editable brief with campaign goals, audience, market, budget and timing will help rightsholders respond with less clarification.",
    measurement:
      "Complete briefs ÷ briefs started; median business hours to first substantive response; rightsholder relevance ratings.",
    decision:
      "Proposed pilot target: 80% of started briefs contain all five fields, and 80% of rated inquiries score at least 4/5 for relevance. Review abandonment before expanding the test.",
    method:
      "Run a 4-week opt-in pilot targeting 20 inquiries and 10 rightsholder ratings. Compare abandonment with the existing flow; if participation is too low, extend the pilot. Treat the findings as directional.",
  },
  {
    id: "outcomes",
    number: "03",
    title: "Outcome understanding",
    question: "Can clearer summaries support better follow-up decisions?",
    problem: "A total does not explain whether an activation met its goal.",
    hypothesis:
      "A summary linking the original goal, delivery and missing evidence will help both partners choose a next step.",
    measurement:
      "Participants who identify the goal, missing evidence and next action without help, by marketplace side.",
    decision:
      "Proposed target: at least 4 of 5 participants on each side answer all three prompts correctly. Revise the summary if either side falls short.",
    method:
      "Within 2 weeks of recruiting, test a fictional report with 5 brands and 5 rightsholders. Then pilot completed reports with consenting partners and observe repeat engagement over a full buying cycle; do not infer causality from intent.",
  },
] as const;
export const funnel = [
  {
    stage: "Discovery",
    event: "opportunity_viewed",
    definition: "Distinct campaign–opportunity views; exclude staff and bots.",
  },
  {
    stage: "Evaluation",
    event: "match_explanation_opened",
    definition:
      "Campaigns opening an explanation / eligible campaigns exposed.",
  },
  {
    stage: "Shortlist",
    event: "opportunity_shortlisted",
    definition:
      "Distinct shortlisted opportunities / distinct viewed opportunities.",
  },
  {
    stage: "Qualified inquiry",
    event: "qualified_inquiry_submitted",
    definition:
      "Server-validated inquiries meeting agreed criteria / all submitted inquiries.",
  },
  {
    stage: "Response",
    event: "substantive_response_sent",
    definition:
      "Business hours from qualified submission to first substantive response; exclude auto-replies.",
  },
  {
    stage: "Deal progression",
    event: "proposal_stage_changed",
    definition:
      "Eligible inquiries reaching proposal within a defined cohort window.",
  },
  {
    stage: "Activation",
    event: "activation_milestone_accepted",
    definition: "On-time accepted milestones / milestones due in the period.",
  },
  {
    stage: "Outcomes",
    event: "outcome_report_completed",
    definition:
      "Completed reports / activations ended and eligible for reporting.",
  },
];
