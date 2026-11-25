"use client";

import Image from "next/image";
import { useState } from "react";
import { assets, biomes, prototypeSelectionEvent, type BiomeName } from "./brand";
import { BiomeArtwork, Progress, Sticker, TomoLogo, studioStyles as s } from "./StudioPrimitives";

const contexts = [
  { id: "run", label: "Log a run", title: "Your first 5K", distance: 5 },
  { id: "plan", label: "Plan a day", title: "Tomorrow, in order", items: ["9:00 · Send the application", "12:30 · Get groceries"] },
  { id: "win", label: "Keep a win", title: "I got the job!" },
  { id: "rest", label: "Take a breath", title: "Let’s slow it down" },
] as const satisfies readonly { id: BiomeName; label: string; title: string; distance?: number; items?: readonly string[] }[];

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
          <div className={s.heroActions}>
            <a className={s.primaryButton} href="#interfaces" onClick={() => window.dispatchEvent(new CustomEvent(prototypeSelectionEvent, { detail: moment.id }))}>Explore the connected journey</a>
            <a className={s.textLink} href="#principles">See the principle</a>
          </div>
          <div className={s.context}>
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
              <div className={s.artCardTop}><TomoLogo variant="mark" /></div>
              <strong>{moment.title}</strong>
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
