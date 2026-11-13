import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import ChatThread from "@/components/tomo/ChatThread";
import HeroDemo from "@/components/tomo/HeroDemo";
import ApplicationDialog, { AboutConceptButton } from "@/components/tomo/ApplicationDialog";
import { TOMO_LINKS, TOMO_MOMENTS, TOMO_STEPS } from "@/lib/tomo";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-tomo-display",
  display: "swap",
});

const DISPLAY = "[font-family:var(--font-tomo-display),Georgia,serif]";

export const metadata: Metadata = {
  title: "Tomo, reimagined: an independent design exploration by Sergio Piñeros",
  description:
    "A speculative redesign concept for Tomo, the personal AI that lives in your texts. An unofficial design exploration by Sergio Piñeros for the Product Designer role.",
  alternates: { canonical: "/tomo" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Tomo, reimagined: a design exploration by Sergio Piñeros",
    description: "Life happens. Text Tomo. An independent concept, not affiliated with Tomo.",
    type: "article",
    url: "https://sergiopineros.com/tomo",
    siteName: "Sergio Piñeros",
  },
};

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#8a6d1f]">{eyebrow}</p>
      <h2 className={`mt-4 text-4xl leading-[1.1] text-[#2b2118] sm:text-5xl ${DISPLAY} font-semibold`}>
        {title}
      </h2>
      {intro ? <p className="mt-5 text-[18px] leading-[1.7] text-[#2b2118]/70">{intro}</p> : null}
    </div>
  );
}

const DIFFERENCE = [
  {
    title: "No new inbox to keep up with",
    text: "Tomo meets you in your messages, the one place you already check. There is no separate app habit to build before the help starts being useful.",
  },
  {
    title: "It can start the conversation",
    text: "A check-in about the goal you set, a reminder before the thing you said mattered. Tomo is built to message you proactively, kindly, and at the moments you chose.",
  },
  {
    title: "The conversation continues",
    text: "Tomo is built to remember context from your conversations, so coming back feels like picking up a thread, not starting over. For exactly how Tomo handles your data, read Tomo's own privacy policy, linked in the footer.",
  },
] as const;

export default function TomoPage() {
  return (
    <div className={`${display.variable} min-h-screen bg-[#fff9ef] font-sans text-[#2b2118] antialiased`}>
      <a
        href="#say-anything"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-[#fffdf8] focus:px-4 focus:py-2 focus:outline focus:outline-2 focus:outline-[#2b2118]"
      >
        Skip to content
      </a>

      <p className="bg-[#2b2118] px-4 py-2.5 text-center text-[13px] font-medium leading-relaxed text-[#fff9ef]">
        Unofficial design exploration by Sergio Piñeros. Not affiliated with Tomo.
      </p>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <p className={`text-[28px] font-bold leading-none ${DISPLAY}`}>
          tomo<span className="text-[#e3a008]">.</span>
        </p>
        <nav aria-label="Concept sections" className="flex items-center gap-2 sm:gap-3">
          <a
            href="#moments"
            className="hidden rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors hover:bg-[#fdf3e0] sm:block"
          >
            Moments
          </a>
          <a
            href="#how-it-works"
            className="hidden rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors hover:bg-[#fdf3e0] sm:block"
          >
            How it works
          </a>
          <a
            href={TOMO_LINKS.site}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#ffc531] px-5 py-2.5 text-[15px] font-semibold transition-transform hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b2118]"
          >
            Meet the real Tomo
          </a>
        </nav>
      </header>

      <main>
        {/* 1. Hero: the first message */}
        <section aria-labelledby="tomo-title" className="mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-8 sm:pt-14">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
            <div className="max-w-xl">
              <h1
                id="tomo-title"
                className={`text-[52px] leading-[1.02] sm:text-7xl ${DISPLAY} font-semibold`}
              >
                Life happens.
                <br />
                Text <span className="italic text-[#b97f06]">Tomo.</span>
              </h1>
              <p className="mt-6 text-[20px] leading-[1.65] text-[#2b2118]/70">
                Your personal AI for the big moments, the little questions, and everything
                you&apos;re figuring out along the way.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={TOMO_LINKS.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#2b2118] px-7 py-3.5 text-[16px] font-semibold text-[#fff9ef] transition-transform hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b2118] focus-visible:ring-offset-2"
                >
                  Start with a text
                </a>
                <a
                  href="#how-it-works"
                  className="rounded-full px-6 py-3.5 text-[16px] font-semibold text-[#2b2118] ring-1 ring-[#2b2118]/25 transition-colors hover:bg-[#fdf3e0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b2118]"
                >
                  See how it works
                </a>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-[#2b2118]/55">
                Concept links: the buttons on this page take you to the real{" "}
                <a href={TOMO_LINKS.site} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  tomo.ai
                </a>
                . This page does not send texts.
              </p>
            </div>
            <HeroDemo />
          </div>
        </section>

        {/* 2. The idea: say anything */}
        <section id="say-anything" aria-labelledby="say-title" className="scroll-mt-16 border-t border-[#2b2118]/8 bg-[#fffdf8]">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="The idea"
                title="Say anything."
                intro="Tomo meets you where you already are: in your messages. No dashboard to learn, no blank box staring back at you. If you can text it, you can ask it, plan it, celebrate it, or get it off your chest."
              />
              <p className="mt-5 max-w-2xl text-[18px] leading-[1.7] text-[#2b2118]/70">
                That is the whole idea. A personal AI with the warmth of a good friend and the
                follow-through of a great assistant, one text away.
              </p>
            </div>
            <div className="mx-auto w-full max-w-md">
              <ChatThread
                label="Illustrative example: a person texts Tomo about a presentation tomorrow and gets a calm, useful plan back."
                messages={[
                  { from: "user", text: "big presentation tomorrow and my brain won't stop rehearsing it" },
                  {
                    from: "tomo",
                    text: "Then let's give your brain the night off. Your slides are done, your opener is strong, and you set a reminder for 8am to do one last read-through. Anything else looping, or can we call it a night?",
                  },
                  { from: "user", text: "that's literally all i needed to hear" },
                ]}
              />
              <p className="mt-3 text-[13px] text-[#2b2118]/50">Illustrative example, written for this concept.</p>
            </div>
          </div>
        </section>

        {/* 3. Moments */}
        <section id="moments" aria-labelledby="moments-title" className="mx-auto w-full max-w-6xl scroll-mt-16 px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="The moments that make it personal"
            title="Small texts. Real life."
            intro="Four moments, inspired by what Tomo is already for. Every conversation below is an illustrative example written for this concept, not a real user's chat."
          />
          <div className="mt-16 space-y-20 sm:space-y-24">
            {TOMO_MOMENTS.map((moment, i) => (
              <article
                key={moment.id}
                aria-labelledby={`${moment.id}-title`}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <p className="text-[13px] font-semibold tracking-[0.2em]" style={{ color: "#8a6d1f" }}>
                    {moment.index}
                  </p>
                  <h3 id={`${moment.id}-title`} className={`mt-3 text-3xl leading-tight sm:text-4xl ${DISPLAY} font-semibold`}>
                    {moment.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[17px] leading-[1.7] text-[#2b2118]/70">{moment.intro}</p>
                </div>
                <div className="mx-auto w-full max-w-md">
                  <ChatThread
                    label={`Illustrative example for: ${moment.title}`}
                    accent={moment.accent}
                    messages={moment.messages}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. What makes Tomo different */}
        <section aria-labelledby="different-title" className="border-t border-[#2b2118]/8 bg-[#2b2118] text-[#fff9ef]">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#ffc531]">What makes Tomo different</p>
            <h2 id="different-title" className={`mt-4 max-w-2xl text-4xl leading-[1.1] sm:text-5xl ${DISPLAY} font-semibold`}>
              Not another app to keep up with.
            </h2>
            <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
              {DIFFERENCE.map((item, i) => (
                <div key={item.title} className="border-t-2 pt-6" style={{ borderColor: ["#ffc531", "#a8c3a0", "#ffb59e"][i] }}>
                  <h3 className={`text-[24px] leading-snug ${DISPLAY} font-semibold`}>{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.7] text-[#fff9ef]/75">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. How it works */}
        <section id="how-it-works" aria-labelledby="how-title" className="mx-auto w-full max-w-6xl scroll-mt-16 px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading eyebrow="How it works" title="Three steps. No manual." />
          <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {TOMO_STEPS.map((step) => (
              <li key={step.number} className="border-t border-[#2b2118]/12 pt-6">
                <p className={`text-[44px] leading-none text-[#e3a008] ${DISPLAY} font-semibold`}>{step.number}</p>
                <h3 className={`mt-4 text-[24px] leading-snug ${DISPLAY} font-semibold`}>{step.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.7] text-[#2b2118]/70">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-14">
            <a
              href={TOMO_LINKS.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[#ffc531] px-7 py-3.5 text-[16px] font-semibold text-[#2b2118] transition-transform hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b2118] focus-visible:ring-offset-2"
            >
              Start with a text
            </a>
          </p>
        </section>

        {/* 6. Final CTA */}
        <section id="final-cta" aria-labelledby="final-title" className="border-t border-[#2b2118]/8 bg-[#fdf3e0]">
          <div className="mx-auto w-full max-w-6xl px-5 py-24 text-center sm:px-8 sm:py-28">
            <p aria-hidden="true" className={`text-[40px] leading-none ${DISPLAY}`}>
              💬
            </p>
            <h2 id="final-title" className={`mx-auto mt-6 max-w-2xl text-5xl leading-[1.05] sm:text-6xl ${DISPLAY} font-semibold`}>
              Start with one text.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[19px] leading-[1.65] text-[#2b2118]/70">
              A little support can go a long way.
            </p>
            <p className="mt-9">
              <a
                href={TOMO_LINKS.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-[#2b2118] px-8 py-4 text-[17px] font-semibold text-[#fff9ef] transition-transform hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b2118] focus-visible:ring-offset-2"
              >
                Meet Tomo
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-[#2b2118] text-[#fff9ef]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={`text-[26px] font-bold leading-none ${DISPLAY}`}>
              tomo<span className="text-[#ffc531]">.</span>
            </p>
            <p className="mt-4 max-w-md text-[14px] leading-[1.7] text-[#fff9ef]/65">
              Independent design exploration by Sergio Piñeros. Not affiliated with Tomo. Tomo is a
              product of Mapo Labs, Inc.; this concept is a personal application project and does
              not represent the real product.
            </p>
          </div>
          <nav aria-label="Official Tomo links" className="flex flex-wrap items-center gap-2">
            <a href={TOMO_LINKS.site} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2.5 text-[14px] font-medium ring-1 ring-[#fff9ef]/25 transition-colors hover:bg-[#fff9ef]/10">
              Official site
            </a>
            <a href={TOMO_LINKS.privacy} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2.5 text-[14px] font-medium ring-1 ring-[#fff9ef]/25 transition-colors hover:bg-[#fff9ef]/10">
              Privacy
            </a>
            <a href={TOMO_LINKS.careers} target="_blank" rel="noopener noreferrer" className="rounded-full px-4 py-2.5 text-[14px] font-medium ring-1 ring-[#fff9ef]/25 transition-colors hover:bg-[#fff9ef]/10">
              Careers
            </a>
            <AboutConceptButton className="rounded-full bg-[#ffc531] px-4 py-2.5 text-[14px] font-semibold text-[#2b2118] transition-transform hover:scale-[1.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc531]" />
          </nav>
        </div>
      </footer>

      <ApplicationDialog />
    </div>
  );
}
