import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { TreatmentImage } from "@/components/ui/TreatmentImage";
import { SanskritMarquee } from "@/components/home/SanskritMarquee";
import { JaliLattice } from "@/components/patterns";
import { featuredTreatments, treatments } from "@/lib/content/treatments";

/**
 * Treatments grid paints immediately — no RevealStagger opacity gate
 * (that was delaying cards + lazy images until mid-scroll).
 */
export function TreatmentsGrid() {
  const featured = featuredTreatments;
  const remaining = treatments.length - featured.length;

  return (
    <Section className="group/treatments overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[140px] text-olive"
        aria-hidden
        style={{
          maskImage: "linear-gradient(180deg, black 0%, black 35%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(180deg, black 0%, black 35%, transparent 85%)",
        }}
      >
        <JaliLattice opacity={0.05} />
      </div>
      <SanskritMarquee />

      <div className="relative z-[1] pt-6">
        <svg
          className="pointer-events-none mb-4 hidden h-10 w-full text-olive md:block"
          viewBox="0 0 1000 40"
          fill="none"
          aria-hidden
          preserveAspectRatio="none"
        >
          <path
            d="M20 28 C180 8 320 32 500 18 C680 4 820 30 980 16"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.1"
          />
          {[80, 200, 340, 460, 580, 700, 820, 920].map((x, i) => (
            <g key={x} opacity={0.45}>
              <path
                d={`M${x} 18 C${x - 2} 24 ${x + 4} 30 ${x} ${34 + (i % 3)}`}
                stroke="var(--ink)"
                strokeOpacity="0.35"
                strokeWidth="0.9"
              />
              <ellipse
                cx={x}
                cy={22 + (i % 2)}
                rx="3.5"
                ry="5"
                fill="currentColor"
                fillOpacity="0.25"
              />
            </g>
          ))}
        </svg>

        <div className="relative mb-10 max-w-2xl">
          <Eyebrow>Our treatments</Eyebrow>
          <SectionHeading splitText="Time-honoured therapies">
            Time-honoured therapies
          </SectionHeading>
          <p className="mt-3 text-[17px] text-ink">
            Personalised to your body type and needs.
          </p>
        </div>

        <div className="relative">
          <svg
            className="pointer-events-none absolute inset-x-0 -top-2 z-0 hidden h-16 w-full lg:block"
            viewBox="0 0 1000 64"
            fill="none"
            aria-hidden
            preserveAspectRatio="none"
          >
            {[62.5, 187.5, 312.5, 437.5, 562.5, 687.5, 812.5, 937.5].map((x, i) => (
              <path
                key={x}
                d={`M${x} 0 C${x + (i % 2 ? 6 : -6)} 20 ${x + (i % 2 ? -4 : 4)} 40 ${x} 64`}
                stroke="var(--ink)"
                strokeOpacity="0.18"
                strokeWidth="0.85"
              />
            ))}
          </svg>

          <div className="relative z-[1] grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((t, i) => (
              <article
                key={t.id}
                className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-1"
              >
                <Link
                  href={`/our-treatments#${t.slug}`}
                  className="mb-4 block overflow-hidden rounded-[24px]"
                >
                  <div className="transition-transform duration-700 group-hover:scale-[1.05]">
                    <TreatmentImage
                      treatment={t}
                      aspect="4/5"
                      // First row starts loading early so photos aren't blank on arrival
                      priority={i < 4}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </Link>
                <h3 className="sanskrit font-serif text-xl text-olive-deep">{t.name}</h3>
                <p className="mt-1 flex-1 text-[15px] leading-relaxed text-ink">{t.tagline}</p>
                <Link
                  href={`/our-treatments#${t.slug}`}
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 text-sm font-semibold text-olive-deep hover:text-olive"
                >
                  Learn more
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button href="/our-treatments" className="whitespace-nowrap">
            View all {treatments.length} treatments
          </Button>
          <p className="mt-3 text-sm text-ink-soft">
            Plus {remaining} more therapies, from nasal cleansing to eye care.
          </p>
        </div>
      </div>
    </Section>
  );
}
