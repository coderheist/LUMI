import { ProductTag } from "@/components/lumi/ProductCard";
import { Recommender } from "@/components/lumi/Recommender";
import { ChannelsContent } from "@/components/sections/Channels";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * Discovery and Channels used to be two full Sections back to back — same
 * content, but each paying the section's own top/bottom padding. Folding
 * Channels in as a second, internally-divided block keeps both stories and
 * halves that padding, which is the point: fewer full-height beats in the
 * run between Showcase and Pricing, not less content.
 */
export function Discovery() {
  return (
    <Section id="discovery" tone="sunken" space="loose">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <div className="relative h-[24rem] overflow-hidden rounded-panel sm:h-[30rem] lg:h-[34rem]">
              <Media
                name="editorial-female-walking"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <ProductTag id="nova-relaxed-denim" className="absolute bottom-4 left-4" />
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal>
              <h2 className="t-h2 max-w-[20ch]">Your best salesperson knows every product.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-lead mt-5">
                Lumi reads the whole NOVA catalogue — fabric, fit, stock, price — and puts together
                pieces that work as an outfit, not a list of search results.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-9">
                <Recommender />
              </div>
            </Reveal>

            <p className="t-micro mt-5">
              Style match is an illustrative score generated for this demo catalogue.
            </p>
          </div>
        </div>
      </div>

      <div id="channels" className="shell mt-20 border-t border-line pt-16 md:mt-28 md:pt-20">
        <ChannelsContent />
      </div>
    </Section>
  );
}
