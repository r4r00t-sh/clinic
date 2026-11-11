"use client";

import type { ReactNode } from "react";
import { SplitHeading } from "@/components/motion/SplitHeading";

type Props = {
  children: ReactNode;
  className?: string;
  splitText?: string;
  splitLines?: string[];
  underline?: boolean;
  /** Centre the heading + underline as a unit */
  align?: "left" | "center";
};

export function SectionHeadingMotion({
  children,
  className = "",
  splitText,
  splitLines,
  underline = true,
  align = "left",
}: Props) {
  const centered = align === "center";

  return (
    <div
      className={`relative max-w-full ${centered ? "mx-auto text-center" : "inline-block text-left"}`}
    >
      {splitText ? (
        <SplitHeading
          text={splitText}
          lines={splitLines}
          className={`font-serif text-3xl text-olive-deep md:text-4xl lg:text-[2.75rem] ${className}`}
        />
      ) : (
        <h2
          className={`font-serif text-3xl text-olive-deep md:text-4xl lg:text-[2.75rem] ${className}`}
        >
          {children}
        </h2>
      )}
      {underline && (
        <span
          aria-hidden
          className={`mt-3 block h-[2px] w-14 bg-olive ${centered ? "mx-auto" : ""}`}
        />
      )}
    </div>
  );
}
