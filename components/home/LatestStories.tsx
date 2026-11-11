"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { SiteImage } from "@/components/ui/SiteImage";
import { RevealStagger } from "@/components/motion/RevealStagger";
import { LotusBudSpot } from "@/components/patterns";
import { blogPosts } from "@/lib/content/blog";

export function LatestStories() {
  return (
    <Section className="overflow-hidden">
      <LotusBudSpot
        className="pointer-events-none absolute right-4 top-10 h-36 w-28 md:right-16"
        opacity={0.16}
      />
      <div className="relative mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Latest stories</Eyebrow>
          <SectionHeading splitText="From our journal">
            From our journal
          </SectionHeading>
        </div>
        <Button href="/latest-blogs" variant="outline" size="sm">
          View all
        </Button>
      </div>

      <RevealStagger className="relative grid gap-8 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="group flex h-full flex-col">
            <Link
              href={`/latest-blogs/${post.slug}`}
              className="hover-zoom mb-5 block overflow-hidden rounded-[24px]"
            >
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
            <h3 className="mt-2 font-serif text-2xl text-olive-deep">
              <Link href={`/latest-blogs/${post.slug}`} className="hover:text-olive">
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 flex-1 text-[16px] leading-relaxed text-ink">{post.excerpt}</p>
            <Link
              href={`/latest-blogs/${post.slug}`}
              className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-olive-deep"
            >
              Read more
            </Link>
          </article>
        ))}
      </RevealStagger>
    </Section>
  );
}
