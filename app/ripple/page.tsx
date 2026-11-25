import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ripple | Sergio Piñeros",
  description: "My application for Product Marketing at Ripple Treasury.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/ripple" },
};

const audiences = [
  { name: "CFO", question: "Can we fund our next move?", headline: "Plan your next capital decision with confidence.", body: "Bring cash positions, forecasts and liquidity together to understand funding needs and make more informed decisions.", measure: "I would validate the message with cash visibility, forecast accuracy and time to decision." },
  { name: "Treasurer", question: "Where are our liquidity gaps?", headline: "See where your cash is needed next.", body: "Connect cash data across accounts and entities, assess liquidity needs and monitor currency exposure.", measure: "I would validate the message with account coverage, forecast variance and time spent analyzing exposures." },
  { name: "Analyst", question: "What needs my attention today?", headline: "Find the exceptions that deserve your attention.", body: "Use AI-powered forecasting to compare expectations with actual cash flows and investigate unexpected variances.", measure: "I would validate the message with analysis time, exception resolution and practitioner feedback." },
];

function IntroLoader() {
  return <div className="rp-intro" aria-hidden="true">
    <div className="rp-intro-pixels">{Array.from({length:160},(_,i)=><span key={i} style={{animationDelay:(760+((i*73)%340))+"ms"}}/>)}</div>
    <div className="rp-intro-logos">
      <Image src="/icon.svg" alt="" width={68} height={68} priority unoptimized/>
      <div className="rp-intro-divider"/>
      <svg viewBox="0 0 24 24" width="66" height="66" fill="#008CFF" aria-hidden="true"><path d="M20.55 14.65c-.846-.486-1.805-.632-2.752-.666-.79-.023-1.974-.541-1.974-1.985 0-1.072.868-1.94 1.985-1.985.947-.034 1.906-.18 2.752-.666A5.018 5.018 0 0022.4 2.502 5.04 5.04 0 0015.53.674a4.993 4.993 0 00-2.504 4.343c0 .97.35 1.861.79 2.696.372.699.553 1.996-.71 2.73-.948.54-2.132.202-2.719-.745-.496-.801-1.094-1.545-1.94-2.03C6.045 6.28 2.977 7.104 1.6 9.495A5.018 5.018 0 003.44 16.34a5.025 5.025 0 005.008 0c.846-.485 1.444-1.23 1.94-2.03.406-.654 1.433-1.489 2.718-.744.948.541 1.241 1.737.711 2.73-.44.823-.79 1.725-.79 2.695A5.011 5.011 0 0018.034 24a5.011 5.011 0 005.008-5.008 4.982 4.982 0 00-2.492-4.343z"/></svg>
    </div>
  </div>;
}

function Core() {
  return <div className="rp-core">
    <input className="rp-control" id="rp-explode" type="checkbox" aria-label="Explore the three layers of my approach"/>
    <label htmlFor="rp-explode" className="rp-core-art" aria-label="Open or close the interactive layers">
      <svg viewBox="0 0 600 470" aria-hidden="true">
        <defs>
          <linearGradient id="rp-top" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffffff"/><stop offset="1" stopColor="#c2e1fa"/></linearGradient>
          <linearGradient id="rp-left" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c9e5fa"/><stop offset="1" stopColor="#77b9f1"/></linearGradient>
          <linearGradient id="rp-right" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9dcdf4"/><stop offset="1" stopColor="#4285bf"/></linearGradient>
          <linearGradient id="rp-blue-top" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8dcaff"/><stop offset=".54" stopColor="#008cff"/><stop offset="1" stopColor="#0056b0"/></linearGradient>
          <linearGradient id="rp-blue-left" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#008cff"/><stop offset="1" stopColor="#0053a3"/></linearGradient>
          <linearGradient id="rp-blue-right" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#006bc8"/><stop offset="1" stopColor="#003c83"/></linearGradient>
          <filter id="rp-shadow"><feGaussianBlur stdDeviation="17"/></filter>
        </defs>
        <path d="M300 321 478 395 300 463 122 395Z" fill="#1b568e" opacity=".15" filter="url(#rp-shadow)"/>
        <g className="rp-slab rp-bottom">
          <path d="M108 286 300 366 492 286 492 316 300 397 108 316Z" fill="url(#rp-left)"/>
          <path d="M300 366 492 286 492 316 300 397Z" fill="url(#rp-right)"/>
          <path d="M108 286 300 206 492 286 300 366Z" fill="url(#rp-top)" stroke="#fff" strokeWidth="2"/>
          <path d="M138 286 300 218 462 286 300 354Z" fill="none" stroke="#9ac8ed" strokeWidth="1.3"/>
          <path d="M142 310 205 336M395 336 458 310" stroke="#e5f5ff" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <g className="rp-slab rp-middle">
          <path d="M122 249 300 323 478 249 478 281 300 355 122 281Z" fill="url(#rp-blue-left)"/>
          <path d="M300 323 478 249 478 281 300 355Z" fill="url(#rp-blue-right)"/>
          <path d="M122 249 300 175 478 249 300 323Z" fill="url(#rp-blue-top)" stroke="#8fcfff" strokeWidth="1.6"/>
          <path d="M147 249 300 185 453 249 300 313Z" fill="none" stroke="#c2e7ff" strokeOpacity=".65"/>
          <path d="M150 272 208 296M392 296 450 272" stroke="#b8e3ff" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <g className="rp-slab rp-upper">
          <path d="M142 212 300 278 458 212 458 241 300 307 142 241Z" fill="url(#rp-left)"/>
          <path d="M300 278 458 212 458 241 300 307Z" fill="url(#rp-right)"/>
          <path d="M142 212 300 146 458 212 300 278Z" fill="url(#rp-top)" stroke="#fff" strokeWidth="2"/>
          <path d="M167 212 300 156 433 212 300 268Z" fill="none" stroke="#9ac8ed"/>
          <g transform="translate(300 212) matrix(.9 .38 -.9 .38 0 0)" fill="none" stroke="#008cff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M-36 18V-18H0V18H36V-18"/><path d="M-18-18V-35H18V-18"/>
          </g>
        </g>
      </svg>
      <span className="rp-art-button"><span className="rp-open-label">Explore the layers</span><span className="rp-close-label">Close the layers</span><span className="rp-plus" aria-hidden="true"/></span>
    </label>
    <div className="rp-layer-details">
      <div><strong>Understand</strong><p>Learn the technology.</p></div>
      <div><strong>Connect</strong><p>Find the customer need.</p></div>
      <div><strong>Communicate</strong><p>Make the value clear.</p></div>
    </div>
  </div>;
}

export default function Page() {
  return <main className="rp-page">
    <style>{css}</style>
    <IntroLoader/>
    <header className="rp-header"><div className="rp-wrap rp-nav">
      <a className="rp-brand" href="https://www.sergiopineros.com">Sergio Piñeros</a>
      <nav aria-label="Page navigation"><a href="#story">About me</a><a href="#concept">My approach</a><a href="#work">My work</a></nav>
    </div></header>
    <section className="rp-hero rp-wrap">
      <div className="rp-hero-copy">
        <h1>I’d love to help shape the future of <span>finance.</span></h1>
        <p>Hey Ripple! I’m Sergio, a marketer and product builder who has always been fascinated by crypto. I’d love to bring that curiosity and everything I’ve learned about building and marketing products to your team.</p>
      </div>
      <Core/>
    </section>
    <section id="story" className="rp-wrap rp-section rp-story">
      <h2>It all started with cryptography.</h2>
      <div><p>In 2023, my curiosity about crypto led me to a cybersecurity bootcamp. I wanted to understand the technology behind digital trust and how it could change the way we move money.</p>
      <p>Around that time, my marketing agency started taking off. I built a team of four, helped businesses grow and eventually began building software for them.</p>
      <p>Working at Ripple would give me the opportunity to bring those experiences together, learn from people who understand finance deeply and help more businesses understand what this technology can do for them.</p></div>
    </section>
    <section className="rp-concept" id="concept"><div className="rp-wrap rp-section">
      <div className="rp-section-head"><h2>How I would tell the Ripple Treasury story.</h2><p>I put together a messaging concept around three audiences and the decisions they make every day. Choose a perspective to explore it.</p></div>
      <div className="rp-studio">
        {audiences.map((a,i)=><input key={a.name} className="rp-control" type="radio" name="rp-audience" id={"rp-a"+i} defaultChecked={i===0}/>)}
        <div className="rp-tabs" role="group" aria-label="Choose a treasury audience">{audiences.map((a,i)=><label htmlFor={"rp-a"+i} key={a.name}>{a.name}</label>)}</div>
        {audiences.map((a,i)=><article key={a.name} className={"rp-message rp-message-"+i}>
          <div className="rp-message-question"><h3>{a.question}</h3><div className="rp-bars" aria-hidden="true">{[39,57,44,74,65,88,78,100].map((h,j)=><span key={j} style={{height:h+"%"}}/>)}</div></div>
          <div className="rp-message-main"><h3>{a.headline}</h3><p>{a.body}</p><p className="rp-measure">{a.measure}</p></div>
        </article>)}
      </div>
      <div className="rp-launch"><h3>From messaging to market.</h3><div className="rp-three">
        <article><h4>Launch the story</h4><p>Work with product and treasury experts to build a clear narrative around cash visibility, forecasting and GSmart AI.</p></article>
        <article><h4>Educate the audience</h4><p>Create CFO webinars and practical guides that help treasury teams understand the product in their daily work.</p></article>
        <article><h4>Equip sales</h4><p>Develop audience-specific materials, discovery questions and validated competitive proof points.</p></article>
      </div></div>
    </div></section>
    <section className="rp-wrap rp-section" id="work">
      <div className="rp-section-head"><h2>Things I’ve actually built.</h2><p>I enjoy taking ideas all the way from understanding the customer to making something useful and getting it into their hands.</p></div>
      <div className="rp-work">
        <a href="https://sergioatelier.co/" target="_blank" rel="noreferrer" className="rp-work-card"><div className="rp-work-visual rp-v1"><strong>540K</strong><svg className="rp-eye" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-label="views" role="img"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg></div><h3>Sergio &amp; Co.</h3><p>Built a four-person marketing team. In September 2025, our first month of campaigning for La Estancia reached 540,000 TikTok views and contributed to $32,000 in additional revenue, a 46% increase.</p></a>
        <a href="https://savronmn.com/" target="_blank" rel="noreferrer" className="rp-work-card"><div className="rp-work-visual rp-v2"><div className="rp-mini-calendar" aria-hidden="true">{Array.from({length:12},(_,i)=><span key={i}/>)}</div></div><h3>SAVRON Business OS</h3><p>Built an operating system for a barbershop with booking, memberships, staff communications and an AI concierge.</p></a>
        <a href="https://nxtseat.co/" target="_blank" rel="noreferrer" className="rp-work-card"><div className="rp-work-visual rp-v3"><div className="rp-wave" aria-hidden="true">{[25,48,70,40,84,100,60,35,68,46,22].map((h,i)=><span key={i} style={{height:h+"%"}}/>)}</div></div><h3>NxtSeat</h3><p>Developed voice-first business software with scheduling, customer communication and payment workflows.</p></a>
      </div>
    </section>
    <footer className="rp-closing">
      <div className="rp-wrap rp-closing-inner">
        <div className="rp-closing-copy">
          <h2>Making financial innovation understood.</h2>
          <p>I want to help businesses understand, trust and adopt the technologies shaping the future of finance. Ripple sits at the intersection of the technology that sparked my curiosity and the marketing discipline I’ve built my career around.</p>
        </div>
        <div className="rp-closing-links">
          <strong>Sergio Piñeros</strong>
          <a className="rp-button" href="https://docs.google.com/document/d/1h6Um4CzJ9cYJ1doRC-plb7sOI7iW8EZp1ecdh84uT7w/edit?tab=t.vcf5ovf1hrii" target="_blank" rel="noreferrer">Résumé &amp; Cover Letter</a>
          <a className="rp-button rp-closing-secondary" href="/me">Portfolio</a>
        </div>
      </div>
    </footer>
  </main>;
}

const css = `
.rp-page{--rp-blue:#008CFF;--rp-ink:#141A1F;--rp-muted:#495663;--rp-line:#d8e1e9;background:#fff;color:var(--rp-ink);font-family:var(--font-dm-sans),Arial,sans-serif;font-size:18px;line-height:1.6;overflow:clip}
.rp-page *{box-sizing:border-box}.rp-page a{text-decoration:none}.rp-page h1,.rp-page h2,.rp-page h3,.rp-page h4,.rp-page p{margin:0}.rp-page h1,.rp-page h2,.rp-page h3,.rp-page h4{font-weight:500;letter-spacing:-.055em;line-height:1.05}.rp-page p{font-size:clamp(18px,1.5vw,21px);color:var(--rp-muted);line-height:1.6}.rp-page h1{font-size:clamp(52px,6.1vw,92px);max-width:12ch}.rp-page h2{font-size:clamp(38px,4.8vw,70px);max-width:17ch}.rp-page h3{font-size:clamp(27px,3.1vw,42px)}.rp-page h4{font-size:26px}.rp-page section[id]{scroll-margin-top:90px}.rp-wrap{width:min(1440px,calc(100% - 112px));margin-inline:auto}.rp-section{padding-block:clamp(74px,9vw,140px)}.rp-header{position:sticky;top:0;z-index:20;background:#ffffffed;backdrop-filter:blur(16px);border-bottom:1px solid #e5eaf0}.rp-nav{display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:84px}.rp-brand{font-size:23px;font-weight:700;letter-spacing:-.045em;white-space:nowrap}.rp-nav nav{display:flex;gap:30px;font-size:18px}.rp-nav nav a{transition:color .2s}.rp-nav nav a:hover{color:#006bc5}.rp-button{display:inline-flex;align-items:center;justify-content:center;padding:15px 26px;min-height:55px;border-radius:5px;background:var(--rp-blue);color:#071d35!important;font-size:18px;line-height:1.3;font-weight:700;transition:transform .25s,background .25s}.rp-button:hover{background:#5bb7ff;transform:translateY(-2px)}.rp-nav-button{min-height:46px;padding:10px 22px}.rp-page a:focus-visible,.rp-page label:focus-visible{outline:3px solid var(--rp-blue);outline-offset:4px}.rp-hero{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,5vw,80px);align-items:center;min-height:min(740px,calc(100svh - 84px));padding-block:52px 70px}.rp-hero-copy{animation:rp-in .65s ease both}.rp-hero h1 span{color:#0074d4}.rp-hero-copy p{margin-top:28px;max-width:540px}.rp-hero-copy .rp-button{margin-top:30px}
.rp-core{position:relative;min-width:0;isolation:isolate;display:flex;flex-direction:column;justify-content:center;background:radial-gradient(ellipse at 50% 40%,#fff 4%,#eaf5ff 60%,#e0effd 100%);border:1px solid #d5e7f7;border-radius:8px;overflow:hidden;animation:rp-in .8s .12s backwards}.rp-core:before{content:"";position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(#8dbde320 1px,transparent 1px),linear-gradient(90deg,#8dbde320 1px,transparent 1px);background-size:42px 42px;mask-image:radial-gradient(ellipse,#000,transparent 78%)}.rp-core-art{position:relative;display:flex;flex-direction:column;align-items:center;cursor:pointer;padding:8px 12px 24px;min-width:0}.rp-core-art svg{width:100%;display:block;max-width:600px;overflow:visible;filter:drop-shadow(0 7px 12px #235d8d15);transition:transform .6s cubic-bezier(.2,.8,.2,1)}.rp-slab{transition:transform .75s cubic-bezier(.2,.8,.2,1)}.rp-core-art:hover svg{transform:translateY(-4px)}.rp-core-art:hover .rp-upper{transform:translateY(-26px)}.rp-core-art:hover .rp-middle{transform:translateY(-7px)}#rp-explode:checked~.rp-core-art .rp-upper{transform:translateY(-105px)}#rp-explode:checked~.rp-core-art .rp-middle{transform:translateY(-32px)}#rp-explode:checked~.rp-core-art .rp-bottom{transform:translateY(21px)}.rp-art-button{display:inline-flex;gap:14px;align-items:center;justify-content:center;padding:13px 20px;background:#fff;border:1px solid #bed8ee;border-radius:5px;font-size:18px;font-weight:600;box-shadow:0 5px 20px #3774a312;z-index:1}.rp-plus{position:relative;width:16px;height:16px}.rp-plus:before,.rp-plus:after{content:"";position:absolute;top:7px;left:0;width:16px;height:2px;background:#006bc5;border-radius:2px;transition:transform .3s}.rp-plus:after{transform:rotate(90deg)}.rp-close-label{display:none}#rp-explode:checked~.rp-core-art .rp-open-label{display:none}#rp-explode:checked~.rp-core-art .rp-close-label{display:inline}#rp-explode:checked~.rp-core-art .rp-plus:after{transform:rotate(0)}.rp-layer-details{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;max-height:0;opacity:0;visibility:hidden;overflow:hidden;padding:0 20px;transition:max-height .5s,opacity .3s,visibility .3s,padding .5s}.rp-layer-details>div{padding:12px;border-top:1px solid #b8d4ed}.rp-layer-details strong{font-size:20px;font-weight:600;color:#005ca9}.rp-layer-details p{font-size:18px!important;margin-top:4px}.rp-control{position:absolute;width:1px;height:1px;opacity:0;overflow:hidden}#rp-explode:focus-visible~.rp-core-art .rp-art-button{outline:3px solid #006bc5;outline-offset:4px}#rp-explode:checked~.rp-layer-details{max-height:400px;opacity:1;visibility:visible;padding:0 20px 20px}
.rp-story{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,8vw,125px);border-top:1px solid var(--rp-line)}.rp-story>div{display:grid;gap:22px}.rp-story>div p:last-child{color:var(--rp-ink)}.rp-concept{background:#f0f7fe;border-block:1px solid #deebf6}.rp-section-head{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,7vw,100px);align-items:end;margin-bottom:44px}.rp-section-head p{max-width:580px}.rp-studio{position:relative;border:1px solid #c9dcec;background:#fff;border-radius:8px;overflow:hidden}.rp-tabs{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid #c9dcec}.rp-tabs label{display:flex;justify-content:center;align-items:center;text-align:center;font-size:19px;font-weight:600;min-height:64px;padding:14px 8px;cursor:pointer;background:#fff;transition:background .2s,color .2s}.rp-tabs label+label{border-left:1px solid #d7e3ed}.rp-tabs label:hover{background:#e5f3ff}#rp-a0:checked~.rp-tabs label:nth-child(1),#rp-a1:checked~.rp-tabs label:nth-child(2),#rp-a2:checked~.rp-tabs label:nth-child(3){background:#008cff;color:#071d35}#rp-a0:focus-visible~.rp-tabs label:nth-child(1),#rp-a1:focus-visible~.rp-tabs label:nth-child(2),#rp-a2:focus-visible~.rp-tabs label:nth-child(3){outline:3px solid #005ba8;outline-offset:-5px}.rp-message{display:none;grid-template-columns:1fr 1.2fr;min-height:340px}#rp-a0:checked~.rp-message-0,#rp-a1:checked~.rp-message-1,#rp-a2:checked~.rp-message-2{display:grid;animation:rp-in .35s ease both}.rp-message-question{padding:clamp(28px,4vw,54px);background:#141a1f;color:#fff;display:flex;flex-direction:column;justify-content:space-between;gap:32px}.rp-message-question h3{max-width:15ch}.rp-bars{display:flex;align-items:end;gap:9px;height:100px;max-width:320px}.rp-bars span{flex:1;background:linear-gradient(#77c5ff,#008cff);border-radius:3px 3px 0 0;transform-origin:bottom;animation:rp-bar .7s ease both}.rp-bars span:nth-child(even){opacity:.65}.rp-message-main{padding:clamp(28px,4vw,54px);display:flex;flex-direction:column;gap:21px;justify-content:center}.rp-message-main h3{max-width:19ch}.rp-message-main .rp-measure{border-top:1px solid var(--rp-line);padding-top:20px;color:#335b7c}.rp-launch{margin-top:64px}.rp-three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px;margin-top:26px}.rp-three article{border-top:2px solid var(--rp-blue);padding-top:22px}.rp-three p{margin-top:13px}
.rp-work{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.rp-work-card{display:flex;flex-direction:column;gap:16px;transition:transform .3s}.rp-work-card:hover{transform:translateY(-5px)}.rp-work-card h3{font-size:clamp(24px,2.5vw,34px)}.rp-work-visual{height:clamp(160px,19vw,250px);display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:6px;transition:background .3s}.rp-v1{background:#008cff;color:#141a1f}.rp-v1 strong{font-size:clamp(60px,7.3vw,104px);font-weight:500;letter-spacing:-.08em;line-height:1}.rp-v2{background:#e6f3ff}.rp-mini-calendar{width:55%;max-width:190px;display:grid;grid-template-columns:repeat(4,1fr);gap:5px;padding:14px;border:1px solid #add3f4;background:#fff;border-radius:8px;transform:rotate(-8deg);box-shadow:12px 16px 0 #a6d3f5;transition:transform .45s}.rp-mini-calendar span{aspect-ratio:1;border-radius:3px;background:#e3f2ff}.rp-mini-calendar span:nth-child(3n){background:#008cff}.rp-work-card:hover .rp-mini-calendar{transform:rotate(0)}.rp-v3{background:#141a1f}.rp-wave{width:65%;height:42%;display:flex;gap:6px;align-items:center}.rp-wave span{flex:1;background:#008cff;border-radius:2px;transition:transform .4s}.rp-work-card:hover .rp-wave span:nth-child(odd){transform:scaleY(.55)}.rp-work-card:hover .rp-wave span:nth-child(even){transform:scaleY(1.2)}.rp-footer{background:#141a1f;color:#fff}.rp-footer h2{max-width:21ch}.rp-footer p{color:#dce5ed;max-width:680px;margin-top:26px}.rp-footer-button{margin-top:28px}
@keyframes rp-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes rp-bar{from{transform:scaleY(.1)}to{transform:scaleY(1)}}
@media(max-width:1050px){.rp-wrap{width:calc(100% - 64px)}.rp-nav nav{gap:18px}.rp-hero{gap:24px;min-height:0;padding-block:64px}.rp-hero h1{font-size:clamp(48px,6vw,72px)}.rp-layer-details{grid-template-columns:1fr;gap:0}.rp-layer-details>div{display:flex;gap:12px;align-items:baseline}.rp-layer-details p{margin:0}.rp-three{gap:18px}.rp-work{gap:18px}}
@media(max-width:700px){.rp-wrap{width:calc(100% - 40px)}.rp-header{position:relative}.rp-nav{min-height:70px;gap:12px;flex-wrap:wrap;padding-block:12px}.rp-brand{font-size:22px}.rp-nav-button{font-size:18px;padding:10px 14px}.rp-nav nav{order:3;width:100%;justify-content:space-between;gap:10px;padding:6px 0;font-size:18px}.rp-hero{grid-template-columns:1fr;gap:30px;padding-block:44px 55px}.rp-hero h1{font-size:clamp(46px,10vw,68px);max-width:13ch}.rp-hero-copy p{margin-top:20px}.rp-hero-copy .rp-button{margin-top:22px}.rp-core-art{padding:0 10px 20px}.rp-core-art svg{max-height:325px}.rp-story,.rp-section-head,.rp-message,.rp-three,.rp-work{grid-template-columns:1fr}.rp-section-head{gap:20px;margin-bottom:30px}.rp-section{padding-block:62px}.rp-story{gap:25px}.rp-tabs label{font-size:18px;min-height:56px;padding:10px 4px}.rp-message{min-height:0}.rp-message-question{gap:24px;padding:25px}.rp-bars{height:65px}.rp-message-main{padding:25px;gap:18px}.rp-launch{margin-top:44px}.rp-three{gap:26px}.rp-work{gap:34px}.rp-work-visual{height:190px}.rp-page section[id]{scroll-margin-top:20px}.rp-layer-details>div{display:block}}
@media(prefers-reduced-motion:reduce){.rp-page *,.rp-page *::before,.rp-page *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
.rp-intro{position:fixed;inset:0;z-index:9999;pointer-events:auto;display:grid;place-items:center;animation:rp-intro-end 1.26s step-end forwards}
.rp-intro-pixels{position:absolute;inset:0;display:grid;grid-template-columns:repeat(16,minmax(0,1fr));grid-template-rows:repeat(10,minmax(0,1fr));gap:0}
.rp-intro-pixels span{background:#fff;animation:rp-pixel-away 140ms steps(2,end) forwards}
.rp-intro-logos{position:relative;display:flex;align-items:center;justify-content:center;gap:25px;animation:rp-logo-out 760ms step-end forwards}
.rp-intro-logos img{object-fit:contain;width:68px;height:68px}.rp-intro-divider{width:1px;height:47px;background:#dae4ed}.rp-eye{width:clamp(26px,4vw,44px);height:auto;flex-shrink:0}.rp-v1{gap:clamp(8px,1.5vw,18px)}
@keyframes rp-pixel-away{to{opacity:0}}@keyframes rp-logo-out{to{visibility:hidden}}@keyframes rp-intro-end{to{visibility:hidden;pointer-events:none}}
@media(max-width:700px){.rp-nav nav{order:initial}.rp-intro-logos{gap:20px}.rp-intro-logos img,.rp-intro-logos svg{width:56px;height:56px}}
@media(prefers-reduced-motion:reduce){.rp-intro{display:none!important}}

.rp-closing{background:#fff;border-top:1px solid var(--rp-line)}
.rp-closing-inner{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(250px,1fr);align-items:end;gap:clamp(36px,7vw,100px);padding-block:clamp(50px,7vw,96px)}
.rp-closing-copy h2{font-size:clamp(38px,4.2vw,60px);max-width:22ch}
.rp-closing-copy p{max-width:64ch;margin-top:20px}
.rp-closing-links{display:flex;flex-direction:column;align-items:flex-start;gap:12px}
.rp-closing-links strong{font-size:22px;font-weight:600;margin-bottom:6px}
.rp-closing-links .rp-button{min-width:240px;text-align:center}
.rp-closing-secondary{background:#fff!important;color:var(--rp-ink)!important;border:1px solid #b9c7d4!important}
.rp-closing-secondary:hover{background:#f1f7fc!important}
@media(max-width:700px){.rp-closing-inner{grid-template-columns:1fr;gap:32px}.rp-closing-links{align-items:stretch}.rp-closing-links .rp-button{min-width:0}}

`;
