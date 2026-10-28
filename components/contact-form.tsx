"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { isPendingUrl, site } from "@/content/site";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initial);
  const headingId = useId();
  const statusRef = useRef<HTMLParagraphElement>(null);
  const showEmail = !isPendingUrl(site.contactEmail);

  useEffect(() => {
    if (state.status !== "idle") {
      statusRef.current?.focus();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <p
        ref={statusRef}
        tabIndex={-1}
        className="font-serif text-xl leading-relaxed text-ink"
        role="status"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="grid max-w-xl gap-5" noValidate>
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${headingId}-hp`}>Company website</label>
        <input
          id={`${headingId}-hp`}
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor={`${headingId}-name`}>Name</label>
        <input
          id={`${headingId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={state.fieldErrors?.name ? `${headingId}-name-error` : undefined}
        />
        {state.fieldErrors?.name ? (
          <p id={`${headingId}-name-error`} className="field-error">
            {state.fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor={`${headingId}-email`}>Email</label>
        <input
          id={`${headingId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? `${headingId}-email-error` : undefined}
        />
        {state.fieldErrors?.email ? (
          <p id={`${headingId}-email-error`} className="field-error">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor={`${headingId}-topic`}>What is this about?</label>
        <select
          id={`${headingId}-topic`}
          name="topic"
          required
          defaultValue=""
          aria-invalid={Boolean(state.fieldErrors?.topic)}
          aria-describedby={state.fieldErrors?.topic ? `${headingId}-topic-error` : undefined}
        >
          <option value="" disabled>
            Choose one
          </option>
          {site.contact.topics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
        {state.fieldErrors?.topic ? (
          <p id={`${headingId}-topic-error`} className="field-error">
            {state.fieldErrors.topic}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor={`${headingId}-message`}>Message</label>
        <textarea
          id={`${headingId}-message`}
          name="message"
          required
          placeholder={site.contact.placeholder}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? `${headingId}-message-error` : undefined}
        />
        {state.fieldErrors?.message ? (
          <p id={`${headingId}-message-error`} className="field-error">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <p ref={statusRef} tabIndex={-1} role="alert" className="field-error">
          {state.message}
        </p>
      ) : (
        <p ref={statusRef} tabIndex={-1} className="sr-only" aria-live="polite" />
      )}

      <div>
        <button className="ink-button" type="submit" disabled={pending}>
          {pending ? "Sending" : site.contact.submitLabel}
        </button>
      </div>

      {showEmail ? (
        <p className="m-0 font-sans text-sm font-light text-ink-soft">
          {site.contact.preferEmail}{" "}
          <a className="quiet-link text-ink" href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>
        </p>
      ) : null}

      <p className="m-0 font-sans text-xs font-light leading-relaxed text-ink-faint">
        {site.contact.privacy}
      </p>
    </form>
  );
}
