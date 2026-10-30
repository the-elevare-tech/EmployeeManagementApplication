"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Code2, Palette, Smartphone, Workflow, BarChart3, Check } from "lucide-react";
import type { ReactNode } from "react";

/* ---------- mini visuals ---------- */

function CodeVisual() {
  const lines: ReactNode[] = [
    <><span className="text-violet">export default</span> <span className="text-brand">async function</span> <span className="text-text-1">Page</span>() {"{"}</>,
    <>&nbsp;&nbsp;<span className="text-violet">const</span> products = <span className="text-violet">await</span> <span className="text-brand">db</span>.product.<span className="text-teal">findMany</span>()</>,
    <>&nbsp;&nbsp;<span className="text-violet">return</span> &lt;<span className="text-teal">Storefront</span> items={"{"}products{"}"} /&gt;</>,
    <>{"}"}</>,
  ];
  return (
    <div className="rounded-xl border border-border bg-ink/70 font-mono text-[11.5px] leading-6 text-text-2 sm:text-xs">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2 text-[11px] text-text-3">
        <span className="h-2 w-2 rounded-full bg-coral/70" />
        <span className="h-2 w-2 rounded-full bg-amber/70" />
        <span className="h-2 w-2 rounded-full bg-green/70" />
        <span className="ml-2">app/page.tsx</span>
      </div>
      <div className="overflow-hidden px-4 py-3">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-4 whitespace-nowrap">
            <span className="w-3 shrink-0 text-right text-text-3/60">{i + 1}</span>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px]">
        <span className="flex items-center gap-1.5 text-green">
          <Check size={12} /> Deployed to production
        </span>
        <span className="text-text-3">Lighthouse 98</span>
      </div>
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="space-y-2.5 text-[13px]">
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-brand-deep to-indigo px-3.5 py-2 text-white">
        Summarise this week&apos;s leads and draft follow-ups
      </div>
      <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-md border border-border bg-surface-2/80 px-3.5 py-2.5 text-text-2">
        <div className="mb-2 flex items-center gap-1.5 font-mono text-[11px] text-brand">
          <Bot size={13} /> agent · 3 tools used
        </div>
        <ul className="space-y-1">
          {["Pulled 42 leads from CRM", "Scored and ranked by intent", "Drafted 12 personalised emails"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check size={13} className="shrink-0 text-green" /> {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-auto w-fit rounded-2xl rounded-br-md bg-gradient-to-br from-brand-deep to-indigo px-3.5 py-2 text-white">
        Looks good, send them
      </div>
      <div className="flex items-center gap-1 pl-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-text-3"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

function DesignVisual() {
  return (
    <div className="flex items-end gap-3">
      <div className="grid flex-1 grid-cols-4 gap-2">
        {["#38BDF8", "#6366F1", "#A78BFA", "#EEF2FF"].map((c) => (
          <div key={c} className="aspect-square rounded-lg ring-1 ring-white/10" style={{ background: c }} />
        ))}
        <div className="col-span-4 mt-1 flex items-center gap-2">
          <div className="h-8 flex-1 rounded-lg bg-gradient-to-r from-brand-deep to-indigo" />
          <div className="h-8 w-16 rounded-lg border border-border-hover" />
        </div>
      </div>
      <div className="font-display text-5xl font-semibold leading-none tracking-tight text-text-1">Aa</div>
    </div>
  );
}

function PhoneVisual() {
  return (
    <div className="mx-auto w-[132px] rounded-[22px] border border-border-hover bg-ink/80 p-2">
      <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/15" />
      <div className="space-y-1.5 rounded-xl bg-surface-2 p-2.5">
        <div className="h-2 w-14 rounded bg-white/30" />
        <div className="h-12 rounded-lg bg-gradient-to-br from-brand/50 to-indigo/50" />
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 rounded-md bg-white/10" />
          ))}
        </div>
        <div className="h-2 w-20 rounded bg-white/15" />
        <div className="h-2 w-16 rounded bg-white/10" />
      </div>
    </div>
  );
}

function FlowVisual() {
  const nodes = ["Orders", "ERP", "Invoices"];
  return (
    <div className="flex items-center justify-between gap-1">
      {nodes.map((n, i) => (
        <div key={n} className="flex flex-1 items-center gap-1">
          <div className="flex-1 rounded-lg border border-border bg-surface-2/80 px-2 py-2 text-center font-mono text-[11px] text-text-2">{n}</div>
          {i < nodes.length - 1 && (
            <div className="relative h-px w-6 overflow-hidden bg-border-hover">
              <motion.span
                className="absolute inset-y-0 w-3 bg-brand"
                animate={{ x: [-12, 24] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ChartVisual() {
  const bars = [38, 52, 44, 68, 60, 82, 74, 96];
  return (
    <div className="flex h-24 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-indigo/40 to-brand"
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ---------- grid ---------- */

const services = [
  {
    id: "web-development",
    title: "Web development",
    desc: "Marketing sites, portals and SaaS platforms on Next.js. Fast, secure and easy for your team to update.",
    icon: Code2,
    visual: <CodeVisual />,
    span: "lg:col-span-2",
  },
  {
    id: "ai-automation",
    title: "AI & automation",
    desc: "Chat assistants, RAG search over your documents, and AI agents that handle repetitive work end to end.",
    icon: Bot,
    visual: <ChatVisual />,
    span: "lg:row-span-2",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX design",
    desc: "Research-led interfaces and design systems, delivered in Figma and ready to build.",
    icon: Palette,
    visual: <DesignVisual />,
    span: "",
  },
  {
    id: "mobile-solutions",
    title: "Mobile apps",
    desc: "Cross-platform iOS and Android apps from one Flutter or React Native codebase.",
    icon: Smartphone,
    visual: <PhoneVisual />,
    span: "",
  },
  {
    id: "custom-development",
    title: "Custom software",
    desc: "ERPs, internal tools and integrations that connect the systems you already use.",
    icon: Workflow,
    visual: <FlowVisual />,
    span: "lg:col-span-2",
  },
  {
    id: "data-analytics",
    title: "Data & dashboards",
    desc: "Pipelines and live dashboards that put sales, stock and operations in one view.",
    icon: BarChart3,
    visual: <ChartVisual />,
    span: "",
  },
];

export function ServicesGrid() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-label">What we build</span>
          <h2 className="mt-5">
            <span className="text-silver">One team for your entire product</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-text-2">
            Design, engineering, AI and support under one roof, so nothing gets lost between agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 auto-rows-auto gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`min-w-0 ${s.span}`}
              >
                <Link href={`/services/${s.id}`} data-tilt="5" className="tilt card group flex h-full flex-col gap-7 overflow-hidden rounded-3xl p-6 sm:p-7">
                  <div className="flex flex-1 flex-col justify-center">{s.visual}</div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white/[0.04] text-brand">
                          <Icon size={18} />
                        </span>
                        <h3 className="text-text-1">{s.title}</h3>
                      </div>
                      <ArrowUpRight size={20} className="text-text-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </div>
                    <p className="mt-3 text-[15px] text-text-2">{s.desc}</p>
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
