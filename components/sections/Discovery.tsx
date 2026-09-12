import { ProductTag } from "@/components/lumi/ProductCard";
import { Recommender } from "@/components/lumi/Recommender";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

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
    </Section>
  );
}
