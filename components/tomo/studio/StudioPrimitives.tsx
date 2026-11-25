"use client";

import Image from "next/image";
import type { KeyboardEvent, ReactNode } from "react";
import { assets, biomes, stickers, type BiomeName, type StickerName } from "./brand";
import styles from "./studio.module.css";

export const studioStyles = styles;

export function Sticker({ name, className }: { name: StickerName; className?: string }) {
  return <Image src={stickers[name]} className={className} width={240} height={240} alt="" unoptimized />;
}

export function BiomeArtwork({ name, className, eager = false }: { name: BiomeName; className?: string; eager?: boolean }) {
  return <Image src={biomes[name].image} className={className} width={560} height={440} alt="" loading={eager ? "eager" : "lazy"} unoptimized />;
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

export function Widget({ label, title, sticker, children }: { label: string; title: string; sticker?: StickerName; children: ReactNode }) {
  return (
    <article className={styles.widget}>
      <div className={styles.widgetHeading}>
        <div><p className={styles.mono}>{label}</p><h3>{title}</h3></div>
        {sticker ? <Sticker name={sticker} className={styles.widgetSticker} /> : <TomoLogo variant="mark" />}
      </div>
      {children}
    </article>
  );
}

export function Conversation({ prompt, reply }: { prompt: string; reply: string }) {
  return (
    <div className={styles.conversation}>
      <p className={styles.sentBubble}>{prompt}</p>
      <div className={styles.receivedRow}><TomoLogo variant="mark" /><p className={styles.receivedBubble}>{reply}</p></div>
    </div>
  );
}
