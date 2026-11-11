"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/motion/CountUp";
import { RevealStagger } from "@/components/motion/RevealStagger";
import { Section } from "@/components/ui/Section";
import { JaliLattice } from "@/components/patterns";
import { durations, easings, pattern } from "@/lib/motion";
import { site } from "@/lib/content/site";
import { useRevealGate } from "@/lib/use-in-view-safe";
import { useMotionOff } from "@/lib/use-motion-off";

export function TrustStrip() {
  const reduced = useReducedMotion();
  const motionOff = useMotionOff();
  const skip = !!reduced || motionOff;

  return (
    <Section surface className="!py-16 md:!py-20 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0 text-olive"
        aria-hidden
        style={{
          maskImage:
            "linear-gradient(90deg, black 0%, black 12%, transparent 22%, transparent 78%, black 88%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, black 12%, transparent 22%, transparent 78%, black 88%, black 100%)",
        }}
      >
        <JaliLattice opacity={pattern.jaliTrustOpacity} />
      </div>

      <RevealStagger className="relative z-[1] grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        <Stat
          value={32000}
          suffix="+"
          label="clients treated"
          icon={
            <path d="M16 11c1.66 0 3-1.57 3-3.5S17.66 4 16 4s-3 1.57-3 3.5 1.34 3.5 3 3.5zM8 11c1.66 0 3-1.57 3-3.5S9.66 4 8 4 5 5.57 5 7.5 6.34 11 8 11zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          }
          skip={skip}
        />
        <Stat
          value={30}
          suffix="+"
          label="years of authentic Ayurvedic healing"
          icon={
            <path d="M12 2L4 6v6c0 5 3.4 9.4 8 10.5C16.6 21.4 20 17 20 12V6l-8-4zm0 2.2l6 3v4.8c0 3.7-2.4 7-6 8.1-3.6-1.1-6-4.4-6-8.1V7.2l6-3z" />
          }
          skip={skip}
        />
        <Note
          label="Led by a Sheikh Zayed International Award-winning doctor"
          icon={
            <path d="M12 2l2.4 4.9L20 8l-4 3.9.9 5.5L12 15.3 7.1 17.4 8 11.9 4 8l5.6-1.1L12 2z" />
          }
        />
        <Note
          label="The first Ayurvedic healthcare facility in the Middle East"
          icon={
            <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
          }
        />
      </RevealStagger>
      <p className="sr-only">
        {site.clients} clients treated. {site.years} years of authentic Ayurvedic healing.
      </p>
    </Section>
  );
}

function Stat({
  value,
  suffix,
  label,
  icon,
  skip,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  skip: boolean;
}) {
  const { ref, shouldAnimate, visible } = useRevealGate();
  return (
    <div className="flex gap-4">
      <motion.span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sand text-olive"
        initial={false}
        animate={
          !shouldAnimate || skip || visible
            ? { scale: 1, opacity: 1 }
            : { scale: 0.9, opacity: 0 }
        }
        transition={{ duration: durations.reveal, ease: easings.reveal }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          {icon}
        </svg>
      </motion.span>
      <div className="min-w-0">
        <p
          className="font-serif leading-none text-olive-deep"
          style={{ fontSize: "clamp(2.75rem, 4vw, 3.5rem)" }}
        >
          <CountUp value={value} suffix={suffix} />
        </p>
        <p className="mt-2 text-[14px] leading-snug text-ink-soft md:text-[15px]">{label}</p>
      </div>
    </div>
  );
}

function Note({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sand text-olive">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          {icon}
        </svg>
      </span>
      <p className="pt-2 text-[15px] leading-relaxed text-ink">{label}</p>
    </div>
  );
}
