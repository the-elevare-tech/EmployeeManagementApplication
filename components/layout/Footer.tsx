"use client";

import { useState } from "react";
import Link from "next/link";
import { Linkedin, Facebook, ArrowUpRight, ArrowUp, Mail, MessageCircle, CalendarCheck, Copy, Check, MapPin } from "lucide-react";
import { countdown, formatTime, HOURS_LABEL } from "@/lib/hours";
import { useNow } from "@/components/layout/useNow";
import { Logo } from "@/components/ui/Logo";
import { COMPANY, CONTACT } from "@/lib/constants";
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
  const c = now ? countdown(now) : null;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
      <span className={`flex items-center gap-1.5 ${!c || c.open ? "text-green" : "text-amber"}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${!c || c.open ? "bg-green shadow-[0_0_8px_#34D399]" : "bg-amber"}`} />
        {!c ? "Status" : c.open ? `Online · closes in ${pad(c.h)}:${pad(c.m)}:${pad(c.s)}` : `Offline · opens in ${pad(c.h)}:${pad(c.m)}:${pad(c.s)}`}
      </span>
      <span className="hidden sm:inline">Hours {HOURS_LABEL}</span>
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
      <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 text-text-1 transition-colors hover:text-brand">
        <MessageCircle size={15} className="text-text-3 group-hover:text-brand" />
        {COMPANY.phone}
        <span className="font-mono text-[11px] text-text-3">WhatsApp</span>
      </a>
    </div>
  );
}

function OfficeCard() {
  const now = useNow(1000);
  return (
    <div className="glass-strong mt-7 overflow-hidden rounded-2xl">
      <div className="relative h-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_55%,rgba(56,189,248,0.35),transparent_45%)]" />
        <span className="absolute left-[62%] top-[55%] -translate-x-1/2 -translate-y-1/2">
          <span className="absolute -inset-3 animate-ping rounded-full bg-brand/30" />
          <span className="relative block h-3 w-3 rounded-full border-2 border-white bg-brand shadow-[0_0_14px_#38BDF8]" />
        </span>
        <span className="absolute left-4 top-3 font-mono text-[10px] text-text-3">31.4504° N · 73.1350° E</span>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2.5">
          <MapPin size={16} className="text-brand" />
          <div>
            <p className="text-sm text-text-1">Faisalabad, Pakistan</p>
            <p className="text-xs text-text-3">Serving clients in 7 countries</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-sm tabular-nums text-text-1">{now ? formatTime(now, "Asia/Karachi") : "--:--"}</p>
          <p className="font-mono text-[10px] text-text-3">local time</p>
        </div>
      </div>
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
            <OfficeCard />
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
            © {COMPANY.copyrightYear} {COMPANY.name}. Built in Pakistan for the world.
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
