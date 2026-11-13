export type GrowthIdea = {
  id: string;
  label: string;
  category: string;
  title: string;
  description: string;
  pilot: string;
  measure: string;
  proof: string;
  demoTitle: string;
  demoHint: string;
  steps: { label: string; title: string; text: string; detail: string }[];
};

export const GROWTH_IDEAS: GrowthIdea[] = [
  {
    id: "experiment-1",
    label: "Show the value",
    category: "Content / Two-week pilot",
    title: "Let the useful moment do the talking.",
    description: "Short demos that turn “messaging infrastructure” into something people immediately understand.",
    pilot: "Three real use cases. Three short videos. One clear path to a first build.",
    measure: "Viewers who go on to build something with Linq.",
    proof: "At Fofo Labs, I contributed to La Estancia’s content strategy and acquisition. Our team reached about 540k TikTok views and 1.2k new followers in the first month. That taught me to make the value recognisable fast.",
    demoTitle: "A demo in three beats",
    demoHint: "Tap through the storyboard.",
    steps: [
      { label: "The problem", title: "Plans changed. Again.", text: "“I need to move dinner to Friday.”", detail: "Start with a situation someone recognises." },
      { label: "The moment", title: "One text. A useful reply.", text: "“Friday works. Would you prefer 6 or 7?”", detail: "Show the conversation, then explain the infrastructure." },
      { label: "The next step", title: "Now make it yours.", text: "Build a messaging experience for your own use case.", detail: "Give interested builders one route into Linq’s docs or sandbox." },
    ],
  },
  {
    id: "experiment-2",
    label: "Build together",
    category: "Community / One workshop",
    title: "A finished demo beats a room full of spectators.",
    description: "Bring a small developer community together to build something people would actually text.",
    pilot: "One community partner. One focused challenge. One supported build session.",
    measure: "Finished projects, then continued usage a week later.",
    proof: "Through 17 Bits Records, I helped organise concerts, workshops and creative collaborations. My part was bringing people together and carrying the details through to the actual event.",
    demoTitle: "From an invite to a working build",
    demoHint: "Explore the workshop plan.",
    steps: [
      { label: "Invite", title: "Find the right room.", text: "Partner with one developer community around a practical use case.", detail: "A focused invitation: bring an idea for an agent someone would text." },
      { label: "Build", title: "Leave with something that works.", text: "Use Linq’s docs to build one messaging demo, with help available.", detail: "Keep the scope small enough to finish in a single session." },
      { label: "Share", title: "Give the work a second life.", text: "Share finished projects and check in with builders a week later.", detail: "The question: did the event turn into ongoing building?" },
    ],
  },
  {
    id: "experiment-3",
    label: "Find the friction",
    category: "Activation / One focused test",
    title: "Find the step that loses people.",
    description: "Follow one audience from first visit to first useful action. Improve the handoff that holds them back.",
    pilot: "One audience. One landing page. Two message variants. A clear activation event.",
    measure: "Activation rate and time to first successful build.",
    proof: "At Sergio & Co., I developed digital strategy and ran paid ads and email campaigns for an editorial project. I learned to connect the message, the landing page and the follow-up as one journey.",
    demoTitle: "Where would you look first?",
    demoHint: "Choose a point in the journey.",
    steps: [
      { label: "Visit", title: "Do they recognise the value?", text: "Test a use-case headline against a broad product message.", detail: "Look for qualified visitors taking the next step." },
      { label: "Sign up", title: "Is the next action obvious?", text: "Make the first build path clear right after signup.", detail: "Look at how many signups start a relevant product action." },
      { label: "Build", title: "What stops the first success?", text: "Talk to people who started but got stuck. Address one recurring obstacle.", detail: "Watch activation rate and time to the first successful build." },
      { label: "Return", title: "Was it useful enough to come back?", text: "Follow up with opted-in builders around their original use case.", detail: "Check repeat usage rather than treating signup as the finish line." },
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
