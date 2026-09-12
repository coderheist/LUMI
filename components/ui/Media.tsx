import Image from "next/image";
import { asset, type AssetKey } from "@/lib/assets";

type MediaProps = {
  name: AssetKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Fill the nearest positioned ancestor instead of holding its own ratio. */
  fill?: boolean;
  /** Hide the plate's art-direction label (decorative crops, tight details). */
  quiet?: boolean;
};

/**
 * The only way images enter the page.
 *
 * When the manifest has a file, this is a next/image with the right sizes and
 * a mobile-specific focal point. When it does not, it renders an art-directed
 * plate carrying the shot's label — so an unshot frame reads as direction
 * rather than as a broken image.
 */
export function Media({
  name,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fill = false,
  quiet = false,
}: MediaProps) {
  const item = asset(name);

  const frame = fill
    ? `absolute inset-0 overflow-hidden ${className}`
    : `relative overflow-hidden ${className}`;

  const style = fill ? undefined : { aspectRatio: String(item.ratio) };

  if (item.available) {
    return (
      <div className={frame} style={style}>
        <Image
          src={`/images/${item.file}`}
          alt={item.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover [object-position:var(--focus-mobile)] md:[object-position:var(--focus-desktop)]"
          style={
            {
              "--focus-mobile": item.focus?.mobile ?? "center",
              "--focus-desktop": item.focus?.desktop ?? "center",
            } as React.CSSProperties
          }
        />
      </div>
    );
  }

  return (
    <div className={frame} style={style} role="img" aria-label={item.alt}>
      <Plate plate={item.plate} label={quiet ? undefined : item.label} seed={name} />
    </div>
  );
}

/** Stable small integer from the asset key, so a plate always looks the same. */
function seedIndex(seed: string, buckets: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 100000;
  return hash % buckets;
}

/**
 * Each plate type has a few variants so a grid of unshot frames reads as a set
 * of different photographs rather than one box repeated. The variant is chosen
 * from the asset key, so a given frame always looks the same.
 */
const PLATE_FIELDS = {
  editorial: [
    "radial-gradient(115% 85% at 70% 14%, #e0dacd 0%, transparent 60%), radial-gradient(95% 85% at 12% 92%, #c9d0de 0%, transparent 56%), linear-gradient(165deg, #eae5dc 0%, #d9d2c4 56%, #c4bcac 100%)",
    "radial-gradient(105% 80% at 24% 18%, #e6e0d2 0%, transparent 58%), radial-gradient(90% 90% at 88% 84%, #c6ccd8 0%, transparent 54%), linear-gradient(195deg, #e7e1d7 0%, #d3ccbe 60%, #bcb4a4 100%)",
    "radial-gradient(120% 95% at 52% 8%, #e3ddd0 0%, transparent 62%), radial-gradient(85% 75% at 8% 70%, #ccd2dd 0%, transparent 52%), linear-gradient(150deg, #ece7de 0%, #d6cfc1 52%, #c0b8a8 100%)",
    "radial-gradient(100% 90% at 82% 32%, #ded7c9 0%, transparent 58%), radial-gradient(95% 80% at 20% 96%, #cdd3df 0%, transparent 56%), linear-gradient(178deg, #e8e2d9 0%, #d1cabc 58%, #bdb5a5 100%)",
  ],
  product: [
    "radial-gradient(66% 54% at 50% 34%, #fdfcfa 0%, transparent 72%), linear-gradient(180deg, #f1ede6 0%, #e2dcd1 100%)",
    "radial-gradient(70% 58% at 46% 30%, #fdfbf8 0%, transparent 74%), linear-gradient(180deg, #efeae2 0%, #ded7cb 100%)",
    "radial-gradient(62% 52% at 54% 38%, #fefdfb 0%, transparent 70%), linear-gradient(184deg, #f2eee8 0%, #e0dad0 100%)",
  ],
  detail: [
    "radial-gradient(100% 100% at 28% 20%, #e4ded1 0%, transparent 64%), linear-gradient(142deg, #d6cfc2 0%, #c1b9a8 100%)",
    "radial-gradient(95% 95% at 74% 26%, #e1dacc 0%, transparent 62%), linear-gradient(118deg, #d2cbbd 0%, #bcb4a3 100%)",
    "radial-gradient(105% 105% at 40% 78%, #e6e0d4 0%, transparent 66%), linear-gradient(160deg, #d8d1c4 0%, #c4bcab 100%)",
  ],
} as const;

const WEAVE_ANGLES = [118, 96, 134, 108] as const;

function Plate({
  plate,
  label,
  seed,
}: {
  plate: "editorial" | "product" | "detail";
  label?: string;
  seed: string;
}) {
  const fields = PLATE_FIELDS[plate];
  const field = fields[seedIndex(seed, fields.length)];
  const weave = WEAVE_ANGLES[seedIndex(seed, WEAVE_ANGLES.length)];

  return (
    <div className="absolute inset-0" style={{ backgroundImage: field }}>
      {/* Woven texture — reads as cloth rather than as a grey box. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage: `repeating-linear-gradient(${weave}deg, rgb(23 21 19 / 0.055) 0 1px, transparent 1px 4px), repeating-linear-gradient(${weave - 90}deg, rgb(23 21 19 / 0.035) 0 1px, transparent 1px 5px)`,
        }}
      />

      {plate === "product" ? (
        <div
          aria-hidden
          className="absolute inset-x-[18%] bottom-[12%] h-[6%] rounded-[50%]"
          style={{
            background: "radial-gradient(50% 50% at 50% 50%, rgb(23 21 19 / 0.20), transparent 72%)",
          }}
        />
      ) : null}

      {/* Vignette — gives the frame a photographic falloff rather than a flat fill. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(78% 66% at 50% 42%, transparent 40%, rgb(23 21 19 / 0.16) 100%)",
        }}
      />

      <div aria-hidden className="absolute inset-0 border border-ink/10" />

      {/* Registration marks, as on a contact sheet. */}
      <div aria-hidden className="absolute left-3 top-3 h-4 w-4 border-l border-t border-ink/30" />
      <div aria-hidden className="absolute right-3 top-3 h-4 w-4 border-r border-t border-ink/30" />
      <div aria-hidden className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-ink/30" />
      <div aria-hidden className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-ink/30" />

      {label ? (
        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center text-[0.62rem] font-medium tracking-[0.2em] text-ink/50 uppercase">
          {label}
        </span>
      ) : null}
    </div>
  );
}
