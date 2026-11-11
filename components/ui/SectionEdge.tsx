/**
 * Quiet shallow-arch transition into the next section.
 * Fill must match the next section's background. No stroke, no ornament.
 */
export function SectionEdge({
  fill,
  className = "",
}: {
  fill: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative z-[2] -mb-px block w-full overflow-hidden leading-[0] ${className}`}
      style={{ height: "clamp(24px, 3vw, 48px)" }}
    >
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="block h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gentle central dome — next section colour meets previous in a soft curve */}
        <path d="M0 48 V30 C240 6 480 0 720 0 C960 0 1200 6 1440 30 V48 Z" fill={fill} />
      </svg>
    </div>
  );
}
