"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const Envelope = dynamic(() => import("@/components/ui/ripple-resume-envelope"), { ssr: false });
const PDF = "/ripple/resume-and-cover-letter.pdf";

export default function ResumeReveal() {
  const [finished, setFinished] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const reveal = useCallback(() => setFinished(true), []);
  useEffect(() => {
    const controller = new AbortController();
    fetch(PDF, { method: "HEAD", signal: controller.signal, cache: "no-store" })
      .then(r => setAvailable(r.ok && (r.headers.get("content-type") || "").includes("application/pdf")))
      .catch(() => { if (!controller.signal.aborted) setAvailable(false); });
    const timer = window.setTimeout(reveal, 5200);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) reveal();
    return () => { controller.abort(); window.clearTimeout(timer); };
  }, [reveal]);
  return <main className="rr-page">
    <style>{`
      .rr-page{min-height:100svh;background:#edf3f8;color:#141a1f;font-family:var(--font-dm-sans),Arial,sans-serif}
      .rr-page *{box-sizing:border-box}.rr-skip{position:fixed;z-index:50;top:20px;right:20px;display:flex;gap:16px;align-items:center}
      .rr-skip button,.rr-skip a,.rr-bar a{font:inherit;font-size:16px;color:#141a1f;border:1px solid #bac9d6;border-radius:5px;background:#fff;padding:10px 15px;text-decoration:none;cursor:pointer}
      .rr-reader{height:100svh;display:flex;flex-direction:column;animation:rr-reveal .35s ease both}
      .rr-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;background:#fff;padding:14px 24px;border-bottom:1px solid #d6e0e9}
      .rr-bar h1{margin:0;font-size:18px;font-weight:600}.rr-bar nav{display:flex;flex-wrap:wrap;gap:10px}
      .rr-frame{width:100%;flex:1;min-height:0;border:0;background:#fff}
      .rr-wait{flex:1;display:grid;place-content:center;text-align:center;padding:30px;gap:12px}.rr-wait p{margin:0}
      @keyframes rr-reveal{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      @media(prefers-reduced-motion:reduce){.rr-reader{animation:none}}
    `}</style>
    {!finished ? <>
      <Envelope theme="light" onComplete={reveal} />
      <div className="rr-skip"><a href="/ripple">Back</a><button type="button" onClick={reveal}>Skip animation</button></div>
    </> : <section className="rr-reader" aria-label="Résumé and cover letter">
      <header className="rr-bar"><h1>Résumé &amp; Cover Letter</h1><nav aria-label="Document actions"><a href="/ripple">Back</a>{available && <a href={PDF} target="_blank" rel="noreferrer">Open PDF</a>}{available && <a href={PDF} download="Sergio-Pineros-Ripple.pdf">Download PDF</a>}</nav></header>
      {available ? <iframe className="rr-frame" title="Sergio Piñeros résumé and cover letter PDF" src={PDF} /> : <div className="rr-wait"><p>{available === null ? "Loading document…" : "The final PDF is being prepared."}</p></div>}
    </section>}
  </main>;
}
