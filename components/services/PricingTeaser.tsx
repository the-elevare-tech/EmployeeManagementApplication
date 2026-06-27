"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PricingTeaser() {
  const models = [
    { title: "Project-based", desc: "Best for defined scope work" },
    { title: "Retainer", desc: "Best for ongoing development" },
    { title: "Dedicated team", desc: "Best for scaling fast" },
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
            Transparent, flexible pricing
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We offer fixed-price projects, monthly retainers, and dedicated team models. No surprise invoices.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {models.map((model, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-8 bg-[#0F1117] border border-white/5 rounded-2xl hover:border-[#38BDF8]/30 transition-colors group"
            >
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">{model.title}</h3>
              <p className="text-slate-400">{model.desc}</p>
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
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 text-white font-medium hover:text-[#38BDF8] transition-colors group text-lg"
          >
            Get a free estimate
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
