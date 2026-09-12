import { ProductCard } from "@/components/lumi/ProductCard";
import { ProductQuery } from "@/components/lumi/ProductQuery";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { PRODUCTS } from "@/lib/data";

export function Showcase() {
  return (
    <>
      {/* Full-bleed editorial band — breaks the run of UI panels. */}
      <Reveal
        variant="open"
        className="relative h-[22rem] overflow-hidden sm:h-[28rem] lg:h-[34rem]"
      >
        <Media name="lifestyle-group" fill sizes="100vw" className="parallax-media" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
        <div className="shell absolute inset-x-0 bottom-0 pb-10">
          <p className="max-w-[24ch] text-[1.6rem] font-medium leading-tight tracking-[-0.03em] text-paper md:text-[2.1rem]">
            NOVA sells 412 products. Lumi has read every one of them.
          </p>
        </div>
      </Reveal>

      <Section id="catalogue" space="loose">
        <div className="shell">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="t-h2 max-w-[16ch]">The catalogue Lumi answers from.</h2>
            <p className="t-small max-w-[34ch]">
              Every product below carries fabric, fit, care and stock data. Those fields are what
              Lumi cites when a customer asks.
            </p>
          </div>

          {/* Horizontal rail on small screens, grid on large. */}
          <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12 lg:overflow-visible">
            {PRODUCTS.map((product, index) => (
              <Reveal
                key={product.id}
                delay={(index % 4) * 60}
                className="w-[62vw] shrink-0 snap-start sm:w-[38vw] lg:w-auto"
              >
                <ProductCard id={product.id} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid items-center gap-10 border-t border-line pt-14 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <VideoFrame
                name="catalogue-loop"
                caption=""
                ratio={16 / 10}
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <h3 className="t-h2 max-w-[18ch]">Every angle comes from the same record.</h3>
              </Reveal>
              <Reveal delay={80}>
                <p className="t-lead mt-5">
                  A shopper turning a product over is asking the same questions they would ask a
                  person: how does it sit, what is the back like, how heavy is the fabric. Lumi
                  answers those from the product record rather than making the customer guess from
                  one photograph.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      <Section space="normal" tone="sunken">
        <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="t-h2 max-w-[18ch]">Ask Lumi about this product.</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-lead mt-5">
                Fabric, fit and care questions arrive constantly, and every one of them is already
                answered somewhere in your product data.
              </p>
            </Reveal>

            {/* The loop carries this section, so it gets the full column at a
                portrait ratio rather than sharing the row with a still. */}
            <div className="mt-8">
              <VideoFrame
                name="commerce-loop"
                caption=""
                ratio={4 / 5}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <ProductQuery id="nova-linen-overshirt" />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
