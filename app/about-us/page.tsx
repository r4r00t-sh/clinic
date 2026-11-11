import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BotanicalDivider } from "@/components/ui/BotanicalDivider";
import { site, seo } from "@/lib/content/site";

export const metadata: Metadata = {
  title: { absolute: seo.about.title },
  description: seo.about.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Legacy and Expertise"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Legacy & Expertise" },
        ]}
      />

      <Section>
        <Reveal>
          <SectionHeading>Our story</SectionHeading>
          <div className="mt-6 max-w-3xl space-y-4 text-ink-soft leading-relaxed">
            <p>
              When it comes to your health, we understand the significant responsibility we hold in
              managing it with the utmost care and expertise. We are committed to providing you with
              the best possible care, combining the wisdom of traditional Ayurveda with the
              advancements of modern medicine.
            </p>
            <p>
              With over 30 years of experience, our clinic is proud to be the first Ayurvedic
              healthcare facility in the Middle East, having treated and served more than 32,000
              patients. Founded by Dr. K.A. Latheef, who was honoured with the prestigious Sheikh
              Zayed International Award by the UAE government for his contributions to the field,{" "}
              {site.name} continues to lead the way in holistic healthcare.
            </p>
            <p>
              Our team brings together generations of Ayurvedic knowledge with the latest
              advancements in medical research and biotechnology. This blend of traditional and
              contemporary practice lets us offer comprehensive treatments for a wide range of health
              conditions, for patients of all ages.
            </p>
            <p>
              We prioritise educating our patients, empowering them with a clear understanding of
              their health and well-being. We believe in a strong relationship between doctor and
              patient, where communication and trust are key to the best outcomes.
            </p>
            <p>
              We are dedicated to integrating the best of all medical sciences to provide effective,
              personalised treatment plans that foster healing and long-term wellness. Whether you
              are seeking relief from chronic ailments or looking to enhance your overall health, we
              are here to support your journey.
            </p>
            <p className="italic text-ink">
              Visit us at our Sharjah Rolla location and begin your path to better health today.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section surface>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <blockquote className="h-full rounded-[24px] bg-bg p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.16em] text-olive">Vision</p>
              <p className="mt-4 font-serif text-xl leading-relaxed text-olive-deep md:text-2xl">
                To be a global leader in promoting holistic well-being through authentic Ayurvedic
                practices, fostering a harmonious balance between mind, body, and spirit, and
                empowering individuals to achieve lasting health naturally.
              </p>
            </blockquote>
          </Reveal>
          <Reveal delay={80}>
            <blockquote className="h-full rounded-[24px] bg-bg p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.16em] text-olive">Mission</p>
              <p className="mt-4 font-serif text-xl leading-relaxed text-olive-deep md:text-2xl">
                To deliver personalised, high-quality Ayurvedic treatments rooted in ancient wisdom
                and enhanced by modern methodologies. We are committed to using pure, organic
                ingredients, ensuring sustainable practices, and educating our community about the
                benefits of natural healing to inspire healthier, more balanced lives.
              </p>
            </blockquote>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { value: site.clients, label: "Happy clients" },
            { value: site.years, label: "Years of experience" },
            { value: `${site.rating}/5`, label: "Client rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl text-olive-deep">{stat.value}</p>
              <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <BotanicalDivider className="mb-6" />
          <SectionHeading>Meet the team</SectionHeading>
          <p className="mt-4 text-ink-soft">
            Learn about the doctors and lineage behind our Sharjah clinic.
          </p>
          <Button href="/our-founders" className="mt-6">
            Our founders
          </Button>
          <p className="mt-8 text-sm text-ink-soft">
            Prefer to talk first?{" "}
            <Link href="/contact-us" className="text-olive hover:text-olive-deep">
              Contact us
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
