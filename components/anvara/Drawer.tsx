"use client";
import { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
export default function Drawer({
  open,
  onClose,
  title,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  label: string;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open && !dialog.current?.open) dialog.current?.showModal();
    else if (!open && dialog.current?.open) dialog.current.close();
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className="av-drawer"
      onCancel={onClose}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={title}
    >
      <div className="av-drawer-content">
        <div className="av-drawer-top">
          <span className="av-mini-label">{label}</span>
          <button autoFocus onClick={onClose} aria-label="Close panel">
            <X size={20} />
          </button>
        </div>
        <h3>{title}</h3>
        {children}
      </div>
    </dialog>
  );
}
