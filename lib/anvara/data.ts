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
    title: "Why a match fits",
    short: "Match rationale",
    problem:
      "A brand may see a match without knowing which parts of its campaign it fits and where it falls short.",
    side: "brand",
    stage: "Evaluate",
    hypothesis:
      "If a match shows how its audience, location and price compare with the campaign and flags gaps, more brands may send relevant inquiries.",
    impact: 9,
    effort: 4,
    confidence: 4,
    assumptions: [
      "Brands need help understanding a match, not just more options.",
      "The listing has reliable audience, price and location details.",
    ],
    dependencies: ["quality"],
    metrics: [
      "Campaigns with a qualified inquiry within 14 days / eligible campaigns exposed",
      "Median time from viewing a match to shortlisting or sending an inquiry",
      "Rightsholder-reported inquiry relevance",
    ],
    status: proposed,
  },
  {
    id: "comparison",
    title: "Opportunity Comparison",
    short: "Comparison",
    problem:
      "Sponsorship packages can include different things, making it hard to compare two options side by side.",
    side: "brand",
    stage: "Evaluate",
    hypothesis:
      "If brands can compare price, audience, location and what is included side by side, they may find a suitable option faster.",
    impact: 8,
    effort: 6,
    confidence: 3,
    assumptions: [
      "Listings contain enough of the same details to compare.",
      "The comparison makes missing information visible instead of treating it as a match.",
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
      "If a listing leaves out price, availability or audience details, both sides may need extra messages before they can move forward.",
    side: "rightsholder",
    stage: "Discover",
    hypothesis:
      "If rightsholders see which key listing details are missing, more listings may include them without fewer people finishing their listings.",
    impact: 8,
    effort: 3,
    confidence: 5,
    assumptions: [
      "Brands and sales can identify which missing details matter most.",
      "Rightsholders can provide the requested detail.",
    ],
    dependencies: [],
    metrics: [
      "Active listings with price, dates, audience and package details / active listings",
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
      "An optional checklist for budget, dates and activation needs may help brands send a more complete first inquiry.",
    impact: 6,
    effort: 2,
    confidence: 4,
    assumptions: ["Brands are willing to share these details before reaching out."],
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
    problem: "A rightsholder may need a brand’s budget, dates and goals before they can suggest a package.",
    side: "both",
    stage: "Connect",
    hypothesis:
      "If the first inquiry includes budget, dates and goals, rightsholders may need fewer clarification messages before sending a proposal.",
    impact: 9,
    effort: 5,
    confidence: 4,
    assumptions: ["A few shared fields are useful across different sponsorship types."],
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
    problem: "An inquiry may sit unanswered if no one on the rightsholder team knows who should reply.",
    side: "rightsholder",
    stage: "Connect",
    hypothesis:
      "Assigning an owner and showing the next step may reduce the number of qualified inquiries left unanswered.",
    impact: 7,
    effort: 7,
    confidence: 3,
    assumptions: [
      "Some delays happen because ownership is unclear, not because the rightsholder is uninterested.",
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
      "After a deal, each side may have a different understanding of who owes what and when.",
    side: "both",
    stage: "Execute",
    hypothesis:
      "A shared list of deliverables, owners and due dates may help both sides keep the activation on track.",
    impact: 8,
    effort: 8,
    confidence: 3,
    assumptions: ["Both sides are willing to update the shared list."],
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
    problem: "A report can show what happened without making it clear whether the original campaign goal was met.",
    side: "both",
    stage: "Measure",
    hypothesis:
      "A report that puts the original goal next to delivered activities and missing data may help both sides discuss what to do next.",
    impact: 7,
    effort: 6,
    confidence: 2,
    assumptions: [
      "Both sides can provide the data needed for a useful report.",
      "There is enough time to follow a partnership through a renewal decision.",
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
    problem: "A brand comparing options over several sessions may forget why it saved one.",
    side: "brand",
    stage: "Evaluate",
    hypothesis:
      "Letting a team save listings with notes for a campaign may make it easier to pick up where they left off.",
    impact: 5,
    effort: 3,
    confidence: 4,
    assumptions: ["Brands research the same campaign over more than one session."],
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
      "After a deal, useful feedback may stay in one salesperson’s notes instead of reaching the product team.",
    side: "both",
    stage: "Measure",
    hypothesis:
      "A short post-deal check-in with both sides, reviewed with sales, may reveal problems worth investigating across more deals.",
    impact: 4,
    effort: 7,
    confidence: 3,
    assumptions: [
      "Both sides will share candid feedback.",
      "Sales can share context, and the team can check whether a problem occurs beyond one deal.",
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
    rightsholder: "Show what the package includes and who it reaches.",
    friction: "A brand may not have the price, audience or dates needed to judge a listing.",
    opportunity: "quality",
    metric: "Listings with price, dates, audience and package details",
    interfaceTitle: "A useful first impression",
  },
  Evaluate: {
    brand: "Understand the fit and the trade-offs.",
    rightsholder: "Show what the brand gets and who it can reach.",
    friction: "A score alone may not explain why the audience or budget fits.",
    opportunity: "rationale",
    metric: "Qualified inquiry per eligible campaign",
    interfaceTitle: "Why this could be a fit",
  },
  Connect: {
    brand: "Share a clear, realistic brief.",
    rightsholder: "Respond with a relevant proposal.",
    friction: "The rightsholder may need the brand’s budget and dates before making a proposal.",
    opportunity: "brief",
    metric: "Time to substantive response",
    interfaceTitle: "A better first conversation",
  },
  Execute: {
    brand: "Know what happens next.",
    rightsholder: "Deliver the agreed activation.",
    friction: "The two sides may disagree about who is responsible for an asset or deadline.",
    opportunity: "milestones",
    metric: "On-time accepted milestones",
    interfaceTitle: "One shared next step",
  },
  Measure: {
    brand: "Decide what to repeat or change.",
    rightsholder: "Demonstrate delivery and learn.",
    friction: "A report of event interactions alone cannot tell us how many sales the sponsorship caused.",
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
    title: "Match details",
    question:
      "Would clearer match details help brands move toward an offer?",
    problem: "A brand may see a recommended listing without knowing why it fits their campaign.",
    hypothesis:
      "If brands can see the audience, price and location alongside missing evidence, they may reach a decision and prepare an offer faster.",
    measurement:
      "Compare time from viewing a listing to a qualified offer and the share of buyers who make one. Check whether rightsholders consider those offers relevant.",
    decision:
      "Consider expanding if buyers reach qualified offers faster without lowering their relevance to rightsholders. Set a target and sample size with the team before testing.",
    method:
      "First ask brands to explain why they would choose a match. If the explanation helps, compare it with the current experience. Define a qualified inquiry with the team and follow each campaign for 14 days; check the sample size before drawing conclusions.",
  },
  {
    id: "brief",
    title: "Deal readiness",
    question: "Would a more complete first inquiry save both sides time?",
    problem: "A rightsholder may need to ask for the brand’s budget, dates and goals before they can respond with a proposal.",
    hypothesis:
      "An editable brief with campaign goals, audience, market, budget and timing will help rightsholders respond with less clarification.",
    measurement:
      "Count how often a rightsholder has to ask for missing budget, dates or goals before preparing a proposal. Also track brief completion and first-response time.",
    decision:
      "Move forward if fewer inquiries need those clarification questions and brief completion does not fall. Set a target with the team after measuring the current flow.",
    method:
      "First review recent inquiries with sales to see which details are actually missing. Then pilot the brief with willing partners and compare clarification requests and completion with the current flow. A small pilot would be directional, not proof.",
  },
  {
    id: "outcomes",
    title: "Outcome understanding",
    question: "Would a report tied to the campaign goal make the next conversation more useful?",
    problem: "A count of interactions alone does not show whether a campaign reached its goal.",
    hypothesis:
      "If the report shows the campaign goal, what was delivered and what data is missing, both partners may be better prepared to discuss the next campaign.",
    measurement:
      "Count how many participants on each side can identify the campaign goal, missing data and a sensible next step without help.",
    decision:
      "If people cannot find the goal or explain what is missing, revise the report before testing it with live campaigns.",
    method:
      "Ask five brands and five rightsholders to review a fictional report and explain what they would do next. If the format is useful, explore a pilot with real partners and their consent.",
  },
] as const;
export const funnel = [
  {
    stage: "Discovery",
    event: "opportunity_viewed",
    definition: "Distinct campaign and opportunity views; exclude staff and bots.",
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
