/**
 * Testimonials — gated until client supplies real reviews.
 * Set showTestimonials = true to reveal. Do not invent quotes.
 */
export const showTestimonials = false;

export function Testimonials() {
  if (!showTestimonials) return null;
  return (
    <section className="py-16">
      {/* Wired when client reviews arrive; rating badge can link to Google reviews */}
      <div className="container-site text-center text-ink-soft">
        <p>Client testimonials will appear here.</p>
      </div>
    </section>
  );
}
