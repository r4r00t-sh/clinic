"use client";

import { useEffect, useId, useState } from "react";
import { treatmentOptions } from "@/lib/content/treatments";
import { concerns, type Concern } from "@/lib/content/concerns";
import { events } from "@/lib/analytics";
import { intakeWhatsAppMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useBooking } from "./BookingContext";
import { Button } from "@/components/ui/Button";

type FullForm = {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  message: string;
  company: string;
};

type Intake = {
  concerns: Concern[];
  name: string;
  phone: string;
  country: string;
  email: string;
  day: "Today" | "Tomorrow" | "This week" | "";
  period: "Morning" | "Afternoon" | "Evening" | "";
  company: string;
};

const emptyFull: FullForm = {
  name: "",
  phone: "",
  email: "",
  treatment: "",
  message: "",
  company: "",
};

const emptyIntake: Intake = {
  concerns: [],
  name: "",
  phone: "",
  country: "+971",
  email: "",
  day: "",
  period: "",
  company: "",
};

export function BookingPanel() {
  const { state, closeBooking, setMode } = useBooking();
  const titleId = useId();
  const [step, setStep] = useState(1);
  const [intake, setIntake] = useState<Intake>(emptyIntake);
  const [form, setForm] = useState<FullForm>(emptyFull);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [successName, setSuccessName] = useState("");

  useEffect(() => {
    if (state.open) {
      setStep(1);
      setStatus("idle");
      setErrors({});
      setIntake({
        ...emptyIntake,
        concerns: state.concerns ?? [],
      });
      setForm({
        ...emptyFull,
        treatment: state.treatmentId || "",
        message: state.message ?? "",
      });
      document.body.style.overflow = "hidden";
      events.intakeStep(1);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.open, state.treatmentId, state.message, state.concerns]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeBooking();
    }
    if (state.open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state.open, closeBooking]);

  function toggleConcern(c: Concern) {
    setIntake((prev) => {
      const has = prev.concerns.includes(c);
      return {
        ...prev,
        concerns: has ? prev.concerns.filter((x) => x !== c) : [...prev.concerns, c],
      };
    });
  }

  function validatePhone(phone: string, country: string) {
    const digits = phone.replace(/\D/g, "");
    if (country === "+971") return digits.length >= 8 && digits.length <= 10;
    return digits.length >= 8;
  }

  async function submitIntake() {
    const next: Record<string, string> = {};
    if (!intake.concerns.length) next.concerns = "Choose at least one concern.";
    if (!intake.name.trim()) next.name = "Please enter your name.";
    if (!validatePhone(intake.phone, intake.country))
      next.phone = "Please enter a valid phone number.";
    if (intake.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(intake.email))
      next.email = "Please enter a valid email.";
    if (!intake.day) next.day = "Pick a preferred day.";
    if (!intake.period) next.period = "Pick a time of day.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "intake",
          name: intake.name,
          phone: `${intake.country} ${intake.phone}`,
          email: intake.email || undefined,
          concerns: intake.concerns,
          preferredDay: intake.day,
          preferredPeriod: intake.period,
          company: intake.company,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      events.bookingSubmit("intake");
      setSuccessName(intake.name.trim());
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  async function submitFull(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 8)
      next.phone = "Please enter a valid phone number.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.treatment) next.treatment = "Please select a treatment or consultation.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, mode: "full" }),
      });
      if (!res.ok) throw new Error("Failed");
      events.bookingSubmit("full");
      setSuccessName(form.name.trim());
      setStatus("success");
      setForm(emptyFull);
    } catch {
      setStatus("error");
    }
  }

  if (!state.open) return null;

  const waHref = whatsappUrl(
    intakeWhatsAppMessage(successName || intake.name, intake.concerns),
  );

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Close booking panel"
        onClick={closeBooking}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-bg shadow-[var(--shadow-warm)]">
        <div className="flex items-center justify-between border-b border-sand px-6 py-5">
          <h2 id={titleId} className="font-serif text-2xl text-olive-deep">
            {state.mode === "intake" ? "Start with how you feel" : "Book an appointment"}
          </h2>
          <button
            type="button"
            onClick={closeBooking}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-soft hover:bg-surface"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {status === "success" ? (
            <div className="rounded-[24px] bg-surface p-6 text-center">
              <p className="font-serif text-2xl text-olive-deep">
                Thank you{successName ? `, ${successName}` : ""}
              </p>
              <p className="mt-3 text-ink-soft">
                {/* COPY-DRAFT */}
                Our team will contact you to confirm your appointment.
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => events.whatsappClick("intake_success")}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-olive-deep px-6 text-sm font-semibold text-oat"
              >
                <WhatsAppIcon />
                Continue on WhatsApp
              </a>
              <Button className="mt-3 w-full" variant="outline" type="button" onClick={closeBooking}>
                Close
              </Button>
            </div>
          ) : state.mode === "intake" ? (
            <div className="space-y-6">
              <div className="flex gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-olive">
                {[1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className={`rounded-full px-3 py-1 ${step === n ? "bg-sand text-olive-deep" : "text-ink-soft"}`}
                  >
                    Step {n}
                  </span>
                ))}
              </div>

              {/* Honeypot */}
              <div className="absolute -left-[9999px] opacity-0" aria-hidden>
                <label htmlFor="intake-company">Company</label>
                <input
                  id="intake-company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={intake.company}
                  onChange={(e) => setIntake({ ...intake, company: e.target.value })}
                />
              </div>

              {step === 1 && (
                <div>
                  <p className="mb-3 text-sm font-medium text-ink">What brings you in?</p>
                  <div className="flex flex-wrap gap-2">
                    {concerns.map((c) => {
                      const on = intake.concerns.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleConcern(c)}
                          className={`rounded-full border px-3.5 py-2 text-sm transition ${
                            on
                              ? "border-olive-deep bg-olive-deep text-oat"
                              : "border-sand bg-bg text-ink hover:border-olive"
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                  {errors.concerns && (
                    <p className="mt-2 text-sm text-clay" role="alert">
                      {errors.concerns}
                    </p>
                  )}
                  <Button
                    type="button"
                    className="mt-6 w-full"
                    onClick={() => {
                      if (!intake.concerns.length) {
                        setErrors({ concerns: "Choose at least one concern." });
                        return;
                      }
                      setErrors({});
                      setStep(2);
                      events.intakeStep(2);
                    }}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <Field label="Name" id="intake-name" error={errors.name}>
                    <input
                      id="intake-name"
                      className={inputClass(errors.name)}
                      value={intake.name}
                      onChange={(e) => setIntake({ ...intake, name: e.target.value })}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Phone" id="intake-phone" error={errors.phone}>
                    <div className="flex gap-2">
                      <select
                        className={`${inputClass()} max-w-[7rem]`}
                        value={intake.country}
                        onChange={(e) => setIntake({ ...intake, country: e.target.value })}
                        aria-label="Country code"
                      >
                        <option value="+971">+971</option>
                        <option value="+91">+91</option>
                        <option value="+966">+966</option>
                        <option value="+974">+974</option>
                        <option value="+1">+1</option>
                      </select>
                      <input
                        id="intake-phone"
                        type="tel"
                        className={inputClass(errors.phone)}
                        value={intake.phone}
                        onChange={(e) => setIntake({ ...intake, phone: e.target.value })}
                        autoComplete="tel-national"
                        placeholder="50 123 4567"
                      />
                    </div>
                  </Field>
                  <Field label="Email (optional)" id="intake-email" error={errors.email}>
                    <input
                      id="intake-email"
                      type="email"
                      className={inputClass(errors.email)}
                      value={intake.email}
                      onChange={(e) => setIntake({ ...intake, email: e.target.value })}
                      autoComplete="email"
                    />
                  </Field>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      type="button"
                      className="flex-1"
                      onClick={() => {
                        const next: Record<string, string> = {};
                        if (!intake.name.trim()) next.name = "Please enter your name.";
                        if (!validatePhone(intake.phone, intake.country))
                          next.phone = "Please enter a valid phone number.";
                        if (intake.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(intake.email))
                          next.email = "Please enter a valid email.";
                        setErrors(next);
                        if (Object.keys(next).length) return;
                        setStep(3);
                        events.intakeStep(3);
                      }}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-ink">Preferred time</p>
                  <div className="flex flex-wrap gap-2">
                    {(["Today", "Tomorrow", "This week"] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setIntake({ ...intake, day: d })}
                        className={`rounded-full border px-3.5 py-2 text-sm ${
                          intake.day === d
                            ? "border-olive-deep bg-olive-deep text-oat"
                            : "border-sand text-ink"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  {errors.day && (
                    <p className="text-sm text-clay" role="alert">
                      {errors.day}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {(["Morning", "Afternoon", "Evening"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setIntake({ ...intake, period: p })}
                        className={`rounded-full border px-3.5 py-2 text-sm ${
                          intake.period === p
                            ? "border-olive-deep bg-olive-deep text-oat"
                            : "border-sand text-ink"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  {errors.period && (
                    <p className="text-sm text-clay" role="alert">
                      {errors.period}
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-clay" role="alert">
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      type="button"
                      className="flex-1"
                      disabled={status === "submitting"}
                      onClick={submitIntake}
                    >
                      {status === "submitting" ? "Sending…" : "Submit"}
                    </Button>
                  </div>
                  {/* COPY-DRAFT */}
                  <p className="text-xs text-ink-soft">
                    Our team will contact you to confirm your appointment. Treatments are recommended
                    after consultation.
                  </p>
                </div>
              )}

              <button
                type="button"
                className="text-sm text-olive-deep underline underline-offset-4"
                onClick={() => setMode("full")}
              >
                Prefer to write a message?
              </button>
            </div>
          ) : (
            <form onSubmit={submitFull} className="space-y-5" noValidate>
              <div className="absolute -left-[9999px] opacity-0" aria-hidden>
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>

              <Field label="Name" error={errors.name} id="book-name">
                <input
                  id="book-name"
                  className={inputClass(errors.name)}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  autoComplete="name"
                  required
                />
              </Field>

              <Field label="Phone" error={errors.phone} id="book-phone">
                <input
                  id="book-phone"
                  type="tel"
                  className={inputClass(errors.phone)}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  autoComplete="tel"
                  required
                />
              </Field>

              <Field label="Email" error={errors.email} id="book-email">
                <input
                  id="book-email"
                  type="email"
                  className={inputClass(errors.email)}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                  required
                />
              </Field>

              <Field label="Preferred treatment" error={errors.treatment} id="book-treatment">
                <select
                  id="book-treatment"
                  className={inputClass(errors.treatment)}
                  value={form.treatment}
                  onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                  required
                >
                  <option value="">Select an option</option>
                  {treatmentOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Message" id="book-message">
                <textarea
                  id="book-message"
                  rows={4}
                  className={inputClass()}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </Field>

              {status === "error" && (
                <p className="text-sm text-clay" role="alert">
                  Something went wrong. Please try again or call us directly.
                </p>
              )}

              <Button type="submit" className="w-full" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Submit request"}
              </Button>
              {/* COPY-DRAFT */}
              <p className="text-xs text-ink-soft">
                Our team will contact you to confirm your appointment. Treatments are recommended
                after consultation.
              </p>
              <button
                type="button"
                className="text-sm text-olive-deep underline underline-offset-4"
                onClick={() => setMode("intake")}
              >
                Back to quick intake
              </button>
            </form>
          )}
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-clay" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-2xl border bg-oat px-4 py-3 text-ink outline-none transition focus:border-olive ${
    error ? "border-clay" : "border-sand"
  }`;
}
