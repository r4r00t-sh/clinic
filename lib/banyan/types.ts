export type Pt = { x: number; y: number };

export type BranchSeg = {
  d: string;
  width: number;
};

/** Filled silhouette paths (trunk mass, buttresses). */
export type FillPath = {
  d: string;
  opacity: number;
};

export type LeafTone = "back" | "mid" | "front" | "deep";

export type LeafInstance = {
  x: number;
  y: number;
  rot: number;
  scale: number;
  tone: LeafTone;
};

export type AerialRoot = {
  d: string;
  width: number;
  length: number;
  phase: number;
  ox: number;
  oy: number;
  /** Pillar trunk that reaches ground */
  pillar?: boolean;
  /** Optional leaf on root */
  leaf?: { x: number; y: number; rot: number; scale: number };
};

export type GroundPath = {
  d: string;
  kind: "mound" | "root" | "grass";
};

export type BanyanModel = {
  seed: number;
  variant: "hero" | "scene" | "footer";
  viewBox: string;
  width: number;
  height: number;
  trunkFills: FillPath[];
  barkStrokes: BranchSeg[];
  branches: BranchSeg[];
  leaves: LeafInstance[];
  roots: AerialRoot[];
  ground: GroundPath[];
  callouts?: { id: string; x: number; y: number; bx: number; by: number }[];
};

export const BANYAN_SEEDS: Record<"hero" | "scene" | "footer", number> = {
  hero: 1995,
  scene: 32000,
  footer: 4782,
};

export const LEAF_TONE_OPACITY: Record<LeafTone, number> = {
  back: 0.18,
  mid: 0.3,
  front: 0.46,
  deep: 0.58,
};
