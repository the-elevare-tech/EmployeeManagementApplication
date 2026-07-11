"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { ArrowRight, Code2, Palette, Bot, Wrench, BarChart3, Smartphone, LucideIcon } from "lucide-react";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  desc: string;
  features: string[];
  tech: string[];
  icon: LucideIcon;
  color: string;
  image?: string;
}

const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    desc: "Fast, secure, and scalable web applications — from marketing sites to complex SaaS platforms.",
    features: ["Custom CMS", "SEO architecture", "PWA support", "Performance optimization"],
    tech: ["Next.js", "React", "Node.js", "PostgreSQL"],
    icon: Code2,
    color: "#38BDF8",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    desc: "Interfaces grounded in user research and conversion psychology.",
    features: ["User research", "Wireframing", "Prototyping", "Design systems"],
    tech: ["Figma", "Framer", "Adobe XD"],
    icon: Palette,
    color: "#A78BFA",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    desc: "Intelligent systems that automate workflows, develop AI agents, and reduce manual effort.",
    features: ["Custom AI Agents", "LLM integration", "n8n pipelines", "RAG systems"],
    tech: ["Python", "FastAPI", "LangChain", "n8n"],
    icon: Bot,
    color: "#2DD4BF",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "custom-development",
    title: "Custom Development",
    desc: "Bespoke software — ERPs, internal tools, marketplaces, and more.",
    features: ["Requirements analysis", "Agile sprints", "Documentation", "Handoff support"],
    tech: ["Python", "Django", "React", "PostgreSQL"],
    icon: Wrench,
    color: "#FCD34D",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    desc: "Dashboards and pipelines that surface what actually matters.",
    features: ["ETL pipelines", "Interactive dashboards", "KPI tracking", "Predictive analytics"],
    tech: ["Python", "Metabase", "Power BI", "SQL"],
    icon: BarChart3,
    color: "#34D399",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "mobile-solutions",
    title: "Mobile Solutions",
    desc: "High-performance native and cross-platform apps for iOS and Android.",
    features: ["Flutter cross-platform", "Push notifications", "App Store deployment", "Offline support"],
    tech: ["Flutter", "React Native", "Firebase"],
    icon: Smartphone,
    color: "#FB7185",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  },
];

export function ServiceCards() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    // Only run on client-side
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setHighlightedId(hash);
      const timer = setTimeout(() => {
        setHighlightedId(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

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
          const isHighlighted = highlightedId === service.id;

          return (
            <motion.div
              key={service.id}
              id={service.id}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="card group rounded-xl overflow-hidden border border-white/8 bg-surface relative scroll-mt-24"
            >
              <AnimatePresence>
                {isHighlighted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-20 pointer-events-none rounded-xl border-2 border-[#38BDF8]"
                    style={{ boxShadow: "0 0 25px rgba(56, 189, 248, 0.35) inset, 0 0 25px rgba(56, 189, 248, 0.35)" }}
                  />
                )}
              </AnimatePresence>

              <div
                className="h-24 flex items-center gap-4 px-5 relative overflow-hidden bg-[#0F1117]"
              >
                {/* Background Image Layer */}
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.95] mix-blend-overlay group-hover:opacity-[1] transition-all duration-700 group-hover:scale-105"
                  />
                )}

                {/* Color overlay gradient */}
                <div
                  className="absolute inset-0 opacity-80"
                  style={{ background: `linear-gradient(135deg, ${service.color}30 0%, #0F1117 100%)` }}
                />

                {/* Subtle radial grid */}
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
