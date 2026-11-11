"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { blogPosts } from "@/lib/content/blog";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export function BlogListing() {
  const [category, setCategory] = useState("All");
  const posts = useMemo(
    () =>
      category === "All"
        ? blogPosts
        : blogPosts.filter((p) => p.category === category),
    [category],
  );

  return (
    <div className="container-site py-16 md:py-24">
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-2.5 text-sm ${
              category === cat
                ? "bg-olive-deep text-oat font-semibold"
                : "border border-sand text-ink-soft"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 60}>
            <article className="flex h-full flex-col">
              <Link href={`/latest-blogs/${post.slug}`} className="hover-zoom mb-5 block">
                <SiteImage
                  src={post.image}
                  alt=""
                  aspect="16/10"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-olive-deep">
                {post.category}
              </p>
              <h2 className="mt-2 font-serif text-2xl text-olive-deep">
                <Link href={`/latest-blogs/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-2 flex-1 text-[16px] text-ink">{post.excerpt}</p>
              <Link
                href={`/latest-blogs/${post.slug}`}
                className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-olive-deep"
              >
                Read more
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
