import { elsewhereLinks, navLinks, site } from "@/content/site";

type Props = {
  contactHref?: string;
};

export function SiteFooter({ contactHref = "/#contact" }: Props) {
  const links = [
    ...navLinks({ contactHref }).filter((link) => link.label !== "Contact"),
    ...elsewhereLinks(),
    { label: "Contact", href: contactHref },
  ];

  return (
    <footer className="section-ink bg-ink text-paper-dark-text">
      <div
        className="mx-auto max-w-6xl py-[clamp(3.5rem,8vw,5.5rem)]"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <p className="m-0 font-serif text-[clamp(2.4rem,7vw,4.5rem)] leading-[1.05] tracking-tight">
          {site.footer.closing}
        </p>
        <hr className="hairline my-10 bg-[color-mix(in_srgb,var(--paper-dark-text)_22%,transparent)]" />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 p-0 list-none">
            {links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <a
                  className="quiet-link font-sans text-[0.8rem] font-medium uppercase tracking-[0.14em] text-paper-dark-text"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-12 font-sans text-xs font-light tracking-wide text-[color-mix(in_srgb,var(--paper-dark-text)_58%,transparent)]">
          © {site.year} {site.footer.colophonPrefix} · {site.footer.colophonType}
        </p>
      </div>
    </footer>
  );
}
