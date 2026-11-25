"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { BiomeArtwork, TomoLogo, studioStyles as s } from "./StudioPrimitives";
import { maxMedalMessage, maxMedalTitle, medalDesigns, medalExamples, medalStorageKey, readMedals, suggestMedal, type Medal, type MedalDraft, type MedalDesign } from "./medals";
import m from "./medals.module.css";

const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

function MedalArtwork({ design, className }: { design: MedalDesign; className?: string }) {
  return <Image src={medalDesigns[design].image} className={className} alt="" width={280} height={280} unoptimized />;
}

export default function MedalLab() {
  const [message, setMessage] = useState(medalExamples[0].message);
  const [draft, setDraft] = useState<MedalDraft | null>(null);
  const [title, setTitle] = useState("");
  const [medals, setMedals] = useState<Medal[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [saveAsNew, setSaveAsNew] = useState(false);
  const [status, setStatus] = useState("");
  const [ready, setReady] = useState(false);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const proposalRef = useRef<HTMLDivElement>(null);
  const messageId = useId();
  const titleId = useId();
  const selected = medals.find(({ id }) => id === selectedId);
  const existing = draft && draft.activity !== "other" && !saveAsNew
    ? medals.find(({ activity }) => activity === draft.activity) : undefined;
  const design = selected ? medalDesigns[selected.design] : medalDesigns.art;

  useEffect(() => {
    try {
      const saved = readMedals(window.localStorage.getItem(medalStorageKey));
      setMedals(saved);
      setSelectedId(saved[0]?.id);
    } catch {
      setStatus("A fresh collection is ready for this visit.");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (draft) proposalRef.current?.focus();
  }, [draft]);

  function closeProposal() {
    setDraft(null);
    window.requestAnimationFrame(() => composerRef.current?.focus());
  }

  function prepareMedal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;
    const suggestion = suggestMedal(text);
    setDraft(suggestion);
    setTitle(suggestion.title);
    setSaveAsNew(false);
    setMessage("");
    setStatus("");
  }

  function saveMedal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft || (!existing && !title.trim())) return;
    const entry = { message: draft.message, savedAt: new Date().toISOString() };
    const saved: Medal = existing
      ? { ...existing, entries: [entry, ...existing.entries] }
      : { id: window.crypto.randomUUID(), title: title.trim(), activity: draft.activity, design: draft.design, entries: [entry] };
    const next = [saved, ...medals.filter(({ id }) => id !== saved.id)];

    setMedals(next);
    setSelectedId(saved.id);
    closeProposal();
    try {
      window.localStorage.setItem(medalStorageKey, JSON.stringify(next));
      setStatus(existing ? `Moment added to “${saved.title}”.` : `“${saved.title}” is in your collection.`);
    } catch {
      setStatus(`“${saved.title}” is available for this visit.`);
    }
  }

  return (
    <section id="medals" className={s.section} aria-labelledby="medals-title">
      <div className={s.sectionIntro}>
        <h2 id="medals-title">Medals.</h2>
      </div>

      <div className={m.studio}>
        <div className={m.chat}>
          <div className={m.chatHeader}><TomoLogo variant="mark" /><h3>Text Tomo</h3></div>
          <div className={m.chatBody}>
            {draft ? (
              <div className={m.exchange} ref={proposalRef} tabIndex={-1}>
                <p className={m.sent}>{draft.message}</p>
                <p className={m.reply}>{existing ? "Want to add this to the medal you already started?" : "Want a little medal to remember this by?"}</p>
                <form className={m.proposal} onSubmit={saveMedal}>
                  <div className={m.proposalTop} style={{ "--medal-tint": medalDesigns[draft.design].tint } as CSSProperties}>
                    <MedalArtwork design={draft.design} className={m.previewMedal} />
                    <div>
                      <span className={s.mono}>{existing ? "Add a moment" : "Suggested medal"}</span>
                      {existing ? <p className={m.proposalTitle}>{existing.title}</p> : <label className={m.titleLabel} htmlFor={titleId}>Medal name<input id={titleId} value={title} onChange={(event) => setTitle(event.target.value)} maxLength={maxMedalTitle} required /></label>}
                    </div>
                  </div>
                  <div className={m.actions}>
                    <button className={s.primaryButton} type="submit" disabled={!existing && !title.trim()}>{existing ? "Add to medal" : "Save medal"}</button>
                    {existing && <button className={s.secondaryButton} type="button" onClick={() => setSaveAsNew(true)}>Make a new medal</button>}
                    <button className={s.textLink} type="button" onClick={() => { closeProposal(); setStatus("Moment skipped."); }}>Skip for now</button>
                  </div>
                </form>
              </div>
            ) : (
              <form className={m.composer} onSubmit={prepareMedal}>
                <p className={m.reply}>Hey, tell me something from your day.</p>
                <label htmlFor={messageId}>Your message</label>
                <textarea ref={composerRef} id={messageId} rows={3} maxLength={maxMedalMessage} value={message} onChange={(event) => setMessage(event.target.value)} required />
                <div className={m.actions}>
                  <button type="submit" className={s.primaryButton} disabled={!ready || !message.trim()}>Send message</button>
                </div>
                <div className={m.examples} aria-label="Example messages" role="group">
                  {medalExamples.map((example) => <button key={example.label} type="button" onClick={() => setMessage(example.message)}>{example.label}</button>)}
                </div>
              </form>
            )}
            <p role="status" className={m.status}>{status}</p>
          </div>
        </div>

        <div className={m.collection} aria-labelledby="medal-collection-title">
          <div className={m.landscape} style={{ "--medal-tint": design.tint } as CSSProperties}>
            <div className={m.collectionHeading}>
              <h3 id="medal-collection-title">Your little world</h3>
              <span>{medals.length} {medals.length === 1 ? "medal" : "medals"}</span>
            </div>
            <BiomeArtwork name={design.biome} className={m.biome} />
            {selected && <MedalArtwork design={selected.design} className={m.featuredMedal} />}
          </div>
          {selected ? (
            <div className={m.collectionBody}>
              <div className={m.shelf} aria-label="Your medals" role="group">
                {medals.map((medal) => (
                  <button key={medal.id} type="button" aria-pressed={medal.id === selected.id} onClick={() => setSelectedId(medal.id)}>
                    <MedalArtwork design={medal.design} className={m.shelfArtwork} /><span>{medal.title}</span>
                  </button>
                ))}
              </div>
              <div className={m.history}>
                <h4>{selected.title}</h4>
                <p>{selected.entries.length} {selected.entries.length === 1 ? "saved moment" : "saved moments"}</p>
                <ol>
                  {selected.entries.map(({ message: text, savedAt }, index) => (
                    <li key={`${savedAt}-${index}`}><time dateTime={savedAt}>{shortDate.format(new Date(savedAt))}</time><p>{text}</p></li>
                  ))}
                </ol>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
