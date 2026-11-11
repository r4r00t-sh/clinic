"use client";

import { useState } from "react";
import { treatmentOptions } from "@/lib/content/treatments";
import { Button } from "@/components/ui/Button";

type FormState = {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  message: string;
  company: string;
};

const empty: FormState = {
  name: "",
  phone: "",
  email: "",
  treatment: "",
  message: "",
  company: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function validate(data: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!data.name.trim()) next.name = "Please enter your name.";
    if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 8)
      next.phone = "Please enter a valid phone number.";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "Please enter a valid email.";
    if (!data.treatment) next.treatment = "Please select an option.";
    return next;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      setForm(empty);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[24px] bg-surface p-8 text-center">
        <p className="font-serif text-2xl text-olive-deep">Thank you</p>
        <p className="mt-3 text-ink-soft">
          We have received your message and will be in touch soon.
        </p>
        <Button type="button" className="mt-6" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="absolute -left-[9999px] opacity-0" aria-hidden>
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </div>

      {(
        [
          ["name", "Name", "text"],
          ["phone", "Phone", "tel"],
          ["email", "Email", "email"],
        ] as const
      ).map(([key, label, type]) => (
        <div key={key}>
          <label htmlFor={`contact-${key}`} className="mb-2 block text-sm font-medium">
            {label}
          </label>
          <input
            id={`contact-${key}`}
            type={type}
            className={`w-full rounded-2xl border bg-oat px-4 py-3 outline-none focus:border-olive ${
              errors[key] ? "border-clay" : "border-sand"
            }`}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            required
          />
          {errors[key] && (
            <p className="mt-1.5 text-sm text-clay" role="alert">
              {errors[key]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="contact-treatment" className="mb-2 block text-sm font-medium">
          Preferred treatment
        </label>
        <select
          id="contact-treatment"
          className={`w-full rounded-2xl border bg-oat px-4 py-3 outline-none focus:border-olive ${
            errors.treatment ? "border-clay" : "border-sand"
          }`}
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
        {errors.treatment && (
          <p className="mt-1.5 text-sm text-clay" role="alert">
            {errors.treatment}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className="w-full rounded-2xl border border-sand bg-oat px-4 py-3 outline-none focus:border-olive"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-clay" role="alert">
          Something went wrong. Please try again or call us.
        </p>
      )}

      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
