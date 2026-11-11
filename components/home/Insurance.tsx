"use client";

import Image from "next/image";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { img } from "@/lib/images";

const logos = Array.from({ length: 7 }, (_, i) => ({
  src: `images/insurance/Insurance-${i + 1}.webp`,
  alt: `Insurance partner ${i + 1}`,
}));

export function Insurance() {
  return (
    <Section>
      <div className="mb-8 text-center">
        <Eyebrow>Partners</Eyebrow>
        <SectionHeading align="center" splitText="We accept insurance">
          We accept insurance
        </SectionHeading>
        <p className="mt-3 text-sm text-ink-soft">
          Please contact us to confirm coverage for your treatment.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 lg:gap-4">
        {logos.map((logo) => (
          <div
            key={logo.src}
            className="flex h-20 items-center justify-center rounded-2xl border border-sand bg-white p-3 shadow-[var(--shadow-warm)] transition hover:shadow-md"
          >
            <div className="relative h-12 w-full grayscale transition hover:grayscale-0">
              <Image
                src={img(logo.src)}
                alt={logo.alt}
                fill
                className="object-contain mix-blend-multiply"
                sizes="140px"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
