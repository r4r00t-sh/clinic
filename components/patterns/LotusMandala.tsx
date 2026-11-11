"use client";

import { motion, useReducedMotion } from "framer-motion";
import { durations, pattern } from "@/lib/motion";
import { useIsMobile } from "@/lib/motion-prefs";

/** Large symmetrical lotus mandala — corner ornament, slow rotation. */
export function LotusMandala({
  className = "",
  opacity = pattern.mandalaOpacity,
  size = 720,
  rotate = true,
}: {
  className?: string;
  opacity?: number;
  size?: number;
  rotate?: boolean;
}) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const shouldRotate = rotate && !reduced && !mobile;

  return (
    <motion.svg
      className={`pointer-events-none absolute text-olive ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ opacity, color: "currentColor" }}
      animate={shouldRotate ? { rotate: 360 } : undefined}
      transition={
        shouldRotate
          ? { duration: durations.mandala, ease: "linear", repeat: Infinity }
          : undefined
      }
    >
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer petals */}
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={`o-${i}`}
            d="M100 20c8 20 12 40 0 60-12-20-8-40 0-60z"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
        {/* Mid petals */}
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={`m-${i}`}
            d="M100 40c6 14 8 28 0 42-8-14-6-28 0-42z"
            transform={`rotate(${i * 45 + 22.5} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="18" />
        <circle cx="100" cy="100" r="8" />
        <circle cx="100" cy="100" r="72" strokeDasharray="2 6" opacity="0.6" />
      </g>
    </motion.svg>
  );
}
