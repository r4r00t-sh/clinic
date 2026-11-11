"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/open-hours";

export function OpenBadge({ className = "" }: { className?: string }) {
  const [label, setLabel] = useState("Open today until 9:00 PM");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    function tick() {
      const s = getOpenStatus();
      setLabel(s.label);
      setOpen(s.open);
    }
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm ${className}`}
      data-open={open ? "true" : "false"}
    >
      <span
        className={`h-2 w-2 rounded-full ${open ? "bg-olive" : "bg-ink-soft"}`}
        aria-hidden
      />
      {label}
    </span>
  );
}
