"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** True when the visitor has asked for reduced motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Shared geometry fallback.
 *
 * IntersectionObserver callbacks are only delivered during a rendering update,
 * so a page that is occluded, in a background tab, or restored from bfcache can
 * leave observers silent — and anything waiting on one stays invisible. These
 * pending checks run on mount and on scroll as a safety net, through a single
 * throttled listener rather than one per element.
 */
const pendingChecks = new Set<() => void>();
let listening = false;
let lastRun = 0;
let trailing: ReturnType<typeof setTimeout> | undefined;

/**
 * Throttled on a timestamp rather than requestAnimationFrame: rAF is paused in
 * exactly the non-rendering conditions this fallback exists to survive.
 */
function runPendingChecks() {
  const now = Date.now();
  const wait = 100 - (now - lastRun);

  if (wait <= 0) {
    lastRun = now;
    for (const check of pendingChecks) check();
    return;
  }

  if (trailing) return;
  trailing = setTimeout(() => {
    trailing = undefined;
    lastRun = Date.now();
    for (const check of pendingChecks) check();
  }, wait);
}

function watchGeometry(check: () => void) {
  pendingChecks.add(check);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", runPendingChecks, { passive: true });
    window.addEventListener("resize", runPendingChecks, { passive: true });
  }
  return () => {
    pendingChecks.delete(check);
  };
}

function isOnScreen(node: Element, bottomMargin: number) {
  const rect = node.getBoundingClientRect();
  if (rect.height === 0 && rect.width === 0) return false;
  return rect.top < window.innerHeight * bottomMargin && rect.bottom > 0;
}

/**
 * Fires once when the element scrolls into view. Demos use this so they
 * start playing when the visitor actually reaches them.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: { rootMargin?: string; threshold?: number; once?: boolean } = {},
): [React.RefObject<T | null>, boolean] {
  const { rootMargin = "0px 0px -12% 0px", threshold = 0.25, once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let settled = false;
    const reveal = () => {
      if (settled) return;
      settled = true;
      setInView(true);
      stopWatching();
      observer?.disconnect();
    };

    // Anything already on screen at mount is shown now rather than waiting for
    // an observer callback that may never arrive.
    const check = () => {
      if (isOnScreen(node, 0.88)) reveal();
    };

    const stopWatching = watchGeometry(check);

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  reveal();
                } else if (!once && settled) {
                  settled = false;
                  setInView(false);
                }
              }
            },
            { rootMargin, threshold },
          );

    observer?.observe(node);
    check();

    return () => {
      stopWatching();
      observer?.disconnect();
    };
  }, [rootMargin, threshold, once]);

  return [ref, inView];
}

/**
 * Counts a number up once activated. Under reduced motion it lands on the
 * final value immediately — the number is the content, the motion is not.
 */
export function useCountUp(
  target: number,
  { active, duration = 1400, decimals = 0 }: { active: boolean; duration?: number; decimals?: number },
): string {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutQuint — fast arrival, quiet settle
      const eased = 1 - Math.pow(1 - progress, 5);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, reduced]);

  return value.toFixed(decimals);
}

/**
 * Eases the displayed number from its previous value to the next one whenever
 * it changes. Used by the calculator, where the transition shows that the
 * result responded to the input you just moved.
 */
export function useTween(value: number, { duration = 480 }: { duration?: number } = {}): number {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    if (reduced) {
      fromRef.current = value;
      setDisplay(value);
      return;
    }

    const from = fromRef.current;
    const delta = value - from;
    if (delta === 0) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const next = from + delta * eased;
      setDisplay(next);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        fromRef.current = value;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      fromRef.current = value;
      cancelAnimationFrame(frame);
    };
  }, [value, duration, reduced]);

  return display;
}

export type ConversationStage = {
  /** Number of turns revealed so far. */
  shown: number;
  /** True while the next turn is "being written". */
  typing: boolean;
  /** Whether the script has finished. */
  done: boolean;
  replay: () => void;
};

/**
 * Plays a conversation script turn by turn, with a typing pause before each
 * reply from Lumi. Under reduced motion the whole thread is shown at once,
 * which is the resolved state the visitor needs to read anyway.
 */
export function useConversation(
  length: number,
  {
    active,
    typingMs = 900,
    readMs = 1250,
    startDelayMs = 350,
    typingBefore,
  }: {
    active: boolean;
    typingMs?: number;
    readMs?: number;
    startDelayMs?: number;
    /**
     * Which turns get a typing pause before they land — a customer does not
     * appear to "type" in a demo, only the agent does. Define this at module
     * scope so its identity stays stable across renders.
     */
    typingBefore?: readonly boolean[];
  },
): ConversationStage {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [runId, setRunId] = useState(0);

  const replay = useCallback(() => {
    setShown(0);
    setTyping(false);
    setRunId((id) => id + 1);
  }, []);

  useEffect(() => {
    if (!active) return;

    if (reduced) {
      setShown(length);
      setTyping(false);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let clock = startDelayMs;

    for (let index = 0; index < length; index += 1) {
      const pause = typingBefore ? typingBefore[index] : true;

      if (pause) {
        timers.push(setTimeout(() => setTyping(true), clock));
        clock += typingMs;
      }

      timers.push(
        setTimeout(() => {
          setTyping(false);
          setShown(index + 1);
        }, clock),
      );
      clock += readMs;
    }

    return () => timers.forEach(clearTimeout);
  }, [active, length, reduced, typingMs, readMs, startDelayMs, typingBefore, runId]);

  return { shown, typing, done: shown >= length, replay };
}

/**
 * Steps through a list of retrieval sources, then resolves. Used by the
 * demos that need to show Lumi looking something up before it answers.
 */
export function useRetrieval(
  steps: number,
  { active, stepMs = 620, settleMs = 520 }: { active: boolean; stepMs?: number; settleMs?: number },
): { checked: number; resolved: boolean } {
  const reduced = useReducedMotion();
  const [checked, setChecked] = useState(0);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (!active) return;

    if (reduced) {
      setChecked(steps);
      setResolved(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let index = 0; index < steps; index += 1) {
      timers.push(setTimeout(() => setChecked(index + 1), stepMs * (index + 1)));
    }
    timers.push(setTimeout(() => setResolved(true), stepMs * steps + settleMs));

    return () => timers.forEach(clearTimeout);
  }, [active, steps, reduced, stepMs, settleMs]);

  return { checked, resolved };
}

/** Tracks whether the page has been scrolled past a threshold. */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

