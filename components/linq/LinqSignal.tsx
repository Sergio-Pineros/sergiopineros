"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

export default function LinqSignal() {
  const surface = useRef<HTMLButtonElement>(null);
  const [replay, setReplay] = useState(0);

  function move(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${-y * 18}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 22}deg`);
  }

  function reset() {
    surface.current?.style.setProperty("--tilt-x", "0deg");
    surface.current?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <button ref={surface} className="lq-signal" type="button" aria-label="Replay the Linq logo animation" onPointerMove={move} onPointerLeave={reset} onClick={() => setReplay(value => value + 1)}>
      <span key={replay} className="lq-signal-scene" aria-hidden="true">
        <span className="lq-signal-halo" />
        <span className="lq-signal-echo lq-signal-echo-a" />
        <span className="lq-signal-echo lq-signal-echo-b" />
        <span className="lq-signal-mark"><Image src="/linq/linq-logo.png" alt="" width={540} height={270} priority /><span className="lq-signal-shine" /></span>
        <span className="lq-signal-trail lq-signal-trail-a" />
        <span className="lq-signal-trail lq-signal-trail-b" />
        <span className="lq-signal-spark" />
      </span>
    </button>
  );
}
