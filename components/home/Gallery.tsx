"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { img } from "@/lib/images";
import { durations, easings } from "@/lib/motion";

const images = [
  { src: "images/gallery/blog-02.jpg", alt: "Clinic interior and treatment atmosphere" },
  { src: "images/gallery/blog-03.jpg", alt: "Herbal oils and natural preparations" },
  { src: "images/gallery/blog-04.jpg", alt: "Ayurvedic therapy session" },
  {
    src: "images/gallery/single-img-01.jpg",
    alt: "Sheikh Zayed International Award ceremony",
    award: true,
  },
  {
    src: "images/gallery/single-img-02.jpg",
    alt: "Sheikh Zayed International Award ceremony",
    award: true,
  },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    if (active !== null) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const clinic = images.filter((i) => !i.award);
  const awards = images.filter((i) => i.award);

  return (
    <Section surface bare>
      <div className="container-site mb-10 text-center">
        <Eyebrow>Gallery</Eyebrow>
        <SectionHeading align="center" splitText="A glimpse inside">
          A glimpse inside
        </SectionHeading>
      </div>

      <div className="container-breakout">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {clinic.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(images.indexOf(image))}
              className="hover-zoom block w-full overflow-hidden rounded-[22px]"
              aria-label={`Open image: ${image.alt}`}
            >
              <MaskReveal delay={i * 0.05}>
                <SiteImage
                  src={image.src}
                  alt={image.alt}
                  aspect="4/3"
                  rounded="rounded-[22px]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </MaskReveal>
            </button>
          ))}
        </div>

        <div className="mt-8">
          {/* confirm with client before launch — award caption */}
          <p className="mb-3 text-center text-sm text-ink-soft">
            Sheikh Zayed International Award
          </p>
          <div className="mx-auto grid grid-cols-2 gap-3 md:max-w-none md:grid-cols-2 md:gap-4 lg:max-w-[66%]">
            {awards.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActive(images.indexOf(image))}
                className="hover-zoom block w-full overflow-hidden rounded-[22px]"
                aria-label={`Open image: ${image.alt}`}
              >
                <MaskReveal delay={0.1 + i * 0.05}>
                  <SiteImage
                    src={image.src}
                    alt={image.alt}
                    aspect="4/3"
                    rounded="rounded-[22px]"
                    sizes="(max-width: 768px) 50vw, 40vw"
                  />
                </MaskReveal>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/70 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.page }}
          >
            <button
              type="button"
              className="absolute inset-0"
              aria-label="Close lightbox"
              onClick={() => setActive(null)}
            />
            <motion.div
              className="relative z-10 max-h-[90vh] max-w-4xl overflow-hidden rounded-[24px] bg-sand"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: durations.page, ease: easings.reveal }}
            >
              <div className="relative h-[70vh] w-[min(90vw,56rem)]">
                <Image
                  src={img(images[active].src)}
                  alt={images[active].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <button
                type="button"
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-bg text-ink"
                onClick={() => setActive(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
