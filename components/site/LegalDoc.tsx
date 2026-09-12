import { Section } from "@/components/ui/Section";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

/**
 * Shared layout for the policy pages, with a contents rail on the left. These
 * are readable placeholder documents for a template — not legal advice, and
 * they say so.
 */
export function LegalDoc({
  sections,
  updated,
}: {
  sections: LegalSection[];
  updated: string;
}) {
  return (
    <Section space="normal">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="t-micro mb-4">On this page</p>
            <ul className="flex flex-col gap-2.5 border-l border-line pl-4">
              {sections.map((section) => (
                <li key={section.heading}>
                  <a
                    href={`#${slug(section.heading)}`}
                    className="text-[0.86rem] text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
            <p className="t-micro mt-6">Last updated {updated}</p>
          </div>
        </nav>

        <div className="lg:col-span-9">
          <div className="max-w-[68ch] rounded-panel border border-line bg-paper-raised px-6 py-4 md:px-8 md:py-5">
            <p className="t-small">
              This is template placeholder content written to be realistic and readable. Replace it
              with your own policy before publishing — it is not legal advice.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-12">
            {sections.map((section) => (
              <section key={section.heading} id={slug(section.heading)} className="scroll-mt-28">
                <h2 className="t-h3">{section.heading}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 36)} className="t-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list ? (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                        <span className="t-body">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
