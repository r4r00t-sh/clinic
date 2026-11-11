/** Broad ovate leaf — heart-ish base, pointed tip, fine midrib. */
export function LeafSymbol({ id = "banyan-leaf" }: { id?: string }) {
  return (
    <symbol id={id} viewBox="0 0 18 24" overflow="visible">
      <path
        d="M9 0.8C6.5 3.2 2.2 7.2 2.4 12.6c.15 4.5 2.6 7.8 6.6 10.6 4-2.8 6.45-6.1 6.6-10.6C15.8 7.2 11.5 3.2 9 0.8z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M9 5.5v13"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </symbol>
  );
}
