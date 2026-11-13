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
    title: "Show the moment it becomes useful.",
    intro:
      "Linq is a tool for building. Most people will not read about messaging tools and just get it. They need to see a real thing, working, solving a real problem. So I would make short demos that do exactly that, and call the set Built with Linq.",
    steps: [
      {
        name: "Pick",
        text: "Pick a few use cases from public examples, like the real agents people can text in Linq's Agent Store, and from what the team hears from users.",
        produces: "A short list of demos to make. Each one is about a single problem.",
        ready: ["Public examples of what people build with Linq", "Time with the team to hear what users ask for", "A working product we can show"],
      },
      {
        name: "Make",
        text: "Write and make one short demo for each use case. Keep the shape the same every time. This was the problem. This is what was built. This is how it works. This is where to try it.",
        produces: "The demos themselves, ready to watch in under a minute each.",
        ready: ["A plain script for each demo", "The product, working, on screen", "One person to check the facts before anything goes out"],
      },
      {
        name: "Share",
        text: "Put the demos on one simple page with a clear next step, like reading the docs or starting a trial. Share them where developers and builders already spend time. Try the same demo with two ways of saying it, and see which one people act on.",
        produces: "One page with the demos on it, and a first read on which message works.",
        ready: ["One simple landing page", "Two ways of saying the same thing, to test", "Help from the team on who to reach"],
      },
      {
        name: "Learn",
        text: "Look at what happened. Who watched. Who signed up. Who built a first thing. Use that to pick the next demos, and stop making the kind nobody acts on.",
        produces: "A clear call on what to make next, and what to drop.",
        ready: ["The sign up and first build numbers", "Notes on what people asked about", "A short review with the team"],
      },
    ],
    goal: "People trust what they can see working. Good demos help the right builders choose Linq, and give them a clear path to try it.",
    measure: [
      "Visits from the right kind of people, not just any visits.",
      "How many of them sign up.",
      "How many build a first working thing after signing up.",
      "Which demos get saved, shared or asked about by developers.",
    ],
    experienceTitle: "Where my experience fits",
    experience: [
      "At Fofo Labs I worked with restaurants. We learned fast that talking about a restaurant did not do much. People had to see the food, the room and the feeling of being there. That is when they cared.",
      "At La Estancia Steakhouse, our team made short videos with that idea. The work brought in about 540,000 views on TikTok and more than 1,200 new followers in the first month. It was a team result, and views are not sales. My part was helping plan the content, working on getting new customers, and keeping track of which videos people actually responded to.",
      "The lesson I bring to Linq: people get it when they can see it. If the value is clear in a few seconds, they want to know more.",
    ],
  },
  {
    id: "build-together",
    tab: "Build together",
    title: "Give people a reason to build together.",
    intro:
      "Planning and running events and hackathons is part of this job at Linq. A build session does two jobs at once. Developers learn Linq by using it, and they make things they want to show other people. That is how new users find Linq without ads doing all the work.",
    steps: [
      {
        name: "Ask",
        text: "Pick one developer community. Ask a few of its members if a build session is useful to them, and what they would want to build.",
        produces: "A clear yes or no, and a topic people actually care about.",
        ready: ["One community in mind", "A few short talks with its members", "One practical use case Linq can support today"],
      },
      {
        name: "Partner",
        text: "Work with an organiser from that community, if we can, instead of starting from zero. Agree on the day, the plan and how people sign up.",
        produces: "A date, a simple plan, and an invite in plain words.",
        ready: ["A partner who can reach the right people", "A host who can help while people build", "A short sign up page"],
      },
      {
        name: "Gather",
        text: "Run one session, online first. People bring a real problem, build a small messaging agent with Linq during the session, and show it at the end. Keep it small on purpose. The goal is that most people who come actually finish something.",
        produces: "Finished projects, real feedback, and people who have used Linq for real.",
        ready: ["One simple build task the current docs support", "Help on hand during the session", "A way to collect what people made"],
      },
      {
        name: "Follow through",
        text: "Write up what people made, with their okay, and share it back to the community. Invite them to the next one. Check who is still building some weeks later.",
        produces: "Stories the community shares for us, and a group that wants to come back.",
        ready: ["Permission from the builders to share their work", "A short write up of each project", "A date for the next session"],
      },
    ],
    goal: "People who take part in a thing feel part of it. A session where developers build something real earns trust, and the work they share brings in the next builders.",
    measure: [
      "Sign ups from the right kind of developers.",
      "How many of them show up.",
      "How many start building, and how many finish.",
      "Who is still using Linq some weeks later.",
      "Who brings a friend next time.",
    ],
    experienceTitle: "Where my experience fits",
    experience: [
      "I co-founded 17 Bits Records in Colombia. We put on concerts, workshops and projects with artists. I helped with the planning, the people and the many small jobs that make an event happen.",
      "What I saw, again and again: people who take part in a thing feel part of it. People who only watch, forget it by next week.",
      "The lesson I bring to Linq: doing a thing together builds a stronger tie than hearing about it. The doing is the point.",
    ],
  },
  {
    id: "campaigns-that-teach",
    tab: "Campaigns that teach",
    title: "Run campaigns to learn, not just to launch.",
    intro:
      "This job includes supporting paid, email and content work, and researching customers and competitors. That work pays off when each campaign answers one clear question. Then the team knows what to do more of, and what to stop.",
    steps: [
      {
        name: "Research",
        text: "Pick one kind of customer, based on what Linq already knows and what we can learn. Learn the problem they know well, and the words they use for it. Look at competitors too, and what they promise.",
        produces: "One kind of customer, one problem, in their own words.",
        ready: ["What Linq already knows about its users", "Talks or research with that kind of customer", "A plain look at what competitors say"],
      },
      {
        name: "Write",
        text: "Write two ways of talking about Linq for that problem, and say up front what we expect each one to do. Build or fix one simple landing page for that customer and that problem.",
        produces: "Two messages to test, and one page that matches them.",
        ready: ["Two clear messages", "One simple landing page", "A way to tell the two tests apart in the results"],
      },
      {
        name: "Run",
        text: "Send the right people to the page through content, ads or outreach. People who sign up but do not get started get a short email follow up, only if they agreed to hear from Linq.",
        produces: "Results for each message, from real people in the right group.",
        ready: ["The content or ads, ready to run", "A short follow up email for people who opted in", "Alignment with Linq's own tools and way of working"],
      },
      {
        name: "Decide",
        text: "Look at the results with the Head of Product and Growth. Agree on what to keep, what to change and what to drop, so the next campaign starts smarter.",
        produces: "A clear call, and the next test already shaped by what we learned.",
        ready: ["Sign up and getting started numbers", "What people who did not act told us about why", "Time with the team to decide together"],
      },
    ],
    goal: "Each campaign should teach one clear thing. That is how a small team stops guessing and puts its time and money where they work.",
    measure: [
      "Visits from the right kind of customer.",
      "How many of them sign up on the page.",
      "How many get a first thing working, and how fast.",
      "Who keeps using Linq after that.",
      "What people who did not sign up, or did not get started, tell us about why.",
    ],
    experienceTitle: "Where my experience fits",
    experience: [
      "At Sergio & Co., my studio, I worked on the marketing of an independent magazine project. I set the marketing plan, checked and approved the creative work, planned where it would run, and ran the paid ads and the email campaigns myself.",
      "The work made me think in a chain. Where do people first hear about it. What makes them care. What makes them act. What happens after they do. If one step is weak, the rest cannot fix it. A campaign should tell you which step is weak.",
      "It also taught me to be honest about credit. The project's results belong to the project and its team. My part was the marketing work.",
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
