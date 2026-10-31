"use client";

import { Clock } from "lucide-react";
import { humanDuration, isOpen, minutesUntilClose, minutesUntilOpen } from "@/lib/hours";
import { OFFICES, officeStatus } from "@/lib/offices";
import { formatTime } from "@/lib/hours";
import { useNow } from "@/components/layout/useNow";

/** Status of the Lahore engineering team (used by the booking console). */
export function StatusPill({ now, compact = false }: { now: Date | null; compact?: boolean }) {
  if (!now) return <span className="h-6 w-28 animate-pulse rounded-full bg-white/5" />;
  const open = isOpen(now);
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[11px] ${
        open ? "border-green/30 bg-green/10 text-green" : "border-amber/30 bg-amber/10 text-amber"
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${open ? "bg-green" : "bg-amber"}`} />
      </span>
      {compact ? (open ? "Online now" : "Offline now") : open ? `Online · ${humanDuration(minutesUntilClose(now))} left today` : `Offline · back in ${humanDuration(minutesUntilOpen(now))}`}
    </span>
  );
}

export function OfficeStatusDot({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-1.5 w-1.5">
      {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />}
      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${open ? "bg-green" : "bg-amber"}`} />
    </span>
  );
}

/** Office hours: each office shown in its own local time. */
export function WorkingHours() {
  const now = useNow(30000);

  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand/15 to-indigo/15 text-brand">
          <Clock size={18} />
        </span>
        <div>
          <p className="font-medium text-text-1">Office hours</p>
          <p className="text-xs text-text-3">Each office in its local time</p>
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {OFFICES.map((o) => {
          const st = now ? officeStatus(o, now) : null;
          return (
            <li key={o.id} className="rounded-xl border border-white/[0.08] bg-ink/40 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-medium text-text-1">
                    <img src={`https://flagcdn.com/20x15/${o.flag}.png`} alt="" width={14} height={10} className="rounded-[2px]" />
                    {o.label}
                  </p>
                  <p className="mt-1.5 font-mono text-[13px] text-text-1">
                    {o.hours.text} <span className="text-text-3">{o.tz}</span>
                  </p>
                  <p className="text-xs text-text-3">{o.hours.daysText}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-xs tabular-nums text-text-2">{now ? formatTime(now, o.timeZone) : "--:--"}</p>
                  <p className="font-mono text-[10px] text-text-3">local time</p>
                </div>
              </div>
              {st && (
                <p className={`mt-3 flex items-center gap-2 font-mono text-[11px] ${st.open ? "text-green" : "text-amber"}`}>
                  <OfficeStatusDot open={st.open} />
                  {st.text}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
