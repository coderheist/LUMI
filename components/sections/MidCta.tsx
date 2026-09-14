import { DemoButton } from "@/components/sections/DemoButton";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * A compact reinforcement beat, not the site's ending — that's FinalCta's
 * job. Nine sections run between Showcase and Pricing with no reminder to
 * act; this sits right after the catalogue demo, while it's still fresh.
 *
 * The one saturated band on the site rather than another paper section —
 * everything else in this palette is quiet cream, so a beat needs a real
 * colour shift to still register as a beat.
 */
export function MidCta() {
  return (
    // The important modifier is load-bearing: Section's default tone already
    // emits bg-paper at equal specificity, and Tailwind's generation order
    // (not this string's order) decides which same-specificity utility wins
    // — bg-ochre-tint! makes that deterministic instead of order-dependent.
    <Section className="bg-ochre-tint! text-ink" space="strip">
      <div className="shell flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <Reveal className="max-w-[28rem]">
          <p className="t-h3">See Lumi answer your own catalogue.</p>
          <p className="t-small mt-2">
            The demo above runs on NOVA&rsquo;s real product data — no setup to see it work.
          </p>
        </Reveal>

        <Reveal delay={80} className="flex shrink-0 items-center gap-3">
          <ButtonLink href="/contact" variant="inverse" size="md">
            Start free
          </ButtonLink>
          <DemoButton label="Watch demo" size="md" />
        </Reveal>
      </div>
    </Section>
  );
}
