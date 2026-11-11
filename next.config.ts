import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/treatments", destination: "/our-treatments", permanent: true },
      { source: "/specialities", destination: "/our-specialities", permanent: true },
      { source: "/specialties", destination: "/our-specialities", permanent: true },
      { source: "/founders", destination: "/our-founders", permanent: true },
      { source: "/blog", destination: "/latest-blogs", permanent: true },
      { source: "/blogs", destination: "/latest-blogs", permanent: true },
      { source: "/contact", destination: "/contact-us", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
