"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Built on <dialog>, so focus trapping, Escape and inert background are the
 * browser's job rather than ours.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  // A closed dialog still mounts its children, so media inside would download
  // for a modal nobody opened. Mount on first open, then keep it.
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (open) {
      setOpened(true);
      if (!node.open) node.showModal();
    } else if (node.open) {
      node.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      aria-label={title}
      className="m-auto w-[min(62rem,calc(100vw-2rem))] rounded-panel border border-line bg-paper-raised p-0 text-ink shadow-float backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <h2 className="text-[1rem] font-medium tracking-[-0.015em]">{title}</h2>
        <button
          onClick={onClose}
          className="grid h-8 w-8 place-items-center rounded-[9px] border border-line text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
          aria-label="Close"
        >
          <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="p-5">{opened ? children : null}</div>
    </dialog>
  );
}
