"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function Timeline() {
  const milestones = [
    { year: "2020", text: "Founded with a vision to make enterprise-grade tech accessible to all businesses" },
    { year: "2021", text: "Delivered first 50 projects across web and mobile" },
    { year: "2022", text: "Launched AI and automation practice" },
    { year: "2023", text: "Expanded to serve clients in 20+ countries" },
    { year: "2024", text: "200+ projects delivered, team of 15+ specialists" },
    { year: "2025", text: "Continuing to grow and innovate" },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      <div className="relative pl-8 border-l border-white/10 space-y-12">
        {milestones.map((milestone, idx) => (
          <motion.div
            key={milestone.year}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[37px] top-1.5 w-3 h-3 bg-[#38BDF8] rounded-full shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
            <h3 className="text-[#38BDF8] font-semibold text-xl mb-2">{milestone.year}</h3>
            <p className="text-slate-400">{milestone.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="card p-12 bg-[#161B24] border border-[#38BDF8]/20 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 to-transparent pointer-events-none" />
        <h3 className="text-2xl text-white font-medium mb-8">Our impact in numbers</h3>
        <ul className="space-y-6">
          <li className="flex items-center gap-4">
            <span className="text-4xl text-[#38BDF8] font-bold">5</span>
            <span className="text-slate-400 font-medium">years of building</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-4xl text-[#38BDF8] font-bold">200+</span>
            <span className="text-slate-400 font-medium">projects</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-4xl text-[#38BDF8] font-bold">15+</span>
            <span className="text-slate-400 font-medium">team members</span>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-4xl text-[#38BDF8] font-bold">30+</span>
            <span className="text-slate-400 font-medium">countries</span>
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
