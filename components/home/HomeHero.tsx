"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import Link from "next/link";

export function HomeHero() {
  const headingWords = "Technology that elevates your business".split(" ");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 lg:px-12 pt-20">
      {/* Background dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.035] pointer-events-none" />
      
      {/* Radial blue glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[50px] w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.09),transparent_70%)] pointer-events-none z-0" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.15 + Math.random() * 0.15,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand/20 bg-brand/5 text-brand text-xs font-medium mb-8"
        >
          <span className="animate-pulse">✦</span> AI and Automation — Now Live
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={stagger(0.2, 0.1)}
          initial="hidden"
          animate="show"
          className="text-white mb-6 flex flex-wrap justify-center gap-x-3 gap-y-2"
        >
          {headingWords.map((word, i) => (
            <motion.span
              key={i}
              variants={fadeUp}
              className={word === "elevates" ? "text-brand" : ""}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.4 }}
          className="text-text-2 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          We turn complex digital challenges into scalable, secure, and intelligent solutions — web, mobile, AI, and everything in between.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-full text-white font-medium">
            Start your journey →
          </Link>
          <Link href="/projects" className="w-full sm:w-auto px-8 py-3.5 rounded-full text-white font-medium border border-border hover:border-brand/50 hover:bg-brand/5 transition-colors">
            See our work
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 animate-bounce-slow"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
