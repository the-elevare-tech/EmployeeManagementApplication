"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { Code2, Palette, Bot, Wrench, BarChart3, Smartphone } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Web Development",
    desc: "Fast, secure, and scalable web applications — from marketing sites to complex SaaS platforms.",
    icon: Code2,
    color: "#38BDF8", // brand
    tags: ["Next.js", "React", "Node.js"]
  },
  {
    title: "UI/UX Design",
    desc: "Interfaces grounded in user research and conversion psychology. Design that looks great and actually works.",
    icon: Palette,
    color: "#A78BFA", // purple
    tags: ["Figma", "Design Systems"]
  },
  {
    title: "AI & Automation",
    desc: "Intelligent systems that automate workflows, generate insights, and reduce manual effort.",
    icon: Bot,
    color: "#2DD4BF", // teal
    tags: ["Python", "LLMs", "n8n"]
  },
  {
    title: "Custom Development",
    desc: "Bespoke software engineered from the ground up — ERPs, internal tools, marketplaces, and more.",
    icon: Wrench,
    color: "#FCD34D", // amber
    tags: ["Python", "Django", "React"]
  },
  {
    title: "Data Analytics",
    desc: "Turn raw data into decisions. We build dashboards and pipelines that surface what actually matters.",
    icon: BarChart3,
    color: "#34D399", // green
    tags: ["Metabase", "Power BI", "SQL"]
  },
  {
    title: "Mobile Solutions",
    desc: "High-performance native and cross-platform apps for iOS and Android — built to scale.",
    icon: Smartphone,
    color: "#FB7185", // coral
    tags: ["Flutter", "React Native"]
  }
];

export function ServicesGrid() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-white mb-4">End-to-end technology services</h2>
          <p className="text-text-2">We build and scale full-stack products. Everything you need to go from idea to deployment, under one roof.</p>
        </motion.div>

        <motion.div
          variants={stagger(0, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div key={i} variants={fadeUp}>
                <Link href="/services" className="card block rounded-xl overflow-hidden border border-white/8 bg-surface relative h-full flex flex-col group">
                  <div
                    className="h-28 flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${service.color}14 0%, #0F1117 100%)` }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <Icon
                      size={40}
                      style={{ color: service.color }}
                      className="relative z-10 group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-medium text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">{service.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded bg-surface-2 text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-sm text-brand group-hover:underline">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
