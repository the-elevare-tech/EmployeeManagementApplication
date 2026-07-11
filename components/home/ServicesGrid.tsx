"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { Code2, Palette, Bot, Wrench, BarChart3, Smartphone } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "web-development",
    title: "Web Development",
    desc: "Fast, secure, and scalable web applications — from marketing sites to complex SaaS platforms.",
    icon: Code2,
    color: "#38BDF8", // brand
    tags: ["Next.js", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    desc: "Interfaces grounded in user research and conversion psychology. Design that looks great and actually works.",
    icon: Palette,
    color: "#A78BFA", // purple
    tags: ["Figma", "Design Systems"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    desc: "Intelligent systems that automate workflows, develop AI agents, and reduce manual effort.",
    icon: Bot,
    color: "#2DD4BF", // teal
    tags: ["AI Agents", "Python", "LLMs", "n8n"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "custom-development",
    title: "Custom Development",
    desc: "Bespoke software engineered from the ground up — ERPs, internal tools, marketplaces, and more.",
    icon: Wrench,
    color: "#FCD34D", // amber
    tags: ["Python", "Django", "React"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    desc: "Turn raw data into decisions. We build dashboards and pipelines that surface what actually matters.",
    icon: BarChart3,
    color: "#34D399", // green
    tags: ["Metabase", "Power BI", "SQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mobile-solutions",
    title: "Mobile Solutions",
    desc: "High-performance native and cross-platform apps for iOS and Android — built to scale.",
    icon: Smartphone,
    color: "#FB7185", // coral
    tags: ["Flutter", "React Native"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
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
                <Link href={`/services#${service.id}`} className="card block rounded-xl overflow-hidden border border-white/8 bg-surface relative h-full flex flex-col group scroll-smooth">
                  <div
                    className="h-28 flex items-center justify-center relative overflow-hidden bg-[#0F1117]"
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
