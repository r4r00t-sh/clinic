import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookButton } from "@/components/booking/BookButton";
import { PageHero } from "@/components/layout/PageHero";
import { SiteImage } from "@/components/ui/SiteImage";
import { BotanicalDivider } from "@/components/ui/BotanicalDivider";
import { blogPosts, getPost } from "@/lib/content/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero
        title={post.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/latest-blogs" },
          { label: post.title },
        ]}
      />

      <article className="mx-auto max-w-3xl px-6 py-12 md:px-8">
        <div className="hover-zoom mb-8">
          <SiteImage
            src={post.image}
            alt=""
            aspect="16/9"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-soft">
          <span className="text-olive">{post.category}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>

        <div className="prose-ayurveda mt-8 space-y-4 leading-relaxed text-ink">
          <p>{post.bodyPlaceholder}</p>
          <p className="text-ink-soft">
            Ayurveda offers gentle, time-tested approaches to everyday wellness. Book a consultation
            to explore what is right for you.
          </p>
        </div>

        <BotanicalDivider className="my-12" />

        {related.length > 0 && (
          <aside>
            <h2 className="font-serif text-2xl text-olive-deep">Related posts</h2>
            <ul className="mt-4 space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/latest-blogs/${r.slug}`} className="text-olive hover:text-olive-deep">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>

      <section className="bg-olive px-5 py-14 text-center text-oat md:px-8">
        <h2 className="font-serif text-3xl">Ready to begin your journey?</h2>
        <p className="mx-auto mt-3 max-w-md text-oat/85">
          Book a consultation with our doctors in Sharjah.
        </p>
        <div className="mt-6 flex justify-center">
          <BookButton variant="oat" />
        </div>
      </section>
    </>
  );
}
