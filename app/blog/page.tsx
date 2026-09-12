import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site/PageHeader";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { POSTS } from "@/lib/data";
import type { AssetKey } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on support automation for ecommerce brands — returns, sizing, escalation design and keeping context across channels.",
  alternates: { canonical: "/blog" },
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  const [lead, ...rest] = POSTS;

  return (
    <>
      <PageHeader
        title="Notes from the support desk."
        lead="Short pieces on what actually happens when you put an agent in front of customers."
      />

      <Section space="normal">
        <div className="shell">
          {/* Lead article gets a different composition to the rest — a list of
              identical cards would flatten the hierarchy. */}
          <Reveal>
            <article className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <Link href={`/blog/${lead.slug}`} className="group lg:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden rounded-panel">
                  <Media
                    name={lead.image as AssetKey}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                  />
                </div>
              </Link>

              <div className="flex flex-col justify-center lg:col-span-5">
                <p className="t-micro">
                  {lead.category} · {formatDate(lead.date)} · {lead.readingTime}
                </p>
                <h2 className="t-h2 mt-4">
                  <Link href={`/blog/${lead.slug}`} className="hover:text-indigo">
                    {lead.title}
                  </Link>
                </h2>
                <p className="t-body mt-5">{lead.excerpt}</p>
                <p className="t-small mt-6">
                  {lead.author.name} — {lead.author.role}
                </p>
              </div>
            </article>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-12 border-t border-line pt-12 md:grid-cols-3">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={index * 80}>
                <article className="flex h-full flex-col">
                  <Link href={`/blog/${post.slug}`} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                      <Media
                        name={post.image as AssetKey}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    </div>
                  </Link>

                  <p className="t-micro mt-4">
                    {post.category} · {post.readingTime}
                  </p>
                  <h3 className="t-h3 mt-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-indigo">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="t-small mt-3 flex-1">{post.excerpt}</p>
                  <p className="t-micro mt-5">{formatDate(post.date)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
