/**
 * Image manifest.
 *
 * Every image on the site is referenced by key, never by path. Each entry
 * carries the alt text, aspect ratio, art direction and — deliberately —
 * the prompt it should be generated from, so the manifest doubles as the
 * brief for the photography.
 *
 * `available: false` means no file has been supplied yet and <Media> renders
 * an art-directed plate instead. To use real photography: drop the file at
 * `public/images/<file>` and flip `available` to true. No component changes.
 *
 * `focus` is the object-position used on narrow screens, where a centre crop
 * would cut a face or a product in half.
 */

export type AssetKey =
  | "hero-campaign"
  | "editorial-female-walking"
  | "editorial-male"
  | "editorial-duo"
  | "editorial-beige-jacket"
  | "lifestyle-group"
  | "detail-denim"
  | "detail-stitching"
  | "product-linen-overshirt"
  | "product-relaxed-denim"
  | "product-everyday-sneaker"
  | "product-utility-jacket"
  | "product-black-denim"
  | "product-crossbody"
  | "product-cotton-shirt"
  | "product-neutral-knit"
  | "cta-editorial";

export type Asset = {
  file: string;
  alt: string;
  /** width / height */
  ratio: number;
  available: boolean;
  /**
   * Installed, but cut from the low-resolution contact sheet rather than a
   * full-resolution export — so it is soft at large sizes. Replace when the
   * original is available. Kept as a separate flag so `available` still means
   * "there is a file here" and the outstanding work stays visible.
   */
  provisional?: boolean;
  /** Plate treatment when no file is supplied. */
  plate: "editorial" | "product" | "detail";
  /** Short label shown on the plate so placeholders read as art direction. */
  label: string;
  focus?: { mobile?: string; desktop?: string };
  prompt: string;
};

const EDITORIAL_STYLE =
  "High-end DTC ecommerce campaign photography, not magazine-cover styling. " +
  "Natural daylight, realistic skin texture with visible pores, natural hair, " +
  "correct hands, realistic fabric folds and shadows. 50mm equivalent, natural " +
  "depth of field. Contemporary minimalist architecture, neutral concrete and " +
  "stone. Warm neutral grade. No plastic skin, no over-smoothing.";

const PRODUCT_STYLE =
  "Premium ecommerce studio product photograph on a seamless warm off-white " +
  "background (#F2EFEA). Soft single-source lighting from upper left, soft " +
  "natural contact shadow. Straight-on, consistent camera height and scale " +
  "across the range. Realistic fabric weave and stitching. No props, no people.";

export const ASSETS: Record<AssetKey, Asset> = {
  "hero-campaign": {
    file: "hero-campaign.jpg",
    alt: "NOVA campaign photograph: model in an oversized bone linen overshirt and mid-indigo relaxed denim, standing in daylight against a pale stone wall.",
    ratio: 4 / 5,
    available: true,
    plate: "editorial",
    label: "NOVA SS26 · Campaign",
    // The hero is much wider than the 4:5 source, so a centred crop cuts the
    // model's head off. Bias upward to keep her face in the visible band.
    focus: { mobile: "68% 16%", desktop: "center 18%" },
    prompt: `Young adult female fashion model wearing an oversized cream linen overshirt, mid-indigo relaxed straight jeans, minimalist off-white leather sneakers and fine gold jewellery. Standing three-quarter body, relaxed posture, calm expression, looking slightly off camera. Pale concrete and stone architecture, warm late-afternoon daylight. Model occupies roughly 45% of the frame on the right, substantial negative space on the left for text. ${EDITORIAL_STYLE}`,
  },
  "editorial-female-walking": {
    file: "editorial-female-walking.jpg",
    alt: "Model walking through a modern city street in a relaxed blue shirt and wide-leg denim.",
    ratio: 3 / 4,
    available: true,
    provisional: true,
    plate: "editorial",
    label: "Editorial · Discovery",
    focus: { mobile: "58% center", desktop: "center" },
    prompt: `Young adult female walking naturally mid-stride through a modern architectural city street, wearing a relaxed blue cotton shirt, wide-leg mid-indigo denim and minimalist white sneakers, small leather crossbody bag. Candid, unposed, natural motion in the fabric. ${EDITORIAL_STYLE}`,
  },
  "editorial-male": {
    file: "editorial-male.jpg",
    alt: "Model in a white shirt and washed black straight denim against a concrete facade.",
    ratio: 3 / 4,
    available: true,
    provisional: true,
    plate: "editorial",
    label: "Editorial · Size and fit",
    focus: { mobile: "50% center", desktop: "center" },
    prompt: `Tall young adult male, approximately 6'1", wearing a crisp white cotton shirt tucked loosely into washed black straight-leg denim with minimalist white leather sneakers. Full body, standing square to camera against a board-formed concrete facade. Neutral expression. ${EDITORIAL_STYLE}`,
  },
  "editorial-duo": {
    file: "editorial-duo.jpg",
    alt: "Two models in coordinated neutral outfits in a modern urban setting.",
    ratio: 16 / 10,
    available: true,
    provisional: true,
    plate: "editorial",
    label: "Editorial · Brand",
    focus: { mobile: "50% center", desktop: "center" },
    prompt: `Two young adult models, one female in a bone linen overshirt and indigo relaxed denim, one male in an oat merino knit and washed black denim, standing together in a modern urban plaza with neutral stone architecture. Coordinated neutral palette, relaxed candid body language, natural daylight. Wide composition. ${EDITORIAL_STYLE}`,
  },
  "editorial-beige-jacket": {
    file: "editorial-beige-jacket.jpg",
    alt: "Model in a clay beige utility jacket over indigo denim.",
    ratio: 4 / 5,
    available: true,
    provisional: true,
    plate: "editorial",
    label: "Editorial · Outerwear",
    focus: { mobile: "55% center", desktop: "center" },
    prompt: `Young adult female wearing a boxy clay-beige cotton-ramie utility jacket over a white shirt and mid-indigo relaxed denim. Three-quarter body, hands in jacket pockets, soft overcast daylight, pale stone wall behind. ${EDITORIAL_STYLE}`,
  },
  "lifestyle-group": {
    file: "lifestyle-group.jpg",
    alt: "Three models in NOVA pieces on a city street in natural daylight.",
    ratio: 21 / 9,
    available: true,
    provisional: true,
    plate: "editorial",
    label: "Editorial · Lifestyle",
    focus: { mobile: "50% center", desktop: "center" },
    prompt: `Three young adult models of varied ethnicity in coordinated neutral NOVA pieces — bone linen overshirt, oat knit, washed black denim, indigo relaxed denim — walking together along a sunlit modern city street. Candid, natural group spacing, warm daylight. Very wide cinematic composition. ${EDITORIAL_STYLE}`,
  },
  "detail-denim": {
    file: "detail-denim.jpg",
    alt: "Close-up of indigo denim twill, topstitching and a metal shank button.",
    ratio: 1,
    available: true,
    plate: "detail",
    label: "13oz indigo twill",
    prompt: `Extreme close-up macro of 13oz rope-dyed mid-indigo denim twill, showing diagonal weave, honeycomb fade and gold topstitching along a seam. Raking soft light. ${PRODUCT_STYLE}`,
  },
  "detail-stitching": {
    file: "detail-stitching.jpg",
    alt: "Close-up of denim pocket topstitching and a folded hem.",
    ratio: 1,
    available: true,
    plate: "detail",
    label: "Felled seam",
    prompt: `Extreme close-up macro of a flat-felled seam on indigo denim with a bar tack and a copper rivet. Shallow depth of field. ${PRODUCT_STYLE}`,
  },
  "product-linen-overshirt": {
    file: "product-linen-overshirt.jpg",
    alt: "NOVA Linen Overshirt in bone, flat studio product photograph.",
    ratio: 4 / 5,
    available: true,
    provisional: true,
    plate: "product",
    label: "Linen Overshirt",
    prompt: `Bone-coloured washed linen overshirt with a camp collar, patch chest pocket and mother-of-pearl buttons, presented on an invisible mannequin, front view, sleeves falling naturally. ${PRODUCT_STYLE}`,
  },
  "product-relaxed-denim": {
    file: "product-relaxed-denim.jpg",
    alt: "NOVA Relaxed Denim in mid indigo, flat studio product photograph.",
    ratio: 4 / 5,
    available: true,
    provisional: true,
    plate: "product",
    label: "Relaxed Denim",
    prompt: `Mid-indigo relaxed straight-leg jeans, 13oz rope-dyed denim, five pocket, gold topstitching, laid flat and straight, front view, slight natural fold at the knee. ${PRODUCT_STYLE}`,
  },
  "product-everyday-sneaker": {
    file: "product-everyday-sneaker.jpg",
    alt: "NOVA Everyday Sneaker in off white, studio product photograph.",
    ratio: 4 / 5,
    available: true,
    provisional: true,
    plate: "product",
    label: "Everyday Sneaker",
    prompt: `Single off-white full-grain leather low-top sneaker with natural gum rubber sole, three-quarter side view, laces neatly tied. ${PRODUCT_STYLE}`,
  },
  "product-utility-jacket": {
    file: "product-utility-jacket.jpg",
    alt: "NOVA Soft Utility Jacket in clay beige, studio product photograph.",
    ratio: 4 / 5,
    available: true,
    provisional: true,
    plate: "product",
    label: "Soft Utility Jacket",
    prompt: `Clay-beige cotton-ramie canvas utility jacket, boxy cut, four patch pockets, presented on an invisible mannequin, front view. ${PRODUCT_STYLE}`,
  },
  "product-black-denim": {
    file: "product-black-denim.jpg",
    alt: "NOVA Black Straight Denim in washed black, studio product photograph.",
    ratio: 4 / 5,
    available: true,
    provisional: true,
    plate: "product",
    label: "Black Straight Denim",
    prompt: `Washed black straight-leg high-rise jeans, 12oz cotton, five pocket, tonal stitching, laid flat and straight, front view. ${PRODUCT_STYLE}`,
  },
  "product-crossbody": {
    file: "product-crossbody.jpg",
    alt: "NOVA Minimal Crossbody in espresso leather, studio product photograph.",
    ratio: 4 / 5,
    available: true,
    provisional: true,
    plate: "product",
    label: "Minimal Crossbody",
    prompt: `Small espresso vegetable-tanned leather crossbody bag, clean unbranded rectangular form, adjustable strap arranged neatly, three-quarter view. ${PRODUCT_STYLE}`,
  },
  "product-cotton-shirt": {
    file: "product-cotton-shirt.jpg",
    alt: "NOVA Oversized Cotton Shirt in optic white, studio product photograph.",
    ratio: 4 / 5,
    available: true,
    provisional: true,
    plate: "product",
    label: "Oversized Cotton Shirt",
    prompt: `Optic white organic poplin oversized shirt with a dropped shoulder and classic collar, presented on an invisible mannequin, front view. ${PRODUCT_STYLE}`,
  },
  "product-neutral-knit": {
    file: "product-neutral-knit.jpg",
    alt: "NOVA Neutral Knit in oat merino, studio product photograph.",
    ratio: 4 / 5,
    available: true,
    provisional: true,
    plate: "product",
    label: "Neutral Knit",
    prompt: `Oat-coloured merino lambswool crew-neck knit with ribbed hem and cuffs, folded flat with sleeves tucked, front view, visible knit texture. ${PRODUCT_STYLE}`,
  },
  "cta-editorial": {
    file: "cta-editorial.jpg",
    alt: "Sunlit pale stone wall with the shadows of leaves falling across it.",
    ratio: 16 / 9,
    available: true,
    provisional: true,
    plate: "editorial",
    label: "Editorial · Closing",
    focus: { mobile: "60% center", desktop: "center" },
    prompt: `Young adult female in a bone linen overshirt and indigo relaxed denim, seen from behind walking away down a sunlit minimalist stone corridor. Wide composition, strong negative space in the upper half for a headline. ${EDITORIAL_STYLE}`,
  },
};

export const asset = (key: AssetKey): Asset => ASSETS[key];

/* ------------------------------------------------------------------ Video */

/**
 * Short muted loops. Same contract as the image manifest: nothing references a
 * path directly, `available: false` falls back to the poster still, and the
 * prompt describes the clip that belongs there.
 *
 * Drop files into `public/video/` and flip `available` to true. Keep them
 * short and small — these are ambience, not content, and they must never
 * become the reason the page is slow.
 */
export type VideoKey = "hero-loop" | "discovery-loop" | "commerce-loop" | "catalogue-loop";

export type VideoAsset = {
  file: string;
  /** Still shown before playback, under reduced motion, and if no file exists. */
  poster: AssetKey;
  available: boolean;
  /** Native width / height. Reserves the box so loading causes no layout shift. */
  ratio: number;
  /** What the clip shows — used where the still stands in for it. */
  description: string;
  prompt: string;
};

export const VIDEOS: Record<VideoKey, VideoAsset> = {
  "hero-loop": {
    file: "hero-loop.mp4",
    poster: "hero-campaign",
    available: false,
    ratio: 16 / 9,
    description:
      "A model in NOVA pieces turning slowly in daylight against pale concrete, fabric moving.",
    prompt:
      "6–8 second seamless loop. Young adult female in an oversized cream linen overshirt and mid-indigo relaxed denim, turning slowly and shifting weight in warm afternoon daylight against a pale concrete wall. Very slow, minimal camera movement. Composition weighted to the right so the left half stays clear for text. Muted, no captions, no on-screen text.",
  },
  "discovery-loop": {
    file: "discovery-loop.mp4",
    poster: "editorial-female-walking",
    available: false,
    ratio: 16 / 9,
    description: "A model walking through a modern city street, denim and shirt moving naturally.",
    prompt:
      "8–10 second loop. Young adult female walking at an unhurried pace through modern architectural surroundings in a relaxed blue shirt and wide-leg indigo denim. Natural fabric movement, steady tracking shot, warm neutral grade.",
  },
  "commerce-loop": {
    file: "commerce-loop.mp4",
    poster: "detail-denim",
    available: true,
    ratio: 16 / 9,
    description: "Macro detail of denim twill and topstitching under raking light.",
    prompt:
      "5–6 second seamless loop. Extreme macro of rope-dyed indigo denim twill and gold topstitching, with the fabric turning very slowly under soft raking light. Shallow depth of field.",
  },
  "catalogue-loop": {
    file: "catalogue-loop.mp4",
    poster: "product-relaxed-denim",
    available: true,
    ratio: 16 / 9,
    description: "The Relaxed Denim turning slowly through a full rotation on a studio background.",
    prompt:
      "8 second seamless loop. A pair of mid-indigo relaxed straight-leg jeans on an invisible mannequin rotating slowly through a full 360 degrees on a seamless warm off-white background, single soft key light from the upper left, constant rotation speed with no easing.",
  },
};

export const video = (key: VideoKey): VideoAsset => VIDEOS[key];

/** Keys with no file at all. */
export const pendingAssets = (): AssetKey[] =>
  (Object.keys(ASSETS) as AssetKey[]).filter((key) => !ASSETS[key].available);

/**
 * Keys holding a low-resolution extract rather than a full export. These render
 * fine but are soft at large sizes, so they are the list to work through when
 * the originals arrive.
 */
export const provisionalAssets = (): AssetKey[] =>
  (Object.keys(ASSETS) as AssetKey[]).filter((key) => ASSETS[key].provisional === true);
