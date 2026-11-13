export type LinqExperiment = {
  id: string;
  theme: string;
  title: string;
  annotation: string;
  experience: string[];
  did: string[];
  learned: string;
  why: string;
  testIntro: string[];
  pilotTitle: string;
  pilot: string[];
  metrics: string[];
  metricsNote: string;
  takeaway: string;
};

export const LINQ_EXPERIMENTS: LinqExperiment[] = [
  {
    id: "show-it-working",
    theme: "Content and landing pages",
    title: "Show the moment it becomes useful.",
    annotation: "Views tell us what people stopped to watch. They do not tell us who wants to build.",
    experience: [
      "At Fofo Labs I worked with restaurants. We learned fast that talking about a restaurant did not do much. People had to see the food, the room and the feeling of being there. That is when they cared.",
      "At La Estancia Steakhouse, our team made short videos with that idea. The work brought in about 540,000 views on TikTok and more than 1,200 new followers in the first month. It was a team result, and views are not sales. But it taught us what people respond to.",
    ],
    did: [
      "I helped plan the content, worked on getting new customers, and kept track of which videos people actually responded to.",
    ],
    learned: "People get it when they can see it. If the value is clear in a few seconds, they want to know more.",
    why: "Linq is a tool for building. Most people will not read about messaging tools and just get it. They need to see a real thing, working, solving a real problem. That is the fastest way to trust it.",
    testIntro: [
      "I would make a small set of short demos and call it Built with Linq. Linq already shows real agents people can text, in its Agent Store. I would start from public examples like those, and from talks with the team about what users build most.",
      "Each demo would be short and plain. This was the problem. This is what was built. This is how it works. This is where to try it.",
      "Writing content and building landing pages is part of this job, as Linq describes it. This is that work, pointed at one goal: help the right people see what Linq does, fast.",
    ],
    pilotTitle: "How I would start",
    pilot: [
      "Pick a few use cases from public examples and from what the team hears from users.",
      "Write and make one short demo for each one. Keep each one about a single problem.",
      "Put them on one simple page with a clear next step, like reading the docs or starting a trial.",
      "Try the same demo with two ways of saying it, and see which one people act on.",
      "Share the demos where developers and builders already spend time, with help from the team on who to reach.",
    ],
    metrics: [
      "Visits from the right kind of people, not just any visits.",
      "How many of them sign up.",
      "How many build a first working thing after signing up.",
      "Which demos get saved, shared or asked about by developers.",
    ],
    metricsNote: "What matters is not the view count. It is whether someone goes from watching a demo to building something real.",
    takeaway: "Show it working first. Ask for trust after.",
  },
  {
    id: "build-together",
    theme: "Events and community",
    title: "Give people a reason to build together.",
    annotation: "An event worked if people leave with something built, not if the room was full.",
    experience: [
      "I co-founded 17 Bits Records in Colombia. We put on concerts, workshops and projects with artists. I helped with the planning, the people and the many small jobs that make an event happen.",
      "What I saw, again and again: people who take part in a thing feel part of it. People who only watch, forget it by next week.",
    ],
    did: [
      "I helped plan and run events, kept collaborators in the loop, and made sure ideas turned into a real day, with real people in the room.",
    ],
    learned: "Doing a thing together builds a stronger tie than hearing about it. The doing is the point.",
    why: "Planning and running events and hackathons is part of this job at Linq. A build session does two jobs at once. Developers learn Linq by using it, and they make things they want to show other people. That is how new users find Linq without ads doing all the work.",
    testIntro: [
      "I would run a small build session, online first, with one developer community. The idea is simple. Bring a real problem. Build a small messaging agent with Linq during the session. Show it at the end.",
      "I would keep it small on purpose. The goal is not a big crowd. The goal is that most people who come actually finish something.",
    ],
    pilotTitle: "How I would start",
    pilot: [
      "Pick one developer community and ask a few of its members if this is useful to them.",
      "Work with an organiser from that community, if we can, instead of starting from zero.",
      "Set one simple build task that the current Linq docs support.",
      "Make a short sign up page and invite people in plain words.",
      "Run one session, with help on hand while people build.",
      "Write up what people made, with their okay, and share it back to the community.",
    ],
    metrics: [
      "Sign ups from the right kind of developers.",
      "How many of them show up.",
      "How many start building, and how many finish.",
      "Who is still using Linq some weeks later.",
      "Who brings a friend next time.",
    ],
    metricsNote: "Sign ups are a start. Finished projects, and people coming back, are the real sign it worked.",
    takeaway: "People share what they helped make.",
  },
  {
    id: "learn-from-campaigns",
    theme: "Campaigns, email and research",
    title: "Run campaigns to learn, not just to launch.",
    annotation: "If a campaign teaches us nothing, it was just noise with a budget.",
    experience: [
      "At Sergio & Co., my studio, I worked on the marketing of an independent magazine project. The work made me think in a chain. Where do people first hear about it. What makes them care. What makes them act. What happens after they do.",
      "It also taught me to be honest about credit. The project's results belong to the project and its team. My part was the marketing work below.",
    ],
    did: [
      "I set the marketing plan, checked and approved the creative work, planned where it would run, and ran the paid ads and the email campaigns myself.",
    ],
    learned: "Each step has a job. If one step is weak, the rest cannot fix it. A campaign should tell you which step is weak.",
    why: "This job includes supporting paid, email and content work, and researching customers and competitors. That work pays off when each campaign answers one clear question. Then the team knows what to do more of, and what to stop.",
    testIntro: [
      "I would pick one kind of customer, based on what Linq already knows and what we can learn from research. One kind of customer, one problem they know well.",
      "Then I would write two ways of talking about Linq for that problem, build one simple page for it, and send people to it through content, ads or outreach. People who sign up but do not get started would get a short email follow up, only if they agreed to hear from Linq.",
      "I would share what we learn with the Head of Product and Growth, so the next campaign starts smarter. Any of this would follow Linq's own tools, rules and way of working.",
    ],
    pilotTitle: "How I would start",
    pilot: [
      "Research one kind of customer and the words they use for their problem. Look at competitors too, and what they promise.",
      "Write two clear messages for that problem, and say up front what we expect each one to do.",
      "Build or fix one simple landing page for that customer and that problem.",
      "Send the right people to it through content or ads.",
      "Write a short email follow up for people who signed up but did not get started.",
      "Look at the results with the team, and agree on what to keep, change or drop.",
    ],
    metrics: [
      "Visits from the right kind of customer.",
      "How many of them sign up on the page.",
      "How many get a first thing working, and how fast.",
      "Who keeps using Linq after that.",
      "What people who did not sign up, or did not get started, tell us about why.",
    ],
    metricsNote: "Sign ups are an early sign. People getting started, and staying, are the result that counts.",
    takeaway: "A good campaign teaches us something, even when it fails.",
  },
];

export const LINQ_LINKS = {
  linkedin: "https://www.linkedin.com/in/sergio-pineros-c/",
  site: "https://www.sergiopineros.com/",
  email: "hello@sergioatelier.co",
  studio: "https://sergioatelier.co",
  linq: "https://linqapp.com/",
};
