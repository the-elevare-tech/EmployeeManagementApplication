"use client";

import { Clock } from "lucide-react";
import { CITIES, HOURS_LABEL, humanDuration, isOpen, minutesUntilClose, minutesUntilOpen, rangeIn, visitorZone } from "@/lib/hours";
import { useNow } from "@/components/layout/useNow";

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

export function WorkingHours() {
  const now = useNow(30000);
  const you = now ? visitorZone() : null;

  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand/15 to-indigo/15 text-brand">
            <Clock size={18} />
          </span>
          <div>
            <p className="font-medium text-text-1">Working hours</p>
            <p className="font-mono text-xs text-text-3">{HOURS_LABEL} · every day</p>
          </div>
        </div>
        <StatusPill now={now} />
      </div>

      <ul className="mt-5 divide-y divide-white/[0.06] border-t border-white/[0.06] text-sm">
        {you && (
          <li className="flex items-center justify-between gap-4 py-2.5">
            <span className="flex items-center gap-2 text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Your time ({you.city})
            </span>
            <span className="whitespace-nowrap font-mono text-[12px] text-text-1 sm:text-[13px]">{rangeIn(undefined, now!)}</span>
          </li>
        )}
        {CITIES.map((c) => (
          <li key={c.zone} className="flex items-center justify-between gap-3 py-2.5">
            <span className="text-text-2">
              {c.city} <span className="font-mono text-[11px] text-text-3">{c.code}</span>
            </span>
            <span className="whitespace-nowrap font-mono text-[12px] text-text-1 sm:text-[13px]">{now ? rangeIn(c.zone, now) : "-"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
