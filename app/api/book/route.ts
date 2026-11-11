import { NextResponse } from "next/server";

/**
 * Placeholder booking endpoint.
 * Wire BOOKING_WEBHOOK_URL (client email / CRM) here before production launch.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot — silently accept bots
    if (body.company) {
      return NextResponse.json({ ok: true });
    }

    const mode = body.mode === "intake" ? "intake" : "full";

    if (mode === "intake") {
      const { name, phone, email, concerns, preferredDay, preferredPeriod } = body;
      if (!name || !phone || !concerns?.length || !preferredDay || !preferredPeriod) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const webhook = process.env.BOOKING_WEBHOOK_URL;
      const payload = {
        mode,
        name,
        phone,
        email: email || null,
        concerns,
        preferredDay,
        preferredPeriod,
        source: "ayurvediccentre-website",
        receivedAt: new Date().toISOString(),
      };

      if (webhook) {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        console.info("[booking-intake]", payload);
      }

      return NextResponse.json({ ok: true });
    }

    const { name, phone, email, treatment, message } = body;

    if (!name || !phone || !email || !treatment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const webhook = process.env.BOOKING_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          name,
          phone,
          email,
          treatment,
          message,
          source: "ayurvediccentre-website",
          receivedAt: new Date().toISOString(),
        }),
      });
    } else {
      console.info("[booking]", { name, phone, email, treatment, message });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
