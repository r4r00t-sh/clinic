"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { spring } from "@/lib/motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, spring.scrollProgress);
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[3px] bg-sand/40"
    >
      <motion.div
        className="h-full origin-left bg-olive"
        style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      />
    </div>
  );
}
