"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function ResultsStrip() {
  return (
    <section className="py-16 border-t border-border bg-surface-2/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="relative pl-6 border-l-2 border-brand py-4"
        >
          <p className="text-white text-lg md:text-xl font-medium">
            In our first year: 15+ projects delivered · 100% client satisfaction · Clients across 5+ countries
          </p>
        </motion.div>
      </div>
    </section>
  );
}
