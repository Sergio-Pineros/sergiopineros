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
};

export const HERO_TABS = [
  { id: "who", label: "WHO I AM" },
  { id: "build", label: "WHAT I BUILD" },
  { id: "believe", label: "WHAT I BELIEVE" },
  { id: "write", label: "WHAT I WRITE" },
  { id: "upto", label: "WHAT I'M UP TO" },
] as const;

export type HeroTabId = (typeof HERO_TABS)[number]["id"];

export type HeroPanel = {
  headline: string;
  script: string;
  scriptTop?: string;
  scriptLeft?: string;
  scriptRotate?: number;
};

/** Per-tab hero copy — headline and handwritten script swap on tab click (sanvithi.com pattern) */
export const HERO_PANELS: Record<HeroTabId, HeroPanel> = {
  who: {
    headline:
      "Designer who creates meaningful experiences through brand, product, and systems design.",
    script: "who i am",
    scriptTop: "52%",
    scriptLeft: "50%",
    scriptRotate: -5,
  },
  build: {
    headline:
      "I build brand identities, digital products, and automations for teams that want to move faster.",
    script: "what i build",
    scriptTop: "48%",
    scriptLeft: "46%",
    scriptRotate: -4,
  },
  believe: {
    headline:
      "I believe good work feels inevitable: clear in thought, precise in form, and human at heart.",
    script: "what i believe",
    scriptTop: "54%",
    scriptLeft: "52%",
    scriptRotate: -6,
  },
  write: {
    headline:
      "I write about creativity, philosophy, mindset, and the slow discipline of developing taste.",
    script: "what i write",
    scriptTop: "50%",
    scriptLeft: "44%",
    scriptRotate: -3,
  },
  upto: {
    headline:
      "I'm looking for a team where brand craft and new technology can shape each other.",
    script: "what i'm up to",
    scriptTop: "56%",
    scriptLeft: "48%",
    scriptRotate: -5,
  },
};

export const PROJECTS: Project[] = [
  {
    slug: "savron",
    name: "Savron",
    description:
      "I built Savron's brand identity: monogram systems, signage, digital passes, and social templates. Quiet luxury, editorial restraint.",
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
  },
  {
    slug: "grafti",
    name: "Grafti",
    description:
      "I designed Grafti's brand with organic geometry, field-ready marketing assets, and a site that favors substance over spectacle.",
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
  },
  {
    slug: "sergio-co",
    name: "Sergio & Co.",
    description:
      "I built my studio brand: monochromatic, sharp, silent luxury. Bento-style systems for creative direction, writing, newsletters, and ICP research.",
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
  },
  {
    slug: "savron-crm",
    name: "Savron CRM",
    description:
      "I designed and built a barbershop management platform with scheduling, client records, Apple Wallet passes, and automated SMS/email in one product.",
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
  },
  {
    slug: "client-automation",
    name: "Client Automations",
    description:
      "I'm building AI agent workflows and custom automations for founders. Case studies coming soon.",
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
