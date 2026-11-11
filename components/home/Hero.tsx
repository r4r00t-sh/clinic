"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookButton } from "@/components/booking/BookButton";
import { Badge, Stars } from "@/components/ui/Badge";
import { SiteImage } from "@/components/ui/SiteImage";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Magnetic } from "@/components/motion/Magnetic";
import { HeroCanopy } from "@/components/banyan/HeroCanopy";
import { distances, durations, easings } from "@/lib/motion";
import { site } from "@/lib/content/site";
import { events } from "@/lib/analytics";
import { defaultWhatsAppMessage, whatsappUrl } from "@/lib/whatsapp";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 30]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -40]);

  const waHref = whatsappUrl(defaultWhatsAppMessage);

  return (
    <section ref={ref} className="relative overflow-x-clip pb-8">
      {/* Canopy + side aerial roots live above copy (roots need vertical room) */}
      <div className="relative z-0 h-[160px] overflow-hidden md:h-[210px]">
        <HeroCanopy />
      </div>

      <div className="container-site relative z-[1] grid items-center gap-10 pt-6 md:pt-8 lg:grid-cols-[48%_44%] lg:justify-between lg:gap-10">
        <motion.div style={{ y: textY }} className="relative bg-bg">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-olive-deep md:text-[13px]">
            Middle East&apos;s most trusted Ayurvedic clinic
          </p>

          <div className="min-h-[1.1em]">
            <SplitHeading
              as="h1"
              hero
              text="Rediscover harmony with Ayurveda"
              lines={["Rediscover harmony", "with Ayurveda"]}
              className="font-serif text-olive-deep [font-size:clamp(48px,5.6vw,88px)] [line-height:1.08]"
            />
          </div>

          <p className="mt-5 max-w-lg text-[19px] leading-relaxed text-ink md:text-[20px]">
            Delivering authentic Ayurvedic herbal health solutions since {site.since}.
          </p>
          <p className="mt-2 max-w-lg text-base text-ink md:text-[17px]">
            Our science is supported by extensive research.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <BookButton size="lg" label="Book a consultation" className="whitespace-nowrap" />
            <Magnetic>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => events.whatsappClick("hero")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-olive-deep px-6 text-sm font-semibold text-olive-deep transition hover:bg-olive-deep hover:text-oat"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </Magnetic>
          </div>

          <div className="mt-4">
            <a
              href={site.phoneHref}
              onClick={() => events.callClick("hero")}
              className="text-sm font-medium text-olive-deep underline underline-offset-4"
            >
              {site.phone}
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-y-2 text-[14px] text-ink">
            <span className="inline-flex items-center gap-1.5 pr-3">
              <Stars />
              <strong className="text-ink">{site.rating} / 5</strong>
              <span className="text-ink-soft">from {site.clients}</span>
            </span>
            <span className="mx-1 hidden h-3.5 w-px bg-sand sm:inline-block" aria-hidden />
            <span className="px-3">
              <OpenBadge className="!text-[14px]" />
            </span>
            <span className="mx-1 hidden h-3.5 w-px bg-sand sm:inline-block" aria-hidden />
            <span className="px-3 text-ink-soft">Sheikh Zayed International Award</span>
          </div>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
        >
          {/* No MaskReveal — hero image must paint immediately */}
          <div className="hover-zoom">
            <SiteImage
              src="images/home/why-choose-us.jpg"
              alt="Ayurvedic treatment at Eastern Healing Ayurvedic Health Centre, Sharjah"
              aspect="4/5"
              arch
              priority
              sizes="(max-width: 1024px) 90vw, 44vw"
            />
          </div>

          <motion.div
            className="absolute -bottom-4 left-4 right-4 z-10 sm:left-auto sm:right-6 sm:bottom-8 sm:max-w-xs"
            style={{ y: badgeY }}
            animate={reduced ? undefined : { y: [0, -distances.badgeFloat, 0] }}
            transition={
              reduced
                ? undefined
                : {
                    duration: durations.float,
                    ease: easings.float,
                    repeat: Infinity,
                  }
            }
          >
            <Badge>
              <Stars />
              <span>
                <strong className="text-ink">{site.rating} / 5</strong> from {site.clients} happy
                clients
              </span>
            </Badge>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
