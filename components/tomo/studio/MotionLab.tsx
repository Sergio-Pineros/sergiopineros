"use client";

import { useState } from "react";
import { Sticker, TomoLogo, studioStyles as s } from "./StudioPrimitives";

const motionExamples = [
  { id: "message", label: "Message to widget", duration: "520 ms", detail: "A short move and fade connect the new widget to the message that created it." },
  { id: "complete", label: "Task completion", duration: "320 ms", detail: "The check and the bar advance together, so the state change reads at a glance." },
] as const;

export default function MotionLab() {
  const [selection, setSelection] = useState(0);
  const [enabled, setEnabled] = useState(true);
  const [run, setRun] = useState(0);
  const example = motionExamples[selection];

  return (
    <section className={s.motionSection} id="motion" aria-labelledby="motion-title">
      <div>
        <p className={s.eyebrow}>Motion</p><h2 id="motion-title">Make change visible.</h2>
        <p>{example.detail}</p>
        <div className={s.motionChoices} role="group" aria-label="Motion examples">
          {motionExamples.map((item, index) => <button className={s.secondaryButton} type="button" key={item.id} aria-pressed={selection === index} onClick={() => { setSelection(index); setRun(0); }}>{item.label}</button>)}
        </div>
        <div className={s.motionControls}><button className={s.primaryButton} type="button" onClick={() => setRun(run + 1)}>Replay</button>
          <label className={s.checkField}><input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} /> Animate preview</label>
        </div>
      </div>
      <div className={s.motionStage}>
        <p className={s.mono}>{example.label}<span>{enabled ? example.duration : "Instant"}</span></p>
        <div className={s.motionContent} key={`${example.id}-${run}`} data-play={enabled && run > 0} data-example={example.id}>
          {example.id === "message" ? <>
            <div className={s.motionBubble}>can we make a plan?</div>
            <div className={s.motionCard}><TomoLogo variant="mark" /><div><strong>Tomorrow, in order.</strong><br /><span>3 things to make room for.</span></div></div>
          </> : <div className={s.motionCard}><Sticker name="check" className={s.motionCheck} /><div><strong>First thing, done.</strong><br /><span>1 of 3 tasks complete.</span><div className={s.motionProgress}><span /></div></div></div>}
        </div>
      </div>
    </section>
  );
}
