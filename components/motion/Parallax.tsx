"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { spring } from "@/lib/motion";
import { useIsMobile } from "@/lib/motion-prefs";
import { useMotionOff } from "@/lib/use-motion-off";

type Props = {
  children: ReactNode;
  /** Positive = slower than scroll; negative = faster / opposite */
  speed?: number;
  className?: string;
};

export function Parallax({ children, speed = 0.15, className = "" }: Props) {
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

  const factor = mobile ? speed * 0.5 : speed;
  const rawY = useTransform(scrollYProgress, [0, 1], [factor * 80, factor * -80]);
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

  if (skip) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, willChange: active ? "transform" : "auto" }}
    >
      {children}
    </motion.div>
  );
}
