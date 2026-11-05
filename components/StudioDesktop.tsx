"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { PROJECTS, type Project } from "@/lib/projects";
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

function parseTags(tagsLine: string) {
  return tagsLine.split("·").map((tag) => tag.trim()).filter(Boolean);
}

function FolderGlyph({ comingSoon = false }: { comingSoon?: boolean }) {
  return (
    <svg viewBox="0 0 72 58" width="56" height="45" aria-hidden="true">
      <path
        d="M4 14c0-3.3 2.7-6 6-6h16l6 7h32c3.3 0 6 2.7 6 6v25c0 3.3-2.7 6-6 6H10c-3.3 0-6-2.7-6-6V14z"
        fill={comingSoon ? "#b9a8d0" : "#9d86bc"}
      />
      <path
        d="M4 22h64v24c0 3.3-2.7 6-6 6H10c-3.3 0-6-2.7-6-6V22z"
        fill={comingSoon ? "#cfc3e0" : "#7f6899"}
      />
    </svg>
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
      setWindows((prev) => {
        if (prev.length) {
          const top = [...prev].sort((a, b) => b.z - a.z)[0];
          return prev.filter((item) => item.slug !== top.slug);
        }
        onClose();
        return prev;
      });
    };

    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  const openFolder = (project: Project, from: DOMRect | null) => {
    const mobile = window.innerWidth < 720;
    const width = mobile ? window.innerWidth : Math.min(620, window.innerWidth - 32);
    const height = mobile ? window.innerHeight : Math.min(520, window.innerHeight - 96);
    const originX = from ? from.left + from.width / 2 : window.innerWidth / 2;
    const originY = from ? from.top + from.height / 2 : window.innerHeight / 2;
    const x = mobile ? 0 : Math.max(12, Math.min(originX - width / 2, window.innerWidth - width - 12));
    const y = mobile ? 0 : Math.max(40, Math.min(originY - 24, window.innerHeight - height - 88));

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
        <span className="os-menubar__app">Finder</span>
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
            <FolderGlyph comingSoon={project.comingSoon} />
            <span>
              {project.name}
              {project.comingSoon ? " · soon" : ""}
            </span>
          </button>
        ))}
      </div>

      {windows.map((win) => {
        const project = PROJECTS.find((item) => item.slug === win.slug);
        if (!project) return null;
        const tags = parseTags(project.tagsLine);
        return (
          <article
            key={win.slug}
            className="os-window"
            style={{
              left: win.x,
              top: win.y,
              zIndex: 20 + win.z,
              transformOrigin: `${win.originX - win.x}px ${win.originY - win.y}px`,
            }}
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
                onClick={() => closeWindow(win.slug)}
              />
              <span className="os-window__name">{project.name}</span>
            </header>
            <div className="os-window__body">
              {project.image ? (
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
                  <p>This folder is empty</p>
                  <p>{project.comingSoon ? "Coming soon" : project.assetNotes}</p>
                </div>
              )}
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <ul>
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {project.href && !project.comingSoon ? (
                <a href={project.href} target="_blank" rel="noopener noreferrer">
                  Open project
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
            <FolderGlyph comingSoon={project.comingSoon} />
          </button>
        ))}
        <button type="button" className="os-dock__item" onClick={closeTopWindow} aria-label="Close window">
          <span className="os-dock__close">×</span>
        </button>
      </nav>
    </div>
  );
}
