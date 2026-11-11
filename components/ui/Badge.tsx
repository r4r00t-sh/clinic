import type { ReactNode } from "react";

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-sand bg-surface/90 px-4 py-2 text-sm text-ink shadow-[var(--shadow-warm)] backdrop-blur-sm ${className}`}
    >
      {children}
    </span>
  );
}

export function Stars({ rating = 4.7 }: { rating?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-turmeric" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.round(rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l2.9 6.3L22 9.3l-5 4.8 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.8 7.1-1z" />
        </svg>
      ))}
    </span>
  );
}
