import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { TreatmentsList } from "@/components/treatments/TreatmentsList";
import { seo } from "@/lib/content/site";

export const metadata: Metadata = {
  title: { absolute: seo.treatments.title },
  description: seo.treatments.description,
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        title="Our treatments"
        subtitle="Time-honoured therapies, personalised to your body type and needs."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Treatments" },
        ]}
      />
      <TreatmentsList />
    </>
  );
}
