export type ProjectTheme = {
  bg: string;
  tagBg: string;
  tagBorder: string;
  insetShadow?: string;
};

export type ProjectTag = {
  label: string;
  rotation: number;
  top?: string;
  left?: string;
  right?: string;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  tagsLine: string;
  theme: ProjectTheme;
  tags: ProjectTag[];
  href?: string;
  comingSoon?: boolean;
  reverse?: boolean;
  assetLabel: string;
  assetNotes: string;
  image?: string;
  imageAlt?: string;
  imageRatio?: string;
};

export const HERO_TABS = [
  { id: "who", label: "WHO I AM" },
  { id: "build", label: "WHAT I MAKE" },
  { id: "believe", label: "WHAT I BELIEVE" },
  { id: "write", label: "WHAT I WRITE" },
  { id: "upto", label: "WHAT I'M UP TO" },
] as const;

export type HeroTabId = (typeof HERO_TABS)[number]["id"];

export type HeroPanel = {
  opening: string;
  emphasis: string;
  ending: string;
  script: string;
  note: string;
};

/** Three editorial lines share a consistent rhythm across the five questions. */
export const HERO_PANELS: Record<HeroTabId, HeroPanel> = {
  who: {
    opening: "I make things to",
    emphasis: "understand",
    ending: "the world. And myself.",
    script: "a little better, anyway.",
    note: "I'm Sergio. A Colombian artist, writer, and maker living in the U.S.",
  },
  build: {
    opening: "Words, sounds,",
    emphasis: "images,",
    ending: "and things you can hold.",
    script: "curiosity takes many forms.",
    note: "Sometimes a business. Sometimes a song. Always a way of finding out.",
  },
  believe: {
    opening: "What we notice",
    emphasis: "becomes",
    ending: "what matters to us.",
    script: "attention is a kind of devotion.",
    note: "I think what we pay attention to quietly becomes what we give meaning to.",
  },
  write: {
    opening: "Technology,",
    emphasis: "consciousness,",
    ending: "and being alive.",
    script: "no neat answers, mostly questions.",
    note: "Notes on the strange ways we make sense of the world. And occasionally, each other.",
  },
  upto: {
    opening: "Strange carousels.",
    emphasis: "New sounds.",
    ending: "A question taking shape.",
    script: "a few things in progress.",
    note: "Exploring music, Nature, Rebranded, and a reflection deck called What Are We Making Sacred?",
  },
};

export const CREATIVE_LINKS = [
  { label: "Writing", href: "https://sergwrites.substack.com" },
  { label: "Visual experiments", href: "https://www.instagram.com/serg.writes/" },
  { label: "Creative studio", href: "https://sergioatelier.co" },
] as const;

export const PROJECTS: Project[] = [
  {
    slug: "savron",
    name: "Savron",
    description:
      "An identity for Savron, from monograms and signage to digital passes. An exploration of how a small mark can carry a whole atmosphere.",
    tagsLine: "Brand Identity · Luxury · Visual Systems · Barbershop · Shipped",
    theme: {
      bg: "rgb(180, 158, 142)",
      tagBg: "rgb(140, 110, 95)",
      tagBorder: "rgb(168, 145, 130)",
      insetShadow: "inset 0 4px 4px rgb(210, 195, 185)",
    },
    tags: [
      { label: "Brand Identity", rotation: 10, top: "114px", left: "449px" },
      { label: "Luxury", rotation: -8, top: "107px", left: "42px" },
      { label: "Shipped", rotation: -18, top: "121px", left: "44px" },
      { label: "Visual Systems", rotation: 23, top: "132px", left: "450px" },
    ],
    assetLabel: "SAVRON brand hero",
    assetNotes: "Primary case study image: logo lockup, signage mockup, or brand board. 1200×800px min, PNG or JPG.",
    image: "/projects/savron.webp",
    imageAlt: "Savron Barbershop & Lounge website",
    imageRatio: "3 / 2",
  },
  {
    slug: "grafti",
    name: "Grafti",
    description:
      "Organic geometry for an agrotech brand. I worked across identity, marketing assets, and a website, looking for a visual language rooted in what Grafti does.",
    tagsLine: "Agrotech · Brand Identity · Packaging · Marketing Assets · Shipped",
    theme: {
      bg: "rgb(198, 208, 178)",
      tagBg: "rgb(158, 168, 138)",
      tagBorder: "rgb(178, 188, 158)",
    },
    tags: [
      { label: "Agrotech", rotation: 8, top: "112px", left: "48px" },
      { label: "Packaging", rotation: -10, top: "118px", right: "96px" },
      { label: "Shipped", rotation: 18, top: "128px", left: "38px" },
      { label: "Brand Identity", rotation: -15, top: "124px", right: "88px" },
    ],
    reverse: true,
    assetLabel: "Grafti brand hero",
    assetNotes: "Brand board, packaging mockup, or field campaign visual. 1200×800px min.",
    image: "/projects/grafti.webp",
    imageAlt: "Grafti website",
    imageRatio: "3 / 2",
  },
  {
    slug: "sergio-co",
    name: "Sergio & Co.",
    description:
      "The identity I made for my own creative studio. A place where visual systems, writing, and building things for other people meet.",
    tagsLine: "Studio · Creative Direction · Silent Luxury · Writing · Shipped",
    theme: {
      bg: "rgb(228, 225, 218)",
      tagBg: "rgb(180, 176, 168)",
      tagBorder: "rgb(200, 196, 188)",
    },
    tags: [
      { label: "Studio", rotation: -7, top: "116px", right: "92px" },
      { label: "Creative Direction", rotation: 12, top: "108px", left: "36px" },
      { label: "Shipped", rotation: -19, top: "126px", left: "42px" },
      { label: "Writing", rotation: 10, top: "130px", right: "84px" },
    ],
    href: "https://sergioatelier.co/",
    assetLabel: "Sergio & Co. studio",
    assetNotes: "Studio brand board, bento grid mockup, or sergioatelier.co screenshot. 1200×800px min.",
    image: "/projects/sergio-co.webp",
    imageAlt: "Sergio & Co. brand card",
    imageRatio: "3 / 2",
  },
  {
    slug: "savron-crm",
    name: "Savron CRM",
    description:
      "What does a barbershop need behind the scenes? I designed and built a platform for scheduling, client records, Wallet passes, and messages. Another kind of making.",
    tagsLine: "0 to 1 · Product Design · CRM · AI Systems · Shipped",
    theme: {
      bg: "rgb(168, 172, 192)",
      tagBg: "rgb(128, 132, 158)",
      tagBorder: "rgb(148, 152, 178)",
    },
    tags: [
      { label: "0 to 1", rotation: 10, top: "110px", right: "94px" },
      { label: "Product Design", rotation: -8, top: "106px", left: "34px" },
      { label: "Shipped", rotation: -18, top: "122px", left: "40px" },
      { label: "CRM", rotation: 23, top: "128px", right: "86px" },
    ],
    reverse: true,
    assetLabel: "Savron CRM product",
    assetNotes: "Dashboard screenshot, schedule grid, or host view UI. 1440×900px min, PNG.",
    image: "/projects/savron-crm.webp",
    imageAlt: "Savron CRM dashboard",
    imageRatio: "16 / 10",
  },
  {
    slug: "client-automation",
    name: "Client Automations",
    description:
      "An ongoing exploration of AI agents and custom workflows for founders. I'm interested in what happens when technology leaves more room for the human part.",
    tagsLine: "AI Agents · Workflow Automation · Coming Soon",
    theme: {
      bg: "rgb(210, 205, 198)",
      tagBg: "rgb(170, 165, 158)",
      tagBorder: "rgb(190, 185, 178)",
    },
    tags: [
      { label: "AI Agents", rotation: 8, top: "114px", left: "46px" },
      { label: "Automation", rotation: -12, top: "120px", right: "90px" },
      { label: "Coming Soon", rotation: 15, top: "128px", left: "52px" },
    ],
    comingSoon: true,
    assetLabel: "Automation case study",
    assetNotes: "Workflow diagram, agent UI, or before/after automation screenshot. TBD.",
  },
];
