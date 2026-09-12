# Lumi

A premium Next.js template for an AI customer-support and shopping agent built for ecommerce brands.

Two brands appear throughout, and they stay separate on purpose:

- **Lumi** is the product being sold — the agent, its retrieval, its actions, its analytics.
- **NOVA** is the fictional fashion store used as the customer, and owns the catalogue, orders and policies.

Keeping them distinct is what makes the demo read as a real SaaS product serving a real merchant rather than as a generic AI landing page.

## Licence

This template is commercial software, licensed per end product — see [`LICENSE.md`](./LICENSE.md) before you use it in a project. Release history for the template itself (not the fictional in-app changelog) is in [`CHANGELOG.md`](./CHANGELOG.md).

## Rebranding this in ten minutes

Three files, in this order:

1. **`lib/brand.ts`** — product name, tagline, domain, contact details, social links, and the fictional demo-customer name. This drives the nav, footer, page metadata, Open Graph image, sitemap, and every "Lumi for ___" header in the demos.
2. **`app/globals.css`** (`@theme` block, top of the file) — colour, type, radii, shadows and motion timing. See "Design tokens" below for the one rule worth knowing before you touch the palette.
3. **`lib/data.ts`** — the product catalogue, pricing plans, FAQs, blog posts and every demo conversation script.

Then run a project-wide search for the literal string `"Lumi"` — anything left is a prose mention inside marketing copy (e.g. "point Lumi at your policies") rather than a structural reference, and is yours to rewrite by hand or find-and-replace.

Media (photography and video) is a separate system — see "Images and video" below.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

Requires Node 18.18 or newer. No environment variables are needed.

## What's in the box

**Pages** — `/`, `/features`, `/use-cases`, `/integrations`, `/pricing`, `/about`, `/blog`, `/blog/[slug]`, `/changelog`, `/contact`, `/docs`, `/privacy`, `/terms`, and a 404.

**Product demos** — four interactive components that show the agent working rather than describing it: a hero conversation with product recommendations, an agent console with live retrieval and order tracking, a return flow that actually creates the return, and a catalogue Q&A that cites the product field it answered from.

**Dashboard** — an analytics section with a stacked volume chart (hover tooltips, range filter, table view), stat tiles and a question breakdown.

**Calculator** — an ROI estimator whose assumptions are printed next to each result.

There is a full walkthrough at `/docs` inside the running site.

## Customising

### Content

Everything textual lives in `lib/data.ts` — products, prices, the demo order, conversation scripts, plans, FAQs, blog posts, changelog entries and metrics. Nothing is hard-coded inside a section, so you can rebrand the site by editing one file.

### Design tokens

Colour, type, radii and shadows are declared once in the `@theme` block at the top of `app/globals.css`.

One rule is worth keeping when you change the palette: **ink carries the merchant's own commerce UI, and the accent is reserved for the agent** — retrieval, confidence, context chips, charts. That separation is what keeps two brands legible on one page.

Every colour used anywhere in the app — including the dark chat panels' brighter steps of sage/indigo/ochre, and the chart's two series — is a named token in this block (`--color-sage-dark`, `--color-chart-automated`, and so on). No component hard-codes a hex value, so a full retheme touches this one file. The chart pair (`--color-chart-automated`, `--color-chart-escalated`) was validated for colour-vision deficiency against the dark chart surface — ΔE 24.1 protan, 22.5 tritan, both inside the lightness band and above the chroma floor. If you change it, re-validate rather than eyeballing it — the `dataviz` skill's palette validator is built for exactly this.

### Images and video

No component references a media path. Every image is a key in `lib/assets.ts` resolved by `<Media name="…" />`, and every clip is a key in the `VIDEOS` manifest in the same file. Each entry carries its alt text, aspect ratio, mobile focal point, and **the prompt the shot should be generated from** — the manifest doubles as the photography brief.

Until you supply a file, `<Media>` renders an art-directed plate carrying the shot's label, so an unshot frame reads as direction rather than as a broken image. Plate treatments vary deterministically by asset key, so a grid of unshot frames reads as a set of different photographs rather than one box repeated.

To use real media:

1. Put the file in `public/images/` (or `public/video/`) using the `file` name from the manifest entry.
2. Set `available: true` on that entry.

No component changes are needed, and you can do it one asset at a time — the site stays presentable throughout.

**`ASSET_BRIEF.md`** in the project root is the complete shot list: 19 images and 3 video loops, each with its filename, aspect ratio, where it appears, and a paste-ready prompt.

Three components consume this: `<Media>` for stills, `<VideoFrame>` for a framed loop with a poster, and `<BackgroundVideo>` for the full-bleed hero loop. The background video paints its poster first and only attaches the video after mount, so the hero's largest paint never waits on a download — and under reduced motion the video is never attached at all.

### Motion

`<Reveal>` handles entrances. Where the browser supports CSS scroll-driven animations (`animation-timeline: view()` — Chrome/Edge 115+, Safari 26+), the entrance is linked directly to scroll position and runs on the compositor; Firefox and older browsers fall back to a one-shot IntersectionObserver transition. Both paths share the same five variants (`rise`, `slide`, `scale`, `open`, `blur`) and the same duration/easing tokens from `globals.css`. The demos themselves play their scripts through `useConversation` and `useRetrieval`, driven by a script's own timeline rather than scroll — a separate `.turn-in` class keeps those from being overridden by the scroll-linked entrance.

Under `prefers-reduced-motion`, every demo renders its resolved final state instead of animating to it, and video autoplay is dropped in favour of controls. Reveals are a progressive enhancement: without JavaScript the content is simply present.

Video loops are intersection-gated: `preload="none"` and no `autoplay` attribute, so an off-screen clip downloads and decodes nothing until it is actually about to be on screen, and pauses again once it scrolls away. On a page with more than one loop this matters — see `components/ui/VideoFrame.tsx` and `BackgroundVideo.tsx`.

## Before you publish

Three things are deliberately inert:

- The **contact form** validates and moves through real states, but has no endpoint. Point `submit` in `components/site/ContactForm.tsx` at your own handler.
- The **integrations** name what a production connection would read or write. They are not live connections, and no partnership or endorsement is claimed.
- The **legal pages** are readable placeholders, not legal advice.

Also: every metric, order, conversation and customer story in this template is illustrative demo data, and is labelled as such throughout. If you replace a number with a real one, it becomes a claim and needs a source. The security section lists capabilities rather than asserting that any certification has been audited or granted — keep it that way unless yours have.

NOVA, Morrow, Aster, Common Goods, Northline and Luma are fictional brands invented for this template.

Two small audits before launch:

- `pendingAssets()` in `lib/assets.ts` lists every image key with no file at all — anything still there renders a placeholder plate in production.
- `provisionalAssets()` lists images cut from a low-resolution source rather than a full export, which look soft at large sizes. `ASSET_BRIEF.md` has the full shot list either way.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

No animation or charting libraries — the reveals, conversation streaming, count-ups and charts are built from a handful of hooks in `lib/hooks.ts` and plain CSS, which keeps the bundle small and the behaviour easy to change.
