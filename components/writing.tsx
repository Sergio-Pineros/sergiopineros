import { site } from "@/content/site";

export function Writing() {
  return (
    <section
      id="writing"
      className="py-[clamp(4rem,10vw,6.5rem)]"
      style={{ paddingInline: "var(--page-gutter)" }}
      aria-labelledby="writing-label"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="eyebrow" id="writing-label">
          {site.writing.label}
        </h2>
        <p className="mb-10 max-w-[40rem] font-sans text-[1.05rem] font-light leading-[1.65] text-ink-soft">
          {site.writing.intro}
        </p>

        <ul className="m-0 list-none border-t border-[color:var(--rule)] p-0">
          {site.writing.series.map((row) => (
            <li key={row.name} className="border-b border-[color:var(--rule)]">
              <a
                href={row.href}
                className="group grid gap-2 py-6 no-underline sm:grid-cols-[minmax(12rem,0.4fr)_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <h3 className="m-0 font-serif text-[1.45rem] font-normal leading-snug tracking-tight text-ink">
                  {row.name}
                </h3>
                <p className="m-0 font-sans text-[0.98rem] font-light leading-[1.55] text-ink-soft">
                  {row.description}
                </p>
                <span className="font-sans text-sm text-ink-faint group-hover:text-ink">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-ink-soft">
          <a className="quiet-link" href={site.instagramUrl}>
            Follow {site.instagramHandle} on Instagram →
          </a>
          <a className="quiet-link" href={site.substackUrl}>
            Read longer on Substack →
          </a>
        </p>
      </div>
    </section>
  );
}
