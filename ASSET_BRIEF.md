# Lumi — asset brief

Everything the template needs: **19 images and 3 video loops**. Nothing else is referenced anywhere in the code.

## How to install what you produce

1. Save the file into `public/images/` (or `public/video/`) using the **exact filename** in the tables below.
2. Open `lib/assets.ts`, find that entry, and change `available: false` to `available: true`.

That's it — no component changes. Anything still `false` keeps rendering its art-directed placeholder plate, so you can add assets one at a time and the site stays presentable throughout.

## The look, in one paragraph

A premium DTC fashion campaign, not a magazine cover and not stock photography. Natural daylight, real skin texture, natural hair and hands, realistic fabric folds and shadows. Roughly 50mm, natural depth of field. Contemporary minimalist architecture — pale concrete, stone, neutral walls. Warm neutral grade throughout. The palette across every shot is bone / cream / optic white, mid-indigo and washed black denim, oat knit, clay beige, espresso leather. Every image must look like it came from the same brand on the same day.

**NOVA** is the fictional fashion store shown throughout. **Lumi** is the software being sold. Nothing in any photograph should reference Lumi — the product only ever appears as interface drawn in the browser.

---

## Images

### Campaign and editorial — 6 shots

These carry the brand. They are the ones worth spending the most effort on.

| # | Filename | Ratio | Where it appears |
|---|---|---|---|
| 1 | `hero-campaign.jpg` | 4:5 portrait | Homepage hero background, behind the headline; also the poster frame for the hero video |
| 2 | `editorial-female-walking.jpg` | 3:4 portrait | "Your best salesperson knows every product" on the homepage and product page |
| 3 | `editorial-male.jpg` | 3:4 portrait | Size-and-fit section on the use-cases page; Morrow customer story |
| 4 | `editorial-duo.jpg` | 16:10 landscape | NOVA customer story; one blog article header |
| 5 | `editorial-beige-jacket.jpg` | 4:5 portrait | About page |
| 6 | `lifestyle-group.jpg` | 21:9 ultrawide | Full-bleed band above the catalogue — "NOVA sells 412 products" |

**1 — `hero-campaign.jpg`**
Young adult woman in an oversized cream linen overshirt, mid-indigo relaxed straight jeans, minimalist off-white leather sneakers, fine gold jewellery. Three-quarter body, relaxed posture, calm expression, looking slightly off camera. Pale concrete and stone, warm late-afternoon daylight.
**Composition is critical:** she should sit in the right 45% of the frame with generous empty space on the left, because the headline sits over that side. A centred subject will not work here.
*Alt text in code:* NOVA campaign photograph: model in an oversized bone linen overshirt and mid-indigo relaxed denim, standing in daylight against a pale concrete wall.

**2 — `editorial-female-walking.jpg`**
Young adult woman mid-stride through a modern architectural street, relaxed blue cotton shirt, wide-leg mid-indigo denim, minimalist white sneakers, small leather crossbody. Candid and unposed, real motion in the fabric.

**3 — `editorial-male.jpg`**
Tall young adult man, roughly 6'1", crisp white cotton shirt loosely tucked into washed black straight-leg denim, minimalist white leather sneakers. Full body, square to camera, board-formed concrete behind, neutral expression. Full body matters — this illustrates a sizing recommendation.

**4 — `editorial-duo.jpg`**
Two models together in a modern urban plaza with neutral stone architecture: one in a bone linen overshirt and indigo denim, one in an oat merino knit and washed black denim. Relaxed, candid body language. Wide composition.

**5 — `editorial-beige-jacket.jpg`**
Young adult woman in a boxy clay-beige cotton-ramie utility jacket over a white shirt and mid-indigo denim. Three-quarter body, hands in pockets, soft overcast daylight, pale stone wall.

**6 — `lifestyle-group.jpg`**
Three models of varied ethnicity in coordinated neutral NOVA pieces walking together along a sunlit modern city street. Candid group spacing, warm daylight, very wide cinematic framing. Dark text sits over the lower portion, so keep the bottom third relatively uncluttered.

---

### Product shots — 8, all 4:5 portrait

One consistent studio setup across all eight: seamless warm off-white background (`#F2EFEA`), soft single-source light from upper left, soft natural contact shadow, same camera height and same scale. No props, no people, no lifestyle context. The point is that they read as one catalogue.

| # | Filename | Product | Detail |
|---|---|---|---|
| 7 | `product-linen-overshirt.jpg` | Linen Overshirt, $89 | Bone washed linen, camp collar, patch chest pocket, mother-of-pearl buttons. Invisible mannequin, front, sleeves falling naturally |
| 8 | `product-relaxed-denim.jpg` | Relaxed Denim, $110 | Mid-indigo 13oz rope-dyed, five pocket, gold topstitching. Laid flat and straight, front, slight natural fold at the knee |
| 9 | `product-everyday-sneaker.jpg` | Everyday Sneaker, $125 | Single off-white full-grain leather low-top, natural gum sole, three-quarter side view, laces neatly tied |
| 10 | `product-utility-jacket.jpg` | Soft Utility Jacket, $149 | Clay-beige cotton-ramie canvas, boxy, four patch pockets. Invisible mannequin, front |
| 11 | `product-black-denim.jpg` | Black Straight Denim, $110 | Washed black 12oz, high rise, straight leg, tonal stitching. Laid flat, front |
| 12 | `product-crossbody.jpg` | Minimal Crossbody, $79 | Small espresso vegetable-tanned leather bag, clean unbranded rectangular form, strap arranged neatly, three-quarter view |
| 13 | `product-cotton-shirt.jpg` | Oversized Cotton Shirt, $85 | Optic white organic poplin, dropped shoulder, classic collar. Invisible mannequin, front |
| 14 | `product-neutral-knit.jpg` | Neutral Knit, $120 | Oat merino lambswool crew neck, ribbed hem and cuffs, folded flat with sleeves tucked, visible knit texture |

---

### Fabric detail macros — 4, all 1:1 square

Extreme close-ups with raking soft light to bring out texture, shallow depth of field. These sit beside the "Ask Lumi about this product" panel, where the agent quotes fabric and care data — so the texture needs to be genuinely legible.

| # | Filename | Subject |
|---|---|---|
| 15 | `detail-linen.jpg` | Washed bone European linen: slubby weave, a soft fold, one mother-of-pearl button |
| 16 | `detail-denim.jpg` | 13oz rope-dyed mid-indigo twill: diagonal weave, honeycomb fade, gold topstitching along a seam |
| 17 | `detail-stitching.jpg` | Flat-felled seam on indigo denim with a bar tack and a copper rivet |
| 18 | `detail-label.jpg` | Small woven cotton care label stitched inside a garment, reading "NOVA" in clean small sans-serif with care symbols below |

---

### Closing image — 1

| # | Filename | Ratio | Where |
|---|---|---|---|
| 19 | `cta-editorial.jpg` | 16:9 landscape | Behind the closing call to action on every page |

**19 — `cta-editorial.jpg`**
Young adult woman in a bone linen overshirt and indigo denim seen **from behind**, walking away down a sunlit minimalist stone corridor. Wide composition with strong negative space in the upper half, because a large headline sits there. This one is darkened by a scrim in use, so a slightly brighter original works better than a moody one.

---

## Video loops — 3

All muted, seamlessly looping, no captions or on-screen text, warm neutral grade to match the stills. Keep each file small — these are ambience and must never be the reason the page is slow. Roughly 2–4 MB each is a sensible ceiling; H.264 MP4 is the safe format.

Each loop falls back to a still if you skip it, so these are genuinely optional.

| # | Filename | Length | Poster still | Where |
|---|---|---|---|---|
| V1 | `hero-loop.mp4` | 6–8s | `hero-campaign.jpg` | **Homepage hero background** — plays behind the headline and the chat panel |
| V2 | `discovery-loop.mp4` | 8–10s | `editorial-female-walking.jpg` | Product discovery section |
| V3 | `commerce-loop.mp4` | 5–6s | `detail-denim.jpg` | Fabric detail moment |

**V1 — `hero-loop.mp4`** *(the important one)*
Young adult woman in an oversized cream linen overshirt and mid-indigo relaxed denim, turning slowly and shifting weight in warm afternoon daylight against a pale concrete wall. Very slow, minimal camera movement — it sits behind a headline, so anything energetic will fight the text. Weight the composition to the right so the left half stays calm and uncluttered. It must loop without a visible cut.

**V2 — `discovery-loop.mp4`**
Young adult woman walking at an unhurried pace through modern architecture in a relaxed blue shirt and wide-leg indigo denim. Natural fabric movement, steady tracking shot.

**V3 — `commerce-loop.mp4`**
Extreme macro of rope-dyed indigo denim twill and gold topstitching, fabric turning very slowly under soft raking light. Shallow depth of field.

---

## Things that will break the look

- Visibly AI faces, plastic or over-smoothed skin, distorted hands, melted or impossible garment construction
- Product shots that do not share one lighting setup, background and camera height — inconsistency reads as a fake catalogue faster than anything else
- Generic corporate stock: people around laptops, headset call-centre imagery, handshakes
- Any AI cliché — robots, glowing brains, holographic heads, circuit-board overlays
- Real brand logos or recognisable trademarks on any garment
- Busy or high-contrast areas where headlines sit: the left half of `hero-campaign`, the upper half of `cta-editorial`, the lower third of `lifestyle-group`

## Renaming your generated set

The set you generated uses slightly different filenames than the manifest expects. Export each at full resolution and save it under the **target filename** below — then flip `available: true` on that entry.

**Installed already:** `hero-campaign.png` — done, live on the homepage hero.

### Names that already match — no rename needed

`editorial-female-walking` · `editorial-male` · `editorial-duo` · `editorial-beige-jacket` · `lifestyle-group` · `detail-denim`

### Needs renaming

| Your filename | Target filename | Which product / slot |
|---|---|---|
| `closing-cta.jpg` | `cta-editorial.jpg` | Closing call to action |
| `product-shirt-white.jpg` | `product-cotton-shirt.jpg` | Oversized Cotton Shirt, $85, optic white |
| `product-knit-oat.jpg` | `product-neutral-knit.jpg` | Neutral Knit, $120, oat |
| `product-jacket-beige.jpg` | `product-utility-jacket.jpg` | Soft Utility Jacket, $149, clay beige |
| `product-jeans-indigo.jpg` | `product-relaxed-denim.jpg` | Relaxed Denim, $110, mid indigo |
| `product-jeans-black.jpg` | `product-black-denim.jpg` | Black Straight Denim, $110, washed black |
| `product-sneaker-white.jpg` | `product-everyday-sneaker.jpg` | Everyday Sneaker, $125, off white |
| `product-bag-leather.jpg` | `product-crossbody.jpg` | Minimal Crossbody, $79, espresso |
| `detail-cotton.jpg` | `detail-linen.jpg` | Fabric macro in the "Ask Lumi about this product" trio |
| `detail-jacket.jpg` | `detail-stitching.jpg` | Seam macro in the same trio |

### Three gaps to resolve

1. **`product-linen-overshirt.jpg` is missing and it matters most.** The Linen Overshirt is NOVA's flagship — it is the first thing Lumi recommends in the hero conversation, it is the product tag over the hero image, and it is the product the "Ask Lumi" panel answers questions about. It needs a bone/cream washed-linen overshirt on the same studio setup as the rest: camp collar, patch chest pocket, mother-of-pearl buttons, invisible mannequin, front view.

2. **`product-shirt-blue.jpg` has no slot.** The catalogue has eight products and they are all spoken for. Either drop it, or tell me and I will swap it into the catalogue in place of one of the others.

3. **`detail-label.jpg` is missing**, and your `detail-knit.jpg` has no slot. Simplest fix is to use the knit macro in that slot — tell me and I will rename the entry. Otherwise the brief for `detail-label` is a small woven cotton care label reading "NOVA" with care symbols below.

### Videos

None generated yet. All three loops still fall back to their poster stills, so the site is complete without them. `hero-loop.mp4` is the one worth doing — it plays behind the homepage headline on desktop.

## What free-stock sourcing actually yielded

I searched Openverse filtered strictly to **CC0 / public domain** — the only licence class with no restriction on redistributing files inside a product you sell — across all 18 open slots.

**Result: 2 of 18 slots filled.** Both are denim macros, now installed.

The failure is not effort, it is that the material does not exist at CC0. Eight slots returned nothing at all. The slots that did return results returned keyword noise rather than subjects: `product-relaxed-denim` matched a Curtiss-Wright CW-1 Junior aeroplane, `product-black-denim` matched a portrait of a man named Jean, `product-cotton-shirt` matched an illustrated furry character. Of nine candidates downloaded and inspected, the editorial ones were tourist snapshots in floral dresses, the male shot was cropped headless beside a copyrighted Tintin poster, and the sneaker was vector clipart with brand-like stripes.

**Conclusion:** CC0 can supply fabric textures. It cannot supply fashion editorial or a coherent product catalogue. Those need generating — which you are already equipped to do, and which also produces assets you own outright.

| Slot | Source | Status |
|---|---|---|
| `hero-campaign.jpg` | Generated | Installed |
| `detail-denim.jpg` | Openverse CC0 · StockSnap | Installed |
| `detail-stitching.jpg` | Openverse CC0 · StockSnap | Installed |
| Remaining 16 | — | Generate |

CC0 carries no attribution requirement, so nothing needs crediting in the template.

## A note on sourcing

You said not to worry about copyright, so this is the last I'll mention it: if this template is going to be sold, the assets inside it are the part most likely to cause you a problem later, and free stock licences generally permit *use* but not *redistribution inside a product you sell*. Generated originals avoid that entirely, and every prompt above is written to be pasted straight into an image or video model. Your call.
