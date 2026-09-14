import type { ReactNode } from "react";

type Tone = "paper" | "sunken" | "dark" | "raised";

const TONES: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  sunken: "bg-paper-sunken text-ink",
  raised: "bg-paper-raised text-ink",
  // Tone name kept as "dark" even though there are no dark surfaces in this
  // palette — it still means what it always meant: the loud band that
  // breaks up the paper run. Every consumer (LiveDemo, Analytics, MidCta)
  // reads tone="dark" to mean "the emphatic beat", so renaming it would
  // touch five section files for a label that's now a role, not a literal
  // description.
  dark: "dark-field bg-paper-sunken text-ink",
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  /** Vertical rhythm. `tight` for strips, `loose` for the big editorial beats. */
  space?: "strip" | "tight" | "normal" | "loose";
  className?: string;
  /** Hairline divider above the section. */
  ruled?: boolean;
};

const SPACE = {
  strip: "py-10 md:py-12",
  tight: "py-16 md:py-20",
  normal: "py-20 md:py-28",
  loose: "py-24 md:py-36",
} as const;

export function Section({
  children,
  id,
  tone = "paper",
  space = "normal",
  className = "",
  ruled = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${TONES[tone]} ${SPACE[space]} ${ruled ? "border-t border-line" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Section heading. Deliberately has no eyebrow slot — the brief's one eyebrow
 * belongs to the hero, and stamping a tracked-out label above every heading is
 * the fastest way to make a page look generated.
 */
export function SectionHead({
  title,
  lead,
  aside,
  align = "left",
  className = "",
}: {
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  align?: "left" | "wide";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-6 ${
        align === "wide" ? "md:flex-row md:items-end md:justify-between md:gap-16" : ""
      } ${className}`}
    >
      <div className="max-w-[46rem]">
        <h2 className="t-h2">{title}</h2>
        {lead ? <p className="t-lead mt-5">{lead}</p> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

/** Small illustrative-data disclaimer, used wherever demo metrics appear. */
export function DemoNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`t-micro max-w-[44ch] ${className}`}>
      <span className="mr-1.5 inline-block h-1 w-1 translate-y-[-2px] rounded-full bg-ink-faint align-middle" />
      {children}
    </p>
  );
}
