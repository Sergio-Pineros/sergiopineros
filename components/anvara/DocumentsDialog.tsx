"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function DocumentsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    else if (!open && dialog.current?.open) dialog.current.close();
  }, [open]);
  return (
    <dialog ref={dialog} className="av-documents-dialog" aria-labelledby="av-documents-title" onCancel={onClose} onClose={onClose} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="av-documents-bar">
        <div><span>GET TO KNOW ME</span><h2 id="av-documents-title">Cover letter & resume</h2></div>
        <button autoFocus onClick={onClose} aria-label="Close documents"><X size={20} /></button>
      </div>
      {open && <div className="av-documents-content">
        <section aria-labelledby="av-letter-title">
          <div className="av-document-heading"><h3 id="av-letter-title">Cover letter</h3><a href="/anvara-documents/cover-letter.pdf" target="_blank" rel="noopener noreferrer">Open PDF</a></div>
          <Image src="/anvara-documents/cover-1.jpg" alt="Cover letter for Anvara. Open the PDF for accessible text." width={1020} height={1320} unoptimized />
        </section>
        <section aria-labelledby="av-resume-title">
          <div className="av-document-heading"><h3 id="av-resume-title">Resume</h3><a href="/anvara-documents/resume.pdf" target="_blank" rel="noopener noreferrer">Open PDF</a></div>
          <Image src="/anvara-documents/resume-1.jpg" alt="Resume, page one. Open the PDF for accessible text." width={1020} height={1320} unoptimized />
          <Image src="/anvara-documents/resume-2.jpg" alt="Resume, page two." width={1020} height={1320} unoptimized />
        </section>
      </div>}
    </dialog>
  );
}
