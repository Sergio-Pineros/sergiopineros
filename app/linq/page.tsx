import type { Metadata } from "next";
import Link from "next/link";
import ReadingProgress from "@/components/linq/ReadingProgress";
import { LINQ_EXPERIMENTS, LINQ_LINKS, type LinqExperiment } from "@/lib/linq";

export const metadata: Metadata = {
  title: "For Linq: a growth exercise by Sergio Piñeros",
  description:
    "Three growth experiments I would explore at Linq, informed by the businesses, campaigns and communities I have helped build. An independent exercise by Sergio Piñeros for the Growth Strategist position.",
  alternates: { canonical: "/linq" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "For Linq: a growth exercise by Sergio Piñeros",
    description:
      "Good growth starts with understanding people. Three experiments, and the experience behind each one.",
    type: "article",
    url: "https://sergiopineros.com/linq",
    siteName: "Sergio Piñeros",
  },
};

const STRUCTURE = [
  { label: "The experience", text: "A real challenge I encountered." },
  { label: "What I did", text: "My actual contribution, with precise attribution." },
  { label: "What I learned", text: "A concise insight from that experience." },
  { label: "What I'd test at Linq", text: "A practical, bounded hypothesis." },
  { label: "How I'd measure it", text: "A leading indicator, and the outcome it should predict." },
] as const;

const SEQUENCE = ["Discover", "Demonstrate", "Activate", "Learn", "Repeat"] as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-deep">
      {children}
    </p>
  );
}

function BlockLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="border-t border-ink/15 pt-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-deep">
      {children}
    </h4>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 text-[17px] leading-[1.75] text-ink-soft">{children}</div>;
}

function ExperimentSection({ experiment }: { experiment: LinqExperiment }) {
  return (
    <section
      id={experiment.id}
      aria-labelledby={`${experiment.id}-title`}
      className="scroll-mt-24 border-t border-ink/10 py-16 sm:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
        <div className="max-w-[68ch]">
          <Eyebrow>
            {experiment.number} / {experiment.theme}
          </Eyebrow>
          <h3
            id={`${experiment.id}-title`}
            className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-[44px]"
          >
            {experiment.title}
          </h3>

          <div className="mt-12 space-y-10">
            <div className="space-y-4">
              <BlockLabel>The experience</BlockLabel>
              <Prose>
                {experiment.experience.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </Prose>
            </div>

            <div className="space-y-4">
              <BlockLabel>What I did</BlockLabel>
              <Prose>
                {experiment.did.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </Prose>
            </div>

            <div className="space-y-4">
              <BlockLabel>What I learned</BlockLabel>
              <Prose>
                <p>{experiment.learned}</p>
              </Prose>
            </div>

            <div className="space-y-4">
              <BlockLabel>What I&apos;d test at Linq</BlockLabel>
              <Prose>
                {experiment.testIntro.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </Prose>
              <p className="pt-2 font-serif text-xl italic text-ink">{experiment.pilotTitle}</p>
              <ol className="list-decimal space-y-2 pl-5 text-[17px] leading-[1.7] text-ink-soft marker:text-brand-deep">
                {experiment.pilot.map((step) => (
                  <li key={step.slice(0, 32)}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="space-y-4">
              <BlockLabel>How I&apos;d measure it</BlockLabel>
              <ul className="list-disc space-y-2 pl-5 text-[17px] leading-[1.7] text-ink-soft marker:text-brand-deep">
                {experiment.metrics.map((metric) => (
                  <li key={metric.slice(0, 32)}>{metric}</li>
                ))}
              </ul>
              <Prose>
                <p>{experiment.metricsNote}</p>
              </Prose>
            </div>
          </div>

          <p className="mt-14 font-serif text-2xl italic leading-snug text-ink sm:text-[28px]">
            {experiment.takeaway}
          </p>
        </div>

        <aside className="hidden lg:block" aria-label={`Note on experiment ${experiment.number}`}>
          <p className="sticky top-24 border-l border-brand/40 pl-5 text-[15px] leading-[1.7] text-muted">
            {experiment.annotation}
          </p>
        </aside>
      </div>
    </section>
  );
}

export default function LinqPage() {
  return (
    <div className="min-h-screen bg-page font-sans text-ink antialiased">
      <ReadingProgress />
      <a
        href="#introduction"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-page focus:px-4 focus:py-2 focus:outline focus:outline-2 focus:outline-brand"
      >
        Skip to the introduction
      </a>

      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg text-ink underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
        >
          Sergio Piñeros
        </Link>
        <a
          href={LINQ_LINKS.linq}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-medium uppercase tracking-[0.18em] text-muted underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
        >
          Prepared for Linq
        </a>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        {/* Section 01: Introduction */}
        <section id="introduction" aria-labelledby="linq-title" className="relative pb-16 pt-10 sm:pt-16">
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
              Three experiments I&apos;d explore at Linq, informed by the businesses, campaigns
              and communities I&apos;ve helped build.
            </p>
            <div className="mt-10">
              <Prose>
                <p>
                  I&apos;m Sergio. I&apos;ve spent the past several years helping small businesses
                  find customers, communicate what makes them different, and put technology to
                  work.
                </p>
                <p>
                  Along the way, I&apos;ve learned that growth rarely comes from one clever
                  campaign. It comes from understanding who you&apos;re building for, testing what
                  resonates, and doing the work to make it happen.
                </p>
                <p>Here&apos;s how I&apos;d bring that approach to Linq.</p>
              </Prose>
            </div>
            <p className="mt-10 text-sm italic leading-relaxed text-muted">
              An independent exercise prepared for Linq&apos;s Growth Strategist position. Linq has
              not commissioned, approved or endorsed this page, and the experiments below are
              hypotheses formed from public information, not conclusions drawn from internal data.
            </p>
          </div>

          <nav aria-label="The three experiments" className="relative mt-14 border-t border-ink/15">
            <ol>
              {LINQ_EXPERIMENTS.map((experiment) => (
                <li key={experiment.id} className="border-b border-ink/10">
                  <a
                    href={`#${experiment.id}`}
                    className="group flex items-baseline gap-4 py-4 underline-offset-4 sm:gap-6"
                  >
                    <span className="font-sans text-sm font-semibold tracking-[0.18em] text-brand-deep">
                      {experiment.number}
                    </span>
                    <span className="font-serif text-xl text-ink transition-colors group-hover:text-brand-deep group-hover:underline sm:text-2xl">
                      {experiment.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        {/* Section 02: The way I think */}
        <section aria-labelledby="approach-title" className="border-t border-ink/10 py-16 sm:py-20">
          <div className="max-w-[68ch]">
            <Eyebrow>Section 02 / The way I think</Eyebrow>
            <h2 id="approach-title" className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-[44px]">
              From experience to experiments.
            </h2>
            <div className="mt-8">
              <Prose>
                <p>
                  Instead of listing what I have done and hoping it sounds relevant, each strategy
                  below follows the same structure. It starts with something that actually
                  happened, is precise about what my part in it was, and only then turns into an
                  experiment I would consider testing at Linq.
                </p>
              </Prose>
            </div>
            <dl className="mt-10 space-y-0">
              {STRUCTURE.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 border-t border-ink/10 py-4 sm:grid-cols-[220px_1fr] sm:gap-6"
                >
                  <dt className="font-sans text-[12px] font-semibold uppercase leading-[1.9] tracking-[0.2em] text-brand-deep">
                    {item.label}
                  </dt>
                  <dd className="text-[16px] leading-[1.7] text-ink-soft">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Sections 03 to 05: The three experiments */}
        {LINQ_EXPERIMENTS.map((experiment) => (
          <ExperimentSection key={experiment.id} experiment={experiment} />
        ))}

        {/* Section 06: Connecting the experiments */}
        <section aria-labelledby="system-title" className="border-t border-ink/10 py-16 sm:py-20">
          <div className="max-w-[68ch]">
            <Eyebrow>Section 06 / Connecting the experiments</Eyebrow>
            <h2 id="system-title" className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-[44px]">
              Three experiments. One learning system.
            </h2>
            <p
              className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-2 font-serif text-2xl text-ink sm:text-3xl"
              aria-label="Discover, demonstrate, activate, learn, repeat"
            >
              {SEQUENCE.map((step, index) => (
                <span key={step} className="flex items-baseline gap-3">
                  <span className={index === SEQUENCE.length - 1 ? "italic text-brand-deep" : undefined}>
                    {step}
                  </span>
                  {index < SEQUENCE.length - 1 ? (
                    <span aria-hidden="true" className="text-brand">
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </p>
            <div className="mt-10">
              <Prose>
                <p>
                  The three ideas are one process, not three separate campaigns. Customer research
                  identifies relevant problems. Useful demonstrations make the product easier to
                  understand. Events and community initiatives encourage people to participate, not
                  just observe. Focused conversion experiments help turn that interest into
                  activation. And what people do, and do not do, informs the next iteration.
                </p>
                <p>
                  This is a proposed framework, not a validated company strategy. It would need to
                  be tested against what Linq&apos;s team and customers already know.
                </p>
              </Prose>
            </div>
            <blockquote className="mt-10 border-l-2 border-brand pl-6 font-serif text-[22px] italic leading-[1.5] text-ink">
              I wouldn&apos;t assume these are the right experiments before speaking with
              Linq&apos;s team and customers. They&apos;re where I&apos;d start asking better
              questions.
            </blockquote>
          </div>
        </section>

        {/* Section 07: Why Linq */}
        <section aria-labelledby="why-title" className="border-t border-ink/10 py-16 sm:py-20">
          <div className="max-w-[68ch]">
            <Eyebrow>Section 07 / Why Linq</Eyebrow>
            <h2 id="why-title" className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-[44px]">
              Why this work interests me.
            </h2>
            <div className="mt-8">
              <Prose>
                <p>
                  My work has gradually moved from helping businesses communicate with customers to
                  exploring how technology can make those interactions more natural and useful.
                </p>
                <p>
                  That&apos;s what caught my attention about Linq. I&apos;m interested in the
                  infrastructure behind new ways of communicating, but just as much in the challenge
                  of helping people discover what they can build with it.
                </p>
                <p>
                  I&apos;d love to contribute to that process, learn from the team, and help turn
                  promising ideas into experiments that produce real insight.
                </p>
              </Prose>
            </div>
          </div>
        </section>

        {/* Section 08: About */}
        <section aria-labelledby="about-title" className="border-t border-ink/10 py-16 sm:py-20">
          <div className="max-w-[68ch]">
            <Eyebrow>Section 08 / About</Eyebrow>
            <h2 id="about-title" className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-[44px]">
              A little about the person behind these ideas.
            </h2>
            <div className="mt-8">
              <Prose>
                <p>
                  I&apos;m Sergio Piñeros, a Colombian founder, creative strategist and builder
                  working across growth, digital experiences and applied technology. I&apos;m
                  bilingual in English and Spanish.
                </p>
                <p>
                  I&apos;ve built small businesses, collaborated with creative teams, worked
                  directly with customers and explored products at the intersection of technology
                  and communication.
                </p>
                <p>
                  I enjoy understanding how something works, finding what could work better, and
                  building alongside people who care about both.
                </p>
              </Prose>
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

      {/* Colophon: Sergio & Co. */}
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
