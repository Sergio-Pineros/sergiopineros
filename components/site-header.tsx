import Link from "next/link";
import { navLinks, site } from "@/content/site";

type Props = {
  contactHref?: string;
};

export function SiteHeader({ contactHref = "/#contact" }: Props) {
  const links = navLinks({ contactHref });

  return (
    <header className="sticky top-0 z-40 bg-paper">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div
        className="mx-auto flex items-center justify-between gap-6 py-4"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <Link
          href="/"
          className="font-serif text-[1.05rem] leading-none tracking-tight text-ink no-underline"
        >
          {site.name}
        </Link>

        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink-soft no-underline hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <details className="nav-menu relative md:hidden">
          <summary
            className="grid size-11 place-items-center border border-[color:var(--rule)] bg-transparent text-ink"
            aria-label="Open menu"
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className="block h-px w-4 bg-ink" />
              <span className="block h-px w-4 bg-ink" />
            </span>
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 top-full mt-2 min-w-44 border border-[color:var(--rule)] bg-paper p-4"
          >
            <ul className="grid gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-serif text-lg text-ink no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
      <hr className="hairline m-0" />
    </header>
  );
}
