import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate pb-16 pt-16 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28"
      style={{ paddingInline: "var(--page-gutter)" }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <p className="eyebrow mb-0 lg:col-span-4 lg:self-end">
          {site.masthead.label}
        </p>

        <div className="relative lg:col-span-7 lg:col-start-6">
          <h1 className="m-0 font-serif text-[clamp(3.4rem,12vw,7.2rem)] font-normal leading-[1.05] tracking-[-0.03em] text-ink">
            {site.hero.h1Lead}{" "}
            <em className="italic font-normal">{site.hero.h1Emph}</em>
          </h1>
          <p className="pointer-events-none mt-3 font-hand text-[1.45rem] leading-none text-[color:var(--lilac-aside)] sm:absolute sm:-right-2 sm:top-2 sm:mt-0 sm:rotate-[-6deg]">
            {site.hero.aside}
          </p>
          <p className="mt-8 max-w-[38rem] font-serif text-[1.15rem] leading-[1.55] text-ink-soft sm:text-[1.25rem]">
            {site.hero.subline}
          </p>
          <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[0.92rem] text-ink-soft">
            <a className="quiet-link" href={site.substackUrl}>
              Read the writing →
            </a>
            <span aria-hidden="true" className="text-ink-faint">
              ·
            </span>
            <a className="quiet-link" href={site.instagramUrl}>
              See {site.instagramHandle} →
            </a>
            <span aria-hidden="true" className="text-ink-faint">
              ·
            </span>
            <a className="quiet-link" href="#work">
              Selected work ↓
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
