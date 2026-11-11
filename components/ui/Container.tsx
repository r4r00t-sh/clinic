import type { ReactNode } from "react";

/** Site-wide fluid container — edges align across header, sections, footer. */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "nav" | "header" | "footer";
}) {
  return <Tag className={`container-site ${className}`}>{children}</Tag>;
}
