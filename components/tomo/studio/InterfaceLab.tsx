"use client";

import { useEffect, useState, type FormEvent } from "react";
import { biomes, prototypeSelectionEvent } from "./brand";
import { BiomeArtwork, Conversation, Panel, Progress, Sticker, Tabs, Widget, studioStyles as s } from "./StudioPrimitives";

const examples = [
  { id: "run", label: "Log a run", prompt: "i ran 3km today!!", reply: "okay runner era 👀 that’s your longest this week. i put it next to your other runs." },
  { id: "plan", label: "Plan a day", prompt: "i have so much to do tomorrow", reply: "let’s make it feel smaller. i put the time-sensitive stuff up top. move anything you need." },
  { id: "win", label: "Keep a win", prompt: "i got the job!!!", reply: "THE job?? the one you practiced for in the kitchen? save a little piece of how this feels." },
  { id: "rest", label: "Take a breath", prompt: biomes.rest.message, reply: biomes.rest.reply },
] as const;
type Example = (typeof examples)[number]["id"];

const days = [
  { label: "Mon", full: "Monday", distance: 1.5 }, { label: "Tue", full: "Tuesday", distance: 0 },
  { label: "Wed", full: "Wednesday", distance: 2.2 }, { label: "Thu", full: "Thursday", distance: 0 },
  { label: "Fri", full: "Friday", distance: 3 },
];

function RunningTracker() {
  const [selected, setSelected] = useState(4);
  const [distances, setDistances] = useState(days.map((day) => String(day.distance)));
  const values = distances.map(Number);
  const total = values.reduce((sum, value) => sum + value, 0);
  const goal = 10;
  const maxBar = Math.max(4, ...values);
  const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

  function recordDistance(value: string) {
    if (value && (Number(value) < 0 || Number(value) > 100)) return;
    setDistances((previous) => previous.map((distance, index) => index === selected ? value : distance));
  }

  return (
    <Widget label="Activity · This week" title="Your runs" sticker="sparkle">
      <div className={s.runResult} aria-live="polite"><strong>{number.format(values[selected])}<small> km</small></strong><span>{days[selected].full}</span></div>
      <div className={s.runDays} role="group" aria-label="Select a day">
        {days.map((day, index) => (
          <button type="button" key={day.label} aria-pressed={index === selected} aria-label={`${day.full}, ${number.format(values[index])} kilometers`} onClick={() => setSelected(index)}>
            <span className={s.barTrack}><span style={{ height: `${Math.max(5, values[index] / maxBar * 100)}%` }} /></span>
            {day.label}
          </button>
        ))}
      </div>
      <label className={s.widgetField}>Edit distance (km)<input type="number" min="0" max="100" step="0.1" inputMode="decimal" value={distances[selected]} onChange={(event) => recordDistance(event.target.value)} /></label>
      <div className={s.progressLabel}><span>Weekly goal</span><strong>{number.format(total)} / {goal} km</strong></div>
      <Progress label="Weekly distance goal" value={total} max={goal} />
    </Widget>
  );
}

const initialTasks = [
  { id: 0, title: "Send the application", time: "09:00", priority: true, done: false },
  { id: 1, title: "Pick up groceries", time: "12:30", priority: false, done: false },
  { id: 2, title: "Call Mom", time: "18:00", priority: false, done: false },
];

function Planner() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draft, setDraft] = useState("");
  const [nextId, setNextId] = useState(initialTasks.length);
  const complete = tasks.filter((task) => task.done).length;
  const ordered = [...tasks].sort((a, b) => (a.time || "24:00").localeCompare(b.time || "24:00"));
  const [editing, setEditing] = useState(false);

  function editTask(id: number, change: Partial<Omit<(typeof initialTasks)[number], "id">>) {
    setTasks((previous) => previous.map((task) => task.id === id ? { ...task, ...change } : task));
  }

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;
    setTasks((previous) => [...previous, { id: nextId, title, time: "", priority: false, done: false }]);
    setNextId(nextId + 1);
    setDraft("");
  }

  return (
    <Widget label="Schedule · Tomorrow" title="A day you can handle" sticker="check">
      <div className={s.progressLabel}><span>Daily progress</span><strong aria-live="polite">{complete} / {tasks.length} done</strong></div>
      <Progress label="Tasks completed" value={complete} max={tasks.length} />
      <div className={s.taskTools}><button className={s.textLink} type="button" aria-pressed={editing} onClick={() => setEditing(!editing)}>{editing ? "Done editing" : "Edit schedule"}</button></div>
      <ul className={s.tasks}>
        {ordered.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.done} aria-label={`Complete ${task.title || "untitled task"}`} onChange={(event) => editTask(task.id, { done: event.target.checked })} />
            {editing ? <div className={s.taskEdit}>
              <input type="text" maxLength={52} value={task.title} aria-label={`Task ${task.id + 1} name`} onChange={(event) => editTask(task.id, { title: event.target.value })} />
              <input type="time" value={task.time} aria-label={`Task ${task.id + 1} time`} onChange={(event) => editTask(task.id, { time: event.target.value })} />
            </div> : <div className={s.taskName} data-done={task.done}><span>{task.title.trim() || "Untitled task"}</span><small>{task.time || "Anytime"}</small></div>}
            <button className={s.priority} aria-pressed={task.priority} aria-label={`Mark ${task.title || "untitled task"} important`} type="button" onClick={() => editTask(task.id, { priority: !task.priority })}>★</button>
          </li>
        ))}
      </ul>
      <form className={s.addTask} onSubmit={addTask}>
        <input aria-label="New task" type="text" placeholder="Add something to tomorrow" maxLength={52} value={draft} onChange={(event) => setDraft(event.target.value)} />
        <button type="submit" className={s.primaryButton} disabled={!draft.trim()}>Add</button>
      </form>
    </Widget>
  );
}

const memoryThemes = ["Yellow", "Pink", "Blue"] as const;
const memoryKey = "tomo-keepsake-v1";
type Memory = { title: string; note: string; theme: (typeof memoryThemes)[number] };
const defaultMemory: Memory = { title: "I got the job!", note: "Three weeks of practice. One very good phone call.", theme: "Yellow" };

function Keepsake() {
  const [memory, setMemory] = useState(defaultMemory);
  const [date, setDate] = useState("June 25, 2026");
  const [status, setStatus] = useState("");

  function save() {
    try {
      const savedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date());
      window.localStorage.setItem(memoryKey, JSON.stringify({ ...memory, date: savedDate }));
      setDate(savedDate);
      setStatus("Saved on this device.");
    } catch {
      setStatus("This browser couldn’t save the keepsake.");
    }
  }

  function restore() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(memoryKey) ?? "null");
      if (!saved || typeof saved.title !== "string" || typeof saved.note !== "string" || !memoryThemes.includes(saved.theme) || typeof saved.date !== "string") {
        setStatus("Save a keepsake first.");
        return;
      }
      setMemory({ title: saved.title.slice(0, 36), note: saved.note.slice(0, 80), theme: saved.theme });
      setDate(saved.date);
      setStatus("Keepsake restored.");
    } catch {
      setStatus("No saved keepsake was available.");
    }
  }

  return (
    <Widget label="Memory · A good day" title="Keep this moment" sticker="heart">
      <div className={s.keepsake} data-theme={memory.theme} data-material="gloss">
        <span className={s.mono}>{date}</span><strong>{memory.title.trim() || "I got the job!"}</strong>
        <p>{memory.note}</p><Sticker name="heart" className={s.keepsakeStar} />
      </div>
      <label className={s.widgetField}>Keepsake title<input type="text" maxLength={36} value={memory.title} onChange={(event) => { setMemory({ ...memory, title: event.target.value }); setStatus(""); }} /></label>
      <label className={s.widgetField}>Memory note<input type="text" maxLength={80} value={memory.note} onChange={(event) => { setMemory({ ...memory, note: event.target.value }); setStatus(""); }} /></label>
      <div className={s.memoryPalette} role="group" aria-label="Keepsake colors">
        {memoryThemes.map((theme) => <button key={theme} type="button" aria-pressed={memory.theme === theme} data-theme={theme} onClick={() => { setMemory({ ...memory, theme }); setStatus(""); }}>{theme}</button>)}
      </div>
      <div className={s.sampleActions}><button type="button" className={s.primaryButton} onClick={save}>Save keepsake</button><button type="button" className={s.secondaryButton} onClick={restore}>Restore saved</button></div>
      <p role="status" className={s.feedback}>{status}</p>
    </Widget>
  );
}

function Reflection() {
  const [thought, setThought] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [finished, setFinished] = useState(false);

  return (
    <Widget label="Reflection · A quiet moment" title="Give it some room" sticker="cloud">
      <div className={s.reflectionFields}>
        <label>What keeps coming up?
          <textarea rows={2} maxLength={180} value={thought} onChange={(event) => { setThought(event.target.value); setFinished(false); }} />
        </label>
        <label>What’s one thing you can do next?
          <textarea rows={2} maxLength={120} value={nextStep} onChange={(event) => { setNextStep(event.target.value); setFinished(false); }} />
        </label>
      </div>
      <button type="button" className={s.primaryButton} disabled={!thought.trim() || !nextStep.trim()} onClick={() => setFinished(true)}>Mark as done</button>
      <p role="status" className={s.feedback}>{finished ? "A thought and a next step. That’s enough for today." : ""}</p>
    </Widget>
  );
}

export default function InterfaceLab() {
  const [example, setExample] = useState<Example>("run");
  useEffect(() => {
    function selectFromHero(event: Event) {
      if (!(event instanceof CustomEvent)) return;
      const selected = examples.find(({ id }) => id === event.detail);
      if (selected) setExample(selected.id);
    }

    window.addEventListener(prototypeSelectionEvent, selectFromHero);
    return () => window.removeEventListener(prototypeSelectionEvent, selectFromHero);
  }, []);

  return (
    <section id="interfaces" className={s.section} aria-labelledby="interfaces-title">
      <div className={s.sectionIntro}>
        <div><p className={s.eyebrow}>Product prototypes</p><h2 id="interfaces-title">Start with a text.</h2></div>
        <p>A message can become a tracker, a plan, a keepsake or a place to think. Try four prototypes with fictional data.</p>
      </div>
      <div className={s.interfaceShell}>
        <Tabs items={examples} current={example} onChange={setExample} id="examples" label="Interface prototypes" />
        {examples.map(({ id, prompt, reply }) => (
          <div key={id} hidden={example !== id} data-biome={id}>
            <Panel id="examples" tab={id} className={s.interfaceBody}>
              <div className={s.dialogue}><Conversation prompt={prompt} reply={reply} /><BiomeArtwork name={id} className={s.interfaceBiome} /></div>
              <div className={s.generated}><p className={s.mono}>From the conversation · {biomes[id].name}</p>{id === "run" ? <RunningTracker /> : id === "plan" ? <Planner /> : id === "win" ? <Keepsake /> : <Reflection />}</div>
            </Panel>
          </div>
        ))}
      </div>
      <p className={s.designNote}>The same grid, labels and focus states hold them together. Each layout gives the moment something useful to do.</p>
    </section>
  );
}
