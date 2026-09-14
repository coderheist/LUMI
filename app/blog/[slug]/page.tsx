import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { POSTS, postBySlug } from "@/lib/data";
import type { AssetKey } from "@/lib/assets";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const more = POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: "Lumi" },
  };

  return (
    <>
      <article>
        <header className="relative border-b border-line pt-32 pb-12 md:pt-40 md:pb-16">
          <div aria-hidden className="paper-field absolute inset-0 opacity-50" />
          <div className="shell-tight relative">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]}
            />
            <h1 className="t-h1 mt-6">{post.title}</h1>
            <p className="t-lead mt-6">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line pt-6">
              <p className="text-[0.9rem]">{post.author.name}</p>
              <p className="t-micro">{post.author.role}</p>
              <p className="t-micro ml-auto">
                {formatDate(post.date)} · {post.readingTime} · {post.category}
              </p>
            </div>
          </div>
        </header>

        <div className="shell-tight py-12 md:py-16">
          <div className="relative aspect-[16/9] overflow-hidden rounded-panel">
            <Media name={post.image as AssetKey} fill sizes="(max-width: 1024px) 100vw, 60rem" priority />
          </div>

          <div className="mt-12 flex flex-col gap-6">
            {post.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="t-body max-w-none text-[1.08rem] leading-[1.7]">
                {paragraph}
              </p>
            ))}
          </div>

          <p className="t-micro mt-12 border-t border-line pt-6">
            Written as template demonstration content. NOVA, Morrow and Aster are fictional brands.
          </p>
        </div>
      </article>

      <Section tone="sunken" space="normal">
        <div className="shell">
          <h2 className="t-h3">Keep reading</h2>
          <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-3">
            {more.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70}>
                <article>
                  <Link href={`/blog/${item.slug}`} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                      <Media name={item.image as AssetKey} fill sizes="(max-width: 768px) 100vw, 30vw" />
                    </div>
                  </Link>
                  <p className="t-micro mt-4">{item.category}</p>
                  <h3 className="t-h3 mt-1.5 text-[1.1rem]">
                    <Link href={`/blog/${item.slug}`} className="hover:text-indigo">
                      {item.title}
                    </Link>
                  </h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
