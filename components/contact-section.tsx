import { ContactForm } from "@/components/contact-form";
import { site } from "@/content/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="pb-[clamp(4.5rem,10vw,7rem)]"
      style={{ paddingInline: "var(--page-gutter)" }}
      aria-labelledby="contact-label"
    >
      <div className="mx-auto max-w-6xl">
        <hr className="hairline mb-12" />
        <h2 className="eyebrow" id="contact-label">
          {site.contact.label}
        </h2>
        <p className="mb-10 max-w-[38rem] font-serif text-[1.2rem] leading-[1.6] text-ink">
          {site.contact.intro}
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
