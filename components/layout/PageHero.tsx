import Link from "next/link";

type Crumb = { label: string; href?: string };

export function PageHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="border-b border-sand bg-surface py-12 md:py-16">
      <div className="container-site">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-ink-soft">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-olive-deep">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="font-serif text-4xl text-olive-deep md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-ink-soft">{subtitle}</p>}
      </div>
    </section>
  );
}
