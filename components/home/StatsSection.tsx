"use client";

import { motion } from "framer-motion";
import { BadgeDollarSign, MessagesSquare, MonitorPlay, LifeBuoy, ShieldCheck, Globe2 } from "lucide-react";

/** "Why Elevare" — commitments, as a bento grid */
const items = [
  { icon: BadgeDollarSign, title: "Fixed price, agreed up front", desc: "A written scope and one number before work starts. Changes are quoted before they're made.", span: "md:col-span-2" },
  { icon: MessagesSquare, title: "Talk to the builders", desc: "No account managers. Your project lead is an engineer on the team.", span: "" },
  { icon: MonitorPlay, title: "Weekly demos", desc: "Every sprint ends with something you can click through — not a status report.", span: "" },
  { icon: LifeBuoy, title: "30 days of support", desc: "Bug fixes and small changes after launch are included. Retainers are optional.", span: "" },
  { icon: ShieldCheck, title: "Built to scale", desc: "Clean, documented code on modern infrastructure that grows with you.", span: "" },
  { icon: Globe2, title: "Works in your time zone", desc: "PKT overlaps the Gulf, Europe and US mornings, so meetings fit your day.", span: "md:col-span-3" },
];

export function StatsSection() {
  return (
    <section className="relative border-t border-border py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="text-label">Why Elevare</span>
            <h2 className="mt-5">
              <span className="text-silver">Small team. Senior work. No surprises.</span>
            </h2>
            <p className="mt-5 text-lg text-text-2">
              Founded in 2025 by software engineers who wanted to work directly with clients — the way we&apos;d want an agency to
              work with us.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:col-span-8">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
                className={`card rounded-3xl p-6 sm:p-7 ${it.span}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-indigo/20 text-brand ring-1 ring-brand/25">
                  <Icon size={19} />
                </span>
                <h3 className="mt-6 text-lg text-text-1">{it.title}</h3>
                <p className="mt-2 text-[15px] text-text-2">{it.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
