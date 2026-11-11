"use client";

import { useId } from "react";
import { pattern } from "@/lib/motion";

/** Seamless neem/tulsi leaf tile (~160px). Stroke-only. */
export function NeemLeafPattern({
  className = "",
  opacity = pattern.neemOpacity,
}: {
  className?: string;
  opacity?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const tile = `neem-tile-${uid}`;
  const fade = `neem-fade-${uid}`;
  const mask = `neem-mask-${uid}`;

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, color: "currentColor" }}
    >
      <defs>
        <pattern
          id={tile}
          width={pattern.neemTile}
          height={pattern.neemTile}
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
            <path d="M20 20c8-14 24-14 32 0-8 14-24 14-32 0z" />
            <path d="M36 20v18" />
            <path d="M90 50c8-14 24-14 32 0-8 14-24 14-32 0z" />
            <path d="M106 50v18" />
            <path d="M50 100c8-14 24-14 32 0-8 14-24 14-32 0z" />
            <path d="M66 100v18" />
            <path d="M120 130c6-10 18-10 24 0-6 10-18 10-24 0z" />
            <path d="M132 130v12" />
          </g>
        </pattern>
        <radialGradient id={fade} cx="50%" cy="50%" r="70%">
          <stop offset="40%" stopColor="white" stopOpacity="1" />
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

export const neemLeafDataUri = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none" stroke="%236F7D3C" stroke-width="1.1" stroke-linecap="round"><path d="M20 20c8-14 24-14 32 0-8 14-24 14-32 0z"/><path d="M36 20v18"/><path d="M90 50c8-14 24-14 32 0-8 14-24 14-32 0z"/><path d="M106 50v18"/><path d="M50 100c8-14 24-14 32 0-8 14-24 14-32 0z"/><path d="M66 100v18"/></svg>`,
);
