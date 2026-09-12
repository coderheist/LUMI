import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "How this template is put together: design tokens, the image manifest, content files, components and the pages.",
  alternates: { canonical: "/docs" },
};

const CHAPTERS = [
  {
    heading: "Where the content lives",
    body: [
      "Every string, product, price, plan, metric and article in this template comes from `lib/data.ts`. Nothing is hard-coded inside a section, so you can rebrand the whole site by editing one file.",
      "NOVA is the fictional store used for the demos and Lumi is the product being sold. Keep them separate when you swap in your own content: your customer's data belongs where NOVA's is, your product's name replaces Lumi's.",
    ],
    items: [
      "`PRODUCTS` — the demo catalogue, including fabric, fit, care and sizes",
      "`DEMO_ORDER`, `RETURN_CASE` — the order the tracking and returns demos read from",
      "`HERO_SCRIPT`, `TRACKING_SCRIPT`, `RETURN_SCRIPT`, `DISCOVERY_SCRIPT` — conversation scripts",
      "`PLANS`, `PLAN_MATRIX`, `FAQS` — pricing and questions",
      "`POSTS`, `CHANGELOG` — blog and release notes",
    ],
  },
  {
    heading: "Design tokens",
    body: [
      "Colour, type, radii and shadows are declared once in the `@theme` block at the top of `app/globals.css`, and everything else consumes them as Tailwind utilities.",
      "One rule is worth keeping when you change the palette: ink carries the store's own commerce UI, and the accent is reserved for the agent — retrieval, confidence, context chips, charts. That separation is what keeps the two brands legible on the same page.",
    ],
    items: [
      "`--color-paper*` — surfaces, warm white to sunken",
      "`--color-ink*` — text, from primary to faint",
      "`--color-indigo*` — the agent accent, plus the dark section ground",
      "`--color-sage` / `--color-ochre` — success and escalation states",
      "`.t-display` … `.t-micro` — the type scale, all clamped for fluid sizing",
    ],
  },
  {
    heading: "Images and video",
    body: [
      "No component references a media path. Every image is a key in `lib/assets.ts` resolved by `<Media name=\"…\" />`, and every clip is a key in the `VIDEOS` manifest in the same file. Each entry carries alt text, an aspect ratio, a mobile focal point and the prompt the shot should be generated from.",
      "Until you supply a file, `<Media>` renders an art-directed plate carrying the shot's label, so an unshot frame reads as direction rather than a broken image. Plate treatments vary by asset key, so a grid of unshot frames reads as different photographs rather than one box repeated. To go live: drop the file into `public/images/` or `public/video/`, then set `available: true` on that entry.",
      "`<BackgroundVideo>` drives the full-bleed hero loop. It paints the poster still first and attaches the video only after mount, so the largest paint never waits on a download — and under reduced motion the video is never attached at all. `<VideoFrame>` is the framed equivalent, and swaps autoplay for controls under the same preference.",
      "The complete shot list — 19 images and 3 loops, each with filename, ratio, placement and a paste-ready prompt — is in `ASSET_BRIEF.md` at the project root.",
    ],
  },
  {
    heading: "Motion",
    body: [
      "`<Reveal>` handles entrances: opacity plus an 8px rise, once, with an optional stagger delay. The demos use `useConversation` and `useRetrieval` to play their scripts turn by turn.",
      "Under `prefers-reduced-motion` every demo renders its resolved final state rather than animating to it — the content is the point, the motion is not. Reveals are also a progressive enhancement: without JavaScript the content is simply present.",
    ],
  },
  {
    heading: "Pages",
    body: [
      "Routes live in `app/`, and each page composes the same section components. The homepage is the full sequence; the product, use-case and integration pages reuse subsets of it.",
      "Metadata, canonical URLs and Open Graph tags are set per route. The social image at `app/opengraph-image.tsx` is generated at build time, so there is no binary asset to keep in sync.",
    ],
    items: [
      "`/` — the full narrative",
      "`/features`, `/use-cases`, `/integrations`, `/pricing`",
      "`/about`, `/contact`, `/blog`, `/blog/[slug]`, `/changelog`",
      "`/privacy`, `/terms`, `/docs`, and a 404 at `app/not-found.tsx`",
    ],
  },
  {
    heading: "Before you publish",
    body: [
      "Two things in this template are deliberately inert: the contact form validates and moves through its states but has no endpoint, and the integration names describe what a real connection would read or write rather than being live connections.",
      "Replace the placeholder legal pages with your own, and check that the illustrative-data notes still make sense once you have swapped the demo metrics for real ones. If a number becomes a claim, it needs a source.",
    ],
  },
] as const;

export default function DocsPage() {
  return (
    <>
      <PageHeader
        title="How this template is put together."
        lead="Content in one file, tokens in another, images behind a manifest. Everything you need to rebrand it without hunting through components."
      />

      <Section space="normal">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Contents" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="t-micro mb-4">Contents</p>
              <ul className="flex flex-col gap-2.5 border-l border-line pl-4">
                {CHAPTERS.map((chapter) => (
                  <li key={chapter.heading}>
                    <a
                      href={`#${slug(chapter.heading)}`}
                      className="text-[0.86rem] text-ink-soft transition-colors duration-200 hover:text-ink"
                    >
                      {chapter.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="flex flex-col gap-14 lg:col-span-9">
            {CHAPTERS.map((chapter, index) => (
              <Reveal key={chapter.heading} delay={index * 50}>
                <section id={slug(chapter.heading)} className="scroll-mt-28">
                  <h2 className="t-h3">{chapter.heading}</h2>
                  <div className="mt-4 flex flex-col gap-4">
                    {chapter.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 36)} className="t-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {"items" in chapter && chapter.items ? (
                    <ul className="mt-5 flex flex-col gap-2 rounded-card border border-line bg-paper-raised p-5">
                      {chapter.items.map((item) => (
                        <li key={item} className="text-[0.88rem] leading-relaxed text-ink-soft">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
