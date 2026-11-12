"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FanCardItem {
  id: string;
  src?: string;
  title: string;
  description?: string;
}

export interface CardHandGalleryProps {
  cards: readonly FanCardItem[];
  activeId?: string;
  cardWidth?: number;
  className?: string;
  defaultActiveId?: string;
  onSelect?: (card: FanCardItem) => void;
  /** File previews can also be original artwork or text documents. */
  renderCard?: (card: FanCardItem) => React.ReactNode;
}

const SELECT_VELOCITY = -600;
const HAND_SCALE = 0.72;

function fanTransform(index: number, count: number, spacing: number) {
  const offset = index - (count - 1) / 2;
  const stepDeg = count > 1 ? Math.min(9, 46 / (count - 1)) : 0;
  const rotate = offset * stepDeg;
  return { rotate, x: offset * spacing, y: Math.abs(rotate) * 1.9 };
}

/** A file hand: select by click, keyboard, or an upward pointer flick. */
export function CardHandGallery({
  cards, activeId: controlledActiveId, cardWidth = 224, className,
  defaultActiveId, onSelect, renderCard,
}: CardHandGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const fanRef = React.useRef<HTMLDivElement>(null);
  const draggingRef = React.useRef(false);
  const [fanWidth, setFanWidth] = React.useState<number | null>(null);
  const [internalActiveId, setInternalActiveId] = React.useState(defaultActiveId ?? cards[0]?.id);
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [canDrag, setCanDrag] = React.useState(false);
  const requestedId = controlledActiveId ?? internalActiveId;
  const activeId = cards.some((card) => card.id === requestedId) ? requestedId : cards[0]?.id;
  const activeIndex = cards.findIndex((card) => card.id === activeId);
  const activeCard = cards[activeIndex];

  React.useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)");
    const update = () => setCanDrag(pointer.matches);
    update();
    pointer.addEventListener("change", update);
    return () => pointer.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    const node = fanRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setFanWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const width = fanWidth === null ? cardWidth : Math.min(cardWidth, fanWidth * 0.55);
  const height = width * 1.4;
  const baseBottom = height * 0.09;
  const hoverLift = height * 0.34;
  const activeLift = height * 0.62;
  const handCards = cards.filter((card) => card.id !== activeId);
  const hoveredIndex = hoveredId ? handCards.findIndex((card) => card.id === hoveredId) : -1;
  const maxOffset = (handCards.length - 1) / 2;
  const halfAvailable = fanWidth === null ? Infinity : fanWidth / 2 - width * 0.45;
  const fanSpacing = maxOffset > 0
    ? Math.min(width * (handCards.length > 5 ? 0.43 : 0.52), Math.max(0, halfAvailable / maxOffset))
    : 0;
  const cardTransition = shouldReduceMotion
    ? { duration: 0 }
    : { damping: 30, mass: 0.9, stiffness: 340, type: "spring" as const };

  function clearHover(id: string) {
    setHoveredId((current) => current === id ? null : current);
  }

  function selectCard(card: FanCardItem) {
    if (card.id === activeId) return;
    clearHover(card.id);
    if (controlledActiveId === undefined) setInternalActiveId(card.id);
    onSelect?.(card);
  }

  return (
    <div className={cn("card-hand-gallery", className)}>
      <div className="card-hand-gallery__toolbar">
        <span>{cards.length} {cards.length === 1 ? "file" : "files"}</span>
        <div className="card-hand-gallery__navigation" aria-label="Browse files">
          <button type="button" aria-label="Previous file" disabled={activeIndex <= 0}
            onClick={() => selectCard(cards[activeIndex - 1])}><ChevronLeft size={16} /></button>
          <span>{activeCard ? activeIndex + 1 : 0} / {cards.length}</span>
          <button type="button" aria-label="Next file" disabled={activeIndex < 0 || activeIndex >= cards.length - 1}
            onClick={() => selectCard(cards[activeIndex + 1])}><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="card-hand-gallery__fan" ref={fanRef} style={{ height: height * 1.84 }}>
        {cards.map((card) => {
          const isActive = card.id === activeId;
          const handIndex = handCards.findIndex((candidate) => candidate.id === card.id);
          let slot: { rotate: number; scale: number; x: number; y: number };
          let lift = { rotate: 0, scale: 1, x: 0, y: 0 };
          let zIndex: number;

          if (isActive) {
            slot = { rotate: 0, scale: 1, x: 0, y: -activeLift };
            zIndex = 100;
          } else {
            const fan = fanTransform(handIndex, handCards.length, fanSpacing);
            const isHovered = card.id === hoveredId;
            const dx = hoveredIndex !== -1 && !isHovered
              ? (Math.sign(handIndex - hoveredIndex) * width * 0.14) / Math.max(1, Math.abs(handIndex - hoveredIndex)) : 0;
            const dy = isHovered ? -hoverLift - fan.y : 0;
            const rad = (-fan.rotate * Math.PI) / 180;
            slot = { rotate: fan.rotate, scale: HAND_SCALE, x: fan.x, y: fan.y };
            lift = {
              rotate: isHovered ? -fan.rotate * 0.45 : 0,
              scale: isHovered ? 1.08 : 1,
              x: (dx * Math.cos(rad) - dy * Math.sin(rad)) / HAND_SCALE,
              y: (dx * Math.sin(rad) + dy * Math.cos(rad)) / HAND_SCALE,
            };
            zIndex = isHovered ? 60 : 10 + handIndex;
          }

          return (
            <motion.div key={card.id} animate={slot} initial={false} transition={cardTransition}
              className="card-hand-gallery__slot"
              onHoverEnd={() => clearHover(card.id)}
              onHoverStart={() => { if (!isActive) setHoveredId(card.id); }}
              style={{ bottom: baseBottom, marginLeft: -width / 2, zIndex }}>
              <motion.div animate={lift} initial={false} transition={cardTransition}>
                <motion.button type="button" aria-label={card.title} aria-pressed={isActive}
                  className="card-hand-gallery__card" style={{ width, height }}
                  drag={canDrag && !isActive && !shouldReduceMotion ? "y" : false}
                  dragConstraints={{ bottom: 0, top: -height * 1.65 }} dragElastic={0.12} dragSnapToOrigin
                  onBlur={() => clearHover(card.id)}
                  onClick={() => {
                    if (draggingRef.current) { draggingRef.current = false; return; }
                    selectCard(card);
                  }}
                  onDragEnd={(_event, info) => {
                    if (info.offset.y < -height * 0.5 || info.velocity.y < SELECT_VELOCITY) selectCard(card);
                  }}
                  onDragStart={() => { draggingRef.current = true; }}
                  onPointerDown={() => { draggingRef.current = false; }}
                  onFocus={() => { if (!isActive) setHoveredId(card.id); }}>
                  <span className="card-hand-gallery__face" aria-hidden="true">
                    {renderCard ? renderCard(card) : card.src ? (
                      // Arbitrary gallery sources are not restricted to Next image domains.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt="" draggable={false} src={card.src} />
                    ) : <span>{card.title}</span>}
                  </span>
                  <span className="card-hand-gallery__filename" aria-hidden="true">{card.title}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      <div className="card-hand-gallery__caption" aria-live="polite" aria-atomic="true">
        {activeCard ? (
          <motion.div key={activeCard.id} initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }} transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}>
            <h3>{activeCard.title}</h3>
            {activeCard.description && <p>{activeCard.description}</p>}
          </motion.div>
        ) : <p>No files yet.</p>}
      </div>
    </div>
  );
}
