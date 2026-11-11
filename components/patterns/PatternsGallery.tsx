"use client";

import {
  NeemLeafPattern,
  LotusMandala,
  JaliLattice,
  TurmericSpot,
  TulsiSpot,
  LotusBudSpot,
  MortarPestleSpot,
  SandalwoodSpot,
  DharaFlow,
} from "@/components/patterns";
import { pattern } from "@/lib/motion";

export function PatternsGallery() {
  return (
    <div className="mt-12 space-y-16">
      <Swatch
        title="Neem-leaf repeat"
        tokens={`tile ${pattern.neemTile}px · opacity ${pattern.neemOpacity}`}
      >
        <div className="relative h-56 overflow-hidden rounded-[24px] bg-bg text-olive">
          <NeemLeafPattern />
        </div>
        <div className="relative mt-4 h-56 overflow-hidden rounded-[24px] bg-olive-deep text-oat">
          <NeemLeafPattern opacity={0.12} />
        </div>
      </Swatch>

      <Swatch
        title="Lotus mandala"
        tokens={`size 600–900px · opacity ${pattern.mandalaOpacity} · rotate 240s`}
      >
        <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-[24px] bg-bg text-olive">
          <LotusMandala size={320} className="relative" opacity={0.25} />
        </div>
        <div className="relative mt-4 flex h-72 items-center justify-center overflow-hidden rounded-[24px] bg-olive text-oat">
          <LotusMandala size={320} className="relative" opacity={0.2} />
        </div>
      </Swatch>

      <Swatch
        title="Jali lattice"
        tokens={`tile ${pattern.jaliTile}px · opacity ${pattern.jaliOpacity}`}
      >
        <div className="relative h-56 overflow-hidden rounded-[24px] bg-surface text-olive">
          <JaliLattice />
        </div>
        <div className="relative mt-4 h-56 overflow-hidden rounded-[24px] bg-olive-deep text-oat">
          <JaliLattice opacity={0.12} />
        </div>
      </Swatch>

      <Swatch title="Herb botanicals" tokens={`opacity ${pattern.botanicalOpacity} · sway ±1.5° / 8s`}>
        <div className="flex flex-wrap items-end gap-6 rounded-[24px] bg-bg p-8 text-olive">
          <TurmericSpot />
          <TulsiSpot />
          <LotusBudSpot />
          <MortarPestleSpot />
          <SandalwoodSpot />
        </div>
      </Swatch>

      <Swatch title="Dhara flow lines" tokens={`opacity ${pattern.dharaOpacity} · pathLength draw`}>
        <div className="rounded-[24px] bg-bg p-8 text-olive">
          <DharaFlow />
        </div>
        <div className="mt-4 rounded-[24px] bg-olive-deep p-8 text-oat">
          <DharaFlow opacity={0.5} />
        </div>
      </Swatch>
    </div>
  );
}

function Swatch({
  title,
  tokens,
  children,
}: {
  title: string;
  tokens: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-olive-deep">{title}</h2>
      <p className="mt-1 text-sm text-ink-soft">{tokens}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}
