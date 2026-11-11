import { specialities } from "./specialities";
import { treatments } from "./treatments";

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Legacy & Expertise", href: "/about-us" },
  {
    label: "Treatments",
    href: "/our-treatments",
    children: treatments.map((t) => ({
      label: t.name,
      href: `/our-treatments#${t.slug}`,
      subtitle: t.tagline,
    })),
  },
  {
    label: "Specialities",
    href: "/our-specialities",
    children: specialities.map((s) => ({
      label: s.title,
      href: `/our-specialities#${s.anchor}`,
    })),
  },
  { label: "Blog", href: "/latest-blogs" },
  { label: "Contact", href: "/contact-us" },
] as const;

export const footerLinks = [
  { label: "About us", href: "/about-us" },
  { label: "Treatments", href: "/our-treatments" },
  { label: "Specialities", href: "/our-specialities" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Blog", href: "/latest-blogs" },
  { label: "Founders", href: "/our-founders" },
] as const;
