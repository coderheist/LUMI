"use client";

import { LumiMark } from "@/components/lumi/Chat";
import { IntegrationsContent } from "@/components/sections/Integrations";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { KNOWLEDGE_SOURCES, POLICY_SCRIPT } from "@/lib/data";
import { useInView, useRetrieval } from "@/lib/hooks";

const CONNECTORS = ["Upload PDF", "Connect Shopify", "Connect help centre", "Sync product catalogue"];

/**
 * Knowledge and Integrations used to be two full Sections back to back —
 * same content, but each paying the section's own top/bottom padding.
 * Folding Integrations in as a second, internally-divided block keeps both
 * stories and halves that padding: fewer full-height beats in the run
 * between Showcase and Pricing, not less content.
 */
export function Knowledge({ withIntegrations = true }: { withIntegrations?: boolean }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const indexing = useRetrieval(KNOWLEDGE_SOURCES.length, {
    active: inView,
    stepMs: 340,
    settleMs: 420,
  });

  return (
    <Section id="knowledge" space="loose" tone="sunken">
      <div className="shell" ref={ref}>
        <SectionHead
          title="Teach Lumi your business."
          lead="Connect the documents your team already argues about — policies, size guides, the catalogue — and every answer comes back with the page it came from."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-panel border border-line bg-paper-raised">
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <p className="text-[0.86rem] font-medium">Lumi knowledge · NOVA</p>
                <span className="t-micro">
                  {indexing.resolved ? "In sync" : "Indexing"}
                </span>
              </div>

              <ul>
                {KNOWLEDGE_SOURCES.map((source, index) => {
                  const done = indexing.checked > index;
                  return (
                    <li
                      key={source.name}
                      className="flex items-center gap-3 border-b border-line px-5 py-3.5 last:border-b-0"
                    >
                      <span
                        aria-hidden
                        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                          done ? "border-sage bg-sage" : "border-line-strong"
                        }`}
                      >
                        {done ? (
                          <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke="#fff" strokeWidth="1.9">
                            <path d="M2 5.2 4 7.2 8 3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : null}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.9rem]">{source.name}</p>
                        <p className="t-micro truncate">{source.kind}</p>
                      </div>
                      <span data-numeric className="shrink-0 text-[0.78rem] text-ink-faint">
                        {source.count}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {CONNECTORS.map((item) => (
                <button
                  key={item}
                  className="rounded-chip border border-line-strong px-3 py-1.5 text-[0.8rem] font-medium text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Retrieval, quoted passage, grounded answer. Genuinely a sequence,
              so the steps are numbered. */}
          <div className="lg:col-span-7">
            <ol className="flex flex-col gap-4">
              <Step index={1} title="A customer asks">
                <p className="inline-flex rounded-[14px] rounded-bl-[4px] bg-ink/[0.055] px-3.5 py-2.5 text-[0.95rem]">
                  {POLICY_SCRIPT.question}
                </p>
              </Step>

              <Step index={2} title="Lumi retrieves the passage">
                <blockquote className="border-l-2 border-indigo bg-paper-raised px-4 py-3">
                  <p className="text-[0.92rem] leading-relaxed text-ink-soft">
                    {POLICY_SCRIPT.passage}
                  </p>
                  <p className="t-micro mt-2.5">{POLICY_SCRIPT.citation}</p>
                </blockquote>
              </Step>

              <Step index={3} title="And answers with the source attached">
                <div className="flex gap-3">
                  <LumiMark />
                  <div className="min-w-0 flex-1">
                    <p className="rounded-[16px] rounded-bl-[5px] border border-line border-l-2 border-l-indigo bg-paper-raised px-3.5 py-2.5 text-[0.95rem] leading-relaxed">
                      {POLICY_SCRIPT.answer}
                    </p>
                    <p className="t-micro mt-2">Source: {POLICY_SCRIPT.citation}</p>
                  </div>
                </div>
              </Step>
            </ol>

            <p className="t-small mt-6 border-t border-line pt-5">
              When two documents disagree, Lumi reports the conflict instead of silently preferring
              one of them.
            </p>
          </div>
        </div>
      </div>

      {withIntegrations ? (
        <div id="integrations" className="shell mt-20 border-t border-line pt-16 md:mt-28 md:pt-20">
          <IntegrationsContent />
        </div>
      ) : null}
    </Section>
  );
}

function Step({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="li" delay={index * 90} className="flex gap-4">
      <span
        data-numeric
        aria-hidden
        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-strong text-[0.78rem] font-medium"
      >
        {index}
      </span>
      <div className="min-w-0 flex-1">
        <p className="mb-2.5 text-[0.86rem] font-medium">{title}</p>
        {children}
      </div>
    </Reveal>
  );
}
