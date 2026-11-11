"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { durations, easings, pattern, thresholds } from "@/lib/motion";
import { useMotionOff } from "@/lib/use-motion-off";

/** Soft parallel wave lines — section divider / scroll-drawn path. */
export function DharaFlow({
  className = "",
  animate = true,
  opacity = pattern.dharaOpacity,
}: {
  className?: string;
  animate?: boolean;
  opacity?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.01 });
  const reduced = useReducedMotion();
  const motionOff = useMotionOff();
  const uid = useId().replace(/:/g, "");
  const [done, setDone] = useState(false);
  const skip = !animate || !!reduced || motionOff;

  useEffect(() => {
    if (skip || !inView) return;
    const t = window.setTimeout(() => setDone(true), durations.revealWatchdogMs);
    return () => clearTimeout(t);
  }, [skip, inView]);

  const showFull = skip || done || inView;

  return (
    <svg
      ref={ref}
      className={`pointer-events-none h-12 w-full text-olive ${className}`}
      viewBox="0 0 1200 48"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ opacity, color: "currentColor" }}
    >
      {[0, 1, 2].map((i) => {
        const d = `M0 ${16 + i * 8} Q150 ${4 + i * 8} 300 ${16 + i * 8} T600 ${16 + i * 8} T900 ${16 + i * 8} T1200 ${16 + i * 8}`;
        if (!skip && !done) {
          return (
            <motion.path
              key={i}
              d={d}
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={showFull ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                duration: durations.mask,
                ease: easings.reveal,
                delay: i * 0.12,
              }}
              onAnimationComplete={() => {
                if (i === 2) setDone(true);
              }}
            />
          );
        }
        return (
          <path
            key={`${uid}-${i}`}
            d={d}
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

/** Curved SVG section transition between backgrounds */
export function WaveDivider({
  className = "",
  flip = false,
  fill = "var(--surface)",
}: {
  className?: string;
  flip?: boolean;
  fill?: string;
}) {
  return (
    <div
      className={`pointer-events-none leading-[0] ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="h-8 w-full md:h-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 24C240 48 480 0 720 24C960 48 1200 0 1440 24V48H0V24Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
