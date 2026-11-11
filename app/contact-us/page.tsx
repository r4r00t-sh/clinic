import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { Badge, Stars } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { site, seo } from "@/lib/content/site";
import { defaultWhatsAppMessage, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: seo.contact.title },
  description: seo.contact.description,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        subtitle="Visit us in Rolla, Sharjah, or book an appointment online."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <div className="container-site grid gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <Badge className="mb-6">
            <Stars />
            <span>
              {site.rating} / 5.0 · {site.clients} happy clients
            </span>
          </Badge>

          <dl className="space-y-5 text-ink-soft">
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-olive">Address</dt>
              <dd className="mt-1 text-ink">{site.address.full}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-olive">Landline</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="text-ink hover:text-olive">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-olive">WhatsApp</dt>
              <dd className="mt-1">
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-olive"
                >
                  {site.whatsapp}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-olive">Email</dt>
              <dd className="mt-1">
                <a href={site.emailHref} className="text-ink hover:text-olive">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-olive">Working hours</dt>
              <dd className="mt-1 text-ink">{site.hours}</dd>
              <dd className="mt-2">
                <OpenBadge />
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={site.phoneHref}>Call now</Button>
            <Button
              href={whatsappUrl(defaultWhatsAppMessage)}
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </Button>
            <Button href={site.mapDirections} variant="ghost" target="_blank" rel="noopener noreferrer">
              Get directions
            </Button>
          </div>

          <div className="mt-10">
            <MapEmbed />
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl text-olive-deep">Tell us how we can help</h2>
          <p className="mt-3 mb-8 text-ink-soft">
            Share a few details and our team will get back to you.
          </p>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
