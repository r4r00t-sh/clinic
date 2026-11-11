import { Section } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { Button } from "@/components/ui/Button";

export function MeetDoctors() {
  return (
    <Section className="!py-14 md:!py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-olive-deep">
            Our doctors
          </p>
          <h2 className="mt-2 font-serif text-3xl text-olive-deep md:text-4xl">
            Meet the healers behind the care
          </h2>
          <p className="mt-4 text-[17px] text-ink">
            Founded by Sheikh Zayed International Award-winning Dr. K.A. Latheef, and guided by
            fourth-generation Ayurvedic physician Dr. Shruthy Muralidharan.
          </p>
          <Button href="/our-founders" className="mt-6">
            Our founders
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* TODO: confirm usage rights for award ceremony photos on home */}
          <div className="relative overflow-hidden rounded-[24px]">
            <SiteImage
              src="images/gallery/single-img-01.jpg"
              alt="Sheikh Zayed International Award ceremony"
              aspect="4/5"
              sizes="(max-width: 1024px) 45vw, 280px"
              imgClassName="object-[center_28%]"
            />
          </div>
          <SiteImage
            src="images/team/1.png"
            alt="Dr. Shruthy Muralidharan"
            aspect="4/5"
            sizes="(max-width: 1024px) 45vw, 280px"
          />
        </div>
      </div>
    </Section>
  );
}
