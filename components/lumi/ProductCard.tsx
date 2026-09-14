import { Media } from "@/components/ui/Media";
import { productById } from "@/lib/data";
import type { AssetKey } from "@/lib/assets";

/**
 * NOVA product card. Three presentations, one component: compact inside a
 * conversation, full in the catalogue grid, and a label that sits over
 * editorial photography.
 */

export function ProductCardCompact({
  id,
  match,
  shown = true,
  delay = 0,
}: {
  id: string;
  /** Style-match score, shown only where Lumi actually produced one. */
  match?: number;
  shown?: boolean;
  delay?: number;
}) {
  const product = productById(id);

  return (
    <article
      className="turn-in flex gap-3 overflow-hidden rounded-card border border-line bg-paper-raised p-2.5"
      data-shown={shown ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <Media
        name={product.image as AssetKey}
        className="w-[72px] shrink-0 rounded-[10px]"
        sizes="72px"
        quiet
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div>
          <p className="t-micro">NOVA</p>
          {/* Not a heading: a product inside a chat turn is a label, not a
              section of the document. */}
          <p className="truncate text-[0.92rem] font-medium tracking-[-0.012em]">{product.name}</p>
          <p data-numeric className="mt-0.5 text-[0.88rem] text-ink-soft">
            ${product.price}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="rounded-[8px] border border-line-strong px-2.5 py-1 text-[0.74rem] font-medium transition-colors duration-200 hover:border-ink">
            View product
          </button>
          <button className="rounded-[8px] bg-ink px-2.5 py-1 text-[0.74rem] font-medium text-paper transition-colors duration-200 hover:bg-ink-hover">
            Add to cart
          </button>
          {match !== undefined ? (
            <span
              data-numeric
              className="ml-auto shrink-0 rounded-[7px] border border-indigo/15 bg-indigo-tint px-1.5 py-1 text-[0.7rem] font-medium text-indigo"
            >
              {match}% match
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/**
 * Catalogue card.
 *
 * The hover does three things at once, all on one easing: the image settles
 * closer, the card lifts off the page, and a quick-add bar rises from the
 * bottom edge of the image. Sizes are listed rather than hidden behind the
 * action, because a fashion shopper's first question is whether their size
 * exists at all.
 */
export function ProductCard({ id, className = "" }: { id: string; className?: string }) {
  const product = productById(id);

  return (
    <article
      className={`group relative flex flex-col transition-transform duration-[var(--motion-base)] ease-[var(--ease-out-expo)] hover:-translate-y-1 ${className}`}
    >
      <div className="relative overflow-hidden rounded-card border border-line bg-paper-raised transition-[border-color,box-shadow] duration-[var(--motion-base)] ease-[var(--ease-out-expo)] group-hover:border-line-strong group-hover:shadow-lift">
        <Media
          name={product.image as AssetKey}
          className="transition-transform duration-[760ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.045]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Rises from behind the bottom edge on hover, and on keyboard focus
            so it is reachable without a pointer. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full p-2.5 opacity-0 transition-[transform,opacity] duration-[var(--motion-base)] ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <button className="pointer-events-auto w-full rounded-[10px] bg-ink/92 px-3 py-2 text-[0.82rem] font-medium text-paper backdrop-blur-sm transition-colors duration-200 hover:bg-ink">
            Add to cart
          </button>
        </div>
      </div>

      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[0.98rem] font-medium tracking-[-0.015em]">{product.name}</h3>
          <p className="t-micro mt-1">
            {product.colour} · {product.category}
          </p>
        </div>
        <p data-numeric className="shrink-0 text-[0.98rem] tabular-nums">
          ${product.price}
        </p>
      </div>

      {/* Sizes fade up under the card on hover rather than sitting there all
          the time — the grid stays quiet until you engage with a card. */}
      <p
        data-numeric
        className="t-micro mt-1.5 translate-y-1 opacity-0 transition-[transform,opacity] duration-[var(--motion-base)] ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100"
      >
        {product.sizes.join(" · ")}
      </p>
    </article>
  );
}

/** Price label that sits over a campaign image. */
export function ProductTag({
  id,
  className = "",
  style,
}: {
  id: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const product = productById(id);

  return (
    <div
      style={style}
      className={`inline-flex items-center gap-3 rounded-[12px] border border-white/25 bg-white/85 px-3 py-2 backdrop-blur-md ${className}`}
    >
      <div className="min-w-0">
        <p className="text-[0.6rem] font-medium tracking-[0.14em] text-ink-soft uppercase">NOVA</p>
        <p className="truncate text-[0.86rem] font-medium tracking-[-0.012em]">{product.name}</p>
      </div>
      <p data-numeric className="shrink-0 text-[0.86rem]">
        ${product.price}
      </p>
    </div>
  );
}
