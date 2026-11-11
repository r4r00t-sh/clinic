/** Thin olive line-art botanicals at low opacity for decorative accents. */

type Props = { className?: string; opacity?: number };

export function BotanicalNeem({ className = "", opacity = 0.1 }: Props) {
  return (
    <svg
      className={className}
      style={{ opacity }}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M60 150V20M60 40c-18-8-28-4-34 8M60 60c18-8 28-4 34 8M60 80c-16-6-26-2-32 10M60 100c16-6 26-2 32 10M60 120c-12-4-20 0-24 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse cx="28" cy="50" rx="10" ry="5" transform="rotate(-30 28 50)" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="92" cy="70" rx="10" ry="5" transform="rotate(30 92 70)" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="30" cy="92" rx="9" ry="4.5" transform="rotate(-25 30 92)" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="90" cy="112" rx="9" ry="4.5" transform="rotate(25 90 112)" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function BotanicalLotus({ className = "", opacity = 0.1 }: Props) {
  return (
    <svg
      className={className}
      style={{ opacity }}
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M80 90c-20-28-40-36-56-36 12 4 28 18 40 36 12-18 28-32 40-36-16 0-36 8-56 36z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M80 90c-8-30-4-52 0-70 4 18 8 40 0 70zM48 70c8-10 20-18 32-20M112 70c-8-10-20-18-32-20"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BotanicalTulsi({ className = "", opacity = 0.1 }: Props) {
  return (
    <svg
      className={className}
      style={{ opacity }}
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M50 130V25M50 45c-16 0-28 8-28 8M50 45c16 0 28 8 28 8M50 70c-14 0-24 10-24 10M50 70c14 0 24 10 24 10M50 95c-12 0-20 8-20 8M50 95c12 0 20 8 20 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M22 53c8-2 16 2 20 10M78 53c-8-2-16 2-20 10M26 80c6-2 12 2 16 8M74 80c-6-2-12 2-16 8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BotanicalTurmeric({ className = "", opacity = 0.1 }: Props) {
  return (
    <svg
      className={className}
      style={{ opacity }}
      viewBox="0 0 140 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 50c20-30 40-40 60-28 20 12 30 8 50-8M20 58c18-22 36-28 52-18"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="70" cy="28" r="3" stroke="currentColor" strokeWidth="1" />
      <circle cx="88" cy="22" r="2.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="55" cy="34" r="2" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export { BotanicalDivider } from "./BotanicalDivider";
