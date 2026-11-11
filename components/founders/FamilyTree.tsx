"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useMotionOff } from "@/lib/use-motion-off";
import { useIsMobile } from "@/lib/motion-prefs";
import { SiteImage } from "@/components/ui/SiteImage";

type Node = {
  id: string;
  name: string;
  role: string;
  note?: string;
  unnamed?: boolean;
  photo?: string;
  placeholder?: string;
};

const lineage: Node[] = [
  {
    id: "kunju",
    name: "Kallayil Kunju Vaidyar",
    role: "Great-grandfather",
    note: "Known for treating eye diseases",
  },
  {
    id: "keshavan",
    name: "Kallayil Keshavan Vaidyar",
    role: "Grandfather",
    note: "Head of Cheruthurathy Ayurvedic Hospital",
  },
  {
    id: "gen3",
    name: "",
    role: "",
    unnamed: true,
    // TODO: client to confirm the unnamed generation between Keshavan and Shruthy
  },
  {
    id: "shruthy",
    name: "Dr. Shruthy Muralidharan",
    role: "Fourth generation",
    photo: "images/team/1.png",
  },
];

const latheef: Node = {
  id: "latheef",
  name: "Dr. K.A. Latheef",
  role: "Clinic founder · Sheikh Zayed International Award",
  placeholder: "KL",
};

export function FamilyTree() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const motionOff = useMotionOff();
  const mobile = useIsMobile();
  const skip = !!reduced || motionOff;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 25%"],
  });
  const draw = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  if (mobile) {
    return <MobileFamily />;
  }

  return (
    <section ref={ref} className="relative overflow-hidden py-8">
      <div className="relative mx-auto aspect-[1100/780] w-full max-w-[1100px]">
        <svg
          viewBox="0 0 1100 780"
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden
        >
          {/* Ground / roots */}
          <motion.path
            d="M120 700 C280 660 420 720 550 680 C680 640 820 700 980 670"
            stroke="var(--sand)"
            strokeWidth="1.25"
            style={{ pathLength: skip ? 1 : draw }}
          />
          <motion.path
            d="M550 680 V420"
            stroke="var(--ink)"
            strokeOpacity="0.45"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: skip ? 1 : draw }}
          />
          {/* Lineage branch rising */}
          <motion.path
            d="M550 520 C480 480 400 400 340 300 M340 300 C300 240 280 180 270 120 M340 300 C380 250 420 200 450 140 M450 140 C470 100 490 70 510 40"
            stroke="var(--olive-deep)"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ pathLength: skip ? 1 : draw }}
          />
          {/* Latheef separate branch */}
          <motion.path
            d="M550 480 C640 450 740 380 820 280 C860 230 900 180 930 120"
            stroke="var(--olive-deep)"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ pathLength: skip ? 1 : draw }}
          />
          {/* Canopy suggestion */}
          <ellipse cx="400" cy="90" rx="220" ry="70" fill="var(--olive)" fillOpacity="0.12" />
          <ellipse cx="880" cy="100" rx="140" ry="55" fill="var(--olive)" fillOpacity="0.1" />
        </svg>

        {/* HTML callouts */}
        <Callout style={{ left: "18%", top: "8%" }} node={lineage[0]} />
        <Callout style={{ left: "32%", top: "22%" }} node={lineage[1]} />
        {/* Unnamed generation — no visible text */}
        <div
          className="absolute"
          style={{ left: "42%", top: "36%" }}
          aria-hidden
          title=""
        >
          <span className="block h-2.5 w-2.5 rounded-full border border-olive/40 bg-bg" />
        </div>
        <Callout style={{ left: "48%", top: "48%" }} node={lineage[3]} />
        <Callout style={{ left: "78%", top: "10%" }} node={latheef} portrait />
      </div>
    </section>
  );
}

function Callout({
  node,
  style,
  portrait,
}: {
  node: Node;
  style: React.CSSProperties;
  portrait?: boolean;
}) {
  if (node.unnamed) return null;
  return (
    <div className="absolute z-[1] max-w-[200px]" style={style}>
      {portrait && (
        <div className="mb-2 h-20 w-16 overflow-hidden rounded-xl border border-sand bg-sand">
          {node.photo ? (
            <SiteImage src={node.photo} alt={node.name} aspect="3/4" sizes="64px" />
          ) : (
            <div className="flex h-full items-center justify-center font-serif text-2xl text-olive/50">
              {node.placeholder ?? "?"}
            </div>
          )}
        </div>
      )}
      {!portrait && node.photo && (
        <div className="mb-2 h-16 w-14 overflow-hidden rounded-xl">
          <SiteImage src={node.photo} alt={node.name} aspect="3/4" sizes="56px" />
        </div>
      )}
      <p className="font-serif text-base text-olive-deep">{node.name}</p>
      <p className="text-xs text-ink-soft">{node.role}</p>
      {node.note && <p className="mt-0.5 text-xs text-ink">{node.note}</p>}
    </div>
  );
}

function MobileFamily() {
  return (
    <div className="relative border-l-2 border-olive/30 pl-6">
      {[...lineage.filter((n) => !n.unnamed), latheef].map((n) => (
        <div key={n.id} className="relative mb-10">
          <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-olive bg-bg" />
          {n.photo && (
            <div className="mb-2 w-24">
              <SiteImage src={n.photo} alt={n.name} aspect="3/4" sizes="96px" />
            </div>
          )}
          {n.placeholder && !n.photo && (
            <div className="mb-2 flex h-20 w-16 items-center justify-center rounded-xl bg-sand font-serif text-2xl text-olive/50">
              {n.placeholder}
            </div>
          )}
          <p className="font-serif text-xl text-olive-deep">{n.name}</p>
          <p className="text-sm text-ink-soft">{n.role}</p>
          {n.note && <p className="mt-1 text-sm text-ink">{n.note}</p>}
        </div>
      ))}
      {/* TODO: client to confirm unnamed generation — no visible label */}
    </div>
  );
}
