"use client";

import { memo } from "react";
import type { BanyanModel, LeafTone } from "@/lib/banyan/types";
import { LEAF_TONE_OPACITY } from "@/lib/banyan/types";
import { LeafSymbol } from "./LeafSymbol";

type LayerKey =
  | "canopy-back"
  | "canopy-mid"
  | "leaves"
  | "branches"
  | "roots"
  | "trunk"
  | "ground";

type Props = {
  model: BanyanModel;
  className?: string;
  layers?: Partial<Record<LayerKey, boolean>>;
  rootClassName?: string;
  idPrefix?: string;
};

const defaultLayers: Record<LayerKey, boolean> = {
  "canopy-back": true,
  "canopy-mid": true,
  leaves: true,
  branches: true,
  roots: true,
  trunk: true,
  ground: true,
};

const TONE_COLOR: Record<LeafTone, string> = {
  back: "var(--olive)",
  mid: "var(--olive)",
  front: "var(--olive)",
  deep: "var(--olive-deep)",
};

function LeafLayer({
  id,
  leaves,
  leafId,
  tones,
}: {
  id: string;
  leaves: BanyanModel["leaves"];
  leafId: string;
  tones: LeafTone[];
}) {
  const list = leaves.filter((l) => tones.includes(l.tone));
  if (!list.length) return null;
  return (
    <g id={id}>
      {list.map((l, i) => (
        <use
          key={i}
          href={`#${leafId}`}
          x={l.x - 9 * l.scale}
          y={l.y - 12 * l.scale}
          width={18 * l.scale}
          height={24 * l.scale}
          fill={TONE_COLOR[l.tone]}
          opacity={LEAF_TONE_OPACITY[l.tone]}
          transform={`rotate(${l.rot.toFixed(1)} ${l.x.toFixed(1)} ${l.y.toFixed(1)})`}
          className={l.tone === "front" || l.tone === "deep" ? "eh-leaf-shimmer" : undefined}
        />
      ))}
    </g>
  );
}

export const BanyanSvg = memo(function BanyanSvg({
  model,
  className = "",
  layers: layerOpts,
  rootClassName = "",
  idPrefix = "banyan",
}: Props) {
  const layers = { ...defaultLayers, ...layerOpts };
  const leafId = `${idPrefix}-leaf`;
  // Bark-brown via ink — keep opacity high so it never reads as grey on oat
  const bark = "var(--ink)";
  const sand = "var(--sand)";
  const olive = "var(--olive)";
  const oliveDeep = "var(--olive-deep)";

  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox={model.viewBox}
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: "var(--olive)" }}
    >
      <defs>
        <LeafSymbol id={leafId} />
      </defs>

      {layers.ground && model.ground.length > 0 && (
        <g id={`${idPrefix}-ground`}>
          {model.ground
            .filter((g) => g.kind === "mound")
            .map((g, i) => (
              <path key={`m-${i}`} d={g.d} fill={sand} fillOpacity={0.55} stroke="none" />
            ))}
          {model.ground
            .filter((g) => g.kind === "root")
            .map((g, i) => (
              <path
                key={`r-${i}`}
                d={g.d}
                fill="none"
                stroke={bark}
                strokeOpacity={0.35}
                strokeWidth={1.2}
                strokeLinecap="round"
              />
            ))}
          {model.ground
            .filter((g) => g.kind === "grass")
            .map((g, i) => (
              <path
                key={`g-${i}`}
                d={g.d}
                fill="none"
                stroke={olive}
                strokeOpacity={0.35}
                strokeWidth={1}
                strokeLinecap="round"
              />
            ))}
        </g>
      )}

      {layers["canopy-back"] && layers.leaves && (
        <LeafLayer
          id={`${idPrefix}-canopy-back`}
          leaves={model.leaves}
          leafId={leafId}
          tones={["back"]}
        />
      )}

      {layers.trunk && (
        <g id={`${idPrefix}-trunk`}>
          {model.trunkFills.map((f, i) => (
            <path
              key={i}
              d={f.d}
              fill={bark}
              fillOpacity={Math.max(0.48, f.opacity)}
              stroke="none"
            />
          ))}
          {model.barkStrokes.map((s, i) => (
            <path
              key={`b-${i}`}
              d={s.d}
              fill="none"
              stroke={oliveDeep}
              strokeOpacity={0.4}
              strokeWidth={s.width}
              strokeLinecap="round"
            />
          ))}
        </g>
      )}

      {layers.branches && (
        <g
          id={`${idPrefix}-branches`}
          fill="none"
          stroke={bark}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {model.branches.map((s, i) => (
            <path
              key={i}
              d={s.d}
              strokeWidth={s.width}
              strokeOpacity={0.58}
            />
          ))}
        </g>
      )}

      {layers["canopy-mid"] && layers.leaves && (
        <LeafLayer
          id={`${idPrefix}-canopy-mid`}
          leaves={model.leaves}
          leafId={leafId}
          tones={["mid"]}
        />
      )}

      {layers.leaves && (
        <LeafLayer
          id={`${idPrefix}-leaves-front`}
          leaves={model.leaves}
          leafId={leafId}
          tones={["front", "deep"]}
        />
      )}

      {layers.roots && (
        <g
          id={`${idPrefix}-roots`}
          fill="none"
          stroke={bark}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {model.roots.map((r, i) => (
            <g key={i}>
              <path
                d={r.d}
                stroke={r.pillar ? bark : oliveDeep}
                strokeWidth={r.width}
                strokeOpacity={r.pillar ? 0.58 : 0.5}
                className={rootClassName}
                style={
                  {
                    transformOrigin: `${r.ox}px ${r.oy}px`,
                    ["--phase" as string]: r.phase,
                  } as React.CSSProperties
                }
              />
              {r.leaf && (
                <use
                  href={`#${leafId}`}
                  x={r.leaf.x - 7 * r.leaf.scale}
                  y={r.leaf.y - 10 * r.leaf.scale}
                  width={14 * r.leaf.scale}
                  height={20 * r.leaf.scale}
                  fill="var(--olive)"
                  opacity={0.4}
                  transform={`rotate(${r.leaf.rot} ${r.leaf.x} ${r.leaf.y})`}
                />
              )}
            </g>
          ))}
        </g>
      )}
    </svg>
  );
});
