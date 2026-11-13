import type { Metadata } from "next";
import Link from "next/link";
import ReadingProgress from "@/components/linq/ReadingProgress";
import { LINQ_EXPERIMENTS, LINQ_LINKS, type LinqExperiment } from "@/lib/linq";

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

const STRUCTURE = [
  { label: "The experience", text: "Real work I have done, and the problem in it." },
  { label: "What I did", text: "My actual contribution, with precise attribution." },
  { label: "What I learned", text: "What that work taught me, in short." },
  { label: "Why it fits Linq", text: "How it helps Linq's customers or team." },
  { label: "What I'd test at Linq", text: "A small, real piece of work I would run." },
  { label: "How I'd measure it", text: "What I would look at to know if it worked." },
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
          <Eyebrow>{experiment.theme}</Eyebrow>
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
              <BlockLabel>Why this fits Linq</BlockLabel>
              <Prose>
                <p>{experiment.why}</p>
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
              <ul className="list-disc space-y-2 pl-5 text-[17px] leading-[1.7] text-ink-soft marker:text-brand-deep">
                {experiment.pilot.map((step) => (
                  <li key={step.slice(0, 32)}>{step}</li>
                ))}
              </ul>
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

        <aside className="hidden lg:block" aria-label={`Note on: ${experiment.title}`}>
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
        {/* Section */}
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
              Work I would do at Linq, and the real jobs and campaigns it comes from.
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

          <nav aria-label="The experiments" className="relative mt-14 border-t border-ink/15">
            <ol>
              {LINQ_EXPERIMENTS.map((experiment) => (
                <li key={experiment.id} className="border-b border-ink/10">
                  <a
                    href={`#${experiment.id}`}
                    className="group flex items-baseline gap-4 py-4 underline-offset-4 sm:gap-6"
                  >
                    <span className="font-serif text-xl text-ink transition-colors group-hover:text-brand-deep group-hover:underline sm:text-2xl">
                      {experiment.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </section>

        {/* Section */}
        <section aria-labelledby="approach-title" className="border-t border-ink/10 py-16 sm:py-20">
          <div className="max-w-[68ch]">
            <Eyebrow>The way I think</Eyebrow>
            <h2 id="approach-title" className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-[44px]">
              From experience to experiments.
            </h2>
            <div className="mt-8">
              <Prose>
                <p>
                  Each idea below follows the same path. It starts with real work I have done. It
                  says plainly what my part was, and what I learned. Then it turns into work I
                  would do at Linq, and how I would do it.
                </p>
                <p>
                  This is not a list of ideas for the sake of ideas. Linq describes this job in
                  plain terms: find the businesses and developers who should use Linq, help turn
                  them into users, and keep them. The day to day work is events, content, landing
                  pages, campaigns and research. Each idea below is a piece of that future work,
                  tied to something I have already done.
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

        {/* The experiments */}
        {LINQ_EXPERIMENTS.map((experiment) => (
          <ExperimentSection key={experiment.id} experiment={experiment} />
        ))}

        {/* Section */}
        <section aria-labelledby="system-title" className="border-t border-ink/10 py-16 sm:py-20">
          <div className="max-w-[68ch]">
            <Eyebrow>How the ideas connect</Eyebrow>
            <h2 id="system-title" className="mt-4 font-serif text-4xl leading-[1.12] text-ink sm:text-[44px]">
              Ideas that feed each other.
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
                  The ideas are one loop, not separate projects. Research finds the real problems.
                  Demos make Linq easy to get. Events get people building, not just watching.
                  Campaigns turn that interest into people getting started. And what we learn
                  makes the next round better.
                </p>
                <p>
                  It is a way of working, not a fixed plan. The team and the customers would shape
                  it as we go.
                </p>
              </Prose>
            </div>
            <blockquote className="mt-10 border-l-2 border-brand pl-6 font-serif text-[22px] italic leading-[1.5] text-ink">
              I would not call these the right ideas before talking with Linq&apos;s team and
              customers. They are where I would start.
            </blockquote>
          </div>
        </section>

        {/* Section */}
        <section aria-labelledby="why-title" className="border-t border-ink/10 py-16 sm:py-20">
          <div className="max-w-[68ch]">
            <Eyebrow>Why Linq</Eyebrow>
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

        {/* Section */}
        <section aria-labelledby="about-title" className="border-t border-ink/10 py-16 sm:py-20">
          <div className="max-w-[68ch]">
            <Eyebrow>About me</Eyebrow>
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
