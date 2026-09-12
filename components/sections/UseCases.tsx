import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { USE_CASES } from "@/lib/data";

/**
 * Six use cases laid out on a ruled grid rather than as six identical boxes.
 * Each one shows the customer's words, what Lumi does about them, and which
 * capability that needs — so the grid carries information, not decoration.
 */
export function UseCases() {
  return (
    <Section id="use-cases" space="loose" ruled>
      <div className="shell">
        <SectionHead
          title="From question to resolution."
          lead="The same six conversations make up most of a fashion brand's support volume. Here is what Lumi does with each of them."
        />

        <div className="mt-14 grid border-t border-line md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((item, index) => (
            <Reveal
              key={item.slug}
              delay={(index % 3) * 70}
              className="group border-b border-line px-0 py-8 md:px-7 md:odd:border-r lg:odd:border-r-0 lg:[&:not(:nth-child(3n))]:border-r"
            >
              <article className="flex h-full flex-col">
                <p className="inline-flex w-fit rounded-[14px] rounded-bl-[4px] bg-ink/[0.055] px-3 py-2 text-[0.88rem] leading-snug">
                  {item.question}
                </p>

                <div className="mt-4 flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-150"
                  />
                  <p className="text-[0.92rem] leading-relaxed">{item.answer}</p>
                </div>

                <h3 className="t-h3 mt-6">{item.title}</h3>
                <span
                  aria-hidden
                  className="mt-2 block h-px w-8 origin-left bg-indigo transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[3.5]"
                />

                <p className="t-small mt-4 flex-1">{item.detail}</p>

                <p className="mt-5 text-[0.78rem] text-ink-faint transition-colors duration-300 group-hover:text-indigo">
                  {item.capability}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
