"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Target, Eye, Heart } from "lucide-react";

export function MissionVision() {
  const cards = [
    {
      icon: Target,
      title: "Mission",
      text: "To deliver world-class technology solutions that empower businesses of all sizes to compete and grow in the digital age.",
    },
    {
      icon: Eye,
      title: "Vision",
      text: "A world where every business, regardless of size, has access to cutting-edge technology built to their exact needs.",
    },
    {
      icon: Heart,
      title: "Values",
      text: "Transparency · Quality · Speed · Partnership · Innovation",
    },
  ];

  return (
    <section className="py-24 bg-surface/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {cards.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="card p-8 bg-bg border border-border rounded-2xl card-hover text-center"
            >
              <div className="w-12 h-12 mx-auto bg-brand/10 rounded-full flex items-center justify-center mb-6">
                <item.icon className="text-brand w-6 h-6 icon" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
              <p className="text-text-2 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
