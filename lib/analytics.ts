type Payload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Payload[];
  }
}

export function pushEvent(event: string, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export const events = {
  bookingOpen: (source?: string) => pushEvent("booking_open", { source }),
  intakeStep: (step: number) => pushEvent("intake_step", { step }),
  bookingSubmit: (mode: string) => pushEvent("booking_submit", { mode }),
  whatsappClick: (source?: string) => pushEvent("whatsapp_click", { source }),
  callClick: (source?: string) => pushEvent("call_click", { source }),
  concernChip: (concern: string) => pushEvent("concern_chip_click", { concern }),
} as const;
