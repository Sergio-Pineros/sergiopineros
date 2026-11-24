"use client";

import { useEffect, useState, type FormEvent } from "react";
import { biomes, prototypeSelectionEvent } from "./brand";
import { BiomeArtwork, Conversation, Panel, Progress, Sticker, Tabs, Widget, studioStyles as s } from "./StudioPrimitives";
import ConnectedJourney from "./ConnectedJourney";

const examples = [
  { id: "run", label: "Log a run", prompt: "i ran 3km today!!", reply: "okay runner era 👀 that’s your longest this week. i put it next to your other runs." },
  { id: "plan", label: "Plan a day", prompt: "i have so much to do tomorrow", reply: "let’s make it feel smaller. i put the time-sensitive stuff up top. move anything you need." },
  { id: "win", label: "Keep a win", prompt: "i got the job!!!", reply: "THE job?? the one you practiced for in the kitchen? save a little piece of how this feels." },
  { id: "rest", label: "Take a breath", prompt: biomes.rest.message, reply: biomes.rest.reply },
] as const;
type Example = (typeof examples)[number]["id"];

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
        <div><p className={s.eyebrow}>Product concept · connected experience</p><h2 id="interfaces-title">From conversation to action. And back.</h2></div>
        <p>First, edit a running tracker and see how a future message uses the same context—with permission. Then explore three other interface ideas.</p>
      </div>
      <div className={s.interfaceShell}>
        <Tabs items={examples} current={example} onChange={setExample} id="examples" label="Interface prototypes" />
        {examples.map(({ id, prompt, reply }) => (
          <div key={id} hidden={example !== id} data-biome={id}>
            {id === "run" ? (
              <Panel id="examples" tab={id}>
                <ConnectedJourney />
              </Panel>
            ) : (
              <Panel id="examples" tab={id} className={s.interfaceBody}>
                <div className={s.dialogue}>
                  <Conversation prompt={prompt} reply={reply} />
                  <BiomeArtwork name={id} className={s.interfaceBiome} />
                </div>
                <div className={s.generated}>
                  <p className={s.mono}>From the conversation · {biomes[id].name}</p>
                  {id === "plan" ? <Planner /> : id === "win" ? <Keepsake /> : <Reflection />}
                </div>
              </Panel>
            )}
          </div>
        ))}
      </div>
      <p className={s.designNote}>What remains familiar: texting Tomo. What we explore: personal interfaces that preserve context, respect consent and return smoothly to the conversation.</p>
    </section>
  );
}
