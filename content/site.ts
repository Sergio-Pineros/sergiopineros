/**
 * All visitor-facing copy and links live here.
 * Flagged for Sergio's final edit — he has the last word on every line.
 */

export const TODO_STAN_URL = "TODO_STAN_URL";

export const site = {
  name: "Sergio Piñeros",
  location: "Chicago",
  timezone: "America/Chicago",
  url: "https://www.sergiopineros.com",
  title: "Sergio Piñeros — I make things.",
  description:
    "I make things. Sometimes brands, sometimes products, and lately these words — for curious readers, and for anyone looking to work together, including brands.",
  contactEmail: "hello@sergioatelier.co",
  atelierUrl: "https://sergioatelier.co/",
  substackUrl: "https://sergwrites.substack.com",
  instagramUrl: "https://www.instagram.com/serg.writes/",
  instagramHandle: "@serg.writes",
  threadsUrl: "https://www.threads.net/@serg.writes",
  stanUrl: TODO_STAN_URL,
  year: new Date().getFullYear(),

  masthead: {
    label: "Sergio Piñeros — Chicago",
  },

  hero: {
    h1Lead: "I make",
    h1Emph: "things.",
    subline:
      "Sometimes those things are brands and products made for other people through Sergio & Co., and lately they are also these words — carousels and longer pieces that follow an ordinary thing until it shows the bigger pattern it was part of all along.",
    aside: "lately, these words",
  },

  manifesto: {
    label: "Why I make this",
    paragraphs: [
      "I pay attention to ordinary things — a fruit, a brand, a tool, a habit — and follow how they were named, rebranded, and given meaning.",
      "The more we speak of something, the more we feed its existence, so naming should be handled carefully. I write to slow that process down and look at it with more care.",
    ],
    closing: "What are we making sacred?",
    substackLinkLabel: "Read it longer on Substack",
  },

  writing: {
    label: "Writing — @serg.writes",
    intro:
      "I write about AI, business, creativity, and the inner game, and about the hidden history of ordinary things, in carousels and short videos as @serg.writes and at more length on Substack.",
    series: [
      {
        name: "Nature, Rebranded",
        description:
          "How fruits — then leaves, minerals, and other ordinary things — were rebranded through history, and what that reveals about what we make sacred.",
        href: "https://sergwrites.substack.com",
      },
      {
        name: "AI, as it is actually being built",
        description:
          "Short videos and carousels on how things are made and learned, with the numbers checked, calm and curious.",
        href: "https://www.instagram.com/serg.writes/",
      },
      {
        name: "Mental reframes",
        description: "Concepts and inner-game reframes I think about often, one per piece.",
        href: "https://sergwrites.substack.com",
      },
      {
        name: "Notes from the studio",
        description: "Lessons from go-to-market and design work at Sergio & Co., when I write them.",
        href: "https://sergwrites.substack.com",
      },
    ],
  },

  work: {
    label: "Selected work",
    introBefore: "The fuller portfolio lives at ",
    introLinkLabel: "Sergio & Co.",
    introAfter: " What follows here is only a brief selection.",
    items: [
      {
        name: "Savron",
        description:
          "A luxury barbershop in Minneapolis: brand identity, interiors, and the system that runs the shop — scheduling, client records, digital passes, loyalty.",
        href: "https://sergioatelier.co/",
      },
      {
        name: "Grafti",
        description:
          "A brand with organic geometry and field-ready marketing assets, and a site that favours substance over spectacle.",
        href: "https://sergioatelier.co/",
      },
      {
        name: "Sergio & Co.",
        description:
          "My studio brand: monochromatic, sharp, systems for creative direction, writing, and go-to-market work for clients across the US and Latin America.",
        href: "https://sergioatelier.co/",
      },
    ],
    namesRow:
      "La Estancia · Onyx Lifestyle Club · Ecuabet · Savron · Esperanza United · 1z King · 17 Bits Records · Sweet Spot Leader · Estrada Cleaning Services · Source",
  },

  about: {
    label: "About",
    paragraphs: [
      "I make things in Chicago. For more than two years I ran Sergio & Co., a go-to-market and design studio, making brands, products, and the systems around them.",
      "I still do that work, and I now split my attention with writing — following ordinary things until they open onto bigger patterns, for readers who like to think slowly.",
      "Lately I am paying attention to how fruits, leaves, minerals, and other everyday things were given meaning, and to the inner game of making anything at all.",
    ],
  },

  contact: {
    label: "Contact",
    intro:
      "A brand partnership, a project, a question about a piece of writing, or a response to something I made — all of it can come through here.",
    submitLabel: "Send",
    success:
      "Thanks — I read everything that comes through here, and I will reply from my email.",
    error:
      "Something did not send. You can try again, or write me directly at the address below.",
    preferEmail: "Prefer email?",
    privacy:
      "Your message goes to my inbox. I do not share it, and there is no list attached to this form.",
    placeholder:
      "Write as you would in an email. There is no need to make it a pitch.",
    topics: [
      { value: "brand", label: "Brand partnership" },
      { value: "project", label: "Project / work inquiry" },
      { value: "writing", label: "A question about the writing" },
      { value: "hello", label: "Just saying hello" },
    ],
  },

  footer: {
    closing: "I make things.",
    colophonPrefix: "Sergio Piñeros — Chicago",
    colophonType: "Site set in Baskervville & DM Sans",
  },
} as const;

export type SiteContent = typeof site;

export function isPendingUrl(url: string) {
  return url.startsWith("TODO_");
}

export function navLinks(options?: { contactHref?: string }) {
  const contact = options?.contactHref ?? "/#contact";
  return [
    { label: "Writing", href: "/#writing" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: contact },
  ] as const;
}

export function elsewhereLinks() {
  const links: { label: string; href: string }[] = [
    { label: "Substack", href: site.substackUrl },
    { label: `Instagram ${site.instagramHandle}`, href: site.instagramUrl },
    { label: "Threads", href: site.threadsUrl },
    { label: "Sergio & Co.", href: site.atelierUrl },
  ];
  if (!isPendingUrl(site.stanUrl)) {
    links.splice(3, 0, { label: "Stan Store", href: site.stanUrl });
  }
  return links;
}
