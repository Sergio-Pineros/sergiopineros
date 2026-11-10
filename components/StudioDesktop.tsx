"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { Workflow } from "lucide-react";
import { useTheme } from "next-themes";
import { PROJECTS, CREATIVE_LINKS, type Project } from "@/lib/projects";
import AttentionEye from "@/components/AttentionEye";
import WavesWallpaper from "@/components/WavesWallpaper";
import { CinematicThemeSwitcher } from "@/components/ui/cinematic-theme-switcher";

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";

type OpenWindow = {
  slug: string;
  x: number;
  y: number;
  z: number;
  originX: number;
  originY: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  origin?: DOMRect | null;
};

function FolderPreview({ project }: { project: Project }) {
  return (
    <span className="folder-preview" aria-hidden="true" style={{ "--folder-color": project.theme.bg } as CSSProperties}>
      <svg className="folder-preview__back" viewBox="0 0 100 82" fill="none">
        <path d="M5 17a7 7 0 0 1 7-7h26l9 9h41a7 7 0 0 1 7 7v45a6 6 0 0 1-6 6H11a6 6 0 0 1-6-6Z" />
      </svg>
      <span className="folder-preview__contents">
        {project.artwork ? <AttentionEye /> : project.image ? (
          <Image src={project.image} alt="" fill sizes="96px" style={{ objectFit: "cover" }} />
        ) : <Workflow className="folder-preview__symbol" strokeWidth={1.2} />}
      </span>
      <svg className="folder-preview__front" viewBox="0 0 100 82" fill="none">
        <path d="M5 37a6 6 0 0 1 6-6h78a6 6 0 0 1 6 6v34a6 6 0 0 1-6 6H11a6 6 0 0 1-6-6Z" />
      </svg>
    </span>
  );
}

function formatClock(now: Date) {
  return now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export default function StudioDesktop({ open, onClose, origin = null }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [zTop, setZTop] = useState(1);
  const [now, setNow] = useState(() => new Date());
  const dragRef = useRef<{
    slug: string;
    ox: number;
    oy: number;
    sx: number;
    sy: number;
  } | null>(null);
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const tick = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(tick);
  }, [open]);

  useEffect(() => {
    if (!open || !rootRef.current) return;
    const node = rootRef.current;
    if (reduced) {
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }
    const ox = origin ? origin.left + origin.width / 2 : window.innerWidth / 2;
    const oy = origin ? origin.top + origin.height / 2 : window.innerHeight / 2;
    node.style.transformOrigin = `${ox}px ${oy}px`;
    node.animate(
      [
        { opacity: 0, transform: "scale(0.92)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 480, easing: EASE_OUT, fill: "forwards" }
    );
  }, [open, origin, reduced]);

  useEffect(() => {
    if (!open || !rootRef.current) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const root = rootRef.current;
    root.querySelector<HTMLButtonElement>("button")?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const targets = Array.from(root.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'))
        .filter((node) => node.getClientRects().length > 0);
      const first = targets[0];
      const last = targets[targets.length - 1];
      if (event.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    root.addEventListener("keydown", trapFocus);
    return () => {
      root.removeEventListener("keydown", trapFocus);
      previousFocus?.focus();
    };
  }, [open]);

  const closeTopWindow = useCallback(() => {
    setWindows((prev) => {
      if (!prev.length) return prev;
      const top = [...prev].sort((a, b) => b.z - a.z)[0];
      return prev.filter((item) => item.slug !== top.slug);
    });
  }, []);

  useEffect(() => {
    if (!open) {
      setWindows([]);
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (windows.length) closeTopWindow();
      else onClose();
    };

    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose, windows.length, closeTopWindow]);

  const openFolder = (project: Project, from: DOMRect | null) => {
    const mobile = window.innerWidth < 720;
    const width = mobile ? window.innerWidth - 40 : Math.min(620, window.innerWidth - 32);
    const height = mobile ? window.innerHeight : Math.min(520, window.innerHeight - 96);
    const originX = from ? from.left + from.width / 2 : window.innerWidth / 2;
    const originY = from ? from.top + from.height / 2 : window.innerHeight / 2;
    const x = mobile ? 20 : Math.max(12, Math.min(originX - width / 2, window.innerWidth - width - 12));
    const y = mobile ? 44 : Math.max(40, Math.min(originY - 24, window.innerHeight - height - 88));

    setWindows((prev) => {
      const existing = prev.find((item) => item.slug === project.slug);
      const nextZ = zTop + 1;
      setZTop(nextZ);
      if (existing) {
        return prev.map((item) => (item.slug === project.slug ? { ...item, z: nextZ } : item));
      }
      return [...prev, { slug: project.slug, x, y, z: nextZ, originX, originY }];
    });
  };

  const focusWindow = (slug: string) => {
    setWindows((prev) => {
      const nextZ = zTop + 1;
      setZTop(nextZ);
      return prev.map((item) => (item.slug === slug ? { ...item, z: nextZ } : item));
    });
  };

  const closeWindow = (slug: string) => {
    setWindows((prev) => prev.filter((item) => item.slug !== slug));
  };

  const onTitlePointerDown = (event: React.PointerEvent, win: OpenWindow) => {
    if (window.innerWidth < 720) return;
    if ((event.target as HTMLElement).closest("button")) return;
    focusWindow(win.slug);
    dragRef.current = {
      slug: win.slug,
      ox: win.x,
      oy: win.y,
      sx: event.clientX,
      sy: event.clientY,
    };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const onTitlePointerMove = (event: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = event.clientX - drag.sx;
    const dy = event.clientY - drag.sy;
    setWindows((prev) =>
      prev.map((item) =>
        item.slug === drag.slug
          ? {
              ...item,
              x: Math.max(0, Math.min(drag.ox + dx, window.innerWidth - 160)),
              y: Math.max(28, Math.min(drag.oy + dy, window.innerHeight - 80)),
            }
          : item
      )
    );
  };

  const onTitlePointerUp = () => {
    dragRef.current = null;
  };

  if (!open) return null;

  return (
    <div
      ref={rootRef}
      className={`os-desktop${isDark ? " dark" : ""}`}
      data-theme={isDark ? "dark" : "light"}
      role="dialog"
      aria-modal="true"
      aria-label="Studio desktop"
    >
      <WavesWallpaper
        running={open}
        reducedMotion={reduced}
        brightness={isDark ? 0.07 : 0.12}
      />

      <header className="os-menubar">
        <button type="button" className="os-menubar__home" onClick={onClose}>
          Home
        </button>
        <span className="os-menubar__app">Things I’ve made</span>
        <div className="os-menubar__end">
          <div className="os-theme">
            <CinematicThemeSwitcher />
          </div>
          <span className="os-menubar__clock">{formatClock(now)}</span>
        </div>
      </header>

      <div className="os-desktop__field">
        {PROJECTS.map((project) => (
          <button
            key={project.slug}
            type="button"
            className={`os-folder os-folder--${project.slug}`}
            onClick={(event) => openFolder(project, event.currentTarget.getBoundingClientRect())}
          >
            <FolderPreview project={project} />
            <span className="os-folder__label">
              {project.name}
            </span>
          </button>
        ))}
      </div>

      <nav className="os-desktop__links" aria-label="Elsewhere in my world">
        {CREATIVE_LINKS.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
        ))}
      </nav>

      {windows.length > 0 && <button type="button" className="os-window-shade" aria-label="Close preview" onClick={closeTopWindow} />}
      {windows.map((win) => {
        const project = PROJECTS.find((item) => item.slug === win.slug);
        if (!project) return null;
        return (
          <article
            key={win.slug}
            className="os-window"
            style={{
              "--window-x": `${win.x}px`,
              "--window-y": `${win.y}px`,
              zIndex: 20 + win.z,
              transformOrigin: `${win.originX - win.x}px ${win.originY - win.y}px`,
            } as CSSProperties}
            aria-labelledby={`window-title-${project.slug}`}
            onMouseDown={() => focusWindow(win.slug)}
          >
            <header
              className="os-window__title"
              onPointerDown={(event) => onTitlePointerDown(event, win)}
              onPointerMove={onTitlePointerMove}
              onPointerUp={onTitlePointerUp}
            >
              <button
                type="button"
                className="os-window__close"
                aria-label={`Close ${project.name}`}
                onClick={() => {
                  closeWindow(win.slug);
                  rootRef.current?.querySelector<HTMLButtonElement>(`.os-folder--${project.slug}`)?.focus();
                }}
              />
              <span id={`window-title-${project.slug}`} className="os-window__name">{project.name}</span>
            </header>
            <div className="os-window__body">
              {project.artwork === "attention-eye" ? (
                <div className="os-window__artwork" role="img" aria-label="An engraved eye. The art of noticing.">
                  <AttentionEye />
                </div>
              ) : project.image ? (
                <div className="os-window__photo" style={{ aspectRatio: project.imageRatio ?? "3 / 2" }}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt ?? project.assetLabel}
                    fill
                    sizes="(max-width: 720px) 100vw, 560px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div className="os-window__empty">
                  <p>{project.comingSoon ? "Still taking shape. More to share as it grows." : "Notes from an ongoing exploration."}</p>
                </div>
              )}
              {!project.artwork && <h2>{project.name}</h2>}
              <p>{project.description}</p>
              {project.href && !project.comingSoon ? (
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  Visit the studio
                </a>
              ) : null}
            </div>
          </article>
        );
      })}

      <nav className="os-dock" aria-label="Desktop dock">
        <button type="button" className="os-dock__item" onClick={onClose} aria-label="Back to home">
          <Image src="/icon.svg" alt="" width={36} height={33} />
        </button>
        {PROJECTS.map((project) => (
          <button
            key={project.slug}
            type="button"
            className="os-dock__item"
            aria-label={project.name}
            onClick={(event) => openFolder(project, event.currentTarget.getBoundingClientRect())}
          >
            <FolderPreview project={project} />
          </button>
        ))}
        <button type="button" className="os-dock__item" onClick={closeTopWindow} aria-label="Close window">
          <span className="os-dock__close">×</span>
        </button>
      </nav>
    </div>
  );
}
