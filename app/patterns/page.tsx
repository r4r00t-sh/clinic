import type { Metadata } from "next";
import { PatternsGallery } from "@/components/patterns/PatternsGallery";

export const metadata: Metadata = {
  title: "Pattern library (dev)",
  robots: { index: false, follow: false },
};

export default function PatternsPage() {
  return (
    <div className="bg-bg py-16">
      <div className="container-site">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-olive-deep">
          Design system
        </p>
        <h1 className="mt-2 font-serif text-4xl text-olive-deep md:text-5xl">
          Pattern & ornament library
        </h1>
        <p className="mt-4 max-w-2xl text-[17px] text-ink">
          Dev-only review of stroke-based motifs. Tokens live in{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 text-sm">lib/motion.ts</code>{" "}
          under <code className="rounded bg-surface px-1.5 py-0.5 text-sm">pattern</code>.
        </p>
        <PatternsGallery />
      </div>
    </div>
  );
}
