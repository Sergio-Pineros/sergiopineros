"use client";

import { useEffect, useState } from "react";

/**
 * A short, decorative introduction for the independent Notion experiment.
 * It runs on each page visit, and is skipped for reduced-motion users.
 */
export default function NotionIntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }
    const fallback = window.setTimeout(() => setVisible(false), 3400);
    return () => window.clearTimeout(fallback);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="nt-loader"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === "nt-loader-reveal") {
          setVisible(false);
        }
      }}
    >
      <div className="nt-loader-stage">
        <div className="nt-loader-notion">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg" alt="" width="100" height="100" />
        </div>
        <div className="nt-loader-sergio">
          <img src="/icon.svg" alt="" width="112" height="112" />
        </div>
      </div>
    </div>
  );
}
