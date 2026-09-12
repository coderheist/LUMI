import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "accent" | "outline" | "quiet" | "inverse";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  // Ink, not indigo: the primary action belongs to the merchant's own UI.
  primary:
    "bg-ink text-paper border border-ink hover:bg-ink-hover active:translate-y-px",
  // Indigo is Lumi's colour — used where the action starts the agent.
  accent:
    "bg-indigo text-white border border-indigo hover:bg-indigo-hover active:translate-y-px",
  outline:
    "bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-ink/[0.03] active:translate-y-px",
  quiet:
    "bg-transparent text-ink-soft border border-transparent hover:text-ink active:translate-y-px",
  inverse:
    "bg-paper text-ink border border-paper hover:bg-white active:translate-y-px",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.82rem] gap-1.5",
  md: "h-11 px-5 text-[0.92rem] gap-2",
  lg: "h-[3.25rem] px-7 text-[0.98rem] gap-2.5",
};

const BASE =
  "group inline-flex items-center justify-center rounded-chip font-medium tracking-[-0.01em] " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "whitespace-nowrap select-none";

type Shared = {
  variant?: Variant;
  size?: Size;
  /** Adds a chevron that travels on hover. Use on navigational actions only. */
  travel?: boolean;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  travel = false,
  children,
  className = "",
  ...rest
}: Shared & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      {children}
      {travel ? <Travel /> : null}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  travel = false,
  children,
  className = "",
  ...rest
}: Shared & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  return (
    <Link className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      {children}
      {travel ? <Travel /> : null}
    </Link>
  );
}

function Travel() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h9.5M9 4.5 12.5 8 9 11.5" />
    </svg>
  );
}
