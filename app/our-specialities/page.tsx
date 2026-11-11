import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BookButton } from "@/components/booking/BookButton";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { specialities } from "@/lib/content/specialities";
import { seo } from "@/lib/content/site";

export const metadata: Metadata = {
  title: { absolute: seo.specialities.title },
  description: seo.specialities.description,
};

export default function SpecialitiesPage() {
  return (
    <>
      <PageHero
        title="Our specialities"
        subtitle="Holistic care across beauty, maternity, rehabilitation, senior wellness and more."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Specialities" },
        ]}
      />

      <div className="container-site py-16 md:py-24">
        <div className="space-y-20">
          {specialities.map((s, i) => (
            <Reveal key={s.id}>
              <article
                id={s.anchor}
                className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2"
              >
                <div className={`hover-zoom ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <SiteImage
                    src={s.pageImage}
                    alt={s.title}
                    aspect="4/3"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="font-serif text-3xl text-olive-deep md:text-4xl">{s.title}</h2>
                  <p className="mt-5 text-[17px] leading-[1.7] text-ink">{s.body}</p>
                  <BookButton
                    className="mt-8"
                    label="Book a consultation"
                    treatmentId="consultation"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
