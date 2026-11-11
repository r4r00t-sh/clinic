"use client";

import { useReducedMotion } from "framer-motion";
import { treatments } from "@/lib/content/treatments";
import { durations, pattern } from "@/lib/motion";

export function SanskritMarquee() {
  const reduced = useReducedMotion();
  const names = treatments.map((t) => t.name).join("  ·  ");
  const line = `${names}  ·  ${names}`;

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 -top-1 z-0 max-w-full overflow-hidden md:top-0"
      style={{ opacity: pattern.marqueeOpacity, contain: "paint" }}
      aria-hidden
    >
      <div
        className="eh-marquee group-hover/treatments:[animation-play-state:paused] flex w-max max-w-none whitespace-nowrap font-serif text-base tracking-[0.08em] text-olive-deep md:text-lg"
        style={{
          animation: `eh-marquee ${durations.marquee}s linear infinite`,
        }}
      >
        <span className="pr-16">{line}</span>
        <span className="pr-16">{line}</span>
      </div>
    </div>
  );
}
