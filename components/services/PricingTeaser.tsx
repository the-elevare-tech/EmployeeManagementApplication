"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Package, RefreshCcw, Users } from "lucide-react";

const models = [
  {
    icon: Package,
    title: "Fixed-price project",
    best: "Defined scope",
    desc: "One agreed price and timeline, paid in milestones.",
    points: ["Written scope & milestones", "Weekly demos", "30 days post-launch support"],
    featured: true,
  },
  {
    icon: RefreshCcw,
    title: "Monthly retainer",
    best: "Ongoing work",
    desc: "A set number of hours each month for features, fixes and growth.",
    points: ["Priority response", "Monthly roadmap", "Rollover planning"],
  },
  {
    icon: Users,
    title: "Dedicated team",
    best: "Scaling fast",
    desc: "Engineers and designers working as an extension of your team.",
    points: ["Full-time or part-time", "Your tools & rituals", "Scale up or down"],
  },
];

export function PricingTeaser() {
  return (
    <section className="relative border-t border-border py-20 lg:py-28">
      <div className="container-x">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-label">
            <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#38BDF8]" /> Ways to work together
          </span>
          <h2 className="mt-5">
            <span className="text-silver">Transparent, flexible engagement</span>
          </h2>
          <p className="mt-4 text-lg text-text-2">No surprise invoices. Pick the model that fits your project.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {models.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`card relative flex flex-col rounded-3xl p-7 ${m.featured ? "ring-conic" : ""}`}
              >
                {m.featured && (
                  <span className="absolute right-5 top-5 rounded-full border border-brand/40 bg-brand/10 px-2.5 py-0.5 font-mono text-[10px] text-brand">Most popular</span>
                )}
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep to-indigo text-white">
                  <Icon size={20} />
                </span>
                <h3 className="mt-6 text-xl text-text-1">{m.title}</h3>
                <p className="mt-1 font-mono text-xs text-text-3">Best for: {m.best}</p>
                <p className="mt-4 text-[15px] text-text-2">{m.desc}</p>
                <ul className="mt-5 space-y-2.5 border-t border-white/[0.07] pt-5">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-text-2">
                      <Check size={14} className="text-green" /> {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[15px]">
            Get a free estimate <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
