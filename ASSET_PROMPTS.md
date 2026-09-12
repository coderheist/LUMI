# Lumi — asset generation prompts

Complete generation spec for every image and video in the template: **44 images** (6 campaign, 32 product across 4 angles each, 5 macro, 1 closing) and **4 video loops**.

Images come first, then videos. Every row carries its filename, where it appears in the app, the angle, the styling, and a paste-ready prompt.

---

## 0. How to use this document

Each prompt is written as `<subject description> + STYLE X`. Copy the subject line, then paste the matching style block from section 0.2 immediately after it. The style blocks are what produce consistency across 44 images — they are not optional, and changing them mid-set is what makes a catalogue look assembled from stock.

### 0.1 The realism contract — applies to everything

This is the single most important instruction in the document. Generate for **photographic realism at the level of a modern phone camera in good light** — the reference is a well-lit iPhone 15 Pro frame, not a render and not a beauty retouch.

- **Skin must have texture.** Visible pores, fine lines, natural unevenness, a little shine on the forehead and nose. No airbrushing, no wax finish, no uniform matte tone.
- **Hair reads as strands**, with flyaways at the crown and edges. Not a helmet, not a smooth mass.
- **Hands are correct** — five fingers, believable joints, natural rest positions. Hide hands in pockets when in doubt.
- **Fabric behaves like fabric** — real drape, real weight, creases where a garment would actually crease, seams that meet.
- **Light is physical** — one dominant source, soft falloff, contact shadows where things touch, a plausible direction consistent across the whole set.
- **No text anywhere** in any frame: no logos, no slogans, no watermarks, no brand marks on garments.

Reject and regenerate anything with plastic skin, melted fingers, impossible garment construction, doubled seams, or a face that looks retouched into symmetry.

### 0.2 The three style blocks

**STYLE A — campaign / editorial**

```
Shot as a premium direct-to-consumer fashion campaign, not a magazine cover and not stock
photography. 50mm equivalent, f/2.8, natural depth of field with a softly falling-off
background. Warm late-afternoon daylight, one dominant direction, soft contact shadows.
Contemporary minimalist architecture: pale limestone, board-formed concrete, neutral plaster.
Warm neutral colour grade, gentle film grain, no HDR look. Photographic realism at the level
of a modern phone camera in good light: visible skin pores and fine texture, natural hair with
flyaway strands, anatomically correct hands, realistic fabric drape and creasing. No text, no
logos, no watermarks.
```

**STYLE B — product studio**

```
Premium ecommerce studio product photograph on a seamless warm off-white background (#F2EFEA).
Single soft key light from upper left at 45 degrees, large diffuser, subtle fill from the right,
soft natural contact shadow beneath the item. Identical camera height, distance and focal length
across the whole range so every product sits at the same scale. Sharp throughout, true colour,
realistic weave and stitch detail, natural fabric weight and drape. No props, no people, no
hands, no hangers visible, no text, no logos, no watermarks.
```

**STYLE C — macro texture**

```
Extreme close-up macro photograph, 100mm macro equivalent, f/4. Raking soft light from the left
to reveal surface relief. Shallow depth of field with the focal plane on the texture itself.
Warm neutral grade. Fills the frame edge to edge with fabric or material detail. Photographic
realism: individual fibres, weave structure, thread twist and slub all legible. No text, no
logos, no watermarks.
```

### 0.3 Reference direction

The target quality bar is a premium Framer or Webflow marketplace template — the fashion and SaaS categories both — plus the house photography of brands like Aesop, COS, Arket and Everlane. Use these as a **calibration for lighting, restraint and consistency only**. Do not reproduce any specific photograph, layout, composition or brand mark from them; every frame here is generated original work for the fictional brand NOVA.

### 0.4 Output specification for all images

| Property | Value |
|---|---|
| Format to generate | PNG or highest-quality JPEG the model offers |
| Format to ship | JPEG, quality 86, 4:4:4 chroma |
| Target shipped size | Under 400 KB each (the hero is 252 KB at 1122×1402) |
| Colour space | sRGB |
| Naming | Exactly as the Filename column — lowercase, hyphens, `.jpg` |
| Location | `public/images/` |

Convert with the script already in the project:

```bash
node -e "require('sharp')('in.png').jpeg({quality:86,mozjpeg:true,chromaSubsampling:'4:4:4'}).toFile('public/images/out.jpg')"
```

---

# PART 1 — IMAGES

## 1.1 Campaign and editorial — 6 images

These carry the brand and appear at full bleed, so they are worth the most iteration.

| S.No | Filename | Aspect | Min resolution | Angle / framing | Where it appears in the app |
|---|---|---|---|---|---|
| 1 | `hero-campaign.jpg` ✅ | 4:5 | 1536×1920 | Three-quarter body, subject right, eyeline off-camera left | Homepage hero background, behind the headline and chat panel. Also the poster frame for `hero-loop.mp4` |
| 2 | `editorial-female-walking.jpg` | 3:4 | 1536×2048 | Full body, mid-stride, tracking from the side | "Your best salesperson knows every product" — the AI discovery section |
| 3 | `editorial-male.jpg` | 3:4 | 1536×2048 | Full body, square to camera, feet visible | Size-and-fit section; Morrow customer story |
| 4 | `editorial-duo.jpg` | 16:10 | 2304×1440 | Two figures seated, wide, eye level | NOVA customer story; blog article header |
| 5 | `editorial-beige-jacket.jpg` | 4:5 | 1536×1920 | Three-quarter body, leaning, hands in pockets | About page |
| 6 | `lifestyle-group.jpg` | 21:9 | 2520×1080 | Three figures walking toward camera, wide cinematic | Full-bleed band above the catalogue |

✅ = already generated and installed.

**2 — `editorial-female-walking.jpg`**
> A young adult woman in her late twenties walking at an unhurried pace along a sunlit modern city street, mid-stride with one foot lifted. She wears a relaxed pale-blue cotton shirt worn open over a white vest, wide-leg mid-indigo denim, minimalist white leather sneakers, and a small dark brown leather crossbody bag. Candid and unposed, looking ahead rather than at the camera, hair moving slightly. Fabric in genuine motion — the shirt hem and trouser legs carrying the movement. Tree shadows falling across pale stone paving. **+ STYLE A**

**3 — `editorial-male.jpg`**
> A tall young adult man, approximately 6'1", standing square to the camera with his weight on one leg and both hands in his pockets. He wears a crisp white cotton shirt loosely tucked into washed black straight-leg denim, with minimalist white leather sneakers. Full body from head to feet with the shoes fully in frame. Neutral, relaxed expression looking directly at the camera. Board-formed concrete wall behind him, the horizontal form lines visible. **+ STYLE A**
> *Full body matters here — this image illustrates a length recommendation, so cropped feet make the section meaningless.*

**4 — `editorial-duo.jpg`**
> A young adult woman and a young adult man sitting together on a low pale stone bench in a modern urban plaza, turned slightly toward each other mid-conversation, relaxed and unposed. She wears a bone linen overshirt over a white top with mid-indigo wide-leg denim and white sneakers; he wears an oat merino crew-neck knit with washed black denim and white sneakers. Planted trees and neutral stone architecture behind. Wide composition with both figures fully in frame and space above their heads. **+ STYLE A**

**5 — `editorial-beige-jacket.jpg`**
> A young adult woman leaning her shoulder against a pale textured plaster wall, both hands in her jacket pockets, looking calmly toward the camera. She wears a boxy clay-beige cotton-ramie utility jacket with four patch pockets, open over a white cotton shirt, with mid-indigo denim. Three-quarter body. Soft overcast daylight, very gentle shadows, the wall texture clearly readable. **+ STYLE A**

**6 — `lifestyle-group.jpg`**
> Three young adults of varied ethnicity walking together toward the camera along a sunlit colonnade of pale stone, spread naturally across the frame and mid-conversation. From left: a man in a black overshirt with a white tee and cream wide-leg trousers; a woman in a bone linen shirt with mid-indigo wide-leg denim and a dark leather shoulder bag; a woman in an oat sleeveless knit with cream wide-leg trousers and a brown leather bag. All in white leather sneakers. Dappled tree shadows on the paving. Very wide cinematic framing, figures occupying the middle band. **+ STYLE A**
> *Dark text sits over the lower third in use — keep that area relatively even and uncluttered.*

---

## 1.2 Product catalogue — 8 products × 4 angles = 32 images

### Why four angles

The catalogue currently shows one still per product. Four angles per product lets a shopper rotate the item — which is exactly what Lumi's product-discovery answer should lead into, and it is the difference between a marketing page and something that reads like a real store.

**Note:** the angle-switcher UI is not built yet. Generate `-front` first — every product slot in the app works today with just that one. The other three angles become useful the moment the switcher exists; say the word and I will build it.

### The four angles, identical for every product

| Suffix | Angle | Purpose in UI |
|---|---|---|
| `-front` | Straight on, 0° | Default catalogue image, chat product card, hero product tag |
| `-angle` | Rotated 35° to the left, same height | Second frame on click — gives the garment volume |
| `-back` | Straight on, 180° | Third frame — shoppers ask about back pockets, yokes, hardware |
| `-detail` | Macro of the signature element | Fourth frame — what Lumi cites when asked about fabric or construction |

Keep the camera height, distance and lighting **identical across all four** and across all eight products. Only the item rotates.

### The 32 files

| S.No | Filename | Product | Angle | Signature detail (for `-detail`) |
|---|---|---|---|---|
| 7 | `product-linen-overshirt-front.jpg` | Linen Overshirt · $89 · bone | Front | — |
| 8 | `product-linen-overshirt-angle.jpg` | " | 35° left | — |
| 9 | `product-linen-overshirt-back.jpg` | " | Back | — |
| 10 | `product-linen-overshirt-detail.jpg` | " | Macro | Camp collar and mother-of-pearl button |
| 11 | `product-relaxed-denim-front.jpg` | Relaxed Denim · $110 · mid indigo | Front | — |
| 12 | `product-relaxed-denim-angle.jpg` | " | 35° left | — |
| 13 | `product-relaxed-denim-back.jpg` | " | Back | — |
| 14 | `product-relaxed-denim-detail.jpg` | " | Macro | Back pocket topstitching and copper rivet |
| 15 | `product-everyday-sneaker-front.jpg` | Everyday Sneaker · $125 · off white | Side profile | — |
| 16 | `product-everyday-sneaker-angle.jpg` | " | 35° front-quarter | — |
| 17 | `product-everyday-sneaker-back.jpg` | " | Heel on | — |
| 18 | `product-everyday-sneaker-detail.jpg` | " | Macro | Leather grain meeting gum sole |
| 19 | `product-utility-jacket-front.jpg` | Soft Utility Jacket · $149 · clay beige | Front | — |
| 20 | `product-utility-jacket-angle.jpg` | " | 35° left | — |
| 21 | `product-utility-jacket-back.jpg` | " | Back | — |
| 22 | `product-utility-jacket-detail.jpg` | " | Macro | Patch pocket corner and horn button |
| 23 | `product-black-denim-front.jpg` | Black Straight Denim · $110 · washed black | Front | — |
| 24 | `product-black-denim-angle.jpg` | " | 35° left | — |
| 25 | `product-black-denim-back.jpg` | " | Back | — |
| 26 | `product-black-denim-detail.jpg` | " | Macro | Waistband, belt loop and tonal stitching |
| 27 | `product-crossbody-front.jpg` | Minimal Crossbody · $79 · espresso | Front | — |
| 28 | `product-crossbody-angle.jpg` | " | 35° left | — |
| 29 | `product-crossbody-back.jpg` | " | Back | — |
| 30 | `product-crossbody-detail.jpg` | " | Macro | Strap anchor and edge painting |
| 31 | `product-cotton-shirt-front.jpg` | Oversized Cotton Shirt · $85 · optic white | Front | — |
| 32 | `product-cotton-shirt-angle.jpg` | " | 35° left | — |
| 33 | `product-cotton-shirt-back.jpg` | " | Back | — |
| 34 | `product-cotton-shirt-detail.jpg` | " | Macro | Collar stand and placket stitching |
| 35 | `product-neutral-knit-front.jpg` | Neutral Knit · $120 · oat | Front | — |
| 36 | `product-neutral-knit-angle.jpg` | " | 35° left | — |
| 37 | `product-neutral-knit-back.jpg` | " | Back | — |
| 38 | `product-neutral-knit-detail.jpg` | " | Macro | Ribbed cuff and knit structure |

All 32 are **4:5, minimum 1600×2000**.

### Per-product prompts

Append `+ STYLE B` to each. For the `-detail` files append **`+ STYLE C`** instead.

**Linen Overshirt** — presentation: invisible mannequin, sleeves falling naturally
> A bone-coloured washed European linen overshirt with a camp collar, a single patch chest pocket and four mother-of-pearl buttons, presented on an invisible mannequin so the garment holds its shape with no body visible. Relaxed boxy cut with a dropped shoulder. Slubby linen weave clearly visible, soft natural creasing at the elbows. **[ANGLE]**

**Relaxed Denim** — presentation: laid flat and straight, legs together
> A pair of mid-indigo relaxed straight-leg jeans in 13oz rope-dyed denim, five-pocket construction with gold topstitching and a copper rivet at each pocket corner, laid perfectly flat and straight with the legs together. Visible diagonal twill weave and a subtle honeycomb fade behind the knee. One soft natural fold at the knee. **[ANGLE]**

**Everyday Sneaker** — presentation: a single shoe, laces neatly tied
> A single off-white full-grain leather low-top sneaker with a natural gum rubber cup sole, tonal waxed laces neatly tied, and a subtle foxing tape around the perimeter. Visible fine leather grain and clean stitch lines. No branding of any kind. **[ANGLE]**

**Soft Utility Jacket** — presentation: invisible mannequin, buttoned to the second button
> A boxy clay-beige cotton-ramie canvas utility jacket with four patch pockets, a straight collar and tonal horn buttons, presented on an invisible mannequin. Structured but soft, with the canvas showing a faint slub. Sleeves falling naturally at the sides. **[ANGLE]**

**Black Straight Denim** — presentation: laid flat and straight
> A pair of washed black high-rise straight-leg jeans in 12oz cotton with no stretch, five-pocket construction with tonal stitching, laid perfectly flat and straight. Deep even black with a very subtle surface texture, no fading. **[ANGLE]**

**Minimal Crossbody** — presentation: standing upright, strap arranged in a soft loop
> A small espresso-brown vegetable-tanned leather crossbody bag with a clean unbranded rectangular form, a simple fold-over flap, and a thin adjustable shoulder strap arranged in a soft loop beside it. Visible leather grain and hand-finished painted edges. **[ANGLE]**

**Oversized Cotton Shirt** — presentation: invisible mannequin
> An optic-white oversized shirt in crisp organic cotton poplin with a classic collar, a dropped shoulder and a full button placket, presented on an invisible mannequin. Clean, slightly stiff drape with soft natural creasing at the sleeves. **[ANGLE]**

**Neutral Knit** — presentation: folded flat, sleeves tucked behind
> An oat-coloured merino lambswool crew-neck knit with ribbed cuffs, hem and neckband, folded flat with the sleeves tucked neatly behind. Fine gauge knit with individual stitch structure clearly visible across the surface. **[ANGLE]**

### What to substitute for `[ANGLE]`

| Suffix | Substitute this sentence |
|---|---|
| `-front` | `Photographed straight on from the front, the item centred and square to the camera.` |
| `-angle` | `Photographed from a three-quarter view, the item rotated 35 degrees to the left, same camera height and distance as the front view.` |
| `-back` | `Photographed straight on from the back, the item centred and square to the camera.` |
| `-detail` | `Extreme close-up filling the frame on the [signature detail from the table above].` |

---

## 1.3 Fabric macros — 5 images

These sit beside the "Ask Lumi about this product" panel, where the agent quotes fabric and care data — so the texture has to be genuinely legible, not decorative blur.

| S.No | Filename | Aspect | Min resolution | Subject | Where it appears |
|---|---|---|---|---|---|
| 39 | `detail-linen.jpg` | 1:1 | 1600×1600 | Washed bone linen weave | Detail trio beside the product Q&A panel |
| 40 | `detail-denim.jpg` | 1:1 | 1600×1600 | Indigo twill and topstitching | Same trio; blog article header; poster for `commerce-loop.mp4` |
| 41 | `detail-stitching.jpg` | 1:1 | 1600×1600 | Flat-felled seam and rivet | Same trio; blog article header |
| 42 | `detail-knit.jpg` | 1:1 | 1600×1600 | Oat merino knit structure | Same trio |
| 43 | `detail-label.jpg` | 1:1 | 1600×1600 | Woven care label | Cited when Lumi answers a care question |

Append **`+ STYLE C`** to each.

**39** > Washed bone-coloured European linen fabric filling the frame, showing the irregular slubby weave, a soft diagonal fold running through the composition, and one mother-of-pearl button catching the light at the edge.

**40** > 13oz rope-dyed mid-indigo denim twill filling the frame, showing the diagonal weave structure, a subtle honeycomb fade, and a line of gold topstitching running along a seam.

**41** > A flat-felled seam on mid-indigo denim filling the frame, with a bar tack at the stress point and a copper rivet catching the light, the twill weave legible on both sides of the seam.

**42** > Oat-coloured merino lambswool knit filling the frame, showing individual stitch loops, the fine gauge structure and a soft transition into a ribbed section at one edge.

**43** > A small woven cotton care label stitched into the inside seam of a bone linen garment, reading "NOVA" in a clean small sans-serif with laundry care symbols in a row beneath it. The label is slightly soft and lifted from the fabric. Surrounding garment fabric visible and out of focus.

---

## 1.4 Closing image — 1

| S.No | Filename | Aspect | Min resolution | Angle | Where it appears |
|---|---|---|---|---|---|
| 44 | `cta-editorial.jpg` | 16:9 | 2560×1440 | Rear view, walking away, wide | Behind the closing call to action on every page |

**44** > A young adult woman seen from behind, walking away down a sunlit minimalist stone corridor, in a bone linen overshirt and mid-indigo wide-leg denim with white leather sneakers. Long shadows falling across the paving toward the camera. Wide composition with the figure small in the lower half and a large expanse of sunlit wall above her. **+ STYLE A**
> *A large headline sits over the upper half and the whole frame is darkened by a scrim in use, so generate this brighter and emptier than feels right.*

---

# PART 2 — VIDEOS

## 2.1 Technical specification — all clips

| Property | Value | Why |
|---|---|---|
| Container | MP4 | Universal support |
| Codec | H.264 High profile, `yuv420p` | Safari refuses 4:2:2 and 4:4:4 in browser |
| Resolution | 1920×1080 | The hero sits behind a scrim; 4K buys nothing visible and costs seconds of load |
| Frame rate | 24 or 30 fps, constant | Variable frame rate causes stutter on loop |
| Bitrate | 2–4 Mbps, CRF 23 | |
| **Target file size** | **Under 3 MB** | These are ambience. They must never be why the page is slow |
| Audio | **None — strip the track entirely** | All clips are muted; an audio track is pure weight |
| Loop | Seamless, no visible cut | First and last frame must match in position and light |
| Colour | Warm neutral grade matching the stills | |
| Text | None | |

Encode with:

```bash
ffmpeg -i in.mp4 -an -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 23 -r 30 -movflags +faststart public/video/out.mp4
```

`-an` strips audio, `+faststart` moves the index to the front so playback begins before the file finishes downloading.

## 2.2 The four clips

| S.No | Filename | Duration | Motion | Poster still | Where it appears |
|---|---|---|---|---|---|
| V1 | `hero-loop.mp4` | 6–8s | Very slow turn and weight shift | `hero-campaign.jpg` | **Homepage hero background**, desktop only, behind the headline and chat panel |
| V2 | `discovery-loop.mp4` | 8–10s | Steady side tracking shot | `editorial-female-walking.jpg` | Product discovery section |
| V3 | `commerce-loop.mp4` | 5–6s | Slow fabric rotation under raking light | `detail-denim.jpg` | Fabric detail moment |
| V4 | `catalogue-loop.mp4` | 6–8s | Slow 360° product turntable | `product-relaxed-denim-front.jpg` | Optional — catalogue section, reinforces the multi-angle idea |

**V1 — `hero-loop.mp4`** *(the one that matters)*
> A young adult woman in an oversized cream linen overshirt and mid-indigo wide-leg denim standing against a pale limestone wall in warm late-afternoon daylight, turning very slowly from a three-quarter position toward the camera and shifting her weight, hair moving slightly in a light breeze. Tree shadows drift almost imperceptibly across the wall. The camera is locked off — no pan, no zoom, no handheld shake. She occupies the right side of the frame; the left half stays open and calm.
>
> **Motion discipline:** this plays behind a headline. Anything energetic fights the text. Aim for a clip where nothing appears to happen until you watch for several seconds. Begin and end with her in the same position so the loop is invisible.

**V2 — `discovery-loop.mp4`**
> A young adult woman walking at an unhurried pace through a sunlit modern colonnade in a pale-blue relaxed shirt and wide-leg indigo denim, filmed as a steady lateral tracking shot that holds her at a constant position in the frame. Natural fabric movement in the shirt hem and trouser legs, dappled light passing across her as she moves between columns.

**V3 — `commerce-loop.mp4`**
> Extreme macro of rope-dyed indigo denim twill with gold topstitching, the fabric rotating very slowly beneath a soft raking light so the weave structure and the thread twist catch and release the highlight. Shallow depth of field, the focal plane holding on the stitch line throughout.

**V4 — `catalogue-loop.mp4`** *(optional)*
> A pair of mid-indigo relaxed straight-leg jeans on an invisible mannequin, rotating slowly and continuously through a full 360 degrees on a seamless warm off-white background, lit by a single soft key from the upper left with a soft contact shadow that travels with the rotation. Constant rotation speed, no easing, so the loop is perfectly seamless.
>
> *This is the clip that sells the multi-angle idea in motion — it pairs naturally with the four-angle stills.*

---

# PART 3 — CHECKLIST BEFORE YOU ACCEPT A BATCH

Run every generated frame past this before converting it:

- [ ] Skin shows pores and natural unevenness — not smoothed or waxy
- [ ] Hands are anatomically correct, or hidden in pockets
- [ ] Hair has individual strands and flyaways
- [ ] Garment construction is physically possible — seams meet, buttons align, plackets are the right way round
- [ ] No text, logo, watermark or brand mark anywhere in frame
- [ ] Lighting direction matches the rest of the set
- [ ] For products: same camera height, same distance, same background tone as the other seven
- [ ] For the four angles of one product: unmistakably the same garment
- [ ] Negative space is where the layout needs it — left in `hero-campaign`, upper half in `cta-editorial`, lower third clear in `lifestyle-group`
- [ ] Shipped JPEG is under 400 KB
- [ ] Video has no audio track and is under 3 MB

---

# PART 4 — INSTALLATION

1. Convert to JPEG at quality 86 and save into `public/images/` (or encode MP4 into `public/video/`) under the exact filename from the tables above.
2. Open `lib/assets.ts`, find the matching entry, set `available: true`.

The site picks up each asset independently, so you can install them a few at a time and it stays presentable throughout — anything still `false` keeps rendering its art-directed placeholder plate.

**Currently installed:** `hero-campaign.jpg` (1122×1402, 252 KB).

**Manifest note:** the manifest today expects one image per product (`product-relaxed-denim.jpg`, no suffix). If you generate the four-angle sets, tell me and I will restructure the manifest to hold an angle array per product and build the click-to-rotate viewer to go with it.
