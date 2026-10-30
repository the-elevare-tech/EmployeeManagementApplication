"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Clock } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { TechImage, StackLogo } from "@/components/services/TechImage";

/** Desktop: vertical service tabs + live detail panel. Mobile: the same, stacked. */
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];

  return (
    <section className="relative py-16 lg:py-24">
      <div className="container-x">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-label">
            <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#38BDF8]" /> Explore
          </span>
          <h2 className="mt-5">
            <span className="text-silver">Pick a service.</span> <span className="text-electric">See how we deliver it.</span>
          </h2>
        </div>

        <div className="glass-strong grid overflow-hidden rounded-[2rem] lg:grid-cols-[300px_1fr]">
          {/* tabs */}
          <div role="tablist" aria-label="Services" className="flex gap-1 overflow-x-auto border-b border-white/10 p-2 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-3">
            {SERVICES.map((x, i) => {
              const Icon = x.icon;
              const on = i === active;
              return (
                <button
                  key={x.slug}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={`relative flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    on ? "text-text-1" : "text-text-2 hover:bg-white/[0.03] hover:text-text-1"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="svc-tab"
                      className="absolute inset-0 -z-0 rounded-xl border border-brand/40 bg-gradient-to-r from-brand/15 to-indigo/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${on ? "border-brand/40 text-brand" : "border-white/10 text-text-3"}`}>
                    <Icon size={16} />
                  </span>
                  <span className="relative whitespace-nowrap">{x.short}</span>
                </button>
              );
            })}
          </div>

          {/* panel */}
          <div className="relative min-h-[560px] p-5 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-8 xl:grid-cols-[1.05fr_1fr]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="rounded-md border border-brand/30 bg-brand/10 px-2 py-0.5 text-brand">{s.category}</span>
                    <span className="flex items-center gap-1.5 text-text-3">
                      <Clock size={12} /> {s.timeline}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-text-1 sm:text-3xl">{s.title}</h3>
                  <p className="mt-3 text-[15px] text-text-2">{s.description}</p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f.title} className="flex items-start gap-2 text-sm text-text-2">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green/15 text-green">
                          <Check size={10} />
                        </span>
                        {f.title}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.stack.map((t) => (
                      <span key={t.name} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-text-2">
                        <StackLogo name={t.name} icon={t.icon} size={14} />
                        {t.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={`/services/${s.slug}`} className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm">
                      Explore {s.short.toLowerCase()} <ArrowRight size={15} />
                    </Link>
                    <Link href={`/contact?service=${encodeURIComponent(s.title)}`} className="btn-ghost inline-flex items-center rounded-xl px-5 py-3 text-sm font-medium">
                      Get a quote
                    </Link>
                  </div>
                </div>

                <TechImage image={s.image} shot={s.shot} shotLabel={s.shotLabel} label={`service://${s.slug}`} className="aspect-[4/3.4] xl:aspect-auto xl:h-full xl:min-h-[440px]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
