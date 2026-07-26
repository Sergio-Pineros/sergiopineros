import type { Project } from "./projects";

export type HoverTarget = {
  top?: string;
  left?: string;
  right?: string;
  rotation?: number;
};

export type ProjectHoverConfig = {
  screenshot: { width: string; top: string };
  tabHeight: string;
  tags: HoverTarget[];
};

/** Hover end-states modeled after sanvithi.com folder cards */
export const PROJECT_HOVER: Record<string, ProjectHoverConfig> = {
  savron: {
    screenshot: { width: "90%", top: "22%" },
    tabHeight: "20%",
    tags: [
      { top: "14px", right: "-70px", rotation: 10 },
      { top: "17px", left: "-158px", rotation: -8 },
      { top: "111px", left: "-96px", rotation: -18 },
      { top: "82px", right: "-126px", rotation: 23 },
    ],
  },
  grafti: {
    screenshot: { width: "70%", top: "20%" },
    tabHeight: "20%",
    tags: [
      { top: "-100px", left: "95px", rotation: 8 },
      { top: "-60px", right: "-58px", rotation: -10 },
      { top: "33px", right: "-45px", rotation: 18 },
      { top: "55px", left: "-18px", rotation: -15 },
    ],
  },
  "sergio-co": {
    screenshot: { width: "90%", top: "-53px" },
    tabHeight: "20%",
    tags: [
      { top: "-40px", right: "-80px", rotation: -7 },
      { top: "10px", left: "-120px", rotation: 12 },
      { top: "90px", left: "-70px", rotation: -19 },
      { top: "60px", right: "-100px", rotation: 10 },
    ],
  },
  "savron-crm": {
    screenshot: { width: "80%", top: "18%" },
    tabHeight: "20%",
    tags: [
      { top: "14px", right: "-70px", rotation: 10 },
      { top: "-30px", left: "-50px", rotation: -8 },
      { top: "100px", left: "-80px", rotation: -18 },
      { top: "70px", right: "-110px", rotation: 23 },
    ],
  },
  "client-automation": {
    screenshot: { width: "85%", top: "24%" },
    tabHeight: "20%",
    tags: [
      { top: "-20px", left: "-40px", rotation: 8 },
      { top: "20px", right: "-60px", rotation: -12 },
      { top: "80px", left: "-30px", rotation: 15 },
    ],
  },
};

export function getHoverConfig(project: Project): ProjectHoverConfig {
  return PROJECT_HOVER[project.slug] ?? PROJECT_HOVER.savron;
}
