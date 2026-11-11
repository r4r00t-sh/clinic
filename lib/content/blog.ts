export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readingTime: string;
  date: string;
  bodyPlaceholder: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "detoxify-naturally-ayurvedic-herbs",
    title:
      "Detoxify Naturally: Ayurvedic Herbs for Cleansing and Rejuvenation",
    excerpt:
      "Explore how traditional Ayurvedic herbs support gentle cleansing and rejuvenation.",
    image: "images/blog/blog_2.jpg",
    category: "Herbs & Detox",
    readingTime: "5 min read",
    date: "2025-01-15",
    // Longer article body pending from client
    bodyPlaceholder:
      "Traditional Ayurvedic herbs support gentle cleansing and rejuvenation when matched to your constitution. Speak with our doctors for personalised guidance on herbs and therapies suited to you.",
  },
  {
    slug: "healing-power-of-ayurvedic-herbs",
    title:
      "The Healing Power of Ayurvedic Herbs: Natural Remedies for Everyday Wellness",
    excerpt:
      "A look at everyday Ayurvedic herbs and how they support lasting wellness.",
    image: "images/blog/blog_5.jpg",
    category: "Wellness",
    readingTime: "6 min read",
    date: "2025-02-10",
    // Longer article body pending from client
    bodyPlaceholder:
      "Ayurvedic herbs form the foundation of everyday wellness. Our team can help you choose remedies suited to your constitution and lifestyle.",
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
