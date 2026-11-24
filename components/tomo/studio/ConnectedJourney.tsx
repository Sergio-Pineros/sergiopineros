"use client";

import { useState } from "react";
import { Progress, TomoLogo, Widget, studioStyles as s } from "./StudioPrimitives";
import j from "./connected-journey.module.css";

const days = [
  { label: "Mon", full: "Monday" },
  { label: "Tue", full: "Tuesday" },
  { label: "Wed", full: "Wednesday" },
  { label: "Thu", full: "Thursday" },
  { label: "Fri", full: "Friday" },
] as const;

const originalDistances = ["1.5", "0", "2.2", "0", "3"];
const weeklyGoal = 10;
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

function formatDistance(distance: number) {
  return number.format(distance);
}

export default function ConnectedJourney() {
  const [distances, setDistances] = useState([...originalDistances]);
  const [selectedDay, setSelectedDay] = useState(4);
  const [checkInAllowed, setCheckInAllowed] = useState(false);
  const [tomorrowVisible, setTomorrowVisible] = useState(false);

  const values = distances.map((value) => Number(value) || 0);
  const total = values.reduce((sum, value) => sum + value, 0);
  const latestRun = values[4];
  const remaining = Math.max(0, weeklyGoal - total);
  const maxBar = Math.max(4, ...values);
  const goalReached = total >= weeklyGoal;

  const nextMessage = goalReached
    ? "morning!! you made it to " + formatDistance(total) + " km this week. past your " + weeklyGoal + " km goal!! want a recovery day, or should we plan something easy?"
    : "morning!! you're at " + formatDistance(total) + " km this week. just " + formatDistance(remaining) + " km until your goal. how are your legs feeling today?";

  function updateDistance(value: string) {
    const next = Number(value);
    if (value !== "" && (!Number.isFinite(next) || next < 0 || next > 100)) return;
    setDistances((previous) =>
      previous.map((distance, index) => index === selectedDay ? value : distance)
    );
  }

  function resetDemo() {
    setDistances([...originalDistances]);
    setSelectedDay(4);
    setCheckInAllowed(false);
    setTomorrowVisible(false);
  }

  return (
    <div className={j.journey}>
      <div className={j.intro}>
        <div>
          <p className={j.eyebrow}>Our product hypothesis · interactive concept</p>
          <h3>One conversation. Three useful forms.</h3>
        </div>
        <p>
          Tomo already lives in messages and can make personal interfaces. What if the
          experience could move between the two without losing context—and only
          follow up when someone wants it to?
        </p>
      </div>

      <div className={j.timeline}>
        <section className={j.step} aria-labelledby="journey-conversation-title">
          <div className={j.stepHeading}>
            <span className={j.stepNumber}>01</span>
            <div>
              <p className={j.stage}>Today · iMessage</p>
              <h4 id="journey-conversation-title">Start where life happens.</h4>
            </div>
          </div>
          <div className={j.chatFrame}>
            <div className={j.chatTop}>
              <TomoLogo variant="mark" />
              <div><strong>Tomo</strong><span>Messages · Friday</span></div>
            </div>
            <div className={s.conversation}>
              <p className={s.sentBubble}>i ran {formatDistance(latestRun)} km today!!</p>
              <div className={s.receivedRow}>
                <TomoLogo variant="mark" />
                <p className={s.receivedBubble}>okay runner era 👀 want to see how this fits into your week?</p>
              </div>
            </div>
          </div>
          <p className={j.underNote}>The familiar entrance stays the same: a text. No new workflow to learn.</p>
        </section>

        <section className={j.step} aria-labelledby="journey-interface-title">
          <div className={j.stepHeading}>
            <span className={j.stepNumber}>02</span>
            <div>
              <p className={j.stage}>Today · personal interface</p>
              <h4 id="journey-interface-title">Open a tool when it helps.</h4>
            </div>
          </div>
          <Widget label="Activity · This week" title="Your runs" sticker="sparkle">
            <div className={s.runResult} aria-live="polite">
              <strong>{formatDistance(values[selectedDay])}<small> km</small></strong>
              <span>{days[selectedDay].full}</span>
            </div>
            <div className={s.runDays} role="group" aria-label="Choose a day to edit">
              {days.map((day, index) => (
                <button
                  type="button"
                  key={day.label}
                  aria-pressed={selectedDay === index}
                  aria-label={day.full + ", " + formatDistance(values[index]) + " kilometers"}
                  onClick={() => setSelectedDay(index)}
                >
                  <span className={s.barTrack}>
                    <span style={{ height: Math.max(5, values[index] / maxBar * 100) + "%" }} />
                  </span>
                  {day.label}
                </button>
              ))}
            </div>
            <label className={s.widgetField}>
              Edit distance (km)
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                inputMode="decimal"
                value={distances[selectedDay]}
                onChange={(event) => updateDistance(event.target.value)}
              />
            </label>
            <div className={s.progressLabel}>
              <span>Weekly goal</span>
              <strong aria-live="polite">{formatDistance(total)} / {weeklyGoal} km</strong>
            </div>
            <Progress label="Weekly distance goal" value={total} max={weeklyGoal} />
          </Widget>
          <p className={j.underNote}>
            Try editing Friday&apos;s run. The message and the progress tracker share the same state.
          </p>
        </section>

        <section className={j.step} aria-labelledby="journey-return-title">
          <div className={j.stepHeading}>
            <span className={j.stepNumber}>03</span>
            <div>
              <p className={j.stage}>Our concept · back to iMessage</p>
              <h4 id="journey-return-title">Return with context.</h4>
            </div>
          </div>

          <div className={j.optIn}>
            <label className={j.optInLabel}>
              <input
                type="checkbox"
                checked={checkInAllowed}
                onChange={(event) => {
                  setCheckInAllowed(event.target.checked);
                  if (!event.target.checked) setTomorrowVisible(false);
                }}
              />
              <span>Allow a check-in about my running goal</span>
            </label>
            <p>Proactive messages should be a choice, not an assumption.</p>
            <button
              type="button"
              className={s.primaryButton}
              disabled={!checkInAllowed}
              onClick={() => setTomorrowVisible(true)}
            >
              Preview tomorrow&apos;s message
            </button>
          </div>

          <div className={j.futureMessage} aria-live="polite">
            {tomorrowVisible && checkInAllowed ? (
              <>
                <p className={j.previewLabel}>Saturday · simulated iMessage</p>
                <div className={s.receivedRow}>
                  <TomoLogo variant="mark" />
                  <p className={s.receivedBubble}>{nextMessage}</p>
                </div>
                <p className={j.contextNote}>
                  Based on {formatDistance(total)} km logged and your {weeklyGoal} km goal.
                  Changes to the tracker update this reply.
                </p>
              </>
            ) : (
              <p className={j.placeholder}>
                {checkInAllowed
                  ? "Ready when you are. Preview how the next conversation uses your updated progress."
                  : "No message is generated until you choose to allow a follow-up."}
              </p>
            )}
          </div>
          <p className={j.underNote}>The interface is temporary. The context can continue—with permission.</p>
        </section>
      </div>

      <div className={j.footer}>
        <p>Design principle: conversation → useful interface → conversation, without losing the thread.</p>
        <button type="button" className={s.textLink} onClick={resetDemo}>Reset experience</button>
      </div>
      <p className={j.disclaimer}>Scripted prototype with fictional data. It does not send messages, access Tomo accounts, or call an AI model.</p>
    </div>
  );
}
