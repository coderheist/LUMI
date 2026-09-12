"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { useTween } from "@/lib/hooks";

/** Stated plainly next to the result, because a calculator that hides its
 *  assumptions is just a number generator. */
const ASSUMPTIONS = {
  minutesPerConversation: 6,
  lumiAutomationCeiling: 0.72,
  assistedPurchaseRate: 0.04,
};

const INPUTS = [
  {
    key: "conversations",
    label: "Conversations per month",
    min: 500,
    max: 40000,
    step: 500,
    initial: 6000,
    format: (value: number) => value.toLocaleString("en-GB"),
  },
  {
    key: "cost",
    label: "Support cost per hour",
    min: 12,
    max: 90,
    step: 1,
    initial: 28,
    format: (value: number) => `$${value}`,
  },
  {
    key: "aov",
    label: "Average order value",
    min: 25,
    max: 600,
    step: 5,
    initial: 140,
    format: (value: number) => `$${value}`,
  },
  {
    key: "automation",
    label: "Conversations you automate today",
    min: 0,
    max: 70,
    step: 1,
    initial: 22,
    format: (value: number) => `${value}%`,
  },
] as const;

type Key = (typeof INPUTS)[number]["key"];

export function Roi() {
  const [values, setValues] = useState<Record<Key, number>>(() =>
    Object.fromEntries(INPUTS.map((input) => [input.key, input.initial])) as Record<Key, number>,
  );

  const conversations = values.conversations;
  const currentAutomation = values.automation / 100;
  const uplift = Math.max(0, ASSUMPTIONS.lumiAutomationCeiling - currentAutomation);

  const extraAutomated = Math.round(conversations * uplift);
  const totalAutomated = Math.round(conversations * ASSUMPTIONS.lumiAutomationCeiling);
  const hoursSaved = (extraAutomated * ASSUMPTIONS.minutesPerConversation) / 60;
  const monthlySaving = hoursSaved * values.cost;
  const assistedRevenue = conversations * ASSUMPTIONS.assistedPurchaseRate * values.aov;

  return (
    <Section id="roi" space="loose" ruled>
      <div className="shell">
        <SectionHead
          title="What that is worth, on your numbers."
          lead="Move the inputs to match your store. The assumptions behind each result are written underneath it."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-7">
              {INPUTS.map((input) => (
                <div key={input.key}>
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor={input.key} className="text-[0.92rem]">
                      {input.label}
                    </label>
                    <span data-numeric className="text-[1.05rem] font-medium">
                      {input.format(values[input.key])}
                    </span>
                  </div>
                  <input
                    id={input.key}
                    type="range"
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    value={values[input.key]}
                    onChange={(event) =>
                      setValues((previous) => ({
                        ...previous,
                        [input.key]: Number(event.target.value),
                      }))
                    }
                    className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-line-strong accent-indigo"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2">
              <Result
                label="Conversations Lumi handles"
                value={totalAutomated}
                format={(value) => Math.round(value).toLocaleString("en-GB")}
                note={`At up to ${Math.round(ASSUMPTIONS.lumiAutomationCeiling * 100)}% automation`}
              />
              <Result
                label="Support hours freed each month"
                value={hoursSaved}
                format={(value) => Math.round(value).toLocaleString("en-GB")}
                note={`${ASSUMPTIONS.minutesPerConversation} minutes of agent time per conversation`}
              />
              <Result
                label="Estimated monthly saving"
                value={monthlySaving}
                format={(value) => `$${Math.round(value).toLocaleString("en-GB")}`}
                note="Hours freed × your hourly support cost"
              />
              <Result
                label="Potential assisted revenue"
                value={assistedRevenue}
                format={(value) => `$${Math.round(value).toLocaleString("en-GB")}`}
                note={`${Math.round(ASSUMPTIONS.assistedPurchaseRate * 100)}% of conversations ending in a purchase`}
              />
            </div>

            <Reveal>
              <p className="t-micro mt-5 max-w-[62ch]">
                These are estimates built from the assumptions shown, not a forecast. Your automation
                ceiling depends on your catalogue, your policies and how much you let Lumi decide.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Result({
  label,
  value,
  format,
  note,
}: {
  label: string;
  value: number;
  format: (value: number) => string;
  note: string;
}) {
  const tweened = useTween(value);

  return (
    <div className="bg-paper-raised p-5 md:p-6">
      <p className="t-small">{label}</p>
      <p
        data-numeric
        className="mt-2 text-[2rem] font-medium tracking-[-0.04em] md:text-[2.3rem]"
      >
        {format(tweened)}
      </p>
      <p className="t-micro mt-2">{note}</p>
    </div>
  );
}
