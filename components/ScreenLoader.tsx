"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Adapted from the Canvas2D Bayer 4×4 ordered-dither loader in
// https://github.com/ficeskele/cocreate-brand-platform/blob/main/web/src/components/ui/ascii-loader.tsx
// (sample an image into a cell grid, pulse the threshold, reduced-motion
// fallback). Tuned here for Sergio's icon and brand palette.

const INK = "#9d86bc";
const INK_DEEP = "#7f6899";
const PAPER = "#ffffff";
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const HOLD_MS = 1500;
const FADE_MS = 500;
const ICON_SRC = "/icon.svg";

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (v) => (v + 0.5) / 16
);

type SampledGrid = {
  lum: Float32Array;
  cols: number;
  rows: number;
  ox: number;
  oy: number;
  cell: number;
};

function luma(r: number, g: number, b: number) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

async function loadIconImage(src: string): Promise<HTMLImageElement> {
  const res = await fetch(src);
  if (!res.ok) throw new Error("icon fetch failed");

  const text = await res.text();
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");
  const svg = doc.documentElement;
  if (svg.querySelector("parsererror")) throw new Error("invalid svg");

  const parts = (svg.getAttribute("viewBox") ?? "0 0 772 700")
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  const vbW = parts[2] > 0 ? parts[2] : 772;
  const vbH = parts[3] > 0 ? parts[3] : 700;

  // Percentage width/height will not rasterize to a usable bitmap on canvas.
  svg.setAttribute("width", String(vbW));
  svg.setAttribute("height", String(vbH));

  const blob = new Blob([new XMLSerializer().serializeToString(svg)], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const img = new Image();

  try {
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("icon decode failed"));
      img.src = url;
    });
    if (typeof img.decode === "function") {
      try {
        await img.decode();
      } catch {
        // onload is enough if decode() is unsupported or already settled
      }
    }
  } finally {
    URL.revokeObjectURL(url);
  }

  return img;
}

function sampleIcon(
  img: HTMLImageElement,
  width: number,
  height: number
): SampledGrid {
  const cell = width < 480 ? 7 : width < 960 ? 8 : 9;
  const coverage = width < 480 ? 0.72 : width < 960 ? 0.58 : 0.46;
  const cw = width * coverage;
  const ch = height * coverage;
  const srcW = img.naturalWidth || img.width || 772;
  const srcH = img.naturalHeight || img.height || 700;
  const scale = Math.min(cw / srcW, ch / srcH);
  const cols = Math.max(1, Math.floor((srcW * scale) / cell));
  const rows = Math.max(1, Math.floor((srcH * scale) / cell));
  const ox = (width - cols * cell) / 2;
  const oy = (height - rows * cell) / 2;

  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const octx = off.getContext("2d", { willReadFrequently: true });
  if (!octx) {
    return { lum: new Float32Array(cols * rows), cols, rows, ox, oy, cell };
  }

  octx.clearRect(0, 0, cols, rows);
  octx.drawImage(img, 0, 0, srcW, srcH, 0, 0, cols, rows);

  const data = octx.getImageData(0, 0, cols, rows).data;
  const count = cols * rows;
  const values: number[] = [];
  const opaque: number[] = [];

  for (let i = 0; i < count; i++) {
    const a = data[i * 4 + 3] / 255;
    const l = luma(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
    values.push(l);
    if (a > 0.08) opaque.push(l);
  }

  const ranked = (opaque.length ? opaque : values).slice().sort((a, b) => a - b);
  const lo = ranked[Math.floor(ranked.length * 0.05)] ?? 0;
  const hi = ranked[Math.floor(ranked.length * 0.95)] ?? 255;
  const range = Math.max(1, hi - lo);
  const weakContrast = range < 28;
  // Dark linework on a light face should ink the dark pixels. Invert only
  // when the whole raster is dark (failed paper, or a silhouette mark).
  const invert = !weakContrast && hi < 90;

  // On white paper, ink the dark linework. A slightly heavier density keeps
  // the portrait from washing out against #ffffff.
  const k = 1.55;
  const density = 0.16;
  const lum = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const a = data[i * 4 + 3] / 255;
    if (a < 0.08) {
      lum[i] = 0;
      continue;
    }

    if (weakContrast) {
      lum[i] = Math.min(1, Math.max(0, a * (0.62 + density)));
      continue;
    }

    const normalized = (values[i] - lo) / range;
    const tone = invert ? 1 - normalized : normalized;
    const ink = (1 - tone - 0.5) * k + 0.5 + density - 0.25;
    lum[i] = Math.min(1, Math.max(0, ink));
  }

  return { lum, cols, rows, ox, oy, cell };
}

export default function ScreenLoader({ onComplete }: { onComplete: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const [mounted, setMounted] = useState(true);

  onCompleteRef.current = onComplete;

  const finish = useCallback((reduced: boolean) => {
    if (doneRef.current) return;
    doneRef.current = true;
    document.body.style.overflow = "";
    // Reveal the site as the overlay starts dissolving — not before.
    onCompleteRef.current();

    overlayRef.current?.animate(
      reduced
        ? [{ opacity: 1 }, { opacity: 0 }]
        : [
            { opacity: 1, transform: "scale(1)" },
            { opacity: 0, transform: "scale(1.04)" },
          ],
      { duration: FADE_MS, easing: EASE_OUT, fill: "forwards" }
    );

    window.setTimeout(() => setMounted(false), FADE_MS + 20);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.style.overflow = "hidden";

    if (!ctx) {
      const fallback = window.setTimeout(() => finish(true), HOLD_MS);
      return () => {
        window.clearTimeout(fallback);
        document.body.style.overflow = "";
      };
    }

    let frame = 0;
    let cancelled = false;
    let grid: SampledGrid | null = null;
    let startedAt = 0;
    const timers: number[] = [];

    const syncCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width, height };
    };

    const draw = (now: number) => {
      if (!grid) return;
      const { width, height } = { width: canvas.clientWidth, height: canvas.clientHeight };
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, width, height);

      const elapsed = Math.max(0, now - startedAt);
      const reveal = reduced ? 1 : Math.min(1, elapsed / 720);
      const eased = 1 - Math.pow(1 - reveal, 3);
      const gate = (1 - eased) * 0.9;
      const swing = reduced
        ? 0
        : Math.sin((elapsed / 1000) * Math.PI * 2 * (100 / 160)) * 0.14 * eased;

      const { lum, cols, rows, ox, oy, cell } = grid;
      const radius = cell * 0.36;

      ctx.fillStyle = INK;
      ctx.beginPath();
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const weight = lum[y * cols + x];
          const v = weight + swing * (0.4 + weight) - gate;
          if (v <= BAYER[(y & 3) * 4 + (x & 3)]) continue;
          const cx = ox + x * cell + cell / 2;
          const cy = oy + y * cell + cell / 2;
          ctx.moveTo(cx + radius, cy);
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // A deeper lavender pass on the densest cells keeps the mark from washing out on white.
      ctx.fillStyle = INK_DEEP;
      ctx.beginPath();
      const highlight = radius * 0.55;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const weight = lum[y * cols + x];
          if (weight < 0.72) continue;
          const v = weight + swing * 0.2 - gate;
          if (v <= BAYER[(y & 3) * 4 + (x & 3)] + 0.18) continue;
          const cx = ox + x * cell + cell / 2;
          const cy = oy + y * cell + cell / 2;
          ctx.moveTo(cx + highlight, cy);
          ctx.arc(cx, cy, highlight, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    };

    const loop = (now: number) => {
      if (cancelled || doneRef.current) return;
      draw(now);
      if (!reduced) frame = requestAnimationFrame(loop);
    };

    const resample = (img: HTMLImageElement) => {
      const { width, height } = syncCanvas();
      grid = sampleIcon(img, width, height);
      if (!startedAt) startedAt = performance.now();
      draw(performance.now());
    };

    timers.push(window.setTimeout(() => finish(reduced), HOLD_MS));

    let icon: HTMLImageElement | null = null;
    const ro = new ResizeObserver(() => {
      if (!icon || cancelled) return;
      resample(icon);
    });
    ro.observe(canvas);

    loadIconImage(ICON_SRC)
      .then((img) => {
        if (cancelled || doneRef.current) return;
        icon = img;
        resample(img);
        if (reduced) {
          draw(performance.now());
        } else {
          frame = requestAnimationFrame(loop);
        }
      })
      .catch(() => {
        // Stay on the white overlay until the 1.5s hold elapses.
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      timers.forEach((id) => window.clearTimeout(id));
      ro.disconnect();
      document.body.style.overflow = "";
    };
  }, [finish]);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className="screen-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <canvas ref={canvasRef} className="screen-loader__canvas" aria-hidden="true" />
    </div>
  );
}
