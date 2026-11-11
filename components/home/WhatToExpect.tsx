import { Section } from "@/components/ui/Section";

const steps = [
  {
    title: "Consultation",
    body: "We listen to your concerns and assess your constitution.",
    icon: "M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z",
  },
  {
    title: "Personalised plan",
    body: "Therapies and herbs are matched to your needs — not a one-size list.",
    icon: "M4 6h16M4 12h10M4 18h14",
  },
  {
    title: "Treatment and follow-up",
    body: "Care continues with guidance for home and return visits.",
    icon: "M5 13l4 4L19 7",
  },
];

export function WhatToExpect() {
  return (
    <Section>
      {/* COPY-DRAFT: first-visit copy for client approval */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="font-serif text-3xl text-olive-deep md:text-4xl">
          What to expect at your first visit
        </h2>
      </div>
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="text-center">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sand text-olive">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d={s.icon}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-olive">
              Step {i + 1}
            </p>
            <h3 className="mt-2 font-serif text-xl text-olive-deep">{s.title}</h3>
            <p className="mt-2 text-[15px] text-ink">{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
