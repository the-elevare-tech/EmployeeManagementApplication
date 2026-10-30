"use client";

import Link from "next/link";
import { ArrowRight, Code2, Bot, Smartphone, Workflow, ShoppingCart, Layers, Check } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { CLOSE_UTC_HOUR, OPEN_UTC_HOUR, countdown, formatTime, rangeIn, sameAsPKT, visitorZone } from "@/lib/hours";
import { useNow } from "@/components/layout/useNow";
import { StatusPill } from "@/components/contact/WorkingHours";

const projectTypes = [
  { label: "Website", value: "web-development", icon: Code2 },
  { label: "AI & automation", value: "ai-automation", icon: Bot },
  { label: "Mobile app", value: "mobile-solutions", icon: Smartphone },
  { label: "E-commerce", value: "ecommerce-development", icon: ShoppingCart },
  { label: "SaaS product", value: "saas-development", icon: Layers },
  { label: "Custom software", value: "custom-development", icon: Workflow },
];

/** 24-hour strip of the visitor's day, with our working window lit up and a live "now" marker. */
function DayTimeline({ now }: { now: Date | null }) {
  // offset (hours) of the visitor's zone from UTC
  const offset = now ? -now.getTimezoneOffset() / 60 : 0;
  const localHourOfUtc = (h: number) => (((h + offset) % 24) + 24) % 24;
  const start = localHourOfUtc(OPEN_UTC_HOUR);
  const end = localHourOfUtc(CLOSE_UTC_HOUR);
  const isWorking = (h: number) => (start < end ? h >= start && h < end : h >= start || h < end);
  const nowPos = now ? ((now.getHours() + now.getMinutes() / 60) / 24) * 100 : -10;

  return (
    <div>
      <div className="relative flex h-9 gap-[3px]">
        {Array.from({ length: 24 }, (_, h) => (
          <div
            key={h}
            className={`flex-1 rounded-[3px] transition-colors ${
              now && isWorking(Math.floor(h)) ? "bg-gradient-to-t from-brand/50 to-indigo/60 shadow-[0_0_10px_-2px_rgba(56,189,248,0.6)]" : "bg-white/[0.05]"
            }`}
          />
        ))}
        {now && (
          <div className="absolute -bottom-1.5 -top-1.5 w-[2px] rounded-full bg-white shadow-[0_0_10px_#fff]" style={{ left: `${nowPos}%` }}>
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-text-1">now</span>
          </div>
        )}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-text-3">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>12 AM</span>
      </div>
    </div>
  );
}

function Countdown({ now }: { now: Date | null }) {
  const c = now ? countdown(now) : null;
  const pad = (n: number) => String(n).padStart(2, "0");
  const units = c ? [pad(c.h), pad(c.m), pad(c.s)] : ["--", "--", "--"];
  return (
    <div className="flex items-end gap-1.5 sm:gap-2">
      {units.map((u, i) => (
        <div key={i} className="flex items-end gap-1.5 sm:gap-2">
          <div className="text-center">
            <div className="min-w-[3.2rem] rounded-xl border border-white/10 bg-ink/60 px-2 py-2 font-mono text-2xl font-semibold tabular-nums text-text-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:min-w-[3.8rem] sm:text-3xl">
              {u}
            </div>
            <div className="mt-1 font-mono text-[10px] text-text-3">{["hrs", "min", "sec"][i]}</div>
          </div>
          {i < 2 && <span className="mb-6 font-mono text-xl text-text-3">:</span>}
        </div>
      ))}
    </div>
  );
}

function BookingConsole() {
  const now = useNow(1000);
  const you = now ? visitorZone() : null;

  return (
    <div data-tilt="3" className="tilt glass-strong ring-conic relative overflow-hidden rounded-3xl">
      {/* title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
          <span className="ml-2 font-mono text-xs text-text-3">elevare / book-a-call</span>
        </div>
        <StatusPill now={now} compact />
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        {/* clock(s) + live countdown */}
        <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
          <div className="rounded-2xl border border-white/[0.08] bg-ink/40 p-4">
            {now && !sameAsPKT(now) ? (
              <div className="grid grid-cols-2 gap-4 sm:block sm:space-y-3">
                <div>
                  <p className="font-mono text-[11px] text-text-3">Faisalabad · PKT</p>
                  <p className="mt-0.5 font-display text-xl font-semibold tabular-nums text-text-1">{formatTime(now, "Asia/Karachi")}</p>
                </div>
                <div>
                  <p className="truncate font-mono text-[11px] text-text-3">You · {you?.city}</p>
                  <p className="mt-0.5 font-display text-xl font-semibold tabular-nums text-text-1">{formatTime(now)}</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-mono text-[11px] text-text-3">Faisalabad · PKT</p>
                <p className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-tight text-text-1">{now ? formatTime(now, "Asia/Karachi") : "--:--"}</p>
                <p className="mt-1 font-mono text-[10px] text-brand">same time as you</p>
              </div>
            )}
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-ink/40 p-4">
            <p className={`font-mono text-[11px] ${now && countdown(now).open ? "text-green" : "text-amber"}`}>
              {now ? (countdown(now).open ? "● Closes in" : "● Opens in") : "Loading"}
            </p>
            <div className="mt-2">
              <Countdown now={now} />
            </div>
          </div>
        </div>

        {/* availability strip */}
        <div>
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <p className="text-sm text-text-1">Our hours in your day</p>
            <p className="font-mono text-xs text-brand">{now ? rangeIn(undefined, now) : ""}</p>
          </div>
          <DayTimeline now={now} />
        </div>

        {/* project type */}
        <div>
          <p className="mb-3 text-sm text-text-1">What are you building?</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {projectTypes.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.value}
                  href={`/contact?service=${encodeURIComponent(p.value)}`}
                  className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5 text-[13px] text-text-2 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:bg-brand/10 hover:text-text-1"
                >
                  <Icon size={15} className="shrink-0 text-text-3 transition-colors group-hover:text-brand" />
                  <span className="truncate">{p.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CTAStrip() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,24,48,0.9),rgba(6,10,24,0.95))] px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
          {/* background: grid, aurora, falling beams */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_70%_80%_at_70%_50%,#000,transparent)]" />
            <div className="aurora-drift absolute -right-20 top-1/2 h-[520px] w-[700px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.25),rgba(99,102,241,0.15)_55%,transparent)] blur-2xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
          </div>

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div className="text-center lg:text-left">
              <span className="text-label">
                <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#38BDF8]" /> Free 30-minute consultation
              </span>
              <h2 className="mt-6 text-[clamp(2rem,3.4vw,3rem)] leading-[1.05]">
                <span className="text-silver">Have a project in mind?</span>
                <br />
                <span className="text-electric">Let&apos;s talk it through.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-lg text-text-2 lg:mx-0">
                Talk directly with our engineers. You&apos;ll leave with a rough plan, a timeline and a price range, whether or not
                you work with us.
              </p>
              <ul className="mx-auto mt-7 grid max-w-lg gap-2.5 text-left text-[15px] text-text-2 sm:grid-cols-2 lg:mx-0">
                {["Reply within 24 hours", "Fixed-price proposal", "NDA on request", "No obligation"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green/15 text-green">
                      <Check size={12} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/contact"
                  data-magnetic
                  className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-[15px] sm:w-auto"
                >
                  Book a free call
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className="btn-ghost inline-flex w-full items-center justify-center rounded-xl px-7 py-3.5 text-[15px] font-medium sm:w-auto"
                >
                  Message us on WhatsApp
                </a>
              </div>
            </div>
            <BookingConsole />
          </div>
        </div>
      </div>
    </section>
  );
}
