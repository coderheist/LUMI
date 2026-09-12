# Changelog

Version history for the **template itself** — not to be confused with the in-app `/changelog` page, which is fictional demo content written for the Lumi product inside the template.

This file follows [Keep a Changelog](https://keepachangelog.com/). Dates are release dates to buyers, not commit dates.

## [1.0.0] — Initial release

### Added

- 18 routes: homepage, features, use cases, integrations, pricing, about, blog index + article, changelog, contact, docs, privacy, terms, and a 404.
- Four interactive AI demo components: hero recommendation flow, order tracking, return automation, and product Q&A with citations.
- A floating chat widget demonstrating the product as an embedded support agent.
- Analytics dashboard with a colour-vision-validated stacked bar chart, and an ROI calculator with visible assumptions.
- Manifest-driven media system (`lib/assets.ts`) — every image and video is a named entry with alt text, ratio, focal point, and a generation prompt; unshot assets render an art-directed placeholder instead of a broken embed.
- Scroll-driven entrance animations with a JavaScript fallback for browsers without `animation-timeline` support, and full `prefers-reduced-motion` compliance throughout.
- Single-file brand configuration (`lib/brand.ts`) for product identity, and a centralized content file (`lib/data.ts`) for catalogue, pricing, copy, and demo scripts.

### Known limitations

- Two of the four background/demo video loops ship as placeholders (poster image only) pending final footage — see `ASSET_BRIEF.md`.
- The contact form validates client-side but has no backend; wire `components/site/ContactForm.tsx`'s `submit` handler to your own endpoint.
