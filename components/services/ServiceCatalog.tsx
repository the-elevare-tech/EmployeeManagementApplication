"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/services";

/** Every service as an image card linking to its own page. */
export function ServiceCatalog() {
  return (
    <section className="relative border-t border-border py-20 lg:py-28">
      <div className="container-x">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-label">
              <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#38BDF8]" /> All services
            </span>
            <h2 className="mt-5">
              <span className="text-silver">{SERVICES.length} ways we help you build</span>
            </h2>
          </div>
          <p className="max-w-sm text-text-2">Each service has its own page with what&apos;s included, our stack, related work and FAQs.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
                className={`min-w-0 ${i === 0 || i === SERVICES.length - 1 ? "sm:col-span-2 lg:col-span-2" : ""}`}
              >
                <Link href={`/services/${s.slug}`} data-tilt="4" className="tilt card group flex h-full flex-col overflow-hidden rounded-3xl">
                  <div className={`relative overflow-hidden border-b border-white/10 ${i === 0 || i === SERVICES.length - 1 ? "h-56 sm:h-64" : "h-44"}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-deep via-indigo to-[#1e1b4b]" />
                    <Image
                      src={s.image ?? s.shot}
                      alt=""
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover opacity-55 mix-blend-luminosity grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    {/* screenshot peek */}
                    <div className="absolute -bottom-6 right-5 w-[46%] overflow-hidden rounded-lg border border-white/15 shadow-2xl transition-transform duration-500 group-hover:-translate-y-3">
                      <div className="flex gap-1 border-b border-white/10 bg-surface-2 px-2 py-1">
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                        <span className="h-1 w-1 rounded-full bg-white/30" />
                      </div>
                      <div className="relative aspect-[16/10]">
                        <Image src={s.shot} alt="" fill sizes="20vw" className="object-cover object-top" />
                      </div>
                    </div>
                    <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-ink/60 text-brand backdrop-blur">
                      <Icon size={20} />
                    </span>
                    <span className="absolute right-5 top-5 font-mono text-[11px] text-text-2">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-[11px] text-brand">{s.category}</p>
                    <div className="mt-1.5 flex items-start justify-between gap-3">
                      <h3 className="text-lg text-text-1">{s.title}</h3>
                      <ArrowUpRight size={18} className="mt-1 shrink-0 text-text-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </div>
                    <p className="mt-2 text-sm text-text-2">{s.summary}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
