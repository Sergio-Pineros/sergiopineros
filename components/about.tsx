import { elsewhereLinks, site } from "@/content/site";

export function About() {
  const links = elsewhereLinks();

  return (
    <section
      id="about"
      className="pb-[clamp(4rem,10vw,6.5rem)]"
      style={{ paddingInline: "var(--page-gutter)" }}
      aria-labelledby="about-label"
    >
      <div className="mx-auto max-w-6xl">
        <hr className="hairline mb-12" />
        <h2 className="eyebrow" id="about-label">
          {site.about.label}
        </h2>
        <div className="max-w-[40rem] space-y-5 font-serif text-[1.125rem] leading-[1.65] text-ink">
          {site.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="m-0">
              {paragraph}
            </p>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 p-0 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <a className="quiet-link text-ink-soft" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
