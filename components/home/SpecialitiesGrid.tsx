"use client";

import Link from "next/link";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { RevealStagger } from "@/components/motion/RevealStagger";
import { BanyanLeafPattern } from "@/components/banyan/BanyanLeafPattern";
import { specialities } from "@/lib/content/specialities";

export function SpecialitiesGrid() {
  return (
    <Section surface className="overflow-hidden">
      <BanyanLeafPattern className="text-olive" opacity={0.05} />

      {/* Faint trunk-and-branch diagram behind cards (desktop) */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full opacity-[0.08] lg:block"
        viewBox="0 0 1200 800"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M600 720 V420"
          stroke="var(--olive-deep)"
          strokeWidth="2"
          strokeOpacity="0.5"
        />
        <path
          d="M600 500 C480 480 360 420 280 360 M600 480 C720 460 840 400 920 340 M600 440 C500 400 400 300 320 220 M600 420 C700 380 800 280 880 200 M600 400 C560 320 520 240 480 160 M600 390 C640 310 700 230 740 150"
          stroke="var(--olive-deep)"
          strokeWidth="1.25"
          strokeOpacity="0.55"
        />
      </svg>

      <div className="relative z-[1] mb-10 max-w-2xl">
        <Eyebrow>Specialities</Eyebrow>
        <SectionHeading splitText="Care for every stage of life">
          Care for every stage of life
        </SectionHeading>
      </div>

      <RevealStagger className="relative z-[1] grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {specialities.map((s) => (
          <article
            key={s.id}
            className="flex h-full flex-col overflow-hidden rounded-[24px] bg-bg shadow-[var(--shadow-warm)]"
          >
            <Link
              href={`/our-specialities#${s.anchor}`}
              className="block shrink-0 overflow-hidden"
            >
              <ParallaxImage>
                <SiteImage
                  src={s.homeImage}
                  alt={s.title}
                  aspect="4/3"
                  rounded="rounded-none"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </ParallaxImage>
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-serif text-2xl text-olive-deep">{s.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink">{s.short}</p>
              <Link
                href={`/our-specialities#${s.anchor}`}
                className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-sm font-semibold text-olive-deep hover:text-olive"
              >
                Explore more
                <span aria-hidden className="inline-block">
                  →
                </span>
              </Link>
            </div>
          </article>
        ))}
      </RevealStagger>
    </Section>
  );
}
