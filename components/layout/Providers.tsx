"use client";

import type { ReactNode } from "react";
import { BookingProvider } from "@/components/booking/BookingContext";
import { BookingPanel } from "@/components/booking/BookingPanel";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { PageTransition } from "@/components/motion/PageTransition";

/**
 * Never wrap the page tree in next/dynamic({ ssr:false }) — that strips all
 * SSR HTML and leaves a blank document when JavaScript is disabled.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      <LenisProvider>
        <ScrollProgress />
        <PageTransition>{children}</PageTransition>
        <BookingPanel />
      </LenisProvider>
    </BookingProvider>
  );
}
