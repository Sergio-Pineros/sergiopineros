"use client";
import { ArrowUpRight, Download, X } from "lucide-react";

type Props = { onClose: () => void };

const evidence = [
  { title: "Growth experiments tied to real businesses", time: "2025–2026", bullets: [
    "For La Estancia Steakhouse, helped execute a short-form content strategy that generated roughly 540,000 TikTok views and 1,200+ followers in the first month.",
    "Worked across audience insights, storytelling, content production, creator outreach, and iteration with local business owners."
  ]},
  { title: "From customer problem to working product", time: "2026", bullets: [
    "Designed and built operating workflows for SAVRON Barbershop & Lounge: scheduling, client check-in, staff notifications, membership journeys, and owner-facing tools.",
    "Explored a bilingual AI voice concierge pilot for calls, bookings, and customer follow-up; connected product decisions to frontline operations."
  ]}
];

const experience = [
  {title:"Sergio & Co. — Founder & Digital Strategy Lead",time:"Jan 2026–Present",bullets:[
    "Lead website, brand, and growth-system projects; combine client discovery, product prototyping, performance creative, paid advertising, and lifecycle touchpoints.",
    "Translate business goals into scoped digital experiences, build solutions directly, and iterate with client feedback."
  ]},
  {title:"Fofo Labs — Founder & Growth Lead",time:"Apr 2025–Jan 2026",bullets:[
    "Built a small creative and marketing practice, coordinating strategy, production, and account delivery with a team of four.",
    "Developed audience-first campaigns for food and hospitality businesses, reviewing performance and adapting creative with stakeholders."
  ]},
  {title:"17 Bits Records — Co-Founder & Creative Director",time:"2021–Present · Part-time",bullets:[
    "Helped independent musicians launch releases, build visual identities, and produce live events; coordinated artist, production, and audience needs."
  ]},
  {title:"HP Tech Ventures — Startup Analysis Extern",time:"Mar–May 2026",bullets:[
    "Researched startup opportunities and competitive landscapes; synthesized product and business findings into concise recommendations."
  ]}
];

const productWork = [
  {title:"NxtSeat — Founder / Product Exploration",time:"2026–Present",bullets:[
    "Designed multi-tenant service-business software for bookings, calendars, walk-ins, staff workflows, membership passes, and customer communications.",
    "Explored bilingual, voice-first AI assistance where missed calls and fragmented tools affect conversion and operations."
  ]},
  {title:"SAVRON Business OS — Product Development",time:"2026–Present",bullets:[
    "Mapped guest, barber, front-desk, and owner journeys into a unified set of operational interfaces.",
    "Shaped the experience around clear next actions, fewer handoffs, and real operational constraints."
  ]},
  {title:"Independent experiments — AI + Growth",time:"2026",bullets:[
    "Prototyped AI-driven interfaces, automated workflows, and interactive product explorations.",
    "Created a Growth Experimentation OS concept for this Notion application, showing hypothesis → test → decision → learning with simulated data and human review."
  ]}
];

const paragraphs=[
  "The part of this role that caught my attention was the idea of turning a growth experimentation prototype into a real operating system. I like building things at the intersection of product, creative work and systems, especially when the point of automation is to make human decisions better, not just faster.",
  "I started on the marketing side. Through Fofo Labs, I worked directly with small businesses, built a four-person team and helped shape campaigns around what customers actually responded to. For La Estancia Steakhouse, one short-form strategy reached about 540,000 TikTok views and brought in over 1,200 followers in its first month. It taught me that creative performance only matters when you can connect it to what a business needs next.",
  "That curiosity pushed me further into product. With SAVRON and NxtSeat, I've been designing software for appointment booking, customer communications, staff workflows and bilingual AI assistance. I've had to connect the interface, the automation and the real-world operation, and simplify all three until they make sense together.",
  "I know this position calls for depth in paid growth, experimentation and measurement at a scale beyond the businesses I've worked with. I wouldn't pretend otherwise. What I can show is how I think, build, learn and connect disciplines. So I put together a small independent concept: a Growth Experimentation OS that makes hypotheses, evidence, guardrails and kill/iterate/scale decisions easier to see. It's a conversation starter, not a claim that I know Notion's internal systems.",
  "I would love the chance to bring that combination of curiosity, hands-on execution and care for the details to Notion. I believe great tools should give people more room to think. I'd be excited to help make that true for the teams growing Notion, too."
];

function ResumeGroup({title,entries}:{title:string;entries:typeof evidence}){
  return <section className="nt-resume-group">
    <h4>{title}</h4>
    {entries.map(item=><div className="nt-resume-job" key={item.title}>
      <div className="nt-resume-jobhead"><strong>{item.title}</strong><span>{item.time}</span></div>
      <ul>{item.bullets.map(b=><li key={b}>{b}</li>)}</ul>
    </div>)}
  </section>;
}

export default function ApplicationDoc({onClose}:Props){
  return <div className="nt-modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div className="nt-modal nt-application-dialog" role="dialog" aria-modal="true" aria-label="Application: cover letter and résumé">
      <header className="nt-modal-header">
        <div className="nt-modal-heading"><span>NOTION / APPLICATION</span><strong>Cover letter + résumé</strong></div>
        <div className="nt-modal-header-actions">
          <button type="button" className="nt-print-btn" onClick={()=>window.print()}><Download size={15}/> Save as PDF</button>
          <button type="button" className="nt-modal-close" onClick={onClose} aria-label="Close application"><X size={21}/></button>
        </div>
      </header>
      <div className="nt-modal-scroll">
        <div className="nt-application-pages">
          <article className="nt-doc-paper">
            <div className="nt-doc-kicker"><span>01 / 02</span><span>COVER LETTER</span></div>
            <h2>Sergio Piñeros</h2>
            <p className="nt-doc-role">AI Product Manager, Growth Marketing · Notion</p>
            <div className="nt-doc-contacts">
              <span>San Francisco, CA</span><a href="mailto:s.dpineros@gmail.com">s.dpineros@gmail.com</a><a href="https://www.linkedin.com/in/sergio-pineros-c/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={11}/></a>
            </div>
            <div className="nt-cover-copy">
              <p>Dear Notion team,</p>
              {paragraphs.map(p=><p key={p}>{p}</p>)}
              <p>Best,<br/><strong>Sergio Piñeros</strong></p>
            </div>
            <a className="nt-doc-portfolio" href="https://www.sergiopineros.com/notion" target="_blank" rel="noopener noreferrer">Product exploration · sergiopineros.com/notion <ArrowUpRight size={13}/></a>
          </article>

          <div className="nt-doc-connector" aria-hidden="true"><span>↓</span><p>Keep scrolling for the résumé</p></div>

          <article className="nt-doc-paper nt-resume-paper">
            <div className="nt-doc-kicker"><span>02 / 02</span><span>RÉSUMÉ</span></div>
            <h2>Sergio Piñeros</h2>
            <p className="nt-doc-role">AI Product Manager · Growth Systems · Applied AI</p>
            <div className="nt-doc-contacts">
              <span>San Francisco, CA</span><a href="mailto:s.dpineros@gmail.com">s.dpineros@gmail.com</a><span>sergiopineros.com</span>
            </div>
            <section className="nt-resume-group">
              <h4>Profile</h4>
              <p>Founder and hands-on product/growth builder connecting marketing, experimentation and software. I have led campaigns for small businesses, worked on products that turn messy operations into usable workflows, and prototyped AI-assisted customer experiences. Comfortable translating between creative, technical and business teams; fluent in English and Spanish.</p>
            </section>
            <ResumeGroup title="Selected evidence" entries={evidence}/>
            <ResumeGroup title="Experience" entries={experience}/>
            <ResumeGroup title="Selected product work" entries={productWork}/>
            <section className="nt-resume-group"><h4>Capabilities</h4>
              <p><strong>Growth & measurement:</strong> Meta Business Suite, TikTok Ads, paid creative, campaign iteration, conversion thinking, cohort questions and experiment design.</p>
              <p><strong>Product & systems:</strong> Product discovery, journey mapping, prototyping, workflow automation, API thinking, agent design and prioritization.</p>
              <p><strong>Build & creative:</strong> HTML/CSS, Python, GitHub, Figma, Adobe Creative Suite and Google Workspace.</p>
              <p><strong>Languages:</strong> English (fluent), Spanish (native).</p>
            </section>
            <section className="nt-resume-group"><h4>Education & training</h4>
              <p>Dunwoody College of Technology · Electronics Technology Certificate (2024–2025)<br/>Masterschool · Cybersecurity Bootcamp (2023–2024)</p>
            </section>
            <section className="nt-resume-group"><h4>Portfolio</h4>
              <p>sergiopineros.com/notion · sergiopineros.com · nxtseat.co · savronmn.com</p>
            </section>
            <p className="nt-resume-disclaimer">Results describe collaborative client work. The demo uses illustrative metrics.</p>
          </article>
        </div>
      </div>
    </div>
  </div>;
}
