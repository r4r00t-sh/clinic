"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { generateBanyan } from "@/lib/banyan/generate";
import { BANYAN_SEEDS } from "@/lib/banyan/types";
import { spring } from "@/lib/motion";
import { useMotionOff } from "@/lib/use-motion-off";
import { useIsMobile } from "@/lib/motion-prefs";
import { BanyanSvg } from "./BanyanSvg";
import { AnchoredRoots } from "./AnchoredRoots";

/** Leaf garland band + anchored side aerial roots. */
export function HeroCanopy({ seed = BANYAN_SEEDS.hero }: { seed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const motionOff = useMotionOff();
  const mobile = useIsMobile();
  const skip = !!reduced || motionOff || mobile;
  const model = useMemo(() => generateBanyan("hero", seed), [seed]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBack = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, skip ? 0 : 10]),
    spring.scrollProgress,
  );
  const yMid = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, skip ? 0 : 18]),
    spring.scrollProgress,
  );

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {!skip && (
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(ellipse 40% 55% at 30% 40%, var(--turmeric), transparent 70%), radial-gradient(ellipse 32% 45% at 70% 25%, var(--turmeric), transparent 65%)",
          }}
        />
      )}

      <motion.div className="absolute inset-0" style={{ y: yBack }}>
        <BanyanSvg
          model={model}
          idPrefix="hero-back"
          layers={{
            "canopy-back": true,
            "canopy-mid": false,
            leaves: true,
            branches: false,
            trunk: false,
            roots: false,
            ground: false,
          }}
          className="h-full w-full"
        />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ y: yMid }}>
        <BanyanSvg
          model={model}
          idPrefix="hero-mid"
          layers={{
            "canopy-back": false,
            "canopy-mid": true,
            leaves: true,
            branches: false,
            trunk: false,
            roots: false,
            ground: false,
          }}
          className="h-full w-full"
        />
      </motion.div>

      {/* Aerial roots start in the leaf mass — sides only, within the canopy band */}
      <div
        className="absolute inset-x-0 top-[22%] h-[78%]"
        style={{
          maskImage:
            "linear-gradient(90deg, black 0%, black 18%, transparent 28%, transparent 72%, black 82%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, black 18%, transparent 28%, transparent 72%, black 82%, black 100%)",
        }}
      >
        <AnchoredRoots variant="hero" seed={seed} stroke="#4a3a28" opacity={0.5} />
      </div>
    </div>
  );
}
