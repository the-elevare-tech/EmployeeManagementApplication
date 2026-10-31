export type Office = {
  id: string;
  city: string;
  country: string;
  label: string;
  address: string[];
  full: string;
  lon: number;
  lat: number;
  flag: string;
  timeZone: string;
  tz: string;
  /** Office hours in the office's own local time (minutes from midnight; 1440 = midnight). */
  hours: { start: number; end: number; days: number[]; text: string; daysText: string };
  /** Office phone (also on WhatsApp). */
  phone?: { display: string; tel: string; whatsapp: string };
};

export const OFFICES: Office[] = [
  {
    id: "lahore",
    city: "Lahore",
    country: "Pakistan",
    label: "Lahore office",
    address: ["Pace Shopping Mall", "Model Town Link Road", "Lahore, Punjab, Pakistan"],
    full: "Pace Shopping Mall, Model Town Link Road, Lahore, Punjab, Pakistan",
    lon: 74.3255,
    lat: 31.4815,
    flag: "pk",
    timeZone: "Asia/Karachi",
    tz: "PKT",
    // 2:00 PM to 12:00 AM, every day
    hours: { start: 14 * 60, end: 24 * 60, days: [0, 1, 2, 3, 4, 5, 6], text: "2:00 PM to 12:00 AM", daysText: "Every day" },
    phone: { display: "+92 346 0618820", tel: "tel:+923460618820", whatsapp: "https://wa.me/923460618820" },
  },
  {
    id: "san-francisco",
    city: "San Francisco",
    country: "USA",
    label: "San Francisco office",
    address: ["680 Folsom Street", "San Francisco, CA 94107", "United States"],
    full: "680 Folsom Street, San Francisco, CA 94107, USA",
    lon: -122.3982,
    lat: 37.7851,
    flag: "us",
    timeZone: "America/Los_Angeles",
    tz: "PT",
    // 9:00 AM to 5:00 PM, Monday to Friday (change here to update the whole site)
    hours: { start: 9 * 60, end: 17 * 60, days: [1, 2, 3, 4, 5], text: "9:00 AM to 5:00 PM", daysText: "Monday to Friday" },
  },
];

export const mapsEmbed = (o: Office) => `https://maps.google.com/maps?q=${encodeURIComponent(o.full)}&z=16&output=embed`;
export const mapsLink = (o: Office) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.full)}`;

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WD: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Weekday and minutes-from-midnight for `now` in the office's time zone. */
function localParts(now: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  return { day: WD[get("weekday")] ?? 0, mins: Number(get("hour")) * 60 + Number(get("minute")) };
}

const fmtMins = (m: number) => {
  const h = Math.floor(m / 60) % 24;
  const mm = m % 60;
  return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

export type OfficeStatus = { open: boolean; text: string };

/** Live open/closed status for an office, in that office's own hours. */
export function officeStatus(o: Office, now: Date): OfficeStatus {
  const { day, mins } = localParts(now, o.timeZone);
  const { start, end, days } = o.hours;
  if (days.includes(day) && mins >= start && mins < end) {
    const left = end - mins;
    const h = Math.floor(left / 60);
    return { open: true, text: `Open now · closes in ${h > 0 ? `${h}h ` : ""}${left % 60}m` };
  }
  // next opening
  for (let k = 0; k < 8; k++) {
    const d = (day + k) % 7;
    if (!o.hours.days.includes(d)) continue;
    if (k === 0 && mins >= start) continue;
    const when = k === 0 ? "today" : k === 1 ? "tomorrow" : DAY_NAMES[d];
    return { open: false, text: `Closed · opens ${when} at ${fmtMins(start)}` };
  }
  return { open: false, text: "Closed" };
}
