"use client";

import { useEffect, useRef, useState } from "react";
import { ChatShell, Composer, LumiMark, SourceChips, StatusRow, Turn, Typing } from "@/components/lumi/Chat";
import { ProductCardCompact } from "@/components/lumi/ProductCard";
import { WIDGET_SCRIPT } from "@/lib/data";
import { useConversation, useReducedMotion } from "@/lib/hooks";

/** Only Lumi pauses to type. Module scope keeps the identity stable. */
const TYPING_BEFORE = [false, true, false, true] as const;

/**
 * The agent, demonstrated as the thing it actually is: a support widget that
 * follows the page and opens on click.
 *
 * This is the only conversation surface on the page. The hero deliberately
 * does not repeat it inline — one agent, in the place a real one would be.
 */
export function LumiWidget() {
  const [open, setOpen] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const { shown, typing } = useConversation(WIDGET_SCRIPT.length, {
    active: open,
    typingBefore: TYPING_BEFORE,
    typingMs: 900,
    readMs: 1250,
  });

  // Arrives after the hero's load sequence has finished rather than competing
  // with it, which is also how a real support widget behaves.
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), reduced ? 0 : 1400);
    return () => clearTimeout(timer);
  }, [reduced]);

  // Escape closes and returns focus to the launcher, as a dialog should.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Follow the thread as it arrives.
  useEffect(() => {
    const node = bodyRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [shown, typing, reduced]);

  const answered = shown >= 2;

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6"
      data-visible={ready ? "true" : "false"}
    >
      {/* Panel grows out of the launcher corner rather than fading in flat. */}
      <div
        ref={panelRef}
        id="lumi-widget-panel"
        role="dialog"
        aria-label="Chat with Lumi"
        aria-modal="false"
        hidden={!open}
        className="pointer-events-auto w-[min(23rem,calc(100vw-2rem))] origin-bottom-right"
        style={{ animation: open ? "m-widget-in 320ms var(--ease-out-expo) both" : undefined }}
      >
        <ChatShell
          channel="Website · nova.com"
          floating
          bodyRef={bodyRef}
          bodyClassName="max-h-[22rem]"
          footer={<Composer placeholder="Ask about sizing, delivery, returns…" />}
        >
          <Turn actor="customer" shown={shown >= 1} name="You">
            {WIDGET_SCRIPT[0].text}
          </Turn>

          <Turn actor="lumi" shown={answered}>
            {WIDGET_SCRIPT[1].text}
          </Turn>

          {answered ? (
            <>
              <SourceChips sources={["Size guide", "Return data"]} shown={answered} />
              <ProductCardCompact id="nova-relaxed-denim" shown={answered} delay={120} />
            </>
          ) : null}

          <Turn actor="customer" shown={shown >= 3} name="You">
            {WIDGET_SCRIPT[2].text}
          </Turn>

          <Turn actor="lumi" shown={shown >= 4}>
            {WIDGET_SCRIPT[3].text}
          </Turn>

          {shown >= 4 ? (
            <StatusRow items={["In stock", "32W × 34L", "Ships today"]} shown={shown >= 4} />
          ) : null}

          <Typing shown={typing} />
        </ChatShell>
      </div>

      {/* Teaser, shown once, dismissed the moment the visitor engages. */}
      {!open && !teaserDismissed && ready ? (
        <button
          onClick={() => {
            setOpen(true);
            setTeaserDismissed(true);
          }}
          className="widget-teaser pointer-events-auto hidden max-w-[15rem] rounded-[16px] rounded-br-[5px] border border-line bg-paper-raised px-3.5 py-2.5 text-left text-[0.86rem] shadow-lift sm:block"
        >
          Ask me about sizing, delivery or returns.
        </button>
      ) : null}

      <button
        ref={launcherRef}
        onClick={() => {
          setOpen((value) => !value);
          setTeaserDismissed(true);
        }}
        aria-expanded={open}
        aria-controls="lumi-widget-panel"
        aria-label={open ? "Close the Lumi chat" : "Open the Lumi chat"}
        className="widget-launcher pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-[18px] bg-indigo text-white shadow-float transition-[transform,background-color,opacity] duration-[var(--motion-base)] ease-[var(--ease-out-expo)] hover:scale-[1.06] hover:bg-indigo-hover active:scale-95"
      >
        {open ? (
          <svg viewBox="0 0 18 18" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" strokeLinecap="round" />
          </svg>
        ) : (
          <>
            <LumiMark tone="bare" className="h-8 w-8" />
            <span
              aria-hidden
              className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-paper bg-sage"
            />
          </>
        )}
      </button>
    </div>
  );
}
