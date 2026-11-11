import { SiteImage } from "@/components/ui/SiteImage";
import type { Treatment } from "@/lib/content/treatments";

/** Renders treatment photo or sand + herb placeholder when missing. */
export function TreatmentImage({
  treatment,
  aspect = "4/5",
  className = "",
  priority = false,
  sizes,
}: {
  treatment: Treatment;
  aspect?: "4/5" | "4/3" | "16/10" | "3/4";
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!treatment.image || treatment.imageConfidence === "placeholder") {
    return (
      <div
        className={`relative flex ${aspect === "4/5" ? "aspect-[4/5]" : aspect === "4/3" ? "aspect-[4/3]" : "aspect-[16/10]"} items-center justify-center overflow-hidden rounded-[24px] bg-sand ${className}`}
        role="img"
        aria-label={treatment.imageAlt}
      >
        <svg
          width="72"
          height="96"
          viewBox="0 0 72 96"
          fill="none"
          className="text-olive/40"
          aria-hidden
        >
          <path
            d="M36 88V20M36 36c-12 0-20 10-20 10M36 36c12 0 20 10 20 10M36 56c-10 0-16 10-16 10M36 56c10 0 16 10 16 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="sr-only">{treatment.name} illustration</span>
      </div>
    );
  }

  return (
    <SiteImage
      src={treatment.image}
      alt={treatment.imageAlt}
      aspect={aspect}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
