"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { RevealStagger } from "@/components/motion/RevealStagger";
import { BotanicalDivider } from "@/components/ui/BotanicalDivider";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { JaliLattice, LotusMandala } from "@/components/patterns";
import { footerLinks } from "@/lib/content/nav";
import { site } from "@/lib/content/site";
import { events } from "@/lib/analytics";
import { whatsappUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

const FooterRoots = dynamic(
  () => import("@/components/banyan/FooterRoots").then((m) => m.FooterRoots),
  { ssr: true, loading: () => null },
);

export function Footer() {
  return (
    <>
    <SectionEdge fill="var(--olive-deep)" />
    <footer className="on-olive-deep relative overflow-hidden bg-olive-deep">
      <FooterRoots />
      <div
        className="pointer-events-none absolute inset-0 z-0 text-oat"
        aria-hidden
        style={{
          maskImage:
            "linear-gradient(90deg, black 0%, black 10%, transparent 22%, transparent 78%, black 90%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, black 10%, transparent 22%, transparent 78%, black 90%, black 100%)",
        }}
      >
        <JaliLattice opacity={0.045} />
      </div>
      <div className="pointer-events-none absolute -bottom-40 -right-40 z-0 opacity-70" aria-hidden>
        <LotusMandala size={480} className="text-oat" opacity={0.07} rotate={false} />
      </div>

      <div className="container-site relative z-[1] py-16 pt-20">
        <RevealStagger className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.3fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <Link
              href="/"
              className="relative mb-4 block h-12 w-52 opacity-90 transition hover:opacity-100"
              aria-label={site.name}
            >
              <Image
                src="/images/logo/1.png"
                alt=""
                fill
                className="object-contain object-left brightness-0 invert"
                sizes="208px"
              />
            </Link>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "color-mix(in srgb, var(--oat) 88%, transparent)" }}
            >
              {site.name} — authentic Ayurveda in Sharjah since {site.since}.
            </p>
            <BotanicalDivider className="mt-6 !mx-0 !text-oat/40" />
          </div>

          <div className="min-w-0">
            <h3 className="mb-4 font-serif text-xl" style={{ color: "var(--oat)" }}>
              Quick links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition hover:!text-turmeric"
                    style={{ color: "color-mix(in srgb, var(--oat) 88%, transparent)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="mb-4 font-serif text-xl" style={{ color: "var(--oat)" }}>
              Contact
            </h3>
            <ul
              className="space-y-3 text-sm"
              style={{ color: "color-mix(in srgb, var(--oat) 88%, transparent)" }}
            >
              <li>
                <a
                  href={site.phoneHref}
                  onClick={() => events.callClick("footer")}
                  className="whitespace-nowrap hover:!text-turmeric"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl(defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => events.whatsappClick("footer")}
                  className="hover:!text-turmeric"
                >
                  WhatsApp {site.whatsapp}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="break-all hover:!text-turmeric">
                  {site.email}
                </a>
              </li>
              <li className="leading-relaxed">{site.address.full}</li>
            </ul>
            <div className="mt-5 flex gap-3">
              <SocialLink href={site.social.facebook} label="Facebook">
                <path d="M15 8h-2a2 2 0 00-2 2v2H9v3h2v7h3v-7h2.5l.5-3H14v-1.5c0-.3.2-.5.5-.5H15V8z" />
              </SocialLink>
              <SocialLink href={site.social.youtube} label="YouTube">
                <path d="M10 9.5v5l4.5-2.5L10 9.5zM21 8.5a3 3 0 00-2.1-2.1C17.2 6 12 6 12 6s-5.2 0-6.9.4A3 3 0 003 8.5 31 31 0 002.5 12a31 31 0 00.5 3.5 3 3 0 002.1 2.1C6.8 18 12 18 12 18s5.2 0 6.9-.4a3 3 0 002.1-2.1A31 31 0 0021.5 12a31 31 0 00-.5-3.5z" />
              </SocialLink>
              <SocialLink href={site.social.instagram} label="Instagram">
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.9a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
              </SocialLink>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="mb-4 font-serif text-xl" style={{ color: "var(--oat)" }}>
              Hours
            </h3>
            <p
              className="whitespace-nowrap text-sm leading-relaxed"
              style={{ color: "color-mix(in srgb, var(--oat) 88%, transparent)" }}
            >
              {site.hoursShort}
            </p>
            <p className="mt-3 text-sm" style={{ color: "color-mix(in srgb, var(--oat) 88%, transparent)" }}>
              <OpenBadge className="!text-inherit" />
            </p>
          </div>
        </RevealStagger>

        <div
          className="mt-12 border-t border-oat/15 pt-6 text-sm"
          style={{ color: "color-mix(in srgb, var(--oat) 70%, transparent)" }}
        >
          © 2026 {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
    </>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-oat/30 transition hover:border-turmeric hover:!text-turmeric"
      style={{ color: "color-mix(in srgb, var(--oat) 88%, transparent)" }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        {children}
      </svg>
    </a>
  );
}
