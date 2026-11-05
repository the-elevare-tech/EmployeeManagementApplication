"use client";

import Link from "next/link";
import { ArrowRight, Code2, Bot, Smartphone, Workflow, ShoppingCart, Layers, Check } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { Globe } from "@/components/home/Globe";

const projectTypes = [
  { label: "Website", value: "web-development", icon: Code2 },
  { label: "AI & automation", value: "ai-automation", icon: Bot },
  { label: "Mobile app", value: "mobile-solutions", icon: Smartphone },
  { label: "E-commerce", value: "ecommerce-development", icon: ShoppingCart },
  { label: "SaaS product", value: "saas-development", icon: Layers },
  { label: "Custom software", value: "custom-development", icon: Workflow },
];

const REGIONS = ["UAE", "Saudi Arabia", "UK", "USA", "Canada", "Australia"];

function BookingConsole() {
  return (
    <div className="glass-strong ring-conic relative overflow-hidden rounded-3xl">
      {/* title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-coral/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green/80" />
          <span className="ml-2 hidden truncate font-mono text-xs text-text-3 sm:inline">elevare / global-delivery</span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-green/30 bg-green/10 px-2.5 py-1 font-mono text-[11px] text-green">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
          </span>
          Accepting new projects
        </span>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* globe */}
        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-[250px] sm:max-w-[270px]">
            <Globe />
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 font-mono text-[10.5px] text-text-3">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_8px_#38BDF8]" /> Lahore office</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-violet shadow-[0_0_8px_#A78BFA]" /> San Francisco office</span>
            <span className="hidden sm:inline">· drag to spin</span>
          </div>
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
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,24,48,0.9),rgba(6,10,24,0.95))] px-6 py-12 sm:px-10 lg:px-14 lg:py-12">
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
              <div className="mt-9 border-t border-white/10 pt-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-3">Delivering to clients in</p>
                <div className="mt-3 flex flex-wrap justify-center gap-1.5 lg:justify-start">
                  {REGIONS.map((r) => (
                    <span key={r} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-text-2">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <BookingConsole />
          </div>
        </div>
      </div>
    </section>
  );
}
