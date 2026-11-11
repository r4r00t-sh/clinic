"use client";

import { motion, useReducedMotion } from "framer-motion";
import { durations, easings, pattern } from "@/lib/motion";

type SpotProps = {
  className?: string;
  opacity?: number;
  sway?: boolean;
};

function Sway({
  children,
  className,
  opacity,
  sway = true,
}: SpotProps & { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      className={`pointer-events-none text-olive ${className}`}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ opacity: opacity ?? pattern.botanicalOpacity, color: "currentColor" }}
      animate={
        sway && !reduced ? { rotate: [-1.5, 1.5, -1.5] } : undefined
      }
      transition={
        sway && !reduced
          ? { duration: durations.sway, ease: easings.float, repeat: Infinity }
          : undefined
      }
    >
      {children}
    </motion.svg>
  );
}

export function TurmericSpot(props: SpotProps) {
  return (
    <Sway {...props} className={`h-48 w-36 ${props.className ?? ""}`}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 130c20-40 40-70 55-100" />
        <path d="M50 80c12-8 28-6 40 4" />
        <ellipse cx="88" cy="78" rx="14" ry="7" transform="rotate(-20 88 78)" />
        <path d="M55 100c-10-18-8-36 4-48" />
        <path d="M40 50c8-2 14 4 16 12M70 40c-4 8-2 16 4 22" />
      </g>
    </Sway>
  );
}

export function TulsiSpot(props: SpotProps) {
  return (
    <Sway {...props} className={`h-52 w-32 ${props.className ?? ""}`}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M60 150V30" />
        <path d="M60 50c-18 0-30 12-30 12M60 50c18 0 30 12 30 12" />
        <path d="M60 80c-16 0-26 14-26 14M60 80c16 0 26 14 26 14" />
        <path d="M60 110c-12 0-20 12-20 12M60 110c12 0 20 12 20 12" />
        <path d="M30 62c10-2 18 4 22 12M90 62c-10-2-18 4-22 12" />
      </g>
    </Sway>
  );
}

export function LotusBudSpot(props: SpotProps) {
  return (
    <Sway {...props} className={`h-44 w-36 ${props.className ?? ""}`}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 140c0-40 0-60 0-80" />
        <path d="M60 60c-16 8-22 28-16 48 10-12 20-18 16-48z" />
        <path d="M60 60c16 8 22 28 16 48-10-12-20-18-16-48z" />
        <path d="M60 55c-4 14-2 30 0 42 2-12 4-28 0-42z" />
        <path d="M48 130h24" />
      </g>
    </Sway>
  );
}

export function MortarPestleSpot(props: SpotProps) {
  return (
    <Sway {...props} sway={false} className={`h-40 w-40 ${props.className ?? ""}`}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 90h60l-6 40H36l-6-40z" />
        <path d="M28 90c0-8 14-14 32-14s32 6 32 14" />
        <path d="M75 40l20 45" />
        <path d="M72 38c6-4 14-2 18 4" />
      </g>
    </Sway>
  );
}

export function SandalwoodSpot(props: SpotProps) {
  return (
    <Sway {...props} className={`h-36 w-44 ${props.className ?? ""}`}>
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <ellipse cx="60" cy="80" rx="40" ry="14" />
        <path d="M30 75c10 4 30 6 50 0M35 85c12 3 28 3 42-2" />
        <path d="M55 66c2-20 8-36 18-48" />
        <path d="M70 30c6 2 10 8 12 14" />
      </g>
    </Sway>
  );
}
