# Motion & pattern system

Calm “slow wellness” motion for Eastern Healing Ayurvedic Health Centre. Palette, type and layout are unchanged; only motion and ornaments were added.

## Tokens

All speeds, distances and opacities live in [`lib/motion.ts`](lib/motion.ts):

| Export | Purpose |
|--------|---------|
| `easings` | `reveal`, `float`, `ui` |
| `durations` | reveal, mask, count, page, float, mandala, marquee, staggers |
| `distances` | rise, parallax, magnetic, hover zoom |
| `thresholds` | in-view amount, header solid scroll |
| `lenis` | lerp `0.09`, duration `1.1` |
| `pattern` | tile sizes and opacities |
| `spring` | scroll progress spring |

Change a value once there — components must not invent magic numbers.

## Primitives (`/components/motion`)

| Component | Use |
|-----------|-----|
| `Reveal` | Fade + rise once at 20% in view |
| `RevealStagger` | Stagger children ~90ms |
| `Parallax` | Y translate vs scroll (`speed` + = slower) |
| `ParallaxImage` | Scaled image (~1.15) with internal Y parallax |
| `MaskReveal` | clip-path reveal (arch images) |
| `CountUp` | Stat counter, once, 1.6s ease-out |
| `SplitHeading` | Line-by-line mask for H1/H2 |
| `Magnetic` | Desktop-only 6px pull on primary CTAs |
| `LenisProvider` | Smooth scroll (off on touch / reduced motion) |
| `ScrollProgress` | 2px olive top bar |
| `PageTransition` | Soft route fade + wipe |

## Patterns (`/components/patterns`)

Neem leaf, Lotus mandala, Jali lattice, Herb botanicals, Dhara flow + wave dividers.

Review at **[/patterns](/patterns)** (noindex).

## Adjust / disable

- **Slow everything:** raise `durations.reveal` / `durations.mask` in `lib/motion.ts`.
- **Disable Lenis:** already off for touch + `prefers-reduced-motion`; or remove `LenisProvider` from `Providers.tsx`.
- **Disable parallax:** set `speed={0}` or skip `<Parallax>` / `<ParallaxImage>`.
- **Disable marquee / mandala rotation:** reduced-motion and mobile already stop them.
- **Disable magnetic buttons:** `magnetic={false}` on `BookButton`, or rely on mobile/touch detection.
- **Add a pattern:** create an SVG component under `components/patterns/`, export from `index.ts`, place with `aria-hidden` + `pointer-events-none`, keep under ~3KB, fade edges with a radial mask.

## Reduced motion

When `prefers-reduced-motion: reduce`: no Lenis, parallax, marquee, mandala spin, badge float, or magnetic pull. Only short opacity fades (~200ms).

## Assumptions & toning

- Mandala rotation disabled under 768px (CPU/battery).
- Parallax distances halved on mobile.
- Page wipe is a thin 2px line (not a full-screen curtain).
- Sanskrit marquee is CSS keyframes at 8% opacity, paused via parent `group-hover/treatments`.
- Lenis loaded with `next/dynamic` (`ssr: false`) to keep the first paint light.
- No custom cursor (per brief).
