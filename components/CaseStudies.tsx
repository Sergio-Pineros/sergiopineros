import Link from "next/link";
import { ArrowUpRight, ArrowRight, FlaskConical, Layers3, MousePointer2 } from "lucide-react";
import "./case-studies.css";

const cases = [
  { id:"notion", title:"What if software had drawers?", name:"Notion Experiments", type:"INTERFACE EXPERIMENT",question:"Can the interface hold less at once?", href:"/notion", num:"01", color:"lilac" },
  { id:"anvara", title:"Making the connection is only the beginning.", name:"Anvara", type:"MARKETPLACE STUDY",question:"What happens after a match?", href:"/anvara", num:"02", color:"blue" },
  { id:"tomo", title:"A different way to experience a brand.", name:"Tomo", type:"BRAND EXPLORATION",question:"How should the first interaction feel?", href:"/tomo", num:"03", color:"peach" },
] as const;

export default function CaseStudies(){
 return <section className="editorial-studies" id="case-studies" aria-labelledby="editorial-studies-title">
  <div className="editorial-studies__intro"><span>RESEARCH ARCHIVE / 2026</span><h2 id="editorial-studies-title">Sergio&apos;s <em>Lab.</em></h2><p>I study products, ask what could work better, and build ideas to find out.</p></div>
  <div className="editorial-studies__rail">
   {cases.map((item)=><Link key={item.id} href={item.href} className={`editorial-study editorial-study--${item.color}`} aria-label={`Read ${item.name} case study`}>
    <div className="editorial-study__paper">
      <div className="editorial-study__top"><span>SERGIO&apos;S LAB / STUDY {item.num}</span><span>↗ 2026</span></div>
      <div className="editorial-study__art" aria-hidden="true">
       {item.id==="notion"&&<div className="editorial-study__drawer-art"><div><FlaskConical size={32}/></div><div><Layers3 size={30}/></div><div><MousePointer2 size={31}/></div></div>}
       {item.id==="anvara"&&<div className="editorial-study__orbit-art"><div className="editorial-study__orbit-one"/><div className="editorial-study__orbit-two"/><div className="editorial-study__orbit-core"/></div>}
       {item.id==="tomo"&&<div className="editorial-study__tomo-art"><span>tomo</span><div className="editorial-study__tomo-cursor"><MousePointer2 size={28}/></div><i/><i/></div>}
      </div>
      <div className="editorial-study__bottom"><span>{item.name}</span><span className="editorial-study__sticker">EXPERIMENT {item.num}</span></div>
    </div>
    <div className="editorial-study__caption"><div><span>{item.type}</span><h3>{item.question}</h3></div><ArrowUpRight size={21}/></div>
   </Link>)}
  </div>
  <p className="editorial-studies__footnote">Independent studies of products and companies. Not affiliated with them. <span aria-hidden="true">↗</span></p>
 </section>;
}
