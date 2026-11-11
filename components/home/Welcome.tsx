"use client";

import { Button } from "@/components/ui/Button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { TulsiSpot } from "@/components/patterns";

/**
 * Welcome paints immediately — no MaskReveal / RevealStagger gates.
 * Those were hiding the heading until the user scrolled past mid-section.
 */
export function Welcome() {
  return (
    <Section surface>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="relative mx-auto h-[480px] w-full max-w-lg lg:mx-0 lg:h-[560px] lg:max-w-none">
          <div className="absolute left-0 top-0 w-[74%]">
            <div className="hover-zoom">
              <SiteImage
                src="images/home/welcome-1.jpg"
                alt="Herbal preparations at the Ayurvedic clinic"
                aspect="4/5"
                sizes="(max-width: 1024px) 70vw, 420px"
                priority
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-[64%]">
            <div className="hover-zoom overflow-hidden rounded-[24px] border-4 border-bg shadow-[var(--shadow-warm)]">
              <SiteImage
                src="images/home/welcome-2.jpg"
                alt="Calm treatment room with natural light"
                aspect="3/4"
                rounded="rounded-[20px]"
                sizes="(max-width: 1024px) 55vw, 360px"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <TulsiSpot
            className="pointer-events-none absolute -right-2 -top-6 h-36 w-24 md:h-44 md:w-28"
            opacity={0.18}
          />
          <Eyebrow>Welcome</Eyebrow>
          <SectionHeading splitText="Natural healing, personalised care">
            Natural healing, personalised care
          </SectionHeading>
          <div className="mt-6 space-y-4 text-[17px] leading-[1.7] text-ink">
            <p>
              Eastern Healing Ayurvedic Health Centre offers over 30 years of excellence in natural
              healing. Our expert team specialises in customised Ayurvedic treatments that combine
              ancient wisdom with modern healthcare. Whether you are seeking relief from chronic
              ailments or aiming for total wellness, we deliver trusted, holistic solutions tailored
              to your needs.
            </p>
            <p>
              Our Sharjah clinic has treated thousands of patients, addressing a wide range of health
              concerns through natural Ayurvedic therapies, herbal remedies and lifestyle guidance.
              Every plan is designed to restore body-mind balance, enhance vitality and support
              sustainable, long-term wellness.
            </p>
            <p>
              Whether you are seeking detoxification, rejuvenation, stress relief, or support for
              chronic health conditions, our customised therapies are designed to restore natural
              balance and promote lasting wellness.
            </p>
          </div>
          <div>
            <Button href="/about-us" className="mt-8">
              Read our story
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
