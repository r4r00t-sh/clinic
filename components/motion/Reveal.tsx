"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { distances, durations, easings } from "@/lib/motion";
import { useIsMobile } from "@/lib/motion-prefs";
import { useRevealGate } from "@/lib/use-in-view-safe";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const { ref, shouldAnimate, visible } = useRevealGate();
  const y = mobile ? distances.riseMobile : distances.rise;

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
      initial={false}
      // Stay opaque so nested images aren't delayed by a blank fade
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 1, y }}
      transition={{
        duration: durations.reveal,
        ease: easings.reveal,
        delay: visible ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
