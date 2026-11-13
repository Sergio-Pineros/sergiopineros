export type LinqStep = {
  name: string;
  text: string;
  produces: string;
  ready: string[];
};

export type LinqPlan = {
  id: string;
  tab: string;
  title: string;
  intro: string;
  steps: LinqStep[];
  goal: string;
  measure: string[];
  experienceTitle: string;
  experience: string[];
};

export const LINQ_PLANS: LinqPlan[] = [
  {
    id: "show-it-working",
    tab: "Show it working",
    title: "Let the product make the case.",
    intro: "Built with Linq: short demos of real products solving real problems.",
    steps: [
      { name: "Pick", text: "Choose a useful product from customer conversations or public examples. Focus on the problem it solves.", produces: "A use case the right builder will recognise.", ready: ["A working product", "Customer permission", "Input from the Linq team"] },
      { name: "Make", text: "Show the problem, the product and where to try it. Keep each demo under a minute.", produces: "A short demo with one clear next step.", ready: ["A simple script", "A screen recording", "A technical fact check"] },
      { name: "Share", text: "Publish with the builder. Test two ways of introducing the same demo in relevant developer channels.", produces: "A shared launch and a first read on the message.", ready: ["A matching landing page", "Two opening messages", "A tagged path to try Linq"] },
      { name: "Learn", text: "Follow viewers into sign-up and their first working build. Use what they do and ask to choose the next demo.", produces: "A decision on what to repeat, change or stop.", ready: ["Sign-up and first-build data", "Questions from builders", "A short team review"] },
    ],
    goal: "Make Linq easier to understand and trust, then give interested builders a reason to try it.",
    measure: ["Qualified visits", "Sign-ups and first builds", "Developer shares and questions"],
    experienceTitle: "Why I can run this",
    experience: [
      "At Fofo Labs, I found our first clients and worked with a four-person team on content and campaigns. Our La Estancia strategy reached about 540,000 TikTok views and 1,200+ new followers in its first month.",
      "That was a team result. My part included content planning, customer acquisition and tracking which videos people responded to. At Linq, I’d own production, distribution and follow-up, with technical review from the team.",
    ],
  },
  {
    id: "build-together",
    tab: "Build together",
    title: "Give builders a reason to come back.",
    intro: "Small build sessions that turn first-time users into people who share their work.",
    steps: [
      { name: "Ask", text: "Talk to members of one developer community. Find a problem they would want to build around.", produces: "A session people actually want.", ready: ["One relevant community", "A few member conversations", "A use case Linq supports"] },
      { name: "Partner", text: "Plan with an existing organiser and a technical host. Rehearse the build before inviting people.", produces: "A tested session and an invitation to the right people.", ready: ["A community partner", "A technical host", "Test access and a working example"] },
      { name: "Gather", text: "Run a small online session. Help people finish a messaging agent and show what they made.", produces: "Working projects and real product feedback.", ready: ["A focused build task", "Live technical support", "A way to collect projects"] },
      { name: "Follow through", text: "Share projects with permission. Make useful introductions and check who is still building weeks later.", produces: "Returning builders, public proof and referrals.", ready: ["Permission to share", "Project-specific follow-ups", "A next session to return to"] },
    ],
    goal: "Position Linq as a useful part of the builder community. Trust and shared projects can bring in the next users.",
    measure: ["Builders who finish", "Continued use", "Returning builders and referrals"],
    experienceTitle: "Why I can run this",
    experience: [
      "I co-founded 17 Bits Records in Colombia and helped organise concerts, workshops and artist collaborations. My work covered planning, participant communication and the small details that make an event happen.",
      "I’d bring that coordination and follow-through to Linq, working alongside a technical host who can help teams build.",
    ],
  },
  {
    id: "campaigns-that-teach",
    tab: "Campaigns that teach",
    title: "Find the message that gets people started.",
    intro: "One audience, one real problem and a campaign that tells us what to do next.",
    steps: [
      { name: "Research", text: "Choose a customer group. Learn how they describe their problem and what alternatives they consider.", produces: "A problem in the customer’s own words.", ready: ["Existing customer insight", "A few customer conversations", "Competitor messaging"] },
      { name: "Write", text: "Write two messages for that problem. Give each a matching page and a clear route into Linq.", produces: "A focused test from first click to first build.", ready: ["Two clear messages", "Matching landing content", "Attribution for each version"] },
      { name: "Run", text: "Reach the right people through content, ads or outreach. Help opted-in sign-ups get their first project working.", produces: "Real evidence of which message drives use.", ready: ["Campaign assets", "Opted-in follow-up", "A technical support owner"] },
      { name: "Decide", text: "Review activation, continued use and cost with the growth team. Keep what works and shape the next test.", produces: "A decision backed by use, not just clicks.", ready: ["Sign-up and usage data", "Campaign and support costs", "Feedback from people who stalled"] },
    ],
    goal: "Help qualified teams start using Linq, and put campaign time and budget behind the paths that bring lasting customers.",
    measure: ["Sign-up to first build", "Continued and paid use", "Cost per active customer"],
    experienceTitle: "Why I can run this",
    experience: [
      "At Sergio & Co., I set the marketing plan for an independent magazine project, reviewed creative work, planned distribution and personally ran paid ads and email campaigns.",
      "I’d connect the message, landing page, campaign and follow-up at Linq, then use the results to find where people get stuck. The project’s results belong to its team; my experience is in doing that marketing work.",
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
