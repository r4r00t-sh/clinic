"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { distances, durations, easings } from "@/lib/motion";

/**
 * Soft route transitions. First paint is never hidden (avoids blank headings).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const first = useRef(true);

  useEffect(() => {
    first.current = false;
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={
          first.current || reduced
            ? false
            : { opacity: 0, y: distances.pageRise }
        }
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{
          duration: reduced ? durations.reduced : durations.page,
          ease: easings.reveal,
        }}
      >
        {!reduced && !first.current && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 right-0 top-0 z-[99] h-[3px] origin-left bg-olive"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: durations.page * 1.2, ease: easings.ui }}
            style={{ transformOrigin: "left" }}
          />
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
