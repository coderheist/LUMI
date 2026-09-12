import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { CHANGELOG } from "@/lib/data";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What shipped in Lumi — features, improvements and security changes.",
  alternates: { canonical: "/changelog" },
};

const TAG_STYLE: Record<string, string> = {
  Feature: "border-indigo/20 bg-indigo-tint text-indigo",
  Improvement: "border-line-strong bg-paper-sunken text-ink-soft",
  Security: "border-sage/25 bg-sage-tint text-sage",
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        title="What shipped."
        lead="Released roughly every three weeks. Security and data-handling changes are always listed, even the dull ones."
      />

      <Section space="normal">
        <div className="shell">
          <ol className="spine flex flex-col gap-14">
            {CHANGELOG.map((entry, index) => (
              <Reveal
                as="li"
                key={entry.version}
                delay={index * 70}
                className="spine-node"
                data-actor={index === 0 ? "lumi" : undefined}
              >
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-3">
                    <p data-numeric className="text-[1.3rem] font-medium tracking-[-0.03em]">
                      {entry.version}
                    </p>
                    <p className="t-micro mt-1">{formatDate(entry.date)}</p>
                    <span
                      className={`mt-3 inline-flex rounded-chip border px-2.5 py-1 text-[0.72rem] font-medium ${
                        TAG_STYLE[entry.tag] ?? TAG_STYLE.Improvement
                      }`}
                    >
                      {entry.tag}
                    </span>
                  </div>

                  <div className="lg:col-span-9">
                    <h2 className="t-h3">{entry.title}</h2>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {entry.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink-faint"
                          />
                          <span className="t-body">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <p className="t-micro mt-14">
            Release notes are template demonstration content.
          </p>
        </div>
      </Section>
    </>
  );
}
