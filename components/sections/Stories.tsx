import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { STORIES } from "@/lib/data";
import type { AssetKey } from "@/lib/assets";

export function Stories() {
  return (
    <Section id="stories" space="loose">
      <div className="shell">
        <SectionHead
          title="What changed for three brands."
          lead="Fictional customers, illustrative numbers — written to show the shape of the change rather than to claim a result."
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {STORIES.map((story, index) => (
            <Reveal key={story.brand} delay={index * 90}>
              <article className="card-lift flex h-full flex-col rounded-card">
                {/* Fixed ratio across all three, so the cards stay on a shared
                    baseline even though the source images differ. */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                  <Media
                    name={story.image as AssetKey}
                    fill
                    sizes="(max-width: 768px) 100vw, 32vw"
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h3 className="text-[1.05rem] font-medium tracking-[-0.02em]">{story.brand}</h3>
                  <p className="t-micro">{story.sector}</p>
                </div>

                <blockquote className="mt-4 flex-1">
                  <p className="text-[0.95rem] leading-relaxed">&ldquo;{story.quote}&rdquo;</p>
                  <footer className="t-micro mt-3">
                    {story.person}, {story.role}
                  </footer>
                </blockquote>

                <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line">
                  <div className="bg-paper-raised p-4">
                    <dt className="t-micro">Before</dt>
                    <dd
                      data-numeric
                      className="mt-1 text-[1.25rem] font-medium tracking-[-0.03em] text-ink-soft"
                    >
                      {story.before.value}
                    </dd>
                  </div>
                  <div className="bg-paper-raised p-4">
                    <dt className="t-micro">After</dt>
                    <dd
                      data-numeric
                      className="mt-1 text-[1.25rem] font-medium tracking-[-0.03em] text-indigo"
                    >
                      {story.after.value}
                    </dd>
                  </div>
                  <p className="col-span-2 bg-paper-raised px-4 pb-3.5 text-[0.75rem] text-ink-faint">
                    {story.after.label}
                  </p>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
