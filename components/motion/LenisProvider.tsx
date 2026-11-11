"use client";

import { useEffect, type ReactNode } from "react";
import { lenis as lenisTokens } from "@/lib/motion";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/motion-prefs";
import { useMotionOff } from "@/lib/use-motion-off";

/**
 * Smooth scroll as a side-effect only — never wrap the page tree.
 * Wrapping with next/dynamic({ ssr:false }) previously stripped all SSR HTML.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const touch = useIsTouch();
  const motionOff = useMotionOff();

  useEffect(() => {
    if (reduced || touch || motionOff) return;

    let cancelled = false;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void; scrollTo: (t: HTMLElement, o: { offset: number }) => void } | null =
      null;

    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a[href^='#']");
      if (!target || !lenis) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -96 });
    }

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        lerp: lenisTokens.lerp,
        duration: lenisTokens.duration,
        smoothWheel: true,
        touchMultiplier: 0,
      });
      const tick = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      document.addEventListener("click", onClick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      lenis = null;
    };
  }, [reduced, touch, motionOff]);

  return <>{children}</>;
}
