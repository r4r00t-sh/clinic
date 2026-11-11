import type { ReactNode } from "react";
import { SectionHeadingMotion } from "@/components/ui/SectionHeading";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
  surface?: boolean;
  bare?: boolean;
};

export function Section({
  children,
  className = "",
  id,
  as: Tag = "section",
  surface = false,
  bare = false,
}: Props) {
  return (
    <Tag
      id={id}
      className={`relative py-16 md:py-24 ${surface ? "bg-surface" : "bg-bg"} ${className}`}
    >
      {bare ? (
        children
      ) : (
        <div className="container-site relative z-[1]">{children}</div>
      )}
    </Tag>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-olive-deep md:text-[13px]">
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className = "",
  splitText,
  splitLines,
  align = "left",
}: {
  children?: ReactNode;
  className?: string;
  splitText?: string;
  splitLines?: string[];
  align?: "left" | "center";
}) {
  return (
    <SectionHeadingMotion
      className={className}
      splitText={splitText}
      splitLines={splitLines}
      align={align}
    >
      {children}
    </SectionHeadingMotion>
  );
}
