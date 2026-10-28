import { site } from "@/content/site";

export function Work() {
  return (
    <section
      id="work"
      className="pb-[clamp(4rem,10vw,6.5rem)]"
      style={{ paddingInline: "var(--page-gutter)" }}
      aria-labelledby="work-label"
    >
      <div className="mx-auto max-w-6xl">
        <hr className="hairline mb-12" />
        <h2 className="eyebrow" id="work-label">
          {site.work.label}
        </h2>
        <p className="mb-10 max-w-[40rem] font-sans text-[1.05rem] font-light leading-[1.65] text-ink-soft">
          {site.work.introBefore}
          <a className="quiet-link text-ink" href={site.atelierUrl}>
            {site.work.introLinkLabel}
          </a>
          {site.work.introAfter}
        </p>

        <ul className="m-0 list-none border-t border-[color:var(--rule)] p-0">
          {site.work.items.map((item) => (
            <li key={item.name} className="border-b border-[color:var(--rule)]">
              <a
                href={item.href}
                className="group grid gap-2 py-6 no-underline sm:grid-cols-[minmax(10rem,0.32fr)_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <h3 className="m-0 font-serif text-[1.45rem] font-normal leading-snug tracking-tight text-ink">
                  {item.name}
                </h3>
                <p className="m-0 font-sans text-[0.98rem] font-light leading-[1.55] text-ink-soft">
                  {item.description}
                </p>
                <span className="font-sans text-sm text-ink-faint group-hover:text-ink">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-4xl font-sans text-[0.78rem] font-light uppercase tracking-[0.12em] leading-relaxed text-ink-faint">
          {site.work.namesRow}
        </p>
      </div>
    </section>
  );
}
