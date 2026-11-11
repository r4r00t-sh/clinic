import { site } from "@/lib/content/site";

export function whatsappUrl(message?: string) {
  const base = site.whatsappHref;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMessage =
  "Hello, I'd like to book a consultation at Eastern Healing Ayurvedic Health Centre.";

export function intakeWhatsAppMessage(name: string, concerns: string[]) {
  const c = concerns.length ? concerns.join(", ") : "general care";
  return `Hello, I'd like to book a consultation for ${c}. My name is ${name}.`;
}
