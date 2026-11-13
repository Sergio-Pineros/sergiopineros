export type TomoMessage = {
  from: "user" | "tomo" | "friend";
  name?: string;
  text: string;
};

export type HeroExample = {
  prompt: string;
  response: string;
};

export const HERO_EXAMPLES: HeroExample[] = [
  {
    prompt: "i got the job!!",
    response:
      "Wait, THE job? The one you rehearsed answers for in your kitchen all last week? Okay. We are absolutely celebrating this properly. Tell me everything, starting with how it felt when they told you.",
  },
  {
    prompt: "help me plan my week",
    response:
      "Let's do it. Looking at what you have told me: two big work blocks, training on Tuesday and Thursday, and you wanted Friday night kept free. Want me to sketch the week around those, then set your reminders?",
  },
  {
    prompt: "am i overthinking this?",
    response:
      "Maybe a little, and that is not a criticism. Walk me through the part that keeps looping. Sometimes saying it out loud, even to me, is what makes it smaller.",
  },
  {
    prompt: "what should i cook tonight?",
    response:
      "You have eggs, spinach and that leftover rice, right? A garlicky fried rice with a fried egg on top, fifteen minutes, one pan. Want the quick version or the fancy version?",
  },
];

export type TomoMoment = {
  id: string;
  index: string;
  title: string;
  intro: string;
  accent: string;
  messages: TomoMessage[];
};

export const TOMO_MOMENTS: TomoMoment[] = [
  {
    id: "celebrate",
    index: "01",
    title: "Celebrate the wins",
    intro:
      "A milestone lands differently when someone remembers what it cost to get there. Tomo's replies can carry that context, so a win is met with more than a generic congratulations.",
    accent: "#ffc531",
    messages: [
      { from: "user", text: "I finally ran the 10k without stopping" },
      {
        from: "tomo",
        text: "Six weeks ago you told me running two blocks felt impossible. Look at you now. Screenshot this moment, you earned it. Recovery day tomorrow, or are we already talking about the next one?",
      },
    ],
  },
  {
    id: "on-track",
    index: "02",
    title: "Stay on track",
    intro:
      "Tomo can message first. A gentle check-in around a goal you set, at a moment you chose, works better than another notification you learn to ignore.",
    accent: "#a8c3a0",
    messages: [
      {
        from: "tomo",
        text: "Morning check-in, day four of Spanish before work. Ten minutes counts. Want yesterday's phrases again, or new ones?",
      },
      { from: "user", text: "yesterday's, quick round" },
      { from: "tomo", text: "Deal. First one: how do you say 'I am getting better at this'?" },
    ],
  },
  {
    id: "get-done",
    index: "03",
    title: "Get things done",
    intro:
      "Everyday planning, in the thread where you already think out loud. Lists, reminders and schedule help, without opening a single new tool.",
    accent: "#ffb59e",
    messages: [
      { from: "user", text: "mom's birthday is saturday and i have NOTHING planned" },
      {
        from: "tomo",
        text: "Okay, let's fix that in the next two minutes. Flowers ordered by Thursday, dinner reservation for Saturday at 7, and I will remind you Friday to pick up the card. Which restaurant has she been hinting about?",
      },
    ],
  },
  {
    id: "group",
    index: "04",
    title: "Bring Tomo into the group",
    intro:
      "Add Tomo to a group chat and the planning stops living in one person's head. Ideas get gathered, a plan takes shape, and the thread stays fun.",
    accent: "#a9c7e8",
    messages: [
      { from: "friend", name: "Maya", text: "picnic sunday?? please say yes" },
      { from: "friend", name: "Leo", text: "yes but someone else has to organise it this time" },
      {
        from: "tomo",
        text: "I volunteer. Sunday, 1pm, the park by the river. Maya: drinks. Leo: the speaker you keep bragging about. I will keep the list and nudge everyone Saturday. Who is bringing food?",
      },
    ],
  },
];

export const TOMO_STEPS = [
  {
    number: "01",
    title: "Start with a text.",
    text: "No new habit to build. Tomo lives in your messages, the place you already open all day.",
  },
  {
    number: "02",
    title: "Tell Tomo what's on your mind.",
    text: "A goal, a worry, a half-formed plan, a question about dinner. Say it the way you would say it to a friend.",
  },
  {
    number: "03",
    title: "Come back whenever you need a hand.",
    text: "To celebrate, to plan, to get back on track. The conversation is still there, right where you left it.",
  },
] as const;

export const TOMO_LINKS = {
  site: "https://www.tomo.ai/",
  privacy: "https://www.tomo.ai/privacy",
  careers: "https://jobs.ashbyhq.com/tomo.ai",
  role: "https://jobs.ashbyhq.com/tomo.ai/f77a861f-acdc-4ae4-b88e-bde4e33ebc12",
  sergioSite: "https://sergiopineros.com",
  linkedin: "https://www.linkedin.com/in/sergio-pineros-c/",
};
