import { ProductTag } from "@/components/lumi/ProductCard";
import { DemoButton } from "@/components/sections/DemoButton";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
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

      {/* Vertical scrim on small screens where the text sits over the footage;
          horizontal on large, where the text has its own column. Lighter on the
          right now that nothing floats there — the campaign shot carries it. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-paper via-paper/92 to-paper/45 lg:bg-gradient-to-r lg:from-paper lg:via-paper/82 lg:to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper"
      />

      <div className="shell relative grid items-center gap-12 pt-28 pb-16 md:pt-36 md:pb-24 lg:min-h-[46rem] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="t-eyebrow enter" style={delay(60)}>
            AI customer support for commerce
          </p>

          <h1 className="t-display enter-mask mt-5" style={delay(140)}>
            <span>Turn every customer conversation into a sale.</span>
          </h1>

          <p className="t-lead enter mt-7 max-w-[34rem]" style={delay(320)}>
            Lumi answers questions, recommends products, tracks orders and resolves support
            issues automatically — across every channel your customers use.
          </p>

          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={delay(440)}>
            <ButtonLink href="/contact" size="lg">
              Start free
            </ButtonLink>
            <DemoButton />
          </div>

          <p className="t-micro enter mt-5" style={delay(560)}>
            No credit card required · Setup in minutes
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
