"use client";

import { useState, type FormEvent } from "react";
import { Arrow, Conversation, Panel, Progress, Tabs, Widget, studioStyles as s } from "./StudioPrimitives";

const examples = [
  { id: "run", label: "Log a run", prompt: "i ran 3km today!!", reply: "three whole kilometers! that’s your longest this week. i put it next to your other runs." },
  { id: "plan", label: "Plan a day", prompt: "i have so much to do tomorrow", reply: "let’s make it feel smaller. i put the time-sensitive stuff up top. move anything you need." },
  { id: "win", label: "Keep a win", prompt: "i got the job!!!", reply: "THE job?? you did it! before the day gets away from you, save a little piece of how this feels." },
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
    <Widget label="Activity · This week" title="Your runs">
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
    <Widget label="Schedule · Tomorrow" title="A day you can handle">
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
    <Widget label="Memory · A good day" title="Keep this moment">
      <div className={s.keepsake} data-theme={memory.theme} data-material="print">
        <span className={s.mono}>{date}</span><strong>{memory.title.trim() || "I got the job!"}</strong>
        <p>{memory.note}</p><span className={s.keepsakeStar} aria-hidden="true">✳</span>
      </div>
      <label className={s.widgetField}>Keepsake title<input type="text" maxLength={36} value={memory.title} onChange={(event) => { setMemory({ ...memory, title: event.target.value }); setStatus(""); }} /></label>
      <label className={s.widgetField}>Memory note<input type="text" maxLength={80} value={memory.note} onChange={(event) => { setMemory({ ...memory, note: event.target.value }); setStatus(""); }} /></label>
      <div className={s.memoryPalette} role="group" aria-label="Keepsake colors">
        {memoryThemes.map((theme) => <button key={theme} type="button" aria-pressed={memory.theme === theme} data-theme={theme} onClick={() => { setMemory({ ...memory, theme }); setStatus(""); }}>{theme}</button>)}
      </div>
      <div className={s.sampleActions}><button type="button" className={s.primaryButton} onClick={save}>Save keepsake <Arrow /></button><button type="button" className={s.secondaryButton} onClick={restore}>Restore saved</button></div>
      <p role="status" className={s.feedback}>{status}</p>
    </Widget>
  );
}

export default function InterfaceLab() {
  const [example, setExample] = useState<Example>("run");
  return (
    <section id="interfaces" className={s.section} aria-labelledby="interfaces-title">
      <div className={s.sectionIntro}>
        <div><p className={s.eyebrow}>Product prototypes</p><h2 id="interfaces-title">Interface as identity.</h2></div>
        <p>A single message can become a tracker, a plan or a keepsake. Try three local prototypes with fictional data.</p>
      </div>
      <div className={s.interfaceShell}>
        <Tabs items={examples} current={example} onChange={setExample} id="examples" label="Interface prototypes" />
        {examples.map(({ id, prompt, reply }) => (
          <div key={id} hidden={example !== id}>
            <Panel id="examples" tab={id} className={s.interfaceBody}>
              <Conversation prompt={prompt} reply={reply} />
              <div className={s.generated}><p className={s.mono}>From the conversation</p>{id === "run" ? <RunningTracker /> : id === "plan" ? <Planner /> : <Keepsake />}</div>
            </Panel>
          </div>
        ))}
      </div>
      <p className={s.designNote}>The same grid, labels and focus states hold all three together. Each layout leads with what matters in that moment: distance, time or a memory.</p>
    </section>
  );
}
