export type Requirement = {
  job: string;
  scope: string;
  stories: string[];
  acceptance: string[];
};
export const requirements: Record<string, Requirement> = {
  quality: {
    job: "When I publish a sponsorship package, I want to see which important details are missing so a brand can decide whether to get in touch.",
    scope:
      "A proposed listing-editor completeness panel plus the corresponding buyer-facing information. Fields: package price and currency, date/availability window, market, inclusions, category restrictions, audience estimate, source and as-of date. Confirm the actual schema with engineering before implementation.",
    stories: [
      "As a listing owner, I can identify and edit missing decision fields before publishing.",
      "As a brand, I can distinguish a verified source, an organizer estimate and information not provided.",
    ],
    acceptance: [
      "On open and after each field edit, recompute completeness from the agreed field schema; blank strings and whitespace count as missing.",
      "Price must be non-negative with an explicit currency; an availability window cannot end before it starts. Show field-level validation without discarding input.",
      "Audience estimates require a source label and as-of date; show “Not provided” when absent and never invent an audience attribute.",
      "Allow saving an incomplete draft. Offer a soft completeness warning rather than blocking publication until evidence supports a stricter rule.",
      "A changed listing updates the buyer-facing summary and its freshness timestamp. Do not label completeness as verification or guaranteed performance.",
    ],
  },
  rationale: {
    job: "When a sponsorship is recommended, I need to understand which campaign requirements it supports and what remains uncertain so I can decide whether to investigate.",
    scope:
      "An explanation module in the existing opportunity view. Inputs: campaign budget, audience, market and goal; listing price, audience profile, location and activation use cases. The prototype uses explicit illustrative rules; production explanation sources require engineering review.",
    stories: [
      "As a buyer, I can see the positive signals and an important limitation without interpreting a score alone.",
      "As a rightsholder, I can see which supplied fields support the explanation and request corrections.",
    ],
    acceptance: [
      "Changing one campaign input updates its corresponding reason without creating unsupported claims in the other reasons.",
      "An over-budget package displays that conflict prominently and cannot be presented as budget-compatible.",
      "Every reason identifies its supporting listing field and freshness; absent data becomes “Unknown,” never an assumed match.",
      "A shortlist action is reversible and scoped to the campaign; an explanation is not a guarantee of performance.",
      "A comparison uses the same inputs and explanation rules for both packages; ties remain visible rather than being given a false winner.",
    ],
  },
  comparison: {
    job: "When two sponsorships look promising, I need a consistent view of their differences so I can choose which conversation to start.",
    scope:
      "A two-package comparison populated from campaign shortlist items; budget, market, audience evidence, inclusions, restrictions and known limitations.",
    stories: [
      "As a brand, I can choose two distinct packages and change either alternative.",
      "As a property, I can have unprovided or incomparable attributes represented honestly.",
    ],
    acceptance: [
      "Prevent selecting the same package twice and retain both choices when the drawer reopens.",
      "Render both packages using the same campaign inputs and price currency; do not normalize different currencies silently.",
      "Display unavailable attributes as “Not provided,” not as zero; label unverified audience estimates.",
      "Saving or unsaving a comparison item updates the campaign shortlist immediately.",
    ],
  },
  readiness: {
    job: "Before contacting a property, I need to articulate the goal, audience, budget and timing so the other team can respond usefully.",
    scope:
      "An optional four-part campaign readiness checklist with editable requirements. Completion is a preparation signal, not proof of purchase intent.",
    stories: [
      "As a brand, I can review which requirements remain undefined.",
      "As a partner, I can distinguish a prepared brief from a commercially committed buyer.",
    ],
    acceptance: [
      "Derive readiness from populated campaign fields, never from clicks on the checklist.",
      "A budget above zero with currency and a timing statement are distinct checks.",
      "Preserve campaign input when navigating backward or dismissing the check.",
      "Track checklist abandonment separately from inquiry abandonment; do not require completion before exploratory browsing.",
    ],
  },
  brief: {
    job: "When receiving an inquiry, I need the brand’s objective, budget and constraints so I can respond with a relevant next step.",
    scope:
      "A campaign-linked editable brief and receiving-team preview. Required fields for the pilot: objective, audience, market, budget/currency and timing/requirements.",
    stories: [
      "As a brand, I can preview and edit a brief before deliberately submitting it.",
      "As a rightsholder, I can inspect the same requirements and flag what needs clarification.",
    ],
    acceptance: [
      "Populate campaign fields without making additional audience or availability claims.",
      "Show inline errors for missing required fields and preserve all text after failure.",
      "Provide an explicit review step; production submission must use an idempotency key and never create duplicate inquiries.",
      "Store qualification criteria version and distinguish a valid brief from rightsholder acceptance.",
      "A receiving view preserves the original brief and timestamps subsequent revisions. The frontend prototype never submits.",
    ],
  },
  response: {
    job: "When a qualified inquiry arrives, I need a visible owner and next action so a potential partner is not left waiting.",
    scope:
      "Proposed inquiry ownership, acknowledgement and substantive-response states; response-time reporting excludes auto-acknowledgements.",
    stories: [
      "As a partner team, I can claim or assign a qualified inquiry.",
      "As a brand, I can understand the next expected step.",
    ],
    acceptance: [
      "Only an authorized partner team member can change ownership.",
      "Record assignment changes and distinguish automated acknowledgement from substantive reply.",
      "Compute response time in the agreed business-hours calendar; handle weekends and timezone changes.",
      "A reassignment does not reset the original inquiry timestamp or send duplicate notifications.",
    ],
  },
  milestones: {
    job: "After agreement, I need shared owners, due dates and acceptance states so both teams know what remains to deliver.",
    scope:
      "A shared activation checklist linked to the accepted agreement; proposed fields: title, owner, due date, supporting asset and acceptance state.",
    stories: [
      "As a brand, I can review a deliverable before accepting it.",
      "As a property, I can show delivery evidence and flag a blocker.",
    ],
    acceptance: [
      "Create milestones from explicitly agreed deliverables rather than inferred contract language.",
      "Only the designated reviewer can accept a milestone; retain revision history.",
      "Handle missed dates, disputed acceptance and revised scope without deleting earlier states.",
      "Do not trigger money movement or contract changes from this exploratory milestone view.",
    ],
  },
  summary: {
    job: "After activation, I need the agreed goal, delivered work and evidence limitations together so I can choose a useful follow-up.",
    scope:
      "A goal-linked summary of accepted deliverables and source-labeled activity data. Exclude unsupported incremental revenue and ROI calculations.",
    stories: [
      "As a brand, I can distinguish observed activity from an attributed business result.",
      "As a property, I can flag incomplete evidence and agree a reporting follow-up.",
    ],
    acceptance: [
      "Show the original goal alongside delivered, pending and disputed milestones.",
      "Each numeric observation includes its source, counting method and reporting period.",
      "If attribution inputs are absent, never compute or display revenue lift, ROAS or ROI.",
      "Permit marking a report incomplete with an owner and next action; do not equate report completion with campaign success.",
    ],
  },
  collections: {
    job: "When I return to a campaign, I want to see the listings my team saved and why we saved them.",
    scope:
      "Campaign-scoped saved opportunities with optional notes and reversible removal.",
    stories: [
      "As a planner, I can save or remove an opportunity in a campaign.",
      "As a returning planner, I can see when a saved package changed.",
    ],
    acceptance: [
      "Deduplicate campaign and opportunity pairs; saving twice creates one item.",
      "A change in campaign does not copy another campaign’s notes or saved items.",
      "Retain withdrawn inventory as unavailable with the original reference, rather than silently deleting it.",
      "Surface price and availability changes when reopening saved items.",
    ],
  },
  feedback: {
    job: "After a deal, I want to hear what worked and what did not from both sides, then check whether the same issues appear in other deals.",
    scope:
      "Opt-in debrief prompts for each participant, tagged by journey stage; a product review queue informed by sales context.",
    stories: [
      "As a partner, I can share feedback without revealing private commercial details to the other side.",
      "As product, I can group themes and validate them before changing priorities.",
    ],
    acceptance: [
      "Keep private feedback private unless the contributor explicitly chooses joint sharing.",
      "A deal can have one current debrief from each side with version history.",
      "Group feedback by stage and theme without presenting frequency as market prevalence.",
      "A reviewed theme links to a hypothesis and owner; changing a confidence score still requires supporting evidence.",
    ],
  },
};
