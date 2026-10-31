"use client";

import { useState } from "react";
import Link from "next/link";
import { Linkedin, Facebook, ArrowUpRight, ArrowUp, Mail, MessageCircle, Phone, CalendarCheck, Copy, Check, MapPin } from "lucide-react";
import { countdown, formatTime, HOURS_LABEL } from "@/lib/hours";
import { useNow } from "@/components/layout/useNow";
import { Logo } from "@/components/ui/Logo";
import { COMPANY, CONTACT } from "@/lib/constants";
import { OFFICES, mapsLink, officeStatus } from "@/lib/offices";
import { SERVICES } from "@/lib/services";

const company = [
  { name: "About", href: "/about" },
  { name: "Our work", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];
const legal = [
  { name: "Privacy policy", href: "/support/privacy" },
  { name: "Terms of service", href: "/support/terms" },
];

const pad = (n: number) => String(n).padStart(2, "0");

function StatusLine() {
  const now = useNow(1000);
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
      {OFFICES.map((o) => {
        const st = now ? officeStatus(o, now) : null;
        return (
          <span key={o.id} className={`flex items-center gap-1.5 ${!st || st.open ? "text-green" : "text-amber"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${!st || st.open ? "bg-green shadow-[0_0_8px_#34D399]" : "bg-amber"}`} />
            {o.city}: {st ? (st.open ? "open" : "closed") : "..."}
            <span className="hidden text-text-3 md:inline">· {o.hours.text} {o.tz}</span>
          </span>
        );
      })}
    </div>
  );
}

function FooterContact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard
      ?.writeText(CONTACT.email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  };
  return (
    <div className="mt-6 space-y-2.5 text-[15px]">
      <button type="button" onClick={copy} className="group flex items-center gap-2.5 text-text-1 transition-colors hover:text-brand">
        <Mail size={15} className="text-text-3 group-hover:text-brand" />
        {CONTACT.email}
        <span className="font-mono text-[11px] text-text-3">{copied ? "copied ✓" : "copy"}</span>
      </button>
    </div>
  );
}

function OfficeList() {
  const now = useNow(1000);
  return (
    <div className="mt-7 space-y-3">
      {OFFICES.map((o) => (
        <a
          key={o.id}
          href={mapsLink(o)}
          target="_blank"
          rel="noopener noreferrer"
          className="card group flex items-start gap-3 rounded-2xl p-4"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand/15 to-indigo/15 text-brand">
            <MapPin size={16} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 text-sm font-medium text-text-1">
              <img src={`https://flagcdn.com/20x15/${o.flag}.png`} alt="" width={14} height={10} className="rounded-[2px]" />
              {o.label}
            </span>
            <span className="mt-0.5 block text-[13px] leading-snug text-text-3">{o.full}</span>
            {o.phone && (
              <span className="mt-1.5 flex items-center gap-1.5 font-mono text-[12px] text-text-2">
                <Phone size={12} className="text-brand" /> {o.phone.display}
              </span>
            )}
          </span>
          <span className="shrink-0 text-right">
            <span className="block font-mono text-xs tabular-nums text-text-1">{now ? formatTime(now, o.timeZone) : "--:--"}</span>
            <span className="block font-mono text-[10px] text-text-3">{o.tz}</span>
          </span>
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-ink">
      {/* decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand/70 to-transparent" />
        <div className="absolute left-1/2 top-0 h-48 w-[60%] -translate-x-1/2 rounded-full bg-brand/10 blur-[90px]" />
        <div className="absolute -bottom-24 -right-16 aspect-[43/49] w-[420px] opacity-[0.05]">
          <div className="clip-bar absolute inset-0 bg-white" />
          <div className="clip-wedge absolute inset-0 bg-brand" />
        </div>
      </div>

      <div className="container-x relative pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Elevare Tech home">
              <Logo size={30} variant="footer" />
            </Link>
            <p className="mt-5 max-w-[36ch] text-text-2">A software studio building websites, apps and AI tools for businesses worldwide.</p>
            <FooterContact />
            <OfficeList />
          </div>

          <div className="lg:col-span-5">
            <h4 className="mb-5 font-mono text-xs text-text-3">Services</h4>
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group inline-flex items-center gap-2 text-[15px] text-text-2 transition-colors hover:text-text-1">
                    <span className="h-1 w-1 rounded-full bg-text-3 transition-colors group-hover:bg-brand" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-3 lg:grid-cols-1">
            <div>
              <h4 className="mb-5 font-mono text-xs text-text-3">Company</h4>
              <ul className="space-y-3">
                {company.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-[15px] text-text-2 transition-colors hover:text-text-1">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-5 font-mono text-xs text-text-3">Legal</h4>
              <ul className="space-y-3">
                {legal.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-[15px] text-text-2 transition-colors hover:text-text-1">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-border py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-text-3">
            © 2025 {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {[
              { icon: Linkedin, href: COMPANY.linkedin, label: "Elevare Tech on LinkedIn" },
              { icon: Facebook, href: COMPANY.facebook, label: "Elevare Tech on Facebook" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-2 transition-colors hover:border-brand/50 hover:text-brand"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-border bg-[#03050f]">
        <div className="container-x flex flex-col gap-2 py-3.5 font-mono text-[11px] text-text-3 sm:flex-row sm:items-center sm:justify-between">
          <StatusLine />
          <span className="hidden sm:inline">
            Press <kbd className="rounded border border-white/10 px-1">Ctrl</kbd> + <kbd className="rounded border border-white/10 px-1">K</kbd> to search
          </span>
        </div>
      </div>
    </footer>
  );
}
