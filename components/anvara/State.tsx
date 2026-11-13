"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  Campaign,
  defaultCampaign,
  opportunities,
  Opportunity,
  sponsorships,
} from "@/lib/anvara/data";
import { clamp } from "@/lib/anvara/model";
type State = {
  data: Opportunity[];
  update: (
    id: string,
    patch: Partial<Pick<Opportunity, "effort" | "impact" | "confidence">>,
  ) => void;
  reset: () => void;
  campaign: Campaign;
  setCampaign: (c: Campaign) => void;
  shortlist: string[];
  toggleShortlist: (id: string) => void;
  selected: string;
  select: (id: string) => void;
  activeSponsor: string;
  setActiveSponsor: (id: string) => void;
  lab: "match" | "brief" | "outcomes";
  setLab: (v: "match" | "brief" | "outcomes") => void;
};
const Context = createContext<State | null>(null);
const key = "anvara-exploration-v1";
export function ExplorationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(opportunities);
  const [campaign, setCampaign] = useState(defaultCampaign);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [selected, select] = useState("rationale");
  const [activeSponsor, setActiveSponsor] = useState("afterlight");
  const [lab, setLab] = useState<State["lab"]>("match");
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = JSON.parse(sessionStorage.getItem(key) || "null");
      if (raw) {
        if (Array.isArray(raw.estimates))
          setData(
            opportunities.map((o) => {
              const saved = raw.estimates.find(
                (d: { id: string }) => d.id === o.id,
              );
              return saved &&
                ["effort", "impact", "confidence"].every(
                  (k) =>
                    typeof saved[k] === "number" && Number.isFinite(saved[k]),
                )
                ? {
                    ...o,
                    effort: clamp(saved.effort),
                    impact: clamp(saved.impact),
                    confidence: clamp(saved.confidence),
                  }
                : o;
            }),
          );
        if (
          raw.campaign &&
          [10000, 20000, 40000, 75000].includes(raw.campaign.budget) &&
          [
            "Young professionals",
            "Sports fans",
            "Culture seekers",
            "Local families",
          ].includes(raw.campaign.audience) &&
          ["New York", "Chicago", "Minneapolis", "Any US market"].includes(
            raw.campaign.location,
          ) &&
          [
            "Brand awareness",
            "Product sampling",
            "Community engagement",
          ].includes(raw.campaign.goal)
        )
          setCampaign(raw.campaign);
        if (sponsorships.some((s) => s.id === raw.activeSponsor))
          setActiveSponsor(raw.activeSponsor);
        if (Array.isArray(raw.shortlist))
          setShortlist(
            raw.shortlist.filter((id: string) =>
              sponsorships.some((s) => s.id === id),
            ),
          );
      }
    } catch {
      /* Storage is optional. */
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded)
      try {
        sessionStorage.setItem(
          key,
          JSON.stringify({
            estimates: data.map(({ id, effort, impact, confidence }) => ({
              id,
              effort,
              impact,
              confidence,
            })),
            campaign,
            shortlist,
            activeSponsor,
          }),
        );
      } catch {
        /* Private mode still works in memory. */
      }
  }, [data, campaign, shortlist, activeSponsor, loaded]);
  const update: State["update"] = (id, patch) =>
    setData((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              ...Object.fromEntries(
                Object.entries(patch).map(([k, v]) => [k, clamp(v)]),
              ),
            }
          : o,
      ),
    );
  return (
    <Context.Provider
      value={{
        data,
        update,
        reset: () => setData(opportunities.map((o) => ({ ...o }))),
        campaign,
        setCampaign,
        shortlist,
        toggleShortlist: (id) =>
          setShortlist((p) =>
            p.includes(id) ? p.filter((s) => s !== id) : [...p, id],
          ),
        selected,
        select,
        activeSponsor,
        setActiveSponsor,
        lab,
        setLab,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useExploration() {
  const state = useContext(Context);
  if (!state) throw Error("ExplorationProvider is required");
  return state;
}
