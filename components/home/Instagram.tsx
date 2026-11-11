"use client";

import { useState } from "react";
import Image from "next/image";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SandalwoodSpot } from "@/components/patterns";
import { img } from "@/lib/images";
import { site } from "@/lib/content/site";

const reels = [
  {
    id: "DHODQrhpiWS",
    poster: "images/treatments/Abhyanga.jpg",
    label: "Treatment",
  },
  {
    id: "DJ7AhqDy0k_",
    poster: "images/home/why-choose-us.jpg",
    label: "Clinic interior",
  },
  {
    id: "DHqdb5lu_oo",
    poster: "images/gallery/blog-04.jpg",
    label: "Herbs & care",
  },
];

export function Instagram() {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  return (
    <Section surface className="overflow-hidden">
      <SandalwoodSpot
        className="pointer-events-none absolute left-4 top-12 h-28 w-36 md:left-10"
        opacity={0.15}
      />
      <div className="relative mb-10 text-center">
        <Eyebrow>Social</Eyebrow>
        <SectionHeading align="center" splitText="Follow us on Instagram">
          Follow us on Instagram
        </SectionHeading>
      </div>

      <div className="relative grid gap-4 sm:grid-cols-3">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="relative aspect-[9/16] overflow-hidden rounded-[24px] bg-sand"
          >
            {loaded[reel.id] ? (
              <iframe
                src={`https://www.instagram.com/reel/${reel.id}/embed`}
                className="h-full w-full border-0"
                loading="lazy"
                title={`Instagram reel ${reel.id}`}
                allow="encrypted-media"
              />
            ) : (
              <button
                type="button"
                onClick={() => setLoaded((s) => ({ ...s, [reel.id]: true }))}
                className="relative flex h-full w-full items-center justify-center overflow-hidden"
              >
                <Image
                  src={img(reel.poster)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, color-mix(in srgb, var(--olive-deep) 75%, transparent) 0%, transparent 55%)",
                  }}
                />
                <span className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-full bg-oat text-olive-deep shadow-[var(--shadow-warm)]">
                  <PlayIcon />
                </span>
                <span className="absolute bottom-4 left-0 right-0 z-[1] px-4 text-center text-sm font-medium text-oat">
                  {reel.label}
                </span>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          href={site.social.instagram}
          variant="outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow @ayurvedic_herbal_health_centre
        </Button>
      </div>
    </Section>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5L8 5.5z" />
    </svg>
  );
}
