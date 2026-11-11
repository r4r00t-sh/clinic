import { site } from "@/lib/content/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    name: site.name,
    alternateName: site.tradeName,
    description: site.tagline,
    url: "https://www.ayurvediccentre.ae",
    telephone: site.phone,
    email: site.email,
    image: `https://www.ayurvediccentre.ae/${site.logo}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.355626977609337,
      longitude: 55.386414075386966,
    },
    openingHours: site.hoursSchema,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating,
      reviewCount: site.reviewCount,
      bestRating: 5,
    },
    sameAs: [site.social.facebook, site.social.youtube, site.social.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
