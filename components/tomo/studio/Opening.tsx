"use client";

import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { assets } from "./brand";
import { Arrow, Progress, TomoLogo, studioStyles as s } from "./StudioPrimitives";

const contexts = [
  { label: "Making things", message: "i finally made a first draft!", title: "Something started.", date: "Saturday, 10:24 AM", note: "First draft", action: "An idea worth keeping.", progress: 2, total: 3, unit: "steps", theme: "lime" },
  { label: "Getting organized", message: "i need a little order tomorrow", title: "A day taking shape.", date: "Sunday, 8:15 PM", note: "Tomorrow", action: "Start with the important thing.", progress: 1, total: 3, unit: "planned", theme: "sky" },
  { label: "Celebrating", message: "i got the job!!!", title: "One to remember.", date: "Friday, 6:42 PM", note: "Good news", action: "Save how it felt.", progress: 3, total: 3, unit: "little wins", theme: "sun" },
] as const;

export default function Opening() {
  const [selected, setSelected] = useState(0);
  const moment = contexts[selected];

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    canvas.style.setProperty("--drift-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 15}px`);
    canvas.style.setProperty("--drift-y", `${((event.clientY - rect.top) / rect.height - 0.5) * 12}px`);
  }

  return (
    <section className={s.hero} id="overview" aria-labelledby="tomo-title">
      <div className={s.heroCopy}>
        <p className={s.eyebrow}><span className={s.dot} /> An independent brand study</p>
        <h1 id="tomo-title">Your world,<br />in progress<span>.</span></h1>
        <p className={s.heroIntro}>What could a personal AI look and feel like when its identity grows with the people using it?</p>
        <div className={s.heroActions}>
          <a className={s.primaryButton} href="#identity">Enter the playground <Arrow /></a>
          <a className={s.textLink} href="#principles">Explore the system</a>
        </div>
        <div className={s.context}>
          <p className={s.mono}>What’s your world like today?</p>
          <div className={s.contextChoices} role="group" aria-label="Hero context">
            {contexts.map((item, index) => (
              <button key={item.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>
            ))}
          </div>
        </div>
      </div>
      <div className={s.heroArt} onPointerMove={followPointer} onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--drift-x", "0px");
        event.currentTarget.style.setProperty("--drift-y", "0px");
      }}>
        <Image src={assets.hero} alt="A cobalt denim letter T with double-stitched seams and a woven label" fill sizes="(max-width: 760px) 100vw, 57vw" priority />
        <div className={s.artStamp}><TomoLogo variant="mark" /><span>MADE OF<br />MOMENTS</span></div>
        <div key={selected} className={s.artNotes} data-context={moment.theme} aria-live="polite">
          <div className={s.artMessage}><span className={s.mono}>{moment.date}</span><p>{moment.message}</p></div>
          <div className={s.artCard}>
            <div className={s.artCardTop}><span className={s.mono}>{moment.note}</span><span aria-hidden="true">✳</span></div>
            <strong>{moment.title}</strong>
            <p>{moment.action}</p>
            <div className={s.artProgress}><Progress label={moment.unit} value={moment.progress} max={moment.total} /><span>{moment.progress}/{moment.total}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
