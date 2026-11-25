"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import st from "./tomo-product-study.module.css";

type Moment = "run" | "plan" | "win";
type View = "chat" | "space";
type Todo = { id: number; label: string; done: boolean };

const choices: { id: Moment; label: string; message: string; opener: string }[] = [
  {
    id: "run",
    label: "i went running",
    message: "i ran 3km today!!",
    opener: "okay runner era 👀 made you a little space to track it.",
  },
  {
    id: "plan",
    label: "tomorrow is chaos",
    message: "i have SO much to do tomorrow",
    opener: "okay let's make it less terrifying. i put the important stuff first.",
  },
  {
    id: "win",
    label: "i got the job",
    message: "I GOT THE JOB!!!",
    opener: "THE DESIGN ONE?? 😭 let's keep this moment.",
  },
];

const initialTasks: Todo[] = [
  { id: 1, label: "Send the application", done: false },
  { id: 2, label: "Pick up groceries", done: false },
  { id: 3, label: "Call Mom", done: false },
];
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

export default function TomoProductStudy() {
  const [moment, setMoment] = useState<Moment>("run");
  const [view, setView] = useState<View>("chat");
  const [returned, setReturned] = useState(false);
  const [runDistance, setRunDistance] = useState("3");
  const [weeklyGoal, setWeeklyGoal] = useState(10);
  const [tasks, setTasks] = useState<Todo[]>(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [winTitle, setWinTitle] = useState("I got the job!");
  const [winSaved, setWinSaved] = useState(false);
  const [checkIn, setCheckIn] = useState(false);

  const selected = choices.find((choice) => choice.id === moment) ?? choices[0];
  const distance = Number(runDistance) || 0;
  const weeklyTotal = 3.7 + distance;
  const completed = tasks.filter((task) => task.done).length;
  const progress = Math.min(100, Math.round((weeklyTotal / weeklyGoal) * 100));

  function chooseMoment(next: Moment) {
    setMoment(next);
    setView("chat");
    setReturned(false);
    setCheckIn(false);
  }

  function updateDistance(value: string) {
    if (value !== "" && (!Number.isFinite(Number(value)) || Number(value) < 0 || Number(value) > 100)) return;
    setRunDistance(value);
  }

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newTask.trim()) return;
    setTasks((previous) => [...previous, { id: Math.max(0, ...previous.map((task) => task.id)) + 1, label: newTask.trim().slice(0, 46), done: false }]);
    setNewTask("");
  }

  function goBackToText() {
    setReturned(true);
    setView("chat");
  }

  function restart() {
    setView("chat");
    setReturned(false);
    setRunDistance("3");
    setWeeklyGoal(10);
    setTasks(initialTasks);
    setNewTask("");
    setWinTitle("I got the job!");
    setWinSaved(false);
    setCheckIn(false);
  }

  const followUp =
    moment === "run"
      ? "got you. " + number.format(weeklyTotal) + " km this week, " + number.format(Math.max(0, weeklyGoal - weeklyTotal)) + " to go." + (checkIn ? " i'll check in tomorrow 💛" : " no check-ins unless you want them.")
      : moment === "plan"
        ? "nice, " + completed + " out of " + tasks.length + " done. your list is right where you left it." + (checkIn ? " i'll nudge you tomorrow." : "")
        : winSaved
          ? "saved: “" + (winTitle.trim() || "I got the job!") + ".” this deserves its own little place 💛"
          : "we can leave it here for now. you can save the moment whenever you want.";

  return (
    <main className={st.page} lang="en">
      <header className={st.header}>
        <a href="#top" className={st.brand} aria-label="tomo">
          <Image src="/tomo-studio/tomo-official-mark.svg" alt="" width={28} height={28} />
          <span className={st.brandName}>tomo</span>
        </a>
      </header>

      <section className={st.hero} id="top" aria-labelledby="hero-title">
        <div className={st.heroCopy}>
          <h1 id="hero-title">
            <span>what happens</span>
            <span>after you</span>
            <em>text tomo?</em>
          </h1>
          <p className={st.lede}>A message becomes a tool.</p>
          <a className={st.heroCta} href="#prototype">play with it</a>
        </div>

        <div className={st.stage} id="prototype">
          <div className={st.scenarios} role="group" aria-label="Pick a scenario">
            {choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                className={st.scenario}
                aria-pressed={moment === choice.id}
                onClick={() => chooseMoment(choice.id)}
              >
                {choice.label}
              </button>
            ))}
            <button type="button" className={st.reset} onClick={restart}>reset</button>
          </div>

          <div className={st.phone} data-moment={moment}>
            <div className={st.phoneHeader}>
              <div className={st.phoneAvatar}>
                <Image src="/tomo-studio/tomo-official-mark.svg" alt="" width={26} height={26} />
              </div>
              <strong>tomo</strong>
            </div>
            <div className={st.switcher} role="group" aria-label="Choose view">
              <button type="button" aria-pressed={view === "chat"} onClick={() => setView("chat")}>the text</button>
              <button type="button" aria-pressed={view === "space"} onClick={() => setView("space")}>your space</button>
            </div>

            {view === "chat" ? (
              <div className={st.chat} key={moment}>
                <div className={st.messageSent}>{selected.message}</div>
                <div className={st.messageReceived}>{selected.opener}</div>
                {returned && <div className={st.messageReceived} aria-live="polite">{followUp}</div>}
                <button className={st.openSpace} type="button" onClick={() => setView("space")}>
                  open your space
                </button>
              </div>
            ) : (
              <div className={st.space} key={moment}>
                {moment === "run" && (
                  <section aria-labelledby="run-title" className={st.generated}>
                    <h2 id="run-title">you&apos;re on a roll.</h2>
                    <div className={st.bigNumber} aria-live="polite">{number.format(weeklyTotal)}<small> km</small></div>
                    <div className={st.bar} role="progressbar" aria-label="Running goal" aria-valuemin={0} aria-valuemax={weeklyGoal} aria-valuenow={Math.min(weeklyTotal, weeklyGoal)}>
                      <span style={{ width: progress + "%" }} />
                    </div>
                    <div className={st.inputsRow}>
                      <label>today&apos;s run <input type="number" inputMode="decimal" min="0" max="100" step="0.1" value={runDistance} onChange={(e) => updateDistance(e.target.value)} /></label>
                      <label>weekly goal <select value={weeklyGoal} onChange={(e) => setWeeklyGoal(Number(e.target.value))}><option value="8">8 km</option><option value="10">10 km</option><option value="15">15 km</option><option value="20">20 km</option></select></label>
                    </div>
                  </section>
                )}
                {moment === "plan" && (
                  <section aria-labelledby="plan-title" className={st.generated}>
                    <h2 id="plan-title">one thing at a time.</h2>
                    <ul className={st.tasks}>
                      {tasks.map((task) => (
                        <li key={task.id}>
                          <label>
                            <input type="checkbox" checked={task.done} onChange={() => setTasks((previous) => previous.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))} />
                            <span className={task.done ? st.done : ""}>{task.label}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                    <form className={st.addTask} onSubmit={addTask}>
                      <input aria-label="New task" placeholder="add one more thing" maxLength={46} value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                      <button type="submit" disabled={!newTask.trim()}>add</button>
                    </form>
                  </section>
                )}
                {moment === "win" && (
                  <section aria-labelledby="win-title" className={st.generated}>
                    <h2 id="win-title">this one&apos;s a keeper.</h2>
                    <label className={st.winInput}>
                      name this moment
                      <input type="text" maxLength={50} value={winTitle} onChange={(e) => { setWinTitle(e.target.value); setWinSaved(false); }} />
                    </label>
                    <button type="button" className={st.saveMoment} aria-pressed={winSaved} onClick={() => setWinSaved(!winSaved)}>
                      {winSaved ? "saved" : "save this moment"}
                    </button>
                  </section>
                )}
                <div className={st.consentArea}>
                  <label className={st.consent}>
                    <input type="checkbox" checked={checkIn} onChange={(event) => setCheckIn(event.target.checked)} />
                    <span>{moment === "win" ? "let tomo bring this up again" : "let tomo check in tomorrow"}</span>
                  </label>
                  <button type="button" className={st.backToChat} onClick={goBackToText}>back to the conversation</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={st.claim} aria-labelledby="claim-title">
        <h2 id="claim-title">
          <span>not every thought</span>
          <span>needs a <em>dashboard.</em></span>
        </h2>
      </section>

      <section id="about" className={st.about}>
        <h2>hey, i&apos;m sergio.</h2>
        <a href="mailto:s.dpineros@gmail.com?subject=Let%27s%20talk%20Tomo">let&apos;s grab a coffee</a>
      </section>

      <footer className={st.footer}>
        <a href="/tomo/studio">earlier explorations</a>
        <a href="https://www.tomo.ai/">the real tomo</a>
      </footer>
    </main>
  );
}
