"use client";

import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger } from "@/components/motion/RevealStagger";
import { BotanicalDivider } from "@/components/ui/BotanicalDivider";
import { site } from "@/lib/content/site";

const rows = [
  "Trusted by 32,000+ satisfied clients",
  "Led by a Sheikh Zayed International Award-winning doctor",
  "Decades of authentic Ayurvedic healing",
  "Personalised care using traditional and modern methods",
];

const pillars = [
  {
    title: "Authentic Ayurvedic remedies",
    icon: (
      <path
        d="M12 3c2 4 2 8 0 12-2-4-2-8 0-12zM7 8c3 1 6 1 9 0M6 12c4 1.5 8 1.5 12 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    title: "Proven track record",
    icon: (
      <path
        d="M12 3l2.2 4.5L19 8.2l-3.5 3.4.8 4.9L12 14.3 7.7 16.5l.8-4.9L5 8.2l4.8-.7L12 3z"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Holistic healing environment",
    icon: (
      <path
        d="M12 19c-8-8-8-12-4-14 2-1 4 0 4 2 0-2 2-3 4-2 4 2 4 6-4 14z"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
        strokeLinejoin="round"
      />
    ),
  },
];

export function WhyChooseUs() {
  return (
    <Section surface>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ParallaxImage className="w-full rounded-[24px]">
            <div className="hover-zoom w-full">
              <SiteImage
                src="images/home/why-choose-us.jpg"
                alt={`Treatment space at ${site.name}`}
                aspect="4/5"
                sizes="(max-width: 1024px) 90vw, 50vw"
                rounded="rounded-[24px]"
              />
            </div>
          </ParallaxImage>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>Why choose us</Eyebrow>
            <SectionHeading splitText="Care rooted in time-tested wisdom">
              Care rooted in time-tested wisdom
            </SectionHeading>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink">
              We are committed to providing the finest holistic care, rooted in the time-tested wisdom
              of Ayurveda.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {rows.map((row) => (
              <li key={row} className="flex gap-3 text-[16px] text-ink">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive/15 text-olive">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {row}
              </li>
            ))}
          </ul>

          <BotanicalDivider className="my-8 !mx-0" />

          <RevealStagger className="grid gap-4 sm:grid-cols-3" stagger={0.1}>
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-[20px] border border-sand bg-bg p-4 shadow-[var(--shadow-warm)]"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-sand text-olive">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                    {p.icon}
                  </svg>
                </span>
                <p className="font-serif text-lg leading-snug text-olive-deep">{p.title}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </Section>
  );
}
