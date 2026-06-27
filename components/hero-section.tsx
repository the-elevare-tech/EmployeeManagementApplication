"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Generate random particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${6 + Math.random() * 4}s`,
    animationDelay: `${Math.random() * 2}s`,
  }));

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Subtle animated grid background */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.04] pointer-events-none" />

      {/* Radial blue glow behind heading */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 800px 400px at 50% 30%, rgba(56,189,248,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-[#38BDF8] rounded-full opacity-0 pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            animation: `float ${p.animationDuration} ease-in-out infinite`,
            animationDelay: p.animationDelay,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex-grow flex flex-col justify-center">
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <Badge variant="eyebrow">✦ AI and automation — now live</Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-semibold tracking-[-0.04em] text-white leading-[1.1] mb-8"
          >
            Technology that <span className="text-[#38BDF8]">elevates</span> your business
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10 h-[60px]"
          >
            {mounted && (
              <TypeAnimation
                sequence={[
                  "We turn complex digital challenges into scalable solutions.",
                  2000,
                  "We build intelligent systems that learn and adapt.",
                  2000,
                  "We engineer bespoke solutions for ambitious businesses.",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="btn-primary rounded-full px-8 h-12 text-base font-medium border-0 before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-r before:from-transparent before:via-[#38BDF8] before:to-transparent before:animate-shimmer before:opacity-30 before:rounded-full">
              Start your journey
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-white/10 hover:bg-white/5 transition-colors">
              See our work <span className="ml-2">→</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce-slow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
}
