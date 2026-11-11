# Eastern Healing Ayurvedic Health Centre

Production-ready Next.js rebuild of the Sharjah clinic website: calm herbal-apothecary design, SEO-preserving routes, shared booking panel.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Fonts: Fraunces + DM Sans
- Images: remote base `https://www.ayurvediccentre.ae` (configurable)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Environment

| Variable | Purpose |
|----------|---------|
| `BOOKING_WEBHOOK_URL` | Optional POST target for booking form submissions (email/CRM) |

Images are local under `public/images/` (no hotlinking).

## Editing content

Typed content lives under `lib/content/`:

| File | What it controls |
|------|------------------|
| `site.ts` | Brand, phone, address, hours, SEO titles/descriptions, GTM |
| `treatments.ts` | All 16 treatments + booking dropdown |
| `specialities.ts` | Six speciality sections |
| `blog.ts` | Blog listing + single-post placeholders |
| `nav.ts` | Header / footer links |

Page section copy that is unique to a route lives in that route’s `app/**/page.tsx` (e.g. About story).

## Swapping images

Replace files under `public/images/` (organised as `treatments/`, `specialities/`, `blog/`, `home/`, `team/`, `insurance/`, `gallery/`, `logo/`). Update paths in `lib/content/*` if filenames change. Use `SiteImage` with `missing` for temporary sand placeholders.

## Booking form

- UI: `components/booking/BookingPanel.tsx` (global slide-over) and `components/contact/ContactForm.tsx`
- API: `app/api/book/route.ts`
- Fields: Name, Phone, Email, Preferred treatment, Message + honeypot (`company`)
- **Wire CRM/email:** set `BOOKING_WEBHOOK_URL` to your Formspree / Zapier / Resend / custom endpoint. The route POSTs JSON `{ name, phone, email, treatment, message, source, receivedAt }`. Replace or extend that handler for SMTP/CRM SDKs.

## Routes (SEO slugs)

| Page | Path |
|------|------|
| Home | `/` |
| Legacy & Expertise | `/about-us` |
| Treatments | `/our-treatments` |
| Specialities | `/our-specialities` |
| Founders | `/our-founders` |
| Blog | `/latest-blogs` |
| Blog post | `/latest-blogs/[slug]` |
| Contact | `/contact-us` |

Legacy path redirects are configured in `next.config.ts`.

## Client placeholders still needed

Search the codebase for `[CLIENT]`:

- Dr. K.A. Latheef portrait + extended bio (`app/our-founders/page.tsx`)
- Dedicated Tarpanam treatment image (`lib/content/treatments.ts`)
- Insurance partner names for alt text (`components/home/Insurance.tsx`)
- Full blog article bodies (`lib/content/blog.ts`)
- Google site verification meta content (`lib/content/site.ts` → `googleVerification`)
- Confirm years of experience (currently **30+ / since 1995**) and legal brand name

## Analytics

Google Tag Manager container `GTM-TNSR7G82` is included in the root layout.
