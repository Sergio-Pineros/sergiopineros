"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { compositions, decodeSettings, formatPaletteTokens, initialSettings, materials, palettes, settingsOptions, type Settings, type StickerName } from "./brand";
import { Conversation, Panel, Progress, Sticker, Tabs, TomoLogo, Widget, studioStyles as s } from "./StudioPrimitives";

const tabs = [
  { id: "identity", label: "Identity" }, { id: "type", label: "Type studio" },
  { id: "materials", label: "Color & materials" }, { id: "components", label: "Components" },
] as const;
type StudioTab = (typeof tabs)[number]["id"];

const formatLabels = { poster: "Poster", tag: "Sticker card", widget: "Product card" };
const typeLabels = { stacked: "Heavy editorial", journal: "Journal serif", label: "Utility mono" };
const lockupLabels = { primary: "Primary lockup", secondary: "Stacked lockup", mark: "Small symbol", mono: "Monochrome wordmark" };
const paletteStickers: Record<Settings["palette"], StickerName> = { electric: "check", sky: "cloud", lime: "check", sun: "sparkle", blush: "heart", paper: "cloud", ink: "sparkle" };
const storageKey = "tomo-identity-studio-v1";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className={s.field}><span>{label}</span>{children}</label>;
}

export default function IdentityLab() {
  const [tab, setTab] = useState<StudioTab>("identity");
  const [settings, setSettings] = useState(initialSettings);
  const [ready, setReady] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [manualCopy, setManualCopy] = useState("");
  const [sampleDone, setSampleDone] = useState(false);
  const [presetIndex, setPresetIndex] = useState(-1);

  useEffect(() => {
    const shared = new URLSearchParams(window.location.search).get("studio");
    try {
      const saved = shared ?? window.localStorage.getItem(storageKey);
      if (saved) setSettings(decodeSettings(JSON.parse(saved)));
    } catch {
      // The default canvas is available when storage or a shared preset is invalid.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch {
      // The live canvas still works in browsers that disable local storage.
    }
  }, [ready, settings]);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((previous) => ({ ...previous, [key]: value }));
    setFeedback("");
    setManualCopy("");
  }

  function surprise() {
    const next = (presetIndex + 1) % compositions.length;
    setPresetIndex(next);
    setSettings({ ...compositions[next], motion: settings.motion });
    setFeedback("Composition applied.");
    setManualCopy("");
  }

  function reset() {
    setSettings(initialSettings);
    setPresetIndex(-1);
    const url = new URL(window.location.href);
    if (url.searchParams.has("studio")) {
      url.searchParams.delete("studio");
      window.history.replaceState(window.history.state, "", url);
    }
    setFeedback("Canvas reset.");
    setManualCopy("");
  }

  async function copy(value: string, message: string) {
    try {
      await navigator.clipboard.writeText(value);
      setFeedback(message);
      setManualCopy("");
    } catch {
      setManualCopy(value);
      setFeedback("Select and copy the value below.");
    }
  }

  function share() {
    const url = new URL(window.location.href);
    url.searchParams.set("studio", JSON.stringify(settings));
    url.hash = "identity";
    void copy(url.href, "Link copied.");
  }

  const palette = palettes[settings.palette];
  const canvasStyle = {
    "--field": palette.background, "--field-ink": palette.ink, "--field-accent": palette.accent, "--type-scale": settings.scale / 100,
    "--logo-filter": settings.palette === "ink" ? "brightness(0) invert(1)" : "brightness(0)",
  } as CSSProperties;
  const headline = settings.headline.trim() || initialSettings.headline;

  return (
    <section id="identity" className={s.section} aria-labelledby="identity-title">
      <div className={s.sectionIntro}>
        <div><p className={s.eyebrow}>The visual system</p><h2 id="identity-title">Identity lab.</h2></div>
        <p>Try Tomo’s palette, 3D stickers and surfaces on a poster, sticker card or product card.</p>
      </div>
      <div className={s.labShell}>
        <Tabs items={tabs} current={tab} id="brand" label="Brand workspaces" onChange={(next) => { setTab(next); setFeedback(""); setManualCopy(""); }} />
        {tabs.map((item) => (
          <div key={item.id} hidden={tab !== item.id}>
            {tab === item.id ? (
              <Panel id="brand" tab={tab} className={s.labBody}>
                {tab === "components" ? (
                  <div className={s.componentSamples}>
                    <Conversation prompt="can you remind me before i head out?" reply="yep. i’ll give you a nudge at 5:30." />
                    <Widget label="Reminder · Today" title="Take the blue notebook">
                      <label className={s.sampleCheck}><input type="checkbox" checked={sampleDone} onChange={(event) => setSampleDone(event.target.checked)} /> Packed and ready</label>
                      <Progress label="Reminder completion" value={Number(sampleDone)} max={1} />
                      <div className={s.sampleActions}><button type="button" className={s.primaryButton} onClick={() => setSampleDone(!sampleDone)}>{sampleDone ? "Mark as open" : "Mark as done"}</button><button type="button" className={s.secondaryButton} disabled>Snooze reminder</button></div>
                    </Widget>
                  </div>
                ) : (
                  <div className={s.previewArea}>
                    <div className={s.canvas} style={canvasStyle} data-material={settings.format === "poster" ? settings.material : undefined} data-motion={settings.motion} data-format={settings.format}>
                      <div className={s.composition} data-type={settings.type} data-material={settings.format === "poster" ? undefined : settings.material}>
                        <div className={s.compositionTop}><TomoLogo variant={settings.lockup} /><span className={s.mono}>{formatLabels[settings.format]}</span></div>
                        <p className={s.compositionTitle}>{headline}</p>
                        <div className={s.compositionBottom}><span className={s.mono}>Interface as identity</span><Sticker name={paletteStickers[settings.palette]} className={s.compositionStar} /></div>
                      </div>
                    </div>
                    <p className={s.canvasCaption}><span>{palette.label} / {materials[settings.material].label}</span><span>{formatLabels[settings.format]}</span></p>
                  </div>
                )}
                <div className={s.inspector}>
                  {tab === "identity" && <>
                    <div><h3>Compose a look</h3><p>Use the full mark on a title, the stacked lockup on narrow surfaces, and the small symbol inside widgets.</p></div>
                    <Field label="Lockup"><select value={settings.lockup} onChange={(event) => update("lockup", event.target.value as Settings["lockup"])}>{settingsOptions.lockup.map((value) => <option key={value} value={value}>{lockupLabels[value]}</option>)}</select></Field>
                    <Field label="Format"><select value={settings.format} onChange={(event) => update("format", event.target.value as Settings["format"])}>{settingsOptions.format.map((value) => <option key={value} value={value}>{formatLabels[value]}</option>)}</select></Field>
                    <label className={s.checkField}><input type="checkbox" checked={settings.motion} onChange={(event) => update("motion", event.target.checked)} /> Subtle motion</label>
                  </>}
                  {tab === "type" && <>
                    <div><h3>Set the type</h3><p>Inter Tight for display, DM Sans for interfaces, a serif and mono for editorial contrast.</p></div>
                    <Field label="Headline"><input type="text" maxLength={64} value={settings.headline} onChange={(event) => update("headline", event.target.value)} /></Field>
                    <Field label="Treatment"><select value={settings.type} onChange={(event) => update("type", event.target.value as Settings["type"])}>{settingsOptions.type.map((value) => <option key={value} value={value}>{typeLabels[value]}</option>)}</select></Field>
                    <Field label={`Scale · ${settings.scale}%`}><input type="range" min="75" max="125" step="1" value={settings.scale} onChange={(event) => update("scale", Number(event.target.value))} /></Field>
                    <Field label="Sample headline"><select value={compositions.some((preset) => preset.headline === settings.headline) ? settings.headline : ""} onChange={(event) => update("headline", event.target.value || initialSettings.headline)}><option value="">Choose a sample</option>{compositions.map((preset) => <option key={preset.headline}>{preset.headline}</option>)}</select></Field>
                  </>}
                  {tab === "materials" && <>
                    <div><h3>Pick a surface</h3><p>Try mist, glossy enamel or a clean digital surface.</p></div>
                    <fieldset className={s.swatches}><legend>Palette</legend>{settingsOptions.palette.map((value) => <button key={value} type="button" title={palettes[value].label} aria-label={palettes[value].label} aria-pressed={value === settings.palette} style={{ background: palettes[value].background, color: palettes[value].ink }} onClick={() => update("palette", value)}>{value === settings.palette ? "✓" : ""}</button>)}</fieldset>
                    <p className={s.paletteMeta}>{palette.background} · {palette.role}</p>
                    <Field label="Material"><select value={settings.material} onChange={(event) => update("material", event.target.value as Settings["material"])}>{settingsOptions.material.map((value) => <option key={value} value={value}>{materials[value].label}</option>)}</select></Field>
                    <p className={s.paletteMeta}>{materials[settings.material].detail}</p>
                    <button type="button" className={s.secondaryButton} onClick={() => void copy(formatPaletteTokens(settings.palette), "Color tokens copied.")}>Copy color tokens</button>
                  </>}
                  {tab === "components" ? <>
                    <div><h3>Product grammar</h3><p>Messages carry the voice. Widgets share an action area, readable labels and a clear completion state.</p></div>
                    <dl className={s.tokenList}><div><dt>Space</dt><dd>4 / 8 / 12 / 16 / 24 / 32 px</dd></div><div><dt>Radius</dt><dd>10 / 17 / 24 px</dd></div><div><dt>Motion</dt><dd>160 / 320 / 520 ms</dd></div><div><dt>Border</dt><dd>1 px solid · #DEDFE8</dd></div></dl>
                    <button type="button" className={s.secondaryButton} onClick={() => void copy(formatPaletteTokens(settings.palette), "Color tokens copied.")}>Copy color tokens</button>
                  </> : (
                    <div className={s.labActions}>
                      <button type="button" className={s.primaryButton} onClick={surprise}>Surprise me</button>
                      <button type="button" className={s.secondaryButton} onClick={reset}>Reset</button>
                      <button type="button" className={s.secondaryButton} onClick={share}>Copy link</button>
                    </div>
                  )}
                  <p className={s.feedback} role="status">{feedback}</p>
                  {manualCopy && <Field label="Copy this value"><textarea readOnly value={manualCopy} onFocus={(event) => event.currentTarget.select()} /></Field>}
                </div>
              </Panel>
            ) : <div role="tabpanel" id={`brand-panel-${item.id}`} aria-labelledby={`brand-tab-${item.id}`} />}
          </div>
        ))}
      </div>
    </section>
  );
}
