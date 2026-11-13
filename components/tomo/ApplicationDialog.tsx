"use client";

import { useCallback, useEffect, useRef } from "react";
import { TOMO_LINKS } from "@/lib/tomo";

const STORAGE_KEY = "tomo-concept-dialog-seen";
export const OPEN_EVENT = "open-tomo-concept-dialog";

export function AboutConceptButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT))}
    >
      About this concept
    </button>
  );
}

export default function ApplicationDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const onOpenRequest = () => open();
    window.addEventListener(OPEN_EVENT, onOpenRequest);

    let observer: IntersectionObserver | null = null;
    try {
      if (!window.sessionStorage.getItem(STORAGE_KEY)) {
        const target = document.getElementById("final-cta");
        if (target) {
          observer = new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) {
                window.sessionStorage.setItem(STORAGE_KEY, "1");
                open();
                observer?.disconnect();
              }
            },
            { threshold: 0.35 },
          );
          observer.observe(target);
        }
      }
    } catch {
      // Session storage unavailable: the footer link still opens the dialog.
    }

    return () => {
      window.removeEventListener(OPEN_EVENT, onOpenRequest);
      observer?.disconnect();
    };
  }, [open ]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="tomo-dialog-title"
      className="w-[min(92vw,30rem)] rounded-[1.75rem] bg-[#fffdf8] p-0 text-[#2b2118] shadow-[0_32px_80px_rgba(43,33,24,0.3)] backdrop:bg-[#2b2118]/50"
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
    >
      <div className="p-7 sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffc531] text-[18px] font-bold"
          >
            T
          </span>
          <button
            type="button"
            onClick={close}
            autoFocus
            aria-label="Close this message"
            className="rounded-full bg-[#fdf3e0] px-3.5 py-2 text-[14px] font-medium transition-colors hover:bg-[#ffc531]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b2118]"
          >
            Close
          </button>
        </div>
        <h2 id="tomo-dialog-title" className="mt-5 text-[26px] font-semibold leading-snug">
          Hi, Tomo team 👋
        </h2>
        <div className="mt-4 space-y-4 text-[16px] leading-[1.65] text-[#2b2118]/80">
          <p>
            I&apos;m Sergio, a designer and founder who loves exploring how AI can feel more
            personal and useful in everyday life.
          </p>
          <p>
            I made this independent concept because I&apos;m excited about what you&apos;re building
            and the opportunity to help shape the product, not just the website.
          </p>
          <p>
            I&apos;d love to share more of my work and talk about the Product Designer role.
          </p>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={TOMO_LINKS.sergioSite}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#2b2118] px-5 py-3 text-[15px] font-semibold text-[#fff9ef] transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b2118] focus-visible:ring-offset-2"
          >
            View my work
          </a>
          <a
            href={TOMO_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#ffc531] px-5 py-3 text-[15px] font-semibold text-[#2b2118] transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b2118] focus-visible:ring-offset-2"
          >
            Connect on LinkedIn
          </a>
        </div>
        <p className="mt-6 text-[13px] leading-relaxed text-[#2b2118]/50">
          Independent design exploration by Sergio Piñeros for the Product Designer role. Not
          affiliated with Tomo.
        </p>
      </div>
    </dialog>
  );
}
