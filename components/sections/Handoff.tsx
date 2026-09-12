import { LumiMark } from "@/components/lumi/Chat";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { HANDOFF } from "@/lib/data";

const FLOW = [
  { title: "Lumi handles the conversation", detail: "Answers, checks stock, confirms the exchange is possible." },
  { title: "It reaches something it should not decide", detail: HANDOFF.confidence },
  { title: "The thread transfers to a person", detail: "Routed by your rules — team, region, or plan." },
  { title: "That person starts with everything", detail: "No re-introduction, no asking the customer to repeat." },
] as const;

export function Handoff() {
  return (
    <Section id="handoff" space="loose">
      <div className="shell">
        <SectionHead
          title="AI when it can. Humans when it should."
          lead="An agent that never escalates is not confident, it is careless. Lumi is built to recognise the edge of what it should decide."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <ol className="spine flex flex-col gap-7">
              {FLOW.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={index * 90}
                  className="spine-node"
                  data-actor={index < 2 ? "lumi" : undefined}
                >
                  <h3 className="text-[1.02rem] font-medium tracking-[-0.018em]">{step.title}</h3>
                  <p className="t-small mt-1.5">{step.detail}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-panel border border-line bg-paper-raised shadow-lift">
                <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
                  <span className="grid h-7 w-7 place-items-center rounded-[9px] bg-ochre/15 text-[0.78rem] font-medium text-ochre">
                    PR
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.86rem] font-medium">Priya Raman</p>
                    <p className="t-micro">NOVA support · Helpdesk</p>
                  </div>
                  <span className="rounded-chip border border-ochre/25 bg-ochre-tint px-2 py-1 text-[0.68rem] font-medium text-ochre">
                    Escalated
                  </span>
                </div>

                <dl className="px-5 py-4">
                  {[
                    { term: "Customer", value: HANDOFF.customer },
                    { term: "Order", value: HANDOFF.order },
                    { term: "Issue", value: HANDOFF.issue },
                  ].map((row) => (
                    <div
                      key={row.term}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-b-0"
                    >
                      <dt className="t-small">{row.term}</dt>
                      <dd data-numeric className="text-right text-[0.9rem]">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mx-5 mb-4 flex gap-3 rounded-card border border-line bg-paper px-4 py-3.5">
                  <LumiMark />
                  <div className="min-w-0 flex-1">
                    <p className="t-micro mb-1">Lumi summary</p>
                    <p className="text-[0.9rem] leading-relaxed">{HANDOFF.summary}</p>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <p className="t-micro mb-2.5">Attached</p>
                  <div className="flex flex-wrap gap-1.5">
                    {HANDOFF.attached.map((item) => (
                      <span
                        key={item}
                        data-numeric
                        className="rounded-[7px] border border-indigo/15 bg-indigo-tint px-2 py-1 text-[0.72rem] font-medium text-indigo"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <button className="mt-5 w-full rounded-[10px] bg-ink px-3 py-2.5 text-[0.88rem] font-medium text-paper transition-colors duration-200 hover:bg-[#262220]">
                    Take over conversation
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
