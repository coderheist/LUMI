"use client";

import { DemoNote, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { INBOUND_QUESTIONS, INBOX_LOAD } from "@/lib/data";
import { useCountUp, useInView } from "@/lib/hooks";

/** Arrival times, all outside NOVA's 09:00–17:30 support hours. */
const ARRIVALS = ["02:14", "03:48", "05:02", "06:19", "07:33", "08:05"] as const;

export function Problem() {
  return (
    <Section id="problem" space="loose">
      <div className="shell">
        <Reveal>
          <h2 className="t-h1 max-w-[24ch]">Your customers don&rsquo;t wait for business hours.</h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="t-small mb-7 text-ink">
              Questions that arrived at NOVA overnight, before anyone was online
            </p>

            <ol className="spine flex flex-col gap-3.5">
              {INBOUND_QUESTIONS.map((question, index) => (
                <Reveal as="li" key={question} delay={index * 80} className="spine-node">
                  <div className="flex items-baseline gap-3">
                    <span
                      data-numeric
                      className="shrink-0 text-[0.72rem] text-ink-faint"
                    >
                      {ARRIVALS[index]}
                    </span>
                    <p className="rounded-[14px] rounded-bl-[4px] bg-ink/[0.055] px-3.5 py-2.5 text-[0.95rem] leading-snug">
                      {question}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6">
            <InboxLoad />
          </div>
        </div>

        <Reveal>
          <div className="mt-16 border-t border-line pt-10 lg:mt-20">
            <p className="t-h3 max-w-[38ch]">
              Lumi handles the repetitive conversations automatically, and leaves your team the ones
              that need a person.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function InboxLoad() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });

  return (
    <div ref={ref}>
      <p className="t-small mb-7 text-ink">What the support team opened at 09:00</p>

      <div className="overflow-hidden rounded-panel border border-line bg-paper-raised">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <p className="text-[0.86rem] font-medium">Shared inbox · NOVA</p>
          <span className="t-micro">Monday, 09:00</span>
        </div>

        <ul>
          {INBOX_LOAD.map((row, index) => (
            <InboxRow
              key={row.label}
              label={row.label}
              value={row.value}
              active={inView}
              delay={index * 110}
              urgent={row.label === "Unanswered"}
            />
          ))}
        </ul>
      </div>

      <DemoNote className="mt-5">
        A representative overnight queue for a mid-size brand, used to illustrate the problem.
      </DemoNote>
    </div>
  );
}

function InboxRow({
  label,
  value,
  active,
  delay,
  urgent,
}: {
  label: string;
  value: number;
  active: boolean;
  delay: number;
  urgent: boolean;
}) {
  const count = useCountUp(value, { active, duration: 1100 + delay });

  return (
    <li className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 last:border-b-0">
      <span className={`text-[0.95rem] ${urgent ? "text-ochre" : "text-ink-soft"}`}>{label}</span>
      <span
        data-numeric
        className={`text-[1.4rem] font-medium tracking-[-0.03em] ${urgent ? "text-ochre" : "text-ink"}`}
      >
        {count}
      </span>
    </li>
  );
}
