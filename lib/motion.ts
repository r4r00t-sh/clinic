/** Central animation tokens — no magic numbers in components. */

export const easings = {
  reveal: [0.22, 1, 0.36, 1] as const,
  float: [0.45, 0, 0.55, 1] as const,
  ui: [0.25, 0.1, 0.25, 1] as const,
};

export const durations = {
  reveal: 0.45,
  mask: 0.55,
  count: 1.2,
  page: 0.28,
  header: 0.15,
  fade: 0.3,
  reduced: 0.15,
  float: 6,
  sway: 8,
  mandala: 240,
  marquee: 60,
  lineStagger: 0.06,
  childStagger: 0.06,
  logoStagger: 0.05,
  /** Force-visible safety nets */
  heroSafetyMs: 800,
  revealWatchdogMs: 2000,
};

export const distances = {
  rise: 24,
  riseMobile: 16,
  stepOdd: 32,
  stepEven: 56,
  cardLift: 4,
  arrowSlide: 6,
  badgeFloat: 4,
  magnetic: 6,
  parallaxImage: 8,
  imageScale: 1.15,
  hoverZoom: 1.05,
  pressScale: 0.98,
  pageRise: 12,
  scrollCue: 12,
};

export const thresholds = {
  /** Softer so tall headings still trigger */
  inView: 0.15,
  headerSolid: 40,
};

/** Shared Framer viewport config — observe wrappers, not clipped children */
export const viewportOnce = {
  once: true as const,
  amount: thresholds.inView,
  margin: "0px 0px -8% 0px" as const,
};

export const lenis = {
  lerp: 0.09,
  duration: 1.1,
};

export const pattern = {
  neemOpacity: 0.06,
  jaliOpacity: 0.08,
  jaliCtaOpacity: 0.1,
  jaliFooterOpacity: 0.08,
  jaliTrustOpacity: 0.045,
  mandalaOpacity: 0.1,
  botanicalOpacity: 0.2,
  dharaOpacity: 0.4,
  grainOpacity: 0.025,
  marqueeOpacity: 0.055,
  neemTile: 160,
  jaliTile: 96,
};

export const spring = {
  scrollProgress: { stiffness: 100, damping: 30, restDelta: 0.001 },
};
