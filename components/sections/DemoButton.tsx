"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { VideoFrame } from "@/components/ui/VideoFrame";

export function DemoButton({
  label = "Watch 90-sec demo",
  variant = "outline",
  size = "lg",
}: {
  label?: string;
  variant?: "outline" | "primary" | "inverse" | "quiet";
  size?: "sm" | "md" | "lg";
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setOpen(true)}>
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
          <path d="M4.5 2.8v10.4L13 8z" />
        </svg>
        {label}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Lumi in 90 seconds">
        <VideoFrame
          name="hero-loop"
          caption="A customer asks for an outfit, Lumi reads the NOVA catalogue, recommends two pieces and confirms stock — then tracks the order and starts a return."
          sizes="(max-width: 768px) 100vw, 60rem"
        />
      </Modal>
    </>
  );
}
