"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import type { Post } from "@/lib/data";
import type { AssetKey } from "@/lib/assets";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/**
 * Client-side only — 4 articles doesn't warrant a search index or an
 * endpoint, just a substring filter over what's already on the page.
 */
export function BlogList({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!trimmed) return posts;
    return posts.filter((post) =>
      [post.title, post.excerpt, post.category, post.author.name].some((field) =>
        field.toLowerCase().includes(trimmed),
      ),
    );
  }, [posts, trimmed]);

  const [lead, ...rest] = filtered;
  const showLeadLayout = trimmed === "" && filtered.length === posts.length;

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Search articles</span>
        <svg
          viewBox="0 0 16 16"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <circle cx="7" cy="7" r="4.8" />
          <path d="M13.2 13.2 10.6 10.6" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search articles"
          className="h-11 w-full max-w-[22rem] rounded-chip border border-line-strong bg-paper px-3.5 pl-10 text-[0.92rem] transition-colors duration-200 hover:border-ink focus:border-ink"
        />
      </label>

      {filtered.length === 0 ? (
        <p className="t-body mt-12">No articles match &ldquo;{query}&rdquo;.</p>
      ) : showLeadLayout && lead ? (
        <>
          {/* Lead article gets a different composition to the rest — a list of
              identical cards would flatten the hierarchy. */}
          <Reveal>
            <article className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
              <Link href={`/blog/${lead.slug}`} className="group lg:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden rounded-panel">
                  <Media
                    name={lead.image as AssetKey}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                    className="img-zoom"
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
              <PostCard key={post.slug} post={post} delay={index * 80} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {filtered.map((post, index) => (
            <PostCard key={post.slug} post={post} delay={index * 60} />
          ))}
        </div>
      )}
    </div>
  );
}

function PostCard({ post, delay }: { post: Post; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="flex h-full flex-col">
        <Link href={`/blog/${post.slug}`} className="group">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Media name={post.image as AssetKey} fill sizes="(max-width: 768px) 100vw, 30vw" className="img-zoom" />
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
  );
}
