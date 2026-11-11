"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";
import { distances, durations, easings } from "@/lib/motion";
import { useIsMobile } from "@/lib/motion-prefs";
import { useRevealGate } from "@/lib/use-in-view-safe";

type Props = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

/**
 * Soft rise-in only — children stay opaque so images can load while approaching.
 * Never starts at opacity 0 (that made grids look blank until mid-section).
 */
export function RevealStagger({
  children,
  className = "",
  stagger = durations.childStagger,
}: Props) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const { ref, shouldAnimate, visible } = useRevealGate();
  const y = mobile ? distances.riseMobile : distances.rise;
  const items = Children.toArray(children);

  if (reduced || !shouldAnimate) {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {items.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            // Keep opacity at 1 so next/image lazy-load + decode aren't blocked
            hidden: { opacity: 1, y },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: durations.reveal, ease: easings.reveal },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
