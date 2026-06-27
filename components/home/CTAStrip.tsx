"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import Link from "next/link";

export function CTAStrip() {
  return (
    <section className="py-24 relative overflow-hidden bg-brand-dark/10 border-b border-border">
      <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none z-0" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <h2 className="text-white mb-6 text-3xl md:text-5xl">Ready to build something great?</h2>
          <p className="text-text-2 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
            Let's discuss your next project. We offer free technical consultations and fixed-price estimates.
          </p>
          <Link href="/contact" className="btn-primary inline-block px-8 py-4 rounded-full text-white font-semibold text-lg shadow-[0_0_24px_rgba(56,189,248,0.3)]">
            Start your journey →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
