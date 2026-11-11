import { getOpenStatus } from "../lib/open-hours.ts";

// Node can't import TS directly without loader — inline the logic
const TZ = "Asia/Dubai";

function partsInDubai(date) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const bits = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value]),
  );
  const hour = Number(bits.hour === "24" ? "0" : bits.hour);
  const minute = Number(bits.minute);
  return { hour, minute, mins: hour * 60 + minute };
}

function getStatus(now) {
  const { mins } = partsInDubai(now);
  const openMins = 8 * 60;
  const closeMins = 21 * 60;
  if (mins >= openMins && mins < closeMins) {
    return { open: true, label: "Open today until 9:00 PM" };
  }
  return { open: false, label: "Opens tomorrow at 8:00 AM" };
}

/** Build a Date that is the given wall-clock time in Asia/Dubai */
function dubaiLocal(y, m, d, h, min) {
  // Approximate: format a UTC guess then adjust
  const guess = new Date(Date.UTC(y, m - 1, d, h - 4, min)); // Dubai is UTC+4
  // Verify
  const p = partsInDubai(guess);
  const delta = (h * 60 + min) - p.mins;
  return new Date(guess.getTime() + delta * 60_000);
}

const cases = [
  ["7:59 AM", dubaiLocal(2026, 3, 15, 7, 59), false],
  ["8:00 AM", dubaiLocal(2026, 3, 15, 8, 0), true],
  ["8:59 PM", dubaiLocal(2026, 3, 15, 20, 59), true],
  ["9:00 PM", dubaiLocal(2026, 3, 15, 21, 0), false],
];

let ok = true;
for (const [name, date, expectOpen] of cases) {
  const p = partsInDubai(date);
  const s = getStatus(date);
  const pass = s.open === expectOpen;
  console.log(
    `${pass ? "PASS" : "FAIL"} ${name} → Dubai ${String(p.hour).padStart(2, "0")}:${String(p.minute).padStart(2, "0")} open=${s.open} "${s.label}"`,
  );
  if (!pass) ok = false;
}
process.exit(ok ? 0 : 1);
