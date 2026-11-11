"use client";

import type { ElementType } from "react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  lines?: string[];
  /** Kept for API compat — headings always paint immediately */
  hero?: boolean;
};

/**
 * Heading lines. Always visible from first paint — no clip / opacity gate.
 * (Scroll reveals were hiding titles until mid-section.)
 */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className = "",
  lines,
}: Props) {
  const displayLines = (lines ?? text.split("\n").filter(Boolean)).length
    ? lines ?? text.split("\n").filter(Boolean)
    : [text];

  const Heading = Tag as ElementType;

  return (
    <Heading className={className}>
      {displayLines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      ))}
    </Heading>
  );
}
