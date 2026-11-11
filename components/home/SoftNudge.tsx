"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useBooking } from "@/components/booking/BookingContext";

const KEY = "eh-nudge-shown";

export function SoftNudge() {
  const [show, setShow] = useState(false);
  const { openBooking } = useBooking();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/contact-us")) return;
    if (sessionStorage.getItem(KEY)) return;

    let scrolled = false;
    let timed = false;

    function maybeShow() {
      if (sessionStorage.getItem(KEY)) return;
      // Don't show while cookie notice is open
      if (document.querySelector("[data-cookie-notice='open']")) return;
      if (scrolled || timed) {
        setShow(true);
        sessionStorage.setItem(KEY, "1");
      }
    }

    const t = window.setTimeout(() => {
      timed = true;
      maybeShow();
    }, 35_000);

    function onScroll() {
      const depth =
        (window.scrollY + window.innerHeight) /
        Math.max(document.body.scrollHeight, 1);
      if (depth >= 0.6) {
        scrolled = true;
        maybeShow();
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  if (!show) return null;

  return (
    <div className="fixed bottom-28 right-4 z-[58] max-w-[260px] rounded-2xl border border-sand bg-bg p-4 shadow-[var(--shadow-warm)] md:bottom-24 md:right-6">
      <button
        type="button"
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-ink-soft"
        aria-label="Dismiss"
        onClick={() => setShow(false)}
      >
        ✕
      </button>
      <p className="pr-6 text-sm text-ink">
        Not sure which treatment suits you? Tell us how you feel.
      </p>
      <button
        type="button"
        className="mt-3 inline-flex min-h-10 items-center rounded-full bg-olive-deep px-4 text-sm font-semibold text-oat"
        onClick={() => {
          setShow(false);
          openBooking({ mode: "intake", source: "soft_nudge" });
        }}
      >
        Get guidance
      </button>
    </div>
  );
}
