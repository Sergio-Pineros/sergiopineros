import type { Metadata } from "next";
import Link from "next/link";
import { biomes, principles, type BiomeName } from "@/components/tomo/studio/brand";
import Opening from "@/components/tomo/studio/Opening";
import IdentityLab from "@/components/tomo/studio/IdentityLab";
import InterfaceLab from "@/components/tomo/studio/InterfaceLab";
import MedalLab from "@/components/tomo/studio/MedalLab";
import MotionLab from "@/components/tomo/studio/MotionLab";
import { BiomeArtwork, Sticker, TomoLogo } from "@/components/tomo/studio/StudioPrimitives";
import s from "@/components/tomo/studio/studio.module.css";

export const metadata: Metadata = {
  title: "Tomo — Connected Experience Study | Sergio Piñeros",
  description: "An independent product and brand exploration: from iMessage to personal interfaces and back, with an interactive connected journey.",
  alternates: { canonical: "/tomo" },
  robots: { index: false, follow: false },
};

export default function TomoPage() {
  return (
    <div className={s.studio} lang="en">
      <a href="#overview" className={s.skipLink}>Skip to content</a>
      <header className={s.header}>
        <div className={s.navInner}>
          <a href="#overview" aria-label="Tomo study home" className={s.brandHome}><TomoLogo /><span>DESIGN STUDY</span></a>
          <nav className={s.nav} aria-label="Study sections">
            <a href="#interfaces">Product vision</a>
            <a href="#medals">Medals</a>
            <a href="#identity">Playground</a>
            <a href="#motion">Motion</a>
            <a href="#applications">Mini worlds</a>
          </nav>
          <a href="#about" className={s.navCredit}>By Sergio Piñeros</a>
        </div>
      </header>
      <main>
        <Opening />
        <div className={s.container}>
          <section id="principles" className={s.system} aria-labelledby="system-title">
            <div>
              <p className={s.eyebrow}>The design principle</p>
              <h2 id="system-title">What stays. What changes.</h2>
              <p>The conversation is already the home. Our design question is how personal interfaces can deepen it without creating a disconnected second experience.</p>
            </div>
            <ol className={s.principles}>
              {principles.map((principle) => <li key={principle.title}><h3>{principle.title}</h3><p>{principle.summary}</p></li>)}
            </ol>
          </section>

          <InterfaceLab />
          <MedalLab />
          <IdentityLab />
          <MotionLab />

          <section id="applications" className={s.section} aria-labelledby="applications-title">
            <div className={s.sectionIntro}>
              <div><p className={s.eyebrow}>The visual system</p><h2 id="applications-title">Little worlds.</h2></div>
              <p>One visual language, four moods. Each biome gives the same interface a different place to land.</p>
            </div>
            <div className={s.gallery}>
              {(Object.keys(biomes) as BiomeName[]).map((name) => {
                const biome = biomes[name];
                return (
                  <figure key={name} data-biome={name}>
                    <div className={s.biomeTile}>
                      <p className={s.biomeQuote}>{biome.message}</p>
                      <BiomeArtwork name={name} className={s.galleryBiome} />
                      <Sticker name={biome.sticker} className={s.gallerySticker} />
                    </div>
                    <figcaption><strong>{biome.name}</strong><span>{biome.caption}</span></figcaption>
                  </figure>
                );
              })}
            </div>
          </section>

          <section className={s.about} id="about" aria-labelledby="about-title">
            <div className={s.aboutContent}>
              <p className={s.eyebrow}>An independent concept</p>
              <h2 id="about-title">An exploration by Sergio Piñeros.</h2>
              <p>I like building things that feel human. I’ve designed brands and built software for real businesses. This is my take on how Tomo’s visual world could grow from the things people already tell it.</p>
              <div className={s.aboutLinks}>
                <Link className={s.primaryButton} href="/">Portfolio</Link>
                <a className={s.secondaryButton} href="https://www.linkedin.com/in/sergio-pineros-c/">LinkedIn</a>
                <a className={s.textLink} href="mailto:s.dpineros@gmail.com">Get in touch</a>
              </div>
            </div>
            <aside className={s.sources} aria-label="Project notes and references">
              <h3>What informed the work</h3>
              <p>Tomo’s sky and everyday texts inspired the visual direction and the tone. The brand uses its official mascot and wordmark. The little worlds and interface prototypes are part of this independent study.</p>
              <ul>
                <li><a href="https://www.tomo.ai/blog/introducing-tomo">Tomo’s launch</a></li>
                <li><a href="https://www.tomo.ai/blog/tomo-acquires-fae">The Fae acquisition</a></li>
                <li><a href="https://www.tomo.ai/blog/dachi-1-0">Dachi and conversational tone</a></li>
                <li><a href="https://jobs.ashbyhq.com/tomo.ai/f77a861f-acdc-4ae4-b88e-bde4e33ebc12/">Founding Product Designer brief</a></li>
              </ul>
              <Link className={s.textLink} href="/tomo/comparison" prefetch={false}>Earlier Tomo site comparison</Link>
            </aside>
          </section>
        </div>
      </main>
      <footer className={s.footer}><a href="#overview" aria-label="Back to top"><TomoLogo /></a><p>Independent design study · Sergio Piñeros</p><a href="https://www.tomo.ai/">Visit Tomo</a></footer>
    </div>
  );
}
