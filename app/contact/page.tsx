"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageCircle, Linkedin, Facebook, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { WorkingHours } from "@/components/contact/WorkingHours";
import { FAQ } from "@/components/contact/FAQ";
import { COMPANY, CONTACT } from "@/lib/constants";

const ease = [0.22, 1, 0.36, 1] as const;

const channels = [
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, external: false, wide: true },
  { icon: MessageCircle, label: "WhatsApp", value: COMPANY.phone, href: CONTACT.whatsapp, external: true },
  { icon: Phone, label: "Phone", value: COMPANY.phone, href: COMPANY.phoneHref, external: false },
  { icon: MapPin, label: "Office", value: "Faisalabad, Pakistan · serving clients worldwide", href: undefined, external: false, wide: true },
];

const nextSteps = [
  { title: "We read your brief", desc: "An engineer reviews it, not a sales bot." },
  { title: "Reply within 24 hours", desc: "With questions or a time for a free call." },
  { title: "Proposal in 2-3 days", desc: "Fixed scope, timeline and price." },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative -mt-16 overflow-hidden pt-36 pb-24 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="aurora-drift absolute left-[5%] top-[10%] h-[380px] w-[380px] rounded-full bg-brand/15 blur-[110px]" />
          <div className="aurora-drift-2 absolute right-[5%] top-[30%] h-[420px] w-[420px] rounded-full bg-indigo/20 blur-[120px]" />
        </div>

        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="order-2 min-w-0 space-y-8 lg:order-none lg:col-span-5"
          >
            <div className="hidden lg:block">
              <span className="text-label">
                <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#38BDF8]" /> Contact
              </span>
              <h1 className="mt-5 text-[clamp(2.4rem,4.6vw,3.75rem)]">
                <span className="text-silver">Let&apos;s build</span>
                <br />
                <span className="text-electric">something great.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-text-2">
                Tell us about your project, or ask a question. You&apos;ll hear back from an engineer, not a salesperson.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {channels.map((c) => {
                const Icon = c.icon;
                const inner = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-brand/15 to-indigo/15 text-brand">
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-text-3">{c.label}</span>
                      <span className="block break-words text-sm text-text-1">{c.value}</span>
                    </span>
                    {c.href && <ArrowUpRight size={15} className="shrink-0 text-text-3 transition-colors group-hover:text-brand" />}
                  </>
                );
                const cls = `card group flex items-center gap-3 rounded-2xl p-3.5 ${"wide" in c && c.wide ? "sm:col-span-2" : ""}`;
                return c.href ? (
                  <a key={c.label} href={c.href} className={cls} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </div>

            <WorkingHours />

            <div className="glass-strong rounded-2xl p-5">
              <p className="font-medium text-text-1">What happens next</p>
              <ol className="mt-4 space-y-4">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/10 font-mono text-[11px] text-brand">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm text-text-1">{s.title}</p>
                      <p className="text-sm text-text-3">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-text-3">Follow us</span>
              {[
                { icon: Linkedin, href: COMPANY.linkedin, label: "LinkedIn" },
                { icon: Facebook, href: COMPANY.facebook, label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Elevare Tech on ${label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-text-2 transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="order-1 min-w-0 lg:order-none lg:col-span-7"
          >
            <div className="lg:sticky lg:top-24">
            <div className="mb-8 lg:hidden">
              <span className="text-label">
                <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_#38BDF8]" /> Contact
              </span>
              <h1 className="mt-5 text-[clamp(2.4rem,4.6vw,3.75rem)]">
                <span className="text-silver">Let&apos;s build</span>
                <br />
                <span className="text-electric">something great.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-text-2">
                Tell us about your project, or ask a question. You&apos;ll hear back from an engineer, not a salesperson.
              </p>
            </div>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
