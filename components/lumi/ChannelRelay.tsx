"use client";

import { Turn } from "@/components/lumi/Chat";
import { RELAY_STEPS } from "@/lib/data";
import { useConversation, useInView } from "@/lib/hooks";

const TYPING_BEFORE = [false, true, true, false, true] as const;

/**
 * One thread crossing three channels. The channel marker only appears when the
 * conversation actually moves, so the markers record a real transition rather
 * than labelling every message.
 */
export function ChannelRelay() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { shown } = useConversation(RELAY_STEPS.length, {
    active: inView,
    typingBefore: TYPING_BEFORE,
    typingMs: 620,
    readMs: 900,
  });

  return (
    <div ref={ref} className="spine flex flex-col gap-4">
      {RELAY_STEPS.map((step, index) => {
        const visible = shown > index;
        const moved = index === 0 || RELAY_STEPS[index - 1].channel !== step.channel;

        return (
          <div key={`${step.channel}-${index}`} className="spine-node" data-actor={step.actor === "customer" ? undefined : "lumi"}>
            {moved ? (
              <div
                className="turn-in mb-2.5 flex items-center gap-2"
                data-shown={visible ? "true" : "false"}
              >
                <span className="rounded-[7px] border border-line-strong bg-paper px-2 py-1 text-[0.72rem] font-medium">
                  {step.channel}
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>
            ) : null}

            <Turn
              actor={step.actor}
              shown={visible}
              name={step.actor === "customer" ? "Alex Morgan" : step.actor === "human" ? "Priya · NOVA support" : undefined}
            >
              {step.text}
            </Turn>

            <p
              className="turn-in mt-1.5 text-[0.72rem] text-ink-faint"
              data-shown={visible ? "true" : "false"}
              style={{ marginLeft: step.actor === "customer" ? "auto" : undefined, width: "fit-content" }}
            >
              {step.note}
            </p>
          </div>
        );
      })}
    </div>
  );
}
