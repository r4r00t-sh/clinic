"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { generateBanyan } from "@/lib/banyan/generate";
import { BANYAN_SEEDS } from "@/lib/banyan/types";
import { CountUp } from "@/components/motion/CountUp";
import { BookButton } from "@/components/booking/BookButton";
import { useMotionOff } from "@/lib/use-motion-off";
import { useIsMobile } from "@/lib/motion-prefs";
import { BanyanSvg } from "./BanyanSvg";

const CLAIMS = [
  {
    id: "since",
    label: "Rooted since 1995 · 30+ years of authentic healing",
  },
  { id: "clients", label: "32,000+ clients treated", count: 32000 },
  {
    id: "first",
    label: "The first Ayurvedic healthcare facility in the Middle East",
  },
  {
    id: "award",
    label: "Led by a Sheikh Zayed International Award-winning doctor",
  },
] as const;

const pillars = [
  "Authentic Ayurvedic remedies",
  "Proven track record",
  "Holistic healing environment",
  "Personalised care using traditional and modern methods",
];

export function SceneTree({ seed = BANYAN_SEEDS.scene }: { seed?: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const motionOff = useMotionOff();
  const mobile = useIsMobile();
  const skip = !!reduced || motionOff;
  const model = useMemo(() => generateBanyan("scene", seed), [seed]);
  const [active, setActive] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 20%"],
  });

  const trunkOp = useTransform(scrollYProgress, [0, 0.22], [0, 1]);
  const branchOp = useTransform(scrollYProgress, [0.12, 0.4], [0, 1]);
  const leafOp = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const rootOp = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);

  if (mobile) return <MobileScene />;

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] overflow-hidden bg-bg py-16 md:min-h-[110vh] md:py-20"
    >
      {/* Soft light through canopy */}
      {!skip && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[45%] opacity-[0.08] mix-blend-soft-light eh-dappled"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 35% 50% at 40% 20%, var(--turmeric), transparent 70%), radial-gradient(ellipse 30% 40% at 65% 15%, var(--turmeric), transparent 65%)",
          }}
        />
      )}

      <div className="container-site relative z-[2]">
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          {/* COPY-DRAFT */}
          <h2 className="font-serif text-3xl text-olive-deep md:text-4xl lg:text-[2.75rem]">
            Rooted in tradition. Growing with you.
          </h2>
          <p className="mt-3 text-[17px] text-ink">
            Over 30 years of authentic Ayurvedic care, grown from generations of healing knowledge.
          </p>
        </div>
      </div>

      {/* Full-bleed tree */}
      <div
        className="relative z-[1] mx-auto w-full max-w-[1440px]"
        style={{ aspectRatio: `${model.width} / ${model.height}` }}
      >
        <motion.div className="absolute inset-0" style={{ opacity: skip ? 1 : leafOp }}>
          <BanyanSvg
            model={model}
            idPrefix="scene-leaves"
            className="h-full w-full"
            layers={{
              "canopy-back": true,
              "canopy-mid": true,
              leaves: true,
              branches: false,
              trunk: false,
              roots: false,
              ground: true,
            }}
          />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: skip ? 1 : trunkOp }}>
          <BanyanSvg
            model={model}
            idPrefix="scene-trunk"
            className="h-full w-full"
            layers={{
              "canopy-back": false,
              "canopy-mid": false,
              leaves: false,
              branches: false,
              trunk: true,
              roots: false,
              ground: false,
            }}
          />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: skip ? 1 : branchOp }}>
          <BanyanSvg
            model={model}
            idPrefix="scene-branches"
            className="h-full w-full"
            layers={{
              "canopy-back": false,
              "canopy-mid": false,
              leaves: false,
              branches: true,
              trunk: false,
              roots: false,
              ground: false,
            }}
          />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: skip ? 1 : rootOp }}>
          <BanyanSvg
            model={model}
            idPrefix="scene-roots"
            rootClassName={skip ? "" : "eh-banyan-sway"}
            className="h-full w-full"
            layers={{
              "canopy-back": false,
              "canopy-mid": false,
              leaves: false,
              branches: false,
              trunk: false,
              roots: true,
              ground: false,
            }}
          />
        </motion.div>

        {/* HTML callouts with leader lines */}
        {model.callouts?.map((c) => {
          const claim = CLAIMS.find((x) => x.id === c.id);
          if (!claim) return null;
          const left = (c.x / model.width) * 100;
          const top = (c.y / model.height) * 100;
          const bx = (c.bx / model.width) * 100;
          const by = (c.by / model.height) * 100;
          const dim = active && active !== c.id;
          const bright = active === c.id;
          return (
            <div key={c.id} className="absolute inset-0 z-[2]" style={{ pointerEvents: "none" }}>
              <svg className="absolute inset-0 h-full w-full" aria-hidden>
                <line
                  x1={`${bx}%`}
                  y1={`${by}%`}
                  x2={`${left}%`}
                  y2={`${top}%`}
                  stroke="var(--olive)"
                  strokeOpacity={bright ? 0.7 : dim ? 0.2 : 0.45}
                  strokeWidth="1.1"
                />
                <circle
                  cx={`${bx}%`}
                  cy={`${by}%`}
                  r="3.5"
                  fill="var(--olive)"
                  fillOpacity={bright ? 0.85 : dim ? 0.25 : 0.55}
                />
              </svg>
              <button
                type="button"
                className={`absolute z-[3] max-w-[220px] rounded-2xl border border-sand bg-bg/95 px-3.5 py-2.5 text-left shadow-[var(--shadow-warm)] transition ${
                  dim ? "opacity-40" : "opacity-100"
                } ${bright ? "ring-1 ring-olive/40" : ""}`}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "auto",
                }}
                onMouseEnter={() => setActive(c.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(c.id)}
                onBlur={() => setActive(null)}
              >
                <span className="font-serif text-sm text-olive-deep md:text-[15px]">
                  {"count" in claim && claim.count ? (
                    <>
                      <CountUp value={claim.count} suffix="+" /> clients treated
                    </>
                  ) : (
                    claim.label
                  )}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="container-site relative z-[2]">
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p}
              className="rounded-[20px] border border-sand bg-surface/80 p-4 text-center"
            >
              <p className="font-serif text-base leading-snug text-olive-deep md:text-lg">{p}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <BookButton label="Book a consultation" size="lg" />
        </div>
      </div>
    </section>
  );
}

function MobileScene() {
  return (
    <section className="relative overflow-hidden bg-bg py-14">
      <div className="container-site">
        <h2 className="font-serif text-3xl text-olive-deep">
          Rooted in tradition. Growing with you.
        </h2>
        <p className="mt-3 text-[17px] text-ink">
          Over 30 years of authentic Ayurvedic care, grown from generations of healing knowledge.
        </p>

        <div className="relative mt-8 pl-8">
          <div className="absolute bottom-2 left-3 top-2 w-px bg-olive/40" aria-hidden />
          <div className="mb-4 h-20 w-full overflow-hidden" aria-hidden>
            <BanyanSvg
              model={generateBanyan("hero", BANYAN_SEEDS.hero)}
              idPrefix="scene-m-canopy"
              className="h-full w-full"
              layers={{ roots: false, trunk: false, ground: false, branches: false }}
            />
          </div>
          <ol className="space-y-5">
            {CLAIMS.map((c) => (
              <li key={c.id} className="relative">
                <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-olive bg-bg" />
                <p className="font-serif text-lg text-olive-deep">
                  {"count" in c && c.count ? (
                    <>
                      <CountUp value={c.count} suffix="+" /> clients treated
                    </>
                  ) : (
                    c.label
                  )}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-4 h-14 w-full overflow-hidden" aria-hidden>
            <BanyanSvg
              model={generateBanyan("footer", BANYAN_SEEDS.footer)}
              idPrefix="scene-m-roots"
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p} className="rounded-2xl border border-sand bg-surface p-4">
              <p className="font-serif text-olive-deep">{p}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <BookButton label="Book a consultation" className="w-full" />
        </div>
      </div>
    </section>
  );
}
