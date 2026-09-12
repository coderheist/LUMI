"use client";

import { useEffect, useRef } from "react";
import { Media } from "@/components/ui/Media";
import { asset, video as videoAsset, type VideoKey } from "@/lib/assets";

/**
 * A framed loop with a poster. When the manifest has no file the frame renders
 * its poster and says so, rather than shipping a broken embed.
 *
 * Loading is entirely intersection-driven: `preload="none"` and no `autoPlay`
 * attribute, so a clip sitting far down the page downloads and decodes
 * nothing until the visitor actually scrolls near it. Without this, every
 * video on the page starts fetching and decoding the instant it mounts —
 * on a page with more than one loop, that is real, measurable main-thread
 * and network contention from the first paint, whether or not the clip is
 * ever seen. The 300px margin starts it a little before it is on screen, and
 * pausing on exit stops decode cost for anything scrolled away rather than
 * running every loop on the page at once.
 */
export function VideoFrame({
  name,
  caption,
  className = "",
  sizes,
  ratio,
}: {
  name: VideoKey;
  caption?: string;
  className?: string;
  sizes?: string;
  /** Override the clip's native ratio, e.g. to match a neighbour in a grid. */
  ratio?: number;
}) {
  const item = videoAsset(name);
  const poster = asset(item.poster);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer available: fall back to playing outright rather than a
      // clip that never starts.
      void node.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void node.play().catch(() => {});
        } else {
          node.pause();
        }
      },
      { rootMargin: "300px 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [item.available]);

  const box = ratio ?? item.ratio;

  return (
    <figure className={`m-0 ${className}`}>
      <div
        className="relative overflow-hidden rounded-panel border border-line bg-paper-sunken"
        style={item.available ? { aspectRatio: String(box) } : undefined}
      >
        {item.available ? (
          <video
            ref={ref}
            src={`/video/${item.file}`}
            poster={poster.available ? `/images/${poster.file}` : undefined}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            <Media name={item.poster} sizes={sizes} quiet />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-ink/15 bg-paper-raised/85 backdrop-blur-sm">
                <svg viewBox="0 0 16 16" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M4.5 2.8v10.4L13 8z" />
                </svg>
              </span>
            </div>
            <span className="absolute bottom-3 right-3 rounded-[7px] border border-ink/10 bg-paper-raised/85 px-2 py-1 text-[0.64rem] font-medium text-ink-soft backdrop-blur-sm">
              Poster frame
            </span>
          </>
        )}
      </div>
      {caption === "" ? null : (
        <figcaption className="t-micro mt-2.5">{caption ?? item.description}</figcaption>
      )}
    </figure>
  );
}
