export type PlanStep = {
  label: string;
  when: string;
  title: string;
  action: string;
  needed: string[];
  output: string;
};

export type GrowthIdea = {
  id: string;
  label: string;
  title: string;
  idea: string;
  duration: string;
  businessCase: string;
  measure: string;
  experience: string;
  steps: PlanStep[];
  sources: { label: string; href: string }[];
};

export const GROWTH_IDEAS: GrowthIdea[] = [
  {
    id: "experiment-1",
    label: "Customer stories",
    title: "Let the customer’s product make the case.",
    idea: "Turn a useful product built on Linq into a story the next customer can see themselves in.",
    duration: "A proposed four-week pilot",
    businessCase: "Build recognition through customer proof and the builder’s own audience, then give interested teams a clear path to evaluate Linq.",
    measure: "Qualified product conversations, sandbox activation and customers attributed to the story.",
    experience: "At Fofo Labs, I found our first clients and worked with a four-person team on content and campaigns. Our La Estancia strategy reached about 540k TikTok views and 1,200+ followers in month one. I’d own the story, production, distribution and follow-up; technical claims would be reviewed with the customer and Linq.",
    steps: [
      { label: "Choose", when: "Week 1", title: "Find a product worth showing.", action: "Pick one consenting customer whose product solves a problem the target audience recognises.", needed: ["One target builder audience", "Customer approval and an interview", "Access to a working product"], output: "One approved story brief: the problem, the product and why Linq mattered." },
      { label: "Produce", when: "Week 2", title: "Make the value visible.", action: "Capture the product in use. Build a short customer story and a practical follow-up explaining how it works.", needed: ["A screen recording and customer interview", "Verified claims and technical review", "One clear next step for builders"], output: "A short film, a product walkthrough and a small set of campaign assets." },
      { label: "Distribute", when: "Week 3", title: "Launch with the builder.", action: "Coordinate the release across Linq, the customer and relevant developer channels.", needed: ["Approved assets and a shared release date", "Agreed customer and community channels", "A tagged path to the sandbox or sales"], output: "One coordinated launch that reaches beyond Linq’s existing audience." },
      { label: "Learn", when: "Week 4 onward", title: "Follow the interest into the product.", action: "Look at who came in, why they were interested, and whether they started using Linq.", needed: ["Tagged traffic and a source question", "A defined activation event", "A relevant baseline and cohort follow-up"], output: "A decision to repeat, change or stop the format, based on qualified demand and adoption." },
    ],
    sources: [
      { label: "Linq customer stories", href: "https://linqapp.com/blog" },
      { label: "Existing example apps", href: "https://docs.linqapp.com/channel/imessage/guides/resources/example/" },
    ],
  },
  {
    id: "experiment-2",
    label: "Builder community",
    title: "Put Linq in the right conversations.",
    idea: "Make Linq a useful place for agent builders to learn, share work and find collaborators.",
    duration: "A proposed six-week pilot",
    businessCase: "Earn trust in the builder network. Useful sessions, public work and peer recommendations can create qualified referrals and production projects.",
    measure: "Returning builders, qualified referrals, active integrations and partner-sourced paid accounts.",
    experience: "Through 17 Bits Records, I helped organise concerts, workshops and creative collaborations. I’d bring the partner coordination, participant communication, logistics and follow-through, alongside a technical host who can help teams build.",
    steps: [
      { label: "Partner", when: "Week 1", title: "Start with the right room.", action: "Choose one relevant community, such as teams building with Vercel’s Chat SDK, and agree on a useful session.", needed: ["A community partner and technical host", "A specific builder audience", "One practical use case"], output: "A focused invitation and a partner who can reach the right people." },
      { label: "Prepare", when: "Week 2", title: "Remove friction before the event.", action: "Rehearse the build using Linq’s existing adapter and make sure participants can access what they need.", needed: ["Working sample and current documentation", "Linq tokens and test-number readiness", "Agenda, support plan and recording consent"], output: "A tested session plan that gives participants a realistic chance of finishing." },
      { label: "Gather", when: "Week 3", title: "Give people something to build and share.", action: "Host a small working session around a real project, with space for useful discussion and technical support.", needed: ["A working customer demo", "A host, clear build scope and help channel", "Permission to document finished projects"], output: "Working integrations, builder relationships and a useful public recap." },
      { label: "Follow through", when: "Weeks 4–6", title: "Turn the room into a network.", action: "Follow up around actual projects, make relevant introductions and invite builders to share what they shipped.", needed: ["Project-specific follow-ups", "A way to attribute referrals", "Day-seven usage and production-pilot checks"], output: "Evidence of returning builders, referrals and teams moving toward production." },
    ],
    sources: [
      { label: "Linq’s Chat SDK adapter", href: "https://docs.linqapp.com/channel/imessage/guides/integrations/chat-sdk/" },
      { label: "Existing example apps", href: "https://docs.linqapp.com/channel/imessage/guides/resources/example/" },
    ],
  },
  {
    id: "experiment-3",
    label: "Commercial conversion",
    title: "Turn attention into production accounts.",
    idea: "Give the interest created by stories and community a clear commercial next step.",
    duration: "A proposed test with 30-day retention follow-up",
    businessCase: "Keep the story, landing page and evaluation experience consistent so qualified teams understand the value and can make a buying decision.",
    measure: "Commercial sandbox-to-paid conversion, 30-day activity and cost per retained customer.",
    experience: "At Sergio & Co., I’ve worked directly with clients on digital strategy, reviewed creative work, and personally run paid ads and email campaigns. I’d connect the positioning, page, distribution and follow-up, with engineering reviewing production readiness.",
    steps: [
      { label: "Map", when: "Week 1", title: "Choose a buyer and a use case.", action: "Map the current commercial journey with Linq’s team and identify one audience with a real launch plan.", needed: ["A clear business use case", "Current funnel and trial baseline", "Agreed eligibility and success criteria"], output: "One audience, one offer and a defined route from campaign to product." },
      { label: "Build", when: "Week 2", title: "Make the next step obvious.", action: "Connect a focused landing page to the existing sandbox and a relevant, opted-in follow-up.", needed: ["Campaign assets and a matching page", "Current pricing and trial terms", "A technical launch-readiness checklist"], output: "One consistent campaign path, from first interest to a working prototype." },
      { label: "Test", when: "Weeks 3–4", title: "Compare the commercial paths fairly.", action: "Test normal follow-up against the use-case-specific launch offer for eligible business teams.", needed: ["A comparable or randomly assigned cohort", "Consistent pricing and trial terms", "Tracking, opt-out handling and a support owner"], output: "A useful comparison of qualified activation, paid conversion and support cost." },
      { label: "Retain", when: "30 days after upgrade", title: "Check that the customer stays active.", action: "Follow the paid cohort long enough to see whether the acquisition created lasting value.", needed: ["Paid-account and activity cohorts", "Campaign and support costs", "Feedback from teams that stalled"], output: "Retained production customers and a clear decision about what to scale." },
    ],
    sources: [
      { label: "Business sandbox and Hobby use", href: "https://linqapp.com/cli" },
      { label: "Pro positioning", href: "https://linqapp.com/s/pricing" },
      { label: "Integration best practices", href: "https://docs.linqapp.com/channel/imessage/getting-started/best-practices/" },
    ],
  },
];

export const LINQ_LINKS = {
  linkedin: "https://www.linkedin.com/in/sergio-pineros-c/",
  site: "https://www.sergiopineros.com/",
  email: "hello@sergioatelier.co",
  studio: "https://sergioatelier.co",
  linq: "https://linqapp.com/",
};
