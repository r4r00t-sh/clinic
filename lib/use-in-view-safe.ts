"use client";

import { useEffect, useRef, useState } from "react";
import { durations } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";
import { useMotionOff } from "@/lib/use-motion-off";

/**
 * Progressive-enhancement in-view helper.
 * - Default visible (SSR / no-JS / reduced motion / ?motion=off).
 * - Above-the-fold stays painted (no hydrate flash).
 * - Below-fold reveals as soon as it nears the viewport — never after
 *   you've already scrolled halfway through the section.
 */
export function useRevealGate(options?: {
  hero?: boolean;
  rootMargin?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const hydrated = useHydrated();
  const motionOff = useMotionOff();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!hydrated) return;
    const el = ref.current;
    if (!el) return;

    if (motionOff) {
      setShouldAnimate(false);
      setVisible(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    // Anything that already intersects (or is within ~half a screen below) stays visible
    const alreadyInView = rect.top < vh * 1.15 && rect.bottom > 0;

    if (options?.hero || alreadyInView) {
      setShouldAnimate(false);
      setVisible(true);
      return;
    }

    setShouldAnimate(true);
    setVisible(false);

    let watchdog: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          setVisible(true);
          watchdog = window.setTimeout(() => setVisible(true), durations.revealWatchdogMs);
          io.disconnect();
        }
      },
      {
        // Fire on first pixel — never wait for 10–12% of a tall block
        threshold: 0,
        // Expand root downward so content reveals as it approaches, not after mid-section
        rootMargin: options?.rootMargin ?? "0px 0px 40% 0px",
      },
    );
    io.observe(el);

    const absolute = window.setTimeout(() => setVisible(true), 6000);

    return () => {
      io.disconnect();
      if (watchdog) clearTimeout(watchdog);
      clearTimeout(absolute);
    };
  }, [hydrated, motionOff, options?.hero, options?.rootMargin]);

  return { ref, hydrated, shouldAnimate, visible, setVisible, motionOff };
}
