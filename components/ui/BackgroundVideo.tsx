"use client";

import { useEffect, useRef } from "react";
import { Media } from "@/components/ui/Media";
import { asset, video as videoAsset, type VideoKey } from "@/lib/assets";

/**
 * Decorative full-bleed loop behind a section, running continuously.
 *
 * The poster still is set on the element so the frame is painted before the
 * video has buffered, which keeps the hero's largest paint off the video
 * download. When the manifest has no clip, the poster image is the design.
 *
 * Loading is intersection-driven like `<VideoFrame>` — no `autoPlay`
 * attribute and `preload="none"`, so an off-screen background never
 * downloads. For an above-the-fold instance (`priority`) this still starts
 * essentially immediately, since the observer's first callback fires with
 * the element already in view; it costs one tick, not a visible delay.
 */
export function BackgroundVideo({
  name,
  className = "",
  priority = false,
}: {
  name: VideoKey;
  className?: string;
  /** Set on an above-the-fold background: the poster is the LCP element. */
  priority?: boolean;
}) {
  const item = videoAsset(name);
  const poster = asset(item.poster);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      void node.play().catch(() => {});
      return;
    }

    // Stop decoding once the section is well off screen. The observer only
    // ever pauses, so if it never fires the loop simply keeps running.
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

  if (!item.available) {
    return (
      <Media name={item.poster} fill sizes="100vw" quiet priority={priority} className={className} />
    );
  }

  return (
    <video
      ref={ref}
      src={`/video/${item.file}`}
      poster={poster.available ? `/images/${poster.file}` : undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  );
}
