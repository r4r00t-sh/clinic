"use client";

import { useId } from "react";
import { pattern } from "@/lib/motion";

/** Fine geometric jali lattice tile (~96px). */
export function JaliLattice({
  className = "",
  opacity = pattern.jaliOpacity,
}: {
  className?: string;
  opacity?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const tile = `jali-tile-${uid}`;
  const fade = `jali-fade-${uid}`;
  const mask = `jali-mask-${uid}`;
  const t = pattern.jaliTile;

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, color: "currentColor" }}
    >
      <defs>
        <pattern id={tile} width={t} height={t} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            <rect x="8" y="8" width="32" height="32" rx="2" />
            <rect x="56" y="8" width="32" height="32" rx="2" />
            <rect x="8" y="56" width="32" height="32" rx="2" />
            <rect x="56" y="56" width="32" height="32" rx="2" />
            <path d="M24 8v32M8 24h32M72 8v32M56 24h32M24 56v32M8 72h32M72 56v32M56 72h32" />
            <circle cx="48" cy="48" r="6" />
            <path d="M48 8v8M48 80v8M8 48h8M80 48h8" />
          </g>
        </pattern>
        <radialGradient id={fade} cx="50%" cy="40%" r="75%">
          <stop offset="30%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={mask}>
          <rect width="100%" height="100%" fill={`url(#${fade})`} />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${tile})`} mask={`url(#${mask})`} />
    </svg>
  );
}

export const jaliDataUri = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none" stroke="%23F7F2E8" stroke-width="1"><rect x="8" y="8" width="32" height="32" rx="2"/><rect x="56" y="8" width="32" height="32" rx="2"/><rect x="8" y="56" width="32" height="32" rx="2"/><rect x="56" y="56" width="32" height="32" rx="2"/><circle cx="48" cy="48" r="6"/></svg>`,
);
