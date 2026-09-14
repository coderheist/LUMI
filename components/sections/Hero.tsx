import { ProductTag } from "@/components/lumi/ProductCard";
import { DemoButton } from "@/components/sections/DemoButton";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { HERO_COPY } from "@/lib/data";
import type { CSSProperties } from "react";

/**
 * The campaign footage sits behind the whole hero, and a paper scrim keeps the
 * left column on solid ground rather than floating white text over video — the
 * page stays a light editorial piece instead of becoming a dark video header.
 *
 * The conversation itself is not repeated here: the floating agent in the
 * bottom corner is the live demonstration, and showing the same panel inline
 * would put the product on screen twice.
 *
 * This is the site's one orchestrated moment — a single load sequence with
 * everything on the same easing, arriving in reading order. Scroll-driven
 * entrances start below this section, where there is scroll to drive them.
 */
const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="enter-settle absolute inset-0">
        <BackgroundVideo name="hero-loop" priority />
      </div>

      {/* Ambient warmth drifting behind the scrim — small and slow, so it
          reads as alive rather than as a static gradient. */}
      <div aria-hidden className="hero-bloom pointer-events-none absolute inset-0" />

      {/* Vertical scrim on small screens where the text sits over the footage;
          horizontal on large, where the text has its own column. The text
          needs full opacity behind it, but the photo has to actually clear by
          partway down — reaching from-0%/via-38% keeps the fade fast enough
          that a real band of the section shows the photo, rather than only a
          sliver right at the edge. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-paper from-0% via-paper/80 via-38% to-paper/6 lg:bg-gradient-to-r lg:from-paper lg:via-paper/82 lg:to-transparent"
      />
      {/* Blends into the next section. Short and low-opacity on its own —
          the scrim above already does most of the fade, so this must not
          re-cover the band it just revealed. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-paper lg:h-24"
      />

      <div className="shell relative grid min-h-[30rem] items-center gap-12 pt-28 pb-16 sm:min-h-[34rem] md:pt-36 md:pb-24 lg:min-h-[46rem] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="t-eyebrow enter" style={delay(60)}>
            {HERO_COPY.eyebrow}
          </p>

          <h1 className="t-display enter-mask mt-5" style={delay(140)}>
            <span>{HERO_COPY.headline}</span>
          </h1>

          <p className="t-lead enter mt-7 max-w-[34rem]" style={delay(320)}>
            {HERO_COPY.lead}
          </p>

          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={delay(440)}>
            <ButtonLink href="/contact" size="lg">
              Start free
            </ButtonLink>
            <DemoButton />
          </div>

          <p className="t-micro enter mt-5" style={delay(560)}>
            {HERO_COPY.trustLine}
          </p>
        </div>

        {/* Labels the garment in the campaign shot, the way a lookbook would. */}
        <div className="relative hidden lg:col-span-6 lg:block lg:min-h-[26rem]">
          <ProductTag
            id="nova-linen-overshirt"
            className="enter-scale absolute bottom-6 right-0 w-fit"
            style={delay(900)}
          />
        </div>
      </div>
    </section>
  );
}
