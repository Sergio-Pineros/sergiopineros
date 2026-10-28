import { site } from "@/content/site";

export function Manifesto() {
  return (
    <section
      id="message"
      className="section-ink bg-ink text-paper-dark-text"
      aria-labelledby="manifesto-label"
    >
      <div
        className="mx-auto max-w-3xl py-[clamp(4.5rem,12vw,8rem)]"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <h2 className="eyebrow" id="manifesto-label">
          {site.manifesto.label}
        </h2>
        <div className="grid gap-6 font-serif text-[clamp(1.35rem,2.6vw,1.85rem)] leading-[1.45] tracking-[-0.015em]">
          {site.manifesto.paragraphs.map((paragraph) => (
            <p key={paragraph} className="m-0">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-10 font-serif text-[clamp(1.5rem,3vw,2rem)] italic leading-snug">
          {site.manifesto.closing}
        </p>
        <p className="mt-10">
          <a className="quiet-link text-[color:var(--paper-dark-text)]" href={site.substackUrl}>
            {site.manifesto.substackLinkLabel} →
          </a>
        </p>
      </div>
    </section>
  );
}
