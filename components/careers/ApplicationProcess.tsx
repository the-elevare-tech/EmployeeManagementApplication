"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { FileText, MessageSquare, Briefcase } from "lucide-react";

export function ApplicationProcess() {
  const steps = [
    {
      icon: FileText,
      title: "1. Apply",
      desc: "Send your CV and a short note about yourself."
    },
    {
      icon: MessageSquare,
      title: "2. Interview",
      desc: "2 rounds: cultural fit + technical assessment."
    },
    {
      icon: Briefcase,
      title: "3. Offer",
      desc: "We move fast. Expect a decision within 7 days."
    }
  ];

  return (
    <section className="py-24 bg-[#161B24]/50 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Application process
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center relative z-10"
            >
              <div className="w-16 h-16 mx-auto bg-[#0F1117] border border-[#38BDF8]/30 rounded-full flex items-center justify-center mb-6 text-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                <step.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
