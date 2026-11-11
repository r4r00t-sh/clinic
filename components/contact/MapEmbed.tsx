"use client";

import { useState } from "react";
import { site } from "@/lib/content/site";

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden rounded-[24px] border border-sand bg-surface">
      {loaded ? (
        <iframe
          src={site.mapEmbed}
          title="Map to Ayurvedic Herbal Health Centre, Sharjah"
          className="h-72 w-full border-0 md:h-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="flex h-72 w-full flex-col items-center justify-center gap-2 text-ink-soft md:h-80"
        >
          <span className="font-semibold text-olive-deep">Load map</span>
          <span className="text-sm">Rolla, Sharjah</span>
        </button>
      )}
    </div>
  );
}
