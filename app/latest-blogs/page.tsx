import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BlogListing } from "@/components/blog/BlogListing";
import { seo } from "@/lib/content/site";

export const metadata: Metadata = {
  title: seo.blog.title,
  description: seo.blog.description,
};

export default function BlogListingPage() {
  return (
    <>
      <PageHero
        title="Latest blogs"
        subtitle="Stories on herbs, detox and everyday Ayurvedic wellness."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />
      <BlogListing />
    </>
  );
}
