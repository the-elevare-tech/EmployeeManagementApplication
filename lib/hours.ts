/**
 * Elevare Tech working hours: 2:00 PM to 12:00 AM PKT (UTC+5), every day.
 * That is 09:00 to 19:00 UTC. All conversions are computed live with Intl,
 * so daylight saving in other cities is always correct.
 */
export const OPEN_UTC_HOUR = 9;
export const CLOSE_UTC_HOUR = 19;
export const HOURS_LABEL = "2:00 PM to 12:00 AM PKT (UTC+5)";

export const CITIES = [
  { city: "Lahore", zone: "Asia/Karachi", code: "PKT" },
  { city: "UTC / GMT", zone: "UTC", code: "UTC" },
  { city: "Dubai", zone: "Asia/Dubai", code: "GST" },
  { city: "Riyadh", zone: "Asia/Riyadh", code: "AST" },
  { city: "London", zone: "Europe/London", code: "UK" },
  { city: "New York", zone: "America/New_York", code: "ET" },
  { city: "San Francisco", zone: "America/Los_Angeles", code: "PT" },
  { city: "Sydney", zone: "Australia/Sydney", code: "AET" },
] as const;

function todayAtUtc(hour: number, base = new Date()) {
  return new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), hour, 0, 0));
}

export function formatTime(d: Date, timeZone?: string) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone }).format(d);
}

/** "2:00 PM to 12:00 AM" in the given zone (undefined = visitor's own zone). */
export function rangeIn(timeZone?: string, base = new Date()) {
  return `${formatTime(todayAtUtc(OPEN_UTC_HOUR, base), timeZone)} to ${formatTime(todayAtUtc(CLOSE_UTC_HOUR, base), timeZone)}`;
}

export function isOpen(now = new Date()) {
  const h = now.getUTCHours() + now.getUTCMinutes() / 60;
  return h >= OPEN_UTC_HOUR && h < CLOSE_UTC_HOUR;
}

/** Minutes until we next open (0 if open now). */
export function minutesUntilOpen(now = new Date()) {
  if (isOpen(now)) return 0;
  const open = todayAtUtc(OPEN_UTC_HOUR, now);
  if (now.getTime() >= todayAtUtc(CLOSE_UTC_HOUR, now).getTime()) open.setUTCDate(open.getUTCDate() + 1);
  return Math.ceil((open.getTime() - now.getTime()) / 60000);
}

export function minutesUntilClose(now = new Date()) {
  return Math.max(0, Math.ceil((todayAtUtc(CLOSE_UTC_HOUR, now).getTime() - now.getTime()) / 60000));
}

export function humanDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

/** Visitor's zone name and a friendly city label, e.g. "Europe/Berlin" → "Berlin". */
export function visitorZone() {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const city = zone.split("/").pop()?.replace(/_/g, " ") ?? zone;
  return { zone, city };
}

/** Seconds until the next open/close boundary, and which one it is. */
export function countdown(now = new Date()) {
  const open = isOpen(now);
  const target = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), open ? CLOSE_UTC_HOUR : OPEN_UTC_HOUR, 0, 0));
  if (!open && now.getTime() >= target.getTime()) target.setUTCDate(target.getUTCDate() + 1);
  const secs = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  return {
    open,
    h: Math.floor(secs / 3600),
    m: Math.floor((secs % 3600) / 60),
    s: secs % 60,
  };
}

/** True when the visitor's clock currently matches Pakistan time. */
export function sameAsPKT(now = new Date()) {
  return -now.getTimezoneOffset() === 300;
}
