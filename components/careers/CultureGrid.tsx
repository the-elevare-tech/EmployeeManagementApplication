"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Globe, BookOpen, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";

export function CultureGrid() {
  const cultures = [
    {
      title: "Remote-first",
      desc: "Work from anywhere in Pakistan. We care about output, not hours.",
      icon: Globe
    },
    {
      title: "Learning budget",
      desc: "Every team member gets a personal learning budget for courses and tools.",
      icon: BookOpen
    },
    {
      title: "Real ownership",
      desc: "You'll own your work end-to-end — from scoping to deployment.",
      icon: Rocket
    },
    {
      title: "Fast growth",
      desc: "Small team means big impact. Your work matters from day one.",
      icon: TrendingUp
    }
  ];

  const perks = ["Competitive salary", "Flexible hours", "Remote work", "Learning budget", "Annual bonus", "Project ownership"];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
          Life at Elevare Tech
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          We work hard, move fast, and take care of each other.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-2 gap-6 mb-16"
      >
        {cultures.map((culture, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="p-8 bg-[#161B24] border border-white/5 rounded-2xl flex items-start gap-6 card-hover"
          >
            <div className="w-12 h-12 rounded-xl bg-[#38BDF8]/10 flex items-center justify-center shrink-0">
              <culture.icon className="text-[#38BDF8] w-6 h-6 icon" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{culture.title}</h3>
              <p className="text-slate-400">{culture.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center"
      >
        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-6">Perks & Benefits</p>
        <div className="flex flex-wrap justify-center gap-3">
          {perks.map((perk, i) => (
            <div key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 text-slate-300 text-sm font-medium">
              <CheckCircle2 size={14} className="text-[#38BDF8]" />
              {perk}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
