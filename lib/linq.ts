export type GrowthIdea = {
  id: string;
  label: string;
  category: string;
  audience: string;
  title: string;
  description: string;
  pilot: string;
  measure: string;
  basis: string;
  design: string;
  guardrail: string;
  proof: string;
  sources: { label: string; href: string }[];
  demoTitle: string;
  demoHint: string;
  steps: { label: string; title: string; text: string; detail: string }[];
};

export const GROWTH_IDEAS: GrowthIdea[] = [
  {
    id: "experiment-1",
    label: "First real reply",
    category: "Activation / I’d start here",
    audience: "New builders with a Linq token and a test number ready.",
    title: "Get to the first real reply.",
    description: "Test whether guiding builders through a complete two-way conversation helps more of them activate and keep building.",
    pilot: "Compare the existing quickstart with a short, reply-first walkthrough using Linq’s current tools.",
    measure: "Two-way activation within 24 hours. Apps still exchanging messages on day seven.",
    basis: "Linq already ships a quickstart, SDKs, a CLI webhook listener, and a coding-agent plugin. The opportunity to test is how those assets guide a builder to a complete conversation.",
    design: "Split eligible new teams between the current path and the guided walkthrough. Define activation as a verified incoming event processed by the app, followed by an accepted reply in the same chat. Compare activation rate and time to that round trip. Track token and number setup separately so provisioning time does not distort the result.",
    guardrail: "Use consenting test recipients. Track setup errors and support time; check seven-day app activity before calling a faster first reply a win. A small pilot gives directional evidence, not a guaranteed uplift.",
    proof: "I’d own the demo, walkthrough, recruitment and user interviews, with engineering validating the integration and events. At Fofo Labs, I contributed content strategy and acquisition to La Estancia’s first-month team result of about 540k TikTok views and 1.2k new followers.",
    sources: [
      { label: "Quickstart", href: "https://docs.linqapp.com/channel/imessage/getting-started/quickstart/" },
      { label: "Coding-agent plugin", href: "https://docs.linqapp.com/channel/imessage/getting-started/ai-agents/" },
      { label: "CLI & webhook listener", href: "https://linqapp.com/cli" },
    ],
    demoTitle: "The activation moment",
    demoHint: "Explore the proposed two-way activation journey.",
    steps: [
      { label: "Text", title: "A person texts the app.", text: "“Help me plan today.”", detail: "Start with a consenting tester on a provisioned Linq line." },
      { label: "Receive", title: "The app gets the message.", text: "Incoming message → verified webhook → app handler.", detail: "Linq carries the conversation. The developer’s application supplies the reasoning and tools." },
      { label: "Reply", title: "The app answers back.", text: "“Let’s start with your first priority.”", detail: "The activation event is the completed round trip. Check whether the app is still in use seven days later." },
    ],
  },
  {
    id: "experiment-2",
    label: "Bring your bot",
    category: "Acquisition / One partner community",
    audience: "Teams already running an agent with Vercel’s Chat SDK.",
    title: "Give an existing bot a new channel.",
    description: "Test a sharper invitation: bring a bot you already have, and add iMessage through Linq’s maintained adapter.",
    pilot: "One Chat SDK community. Two invitation angles. One supported channel-addition clinic.",
    measure: "Invited teams that add Linq and still handle conversations seven days later.",
    basis: "Linq’s Chat SDK adapter already connects existing handlers to iMessage and SMS. Its example app runs one bot across multiple platforms. This test distributes an integration Linq already maintains.",
    design: "With a community partner’s agreement, split an opted-in, qualified audience between “build an iMessage agent” and “add iMessage to your existing bot” invitations for the same clinic. Keep the session and setup support identical. Compare invited-team-to-retained-integration conversion, with attendance and first conversations as intermediate steps.",
    guardrail: "Confirm API access and number readiness before the session. Track engineering support per activated team. Use partner community channels, not unsolicited iMessages, and avoid treating registrations as customers.",
    proof: "I’d handle the partner, invitation, event and follow-up; a technical teammate would lead integration support. Through 17 Bits Records, I helped organise concerts, workshops and creative collaborations, coordinating people and carrying plans into actual events.",
    sources: [
      { label: "Chat SDK integration", href: "https://docs.linqapp.com/channel/imessage/guides/integrations/chat-sdk/" },
      { label: "Existing example apps", href: "https://docs.linqapp.com/channel/imessage/guides/resources/example/" },
    ],
    demoTitle: "Keep the bot. Add the channel.",
    demoHint: "Explore the proposed integration clinic.",
    steps: [
      { label: "Bring", title: "Start with a working bot.", text: "Existing Chat SDK agent + a real messaging use case.", detail: "Qualify teams already using the framework, and get their Linq credentials ready." },
      { label: "Connect", title: "Add Linq’s adapter.", text: "Existing bot handlers → Linq adapter → iMessage / SMS.", detail: "Use the maintained adapter and signed-webhook setup. Scope the clinic to its documented capabilities." },
      { label: "Keep", title: "Check that it sticks.", text: "Is the same integration handling conversations a week later?", detail: "A retained channel integration is the outcome. An event signup is an intermediate signal." },
    ],
  },
  {
    id: "experiment-3",
    label: "Launch for real",
    category: "Conversion / Commercial sandbox teams",
    audience: "Business builders with a working prototype and a stated launch plan.",
    title: "Help the prototype become a product.",
    description: "Test whether timely launch support turns more qualified sandbox teams into lasting Pro customers.",
    pilot: "After a working two-way prototype, test a launch-readiness offer against the normal trial follow-up.",
    measure: "Eligible teams that become paid Pro accounts and remain active 30 days later.",
    basis: "Linq directs business projects toward its sandbox and positions Pro for production. Its docs already cover signed webhooks, opt-outs, chat health and protocol differences. Package that guidance around an actual launch goal.",
    design: "First verify the current trial journey with Linq’s team. Among commercial teams with a working prototype and launch intent, compare normal follow-up with a use-case launch checklist and a scoped technical review. Keep pricing and trial terms unchanged. Measure paid conversion and 30-day retained activity using all eligible teams as the denominator.",
    guardrail: "Track support hours per retained customer. Keep personal Hobby users outside this sales test. Validate consent, opt-outs and protocol-appropriate behavior with engineering; do not encourage extra messages just to inflate usage.",
    proof: "I’d own segmentation, the launch offer, campaign and interviews, with engineering reviewing production readiness. At Sergio & Co., I developed digital strategy and personally ran paid advertising and email campaigns for an editorial project.",
    sources: [
      { label: "Hobby, sandbox & production", href: "https://linqapp.com/cli" },
      { label: "Pro positioning", href: "https://linqapp.com/s/pricing" },
      { label: "Messaging best practices", href: "https://docs.linqapp.com/channel/imessage/getting-started/best-practices/" },
    ],
    demoTitle: "The offer changes with readiness",
    demoHint: "Explore the proposed sandbox-to-production journey.",
    steps: [
      { label: "Qualify", title: "A real launch in mind.", text: "Working conversation + business use case + launch intent.", detail: "Recruit commercial sandbox teams. Leave personal Hobby projects on the path that suits them." },
      { label: "Prepare", title: "Make the next step concrete.", text: "One launch checklist. One scoped technical review.", detail: "Review webhook handling, consent, opt-outs and chat health using Linq’s existing guidance." },
      { label: "Retain", title: "Measure beyond the upgrade.", text: "Paid Pro + real activity after 30 days.", detail: "Compare retained customers and support cost, rather than celebrating trial starts alone." },
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
