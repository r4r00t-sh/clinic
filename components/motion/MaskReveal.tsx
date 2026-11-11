"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { durations, easings } from "@/lib/motion";
import { useRevealGate } from "@/lib/use-in-view-safe";

type Props = {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "top" | "left" | "right";
  delay?: number;
};

const clips = {
  bottom: { hidden: "inset(100% 0% 0% 0%)", visible: "inset(0% 0% 0% 0%)" },
  top: { hidden: "inset(0% 0% 100% 0%)", visible: "inset(0% 0% 0% 0%)" },
  left: { hidden: "inset(0% 100% 0% 0%)", visible: "inset(0% 0% 0% 0%)" },
  right: { hidden: "inset(0% 0% 0% 100%)", visible: "inset(0% 0% 0% 0%)" },
};

export function MaskReveal({
  children,
  className = "",
  from = "bottom",
  delay = 0,
}: Props) {
  const reduced = useReducedMotion();
  const { ref, shouldAnimate, visible } = useRevealGate();
  const clip = clips[from];

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
      animate={
        visible
          ? { clipPath: clip.visible, scale: 1 }
          : { clipPath: clip.hidden, scale: 1.04 }
      }
      transition={{
        duration: durations.mask,
        ease: easings.reveal,
        delay: visible ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
