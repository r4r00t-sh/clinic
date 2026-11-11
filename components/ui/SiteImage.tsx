import Image from "next/image";
import { img } from "@/lib/images";

type Aspect = "4/5" | "4/3" | "16/10" | "16/9" | "3/4" | "1/1" | "auto";

type Props = {
  src: string;
  alt: string;
  aspect?: Aspect;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  rounded?: string;
  arch?: boolean;
  missing?: boolean;
  sizes?: string;
};

const aspectClass: Record<Exclude<Aspect, "auto">, string> = {
  "4/5": "aspect-[4/5]",
  "4/3": "aspect-[4/3]",
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-[16/9]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
};

/**
 * Local next/image wrapper with sand placeholder, fixed aspect ratio,
 * warm clay multiply overlay, and hover-zoom support via parent .hover-zoom.
 * Server component — images ship in SSR HTML without waiting on client JS.
 */
export function SiteImage({
  src,
  alt,
  aspect = "4/3",
  priority = false,
  className = "",
  imgClassName = "",
  rounded = "rounded-[24px]",
  arch = false,
  missing = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  const shape = arch ? "arch-mask" : rounded;
  const ratio = aspect === "auto" ? "" : aspectClass[aspect];

  if (missing) {
    return (
      <div
        className={`relative flex ${ratio} items-center justify-center overflow-hidden bg-sand ${shape} ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="px-4 text-center text-xs text-ink-soft">
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-sand ${ratio} ${shape} ${className}`}
    >
      <Image
        src={img(src)}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        className={`object-cover ${imgClassName}`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-clay/[0.07] mix-blend-multiply"
      />
    </div>
  );
}
