"use client";

import { useMemo } from "react";
import { createRng, range } from "@/lib/banyan/seeded-rng";
import { AnchoredRoots } from "./AnchoredRoots";

/** Leafy canopy fringe along the top of the olive CTA — roots only at sides. */
export function CtaLeafFringe({ seed = 55 }: { seed?: number }) {
  const leaves = useMemo(() => {
    const rng = createRng(seed);
    return Array.from({ length: 72 }, (_, i) => {
      const x = (i / 71) * 1440 + range(rng, -8, 8);
      const y = range(rng, 4, 36);
      return {
        x,
        y,
        rot: range(rng, -40, 40),
        s: range(rng, 0.7, 1.25),
        op: range(rng, 0.2, 0.35),
      };
    });
  }, [seed]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-36 overflow-visible md:h-40" aria-hidden>
      <svg viewBox="0 0 1440 120" className="absolute inset-0 h-full w-full" fill="none">
        <defs>
          <symbol id="cta-leaf" viewBox="0 0 18 24">
            <path
              d="M9 1C6.6 3.2 2.6 7 2.5 12.2c-.1 4.2 2.3 7.4 6.5 10.3 4.2-2.9 6.6-6.1 6.5-10.3C15.4 7 11.4 3.2 9 1z"
              fill="currentColor"
            />
          </symbol>
        </defs>
        {leaves.map((l, i) => (
          <use
            key={i}
            href="#cta-leaf"
            x={l.x - 9 * l.s}
            y={l.y - 12 * l.s}
            width={18 * l.s}
            height={24 * l.s}
            className="text-oat"
            opacity={l.op}
            transform={`rotate(${l.rot.toFixed(1)} ${l.x.toFixed(1)} ${l.y.toFixed(1)})`}
          />
        ))}
      </svg>
      {/* Side roots only — masked away from centre text */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "linear-gradient(90deg, black 0%, black 18%, transparent 28%, transparent 72%, black 82%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, black 18%, transparent 28%, transparent 72%, black 82%, black 100%)",
        }}
      >
        <AnchoredRoots
          variant="cta"
          seed={seed + 3}
          stroke="color-mix(in srgb, var(--oat) 55%, #4a3a24)"
          opacity={0.55}
        />
      </div>
    </div>
  );
}
