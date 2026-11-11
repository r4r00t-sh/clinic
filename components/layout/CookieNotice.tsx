"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const KEY = "eh-cookie-consent";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss(accepted: boolean) {
    try {
      localStorage.setItem(KEY, accepted ? "1" : "0");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      data-cookie-notice="open"
      className="fixed bottom-24 left-4 z-[55] w-[min(100%-2rem,320px)] rounded-[20px] border border-sand bg-bg p-4 shadow-[var(--shadow-warm)] md:bottom-6 md:left-6"
    >
      <div className="flex items-start gap-2">
        <p className="flex-1 text-sm leading-snug text-ink">
          We use cookies for essential function and analytics.
        </p>
        <button
          type="button"
          onClick={() => dismiss(false)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft hover:bg-surface"
          aria-label="Close cookie notice"
        >
          ✕
        </button>
      </div>
      <Button type="button" size="sm" className="mt-3" onClick={() => dismiss(true)}>
        Accept
      </Button>
    </div>
  );
}
