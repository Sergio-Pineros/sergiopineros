import type { Metadata } from "next";
import Link from "next/link";
import ReadingProgress from "@/components/linq/ReadingProgress";
import PlansExplorer from "@/components/linq/PlansExplorer";
import { LINQ_LINKS, LINQ_PLANS } from "@/lib/linq";

export const metadata: Metadata = {
  title: "For Linq: a growth exercise by Sergio Piñeros",
  description:
    "Experiments I would explore at Linq, and the real work behind each one. An independent exercise by Sergio Piñeros for the Growth Strategist position.",
  alternates: { canonical: "/linq" },
  robots: { index: false, follow: false },
  twitter: {
    card: "summary",
    title: "For Linq: a growth exercise by Sergio Piñeros",
    description:
      "Good growth starts with understanding people. Experiments I would explore at Linq, and the experience behind each one.",
  },
  openGraph: {
    title: "For Linq: a growth exercise by Sergio Piñeros",
    description:
      "Good growth starts with understanding people. Experiments I would explore at Linq, and the experience behind each one.",
    type: "article",
    url: "https://sergiopineros.com/linq",
    siteName: "Sergio Piñeros",
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-deep">
      {children}
    </p>
  );
}

export default function LinqPage() {
  return (
    <div className="min-h-screen bg-page font-sans text-ink antialiased">
      <ReadingProgress />
      <a
        href="#plans"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-page focus:px-4 focus:py-2 focus:outline focus:outline-2 focus:outline-brand"
      >
        Skip to the plans
      </a>

      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg text-ink underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
        >
          Sergio Piñeros
        </Link>
        <nav aria-label="Page" className="flex items-center gap-2 sm:gap-3">
          <a
            href="#plans"
            className="rounded-full px-4 py-2.5 text-[15px] font-medium text-ink-soft transition-colors hover:bg-surface-muted/60 hover:text-ink"
          >
            The plans
          </a>
          <a
            href="#talk"
            className="rounded-full bg-ink px-5 py-2.5 font-serif text-[16px] text-page transition-colors hover:bg-brand-deep"
          >
            Let&apos;s talk
          </a>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <section aria-labelledby="linq-title" className="relative pb-16 pt-10 sm:pt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url('/textures/paper-grain.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "256px",
            }}
          />
          <div className="relative max-w-[68ch]">
            <Eyebrow>An independent growth exercise / Linq</Eyebrow>
            <h1
              id="linq-title"
              className="mt-6 font-serif text-[44px] leading-[1.08] text-ink sm:text-6xl sm:leading-[1.05]"
            >
              Good growth starts with understanding people.
            </h1>
            <p className="mt-6 font-serif text-[22px] italic leading-[1.45] text-ink-soft sm:text-2xl">
              Work I would do at Linq, and the real jobs and campaigns it comes from.
            </p>
            <div className="mt-10 space-y-4 text-[17px] leading-[1.75] text-ink-soft">
              <p>
                I&apos;m Sergio. I&apos;ve spent the past several years helping small businesses
                find customers, communicate what makes them different, and put technology to work.
              </p>
              <p>
                Linq describes this job in plain terms: find the businesses and developers who
                should use Linq, help turn them into users, and keep them. The day to day work is
                events, content, landing pages, campaigns and research. The plans below are my
                version of that future work. Each one says what I would do, how I would do it, and
                why. And each one is tied to something I have already done.
              </p>
            </div>
            <p className="mt-10 text-sm italic leading-relaxed text-muted">
              An independent exercise prepared for Linq&apos;s Growth Strategist position. Linq has
              not commissioned, approved or endorsed this page, and the plans are ideas formed from
              public information, not conclusions drawn from internal data.
            </p>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="The plans at a glance">
              {LINQ_PLANS.map((plan) => (
                <li key={plan.id}>
                  <a
                    href="#plans"
                    className="inline-block rounded-full border border-ink/15 px-4 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:border-brand/60 hover:text-ink"
                  >
                    {plan.tab}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="plans" aria-labelledby="plans-title" className="scroll-mt-20 border-t border-ink/10 py-16 sm:py-20">
          <div className="max-w-[68ch]">
            <Eyebrow>The plans</Eyebrow>
            <h2 id="plans-title" className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-[44px]">
              Ways I would grow Linq.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.75] text-ink-soft">
              Pick a plan. Walk through it step by step. See what each step needs, what it
              produces, and how I would know if it worked.
            </p>
          </div>
          <div className="mt-12">
            <PlansExplorer />
          </div>
        </section>

        <section aria-labelledby="loop-title" className="border-t border-ink/10 py-16 sm:py-20">
          <div className="max-w-[68ch]">
            <Eyebrow>How the plans connect</Eyebrow>
            <h2 id="loop-title" className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-[44px]">
              Ideas that feed each other.
            </h2>
            <p
              className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-serif text-2xl text-ink sm:text-3xl"
              aria-label="Discover, demonstrate, activate, learn, repeat"
            >
              {["Discover", "Demonstrate", "Activate", "Learn", "Repeat"].map((word, index, all) => (
                <span key={word} className="flex items-baseline gap-3">
                  <span className={index === all.length - 1 ? "italic text-brand-deep" : undefined}>{word}</span>
                  {index < all.length - 1 ? (
                    <span aria-hidden="true" className="text-brand">
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </p>
            <p className="mt-10 text-[17px] leading-[1.75] text-ink-soft">
              The plans are one loop, not separate projects. Research finds the real problems.
              Demos make Linq easy to get. Events get people building, not just watching. Campaigns
              turn that interest into people getting started. And what we learn makes the next
              round better. I would not call these the right ideas before talking with Linq&apos;s
              team and customers. They are where I would start.
            </p>
          </div>
        </section>

        <section id="talk" aria-labelledby="talk-title" className="scroll-mt-20 border-t border-ink/10 py-16 sm:py-20">
          <div className="max-w-[68ch]">
            <Eyebrow>Why Linq, and a little about me</Eyebrow>
            <h2 id="talk-title" className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-[44px]">
              Let&apos;s talk about growth at Linq.
            </h2>
            <div className="mt-8 space-y-4 text-[17px] leading-[1.75] text-ink-soft">
              <p>
                My work has moved from helping businesses communicate with customers to exploring
                how technology can make those interactions more natural and useful. That is what
                caught my attention about Linq. I am interested in the tools behind new ways of
                communicating, and just as much in helping people discover what they can build
                with them.
              </p>
              <p>
                I&apos;m Sergio Piñeros, a Colombian founder, creative strategist and builder
                working across growth, digital experiences and applied technology. I&apos;m
                bilingual in English and Spanish. I have built small businesses, worked with
                creative teams, worked directly with customers, and explored products where
                technology meets communication.
              </p>
            </div>
            <p className="mt-12 font-serif text-[26px] leading-snug text-ink sm:text-3xl">
              I&apos;d love to talk about what we could test together.
            </p>
            <ul className="mt-8 flex flex-wrap gap-3">
              <li>
                <a
                  href={`mailto:${LINQ_LINKS.email}`}
                  className="inline-block rounded-full border border-ink/15 px-5 py-2.5 font-serif text-[16px] text-ink-soft transition-colors hover:border-brand/50 hover:text-brand-deep"
                >
                  {LINQ_LINKS.email}
                </a>
              </li>
              <li>
                <a
                  href={LINQ_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-ink/15 px-5 py-2.5 font-serif text-[16px] text-ink-soft transition-colors hover:border-brand/50 hover:text-brand-deep"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link
                  href="/"
                  className="inline-block rounded-full border border-ink/15 px-5 py-2.5 font-serif text-[16px] text-ink-soft transition-colors hover:border-brand/50 hover:text-brand-deep"
                >
                  sergiopineros.com
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10">
        <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8">
          <div className="max-w-[68ch]">
            <Eyebrow>More of my work</Eyebrow>
            <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft">
              Explore selected commercial and digital strategy projects at Sergio &amp; Co.
            </p>
            <p className="mt-4">
              <a
                href={LINQ_LINKS.studio}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-xl text-ink underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
              >
                Sergio &amp; Co. · Digital Strategy &amp; Creative Work
              </a>
            </p>
            <p className="mt-12 text-[13px] leading-relaxed text-muted">
              Sergio Piñeros · An independent growth exercise for Linq&apos;s Growth Strategist
              position · Not affiliated with or endorsed by Linq
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
