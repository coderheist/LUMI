import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { INTEGRATIONS } from "@/lib/data";

/**
 * Named in type rather than drawn as logo artwork — a template should not ship
 * third-party trademarks, and naming what each connection actually reads is
 * more useful than a wall of icons.
 */
export function Integrations() {
  return (
    <Section id="integrations" space="loose">
      <div className="shell">
        <SectionHead
          title="Connected to the systems your store already runs on."
          lead="Lumi needs three things to be useful: your catalogue, your orders, and somewhere to hand a conversation over."
          aside={
            <span className="inline-flex rounded-chip border border-line-strong px-3 py-1.5 text-[0.8rem] text-ink-soft">
              Example integrations
            </span>
          }
          align="wide"
        />

        <div className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {/* The lift lives on an inner element: the Reveal wrapper is already
              animating transform, and an animation beats a hover rule on the
              same property. */}
          {INTEGRATIONS.map((integration, index) => (
            <Reveal
              key={integration.name}
              delay={(index % 4) * 50}
              className="border-b border-r border-line"
            >
              <div className="card-lift group h-full bg-paper p-6 hover:bg-paper-raised">
                <p className="text-[1.05rem] font-medium tracking-[-0.025em]">{integration.name}</p>
                <p className="t-small mt-1.5">{integration.kind}</p>
                <span
                  aria-hidden
                  className="mt-4 block h-px w-6 origin-left bg-line-strong transition-[transform,background-color] duration-[var(--motion-base)] ease-[var(--ease-out-expo)] group-hover:scale-x-[2.5] group-hover:bg-indigo"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <p className="t-micro mt-6 max-w-[60ch]">
          Connection names describe what a production integration would read or write. This template
          ships the interface, not a live connection, and claims no partnership or endorsement.
        </p>
      </div>
    </Section>
  );
}
