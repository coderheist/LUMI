# Video prompts for Veo 3.1

Four loops for the Lumi template, written specifically for Veo 3.1. Each has a name, a copy-paste prompt, a negative prompt, generation settings, and a note on why it is worded that way.

Read section 1 before generating anything — it contains the one technique that fixes the problem the first attempt hit.

---

## 1. The three things that decide whether these work

### 1.1 Make the loop seamless with first-and-last-frame

This is the single most important setting. The first V1 attempt failed here: the subject started small at the right edge and finished large near centre, so the loop had a hard visible cut every 8 seconds — measured at 42.5/255 mean pixel difference between first and last frame, where a clean loop needs under 5.

If your Veo 3.1 access exposes **first frame and last frame** (sometimes surfaced as "ingredients to video" or frame-to-frame transition), **set both to the same image**. Veo then has to return the motion to its starting position, and the loop closes by construction. For `hero-loop` use `public/images/hero-campaign.jpg` as both frames — you then get motion that starts and ends on the exact still the page already shows before playback begins, which means the transition from poster to video is invisible too.

If that control is not available, generate text-to-video and fix it in post with a ping-pong (section 4.3). A ping-pong always loops perfectly, at the cost of motion that visibly reverses.

### 1.2 Veo generates audio — suppress it at the prompt, strip it after

Veo 3.1 produces a native audio track. Every clip here is muted in the browser, so audio is pure file weight — the first attempt shipped an AAC stereo track inside a 6.68 MB file against a 3 MB budget.

More importantly: **if the prompt implies speech, Veo animates the mouth.** A background model silently mouthing words is unsettling and unusable. Every prompt below therefore states no dialogue explicitly, and section 4 strips the track.

### 1.3 Veo adds camera movement unless you forbid it

Left to itself Veo tends to drift, push in, or add a slow handheld float. For a background layer behind a headline that is wrong — the text must sit still while something quiet happens behind it. Every prompt below specifies a locked-off tripod and names the movements to avoid.

---

## 2. Settings for every clip

| Setting | Value | Why |
|---|---|---|
| Model | Veo 3.1 | |
| Aspect ratio | 16:9 | The player crops with `object-cover`; 16:9 gives the widest safe crop |
| Resolution | 1080p | These sit behind a scrim. 4K costs seconds of load and shows nothing extra |
| Duration | 8s | Veo's native length, and the top of our 6–8s budget |
| Audio | Off if the toggle exists, otherwise stripped in post | |
| First / last frame | **Same image** where supported | Section 1.1 |
| Seed | Fix it once you like a look | Lets you regenerate variations that still match |
| Reference images | Use the matching still from `public/images/` | Keeps the loop and the stills reading as one shoot |

---

## 3. The four prompts

| S.No | Name | Filename | Reference image | Priority |
|---|---|---|---|---|
| V1 | Hero loop | `hero-loop.mp4` | `hero-campaign.jpg` | **Essential** — plays behind the homepage headline |
| V2 | Discovery loop | `discovery-loop.mp4` | `editorial-female-walking.jpg` | Nice to have |
| V3 | Fabric macro loop | `commerce-loop.mp4` | `detail-denim.jpg` | Nice to have |
| V4 | Catalogue turntable | `catalogue-loop.mp4` | `product-relaxed-denim-front.jpg` | Optional |

---

### V1 — `hero-loop.mp4`

**Prompt**

```
A locked-off static shot on a tripod. A young woman in her late twenties stands against a
pale limestone wall in warm late-afternoon sunlight, positioned in the right third of the
frame. She wears an oversized cream washed-linen overshirt, open over a white top, with
mid-indigo wide-leg denim and minimalist white leather sneakers. Over eight seconds she
turns her head slowly toward the camera, shifts her weight from one hip to the other, and
settles back into her starting position. Her hair moves gently in a light breeze. Soft
shadows of leaves drift almost imperceptibly across the wall behind her. She stays in the
same spot on the ground throughout and never walks toward the camera. The left half of the
frame remains empty wall.

Shot on a full-frame cinema camera, 50mm lens, f/2.8, shallow depth of field. Warm neutral
colour grade, soft natural contact shadows, gentle film grain. Photorealistic: visible skin
pores and natural skin texture, individual hair strands, realistic linen drape and creasing.
Calm, quiet, unhurried. No dialogue, no music, ambient only.
```

**Negative prompt**

```
camera movement, panning, zooming, dolly, handheld shake, walking toward camera, subject
moving across frame, fast motion, cuts, transitions, text, captions, subtitles, watermark,
logo, brand marks, talking, mouth moving, speech, crowd, extra people, plastic skin,
airbrushed skin, distorted hands, extra fingers, warped fabric, oversaturated colour, HDR
```

**Settings** — 8s · 16:9 · 1080p · first frame = last frame = `hero-campaign.jpg`

**Why it is written this way.** Three clauses exist purely because the first attempt broke on them: *"stays in the same spot on the ground"* and *"never walks toward the camera"* stop the subject drifting out of the right third into the headline column, and *"settles back into her starting position"* closes the loop. The phrase *"nothing appears to happen until you watch for several seconds"* is the mood to aim for — this plays behind a headline, and anything energetic fights the text for attention.

---

### V2 — `discovery-loop.mp4`

**Prompt**

```
A smooth lateral tracking shot moving at a constant speed alongside a young woman in her
late twenties as she walks at an unhurried pace through a sunlit modern colonnade of pale
stone. She stays at a fixed position in the frame while the columns pass behind her. She
wears a relaxed pale-blue cotton shirt worn open over a white vest, wide-leg mid-indigo
denim, minimalist white leather sneakers, and a small dark brown leather crossbody bag.
Dappled sunlight passes rhythmically across her as she moves between the columns. Her shirt
hem and trouser legs carry natural movement.

Shot on a full-frame cinema camera, 50mm lens, f/2.8. Warm neutral colour grade, late
afternoon daylight, gentle film grain. Photorealistic: natural skin texture, individual hair
strands, realistic fabric movement and drape. Calm and editorial. No dialogue, no music,
ambient only.
```

**Negative prompt**

```
handheld shake, jerky motion, zooming, subject drifting out of frame, fast walking, running,
cuts, transitions, text, captions, watermark, logo, talking, mouth moving, crowd, extra
people, plastic skin, distorted hands, extra fingers, oversaturated colour, HDR
```

**Settings** — 8s · 16:9 · 1080p · reference `editorial-female-walking.jpg`

**Why it is written this way.** The rhythm of columns passing gives a repeating visual beat, which hides the loop seam far better than an open street would. *"She stays at a fixed position in the frame"* is what makes it a tracking shot rather than a walk-away, so she never leaves.

---

### V3 — `commerce-loop.mp4`

**Prompt**

```
An extreme macro shot of mid-indigo rope-dyed denim twill filling the entire frame, with a
line of gold topstitching running diagonally through the composition. The fabric rotates
very slowly and continuously beneath a soft raking light from the left, so the diagonal
weave structure and the twist of the individual threads catch the highlight and release it.
The focal plane holds on the stitch line throughout.

Shot on a 100mm macro lens at f/4, very shallow depth of field. Warm neutral colour grade,
soft directional light, gentle film grain. Photorealistic textile detail: individual cotton
fibres, weave structure, slub and thread twist all legible. Quiet and tactile. No dialogue,
no music, ambient only.
```

**Negative prompt**

```
camera shake, fast rotation, cuts, transitions, hands, people, text, captions, watermark,
logo, plastic or CGI-looking fabric, flat lighting, oversaturated colour, HDR
```

**Settings** — 6s · 16:9 · 1080p · reference `detail-denim.jpg`

**Why it is written this way.** Continuous rotation at a constant speed is the easiest kind of motion to loop — there is no start or end pose to match, so even without first/last-frame control the seam is nearly invisible. No people means none of the skin, hand or face failure modes apply, which makes this the most reliable of the four to generate.

---

### V4 — `catalogue-loop.mp4` *(optional)*

**Prompt**

```
A product turntable shot. A pair of mid-indigo relaxed straight-leg jeans in 13oz rope-dyed
denim, presented on an invisible mannequin with no body visible, rotating slowly and
continuously through one full 360-degree turn on a seamless warm off-white background. The
rotation speed is perfectly constant with no easing at the start or end. A single soft key
light from the upper left stays fixed while the garment turns, and the soft contact shadow
beneath travels with the rotation. Gold topstitching and copper rivets catch the light as
the back pockets come into view.

Locked-off camera on a tripod, 85mm lens, f/8, sharp throughout. Clean commercial ecommerce
product lighting, true colour, realistic denim weave and fabric weight. No dialogue, no
music, ambient only.
```

**Negative prompt**

```
camera movement, zooming, hands, people, mannequin body, hanger, props, text, captions,
watermark, logo, brand marks, inconsistent lighting, flickering, warped fabric, uneven
rotation speed, oversaturated colour
```

**Settings** — 8s · 16:9 · 1080p · reference `product-relaxed-denim-front.jpg`

**Why it is written this way.** A constant-speed full 360° is mathematically seamless — the last frame *is* the first frame. *"No easing at the start or end"* matters: if the model ramps the rotation, the loop stutters at the seam. This is the clip that sells the four-angle product idea in motion.

---

## 4. After generation

### 4.1 Strip audio and encode to spec

```bash
ffmpeg -i veo-output.mp4 -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 23 -r 30 -movflags +faststart public/video/hero-loop.mp4
```

`-an` removes the audio track · `yuv420p` because Safari refuses 4:2:2 and 4:4:4 in-browser · `+faststart` moves the index to the front so playback starts before the file finishes downloading.

Target: **under 3 MB**. If you are over, raise `-crf` to 26 and check it still looks clean behind the scrim — it almost always does, because the hero scrim covers most of the frame anyway.

### 4.2 Verify before installing

| Check | Target |
|---|---|
| Duration | 6–8s |
| Resolution | 1920×1080 |
| Frame rate | Constant 24 or 30 |
| Audio track | **None** |
| File size | Under 3 MB |
| Loop seam | No visible jump when it repeats |
| Subject position | Stays out of the left 45% for `hero-loop` |

### 4.3 Ping-pong fallback if the loop still cuts

Playing forward then reversed makes any clip loop perfectly, and returns the subject to the starting position:

```bash
ffmpeg -i in.mp4 -filter_complex "[0]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1" \
  -an -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 23 -movflags +faststart \
  public/video/hero-loop.mp4
```

The reversal is noticeable on walking motion, so use it for V1 and V3 rather than V2.

### 4.4 Install

Save into `public/video/` under the filename from the table, then open `lib/assets.ts` and set `available: true` on that entry. Nothing else changes — the hero swaps from poster still to video automatically, and only on screens 1024px and wider.

---

## 5. If a generation comes back wrong

| Symptom | Fix in the prompt |
|---|---|
| Subject walks toward camera | Strengthen: *"her feet stay planted in the same position on the ground for the entire shot"* |
| Camera drifts or pushes in | Add *"absolutely static camera, tripod locked off, no movement of any kind"* and put camera terms in the negative prompt |
| Loop has a visible cut | Use first frame = last frame; otherwise ping-pong |
| Mouth moves | Add *"her mouth stays closed, she does not speak"* |
| Skin looks plastic | Add *"visible skin pores, fine lines, natural skin imperfections, no retouching"* |
| Grade too orange | Add *"neutral white balance, soft warm light, not golden hour"* — the first attempt came back noticeably more orange than the stills |
| Subject drifts left | Add *"she remains in the right third of the frame for the entire duration"* |
```
