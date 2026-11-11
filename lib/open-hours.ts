/** Clinic hours: Sun–Sat 08:00–21:00 Asia/Dubai */

const TZ = "Asia/Dubai";

function partsInDubai(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    weekday: "short",
  });
  const bits = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value]),
  ) as Record<string, string>;
  const hour = Number(bits.hour === "24" ? "0" : bits.hour);
  const minute = Number(bits.minute);
  return { hour, minute, mins: hour * 60 + minute };
}

export type OpenStatus =
  | { open: true; label: string }
  | { open: false; label: string };

/** Boundaries: open [08:00, 21:00) Dubai time. */
export function getOpenStatus(now = new Date()): OpenStatus {
  const { mins } = partsInDubai(now);
  const openMins = 8 * 60;
  const closeMins = 21 * 60;
  if (mins >= openMins && mins < closeMins) {
    return { open: true, label: "Open today until 9:00 PM" };
  }
  return { open: false, label: "Opens tomorrow at 8:00 AM" };
}
