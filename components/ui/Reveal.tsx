"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/hooks";

export type RevealVariant = "rise" | "slide" | "scale" | "open" | "blur";

type RevealProps = {
  children: ReactNode;
  /** Stagger within a group, in milliseconds. */
  delay?: number;
  /** Which entrance this element uses. */
  variant?: RevealVariant;
  as?: ElementType;
  className?: string;
  /** Forwarded to the element — the spine uses data-actor to colour its nodes. */
  [key: `data-${string}`]: string | undefined;
};

/**
 * An entrance that upgrades itself.
 *
 * Where scroll-driven animations exist the stylesheet takes over and links the
 * entrance to scroll position; the observer below is the fallback path for
 * browsers without them. The `delay` prop feeds both: a transition delay for
 * the fallback, and a shift in the scroll range for the scroll-linked version,
 * so a staggered group stays staggered either way.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "rise",
  as: Tag = "div",
  className = "",
  ...rest
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-shown={inView ? "true" : "false"}
      data-variant={variant}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          // Milliseconds of stagger map onto a slice of the scroll range.
          "--sd-stagger": `${Math.min(delay / 12, 26)}%`,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
