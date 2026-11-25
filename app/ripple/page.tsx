import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ripple | Sergio Piñeros",
  description: "A personal application and product marketing concept for Ripple Treasury.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/ripple" },
  openGraph: { title: "Ripple | Sergio Piñeros", description: "A personal application and product marketing concept for Ripple Treasury.", url: "/ripple" },
};

const email = "mailto:s.dpineros@gmail.com?subject=Ripple%20%7C%20Sergio%20Pi%C3%B1eros";
const messages = [
  { name: "CFO", question: "How much flexibility do we have to fund the business?", title: "Make your next capital decision with greater confidence.", copy: "Bring cash positions, forecasts and liquidity into one connected treasury view, so finance leaders can assess funding needs and plan with more context.", proof: "Validate with forecast accuracy, cash visibility and time to decision." },
  { name: "Treasurer", question: "Where are our cash gaps and currency exposures?", title: "See liquidity needs and risk exposures as they develop.", copy: "Connect treasury data across accounts and entities, monitor forecast variances and evaluate funding scenarios with GSmart AI.", proof: "Validate with coverage, variance analysis time and risk policy adherence." },
  { name: "Treasury analyst", question: "Which exception should I investigate today?", title: "Spend more of your day resolving the exceptions that matter.", copy: "Use GSmart Forecast Insights to compare forecasts against actuals and identify unusual variances. Review proposed actions within your organization’s approval policies.", proof: "Validate with time spent on analysis, exception resolution and auditability." },
];

function NetworkArt() {
  return <div className="rp-art" aria-hidden="true">
    <svg viewBox="0 0 520 460" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rp-line" x1="70" y1="420" x2="460" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#36C4FF" stopOpacity=".2"/><stop offset=".52" stopColor="#63CFFF"/><stop offset="1" stopColor="#D9F4FF" stopOpacity=".9"/></linearGradient>
        <radialGradient id="rp-core"><stop stopColor="#97DEFF"/><stop offset=".35" stopColor="#208EF8"/><stop offset="1" stopColor="#07357F"/></radialGradient>
        <linearGradient id="rp-fill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#96DFFF" stopOpacity=".24"/><stop offset="1" stopColor="#1670E8" stopOpacity=".04"/></linearGradient>
      </defs>
      <g stroke="#80C9FF" strokeOpacity=".16">
        {Array.from({length: 9}, (_,i) => <ellipse key={i} cx="260" cy="230" rx={70+i*23} ry={40+i*15} transform="rotate(-28 260 230)"/>)}
      </g>
      <g className="rp-orbit" stroke="url(#rp-line)" strokeWidth="1.4">
        <ellipse cx="260" cy="230" rx="203" ry="116" transform="rotate(-28 260 230)"/>
        <ellipse cx="260" cy="230" rx="185" ry="86" transform="rotate(48 260 230)"/>
        <ellipse cx="260" cy="230" rx="142" ry="174" transform="rotate(19 260 230)"/>
        <path d="M87 311L260 230 405 104M115 133L260 230 437 291M247 61L260 230 288 397" strokeDasharray="4 7"/>
      </g>
      <circle cx="260" cy="230" r="63" fill="url(#rp-core)" opacity=".95"/>
      <circle cx="260" cy="230" r="79" stroke="#9BDEFF" strokeOpacity=".5"/>
      <circle cx="260" cy="230" r="98" stroke="#9BDEFF" strokeOpacity=".2"/>
      {[[87,311],[405,104],[115,133],[437,291],[247,61],[288,397]].map(([x,y],i)=><g key={i} className="rp-node" style={{animationDelay: (i*.6)+"s"}}><circle cx={x} cy={y} r="14" fill="url(#rp-fill)" stroke="#87D5FF"/><circle cx={x} cy={y} r="4" fill="#CEF1FF"/></g>)}
    </svg>
    <div className="rp-art-caption"><span className="rp-dot"/> Financial infrastructure · Trust · Connectivity</div>
  </div>;
}

export default function Page() {
  return (
    <main className="rp-page">
      <style>{css}</style>
      <header className="rp-header"><div className="rp-wrap rp-nav">
        <a className="rp-brand" href="https://www.sergiopineros.com">Sergio Piñeros<span> / Ripple application</span></a>
        <nav aria-label="Page navigation"><a href="#story">My story</a><a href="#concept">Marketing concept</a><a href="#work">Experience</a></nav>
        <a className="rp-button rp-small" href={email}>Get in touch</a>
      </div></header>
      <section className="rp-hero"><div className="rp-wrap rp-hero-grid">
        <div className="rp-hero-copy"><p className="rp-kicker rp-light">A personal application for Ripple Treasury</p>
          <h1>Making the future of finance easier to understand.</h1>
          <p className="rp-lead">I’m Sergio, a marketer and product builder with a longstanding interest in cryptography, digital assets and the technology changing how money moves. I’d love to help Ripple bring that future to more businesses.</p>
          <div className="rp-actions"><a className="rp-button" href="#concept">Explore my marketing concept</a><a className="rp-button rp-outline" href="#story">Get to know me</a></div>
        </div><NetworkArt/>
      </div></section>
      <section className="rp-section rp-wrap" id="story">
        <div className="rp-story"><div><p className="rp-kicker">Why Ripple</p><h2>My curiosity started with cryptography.</h2></div>
          <div className="rp-story-copy"><p>My interest in crypto and the mathematics behind digital trust led me to a cybersecurity bootcamp in 2023. Around the same time, the marketing agency I was building began to grow, and I found myself helping businesses reach customers, communicate their value and adopt technology.</p>
          <p>That experience turned into a four-person team and eventually into building software for real businesses. I’m excited by the opportunity to bring those skills back to an industry I have always wanted to understand more deeply.</p>
          <p>At Ripple, I would love to learn from financial practitioners and help translate the technology behind modern finance into practical, credible stories for the people who use it.</p></div></div>
        <div className="rp-timeline">
          <article><span>01 / Technical curiosity</span><h3>Cybersecurity</h3><p>Training in networking, Linux, Python and security fundamentals.</p></article>
          <article><span>02 / Commercial experience</span><h3>Marketing agency</h3><p>Client acquisition, messaging, campaign strategy and creative leadership.</p></article>
          <article><span>03 / Building products</span><h3>Software and AI</h3><p>Customer workflows, payments integrations and AI-enabled operations.</p></article>
        </div>
      </section>
      <section className="rp-concept" id="concept"><div className="rp-wrap rp-section">
        <p className="rp-kicker">Independent product marketing exercise</p><h2>One treasury platform.<br/>A message for every decision-maker.</h2>
        <p className="rp-intro">Ripple Treasury connects cash, forecasting, liquidity, risk and payments with GSmart AI. My proposed messaging starts with the decisions each audience needs to make, then connects them to the actual product capabilities.</p>
        <div className="rp-lab">
          <div className="rp-lab-header"><span>Ripple Treasury / Messaging studio</span><span>Sample launch messaging</span></div>
          <div className="rp-lab-body">
          {messages.map((m,i)=><input key={m.name} type="radio" name="rp-audience" id={"rp-a"+i} defaultChecked={i===0} className="rp-radio"/>)}
          <div className="rp-tabs" role="group" aria-label="Choose an audience">{messages.map((m,i)=><label key={m.name} htmlFor={"rp-a"+i}>{m.name}</label>)}</div>
          {messages.map((m,i)=><article key={m.name} className={"rp-message rp-message-"+i}>
            <div className="rp-question"><span>Customer question</span><p>{m.question}</p></div>
            <div className="rp-message-main"><span>Proposed value proposition</span><h3>{m.title}</h3><p>{m.copy}</p><div className="rp-validate"><span>Evidence to validate</span><p>{m.proof}</p></div></div>
          </article>)}
          </div>
        </div>
        <div className="rp-launch"><h3>How I would take it to market.</h3><div className="rp-launch-grid">
          <article><h4>Launch narrative</h4><p>Lead with cash visibility, timely decisions and governed AI. Confirm each claim with product and treasury experts.</p></article>
          <article><h4>Demand generation</h4><p>Develop a CFO-focused webinar and a practitioner guide around forecasting and liquidity. Test messages against qualified engagement.</p></article>
          <article><h4>Sales enablement</h4><p>Create a persona-based one-pager and discovery questions, with approved proof points and a competitive claims matrix.</p></article>
        </div></div>
        <p className="rp-note">Speculative campaign concept. Product research: <a href="https://treasury.ripple.com/" target="_blank" rel="noreferrer">Ripple Treasury</a> and <a href="https://treasury.ripple.com/solutions/ai/treasury-ai-agents" target="_blank" rel="noreferrer">GSmart AI agents</a>. Proposed claims and success metrics require practitioner validation.</p>
      </div></section>
      <section className="rp-wrap rp-section" id="work"><p className="rp-kicker">Selected experience</p><h2>What I bring to the team.</h2>
        <div className="rp-work-grid">
          <article className="rp-work-card"><div className="rp-metric"><strong>540K</strong><span>TikTok views in the first month</span></div><h3>Sergio &amp; Co.</h3><p>Built a four-person marketing team and helped La Estancia reach 1,200 new followers through campaign strategy and creative execution.</p><a href="https://sergioatelier.co/" target="_blank" rel="noreferrer">Explore the agency</a></article>
          <article className="rp-work-card"><div className="rp-metric"><strong>Live</strong><span>Customer-facing operating system</span></div><h3>SAVRON Business OS</h3><p>Worked with a real business to build online booking, staff communications, memberships, check-in and a bilingual AI concierge.</p><a href="https://savronmn.com/" target="_blank" rel="noreferrer">Explore the product</a></article>
          <article className="rp-work-card"><div className="rp-metric"><strong>AI + SaaS</strong><span>Product and payments workflows</span></div><h3>NxtSeat</h3><p>Developed a voice-first business software concept spanning scheduling, customer communication and payment integrations.</p><a href="https://nxtseat.co/" target="_blank" rel="noreferrer">Explore NxtSeat</a></article>
        </div>
        <div className="rp-learning"><h3>What I’m ready to learn.</h3><p>My background is in marketing and customer-facing software. I want to build hands-on treasury knowledge through practitioner interviews, product walkthroughs and focused study of cash forecasting, FX exposure, liquidity and payment operations.</p></div>
      </section>
      <footer className="rp-footer"><div className="rp-wrap rp-section">
        <p className="rp-kicker rp-light">Let’s connect</p><h2>I’d love to help build understanding around the future of finance.</h2><p>Open to a conversation with the Ripple team about product marketing and how I could contribute.</p>
        <div className="rp-actions"><a className="rp-button" href={email}>Email me</a><a className="rp-button rp-outline" href="https://www.sergiopineros.com">Visit my portfolio</a></div>
        <div className="rp-fine"><span>Sergio Piñeros · Independent candidate portfolio</span><span>Not affiliated with or endorsed by Ripple.</span></div>
      </div></footer>
    </main>
  );
}

const css = `
.rp-page{--rp-blue:#0866e8;--rp-navy:#071b3f;--rp-ink:#10213b;--rp-muted:#435873;--rp-border:#dbe5f0;background:#fff;color:var(--rp-ink);font-family:var(--font-dm-sans),Arial,sans-serif;line-height:1.55;font-size:18px;overflow:clip}
.rp-page *{box-sizing:border-box}.rp-page a{text-decoration:none}.rp-page h1,.rp-page h2,.rp-page h3,.rp-page h4,.rp-page p{margin:0}.rp-page h1,.rp-page h2,.rp-page h3,.rp-page h4{font-weight:500;letter-spacing:-.045em;line-height:1.08}.rp-page h1{font-size:clamp(44px,5.3vw,81px);max-width:13ch}.rp-page h2{font-size:clamp(34px,4.2vw,60px);max-width:19ch}.rp-page h3{font-size:clamp(23px,2.4vw,32px)}.rp-page h4{font-size:22px}.rp-page section[id]{scroll-margin-top:90px}.rp-wrap{width:min(1240px,calc(100% - 96px));margin-inline:auto}.rp-section{padding-block:clamp(65px,8vw,112px)}.rp-header{background:#fff;border-bottom:1px solid var(--rp-border);position:sticky;top:0;z-index:20}.rp-nav{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px}.rp-brand{font-weight:700;font-size:19px;letter-spacing:-.04em;white-space:nowrap}.rp-brand span{font-size:15px;font-weight:500;color:var(--rp-muted);letter-spacing:0}.rp-nav nav{display:flex;gap:26px;font-size:15px;font-weight:500}.rp-nav nav a:hover,.rp-work-card a:hover{color:var(--rp-blue)}.rp-button{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:12px 24px;background:var(--rp-blue);color:white!important;font-size:16px;font-weight:600;border:1px solid transparent;border-radius:5px;transition:background .2s,transform .2s;line-height:1.3}.rp-button:hover{background:#0054c5;transform:translateY(-2px)}.rp-button.rp-small{min-height:42px;padding:9px 18px;font-size:15px}.rp-outline{background:transparent;border-color:#a8c7ec;color:white!important}.rp-outline:hover{background:#ffffff15}.rp-page a:focus-visible,.rp-radio:focus-visible~.rp-tabs label{outline:3px solid #65baff;outline-offset:4px}.rp-hero{background:radial-gradient(ellipse at 81% 54%,#124c9d 0%,#0a2c62 35%,#071b3f 70%);color:#fff}.rp-hero-grid{min-height:610px;display:grid;grid-template-columns:1.06fr .94fr;align-items:center;gap:28px;padding-block:80px}.rp-kicker{font-size:15px;font-weight:700;letter-spacing:.025em;color:#075bbf;margin-bottom:18px!important}.rp-kicker.rp-light{color:#a9d5ff}.rp-lead{font-size:clamp(18px,1.7vw,22px);max-width:580px;color:#e0ebfb;margin-top:26px!important;line-height:1.6}.rp-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.rp-art{position:relative;align-self:center;min-width:0}.rp-art svg{width:100%;height:auto;display:block;overflow:visible;filter:drop-shadow(0 0 30px #268cff33)}.rp-art-caption{display:flex;align-items:center;justify-content:center;gap:10px;font-size:14px;color:#b9ddff;text-align:center}.rp-dot{width:8px;height:8px;border-radius:50%;background:#79d6ff;box-shadow:0 0 12px #65baff}.rp-hero-copy{animation:rp-rise .65s ease both}.rp-art{animation:rp-rise .9s .1s ease both}.rp-orbit{transform-origin:260px 230px;animation:rp-rotate 28s linear infinite}.rp-node{animation:rp-pulse 4s ease-in-out infinite}@keyframes rp-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes rp-rotate{to{transform:rotate(360deg)}}@keyframes rp-pulse{50%{opacity:.45}}
.rp-story{display:grid;grid-template-columns:1fr 1.15fr;gap:clamp(30px,6vw,100px)}.rp-story-copy{display:grid;gap:18px;color:var(--rp-muted);font-size:19px;line-height:1.7}.rp-timeline{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:54px;border-top:1px solid var(--rp-border)}.rp-timeline article{padding:28px 25px 0 0}.rp-timeline article+article{padding-left:25px;border-left:1px solid var(--rp-border)}.rp-timeline span,.rp-question span,.rp-message-main>span,.rp-validate span{color:#075bbf;font-weight:700;font-size:15px}.rp-timeline h3{margin:12px 0!important}.rp-timeline p,.rp-intro,.rp-launch p,.rp-work-card p,.rp-learning p{color:var(--rp-muted);line-height:1.6}.rp-concept{background:#f2f7fd}.rp-intro{max-width:770px;margin-top:22px!important;font-size:20px}.rp-lab{margin-top:42px;background:#fff;border:1px solid #d4e0ed;border-radius:14px;overflow:hidden;box-shadow:0 18px 65px #1f4d7510}.rp-lab-header{display:flex;justify-content:space-between;gap:12px;padding:18px 24px;background:#0b254e;color:white;font-size:15px;font-weight:600}.rp-lab-header span+span{color:#b8d6f8;font-weight:400}.rp-lab-body{position:relative;padding:28px}.rp-radio{position:absolute;opacity:0;width:1px;height:1px}.rp-tabs{display:flex;gap:6px;background:#edf3fa;padding:5px;border-radius:7px;width:fit-content;max-width:100%;flex-wrap:wrap}.rp-tabs label{padding:12px 22px;color:#435873;font-size:16px;font-weight:600;cursor:pointer;border-radius:5px;transition:background .2s,color .2s}.rp-tabs label:hover{background:#dbe9f7}.rp-radio:focus-visible~.rp-tabs label{outline:none}#rp-a0:focus-visible~.rp-tabs label:nth-child(1),#rp-a1:focus-visible~.rp-tabs label:nth-child(2),#rp-a2:focus-visible~.rp-tabs label:nth-child(3){outline:3px solid #65baff;outline-offset:2px}#rp-a0:checked~.rp-tabs label:nth-child(1),#rp-a1:checked~.rp-tabs label:nth-child(2),#rp-a2:checked~.rp-tabs label:nth-child(3){background:#0866e8;color:white}.rp-message{display:none;grid-template-columns:.8fr 1.4fr;gap:36px;margin-top:28px;align-items:start}#rp-a0:checked~.rp-message-0,#rp-a1:checked~.rp-message-1,#rp-a2:checked~.rp-message-2{display:grid;animation:rp-rise .3s ease both}.rp-question{background:#f0f6fd;padding:25px;border-radius:8px;min-height:155px}.rp-question p{font-size:23px;line-height:1.35;letter-spacing:-.02em;margin-top:12px!important}.rp-message-main{padding:8px 8px 6px 0}.rp-message-main h3{margin:12px 0!important;max-width:25ch}.rp-message-main>p{color:var(--rp-muted);line-height:1.6}.rp-validate{border-top:1px solid var(--rp-border);margin-top:24px;padding-top:18px}.rp-validate p{margin-top:5px!important;color:var(--rp-muted);font-size:16px}.rp-launch{margin-top:48px}.rp-launch-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:22px}.rp-launch-grid article{border-top:2px solid #9ac7f7;padding-top:18px}.rp-launch-grid h4{margin-bottom:10px!important}.rp-note{font-size:15px;color:#526782;margin-top:32px!important;line-height:1.6}.rp-note a{color:#075bbf;text-decoration:underline;text-underline-offset:3px}
.rp-work-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:36px}.rp-work-card{border:1px solid var(--rp-border);border-radius:10px;padding:26px;display:flex;flex-direction:column;gap:15px;transition:border-color .2s,transform .2s}.rp-work-card:hover{border-color:#83b7ee;transform:translateY(-3px)}.rp-metric{min-height:108px;background:#eff6ff;border-radius:6px;padding:18px;display:flex;flex-direction:column;justify-content:center}.rp-metric strong{font-size:clamp(30px,3.2vw,46px);color:#075bbf;line-height:1;letter-spacing:-.05em;font-weight:600}.rp-metric span{font-size:15px;color:var(--rp-muted);margin-top:7px}.rp-work-card a{color:#075bbf;font-weight:700;font-size:16px;margin-top:auto;padding-top:8px}.rp-learning{margin-top:45px;padding:30px 0;border-top:1px solid var(--rp-border);display:grid;grid-template-columns:1fr 1.15fr;gap:30px}.rp-footer{background:#071b3f;color:white}.rp-footer h2{max-width:22ch}.rp-footer p:not(.rp-kicker){max-width:680px;color:#d6e5f7;margin-top:20px;font-size:20px}.rp-fine{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-top:70px;border-top:1px solid #ffffff30;padding-top:20px;color:#b8cbe5;font-size:15px}
@media(max-width:950px){.rp-wrap{width:calc(100% - 56px)}.rp-nav nav{gap:13px}.rp-brand span{display:none}.rp-hero-grid{min-height:0;grid-template-columns:1.15fr .85fr;gap:12px;padding-block:68px}.rp-work-card{padding:18px}.rp-metric{padding:14px}}
@media(max-width:700px){.rp-wrap{width:calc(100% - 40px)}.rp-nav{min-height:66px;gap:12px;flex-wrap:wrap;padding-block:10px}.rp-nav nav{order:3;width:100%;justify-content:space-between;gap:12px;font-size:14px;padding:5px 0}.rp-brand{font-size:18px}.rp-button.rp-small{min-height:40px;padding:8px 13px}.rp-hero-grid{grid-template-columns:1fr;gap:8px;padding-block:50px 35px}.rp-hero h1{font-size:clamp(43px,10vw,61px)}.rp-lead{margin-top:20px!important}.rp-actions{gap:10px}.rp-hero .rp-actions{flex-direction:column;align-items:stretch}.rp-art{max-width:360px;margin-inline:auto;width:100%}.rp-art-caption{font-size:13px}.rp-story,.rp-learning{grid-template-columns:1fr;gap:24px}.rp-timeline,.rp-launch-grid,.rp-work-grid{grid-template-columns:1fr;gap:20px}.rp-timeline{margin-top:36px;border-top:0}.rp-timeline article,.rp-timeline article+article{padding:18px 0 0;border-left:0;border-top:1px solid var(--rp-border)}.rp-lab{margin-top:30px}.rp-lab-header{flex-wrap:wrap;padding:15px;font-size:14px}.rp-lab-body{padding:15px}.rp-tabs{width:100%;gap:3px}.rp-tabs label{flex:1;padding:10px 7px;font-size:14px;text-align:center;white-space:nowrap}.rp-message{grid-template-columns:1fr;gap:20px;margin-top:18px}.rp-question{min-height:0;padding:18px}.rp-question p{font-size:21px}.rp-message-main{padding:0 4px 8px}.rp-work-grid{margin-top:25px}.rp-work-card{padding:20px}.rp-fine{margin-top:44px}.rp-page section[id]{scroll-margin-top:115px}}
@media(prefers-reduced-motion:reduce){.rp-page *,.rp-page *::before,.rp-page *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;
