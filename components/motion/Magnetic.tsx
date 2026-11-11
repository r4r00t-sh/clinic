"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { distances, spring } from "@/lib/motion";
import { useIsMobile, useIsTouch } from "@/lib/motion-prefs";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/** Desktop-only magnetic pull on primary CTAs. Max 6px. */
export function Magnetic({
  children,
  className = "",
  strength = distances.magnetic,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const touch = useIsTouch();
  const disabled = reduced || mobile || touch;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.scrollProgress);
  const sy = useSpring(y, spring.scrollProgress);

  function onMove(e: React.MouseEvent) {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.min(1, Math.hypot(dx, dy) / (rect.width / 2));
    x.set((dx / (rect.width / 2)) * strength * dist);
    y.set((dy / (rect.height / 2)) * strength * dist);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: distances.pressScale }}
    >
      {children}
    </motion.div>
  );
}
