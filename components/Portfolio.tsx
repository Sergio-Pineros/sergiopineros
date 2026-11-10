"use client";
import { useCallback, useState } from "react";
import Image from "next/image";
import ScreenLoader from "@/components/ScreenLoader";
import { HERO_PANELS, HERO_TABS, type HeroTabId } from "@/lib/projects";

const chapters = [
  { id:"writing", name:"Writing", desc:"I write about things we name, believe, use, and quietly make sacred. Nature, Rebranded is one continuing experiment.", href:"https://sergwrites.substack.com", action:"Read my writing" },
  { id:"listening", name:"Listening", desc:"Small experiments with music, instruments, and the attention that sound asks of us.", href:null, action:"In progress" },
  { id:"objects", name:"Objects", desc:"What Are We Making Sacred? is becoming a bilingual deck of prompts for returning from a blockage to a question.", href:"/shop", action:"See the first object" },
] as const;

export default function Portfolio() {
  const [activeTab,setActiveTab]=useState<HeroTabId>("who");
  const [loaded,setLoaded]=useState(false);
  const onLoaded=useCallback(()=>setLoaded(true),[]);
  return <>
    <ScreenLoader onComplete={onLoaded} />
    <div id="top" className={loaded?"site-visible":"site-hidden"}>
      <header className="site-nav">
        <div className="site-nav__bar">
          <a href="#hero" className="nav-logo" aria-label="Sergio Piñeros home">
            <Image src="/horizontal.svg" alt="" width={180} height={44} className="nav-logo__mark" priority />
          </a>
          <a className="artist-nav-link" href="https://sergwrites.substack.com">Read the writing ↗</a>
        </div>
      </header>
      <main>
        <section id="hero" className="hero">
          <div className="hero-tabs-wrap">
            <div className="hero-tabs" role="tablist" aria-label="About Sergio">
              {HERO_TABS.map(tab=><button key={tab.id} id={`hero-tab-${tab.id}`} type="button"
                role="tab" aria-selected={activeTab===tab.id} aria-controls="hero-answer"
                className={`hero-tab ${activeTab===tab.id?"hero-tab--active":""}`}
                onClick={()=>setActiveTab(tab.id)}>{tab.label}</button>)}
            </div>
          </div>
          <div id="hero-answer" className="hero-statement" data-tab={activeTab} role="tabpanel" aria-labelledby={`hero-tab-${activeTab}`}>
            <h1 className="hero-headline" key={activeTab}>{HERO_PANELS[activeTab].headline}</h1>
            <span className="hero-script" aria-hidden="true">{HERO_PANELS[activeTab].script}</span>
          </div>
          <a href="#writing" className="artist-scroll-link">What I've been making ↓</a>
        </section>
        <section className="artist-body" aria-label="A personal note">
          <div className="artist-eyebrow">A note on the work</div>
          <p className="artist-intro-title">I keep coming back to the same question: <em>what are we making sacred?</em></p>
          <p className="artist-intro-copy">A word can change how we see something. A song can make us notice what was there all along.
            I write, make music, and experiment with technology because I want to understand what happens to our attention,
            our beliefs, and the stories we live inside.</p>
        </section>
        <section className="artist-chapters" aria-label="Writing, listening and objects">
          {chapters.map((item,i)=><article key={item.id} id={item.id} className="artist-chapter">
            <div className="artist-num">0{i+1} / 03</div>
            <div><h2>{item.name}</h2><p>{item.desc}</p></div>
            {item.href?<a href={item.href}>{item.action} ↗</a>:<span>{item.action}</span>}
          </article>)}
        </section>
        <section className="artist-close"><p>If something here stays with you, I'd like to hear what it made you notice.</p>
          <a href="https://www.instagram.com/serg.writes/">Find me at @serg.writes ↗</a></section>
      </main>
      <footer id="contact" className="footer">
        <div className="footer__logo-wrap"><div className="footer__logotype" role="img" aria-label="Sergio Piñeros" /></div>
        <nav className="footer__actions" aria-label="Elsewhere">
          <a href="https://sergwrites.substack.com" className="footer__pill">Substack ↗</a>
          <a href="https://www.instagram.com/serg.writes/" className="footer__pill">Instagram ↗</a>
          <a href="/shop" className="footer__pill">Objects ↗</a>
          <a href="#hero" className="footer__pill">Back to top ↑</a>
        </nav>
      </footer>
    </div>
  </>;
}
