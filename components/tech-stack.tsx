"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function TechStack() {
  const row1 = ["React", "Next.js", "Node.js", "Python", "TypeScript", "PostgreSQL", "MongoDB"];
  const row2 = ["AWS", "Docker", "Kubernetes", "Figma", "TailwindCSS", "FastAPI", "Flutter"];

  const generateLogos = (items: string[], reverse = false) => (
    <div className={`flex gap-6 md:gap-12 py-4 whitespace-nowrap animate-marquee ${reverse ? '[animation-direction:reverse]' : ''}`}>
      {[...items, ...items, ...items].map((item, i) => (
        <div 
          key={`${item}-${i}`}
          className="flex items-center justify-center px-6 py-4 bg-[#161B24] border border-white/5 rounded-xl hover:border-[#38BDF8]/30 transition-all group shrink-0"
        >
          <span className="text-slate-400 group-hover:text-white font-medium grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all text-lg">
            {item}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-[#0F1117] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-[-0.02em]">
            Built with the best tools
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We work with modern, battle-tested technologies to ensure your product is fast, scalable, and future-proof.
          </p>
        </motion.div>
      </div>

      <div className="relative flex flex-col gap-6 mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)">
        <div className="flex relative overflow-hidden w-full">
          {generateLogos(row1)}
        </div>
        <div className="flex relative overflow-hidden w-full">
          {generateLogos(row2, true)}
        </div>
      </div>
    </section>
  );
}
