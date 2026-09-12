import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { COMPLIANCE_TAGS, SECURITY_FEATURES } from "@/lib/data";

export function Security() {
  return (
    <Section id="security" tone="sunken" space="loose">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="t-h2 max-w-[16ch]">Your customer data stays yours.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="t-lead mt-5">
              Lumi reads orders, addresses and conversation history. The controls around that are
              part of the product, not an enterprise upsell.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-8">
              <p className="t-small mb-3 text-ink">Enterprise security features</p>
              <div className="flex flex-wrap gap-2">
                {COMPLIANCE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-chip border border-line-strong bg-paper-raised px-3 py-1.5 text-[0.82rem] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="t-micro mt-3 max-w-[46ch]">
                Shown as product capabilities. This is a template demonstration and does not assert
                that any certification has been audited or granted.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="border-t border-line">
            {SECURITY_FEATURES.map((feature, index) => (
              <Reveal
                as="li"
                key={feature.title}
                delay={index * 60}
                className="flex flex-col gap-1.5 border-b border-line py-5 sm:flex-row sm:gap-8"
              >
                <h3 className="text-[0.98rem] font-medium tracking-[-0.015em] sm:w-[15rem] sm:shrink-0">
                  {feature.title}
                </h3>
                <p className="t-small sm:flex-1">{feature.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
