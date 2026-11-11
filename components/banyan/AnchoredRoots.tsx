"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { createRng, range } from "@/lib/banyan/seeded-rng";
import { useMotionOff } from "@/lib/use-motion-off";
import { useIsMobile } from "@/lib/motion-prefs";

type Root = {
  fill: string;
  phase: number;
  ox: number;
  oy: number;
  leaf?: { x: number; y: number; rot: number; s: number };
};

function makeSide(
  rng: () => number,
  side: "left" | "right",
  count: number,
  maxLen: number,
  allowStubs = true,
): Root[] {
  const roots: Root[] = [];
  // Cluster centres with intentional gaps — never even spacing
  const clusters: number[] =
    side === "left"
      ? [55, 110, 175].slice(0, Math.ceil(count / 2))
      : [1265, 1330, 1390].slice(0, Math.ceil(count / 2));

  let made = 0;
  for (const cx of clusters) {
    const inCluster = Math.min(count - made, 1 + Math.floor(rng() * 3));
    for (let j = 0; j < inCluster; j++) {
      const x = cx + range(rng, -16, 16);
      const y = range(rng, 2, 10);
      // First root in each cluster is always a long hang; extras may be stubs
      const stub = allowStubs && j > 0 && rng() > 0.45;
      const len = stub ? range(rng, 12, 20) : range(rng, Math.min(90, maxLen - 10), maxLen);
      // Nearly vertical hang — tiny drift only (tight curls read as "8"/"&")
      const bend = (stub ? range(rng, 1, 3) : range(rng, 4, 10)) * (rng() > 0.5 ? 1 : -1);
      const tipX = x + bend * 0.1;
      const tipY = y + len;
      const c1x = x + bend * 0.55;
      const c1y = y + len * 0.32;
      const c2x = x - bend * 0.25;
      const c2y = y + len * 0.7;
      const topW = stub ? range(rng, 2.6, 3.2) : range(rng, 3.2, 4.2);
      const tipW = range(rng, 0.45, 0.8);
      const fill = [
        `M${(x - topW / 2).toFixed(1)} ${y.toFixed(1)}`,
        `C${(c1x - topW * 0.3).toFixed(1)} ${c1y.toFixed(1)} ${(c2x - tipW).toFixed(1)} ${c2y.toFixed(1)} ${(tipX - tipW / 2).toFixed(1)} ${tipY.toFixed(1)}`,
        `L${(tipX + tipW / 2).toFixed(1)} ${tipY.toFixed(1)}`,
        `C${(c2x + tipW).toFixed(1)} ${c2y.toFixed(1)} ${(c1x + topW * 0.3).toFixed(1)} ${c1y.toFixed(1)} ${(x + topW / 2).toFixed(1)} ${y.toFixed(1)}`,
        "Z",
      ].join(" ");
      roots.push({
        fill,
        phase: rng(),
        ox: x,
        oy: y,
        leaf:
          !stub && rng() > 0.6
            ? {
                x: (x + c1x) / 2,
                y: (y + c1y) / 2,
                rot: range(rng, -28, 28),
                s: range(rng, 0.45, 0.7),
              }
            : undefined,
      });
      made++;
      if (made >= count) break;
    }
    if (made >= count) break;
  }
  return roots;
}

type Props = {
  variant: "hero" | "cta";
  seed?: number;
  className?: string;
  stroke?: string;
  opacity?: number;
};

/** Aerial roots hanging from a canopy fringe — clustered, tapered, never floating mid-band. */
export function AnchoredRoots({
  variant,
  seed = 91,
  className = "",
  stroke = "var(--ink)",
  opacity = 0.5,
}: Props) {
  const reduced = useReducedMotion();
  const motionOff = useMotionOff();
  const mobile = useIsMobile();
  const skip = !!reduced || motionOff;
  const hide = mobile && variant === "cta";

  const { roots, vb } = useMemo(() => {
    const rng = createRng(seed + (variant === "cta" ? 19 : 0));
    const perSide = mobile ? 2 : variant === "hero" ? 3 + Math.floor(rng() * 3) : 4 + Math.floor(rng() * 2);
    const maxLen = variant === "hero" ? (mobile ? 95 : 115) : 105;
    const allowStubs = !(mobile && variant === "hero");
    return {
      roots: [
        ...makeSide(rng, "left", perSide, maxLen, allowStubs),
        ...makeSide(rng, "right", perSide, maxLen, allowStubs),
      ],
      vb: "0 0 1440 160",
    };
  }, [seed, variant, mobile]);

  if (hide) return null;

  return (
    <svg
      viewBox={vb}
      preserveAspectRatio="xMidYMin meet"
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}
      aria-hidden
      fill="none"
    >
      {roots.map((r, i) => (
        <g
          key={i}
          className={skip ? undefined : "eh-banyan-sway"}
          style={
            {
              transformOrigin: `${r.ox}px ${r.oy}px`,
              ["--phase" as string]: r.phase,
            } as React.CSSProperties
          }
        >
          <path d={r.fill} fill={stroke} fillOpacity={opacity} />
          {r.leaf && (
            <ellipse
              cx={r.leaf.x}
              cy={r.leaf.y}
              rx={3.2 * r.leaf.s}
              ry={5 * r.leaf.s}
              fill="var(--olive)"
              fillOpacity={0.38}
              transform={`rotate(${r.leaf.rot} ${r.leaf.x} ${r.leaf.y})`}
            />
          )}
        </g>
      ))}
    </svg>
  );
}
