"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Target, Eye, Gem, ScanEye, Zap, Handshake, Lightbulb, MapPin } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { GlobalMap } from "@/components/home/GlobalMap";
import { StatsSection } from "@/components/home/StatsSection";
import { CTAStrip } from "@/components/home/CTAStrip";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { end: 2025, label: "Founded", plain: true },
  { end: 15, suffix: "+", label: "Projects shipped" },
  { end: 7, label: "Countries served" },
  { end: 6, label: "Service lines" },
];

const milestones = [
  { when: "2025", title: "Founded in Faisalabad", desc: "Started by software engineers who wanted to work directly with clients." },
  { when: "2025", title: "First products shipped", desc: "Web apps, mobile apps and AI tools delivered for our first clients." },
  { when: "2025", title: "Going international", desc: "First clients in the UAE, Saudi Arabia, the UK and North America." },
  { when: "2026", title: "15+ projects, 7 countries", desc: "AI agents, RAG platforms, dashboards and SaaS products in production." },
  { when: "Next", title: "Scaling our AI practice", desc: "More automation, more agents, and a bigger team in Pakistan.", next: true },
];

const values = [
  { icon: Gem, title: "Quality", desc: "We don't ship until it's right." },
  { icon: ScanEye, title: "Transparency", desc: "No hidden costs, no surprises." },
  { icon: Zap, title: "Speed", desc: "We move fast without cutting corners." },
  { icon: Handshake, title: "Partnership", desc: "Your success is our success." },
  { icon: Lightbulb, title: "Innovation", desc: "Always learning, always improving." },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="We build technology that"
        highlight="moves businesses forward."
        description="Founded in 2025 in Faisalabad, Pakistan — Elevare Tech is a full-service technology partner for businesses that want to grow through modern software."
      >
        <div className="glass-strong mx-auto grid max-w-3xl grid-cols-2 overflow-hidden rounded-2xl sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col-reverse px-5 py-5 ${i > 0 ? "sm:border-l" : ""} ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} border-white/10`}>
              <dt className="mt-1 text-xs text-text-3">{s.label}</dt>
              <dd className="font-display text-2xl font-semibold tracking-tight text-text-1 sm:text-3xl">
                {s.plain ? s.end : <CountUp end={s.end} duration={2} enableScrollSpy scrollSpyOnce />}
                {s.suffix && <span className="text-brand">{s.suffix}</span>}
              </dd>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Story + milestones */}
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div {...reveal}>
            <span className="text-label">Our story</span>
            <h2 className="mt-5">
              <span className="text-silver">Engineers first. Partners always.</span>
            </h2>
            <div className="mt-6 space-y-5 text-lg text-text-2">
              <p>
                Elevare Tech began in Faisalabad in 2025 with a simple idea: businesses deserve software that actually works for the
                people using it — built by engineers they can talk to directly.
              </p>
              <p>
                Since then we&apos;ve shipped 15+ products across web, mobile, AI and data, for clients from Pakistan to the Gulf,
                Europe, North America and Australia.
              </p>
              <p>
                We stay small on purpose. Every project gets senior attention, a fixed price, and a team that cares how it turns out.
              </p>
            </div>
          </motion.div>

          <motion.ol {...reveal} className="glass-strong relative rounded-3xl p-6 sm:p-8">
            <div aria-hidden className="absolute bottom-12 left-[2.35rem] top-12 w-px bg-gradient-to-b from-brand via-indigo to-transparent sm:left-[2.85rem]" />
            {milestones.map((m, i) => (
              <motion.li
                key={m.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-5 py-4"
              >
                <span
                  className={`relative z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                    m.next ? "border-dashed border-text-3 bg-surface" : "border-brand/60 bg-surface shadow-[0_0_14px_rgba(56,189,248,0.6)]"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${m.next ? "bg-text-3" : "bg-brand"}`} />
                </span>
                <div>
                  <p className="font-mono text-xs text-brand">{m.when}</p>
                  <h3 className="mt-1 text-lg text-text-1">{m.title}</h3>
                  <p className="mt-1 text-[15px] text-text-2">{m.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-x grid gap-4 md:grid-cols-2">
          {[
            { icon: Target, label: "Mission", text: "To deliver world-class technology solutions that empower businesses of all sizes to compete in the digital age." },
            { icon: Eye, label: "Vision", text: "A future where every business has access to cutting-edge technology built to their exact needs." },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div key={m.label} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }} className="ring-conic card relative overflow-hidden rounded-3xl p-8 sm:p-10">
                <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/15 blur-3xl" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-deep to-indigo text-white shadow-[0_10px_30px_-8px_rgba(99,102,241,0.8)]">
                  <Icon size={22} />
                </span>
                <p className="mt-8 font-mono text-xs text-brand">{m.label}</p>
                <p className="mt-3 font-display text-2xl font-medium leading-snug tracking-tight text-text-1 sm:text-[1.75rem]">{m.text}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="container-x mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                data-tilt="8"
                className={`tilt card rounded-3xl p-6 ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <Icon size={22} className="text-brand" />
                <h3 className="mt-6 text-lg text-text-1">{v.title}</h3>
                <p className="mt-1 text-sm text-text-2">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Where we work */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-x">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-label">
              <MapPin size={12} /> Where we work
            </span>
            <h2 className="mt-5">
              <span className="text-silver">Built in Pakistan.</span> <span className="text-electric">Used worldwide.</span>
            </h2>
            <p className="mt-4 text-lg text-text-2">Our team works from Faisalabad, with clients across seven countries and four continents.</p>
          </div>
          <motion.div {...reveal} className="glass-strong rounded-3xl px-2 py-8 sm:px-10 sm:py-12">
            <GlobalMap />
          </motion.div>
        </div>
      </section>

      <StatsSection />
      <CTAStrip />
    </>
  );
}
