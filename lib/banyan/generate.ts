import { createRng, pick, range } from "./seeded-rng";
import type {
  AerialRoot,
  BanyanModel,
  BranchSeg,
  FillPath,
  GroundPath,
  LeafInstance,
  LeafTone,
  Pt,
} from "./types";
import { BANYAN_SEEDS } from "./types";

function bezier(a: Pt, c1: Pt, c2: Pt, b: Pt) {
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

function polyPath(pts: Pt[]) {
  if (pts.length < 3) return "";
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const c1 = {
      x: p0.x + (p1.x - p0.x) * 0.35,
      y: p0.y + (p1.y - p0.y) * 0.1 + (i % 2 ? 8 : -8),
    };
    const c2 = {
      x: p0.x + (p1.x - p0.x) * 0.65,
      y: p1.y - (p1.y - p0.y) * 0.1 + (i % 2 ? -6 : 6),
    };
    d += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }
  d += " Z";
  return d;
}

function pointInPoly(x: number, y: number, poly: Pt[]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x;
    const yi = poly[i].y;
    const xj = poly[j].x;
    const yj = poly[j].y;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-9) + xi)
      inside = !inside;
  }
  return inside;
}

/** Wide flat-topped irregular canopy — lumpy top, scalloped bottom with gaps. */
function canopySilhouette(
  rng: () => number,
  cx: number,
  top: number,
  bottom: number,
  halfW: number,
): Pt[] {
  const pts: Pt[] = [];
  const topN = 16;
  for (let i = 0; i <= topN; i++) {
    const t = i / topN;
    const x = cx - halfW + t * halfW * 2;
    const lump = Math.sin(t * Math.PI * 5 + rng()) * range(rng, 8, 20);
    pts.push({ x, y: top + Math.abs(Math.sin(t * Math.PI)) * 6 + lump * 0.35 });
  }
  pts.push({
    x: cx + halfW * 0.92,
    y: top + (bottom - top) * 0.55 + range(rng, -12, 18),
  });
  const botN = 18;
  for (let i = botN; i >= 0; i--) {
    const t = i / botN;
    const x = cx - halfW + t * halfW * 2;
    const scallop = Math.sin(t * Math.PI * 4 + rng() * 2) * range(rng, 14, 32);
    const gap = rng() > 0.85 ? range(rng, 18, 36) : 0;
    pts.push({
      x,
      y: bottom - scallop - Math.sin(t * Math.PI) * 14 + gap,
    });
  }
  pts.push({
    x: cx - halfW * 0.92,
    y: top + (bottom - top) * 0.55 + range(rng, -12, 18),
  });
  return pts;
}

function sampleLeaves(
  rng: () => number,
  poly: Pt[],
  count: number,
  minDist: number,
): LeafInstance[] {
  const xs = poly.map((p) => p.x);
  const ys = poly.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const placed: Pt[] = [];
  const leaves: LeafInstance[] = [];
  let attempts = 0;
  while (leaves.length < count && attempts < count * 50) {
    attempts++;
    const x = range(rng, minX, maxX);
    const y = range(rng, minY, maxY);
    if (!pointInPoly(x, y, poly)) continue;
    if (placed.some((p) => (p.x - x) ** 2 + (p.y - y) ** 2 < minDist ** 2)) continue;
    placed.push({ x, y });
    const ty = (y - minY) / (maxY - minY + 1e-6);
    const r = rng();
    let tone: LeafTone =
      ty < 0.25 ? (r > 0.65 ? "mid" : "back") : ty < 0.55 ? (r > 0.5 ? "front" : "mid") : r > 0.86 ? "deep" : "front";
    leaves.push({
      x,
      y,
      rot: range(rng, -35, 35),
      scale: range(rng, 0.75, 1.35),
      tone,
    });
  }
  return leaves;
}

function branchPath(
  rng: () => number,
  from: Pt,
  angle: number,
  len: number,
  startW: number,
  segs: BranchSeg[],
) {
  const steps = 4;
  let cur = { ...from };
  let a = angle;
  let w = startW;
  for (let i = 0; i < steps; i++) {
    a += (rng() - 0.5) * 0.28;
    // Prefer slight upward lift on horizontals
    if (Math.abs(Math.sin(a)) < 0.35) a -= 0.12 * Math.sign(Math.cos(a) || 1);
    const step = len / steps;
    const tip = {
      x: cur.x + Math.cos(a) * step,
      y: cur.y + Math.sin(a) * step,
    };
    const bend = (rng() - 0.5) * step * 0.55;
    const nx = -Math.sin(a);
    const ny = Math.cos(a);
    segs.push({
      d: bezier(
        cur,
        {
          x: cur.x + Math.cos(a) * step * 0.3 + nx * bend * 0.4,
          y: cur.y + Math.sin(a) * step * 0.3 + ny * bend * 0.4,
        },
        {
          x: cur.x + Math.cos(a) * step * 0.65 + nx * bend,
          y: cur.y + Math.sin(a) * step * 0.65 + ny * bend,
        },
        tip,
      ),
      width: Math.max(1.2, w * (1 - (i + 1) / (steps + 0.5))),
    });
    cur = tip;
    w *= 0.72;
  }
  return cur;
}

function sCurveRoot(
  rng: () => number,
  ox: number,
  oy: number,
  groundY: number,
  width: number,
  pillar: boolean,
): AerialRoot {
  const full = groundY - oy;
  const lenFactor = pillar ? 1 : range(rng, 0.5, 0.95);
  const tipY = oy + full * lenFactor;
  const sway = range(rng, 28, 70) * (rng() > 0.5 ? 1 : -1);
  const c1 = { x: ox + sway, y: oy + (tipY - oy) * 0.3 };
  const c2 = { x: ox - sway * 0.75, y: oy + (tipY - oy) * 0.65 };
  const tipX = ox + sway * 0.2 + range(rng, -10, 10);
  return {
    d: bezier({ x: ox, y: oy }, c1, c2, { x: tipX, y: tipY }),
    width: pillar ? range(rng, 15, 22) : width,
    length: tipY - oy,
    phase: rng(),
    ox,
    oy,
    pillar,
    leaf:
      !pillar && rng() > 0.7
        ? {
            x: (ox + c1.x) / 2 + range(rng, -6, 6),
            y: (oy + c1.y) / 2,
            rot: range(rng, -28, 28),
            scale: range(rng, 0.55, 0.8),
          }
        : undefined,
  };
}

function buildTrunk(
  rng: () => number,
  cx: number,
  groundY: number,
  crownY: number,
  baseW: number,
): { fills: FillPath[]; strokes: BranchSeg[]; attach: Pt } {
  const topW = baseW * 0.38;
  const fills: FillPath[] = [];

  // Irregular trunk mass (closed poly only)
  fills.push({
    d: polyPath([
      { x: cx - baseW * 0.48, y: groundY + 4 },
      { x: cx - baseW * 0.42 + range(rng, -6, 6), y: groundY - (groundY - crownY) * 0.28 },
      { x: cx - topW * 0.55 + range(rng, -8, 4), y: crownY + 40 },
      { x: cx - topW * 0.5, y: crownY },
      { x: cx + topW * 0.5, y: crownY },
      { x: cx + topW * 0.55 + range(rng, -4, 8), y: crownY + 40 },
      { x: cx + baseW * 0.42 + range(rng, -6, 6), y: groundY - (groundY - crownY) * 0.28 },
      { x: cx + baseW * 0.48, y: groundY + 4 },
    ]),
    opacity: 0.58,
  });

  // Buttress flares — closed polys
  for (let i = 0; i < 5; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const spread = range(rng, baseW * 0.4, baseW * 0.75);
    const h = range(rng, 80, 150);
    const bx = cx + side * baseW * 0.22;
    fills.push({
      d: polyPath([
        { x: bx, y: groundY + 2 },
        { x: bx + side * spread, y: groundY + range(rng, 4, 12) },
        { x: bx + side * spread * 0.5, y: groundY - h * 0.4 },
        { x: bx + side * 10, y: groundY - h },
        { x: bx - side * 8, y: groundY - h * 0.65 },
      ]),
      opacity: range(rng, 0.45, 0.58),
    });
  }

  // Lighter bark face (closed thin wedge along left)
  fills.push({
    d: polyPath([
      { x: cx - baseW * 0.3, y: groundY - 30 },
      { x: cx - baseW * 0.18, y: (groundY + crownY) / 2 },
      { x: cx - topW * 0.15, y: crownY + 20 },
      { x: cx - topW * 0.05, y: crownY + 30 },
      { x: cx - baseW * 0.12, y: (groundY + crownY) / 2 + 20 },
      { x: cx - baseW * 0.22, y: groundY - 10 },
    ]),
    opacity: 0.22,
  });

  const strokes: BranchSeg[] = [];
  for (let i = 0; i < 26; i++) {
    const y = groundY - rng() * (groundY - crownY - 40);
    const x = cx + (rng() - 0.5) * baseW * 0.5;
    const len = range(rng, 12, 26);
    const a = -Math.PI / 2 + range(rng, -0.5, 0.5);
    const tip = { x: x + Math.cos(a) * len, y: y + Math.sin(a) * len };
    strokes.push({
      d: bezier(
        { x, y },
        { x: x + (rng() - 0.5) * 10, y: y - len * 0.35 },
        { x: tip.x + (rng() - 0.5) * 8, y: tip.y + 4 },
        tip,
      ),
      width: range(rng, 0.9, 1.35),
    });
  }

  return { fills, strokes, attach: { x: cx, y: crownY } };
}

function clusteredRoots(
  rng: () => number,
  anchors: Pt[],
  groundY: number,
  count: number,
): AerialRoot[] {
  const roots: AerialRoot[] = [];
  let left = count;
  let pillars = 4;
  while (left > 0 && anchors.length) {
    const size = Math.min(left, 2 + Math.floor(rng() * 4));
    const a = anchors[Math.floor(rng() * anchors.length)];
    for (let i = 0; i < size; i++) {
      const ox = a.x + range(rng, -32, 32);
      const oy = a.y + range(rng, -4, 18);
      const pillar = pillars > 0 && i === 0 && rng() > 0.72;
      if (pillar) pillars--;
      const w = pillar ? range(rng, 15, 22) : range(rng, 1.6, rng() > 0.6 ? 9 : 3.2);
      roots.push(sCurveRoot(rng, ox, oy, groundY, w, pillar));
      left--;
      if (left <= 0) break;
    }
  }
  return roots;
}

function groundMound(rng: () => number, cx: number, groundY: number, width: number): GroundPath[] {
  const half = width * 0.4;
  const paths: GroundPath[] = [
    {
      d: polyPath([
        { x: cx - half, y: groundY + 20 },
        { x: cx - half * 0.55, y: groundY - range(rng, 10, 18) },
        { x: cx, y: groundY - range(rng, 16, 24) },
        { x: cx + half * 0.55, y: groundY - range(rng, 10, 18) },
        { x: cx + half, y: groundY + 20 },
      ]),
      kind: "mound",
    },
  ];
  for (let i = 0; i < 6; i++) {
    const x = cx + range(rng, -half * 0.75, half * 0.75);
    paths.push({
      d: bezier(
        { x, y: groundY - 2 },
        { x: x + range(rng, -16, 16), y: groundY + 8 },
        { x: x + range(rng, 40, 80) * (rng() > 0.5 ? 1 : -1), y: groundY + 12 },
        { x: x + range(rng, 50, 100) * (rng() > 0.5 ? 1 : -1), y: groundY + 2 },
      ),
      kind: "root",
    });
  }
  for (let i = 0; i < 7; i++) {
    const x = cx + range(rng, -half, half);
    paths.push({
      d: `M${x.toFixed(1)} ${groundY.toFixed(1)} l${range(rng, -3, 3).toFixed(1)} ${(-range(rng, 5, 11)).toFixed(1)}`,
      kind: "grass",
    });
  }
  return paths;
}

export function generateBanyan(
  variant: "hero" | "scene" | "footer",
  seed = BANYAN_SEEDS[variant],
): BanyanModel {
  const rng = createRng(seed);

  if (variant === "footer") {
    const width = 1440;
    const height = 140;
    const anchors = Array.from({ length: 14 }, (_, i) => ({
      x: 50 + i * 100 + rng() * 30,
      y: 2 + rng() * 8,
    }));
    return {
      seed,
      variant,
      viewBox: `0 0 ${width} ${height}`,
      width,
      height,
      trunkFills: [],
      barkStrokes: [],
      branches: [],
      leaves: [],
      roots: clusteredRoots(rng, anchors, height - 6, 38),
      ground: groundMound(rng, width / 2, 32, width),
    };
  }

  if (variant === "hero") {
    const width = 1440;
    const height = 140;
    const poly = canopySilhouette(rng, width / 2, 2, 78, width * 0.56);
    const leaves = sampleLeaves(rng, poly, 340, 11);
    // Roots are drawn by <AnchoredRoots> in HeroCanopy — keep model roots empty
    return {
      seed,
      variant,
      viewBox: `0 0 ${width} ${height}`,
      width,
      height,
      trunkFills: [],
      barkStrokes: [],
      branches: [],
      leaves,
      roots: [],
      ground: [],
    };
  }

  const width = 1440;
  const height = 1100;
  const cx = width / 2;
  const groundY = height - 70;
  const crownY = height * 0.4;
  const poly = canopySilhouette(rng, cx, height * 0.05, height * 0.42, width * 0.49);
  const leaves = sampleLeaves(rng, poly, 560, 12);
  const { fills, strokes, attach } = buildTrunk(rng, cx, groundY, crownY, range(rng, 120, 145));

  const branches: BranchSeg[] = [];
  const tips: Pt[] = [];
  const n = 7 + Math.floor(rng() * 3);
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const left = t < 0.5;
    // Angles: mostly outward/up, avoid flat horizontals spanning the canvas
    const angle = left
      ? Math.PI - range(rng, 0.25, 0.7)
      : range(rng, -0.7, -0.15);
    const tip = branchPath(
      rng,
      { x: attach.x + (left ? -12 : 12), y: attach.y + range(rng, -8, 24) },
      angle,
      range(rng, 160, 280),
      range(rng, 13, 16),
      branches,
    );
    tips.push(tip);
  }

  const rootAnchors = [
    ...tips,
    ...Array.from({ length: 10 }, () => ({
      x: range(rng, cx - 480, cx + 480),
      y: range(rng, height * 0.12, height * 0.38),
    })),
  ];

  return {
    seed,
    variant,
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    trunkFills: fills,
    barkStrokes: strokes,
    branches,
    leaves,
    roots: clusteredRoots(rng, rootAnchors, groundY, 42),
    ground: groundMound(rng, cx, groundY, width * 0.72),
    callouts: [
      { id: "since", x: 170, y: 260, bx: 340, by: 330 },
      { id: "clients", x: 1270, y: 250, bx: 1100, by: 310 },
      { id: "first", x: 150, y: 540, bx: 320, by: 490 },
      { id: "award", x: 1290, y: 520, bx: 1120, by: 470 },
    ],
  };
}
