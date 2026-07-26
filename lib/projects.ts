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

export const PROJECTS: Project[] = [
  {
    slug: "savron",
    name: "Savron",
    description:
      "I built a luxury barbershop brand identity — from monogram systems and signage to digital passes and social templates — rooted in silent luxury and editorial restraint.",
    tagsLine: "Brand Identity ∙ Luxury ∙ Visual Systems ∙ Barbershop ∙ Shipped",
    theme: {
      bg: "rgb(180, 158, 142)",
      tagBg: "rgb(140, 110, 95)",
      tagBorder: "rgb(168, 145, 130)",
      insetShadow: "inset 0 4px 4px rgb(210, 195, 185)",
    },
    tags: [
      { label: "Brand Identity", rotation: 10, top: "28%", right: "18%" },
      { label: "Luxury", rotation: -8, top: "26%", left: "20%" },
      { label: "Shipped", rotation: -18, top: "30%", left: "14%" },
      { label: "Visual Systems", rotation: 23, top: "32%", right: "14%" },
    ],
    assetLabel: "SAVRON brand hero",
    assetNotes: "Primary case study image — logo lockup, signage mockup, or brand board. 1200×800px min, PNG or JPG.",
  },
  {
    slug: "grafti",
    name: "Grafti",
    description:
      "I designed an agrotech brand identity with organic geometry, field-ready marketing assets, and a digital presence built for substance over spectacle.",
    tagsLine: "Agrotech ∙ Brand Identity ∙ Packaging ∙ Marketing Assets ∙ Shipped",
    theme: {
      bg: "rgb(198, 208, 178)",
      tagBg: "rgb(158, 168, 138)",
      tagBorder: "rgb(178, 188, 158)",
    },
    tags: [
      { label: "Agrotech", rotation: 8, top: "27%", left: "22%" },
      { label: "Packaging", rotation: -10, top: "29%", right: "16%" },
      { label: "Shipped", rotation: 18, top: "31%", left: "15%" },
      { label: "Brand Identity", rotation: -15, top: "33%", right: "20%" },
    ],
    reverse: true,
    assetLabel: "Grafti brand hero",
    assetNotes: "Brand board, packaging mockup, or field campaign visual. 1200×800px min.",
  },
  {
    slug: "sergio-co",
    name: "Sergio & Co.",
    description:
      "I shaped my studio's own brand — monochromatic, sharp, and built on silent luxury. Bento-style systems for creative direction, writing, newsletters, and ICP research.",
    tagsLine: "Studio ∙ Creative Direction ∙ Silent Luxury ∙ Writing ∙ Shipped",
    theme: {
      bg: "rgb(228, 225, 218)",
      tagBg: "rgb(180, 176, 168)",
      tagBorder: "rgb(200, 196, 188)",
    },
    tags: [
      { label: "Studio", rotation: -7, top: "28%", right: "20%" },
      { label: "Creative Direction", rotation: 12, top: "26%", left: "18%" },
      { label: "Shipped", rotation: -19, top: "30%", left: "14%" },
      { label: "Writing", rotation: 10, top: "32%", right: "15%" },
    ],
    href: "https://sergioatelier.co/",
    assetLabel: "Sergio & Co. studio",
    assetNotes: "Studio brand board, bento grid mockup, or sergioatelier.co screenshot. 1200×800px min.",
  },
  {
    slug: "savron-crm",
    name: "Savron CRM",
    description:
      "I designed and built a full-stack barbershop management platform — scheduling, client databases, Apple Wallet ePasses, and automated SMS/email outreach in one cohesive product.",
    tagsLine: "0 to 1 ∙ Product Design ∙ CRM ∙ AI Systems ∙ Shipped",
    theme: {
      bg: "rgb(168, 172, 192)",
      tagBg: "rgb(128, 132, 158)",
      tagBorder: "rgb(148, 152, 178)",
    },
    tags: [
      { label: "0 to 1", rotation: 10, top: "27%", right: "17%" },
      { label: "Product Design", rotation: -8, top: "25%", left: "21%" },
      { label: "Shipped", rotation: -18, top: "29%", left: "15%" },
      { label: "CRM", rotation: 23, top: "31%", right: "14%" },
    ],
    reverse: true,
    assetLabel: "Savron CRM product",
    assetNotes: "Dashboard screenshot, schedule grid, or host view UI. 1440×900px min, PNG.",
  },
  {
    slug: "client-automation",
    name: "Client Automations",
    description:
      "I'm building AI agent workflows and custom automations for founders — case studies coming soon.",
    tagsLine: "AI Agents ∙ Workflow Automation ∙ Coming Soon",
    theme: {
      bg: "rgb(210, 205, 198)",
      tagBg: "rgb(170, 165, 158)",
      tagBorder: "rgb(190, 185, 178)",
    },
    tags: [
      { label: "AI Agents", rotation: 8, top: "28%", left: "20%" },
      { label: "Automation", rotation: -12, top: "30%", right: "18%" },
      { label: "Coming Soon", rotation: 15, top: "32%", left: "16%" },
    ],
    comingSoon: true,
    assetLabel: "Automation case study",
    assetNotes: "Workflow diagram, agent UI, or before/after automation screenshot. TBD.",
  },
];
