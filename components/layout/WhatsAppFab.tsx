"use client";

import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { events } from "@/lib/analytics";
import { defaultWhatsAppMessage, whatsappUrl } from "@/lib/whatsapp";
import { site } from "@/lib/content/site";

export function WhatsAppFab() {
  const href = whatsappUrl(defaultWhatsAppMessage);

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => events.whatsappClick("fab")}
        className="group fixed bottom-24 right-4 z-[60] hidden items-center gap-3 md:bottom-6 md:right-6 md:flex"
        aria-label="Chat with us on WhatsApp"
      >
        <span className="translate-x-2 rounded-full bg-olive-deep px-3 py-1.5 text-sm text-oat opacity-0 shadow-[var(--shadow-warm)] transition group-hover:translate-x-0 group-hover:opacity-100">
          Chat with us
        </span>
        <span className="flex h-14 w-14 min-h-[48px] min-w-[48px] items-center justify-center rounded-full border-2 border-oat bg-olive-deep text-oat shadow-[0_8px_24px_rgba(47,42,34,0.28)] transition hover:bg-olive">
          <WhatsAppIcon className="h-6 w-6" />
        </span>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-sand bg-bg/95 px-3 py-2 backdrop-blur-md md:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
          <a
            href={site.phoneHref}
            onClick={() => events.callClick("mobile_bar")}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-olive-deep text-sm font-semibold text-oat"
          >
            Call
          </a>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => events.whatsappClick("mobile_bar")}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-olive/40 text-sm font-medium text-olive-deep"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
