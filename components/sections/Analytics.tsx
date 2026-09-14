"use client";

import { VolumeChart } from "@/components/lumi/VolumeChart";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ANALYTICS_METRICS, TOP_QUESTIONS } from "@/lib/data";
import { useCountUp, useInView } from "@/lib/hooks";

export function Analytics() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <Section id="analytics" tone="dark" space="loose" className="overflow-hidden">
      <div aria-hidden className="grid-field absolute inset-0 opacity-60" />

      <div className="shell relative" ref={ref}>
        <div className="max-w-[40rem]">
          <Reveal>
            <h2 className="t-h2">See what your customers need.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-lead mt-5">
              Support volume is the most honest product research you have. Lumi sorts it, so the
              pattern is visible before it becomes a returns problem.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-indigo-line bg-indigo-line sm:grid-cols-2 lg:grid-cols-4">
          {ANALYTICS_METRICS.map((metric, index) => (
            <MetricTile key={metric.label} metric={metric} active={inView} delay={index * 90} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="rounded-panel border border-indigo-line bg-indigo-ink-raised p-5 md:p-7 lg:col-span-7">
            <VolumeChart />
          </div>

          <div className="rounded-panel border border-indigo-line bg-indigo-ink-raised p-5 md:p-7 lg:col-span-5">
            <h3 className="text-[1rem] font-medium">What customers ask about</h3>
            <p className="mt-1 text-[0.78rem] text-ink-soft">
              Share of conversations, and how many Lumi closed without a person
            </p>

            <ul className="mt-7 flex flex-col gap-4">
              {TOP_QUESTIONS.map((row, index) => (
                <QuestionBar key={row.question} row={row} active={inView} delay={index * 70} />
              ))}
            </ul>
          </div>
        </div>

        <p className="t-micro mt-6">
          Dashboard figures are illustrative demo data generated for this template.
        </p>
      </div>
    </Section>
  );
}

function MetricTile({
  metric,
  active,
  delay,
}: {
  metric: (typeof ANALYTICS_METRICS)[number];
  active: boolean;
  delay: number;
}) {
  const decimals = Number.isInteger(metric.value) ? 0 : 1;
  const count = useCountUp(metric.value, { active, duration: 1300 + delay, decimals });

  return (
    <div className="bg-indigo-ink-raised p-5 md:p-6">
      <p data-numeric className="text-[2.1rem] font-medium tracking-[-0.04em] text-chrome-paper md:text-[2.4rem]">
        {"prefix" in metric && metric.prefix ? metric.prefix : ""}
        {count}
        {metric.suffix}
      </p>
      <p className="mt-1 text-[0.86rem] text-chrome-paper/55">{metric.label}</p>
      {/* Sage marks a resolved/automated signal everywhere on the site — here,
          a positive quarter-over-quarter change. */}
      <p className="mt-2.5 text-[0.75rem] text-sage-dark">{metric.delta} vs last quarter</p>
    </div>
  );
}

function QuestionBar({
  row,
  active,
  delay,
}: {
  row: (typeof TOP_QUESTIONS)[number];
  active: boolean;
  delay: number;
}) {
  return (
    <li>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[0.86rem] text-chrome-paper/80">{row.question}</span>
        <span data-numeric className="shrink-0 text-[0.8rem] text-chrome-paper">
          {row.share}%
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-chrome-paper/[0.08]">
        <div
          className="h-full rounded-full transition-[width] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: active ? `${(row.share / 28) * 100}%` : "0%",
            transitionDelay: `${delay}ms`,
            backgroundColor: "var(--color-chart-automated)",
          }}
        />
      </div>
      {/* Sage: the share of this question Lumi resolved without escalating. */}
      <p className="mt-1.5 text-[0.72rem] text-sage-dark">
        <span data-numeric>{row.resolved}%</span> closed without a person
      </p>
    </li>
  );
}
