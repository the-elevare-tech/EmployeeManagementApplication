"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { ArrowRight, Code2, Palette, Bot, Wrench, BarChart3, Smartphone, LucideIcon } from "lucide-react";
import Link from "next/link";

interface Service {
  title: string;
  desc: string;
  features: string[];
  tech: string[];
  icon: LucideIcon;
  color: string;
}

const services: Service[] = [
  {
    title: "Web Development",
    desc: "Fast, secure, and scalable web applications — from marketing sites to complex SaaS platforms.",
    features: ["Custom CMS", "SEO architecture", "PWA support", "Performance optimization"],
    tech: ["Next.js", "React", "Node.js", "PostgreSQL"],
    icon: Code2,
    color: "#38BDF8",
  },
  {
    title: "UI/UX Design",
    desc: "Interfaces grounded in user research and conversion psychology.",
    features: ["User research", "Wireframing", "Prototyping", "Design systems"],
    tech: ["Figma", "Framer", "Adobe XD"],
    icon: Palette,
    color: "#A78BFA",
  },
  {
    title: "AI & Automation",
    desc: "Intelligent systems that automate workflows and reduce manual effort.",
    features: ["LLM integration", "Chatbots", "n8n pipelines", "RAG systems"],
    tech: ["Python", "FastAPI", "LangChain", "n8n"],
    icon: Bot,
    color: "#2DD4BF",
  },
  {
    title: "Custom Development",
    desc: "Bespoke software — ERPs, internal tools, marketplaces, and more.",
    features: ["Requirements analysis", "Agile sprints", "Documentation", "Handoff support"],
    tech: ["Python", "Django", "React", "PostgreSQL"],
    icon: Wrench,
    color: "#FCD34D",
  },
  {
    title: "Data Analytics",
    desc: "Dashboards and pipelines that surface what actually matters.",
    features: ["ETL pipelines", "Interactive dashboards", "KPI tracking", "Predictive analytics"],
    tech: ["Python", "Metabase", "Power BI", "SQL"],
    icon: BarChart3,
    color: "#34D399",
  },
  {
    title: "Mobile Solutions",
    desc: "High-performance native and cross-platform apps for iOS and Android.",
    features: ["Flutter cross-platform", "Push notifications", "App Store deployment", "Offline support"],
    tech: ["Flutter", "React Native", "Firebase"],
    icon: Smartphone,
    color: "#FB7185",
  },
];

export function ServiceCards() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6 lg:px-12">
      <motion.div
        variants={stagger(0, 0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card group rounded-xl overflow-hidden border border-white/8 bg-surface"
            >
              <div
                className="h-24 flex items-center gap-4 px-5 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${service.color}18 0%, #0F1117 100%)` }}
              >
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 relative z-10 transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-3"
                  style={{ background: `${service.color}22`, border: `1px solid ${service.color}44` }}
                >
                  <Icon size={22} style={{ color: service.color }} />
                </div>
                <h2 className="text-lg font-semibold text-white relative z-10">{service.title}</h2>
              </div>

              <div className="p-5 pt-4">
                <p className="text-sm text-text-2 leading-relaxed mb-4">{service.desc}</p>

                <ul className="grid grid-cols-2 gap-1.5 mb-4">
                  {service.features.map((f) => (
                    <li key={f} className="text-xs text-text-2 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: service.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.tech.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-surface-2 text-text-2">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors group/link"
                  style={{ color: service.color }}
                >
                  Discuss your project
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
