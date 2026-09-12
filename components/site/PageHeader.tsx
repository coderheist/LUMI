import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({
  title,
  lead,
  meta,
  actions,
}: {
  title: string;
  lead?: string;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line pt-32 pb-14 md:pt-40 md:pb-20">
      <div aria-hidden className="paper-field absolute inset-0 opacity-50" />
      <div className="shell relative">
        {meta ? (
          <Reveal>
            <div className="mb-6">{meta}</div>
          </Reveal>
        ) : null}

        <Reveal delay={60}>
          <h1 className="t-h1 max-w-[20ch]">{title}</h1>
        </Reveal>

        {lead ? (
          <Reveal delay={120}>
            <p className="t-lead mt-6">{lead}</p>
          </Reveal>
        ) : null}

        {actions ? (
          <Reveal delay={180}>
            <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
