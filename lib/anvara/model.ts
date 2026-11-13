import { Campaign, Opportunity, Sponsorship } from "./data";
export const clamp = (n: number) =>
  Math.max(1, Math.min(10, Math.round(n * 10) / 10));
export function quadrant(o: Opportunity) {
  return o.impact >= 5.5
    ? o.effort < 5.5
      ? "Quick Wins"
      : "Strategic Bets"
    : o.effort < 5.5
      ? "Nice to Have"
      : "Reconsider / Later";
}
export const priority = (o: Opportunity) =>
  (o.impact * (o.confidence / 10)) / o.effort;
export function roadmap(data: Opportunity[]) {
  const ranked = [...data].sort((a, b) => priority(b) - priority(a));
  const ready = (o: Opportunity, seen = new Set<string>()): boolean => {
    if (seen.has(o.id) || o.confidence < 6) return false;
    const visited = new Set(seen).add(o.id);
    return o.dependencies.every((id) => {
      const dependency = data.find((d) => d.id === id);
      return Boolean(dependency && ready(dependency, visited));
    });
  };
  return {
    now: ranked.filter((o) => o.impact >= 5.5 && !ready(o)),
    next: ranked.filter((o) => o.impact >= 5.5 && ready(o)),
    later: ranked.filter((o) => o.impact < 5.5),
    top: ranked[0],
  };
}
export function match(c: Campaign, s: Sponsorship) {
  const parts = [
    {
      label: "Budget",
      points: s.cost <= c.budget ? 25 : 0,
      why:
        s.cost <= c.budget
          ? `$${s.cost.toLocaleString()} fits your ceiling.`
          : "Package exceeds your budget.",
    },
    {
      label: "Audience",
      points: s.audiences.includes(c.audience) ? 30 : 0,
      why: s.audiences.includes(c.audience)
        ? `Organizer profile includes ${c.audience.toLowerCase()}.`
        : "Your selected audience is not in the organizer profile.",
    },
    {
      label: "Location",
      points:
        c.location === "Any US market" || s.location === c.location ? 20 : 0,
      why:
        c.location === "Any US market" || s.location === c.location
          ? "Within your selected market."
          : `Located in ${s.location}; outside your selected market.`,
    },
    {
      label: "Goal",
      points: s.goals.includes(c.goal) ? 25 : 0,
      why: s.goals.includes(c.goal)
        ? "Inventory supports your stated goal."
        : "Your goal is not a stated inventory use case.",
    },
  ];
  return {
    score: parts.reduce((n, p) => n + p.points, 0),
    parts,
    eligible: s.cost <= c.budget,
  };
}
export function makeBrief(c: Campaign, s: Sponsorship, notes: string) {
  return `Campaign inquiry — ${s.name}\n\nGoal: ${c.goal}\nAudience: ${c.audience}\nMarket: ${c.location}\nBudget ceiling: $${c.budget.toLocaleString()}\nIllustrative package: $${s.cost.toLocaleString()} — ${s.inventory}\n\nTiming and requirements: ${notes.trim()}\n\nPlease confirm availability, audience evidence, inclusions, category restrictions and the next step.\n\nFictional prototype. No inquiry has been sent.`;
}
