import { DemoNote, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CUSTOMER_BRANDS, HEADLINE_METRICS } from "@/lib/data";

/**
 * Wordmarks are set typographically rather than drawn as logo files. These are
 * fictional brands, so imitating real logo artwork would be both dishonest and
 * a trademark problem — giving each a distinct type treatment reads as a logo
 * row without pretending to be one.
 */
const WORDMARK_STYLE: Record<string, string> = {
  NOVA: "font-semibold tracking-[0.22em]",
  Morrow: "font-medium tracking-[-0.03em] text-[1.35rem]",
  Aster: "font-normal italic tracking-[0.01em] text-[1.3rem]",
  "Common Goods": "font-medium tracking-[0.04em] text-[0.98rem] uppercase",
  Northline: "font-semibold tracking-[-0.04em] text-[1.3rem]",
  Luma: "font-light tracking-[0.3em] text-[1.15rem]",
};

export function TrustStrip() {
  return (
    <Section tone="sunken" space="tight" ruled>
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="shrink-0">
            <p className="t-small max-w-[18ch] text-ink">Trusted by modern commerce teams</p>
          </div>

          {/* Two copies of the list so the track can loop seamlessly. The
              duplicate is hidden from assistive tech. */}
          <div className="marquee min-w-0 flex-1">
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex shrink-0 items-center gap-x-12 pr-12 lg:gap-x-16 lg:pr-16"
                >
                  {CUSTOMER_BRANDS.map((brand) => (
                    <li key={brand}>
                      <span
                        className={`whitespace-nowrap text-[1.15rem] text-ink/70 ${WORDMARK_STYLE[brand] ?? ""}`}
                      >
                        {brand}
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {HEADLINE_METRICS.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 70} className="bg-paper-raised p-5 md:p-6">
              <p
                data-numeric
                className="text-[2.1rem] font-medium tracking-[-0.04em] md:text-[2.4rem]"
              >
                {metric.value}
              </p>
              <p className="t-small mt-1">{metric.label}</p>
            </Reveal>
          ))}
        </div>

        <DemoNote className="mt-5">
          Figures shown throughout this template are illustrative demo values, not measured results.
        </DemoNote>
      </div>
    </Section>
  );
}
