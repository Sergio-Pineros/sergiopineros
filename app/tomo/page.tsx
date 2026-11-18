import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { assets, principles } from "@/components/tomo/studio/brand";
import Opening from "@/components/tomo/studio/Opening";
import IdentityLab from "@/components/tomo/studio/IdentityLab";
import InterfaceLab from "@/components/tomo/studio/InterfaceLab";
import MotionLab from "@/components/tomo/studio/MotionLab";
import { Arrow, TomoLogo } from "@/components/tomo/studio/StudioPrimitives";
import s from "@/components/tomo/studio/studio.module.css";

export const metadata: Metadata = {
  title: "Tomo — Your world, in progress | Sergio Piñeros",
  description: "An independent brand and product design exploration. An interactive identity lab, generative interface prototypes and a textile-led visual system.",
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
            <a href="#identity">Playground</a>
            <a href="#interfaces">Interfaces</a>
            <a href="#motion">Motion</a>
            <a href="#applications">In the wild</a>
          </nav>
          <a href="#about" className={s.navCredit}>By Sergio Piñeros <Arrow diagonal /></a>
        </div>
      </header>
      <main className={s.container}>
        <Opening />
        <section id="principles" className={s.system} aria-labelledby="system-title">
          <div>
            <p className={s.eyebrow}>The design hypothesis</p>
            <h2 id="system-title">The interface is the identity.</h2>
            <p>Tomo lives in text messages. Its launch paired a wide-open sky with a voice that felt close. What if the things people do with Tomo could shape how the brand looks?</p>
          </div>
          <ol className={s.principles}>
            {principles.map((principle) => <li key={principle.title}><h3>{principle.title}</h3><p>{principle.summary}</p></li>)}
          </ol>
        </section>

        <IdentityLab />
        <InterfaceLab />
        <MotionLab />

        <section id="applications" className={s.section} aria-labelledby="applications-title">
          <div className={s.sectionIntro}>
            <div><p className={s.eyebrow}>Brand applications</p><h2 id="applications-title">In the wild.</h2></div>
            <p>Four ways the same system can show up, from a screen-printed poster to a personal note.</p>
          </div>
          <div className={s.gallery}>
            <figure className={s.galleryPoster}>
              <div className={s.posterBackdrop}>
                <div className={s.poster} data-material="print"><TomoLogo /><strong>little<br />wins<br />count<span>.</span></strong><span className={s.mono}>Your world, in progress.</span></div>
              </div>
              <figcaption><strong>Little wins count</strong><span>Screen-print poster</span></figcaption>
            </figure>
            <figure className={s.galleryTextile}>
              <div className={s.galleryImage}><Image src={assets.label} alt="Chartreuse Tomo label stitched onto folded cobalt denim" fill sizes="(max-width: 700px) 100vw, 59vw" /></div>
              <figcaption><strong>Made of moments</strong><span>Woven garment label concept</span></figcaption>
            </figure>
            <figure className={s.galleryCampaign}>
              <div className={s.campaignBackdrop} data-material="paper">
                <div className={s.campaignTop}><TomoLogo variant="mono" /><span className={s.mono}>A note for later</span></div>
                <strong>some good<br />came of it<span>.</span></strong>
                <span className={s.mono}>From the things we keep</span>
              </div>
              <figcaption><strong>A note for later</strong><span>Editorial social campaign</span></figcaption>
            </figure>
            <figure className={s.galleryDigital}>
              <div className={s.digitalBackdrop}>
                <div className={s.digitalMock} aria-label="Example mobile layout for a running milestone">
                  <div><TomoLogo variant="mark" /><span className={s.mono}>Friday / 7:24 PM</span></div>
                  <p>i ran my first 5k!</p>
                  <div className={s.digitalStat}><span className={s.mono}>First 5K</span><strong>5.0 <small>km</small></strong><span>A good day to remember.</span></div>
                </div>
              </div>
              <figcaption><strong>From a text to a milestone</strong><span>Mobile interface concept</span></figcaption>
            </figure>
          </div>
        </section>

        <section className={s.about} id="about" aria-labelledby="about-title">
          <div className={s.aboutContent}>
            <p className={s.eyebrow}>An independent concept</p>
            <h2 id="about-title">An exploration by Sergio Piñeros.</h2>
            <p>I like building things that feel human. I’ve designed brands and built software for real businesses. This is my take on how Tomo’s visual world could grow from the things people already tell it.</p>
            <div className={s.aboutLinks}>
              <Link className={s.primaryButton} href="/">Portfolio <Arrow diagonal /></Link>
              <a className={s.secondaryButton} href="https://www.linkedin.com/in/sergio-pineros-c/">LinkedIn <Arrow diagonal /></a>
              <a className={s.textLink} href="mailto:s.dpineros@gmail.com">Get in touch</a>
            </div>
          </div>
          <aside className={s.sources} aria-label="Project notes and references">
            <h3>What informed the work</h3>
            <p>The launch’s landscape and typography informed the opening. Fae and Dachi informed the conversational tone. The Founding Product Designer brief prompted the three interface prototypes.</p>
            <ul>
              <li><a href="https://www.tomo.ai/blog/introducing-tomo">Tomo’s launch <Arrow diagonal /></a></li>
              <li><a href="https://www.tomo.ai/blog/tomo-acquires-fae">The Fae acquisition <Arrow diagonal /></a></li>
              <li><a href="https://www.tomo.ai/blog/dachi-1-0">Dachi and conversational tone <Arrow diagonal /></a></li>
              <li><a href="https://jobs.ashbyhq.com/tomo.ai/f77a861f-acdc-4ae4-b88e-bde4e33ebc12/">Founding Product Designer brief <Arrow diagonal /></a></li>
            </ul>
            <Link className={s.textLink} href="/tomo/comparison" prefetch={false}>Earlier Tomo site comparison <Arrow /></Link>
          </aside>
        </section>
      </main>
      <footer className={s.footer}><a href="#overview" aria-label="Back to top"><TomoLogo /></a><p>Independent design study · Sergio Piñeros</p><a href="https://www.tomo.ai/">Visit Tomo <Arrow diagonal /></a></footer>
    </div>
  );
}
