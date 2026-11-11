"use client";

import { useMemo, useState } from "react";
import { BookButton } from "@/components/booking/BookButton";
import { TreatmentImage } from "@/components/ui/TreatmentImage";
import {
  treatmentCategories,
  treatments,
  type TreatmentCategory,
} from "@/lib/content/treatments";

export function TreatmentsList() {
  const [filter, setFilter] = useState<(typeof treatmentCategories)[number]>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return treatments;
    return treatments.filter((t) => t.category === filter);
  }, [filter]);

  return (
    <div className="container-site grid gap-10 py-16 md:py-24 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-28 space-y-1">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-olive-deep">
            Filter
          </p>
          {treatmentCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`flex min-h-11 w-full items-center rounded-full px-4 text-left text-sm transition ${
                filter === cat
                  ? "bg-olive-deep text-oat font-semibold"
                  : "text-ink-soft hover:bg-surface hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
          <nav className="mt-8 space-y-1 border-t border-sand pt-6" aria-label="Treatment anchors">
            {treatments.map((t) => (
              <a
                key={t.id}
                href={`#${t.slug}`}
                className="block rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-surface hover:text-ink"
              >
                <span className="sanskrit">{t.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <div>
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {treatmentCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm ${
                filter === cat
                  ? "bg-olive-deep text-oat font-semibold"
                  : "border border-sand bg-bg text-ink-soft"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-16">
          {filtered.map((t, i) => (
            <article
              key={t.id}
              id={t.slug}
              className="scroll-mt-28 grid items-center gap-8 lg:grid-cols-2"
            >
              <div className={`hover-zoom ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <TreatmentImage
                  treatment={t}
                  aspect="4/3"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-olive-deep">
                  {t.category as TreatmentCategory}
                </p>
                <h2 className="sanskrit mt-2 font-serif text-3xl text-olive-deep">{t.name}</h2>
                <p className="mt-2 text-lg text-ink">{t.tagline}</p>
                <p className="mt-4 text-[17px] leading-[1.7] text-ink">{t.description}</p>
                {t.imageNote && (
                  <p className="mt-3 rounded-2xl bg-surface px-4 py-3 text-xs text-ink-soft">
                    {t.imageNote}
                  </p>
                )}
                <p className="mt-5 text-xs uppercase tracking-[0.1em] text-ink-soft">Helpful for</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {t.helpfulFor.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-sand bg-surface px-3 py-1 text-xs text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <BookButton
                  className="mt-6 whitespace-nowrap"
                  treatmentId={t.id}
                  label="Book this treatment"
                />
              </div>
            </article>
          ))}
        </div>

        <p className="mt-16 rounded-[24px] border border-sand bg-surface px-6 py-5 text-sm text-ink-soft">
          Treatments are recommended after a consultation with our doctors and tailored to each
          individual.
        </p>
      </div>
    </div>
  );
}
