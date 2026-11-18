"use client";

import Image from "next/image";
import { useState } from "react";
import { assets, biomes, prototypeSelectionEvent, type BiomeName } from "./brand";
import { Arrow, BiomeArtwork, Progress, Sticker, TomoLogo, studioStyles as s } from "./StudioPrimitives";

const contexts = [
  { id: "run", label: "Log a run", title: "Your first 5K", note: "A very good day to have legs.", distance: 5 },
  { id: "plan", label: "Plan a day", title: "Tomorrow, in order", note: "First up: take the day one thing at a time.", items: ["9:00 · Send the application", "12:30 · Get groceries"] },
  { id: "win", label: "Keep a win", title: "I got the job!", note: "Three weeks of practice. One very good phone call." },
  { id: "rest", label: "Take a breath", title: "Let’s slow it down", note: "Start with the part that keeps looping." },
] as const satisfies readonly { id: BiomeName; label: string; title: string; note: string; distance?: number; items?: readonly string[] }[];

export default function Opening() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const moment = contexts[selected];
  const biome = biomes[moment.id];

  return (
    <section className={s.hero} id="overview" aria-labelledby="tomo-title" data-paused={paused}>
      <div className={s.heroAtmosphere} aria-hidden="true">
        <Image src={assets.hero} alt="" fill sizes="100vw" priority />
        <span className={s.cloudDrift}><Image src={assets.cloud} alt="" width={866} height={562} priority /></span>
        <span className={s.cloudDrift}><Image src={assets.cloud} alt="" width={866} height={562} /></span>
      </div>
      <div className={s.heroInner}>
        <div className={s.heroCopy}>
          <h1 id="tomo-title">Interface<br />as identity<span>.</span></h1>
          <p className={s.heroIntro}>What if the little things people text Tomo about became the worlds they could explore?</p>
          <div className={s.heroActions}>
            <a className={s.primaryButton} href="#interfaces" onClick={() => window.dispatchEvent(new CustomEvent(prototypeSelectionEvent, { detail: moment.id }))}>Try the prototypes <Arrow /></a>
            <a className={s.textLink} href="#principles">See the principle</a>
          </div>
          <div className={s.context}>
            <p className={s.mono}>Choose a moment</p>
            <div className={s.contextChoices} role="group" aria-label="Choose a moment">
              {contexts.map((item, index) => (
                <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>
              ))}
            </div>
          </div>
        </div>
        <div className={s.heroArt} aria-live="polite">
          <div key={moment.id} className={s.artNotes} data-biome={moment.id}>
            <BiomeArtwork name={moment.id} className={s.heroBiome} eager />
            <Sticker name={biome.sticker} className={s.heroSticker} />
            <p className={s.artMessage}>{biome.message}</p>
            <div className={s.artCard}>
              <div className={s.artCardTop}><TomoLogo variant="mark" /><span className={s.mono}>{biome.name}</span></div>
              <strong>{moment.title}</strong>
              <p>{moment.note}</p>
              {moment.id === "run" && <div className={s.artProgress}><Progress label="Your first 5K" value={moment.distance} max={5} /><span>{moment.distance}.0 km</span></div>}
              {moment.id === "plan" && <ul className={s.artAgenda}>{moment.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            </div>
            <p className={s.artReply}>{biome.reply}</p>
          </div>
        </div>
        <button className={s.cloudToggle} type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Play clouds" : "Pause clouds"}</button>
      </div>
    </section>
  );
}
