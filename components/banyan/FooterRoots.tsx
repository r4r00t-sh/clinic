"use client";

import { useMemo } from "react";
import { generateBanyan } from "@/lib/banyan/generate";
import { BANYAN_SEEDS } from "@/lib/banyan/types";
import { BanyanSvg } from "./BanyanSvg";

/** Footer roots — lazy-loaded via next/dynamic from Footer. */
export function FooterRoots({ seed = BANYAN_SEEDS.footer }: { seed?: number }) {
  const model = useMemo(() => generateBanyan("footer", seed), [seed]);
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-28 overflow-hidden opacity-[0.14] md:h-36"
      aria-hidden
      style={{ aspectRatio: `${model.width} / ${model.height}` }}
    >
      <BanyanSvg model={model} idPrefix="footer" className="h-full w-full" />
    </div>
  );
}
