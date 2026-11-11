export function BotanicalDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`botanical-divider ${className}`}
      viewBox="0 0 180 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 12c20-10 40-10 60 0s40 10 60 0 40-10 50 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M90 4c2 4 2 8 0 12M78 8c4 2 8 2 12 0M102 8c-4 2-8 2-12 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
