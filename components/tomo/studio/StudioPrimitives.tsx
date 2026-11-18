"use client";

import Image from "next/image";
import type { KeyboardEvent, ReactNode } from "react";
import { assets } from "./brand";
import styles from "./studio.module.css";

export const studioStyles = styles;

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" width="18" height="18">
      <path d={diagonal ? "M5 15 15 5M6 5h9v9" : "M3 10h13m-5-5 5 5-5 5"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TomoLogo({ variant = "primary" }: { variant?: "primary" | "secondary" | "mark" | "mono" }) {
  return (
    <span className={styles.logo} data-lockup={variant}>
      {variant !== "mono" && <Image src={assets.mark} width={30} height={28} alt={variant === "mark" ? "Tomo symbol" : ""} unoptimized />}
      {variant !== "mark" && <Image src={assets.wordmark} width={73} height={23} alt="Tomo" unoptimized />}
    </span>
  );
}

export function Tabs<T extends string>({
  items, current, onChange, id, label,
}: {
  items: readonly { id: T; label: string }[];
  current: T;
  onChange: (next: T) => void;
  id: string;
  label: string;
}) {
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = items.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowLeft": next = index === 0 ? last : index - 1; break;
      case "ArrowRight": next = index === last ? 0 : index + 1; break;
      case "Home": next = 0; break;
      case "End": next = last; break;
      default: return;
    }

    event.preventDefault();
    onChange(items[next].id);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[next]?.focus();
  }

  return (
    <div className={styles.tabs} role="tablist" aria-label={label}>
      {items.map((item, index) => (
        <button type="button" key={item.id} role="tab" id={`${id}-tab-${item.id}`} aria-selected={current === item.id}
          aria-controls={`${id}-panel-${item.id}`} tabIndex={current === item.id ? 0 : -1}
          onClick={() => onChange(item.id)} onKeyDown={(event) => onKeyDown(event, index)}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function Panel({ id, tab, children, className }: { id: string; tab: string; children: ReactNode; className?: string }) {
  return (
    <div role="tabpanel" id={`${id}-panel-${tab}`} aria-labelledby={`${id}-tab-${tab}`} tabIndex={0} className={className}>
      {children}
    </div>
  );
}

export function Progress({ label, value, max }: { label: string; value: number; max: number }) {
  return <progress className={styles.progress} aria-label={label} value={Math.min(value, max)} max={max} />;
}

export function Widget({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <article className={styles.widget}>
      <div className={styles.widgetHeading}>
        <div><p className={styles.mono}>{label}</p><h3>{title}</h3></div>
        <TomoLogo variant="mark" />
      </div>
      {children}
    </article>
  );
}

export function Conversation({ prompt, reply }: { prompt: string; reply: string }) {
  return (
    <div className={styles.conversation}>
      <p className={styles.mono}>Conversation</p>
      <p className={styles.sentBubble}>{prompt}</p>
      <div className={styles.receivedRow}><TomoLogo variant="mark" /><p className={styles.receivedBubble}>{reply}</p></div>
    </div>
  );
}
