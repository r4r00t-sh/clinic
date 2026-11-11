import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { Section } from "@/components/ui/Section";
import { FamilyTree } from "@/components/founders/FamilyTree";
import { seo } from "@/lib/content/site";

export const metadata: Metadata = {
  title: seo.founders.title,
  description: seo.founders.description,
};

export default function FoundersPage() {
  return (
    <>
      <PageHero
        title="Our founders"
        subtitle="A family tree of healers — generations of Ayurvedic knowledge, brought to Sharjah with care and clarity."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Founders" },
        ]}
      />

      <Section>
        <div className="mb-6 text-center">
          <h2 className="font-serif text-3xl text-olive-deep md:text-4xl">
            A family tree of healers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[17px] text-ink">
            Roots in Kerala&apos;s healing lineages, branches that reach Sharjah.
          </p>
        </div>
        <FamilyTree />
      </Section>

      <Section surface>
        <div className="space-y-20">
          <Reveal>
            <article className="grid items-start gap-10 lg:grid-cols-[280px_1fr]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] border border-sand bg-sand">
                <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <span className="font-serif text-5xl text-olive/40" aria-hidden>
                    KL
                  </span>
                  <span className="sr-only">Portrait of Dr. K.A. Latheef</span>
                </div>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-olive-deep">
                  Founder
                </p>
                <h2 className="mt-2 font-serif text-3xl text-olive-deep md:text-4xl">
                  Dr. K.A. Latheef
                </h2>
                <p className="mt-5 max-w-2xl text-[17px] leading-[1.7] text-ink">
                  Honoured with the Sheikh Zayed International Award by the UAE government for
                  contributions to Ayurveda.
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal>
            <article className="grid items-start gap-10 lg:grid-cols-[280px_1fr]">
              <div className="hover-zoom">
                <SiteImage
                  src="images/team/1.png"
                  alt="Dr. Shruthy Muralidharan"
                  aspect="3/4"
                  sizes="280px"
                />
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-olive-deep">
                  Board Member
                </p>
                <h2 className="mt-2 font-serif text-3xl text-olive-deep md:text-4xl">
                  Dr. Shruthy Muralidharan
                </h2>
                <div className="mt-5 max-w-2xl space-y-4 text-[17px] leading-[1.7] text-ink">
                  <p>
                    Dr. Shruthy Muralidharan has a lifelong connection with Ayurveda. Hailing from a
                    family of distinguished Ayurvedic physicians, she is the fourth generation in her
                    lineage dedicated to the healing art. Her grandfather, Kallayil Keshavan Vaidyar,
                    a renowned Ayurvedic physician from Kerala, headed the Cheruthurathy Ayurvedic
                    Hospital and drew patients from across Kerala and neighbouring countries. Her
                    great-grandfather, the late Kallayil Kunju Vaidyar, was equally esteemed,
                    particularly for treating eye diseases.
                  </p>
                  <p>
                    Dr. Shruthy grew up in Delhi and graduated in Ayurveda from PNNM Ayurveda Medical
                    College in Kerala. She later practised in Delhi under the guidance of her aunt, a
                    well-known Ayurvedic physician. After relocating to the UAE, she worked as a radio
                    presenter in Dubai for seven years, blending her love for Ayurveda with her
                    passion for communication.
                  </p>
                  <p>
                    Driven by her deep-rooted connection to Ayurveda, she is now bringing the best of
                    Ayurvedic care to people through the centre, aiming to deliver personalised,
                    holistic healing that honours her family&apos;s rich tradition.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
