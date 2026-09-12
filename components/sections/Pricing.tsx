import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { FAQS, PLANS, PLAN_MATRIX } from "@/lib/data";

/**
 * Three plans, three different treatments rather than three identical cards:
 * the recommended plan sits on a raised surface with an indigo rule, the others
 * are separated by hairlines only.
 */
export function PricingPlans({ heading = true }: { heading?: boolean }) {
  return (
    <Section id="pricing" space="loose" ruled={heading}>
      <div className="shell">
        {heading ? (
          <SectionHead
            title="Pricing that follows conversations, not seats."
            lead="A conversation is one customer thread in a 24-hour window, however many messages it contains and whichever channel it moves through."
          />
        ) : null}

        <div className={`grid gap-px overflow-hidden rounded-panel border border-line bg-line lg:grid-cols-3 ${heading ? "mt-14" : ""}`}>
          {PLANS.map((plan, index) => (
            <Reveal
              key={plan.name}
              delay={index * 80}
              className={`flex flex-col p-6 md:p-8 ${
                plan.featured ? "bg-paper-raised" : "bg-paper"
              }`}
            >
              {plan.featured ? (
                <span aria-hidden className="mb-6 block h-[3px] w-12 rounded-full bg-indigo" />
              ) : (
                <span aria-hidden className="mb-6 block h-[3px] w-12 rounded-full bg-line-strong" />
              )}

              <div className="flex items-baseline justify-between gap-3">
                <h3 className="t-h3">{plan.name}</h3>
                {plan.featured ? (
                  <span className="rounded-chip border border-indigo/20 bg-indigo-tint px-2.5 py-1 text-[0.72rem] font-medium text-indigo">
                    Most teams start here
                  </span>
                ) : null}
              </div>

              <p className="t-small mt-2.5 min-h-[2.8rem]">{plan.audience}</p>

              <p className="mt-6 flex items-baseline gap-2">
                <span
                  data-numeric
                  className="text-[2.6rem] font-medium tracking-[-0.045em]"
                >
                  {plan.price}
                </span>
                <span className="t-small">{plan.cadence}</span>
              </p>

              <ButtonLink
                href="/contact"
                variant={plan.featured ? "primary" : "outline"}
                size="md"
                className="mt-6 w-full"
              >
                {plan.cta}
              </ButtonLink>

              <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-line pt-6">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <svg
                      viewBox="0 0 12 12"
                      className="mt-[5px] h-3 w-3 shrink-0 text-indigo"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden
                    >
                      <path d="M2.5 6.3 4.7 8.5 9.5 3.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span data-numeric className="text-[0.9rem] leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="t-micro mt-5 border-t border-line pt-4">{plan.limits}</p>
            </Reveal>
          ))}
        </div>

        <p className="t-micro mt-5">
          Prices are illustrative template content. Every plan includes human handoff — an agent that
          cannot escalate is not a feature tier.
        </p>
      </div>
    </Section>
  );
}

export function PlanMatrix() {
  return (
    <Section tone="sunken" space="normal">
      <div className="shell">
        <h2 className="t-h3">Compare plans</h2>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-line-strong">
                <th className="py-3.5 text-[0.86rem] font-medium">Feature</th>
                {PLANS.map((plan) => (
                  <th key={plan.name} className="py-3.5 text-[0.86rem] font-medium">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLAN_MATRIX.map((row) => (
                <tr key={row.feature} className="border-b border-line">
                  <th scope="row" className="py-3.5 pr-6 text-[0.9rem] font-normal text-ink-soft">
                    {row.feature}
                  </th>
                  <td data-numeric className="py-3.5 pr-6 text-[0.9rem]">
                    {row.starter}
                  </td>
                  <td data-numeric className="py-3.5 pr-6 text-[0.9rem]">
                    {row.growth}
                  </td>
                  <td data-numeric className="py-3.5 text-[0.9rem]">
                    {row.scale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

export function Faq() {
  return (
    <Section space="normal" ruled>
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="t-h2">Questions we get asked.</h2>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-line">
            {FAQS.map((item) => (
              <li key={item.q} className="border-b border-line">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5">
                    <span className="text-[1rem] font-medium tracking-[-0.015em]">{item.q}</span>
                    <span
                      aria-hidden
                      className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line-strong"
                    >
                      <span className="h-px w-2.5 bg-ink" />
                      <span className="absolute h-2.5 w-px bg-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="t-body pb-5 pr-10">{item.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
