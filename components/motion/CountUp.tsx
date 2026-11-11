"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { durations } from "@/lib/motion";
import { useHydrated } from "@/lib/use-hydrated";
import { useMotionOff } from "@/lib/use-motion-off";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

/**
 * Starts at the final formatted value in the DOM (readable without JS).
 * After hydrate + in-view, animates from 0 → value, always ending exact.
 * Size is controlled by the parent — never changes during the count.
 */
export function CountUp({ value, suffix = "", prefix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const motionOff = useMotionOff();
  const formatted = `${prefix}${value.toLocaleString("en-US")}${suffix}`;
  const [display, setDisplay] = useState(formatted);
  const [ran, setRan] = useState(false);

  useEffect(() => {
    if (!hydrated || ran || reduced || motionOff) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRan(true);
        io.disconnect();

        const start = performance.now();
        const length = durations.count * 1000;
        let frame = 0;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / length);
          const eased = 1 - Math.pow(1 - t, 3);
          const n = Math.round(value * eased);
          setDisplay(`${prefix}${n.toLocaleString("en-US")}${suffix}`);
          if (t < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            setDisplay(formatted);
          }
        };
        setDisplay(`${prefix}0${suffix}`);
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hydrated, ran, reduced, motionOff, value, prefix, suffix, formatted]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={formatted}>
      {display}
    </span>
  );
}
