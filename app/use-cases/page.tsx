import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/FinalCta";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Showcase } from "@/components/sections/Showcase";
import { UseCases } from "@/components/sections/UseCases";
import { PageHeader } from "@/components/site/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { FIT_SCRIPT } from "@/lib/data";
import { LumiMark } from "@/components/lumi/Chat";
import { Media } from "@/components/ui/Media";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "Six conversations that make up most of a fashion brand's support volume — discovery, order tracking, returns, size and fit, policy questions and human handoff.",
  alternates: { canonical: "/use-cases" },
};

export default function UseCasesPage() {
  return (
    <>
      <PageHeader
        title="Six conversations, handled."
        lead="Most ecommerce support volume is the same handful of questions arriving over and over. Here is what each one looks like when an agent answers it properly."
        actions={
          <ButtonLink href="/contact" size="lg">
            Start free
          </ButtonLink>
        }
      />

      <UseCases />

      {/* Size and fit gets its own treatment — it is the use case that pays for
          itself twice, once in support and once in returns. */}
      <Section id="fit" tone="sunken" space="loose">
        <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="relative h-[24rem] overflow-hidden rounded-panel sm:h-[30rem] lg:h-[34rem]">
              <Media name="editorial-male" fill sizes="(max-width: 1024px) 100vw, 45vw" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="t-h2 max-w-[18ch]">The fit question decides the return.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-lead mt-5">
                Lumi answers sizing from the size guide and from what customers with the same
                measurements actually kept.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-9 rounded-panel border border-line bg-paper-raised p-5 md:p-6">
                <p className="ml-auto w-fit rounded-[16px] rounded-br-[5px] bg-ink/[0.055] px-3.5 py-2.5 text-[0.95rem]">
                  {FIT_SCRIPT.question}
                </p>

                <ul className="mt-5 flex flex-col gap-2.5 border-y border-line py-4">
                  {FIT_SCRIPT.retrieval.map((row) => (
                    <li key={row.source} className="flex items-baseline justify-between gap-4">
                      <span className="text-[0.84rem] text-ink-soft">{row.source}</span>
                      <span className="text-right text-[0.82rem] text-ink-faint">{row.detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex gap-3">
                  <LumiMark />
                  <p className="flex-1 rounded-[16px] rounded-bl-[5px] border border-line border-l-2 border-l-indigo bg-white px-3.5 py-2.5 text-[0.95rem]">
                    {FIT_SCRIPT.answer}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <LiveDemo />

      <Section space="normal">
        <div className="shell">
          <SectionHead
            title="Everything Lumi says comes from somewhere."
            lead="The catalogue below is the demo store this template ships with. Every product carries the fields Lumi cites when a customer asks."
          />
        </div>
      </Section>

      <Showcase />
      <FinalCta />
    </>
  );
}
