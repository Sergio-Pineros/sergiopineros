export const assets = {
  mark: "/tomo-studio/tomo-official-mark.svg",
  wordmark: "/tomo-experience/assets/tomo-wordmark.svg",
  hero: "/tomo-studio/daybreak.webp",
  cloud: "/tomo-experience/assets/drifting-cloud.webp",
};

export const stickers = {
  cloud: "/tomo-studio/sticker-cloud.webp",
  sparkle: "/tomo-studio/sticker-sparkle.webp",
  heart: "/tomo-studio/sticker-heart.webp",
  check: "/tomo-studio/sticker-check.webp",
} as const;

export const biomes = {
  run: { name: "The Loop", image: "/tomo-studio/biome-loop.webp", sticker: "sparkle", message: "i ran my first 5k!!", reply: "okay runner era 👀", caption: "A park for getting into a rhythm." },
  plan: { name: "The Garden", image: "/tomo-studio/biome-garden.webp", sticker: "check", message: "tomorrow is looking like a lot", reply: "one thing at a time. i brought a list.", caption: "A little room to put things in order." },
  win: { name: "The Meadow", image: "/tomo-studio/biome-meadow.webp", sticker: "heart", message: "i got the job!!!", reply: "WAIT. the one you practiced for in the kitchen?", caption: "A place to make good news feel big." },
  rest: { name: "The Cove", image: "/tomo-studio/biome-cove.webp", sticker: "cloud", message: "am i overthinking this", reply: "walk me through the bit you keep replaying.", caption: "A quiet place to think something through." },
} as const;

export const prototypeSelectionEvent = "tomo:prototype-selection";

export type BiomeName = keyof typeof biomes;
export type StickerName = keyof typeof stickers;

export const palettes = {
  electric: { label: "Periwinkle", background: "#DEDDFB", ink: "#26264A", accent: "#474AA6", role: "An active space for plans" },
  sky: { label: "Daybreak", background: "#D9EEFC", ink: "#152147", accent: "#3547A3", role: "Conversation and reflection" },
  lime: { label: "Mint", background: "#DDF0DA", ink: "#192D26", accent: "#357057", role: "Progress and follow-through" },
  sun: { label: "Lemon", background: "#FFF2B0", ink: "#302816", accent: "#795507", role: "Milestones and celebration" },
  blush: { label: "Rose", background: "#F9DEEB", ink: "#362035", accent: "#973E6C", role: "Memories worth keeping" },
  paper: { label: "Cloud white", background: "#FCFAF0", ink: "#24283A", accent: "#3547A3", role: "Product surfaces and reading" },
  ink: { label: "Twilight", background: "#242A4B", ink: "#FCFAF0", accent: "#FFF2B0", role: "High-contrast moments" },
} as const;

export const materials = {
  gloss: { label: "Glossy enamel", detail: "A soft rim and a touch of shine for little wins." },
  mist: { label: "Cloud mist", detail: "Diffused light for the quieter moments." },
  satin: { label: "Satin clay", detail: "Soft depth borrowed from the miniature landscapes." },
  paper: { label: "Matte", detail: "Even light for readable text and calm compositions." },
  clean: { label: "Digital clean", detail: "An uninterrupted surface for dates, tasks and numbers." },
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
  palette: "sky",
  material: "mist",
  lockup: "primary",
  type: "stacked",
  format: "poster",
  headline: "little wins count.",
  scale: 100,
  motion: true,
};

export const compositions: Settings[] = [
  { ...initialSettings, palette: "sun", material: "gloss", headline: "hype me up.", lockup: "mono", scale: 106 },
  { ...initialSettings, palette: "blush", material: "satin", type: "journal", headline: "good news looks good on you.", format: "tag" },
  { ...initialSettings, palette: "sky", material: "clean", type: "label", headline: "text me about it.", format: "widget", lockup: "mark" },
  { ...initialSettings, palette: "lime", material: "mist", headline: "runner era unlocked.", lockup: "secondary" },
  { ...initialSettings, palette: "ink", material: "paper", type: "journal", headline: "one thing at a time.", format: "tag", lockup: "mono" },
];

export const principles = [
  { title: "Today · Meet people in their messages.", summary: "Tomo lives inside the conversations people already have, and makes personal interfaces when they need more than text." },
  { title: "Opportunity · Keep the thread intact.", summary: "A tool should reflect what was said before it, and the next conversation should know what changed inside that tool." },
  { title: "Our hypothesis · Let people stay in control.", summary: "Make continuity visible, keep the interface adaptable, and ask before proactive follow-ups." },
];

const legacyMaterials: Record<string, Settings["material"]> = { woven: "mist", canvas: "satin", print: "gloss" };

export function decodeSettings(value: unknown): Settings {
  const input = value && typeof value === "object" ? value as Partial<Settings> : {};
  const material = typeof input.material === "string" && Object.hasOwn(legacyMaterials, input.material)
    ? legacyMaterials[input.material] : input.material;
  return {
    palette: input.palette && settingsOptions.palette.includes(input.palette) ? input.palette : initialSettings.palette,
    material: material && settingsOptions.material.includes(material) ? material : initialSettings.material,
    lockup: input.lockup && settingsOptions.lockup.includes(input.lockup) ? input.lockup : initialSettings.lockup,
    type: input.type && settingsOptions.type.includes(input.type) ? input.type : initialSettings.type,
    format: input.format && settingsOptions.format.includes(input.format) ? input.format : initialSettings.format,
    headline: typeof input.headline === "string" ? input.headline.slice(0, 64) : initialSettings.headline,
    scale: typeof input.scale === "number" && Number.isFinite(input.scale) ? Math.min(125, Math.max(75, input.scale)) : initialSettings.scale,
    motion: typeof input.motion === "boolean" ? input.motion : initialSettings.motion,
  };
}

export function formatPaletteTokens(palette: keyof typeof palettes) {
  const { background, ink, accent } = palettes[palette];
  return `--tomo-field: ${background};\n--tomo-ink: ${ink};\n--tomo-accent: ${accent};`;
}
