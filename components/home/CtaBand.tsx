"use client";

import { BookButton } from "@/components/booking/BookButton";
import { useBooking } from "@/components/booking/BookingContext";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CtaLeafFringe } from "@/components/banyan/CtaLeafFringe";
import { site } from "@/lib/content/site";
import { events } from "@/lib/analytics";

export function CtaBand() {
  const { openBooking } = useBooking();

  return (
    <section className="on-olive relative overflow-hidden bg-olive py-16 md:py-24">
      <CtaLeafFringe />

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] mix-blend-soft-light eh-dappled"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 30% 40% at 20% 30%, var(--turmeric), transparent 70%), radial-gradient(ellipse 25% 35% at 80% 20%, var(--turmeric), transparent 65%)",
        }}
      />

      <div className="container-site relative z-[1] text-center">
        <SplitHeading
          text="Start your wellness journey today"
          lines={["Start your wellness", "journey today"]}
          className="font-serif text-3xl !text-oat md:text-4xl"
          hero
        />
        <Reveal delay={0.15}>
          <p
            className="mx-auto mt-4 max-w-xl text-[17px]"
            style={{ color: "color-mix(in srgb, var(--oat) 90%, transparent)" }}
          >
            Book an appointment and let our doctors design a plan around you.
          </p>
        </Reveal>
        <Reveal delay={0.28} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <BookButton variant="oat" label="Book a consultation" className="btn-oat" />
          <a
            href={site.phoneHref}
            onClick={() => events.callClick("cta")}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-oat px-6 text-sm font-medium !text-oat transition hover:bg-oat/10"
          >
            Call {site.phone}
          </a>
          <button
            type="button"
            onClick={() =>
              openBooking({
                message:
                  "I am interested in the health package. Please contact me with details.",
                source: "cta_package",
              })
            }
            className="min-h-11 text-base !text-oat underline underline-offset-4 decoration-oat/70 hover:decoration-oat"
          >
            Get the health package
          </button>
        </Reveal>
      </div>
    </section>
  );
}
