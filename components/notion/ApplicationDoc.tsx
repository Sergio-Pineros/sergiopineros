"use client";
import { ArrowUpRight, Download, X } from "lucide-react";

type Props = { onClose: () => void };

const evidence = [
  { title: "Growth work with real businesses", time: "2025-2026", bullets: [
    "Worked on La Estancia Steakhouse's short-form content strategy. In its first month, the campaign reached about 540,000 TikTok views and brought in 1,200+ followers.",
    "Worked directly with business owners on content, audience insights, creative production, and campaign improvements."
  ]},
  { title: "Building with business owners", time: "2026", bullets: [
    "Built tools for SAVRON Barbershop & Lounge, including scheduling, client check-in, staff notifications, memberships, and owner workflows.",
    "Piloted bilingual AI phone assistance for bookings and customer questions, working from the way the shop actually operates."
  ]}
];

const experience = [
  {title:"Sergio & Co. | Founder, Digital Strategy",time:"Jan 2026-Present",bullets:[
    "Build websites, brand experiences, and growth tools. Work directly with clients from the first conversation through design, launch, and improvements.",
    "Turn business needs into working products, with feedback from the people using them."
  ]},
  {title:"Fofo Labs | Founder, Growth",time:"Apr 2025-Jan 2026",bullets:[
    "Built a four-person creative and marketing team, leading client strategy and production.",
    "Created campaigns for local restaurants and hospitality businesses, then used results and client feedback to improve the work."
  ]},
  {title:"17 Bits Records | Co-Founder, Creative Director",time:"2021-Present · Part-time",bullets:[
    "Helped independent artists release music, develop visual identities, and put on their first events."
  ]},
  {title:"HP Tech Ventures | Startup Analysis Extern",time:"Mar-May 2026",bullets:[
    "Researched startups and markets, then organized findings into clear recommendations."
  ]}
];

const productWork = [
  {title:"NxtSeat | Founder, Product",time:"2026-Present",bullets:[
    "Designed booking software for service businesses, covering calendars, walk-ins, staff tools, memberships, and customer messages.",
    "Prototyped bilingual AI assistance for businesses that miss calls while serving customers."
  ]},
  {title:"SAVRON Business OS | Product Development",time:"2026-Present",bullets:[
    "Mapped guest, barber, front-desk, and owner needs into one set of practical tools.",
    "Designed around the tasks staff handle every day, from checking in a client to updating a schedule."
  ]},
  {title:"Independent projects | AI and Growth",time:"2026",bullets:[
    "Built interactive product concepts and small AI automations to test how useful they could be.",
    "Built the growth experiment demo on this page to explore how agents could help teams review evidence and choose their next test."
  ]}
];

const paragraphs=[
  "I got excited reading about this role because it brings together a few things I love working on: growth, product, data, and AI. The idea of building a system that helps a team learn from every experiment sounds like exactly the kind of problem I'd want to work on.",
  "I started in marketing, working directly with small businesses through Fofo Labs. I built a four-person team and spent a lot of time figuring out what people actually responded to. At La Estancia Steakhouse, our short-form content reached around 540,000 views and brought in over 1,200 followers in its first month. I enjoyed making the creative, and the results always made me curious about what we could try next.",
  "That curiosity led me into building software. With SAVRON and NxtSeat, I've worked on booking, customer communication, staff tools, and bilingual AI assistance. A lot of that work starts with sitting down with business owners, learning how their day goes, and making something they actually want to use.",
  "My experience has mostly been with smaller teams, and I'm excited to grow into larger-scale experimentation and measurement. I built a small interactive concept for this application because that's usually what I do when a problem catches my attention. You can try three sample experiments and see how an agent might help organize the evidence behind a decision.",
  "I've always liked how much care Notion puts into making complicated work feel approachable. I'd love to bring my curiosity, creative experience, and willingness to build things to the team. Thanks for taking a look. I'd be excited to talk."
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
              <p>I build growth campaigns and software for small businesses. My work covers creative strategy, product design, real customer workflows, and AI prototypes. I like working closely with the people using what I build. Fluent in English and Spanish.</p>
            </section>
            <ResumeGroup title="Selected evidence" entries={evidence}/>
            <ResumeGroup title="Experience" entries={experience}/>
            <ResumeGroup title="Selected product work" entries={productWork}/>
            <section className="nt-resume-group"><h4>Capabilities</h4>
              <p><strong>Growth:</strong> Meta Business Suite, TikTok Ads, creative testing, campaign reviews, conversion analysis, experiment design.</p>
              <p><strong>Product:</strong> Discovery, journey mapping, prototyping, workflow automation, API integration, AI agents, prioritization.</p>
              <p><strong>Tools:</strong> HTML/CSS, Python, GitHub, Figma, Adobe Creative Suite, Google Workspace.</p>
              <p><strong>Languages:</strong> English (fluent), Spanish (native).</p>
            </section>
            <section className="nt-resume-group"><h4>Education & training</h4>
              <p>Dunwoody College of Technology · Electronics Technology Certificate (2024-2025)<br/>Masterschool · Cybersecurity Bootcamp (2023-2024)</p>
            </section>
            <section className="nt-resume-group"><h4>Portfolio</h4>
              <p>sergiopineros.com/notion · sergiopineros.com · nxtseat.co · savronmn.com</p>
            </section>
            <p className="nt-resume-disclaimer">Client results reflect team work. The interactive demo uses sample data.</p>
          </article>
        </div>
      </div>
    </div>
  </div>;
}
