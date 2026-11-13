"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { DecisionSpace } from "./DecisionSpace";

export default function FeatureDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    else if (!open && dialog.current?.open) dialog.current.close();
  }, [open]);
  return (
    <dialog ref={dialog} className="av-feature-dialog" aria-label="Feature matrix" onCancel={onClose} onClose={onClose} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="av-feature-dialog-bar"><span>FEATURE MATRIX</span><button autoFocus onClick={onClose} aria-label="Close feature matrix"><X size={20} /></button></div>
      {open && <DecisionSpace featuredOnly />}
    </dialog>
  );
}
