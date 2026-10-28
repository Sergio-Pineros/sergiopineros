"use server";

import { site } from "@/content/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "topic" | "message", string>>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS = new Set<string>(site.contact.topics.map((topic) => topic.value));

function read(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (read(formData, "company_website")) {
    return { status: "success", message: site.contact.success };
  }

  const name = read(formData, "name");
  const email = read(formData, "email");
  const topic = read(formData, "topic");
  const message = read(formData, "message");

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Please leave your name.";
  if (!email || !EMAIL.test(email)) fieldErrors.email = "Please leave a real email.";
  if (!topic || !TOPICS.has(topic)) fieldErrors.topic = "Please choose what this is about.";
  if (!message) fieldErrors.message = "Please write a message.";

  if (Object.keys(fieldErrors).length) {
    return { status: "error", fieldErrors, message: site.contact.error };
  }

  const topicLabel =
    site.contact.topics.find((item) => item.value === topic)?.label ?? topic;
  const payload = {
    name,
    email,
    topic: topicLabel,
    message,
  };

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Sergio Piñeros <onboarding@resend.dev>",
        to: [site.contactEmail],
        reply_to: email,
        subject: `${topicLabel} — ${name}`,
        text: `From: ${name} <${email}>\nAbout: ${topicLabel}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      return { status: "error", message: site.contact.error };
    }

    return { status: "success", message: site.contact.success };
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      return { status: "error", message: site.contact.error };
    }
    return { status: "success", message: site.contact.success };
  }

  return { status: "error", message: site.contact.error };
}
