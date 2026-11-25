import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sergio Piñeros",
  description: "Personal and studio portfolios.",
  alternates: { canonical: "/me" },
};

export default function MePage() {
  return (
    <main className="me-portal">
      <style>{`
        .me-portal{min-height:100svh;display:grid;place-items:center;background:#fff;padding:24px}
        .me-logos{display:flex;align-items:center;justify-content:center;gap:clamp(30px,8vw,100px)}
        .me-logos a{width:clamp(100px,21vw,180px);height:clamp(100px,21vw,180px);display:flex;align-items:center;justify-content:center;border-radius:12px;transition:transform .22s ease}
        .me-logos img{width:100%;height:100%;object-fit:contain}
        .me-logos a:hover{transform:translateY(-4px)}
        .me-logos a:focus-visible{outline:2px solid #008cff;outline-offset:10px}
        @media(prefers-reduced-motion:reduce){.me-logos a{transition:none;transform:none}}
      `}</style>
      <div className="me-logos">
        <Link href="/" aria-label="Sergio Piñeros personal portfolio">
          <Image src="/icon.svg" alt="Sergio Piñeros" width={180} height={180} priority unoptimized />
        </Link>
        <a href="https://sergioatelier.co/" aria-label="Sergio & Co. studio portfolio">
          <Image src="/sergio-co-icon-green.svg" alt="Sergio & Co." width={180} height={180} priority unoptimized />
        </a>
      </div>
    </main>
  );
}
