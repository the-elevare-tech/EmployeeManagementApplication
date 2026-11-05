"use client";

import { Building2, MapPin, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { formatTime } from "@/lib/hours";
import { useNow } from "@/components/layout/useNow";
import { OFFICES, mapsLink } from "@/lib/offices";

/** Our offices: address, local time, phone and WhatsApp for each office. */
export function OfficeLocations() {
  const now = useNow(30000);

  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand/15 to-indigo/15 text-brand">
          <Building2 size={18} />
        </span>
        <div>
          <p className="font-medium text-text-1">Our offices</p>
          <p className="text-xs text-text-3">Lahore, Pakistan and San Francisco, USA</p>
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {OFFICES.map((o) => (
          <li key={o.id} className="rounded-xl border border-white/[0.08] bg-ink/40 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="flex items-center gap-2 text-sm font-medium text-text-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://flagcdn.com/20x15/${o.flag}.png`} alt="" width={14} height={10} className="rounded-[2px]" />
                {o.label}
              </p>
              <div className="shrink-0 text-right">
                <p className="font-mono text-xs tabular-nums text-text-2">{now ? formatTime(now, o.timeZone) : "--:--"}</p>
                <p className="font-mono text-[10px] text-text-3">local time</p>
              </div>
            </div>

            <a
              href={mapsLink(o)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 flex items-start gap-2 text-[13.5px] leading-snug text-text-2 transition-colors hover:text-text-1"
            >
              <MapPin size={14} className="mt-0.5 shrink-0 text-brand" />
              <span>
                {o.full}
                <span className="ml-1.5 inline-flex items-center gap-0.5 whitespace-nowrap text-xs text-brand group-hover:underline">
                  Directions <ArrowUpRight size={12} />
                </span>
              </span>
            </a>

            {o.phone && (
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-3">
                <a
                  href={o.phone.tel}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 font-mono text-[12px] text-text-1 transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <Phone size={13} className="text-brand" /> {o.phone.display}
                </a>
                <a
                  href={o.phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-green/25 bg-green/10 px-2.5 py-1.5 text-[12px] font-medium text-green transition-colors hover:border-green/50"
                >
                  <MessageCircle size={13} /> WhatsApp
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
