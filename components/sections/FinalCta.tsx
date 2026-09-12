import { DemoButton } from "@/components/sections/DemoButton";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { FINAL_CTA_COPY } from "@/lib/data";

/**
 * The one centred composition on the site. Everything else is left-aligned
 * editorial, so centring here reads as an ending rather than as a default.
 */
export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Media name="cta-editorial" fill sizes="100vw" quiet className="parallax-media" />
        <div aria-hidden className="absolute inset-0 bg-ink/55" />
      </div>

      <div className="shell relative py-28 text-center md:py-40">
        <Reveal>
          <h2 className="t-h1 mx-auto max-w-[20ch] text-paper">{FINAL_CTA_COPY.headline}</h2>
        </Reveal>

        <Reveal delay={90}>
          <p className="mx-auto mt-6 max-w-[48ch] text-[1.1rem] leading-relaxed text-paper/75">
            {FINAL_CTA_COPY.lead}
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" variant="inverse" size="lg">
              Start free
            </ButtonLink>
            <div className="[&_button]:border-paper/40 [&_button]:text-paper hover:[&_button]:border-paper hover:[&_button]:bg-paper/10">
              <DemoButton label="Watch demo" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 text-[0.8rem] text-paper/55">{FINAL_CTA_COPY.trustLine}</p>
        </Reveal>
      </div>
    </section>
  );
}
