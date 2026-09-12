/**
 * Brand identity — the one file to edit when retargeting this template to a
 * different product name.
 *
 * Everything here is the *product's* identity (Lumi, the software being
 * sold). The *demo customer* — the fictional store used throughout the
 * conversations and catalogue (NOVA) — is named here too, since a buyer
 * retargeting the demo to their own industry will want to rename it in the
 * same pass, but its content (products, prices, policies) lives in
 * `lib/data.ts`, not here.
 *
 * After editing this file: update `app/icon.svg` and the favicon-adjacent
 * bits of `app/opengraph-image.tsx` (colours there are duplicated because the
 * OG image renders at the edge and cannot read CSS custom properties), then
 * search the codebase for the string "Lumi" to catch anything this file
 * doesn't cover — see `docs/page.tsx` for the full rebrand checklist.
 */
export const BRAND = {
  /** Product name, shown in the nav, footer, and every page title. */
  name: "Lumi",

  /** One-line positioning, used as the hero eyebrow's neighbour and the OG
   *  image's corner label. Keep it under ~40 characters. */
  tagline: "AI customer support for commerce",

  /** Full description — page metadata, Open Graph, Twitter card, and the
   *  structured-data block. Written to stand alone with no other context. */
  description:
    "Lumi is the AI support and shopping agent for ecommerce brands. It answers product and policy " +
    "questions, recommends products, tracks orders and starts returns — then hands over to a person " +
    "with full context when it should.",

  /** Canonical production domain, no trailing slash. Drives metadataBase,
   *  the sitemap, and robots.txt. */
  domain: "https://lumi.example.com",

  /** General and privacy-specific contact addresses shown on /contact and
   *  in the /privacy policy. */
  supportEmail: "hello@lumi.example.com",
  privacyEmail: "privacy@lumi.example.com",

  /** Shown on /contact. Fictional — replace with a real registered address
   *  before taking payment information from anyone. */
  address: {
    line1: "Keizersgracht 241",
    city: "Amsterdam",
  },

  /** BCP 47 tag for <html lang>; the underscore form is what Open Graph's
   *  og:locale expects. */
  locale: "en-GB",
  ogLocale: "en_GB",

  social: [
    { label: "X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ],

  /** The fictional store used throughout every demo conversation and the
   *  product catalogue. Rename it here and every "Lumi for ___" header,
   *  order reference, and footer disclaimer follows — the catalogue and
   *  scripts themselves are in `lib/data.ts`. */
  demoCustomer: "NOVA",
} as const;
