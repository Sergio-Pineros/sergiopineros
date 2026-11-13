export type LinqExperiment = {
  id: string;
  number: string;
  theme: string;
  title: string;
  annotation: string;
  experience: string[];
  did: string[];
  learned: string;
  testIntro: string[];
  pilotTitle: string;
  pilot: string[];
  metrics: string[];
  metricsNote: string;
  takeaway: string;
};

export const LINQ_EXPERIMENTS: LinqExperiment[] = [
  {
    id: "experiment-1",
    number: "01",
    theme: "Content, storytelling and customer acquisition",
    title: "Show the moment it becomes useful.",
    annotation:
      "Engagement is a discovery signal. It is not, on its own, proof of product-market fit.",
    experience: [
      "When I worked with restaurants at Fofo Labs, I learned that promoting a business was never simply about showing its products. It was about understanding what customers actually cared about, and presenting that value in a way they could recognise in seconds.",
      "At La Estancia Steakhouse, I collaborated on a short-form content strategy that contributed to approximately 540,000 TikTok views and more than 1,200 new followers in its first month. Those were team results, and views are not the same thing as revenue. What stayed with me was the pattern underneath them.",
    ],
    did: [
      "I helped develop the content strategy, worked on customer acquisition and marketing operations with the team, and paid attention to which pieces people responded to and why, rather than treating every post as an isolated attempt.",
    ],
    learned:
      "People respond more strongly when they can immediately recognise the experience or value being offered. The lesson was not that every company needs to go viral. It was that recognition comes before adoption.",
    testIntro: [
      "Linq already has the raw material for this. Its site points to an iMessage Agent Store, a marketplace of AI agents people can text, and its API covers iMessage, RCS, SMS and voice. I would build a small series of practical demonstrations that start from those verified, public examples, showing what developers and businesses can actually build.",
      "Rather than opening with broad statements about AI messaging infrastructure, each piece would begin with a recognisable problem, then demonstrate a working solution. A working title for the series: Built with Linq. Every example would follow the same shape: the original problem, what was built, how it works, why it matters, and what the viewer can do next. Where an example involves a customer or builder, it would only be used with their permission.",
    ],
    pilotTitle: "A two-week pilot",
    pilot: [
      "Identify three high-relevance use cases from verified product examples and customer stories already public, or from early customer research.",
      "Produce three concise demo concepts or short videos, one per use case.",
      "Publish them on a focused landing page or content hub, with a clear next step toward the documentation or a trial.",
      "Test two different messaging angles across the series: the problem first, or the finished experience first.",
      "Distribute through the developer and business channels where Linq already has a presence, and compare what happens.",
    ],
    metrics: [
      "Qualified traffic from relevant developers and businesses, not raw reach.",
      "Demo to signup conversion.",
      "Signup to first successful build, where that can be measured.",
      "Engagement from the right audience, read as a signal of which problems are worth demonstrating next.",
    ],
    metricsNote:
      "The business outcome I would be watching for is activation: someone going from watching a demonstration to building something real.",
    takeaway: "Make the value recognisable before asking someone to adopt the technology.",
  },
  {
    id: "experiment-2",
    number: "02",
    theme: "Community, events, developer activation and partnerships",
    title: "Give people a reason to build together.",
    annotation:
      "The goal is not the largest possible audience. It is the right builders, finishing something real.",
    experience: [
      "Through 17 Bits Records, the independent music initiative I co-founded in Colombia, and other community-oriented projects, I have participated in organising concerts, creative collaborations, artist workshops and events. The work behind them is unglamorous: coordinating collaborators, managing moving pieces, communicating with participants, and turning an idea into something that actually happens on a given day.",
      "One thing I have learned is that participation creates a different kind of relationship than passive consumption. When people contribute to something, they develop a stronger connection to the work, and to the community around it.",
    ],
    did: [
      "I took part in planning and running events, coordinating the people involved, and helping carry projects from announcement to a room full of people, without a budget that could solve problems on its own.",
    ],
    learned:
      "A community becomes more valuable when people have something meaningful to do together, not just something to watch.",
    testIntro: [
      "The Growth Strategist role already includes events, dinners and hackathons, so I would explore a small, focused developer activation built around the same instinct: a build session where participants make a useful messaging-based experience with Linq, supported by its current documentation.",
      "A working title: Build Something People Will Actually Text. It could begin as a tightly scoped virtual workshop or small hackathon with one developer community. I would not promise that an event automatically produces customers. I would design it so that participants leave having built something, and having a reason to share it.",
    ],
    pilotTitle: "A two to three-week pilot",
    pilot: [
      "Select one target developer community, and validate the concept with a few potential participants before announcing anything.",
      "Partner with an existing community organiser, if appropriate, rather than building an audience from zero.",
      "Design one practical build challenge that can be completed with Linq's current documentation.",
      "Create a simple registration page and a short outreach campaign.",
      "Host one workshop or building session, with help available while people build.",
      "Collect feedback, document the finished projects, and invite participants to share what they built.",
    ],
    metrics: [
      "Qualified registrations, and the registration to attendance rate.",
      "How many participants begin building, and how many complete a relevant product action.",
      "Repeat usage after the event, not just activity during it.",
      "Referrals: new developers brought in by participants themselves.",
    ],
    metricsNote:
      "Attendance is a leading indicator. A finished, shared project is closer to an outcome.",
    takeaway: "A community becomes more valuable when people have something meaningful to do together.",
  },
  {
    id: "experiment-3",
    number: "03",
    theme: "Campaign experimentation, email, research and conversion",
    title: "Don't just launch campaigns. Learn from them.",
    annotation:
      "Leading indicators tell you where to look. Business outcomes tell you what to do next.",
    experience: [
      "At Sergio & Co., my studio, I worked with an independent editorial project on its digital marketing strategy. The project taught me to think about creative work as part of a larger sequence: where someone discovers the product, what makes them interested, what convinces them to take the next step, and what happens after that first interaction.",
      "It also taught me discipline about attribution. A project's full commercial results belong to the project and everyone who worked on it, not to one person's campaign work.",
    ],
    did: [
      "I developed the digital marketing strategy, reviewed and approved creative assets, planned distribution across web and email, and personally executed the paid advertising and email marketing campaigns.",
    ],
    learned:
      "A campaign is a question, not an announcement. If it is not set up to teach you something, its budget only buys impressions.",
    testIntro: [
      "At Linq, I would develop a small, measurable acquisition to activation experiment for one clearly defined customer segment, chosen from Linq's positioning and accessible research, for example a particular type of developer or business building messaging agents. Not all potential users have the same problems, so the segment comes first and the message second.",
      "Any testing of email flows or activation sequences would need alignment with Linq's existing tools, user permissions and internal growth process. Email follow-up would only ever go to people who have appropriately opted in.",
    ],
    pilotTitle: "The first experiment",
    pilot: [
      "Research one narrowly defined customer segment and identify one concrete use case or recurring obstacle.",
      "Develop two messaging hypotheses that could plausibly change behaviour, and say in advance what each one is expected to do.",
      "Build or refine one focused landing page for that segment and use case.",
      "Test relevant content or outbound distribution against it.",
      "Design a short email follow-up sequence for opted-in users who started but did not activate.",
      "Analyse which messages lead to meaningful product engagement, and use the findings to decide what to iterate, expand or discontinue.",
    ],
    metrics: [
      "Qualified visitors, and landing page conversion for that segment.",
      "Activation rate, and time to first meaningful product action.",
      "Repeat product usage after activation.",
      "Qualitative insight from users who did not activate. They often explain the number.",
    ],
    metricsNote:
      "Conversion is a leading indicator. Activation and repeat usage are the business outcomes it should predict.",
    takeaway: "A good experiment should teach us something, even when it doesn't work.",
  },
];

export const LINQ_LINKS = {
  linkedin: "https://www.linkedin.com/in/sergio-pineros-c/",
  site: "https://www.sergiopineros.com/",
  email: "hello@sergioatelier.co",
  studio: "https://sergioatelier.co",
  linq: "https://linqapp.com/",
};
