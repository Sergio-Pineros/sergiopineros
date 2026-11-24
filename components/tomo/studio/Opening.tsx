"use client";

import { useState } from "react";
import { biomes, prototypeSelectionEvent, type BiomeName } from "./brand";
import { BiomeArtwork, TomoLogo, studioStyles as s } from "./StudioPrimitives";

const moments = [
  { id: "run", label: "a small win", title: "Your running era", note: "3 km logged. A little momentum, saved." },
  { id: "plan", label: "a busy tomorrow", title: "Tomorrow, sorted", note: "The plan you needed, without another app to manage." },
  { id: "win", label: "really good news", title: "One for the books", note: "The kind of moment you'll want to remember." },
  { id: "rest", label: "a 1 AM thought", title: "Somewhere to think", note: "A little room for the things you can't quite put down." },
] as const satisfies readonly { id: BiomeName; label: string; title: string; note: string }[];

export default function Opening() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const moment = moments[selected];
  const biome = biomes[moment.id];

  function openPrototype() {
    window.dispatchEvent(new CustomEvent(prototypeSelectionEvent, { detail: moment.id }));
  }

  return (
    <section className={s.hero} id="overview" aria-labelledby="tomo-title" data-paused={paused} data-moment={moment.id}>
      <div className={s.nightEnvironment} aria-hidden="true">
        <div className={s.nightGlow} />
        <div className={s.nightSun} />
        <div className={s.nightHorizon} />
        <div className={s.nightRidgeBack} />
        <div className={s.nightRidgeFront} />
        <div className={s.nightGrain} />
      </div>
      <div className={s.heroInner}>
        <div className={s.heroCopy}>
          <p className={s.heroKicker}><span className={s.heroSignal} /> TOMO / AN INDEPENDENT DESIGN STUDY</p>
          <h1 id="tomo-title">your life<br />isn&apos;t a<br /><span>dashboard.</span></h1>
          <p className={s.heroIntro}>A conversation can feel like a friend. The interface should, too.</p>
          <p className={s.heroDetail}>Tomo already lives in your texts and creates personal tools. This is an exploration of how those experiences could feel like one continuous world.</p>
          <div className={s.heroActions}>
            <a className={s.primaryButton} href="#interfaces" onClick={openPrototype}>Try the product vision</a>
            <a className={s.textLink} href="#identity">Play with the identity</a>
          </div>
          <div className={s.context}>
            <p className={s.mono}>Which kind of night?</p>
            <div className={s.contextChoices} role="group" aria-label="Choose a moment">
              {moments.map((item, index) => (
                <button key={item.id} type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={s.heroArt} aria-live="polite">
          <div className={s.orbitOutline} aria-hidden="true" />
          <div className={s.heroDepthFrame} aria-hidden="true">
            <span>THE INTERNET AT 1:04 AM</span><span>001 / 004</span>
          </div>
          <div className={s.nightFloatMessage} key={"msg-" + moment.id}>{biome.message}</div>
          <div className={s.nightPanel} key={moment.id}>
            <div className={s.nightPanelTop}>
              <TomoLogo variant="mark" />
              <span>PERSONAL INTERFACE / CONCEPT</span>
            </div>
            <div className={s.nightPanelArt}>
              <div className={s.nightArtHalo} />
              <BiomeArtwork name={moment.id} className={s.nightBiome} eager />
            </div>
            <div className={s.nightPanelBottom}>
              <span>{biome.name.toUpperCase()} / YOUR WORLD</span>
              <strong>{moment.title}</strong>
              <p>{moment.note}</p>
            </div>
          </div>
          <div className={s.nightFloatReply} key={"reply-" + moment.id}>
            <TomoLogo variant="mark" />
            <span>{biome.reply}</span>
          </div>
          <p className={s.nightCaption}>01 / SPEAK HUMAN. DESIGN FOR IT.</p>
        </div>
      </div>
      <button type="button" className={s.cloudToggle} aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? "Play atmosphere" : "Pause atmosphere"}
      </button>
    </section>
  );
}
