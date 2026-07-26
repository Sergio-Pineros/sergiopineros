import type { Project, ProjectTag } from "./projects";

export type TagPosition = {
  top: string;
  left?: string;
  right?: string;
  rotation: number;
};

export type ProjectHoverConfig = {
  screenshot: { width: string; top: string };
  tabHeight: string;
  tags: TagPosition[];
};

const TAG_HOVER: Record<string, TagPosition[]> = {
  savron: [
    { top: "14px", right: "-70px", rotation: 10 },
    { top: "17px", left: "-158px", rotation: -8 },
    { top: "111px", left: "-96px", rotation: -18 },
    { top: "82px", right: "-126px", rotation: 23 },
  ],
  grafti: [
    { top: "-48px", left: "95px", rotation: 8 },
    { top: "-28px", right: "-58px", rotation: -10 },
    { top: "33px", right: "-45px", rotation: 18 },
    { top: "55px", left: "-18px", rotation: -15 },
  ],
  "sergio-co": [
    { top: "-40px", right: "-80px", rotation: -7 },
    { top: "10px", left: "-120px", rotation: 12 },
    { top: "90px", left: "-70px", rotation: -19 },
    { top: "60px", right: "-100px", rotation: 10 },
  ],
  "savron-crm": [
    { top: "14px", right: "-70px", rotation: 10 },
    { top: "-30px", left: "-50px", rotation: -8 },
    { top: "100px", left: "-80px", rotation: -18 },
    { top: "70px", right: "-110px", rotation: 23 },
  ],
  "client-automation": [
    { top: "-20px", left: "-40px", rotation: 8 },
    { top: "20px", right: "-60px", rotation: -12 },
    { top: "80px", left: "-30px", rotation: 15 },
  ],
};

/** Hover end-states modeled after sanvithi.com folder cards */
export const PROJECT_HOVER: Record<string, ProjectHoverConfig> = Object.fromEntries(
  Object.entries(TAG_HOVER).map(([slug, tags]) => [
    slug,
    {
      screenshot: getScreenshotHover(slug),
      tabHeight: "20%",
      tags,
    },
  ])
);

function getScreenshotHover(slug: string): { width: string; top: string } {
  switch (slug) {
    case "grafti":
      return { width: "70%", top: "20%" };
    case "sergio-co":
      return { width: "90%", top: "-53px" };
    case "savron-crm":
      return { width: "80%", top: "18%" };
    case "client-automation":
      return { width: "85%", top: "24%" };
    default:
      return { width: "90%", top: "22%" };
  }
}

export function tagToPosition(tag: ProjectTag): TagPosition {
  return {
    top: tag.top ?? "120px",
    left: tag.left,
    right: tag.right,
    rotation: tag.rotation,
  };
}

export function getHoverConfig(project: Project): ProjectHoverConfig {
  return PROJECT_HOVER[project.slug] ?? PROJECT_HOVER.savron;
}
