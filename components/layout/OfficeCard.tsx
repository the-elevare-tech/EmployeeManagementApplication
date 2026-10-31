"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { formatTime } from "@/lib/hours";
import { useNow } from "@/components/layout/useNow";
import { mapsEmbed, mapsLink, officeStatus, type Office } from "@/lib/offices";

/** Office card with a live, dark-styled Google Map. */
export function OfficeMapCard({ office, height = "h-56" }: { office: Office; height?: string }) {
  const now = useNow(1000);
  return (
    <div className="card flex h-full flex-col overflow-hidden rounded-3xl">
      <div className={`relative ${height} overflow-hidden border-b border-white/10 bg-surface-2`}>
        {/* placeholder shown while the map loads */}
        <div aria-hidden className="absolute inset-0 bg-grid opacity-60" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.25),transparent_45%)]" />
        <span aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute -inset-3 animate-ping rounded-full bg-brand/30" />
          <span className="relative block h-3.5 w-3.5 rounded-full border-2 border-white bg-brand shadow-[0_0_14px_#38BDF8]" />
        </span>
        <iframe
          title={`Map of ${office.label}`}
          src={mapsEmbed(office)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.6)_brightness(0.95)]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
        <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/15 bg-ink/80 px-2.5 py-1 text-[11px] font-medium text-text-1 backdrop-blur">
          <img src={`https://flagcdn.com/20x15/${office.flag}.png`} alt="" width={14} height={10} className="rounded-[2px]" />
          {office.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-2.5">
            <MapPin size={17} className="mt-0.5 shrink-0 text-brand" />
            <address className="not-italic text-[15px] leading-relaxed text-text-2">
              {office.address.map((l, i) => (
                <span key={l} className={`block ${i === 0 ? "text-text-1" : ""}`}>
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-mono text-sm tabular-nums text-text-1">{now ? formatTime(now, office.timeZone) : "--:--"}</p>
            <p className="font-mono text-[10px] text-text-3">local time · {office.tz}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-4">
          <p className="text-sm text-text-2">
            <span className="text-text-1">{office.hours.text}</span> {office.tz} · {office.hours.daysText}
          </p>
          {now && (
            <span className={`font-mono text-[11px] ${officeStatus(office, now).open ? "text-green" : "text-amber"}`}>
              {officeStatus(office, now).open ? "● Open now" : "● Closed"}
            </span>
          )}
        </div>
        <a
          href={mapsLink(office)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm text-brand hover:underline"
        >
          Get directions <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
