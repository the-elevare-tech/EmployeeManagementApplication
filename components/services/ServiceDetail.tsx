"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock, Target, Package } from "lucide-react";
import { SERVICES, getService } from "@/lib/services";
import { getProjectBySlug, type Project } from "@/lib/projects";
import { TechImage, StackLogo } from "@/components/services/TechImage";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CTAStrip } from "@/components/home/CTAStrip";

const ease = [0.22, 1, 0.36, 1] as const;
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease },
};

function Faq({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`card rounded-2xl ${open ? "border-brand/30" : ""}`}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="font-medium text-text-1">{q}</span>
        <ChevronDown size={18} className={`shrink-0 text-text-3 transition-transform ${open ? "rotate-180 text-brand" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="px-6 pb-5 text-[15px] text-text-2">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ServiceDetail({ slug }: { slug: string }) {
  const s = getService(slug)!;
  const Icon = s.icon;
  const [openFaq, setOpenFaq] = useState(0);
  const related = s.related.map(getProjectBySlug).filter(Boolean) as Project[];
  const idx = SERVICES.findIndex((x) => x.slug === s.slug);
  const others = [1, 2, 3].map((k) => SERVICES[(idx + k) % SERVICES.length]);

  return (
    <>
      {/* hero */}
      <section className="relative -mt-16 overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="aurora-drift absolute left-[5%] top-[15%] h-[380px] w-[380px] rounded-full bg-brand/15 blur-[110px]" />
          <div className="aurora-drift-2 absolute right-[8%] top-[5%] h-[440px] w-[440px] rounded-full bg-indigo/20 blur-[120px]" />
        </div>
        <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm text-text-3 transition-colors hover:text-text-1">
              <ArrowLeft size={14} /> All services
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-deep to-indigo text-white shadow-[0_10px_30px_-8px_rgba(99,102,241,0.8)]">
                <Icon size={22} />
              </span>
              <span className="text-label">{s.category}</span>
            </div>
            <h1 className="mt-6 text-[clamp(2.4rem,4.8vw,4rem)]">
              <span className="text-silver">{s.title}</span>
            </h1>
            <p className="mt-4 text-xl text-text-1">{s.tagline}</p>
            <p className="mt-4 max-w-xl text-text-2">{s.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/contact?service=${encodeURIComponent(s.title)}`} data-magnetic className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-[15px]">
                Get a free quote <ArrowRight size={16} />
              </Link>
              <a href="#work" className="btn-ghost inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-[15px] font-medium">
                See related work
              </a>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-3">
              <div className="glass-strong rounded-2xl p-4">
                <dt className="flex items-center gap-1.5 font-mono text-[11px] text-text-3">
                  <Clock size={12} /> Typical timeline
                </dt>
                <dd className="mt-1 font-medium text-text-1">{s.timeline}</dd>
              </div>
              <div className="glass-strong rounded-2xl p-4">
                <dt className="flex items-center gap-1.5 font-mono text-[11px] text-text-3">
                  <Package size={12} /> Engagement
                </dt>
                <dd className="mt-1 font-medium text-text-1">Fixed price or retainer</dd>
              </div>
            </dl>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.1, ease }}>
            <div data-tilt="4" className="tilt">
              <TechImage image={s.image} shot={s.shot} shotLabel={s.shotLabel} label={`service://${s.slug}`} priority className="aspect-[4/3.2]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* features */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-x">
          <motion.div {...reveal} className="mb-12 max-w-2xl">
            <span className="text-label">What&apos;s included</span>
            <h2 className="mt-5">
              <span className="text-silver">Everything you need, built properly</span>
            </h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
                className="card rounded-3xl p-6"
              >
                <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg text-text-1">{f.title}</h3>
                <p className="mt-2 text-[15px] text-text-2">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* deliverables + stack + ideal for */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-x grid grid-cols-1 gap-4 lg:grid-cols-3">
          <motion.div {...reveal} className="glass-strong rounded-3xl p-7 lg:row-span-2">
            <h3 className="text-xl text-text-1">What you get</h3>
            <ul className="mt-6 space-y-3">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[15px] text-text-2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green/15 text-green">
                    <Check size={12} />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...reveal} className="glass-strong rounded-3xl p-7 lg:col-span-2">
            <h3 className="text-xl text-text-1">Tech stack</h3>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {s.stack.map((t) => (
                <div key={t.name} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-ink/40 px-4 py-3 text-sm text-text-1">
                  <StackLogo name={t.name} icon={t.icon} size={20} />
                  {t.name}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...reveal} className="glass-strong rounded-3xl p-7 lg:col-span-2">
            <h3 className="flex items-center gap-2 text-xl text-text-1">
              <Target size={18} className="text-brand" /> Ideal for
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.idealFor.map((x) => (
                <span key={x} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-text-2">
                  {x}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* related work */}
      {related.length > 0 && (
        <section id="work" className="scroll-mt-24 border-t border-border py-20 lg:py-28">
          <div className="container-x">
            <motion.div {...reveal} className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-label">Related work</span>
                <h2 className="mt-5">
                  <span className="text-silver">Built by our team</span>
                </h2>
              </div>
              <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-brand">
                All projects <ArrowUpRight size={15} />
              </Link>
            </motion.div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <div key={p.slug} className="min-w-0">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProcessSection />

      {/* FAQ + other services */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0">
            <span className="text-label">FAQ</span>
            <h2 className="mt-5">
              <span className="text-silver">Common questions</span>
            </h2>
            <div className="mt-8 space-y-3">
              {s.faqs.map((f, i) => (
                <Faq key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <span className="text-label">More services</span>
            <div className="mt-8 space-y-3">
              {others.map((o) => {
                const OIcon = o.icon;
                return (
                  <Link key={o.slug} href={`/services/${o.slug}`} className="card group flex items-center gap-4 rounded-2xl p-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand/15 to-indigo/15 text-brand">
                      <OIcon size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-text-1">{o.title}</span>
                      <span className="block truncate text-sm text-text-3">{o.summary}</span>
                    </span>
                    <ArrowUpRight size={17} className="shrink-0 text-text-3 transition-colors group-hover:text-brand" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTAStrip />
    </>
  );
}
