import type { BiomeName } from "./brand";

export const medalDesigns = {
  art: { image: "/tomo-studio/medal-palette.webp", biome: "plan", tint: "#ede6fa" },
  movement: { image: "/tomo-studio/medal-shoe.webp", biome: "run", tint: "#e0f0db" },
  growth: { image: "/tomo-studio/medal-sprout.webp", biome: "rest", tint: "#e1effb" },
  moment: { image: "/tomo-studio/medal-star.webp", biome: "win", tint: "#f9e5ed" },
} satisfies Record<string, { image: string; biome: BiomeName; tint: string }>;

export type MedalDesign = keyof typeof medalDesigns;

const activities = [
  { id: "painting", pattern: /\b(paint(?:s|ed|ing)?|watercolo[u]?r)\b/i, title: "A day for painting", design: "art" },
  { id: "drawing", pattern: /\b(draw(?:s|ing)?|drew|sketch(?:ed|ing)?)\b/i, title: "A little time to draw", design: "art" },
  { id: "music", pattern: /\b(guitar|piano|violin|keyboard|drums|singing|sang|music)\b/i, title: "A little time for music", design: "art" },
  { id: "running", pattern: /\b(ran|run(?:s|ning)?|jog(?:ged|ging)?|\d+k)\b/i, title: "A run to remember", design: "movement" },
  { id: "walking", pattern: /\b(walk(?:s|ed|ing)?|hik(?:e|ed|ing))\b/i, title: "Made time for a walk", design: "movement" },
  { id: "cycling", pattern: /\b(bik(?:e|ed|ing)|cycl(?:e|ed|ing))\b/i, title: "A little time on two wheels", design: "movement" },
  { id: "gardening", pattern: /\b(garden(?:ed|ing)?|seedlings?|planted|plants)\b/i, title: "Something to watch grow", design: "growth" },
  { id: "reading", pattern: /\b(read(?:ing)?|book|novel)\b/i, title: "A few pages for myself", design: "growth" },
  { id: "cooking", pattern: /\b(cook(?:s|ed|ing)?|bak(?:e|ed|ing)|recipe)\b/i, title: "Made something good", design: "growth" },
] as const;

export type MedalActivity = (typeof activities)[number]["id"] | "other";
type MedalEntry = { message: string; savedAt: string };
export type Medal = { id: string; title: string; activity: MedalActivity; design: MedalDesign; entries: MedalEntry[] };
export type MedalDraft = { message: string; title: string; activity: MedalActivity; design: MedalDesign };

export const medalExamples = [
  { label: "Back to painting", message: "I painted again today after months away." },
  { label: "Another painting day", message: "I painted again this Sunday, just for the fun of it." },
  { label: "A little walk", message: "I took a walk before work and watched the sun come up." },
];

export const medalStorageKey = "tomo-medals-v1";
export const maxMedalTitle = 64;
export const maxMedalMessage = 280;

export function suggestMedal(message: string): MedalDraft {
  const activity = activities.find(({ pattern }) => pattern.test(message));
  const isPaintingComeback = activity?.id === "painting" && /\b(months away|first time|after a break|back to painting)\b/i.test(message);
  const fallbackTitle = message.length > 48 ? `${message.slice(0, 45).trimEnd()}…` : message;
  return {
    message,
    activity: activity?.id ?? "other",
    design: activity?.design ?? "moment",
    title: isPaintingComeback ? "I painted again" : activity?.title ?? fallbackTitle,
  };
}

export function readMedals(raw: string | null): Medal[] {
  if (!raw) return [];
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((item): item is Medal =>
    item && typeof item.id === "string" && typeof item.title === "string" &&
    typeof item.design === "string" && Object.hasOwn(medalDesigns, item.design) &&
    (item.activity === "other" || activities.some(({ id }) => id === item.activity)) &&
    Array.isArray(item.entries) && item.entries.length > 0 &&
    item.entries.every((entry: MedalEntry) => entry && typeof entry.message === "string" &&
      typeof entry.savedAt === "string" && Number.isFinite(Date.parse(entry.savedAt)))
  );
}
