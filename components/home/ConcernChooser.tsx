"use client";

import { useBooking } from "@/components/booking/BookingContext";
import { concerns, type Concern } from "@/lib/content/concerns";
import { events } from "@/lib/analytics";
import { Section } from "@/components/ui/Section";

export function ConcernChooser() {
  const { openBooking } = useBooking();

  function pick(c: Concern) {
    events.concernChip(c);
    openBooking({ concerns: [c], mode: "intake", source: "concern_chooser" });
  }

  return (
    <Section surface className="!py-12 md:!py-14">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-2xl text-olive-deep md:text-3xl">
          How can we help you today?
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          Choose what brings you in — we&apos;ll guide the next step.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {concerns.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => pick(c)}
              className="inline-flex h-11 min-h-[44px] items-center rounded-2xl border border-sand bg-sand/70 px-4 text-sm font-medium text-olive-deep transition hover:border-olive hover:bg-sand"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}
