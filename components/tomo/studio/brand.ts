export const assets = {
  mark: "/tomo-experience/assets/tomo-compact.svg",
  wordmark: "/tomo-experience/assets/tomo-wordmark.svg",
  hero: "/tomo-studio/denim-hero.webp",
  label: "/tomo-studio/woven-label.webp",
};

export const palettes = {
  electric: { label: "Electric blue", background: "#243BB8", ink: "#FFFFFF", accent: "#DFFD63", role: "Expressive brand field" },
  sky: { label: "Sky", background: "#BBDDF8", ink: "#152147", accent: "#243BB8", role: "Conversation and guidance" },
  lime: { label: "Acid lime", background: "#DFFD63", ink: "#171A14", accent: "#243BB8", role: "Active states and actions" },
  sun: { label: "Warm yellow", background: "#FFC84B", ink: "#211C14", accent: "#243BB8", role: "Milestones and celebration" },
  blush: { label: "Soft pink", background: "#F4BDD0", ink: "#281D27", accent: "#243BB8", role: "Reflection and memories" },
  paper: { label: "Warm white", background: "#F7F5EB", ink: "#1C211C", accent: "#243BB8", role: "Product surfaces and reading" },
  ink: { label: "Near-black", background: "#1C211C", ink: "#F7F5EB", accent: "#DFFD63", role: "Type and high-contrast surfaces" },
} as const;

export const materials = {
  woven: { label: "Woven", detail: "A tight cotton weave for memories and objects worth keeping." },
  canvas: { label: "Canvas", detail: "A matte, open weave for plans and works in progress." },
  print: { label: "Screen print", detail: "Dense pigment and grain for posters and celebratory moments." },
  paper: { label: "Paper", detail: "A light fibrous surface for notes and reflection." },
  clean: { label: "Digital clean", detail: "An uninterrupted surface for reading numbers, dates and tasks." },
} as const;

export const settingsOptions = {
  palette: Object.keys(palettes) as (keyof typeof palettes)[],
  material: Object.keys(materials) as (keyof typeof materials)[],
  lockup: ["primary", "secondary", "mark", "mono"],
  type: ["stacked", "journal", "label"],
  format: ["poster", "tag", "widget"],
} as const;

export interface Settings {
  palette: keyof typeof palettes;
  material: keyof typeof materials;
  lockup: (typeof settingsOptions.lockup)[number];
  type: (typeof settingsOptions.type)[number];
  format: (typeof settingsOptions.format)[number];
  headline: string;
  scale: number;
  motion: boolean;
}

export const initialSettings: Settings = {
  palette: "electric",
  material: "woven",
  lockup: "primary",
  type: "stacked",
  format: "poster",
  headline: "your world, in progress.",
  scale: 100,
  motion: true,
};

export const compositions: Settings[] = [
  { ...initialSettings, palette: "lime", material: "print", type: "stacked", headline: "bet on yourself.", lockup: "mono", scale: 106 },
  { ...initialSettings, palette: "blush", material: "paper", type: "journal", headline: "something good happened.", format: "tag" },
  { ...initialSettings, palette: "sky", material: "clean", type: "label", headline: "text me about it.", format: "widget", lockup: "mark" },
  { ...initialSettings, palette: "sun", material: "canvas", type: "stacked", headline: "little wins count.", lockup: "secondary" },
  { ...initialSettings, palette: "ink", material: "woven", type: "journal", headline: "life lately.", format: "tag", lockup: "mono" },
];

export const principles = [
  { title: "Start with the person", summary: "Open with the words someone actually said. Give their next action a clear place to land." },
  { title: "Let context shape the layout", summary: "A run needs a measure. A busy day needs order. Good news deserves room to breathe." },
  { title: "Put expression where it helps", summary: "Keep dates, inputs and labels plain. Put grain, texture and scale on the surrounding canvas." },
  { title: "Make the useful thing beautiful", summary: "Give a progress bar or a checked task the same care as a headline." },
  { title: "Leave room for change", summary: "Keep every generated artifact editable, and use short transitions to show what changed." },
];

export function decodeSettings(value: unknown): Settings {
  const input = value && typeof value === "object" ? value as Partial<Settings> : {};
  return {
    palette: settingsOptions.palette.includes(input.palette!) ? input.palette! : initialSettings.palette,
    material: settingsOptions.material.includes(input.material!) ? input.material! : initialSettings.material,
    lockup: settingsOptions.lockup.includes(input.lockup!) ? input.lockup! : initialSettings.lockup,
    type: settingsOptions.type.includes(input.type!) ? input.type! : initialSettings.type,
    format: settingsOptions.format.includes(input.format!) ? input.format! : initialSettings.format,
    headline: typeof input.headline === "string" ? input.headline.slice(0, 64) : initialSettings.headline,
    scale: typeof input.scale === "number" && Number.isFinite(input.scale) ? Math.min(125, Math.max(75, input.scale)) : initialSettings.scale,
    motion: typeof input.motion === "boolean" ? input.motion : initialSettings.motion,
  };
}

export function formatPaletteTokens(palette: keyof typeof palettes) {
  const { background, ink, accent } = palettes[palette];
  return `--tomo-field: ${background};\n--tomo-ink: ${ink};\n--tomo-accent: ${accent};`;
}
