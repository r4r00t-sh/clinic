"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { durations } from "@/lib/motion";
import { useMotionOff } from "@/lib/use-motion-off";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const motionOff = useMotionOff();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      motionOff || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.remove("is-pending");
      el.classList.add("is-visible");
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    if (rect.top < vh * 1.05 && rect.bottom > -40) {
      el.classList.remove("is-pending");
      el.classList.add("is-visible");
      return;
    }

    // Below fold: arm hidden state, then reveal on scroll
    el.classList.add("is-pending");

    let watchdog: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("is-pending");
          el.classList.add("is-visible");
          watchdog = window.setTimeout(
            () => el.classList.add("is-visible"),
            durations.revealWatchdogMs,
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px 40% 0px" },
    );

    observer.observe(el);
    const absolute = window.setTimeout(() => {
      el.classList.remove("is-pending");
      el.classList.add("is-visible");
    }, 8000);
    return () => {
      observer.disconnect();
      if (watchdog) clearTimeout(watchdog);
      clearTimeout(absolute);
    };
  }, [motionOff]);

  return (
    <div
      ref={ref}
      className={`reveal ${motionOff ? "is-visible" : ""} ${className}`}
      style={delay && !motionOff ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
