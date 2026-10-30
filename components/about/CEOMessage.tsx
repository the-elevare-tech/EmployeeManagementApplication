"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Quote } from "lucide-react";

export function CEOMessage() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="border-l-2 border-brand pl-8 md:pl-12 py-4 relative"
        >
          <Quote className="text-brand w-12 h-12 absolute -top-4 -left-6 bg-bg px-2 opacity-50" />
          <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed font-light mb-8">
            "At Elevare Tech, we believe that technology should work for people, not the other way around. Every project we take on is a chance to make someone's business more efficient, more scalable, and more impactful. We're not just a vendor; we're a long-term partner in your growth."
          </p>
          
          <div className="flex items-center gap-4 mt-8">
            <div className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-white font-medium text-lg shrink-0">
              FN
            </div>
            <div>
              <h4 className="text-white font-medium text-lg">Founder Name</h4>
              <p className="text-brand text-sm">Founder and CEO, Elevare Tech</p>
              <p className="text-text-3 text-xs mt-1">Est. 2020 · Faisalabad, Pakistan</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
