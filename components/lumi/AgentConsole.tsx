"use client";

import { useState } from "react";
import { ChatShell, SourceChips, Turn, Typing } from "@/components/lumi/Chat";
import { OrderProgress } from "@/components/lumi/OrderProgress";
import { ReturnAction } from "@/components/lumi/ReturnAction";
import { RETURN_SCRIPT, TRACKING_SCRIPT } from "@/lib/data";
import { useConversation, useInView, useRetrieval } from "@/lib/hooks";

const OPENING = [false, true] as const;

const CASES = [
  {
    id: "tracking",
    tab: "Order status",
    channel: "Website · nova.com/account/orders",
    script: TRACKING_SCRIPT,
  },
  {
    id: "returns",
    tab: "Return request",
    channel: "WhatsApp · +31 6 •• •• 41",
    script: RETURN_SCRIPT,
  },
] as const;

export function AgentConsole() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [active, setActive] = useState(0);
  const current = CASES[active];

  return (
    <div ref={ref}>
      {/* Equal columns so the indicator can slide a fixed distance rather than
          being measured at runtime. */}
      <div
        role="tablist"
        aria-label="Agent demonstrations"
        className="relative mb-5 inline-grid grid-cols-2 gap-1 rounded-chip border border-indigo-line bg-indigo-ink-raised p-1"
      >
        <span
          aria-hidden
          className="absolute inset-y-1 left-1 w-[calc(50%-0.375rem)] rounded-[7px] bg-paper transition-transform duration-[var(--motion-base)] ease-[var(--ease-out-expo)]"
          style={{ transform: `translateX(calc(${active} * (100% + 0.25rem)))` }}
        />
        {CASES.map((item, index) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={`relative z-10 rounded-[7px] px-3.5 py-2 text-[0.85rem] font-medium transition-colors duration-[var(--motion-base)] ${
              index === active ? "text-ink" : "text-paper/60 hover:text-paper"
            }`}
          >
            {item.tab}
          </button>
        ))}
      </div>

      {/* Keyed so switching tabs replays the case from the top. */}
      <Case key={current.id} data={current} active={inView} />
    </div>
  );
}

function Case({
  data,
  active,
}: {
  data: (typeof CASES)[number];
  active: boolean;
}) {
  const { script } = data;
  const opening = useConversation(2, {
    active,
    typingBefore: OPENING,
    typingMs: 780,
    readMs: 620,
  });

  const retrieval = useRetrieval(script.retrieval.length, {
    active: opening.shown >= 2,
    stepMs: 640,
    settleMs: 560,
  });

  const answered = retrieval.resolved;

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
      <ChatShell channel={data.channel} tone="dark" bodyClassName="min-h-[20rem]">
        <Turn actor="customer" shown={opening.shown >= 1} name="Alex Morgan" dark>
          {script.question}
        </Turn>

        <Turn actor="lumi" shown={opening.shown >= 2} dark>
          {script.acknowledge}
        </Turn>

        <Turn actor="lumi" shown={answered} dark>
          {script.answer}
        </Turn>

        {answered ? (
          <SourceChips
            sources={script.retrieval.map((row) => row.source)}
            shown={answered}
            dark
          />
        ) : null}

        <Typing shown={opening.typing || (opening.shown >= 2 && !answered)} dark />
      </ChatShell>

      <div className="relative flex flex-col gap-4 overflow-hidden rounded-panel border border-indigo-line bg-indigo-ink-raised p-4 md:p-5">
        {/* A single scan passes across the panel while sources are being
            checked, and stops the moment the answer resolves. */}
        {opening.shown >= 2 && !answered ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-indigo-dark-active/12 to-transparent motion-safe:animate-[m-sweep_2.1s_var(--ease-out-quint)_infinite]"
          />
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.85rem] font-medium text-paper">Lumi context</p>
          <span className="text-[0.72rem] text-paper/45">
            {answered ? "Resolved" : retrieval.checked > 0 ? "Retrieving" : "Idle"}
          </span>
        </div>

        <ul className="flex flex-col">
          {script.retrieval.map((row, index) => {
            const done = retrieval.checked > index;
            const busy = retrieval.checked === index && opening.shown >= 2 && !done;

            return (
              <li
                key={row.source}
                className="flex items-start gap-3 border-b border-indigo-line py-3 last:border-b-0"
              >
                <span
                  aria-hidden
                  className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                    done
                      ? "border-sage-dark-line bg-sage-dark-line"
                      : busy
                        ? "border-indigo-dark-active"
                        : "border-indigo-line"
                  }`}
                >
                  {done ? (
                    <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke="#fff" strokeWidth="1.9">
                      <path d="M2 5.2 4 7.2 8 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : busy ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-dark-active animate-blink" />
                  ) : null}
                </span>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[0.84rem] transition-colors duration-300 ${
                      done ? "text-paper" : "text-paper/45"
                    }`}
                  >
                    {row.source}
                  </p>
                  <p className="mt-0.5 truncate text-[0.76rem] text-paper/40">{row.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto rounded-card border border-indigo-line bg-indigo-ink p-4">
          {data.id === "tracking" ? (
            <OrderProgress dark shown={answered} />
          ) : (
            <ReturnAction dark shown={answered} />
          )}
        </div>
      </div>
    </div>
  );
}
