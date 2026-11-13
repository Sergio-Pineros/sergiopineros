"use client";

import { useState } from "react";
import { LINQ_PLANS } from "@/lib/linq";

export default function PlansExplorer() {
  const [planIndex, setPlanIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [experienceOpen, setExperienceOpen] = useState(false);

  const plan = LINQ_PLANS[planIndex];
  const step = plan.steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === plan.steps.length - 1;

  const choosePlan = (index: number) => {
    setPlanIndex(index);
    setStepIndex(0);
    setExperienceOpen(false);
  };

  return (
    <div>
      <div role="tablist" aria-label="Growth plans" className="flex flex-wrap gap-2">
        {LINQ_PLANS.map((item, index) => (
          <button
            key={item.id}
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={index === planIndex}
            aria-controls={`panel-${item.id}`}
            onClick={() => choosePlan(index)}
            className={`rounded-full px-5 py-3 font-serif text-[17px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              index === planIndex
                ? "bg-ink text-page"
                : "border border-ink/15 bg-transparent text-ink-soft hover:border-brand/60 hover:text-ink"
            }`}
          >
            {item.tab}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${plan.id}`}
        aria-labelledby={`tab-${plan.id}`}
        className="mt-10"
      >
        <h3 className="max-w-[22ch] font-serif text-4xl leading-[1.12] text-ink sm:text-[44px]">
          {plan.title}
        </h3>
        <p className="mt-5 max-w-[68ch] text-[17px] leading-[1.75] text-ink-soft">{plan.intro}</p>

        <div className="mt-12 border-t border-ink/10 pt-8">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-deep">
            A pilot, step by step
          </p>
          <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Pilot steps">
            {plan.steps.map((item, index) => (
              <button
                key={item.name}
                role="tab"
                aria-selected={index === stepIndex}
                onClick={() => setStepIndex(index)}
                className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  index === stepIndex
                    ? "bg-brand-deep text-page"
                    : "bg-surface-muted/60 text-ink-soft hover:text-ink"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
            <div className="max-w-[62ch]">
              <h4 className="font-serif text-2xl text-ink">{step.name}</h4>
              <p className="mt-3 text-[17px] leading-[1.75] text-ink-soft">{step.text}</p>
              <div className="mt-7 space-y-3">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-deep">
                  What this produces
                </p>
                <p className="text-[17px] leading-[1.7] text-ink">{step.produces}</p>
              </div>
            </div>
            <aside aria-label="What to have ready" className="lg:border-l lg:border-brand/30 lg:pl-6">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-deep">
                Have ready
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-[1.65] text-muted marker:text-brand-deep">
                {step.ready.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div aria-hidden="true" className="mr-2 flex gap-1.5">
              {plan.steps.map((item, index) => (
                <span
                  key={item.name}
                  className={`h-2 w-2 rounded-full ${index === stepIndex ? "bg-brand-deep" : "bg-ink/15"}`}
                />
              ))}
            </div>
            {!isFirst ? (
              <button
                type="button"
                onClick={() => setStepIndex(stepIndex - 1)}
                className="rounded-full border border-ink/15 px-5 py-2.5 font-serif text-[16px] text-ink-soft transition-colors hover:border-brand/60 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                Back: {plan.steps[stepIndex - 1].name}
              </button>
            ) : null}
            {!isLast ? (
              <button
                type="button"
                onClick={() => setStepIndex(stepIndex + 1)}
                className="rounded-full bg-ink px-5 py-2.5 font-serif text-[16px] text-page transition-colors hover:bg-brand-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                Next: {plan.steps[stepIndex + 1].name}
              </button>
            ) : (
              <p className="font-serif text-[16px] italic text-muted">That is the full pilot.</p>
            )}
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-ink/10 pt-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-deep">
              Why do it
            </p>
            <p className="mt-3 text-[17px] leading-[1.75] text-ink-soft">{plan.goal}</p>
          </div>
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-deep">
              What I would measure
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[17px] leading-[1.7] text-ink-soft marker:text-brand-deep">
              {plan.measure.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-8">
          <button
            type="button"
            aria-expanded={experienceOpen}
            aria-controls={`experience-${plan.id}`}
            onClick={() => setExperienceOpen((open) => !open)}
            className="flex items-center gap-3 font-serif text-[22px] text-ink transition-colors hover:text-brand-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {plan.experienceTitle}
            <span aria-hidden="true" className="text-brand-deep">
              {experienceOpen ? "−" : "+"}
            </span>
          </button>
          {experienceOpen ? (
            <div id={`experience-${plan.id}`} className="mt-5 max-w-[68ch] space-y-4 text-[17px] leading-[1.75] text-ink-soft">
              {plan.experience.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
