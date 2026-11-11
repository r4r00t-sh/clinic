"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { distances, spring } from "@/lib/motion";
import { useIsMobile } from "@/lib/motion-prefs";
import { useMotionOff } from "@/lib/use-motion-off";

type Props = {
  children: ReactNode;
  className?: string;
  /** Scale of the inner image layer */
  scale?: number;
};

/**
 * Overflow-hidden frame; child image scaled ~1.15 and translates -8% to +8% Y.
 * Preserve arch/rounded masks on the outer frame.
 */
export function ParallaxImage({
  children,
  className = "",
  scale = distances.imageScale,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const motionOff = useMotionOff();
  const mobile = useIsMobile();
  const [active, setActive] = useState(false);
  const skip = !!reduced || motionOff;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = mobile ? distances.parallaxImage * 0.5 : distances.parallaxImage;
  const rawY = useTransform(scrollYProgress, [0, 1], [`${range}%`, `-${range}%`]);
  const y = useSpring(rawY, spring.scrollProgress);

  useEffect(() => {
    const el = ref.current;
    if (!el || skip) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [skip]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-full w-full"
        style={
          skip
            ? { scale: 1 }
            : {
                scale,
                y,
                willChange: active ? "transform" : "auto",
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
