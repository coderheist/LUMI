import type { ReactNode } from "react";
import { BRAND } from "@/lib/brand";

/**
 * Conversation atoms shared by every demo on the site.
 *
 * Treatment rule: the customer speaks in a tinted ink bubble, Lumi answers on
 * a raised surface with an indigo edge, a human agent answers with an ochre
 * edge. Colour tells you who is talking without a label having to.
 */

export function ChatShell({
  children,
  channel,
  subject = BRAND.demoCustomer,
  status = "Online",
  className = "",
  floating = false,
  footer,
  tone = "paper",
  bodyClassName = "",
  bodyRef,
  typing = false,
}: {
  children: ReactNode;
  channel: string;
  subject?: string;
  status?: string;
  className?: string;
  floating?: boolean;
  footer?: ReactNode;
  tone?: "paper" | "dark";
  bodyClassName?: string;
  bodyRef?: React.Ref<HTMLDivElement>;
  /** True while the agent is composing its reply — pulses the mark in the
   *  header so "Lumi is thinking" reads at a glance. */
  typing?: boolean;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-panel border ${
        dark ? "border-indigo-line bg-indigo-ink" : "border-line bg-paper-raised"
      } ${floating ? "shadow-float" : "shadow-lift"} ${className}`}
    >
      <header
        className={`flex items-center gap-3 border-b px-4 py-3 md:px-5 ${
          dark ? "border-indigo-line" : "border-line"
        }`}
      >
        <LumiMark tone={dark ? "dark" : "default"} pulse={typing} />
        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-[0.82rem] font-medium tracking-[-0.01em] ${
              dark ? "text-chrome-paper" : ""
            }`}
          >
            {BRAND.name} <span className={dark ? "text-chrome-paper/45" : "text-ink-faint"}>for</span>{" "}
            {subject}
          </p>
          <p className={`truncate text-[0.75rem] ${dark ? "text-chrome-paper/45" : "text-ink-faint"}`}>
            {channel}
          </p>
        </div>
        <span
          className={`flex items-center gap-1.5 rounded-chip px-2 py-1 text-[0.66rem] font-medium ${
            dark
              ? "border border-sage-dark-tint-line bg-sage-dark-tint text-sage-dark"
              : "border border-sage/25 bg-sage-tint text-sage"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full animate-blink ${dark ? "bg-sage-dark" : "bg-sage"}`}
          />
          {status}
        </span>
      </header>
      <div
        ref={bodyRef}
        className={`no-scrollbar flex flex-col gap-3.5 overflow-y-auto px-4 py-4 md:px-5 md:py-5 ${bodyClassName}`}
      >
        {children}
      </div>
      {footer}
    </div>
  );
}

export function LumiMark({
  className = "",
  tone = "default",
  pulse = false,
}: {
  className?: string;
  /** Lifted on dark surfaces, or bare when the parent already supplies one.
   *  A prop rather than a bg-* override, so two equal-specificity utilities
   *  never race on stylesheet order. */
  tone?: "default" | "dark" | "bare";
  /** True while the agent is composing a reply. */
  pulse?: boolean;
}) {
  const background =
    tone === "dark" ? "bg-indigo-dark-mark" : tone === "bare" ? "" : "bg-indigo";

  return (
    <span
      aria-hidden
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-[9px] ${background} ${pulse ? "mark-pulse" : ""} ${className}`}
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="#fff" strokeWidth="1.6">
        <path d="M4 13.5c2.4 0 3.1-2.2 3.6-4.2C8.1 7 8.8 5 11 5c2.6 0 3.4 2.6 2.2 4.4-1.1 1.7-3.6 1.2-3.6 1.2" strokeLinecap="round" />
        <circle cx="15.2" cy="13.4" r="1.3" fill="#fff" stroke="none" />
      </svg>
    </span>
  );
}

type Actor = "customer" | "lumi" | "human";

const ACTOR_STYLE: Record<Actor, string> = {
  customer: "rounded-[16px] rounded-br-[5px] bg-ink/[0.055] text-ink",
  lumi: "rounded-[16px] rounded-bl-[5px] border border-line bg-paper-raised border-l-2 border-l-indigo",
  human: "rounded-[16px] rounded-bl-[5px] border border-line bg-paper-raised border-l-2 border-l-ochre",
};

const DARK_ACTOR_STYLE: Record<Actor, string> = {
  customer: "rounded-[16px] rounded-br-[5px] bg-paper-tint text-ink",
  lumi: "rounded-[16px] rounded-bl-[5px] border border-indigo-line bg-indigo-ink-raised border-l-2 border-l-indigo-dark text-chrome-paper",
  human: "rounded-[16px] rounded-bl-[5px] border border-indigo-line bg-indigo-ink-raised border-l-2 border-l-ochre-dark text-chrome-paper",
};

export function Turn({
  actor,
  children,
  name,
  shown = true,
  dark = false,
}: {
  actor: Actor;
  children: ReactNode;
  name?: string;
  shown?: boolean;
  dark?: boolean;
}) {
  const style = dark ? DARK_ACTOR_STYLE[actor] : ACTOR_STYLE[actor];

  return (
    <div
      className={`turn-in max-w-[86%] ${actor === "customer" ? "ml-auto" : "mr-auto"}`}
      data-shown={shown ? "true" : "false"}
    >
      <div className={`px-3.5 py-2.5 text-[0.92rem] leading-[1.5] ${style}`}>
        {name ? (
          <p className={`mb-1 text-[0.68rem] font-medium ${dark ? "text-chrome-paper/55" : "text-ink-faint"}`}>
            {name}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  );
}

export function Typing({ shown, dark = false }: { shown: boolean; dark?: boolean }) {
  return (
    <div
      className="turn-in mr-auto"
      data-shown={shown ? "true" : "false"}
      aria-live="polite"
      aria-label={shown ? "Lumi is typing" : undefined}
    >
      <div
        className={`inline-flex items-center gap-1.5 rounded-[16px] rounded-bl-[5px] px-3.5 py-3 ${
          dark ? "border border-indigo-line bg-indigo-ink-raised" : "border border-line bg-paper-raised"
        }`}
      >
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={`h-1.5 w-1.5 rounded-full animate-dot ${dark ? "bg-chrome-paper/70" : "bg-indigo"}`}
            style={{ animationDelay: `${index * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/** Inline confirmations: in stock, size, ship date. */
export function StatusRow({
  items,
  shown = true,
  dark = false,
}: {
  items: readonly string[];
  shown?: boolean;
  dark?: boolean;
}) {
  return (
    <div className="turn-in flex flex-wrap gap-1.5" data-shown={shown ? "true" : "false"}>
      {items.map((item) => (
        <span
          key={item}
          data-numeric
          className={`inline-flex items-center gap-1.5 rounded-chip px-2.5 py-1.5 text-[0.74rem] font-medium ${
            dark
              ? "border border-sage-dark-tint-line bg-sage-dark-tint text-sage-dark"
              : "border border-sage/20 bg-sage-tint text-sage"
          }`}
        >
          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2.5 6.3 4.7 8.5 9.5 3.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {item}
        </span>
      ))}
    </div>
  );
}

/**
 * What Lumi looked at before answering. This is the detail that separates an
 * agent from a chatbot, so it is never decorative — each chip names a real
 * source from the demo data.
 */
export function SourceChips({
  sources,
  shown = true,
  dark = false,
}: {
  sources: readonly string[];
  shown?: boolean;
  dark?: boolean;
}) {
  return (
    <div className="turn-in flex flex-wrap items-center gap-1.5" data-shown={shown ? "true" : "false"}>
      <span className={`text-[0.68rem] ${dark ? "text-chrome-paper/45" : "text-ink-faint"}`}>Used</span>
      {sources.map((source) => (
        <span
          key={source}
          className={`rounded-[7px] px-2 py-1 text-[0.7rem] font-medium ${
            dark
              ? "border border-indigo-dark-chip-line bg-indigo-dark-chip-tint text-indigo-dark-chip-ink"
              : "border border-indigo/15 bg-indigo-tint text-indigo"
          }`}
        >
          {source}
        </span>
      ))}
    </div>
  );
}

/** Composer bar. Non-functional by design — this is a demonstration. */
export function Composer({ placeholder = "Ask about an order, a size, a return…" }: { placeholder?: string }) {
  return (
    <div className="flex items-center gap-2 border-t border-line px-4 py-3 md:px-5">
      <span className="t-small flex-1 truncate text-ink-faint">{placeholder}</span>
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-[9px] border border-line bg-paper text-ink-faint"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8h9.5M9 4.5 12.5 8 9 11.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
