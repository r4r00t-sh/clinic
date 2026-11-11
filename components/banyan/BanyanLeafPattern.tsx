/** Repeating banyan-leaf pattern — same opacity rules as other patterns (~5%). */
export function BanyanLeafPattern({
  className = "",
  opacity = 0.05,
}: {
  className?: string;
  opacity?: number;
}) {
  const tile = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <g fill="none" stroke="%233f4a28" stroke-width="1" stroke-opacity="0.55">
        <path d="M30 18c-4 4-12 12-12 24 0 10 6 18 14 24 8-6 14-14 14-24 0-12-8-20-16-24z"/>
        <path d="M30 24v32" stroke-opacity="0.4"/>
        <path d="M90 52c-4 4-12 12-12 24 0 10 6 18 14 24 8-6 14-14 14-24 0-12-8-20-16-24z"/>
        <path d="M90 58v32" stroke-opacity="0.4"/>
        <path d="M58 8c-3 3-9 9-9 18 0 7 4 13 10 18 6-5 10-11 10-18 0-9-6-15-11-18z" transform="rotate(25 58 30)"/>
      </g>
    </svg>`,
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      aria-hidden
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,${tile}")`,
        backgroundSize: "120px 120px",
      }}
    />
  );
}
