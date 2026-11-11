"use client";

import { useMemo, useState } from "react";
import { generateBanyan } from "@/lib/banyan/generate";
import { BANYAN_SEEDS } from "@/lib/banyan/types";
import { BanyanSvg } from "@/components/banyan/BanyanSvg";

const layerKeys = [
  "canopy-back",
  "canopy-mid",
  "branches",
  "leaves",
  "trunk",
  "roots",
  "ground",
] as const;

export default function BanyanReviewPage() {
  const [seed, setSeed] = useState<number>(BANYAN_SEEDS.scene);
  const [variant, setVariant] = useState<"hero" | "scene" | "footer">("scene");
  const [layers, setLayers] = useState<Record<(typeof layerKeys)[number], boolean>>({
    "canopy-back": true,
    "canopy-mid": true,
    branches: true,
    leaves: true,
    trunk: true,
    roots: true,
    ground: true,
  });

  const model = useMemo(() => generateBanyan(variant, seed), [variant, seed]);

  return (
    <div className="container-site py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-olive">Dev only</p>
      <h1 className="mt-2 font-serif text-4xl text-olive-deep">Banyan review</h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Seeds — hero {BANYAN_SEEDS.hero}, scene {BANYAN_SEEDS.scene}, footer{" "}
        {BANYAN_SEEDS.footer}. Tweak seed and layers to pick the best look.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 rounded-2xl border border-sand bg-surface p-4">
        <label className="text-sm">
          Variant{" "}
          <select
            className="ml-2 rounded-full border border-sand bg-bg px-3 py-1"
            value={variant}
            onChange={(e) => setVariant(e.target.value as typeof variant)}
          >
            <option value="hero">Hero canopy</option>
            <option value="scene">Scene tree</option>
            <option value="footer">Footer roots</option>
          </select>
        </label>
        <label className="text-sm">
          Seed{" "}
          <input
            type="number"
            className="ml-2 w-28 rounded-full border border-sand bg-bg px-3 py-1"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value) || 0)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {layerKeys.map((k) => (
            <label key={k} className="flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={layers[k]}
                onChange={() => setLayers((s) => ({ ...s, [k]: !s[k] }))}
              />
              {k}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-10">
        {[400, 700, 1000].map((w) => (
          <div key={w} className="rounded-2xl border border-sand bg-bg p-4">
            <p className="mb-3 text-sm text-ink-soft">Width {w}px</p>
            <div className="mx-auto" style={{ width: w, maxWidth: "100%" }}>
              <div
                className="relative w-full bg-surface"
                style={{
                  aspectRatio: `${model.width} / ${model.height}`,
                }}
              >
                <BanyanSvg model={model} layers={layers} idPrefix={`rev-${w}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
