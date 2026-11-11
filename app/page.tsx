import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Welcome } from "@/components/home/Welcome";
import { TreatmentsGrid } from "@/components/home/TreatmentsGrid";
import { SpecialitiesGrid } from "@/components/home/SpecialitiesGrid";
import { ConcernChooser } from "@/components/home/ConcernChooser";
import { WhatToExpect } from "@/components/home/WhatToExpect";
import { MeetDoctors } from "@/components/home/MeetDoctors";
import { Testimonials } from "@/components/home/Testimonials";
import { CtaBand } from "@/components/home/CtaBand";
import { LatestStories } from "@/components/home/LatestStories";
import { Instagram } from "@/components/home/Instagram";
import { Insurance } from "@/components/home/Insurance";
import { Gallery } from "@/components/home/Gallery";
import { SoftNudge } from "@/components/home/SoftNudge";
import { SiddhaSlot } from "@/components/home/SiddhaSlot";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { seo } from "@/lib/content/site";
import type { Metadata } from "next";

const SceneTree = dynamic(
  () => import("@/components/banyan/SceneTree").then((m) => m.SceneTree),
  {
    ssr: true,
    loading: () => (
      <div
        className="min-h-[70vh] bg-bg"
        aria-hidden
        style={{ aspectRatio: "1440/1100" }}
      />
    ),
  },
);

export const metadata: Metadata = {
  title: { absolute: seo.home.title },
  description: seo.home.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* Hero (bg) → Welcome (surface) */}
      <SectionEdge fill="var(--surface)" />
      <Welcome />
      {/* Welcome (surface) → Banyan scene (bg) */}
      <SectionEdge fill="var(--bg)" />
      <SceneTree />
      <ConcernChooser />
      <TreatmentsGrid />
      <SpecialitiesGrid />
      <SiddhaSlot />
      {/* Specialities (surface) → What to expect (bg) */}
      <SectionEdge fill="var(--bg)" />
      <WhatToExpect />
      <MeetDoctors />
      <Testimonials />
      <CtaBand />
      <LatestStories />
      <Instagram />
      <Insurance />
      <Gallery />
      {/* Footer edge lives in Footer (olive-deep) */}
      <SoftNudge />
    </>
  );
}
