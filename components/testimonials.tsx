"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Testimonials() {
  const testimonials = [
    {
      quote: "Elevare Tech transformed our entire digital infrastructure in just 3 months. The team's technical depth and communication were exceptional.",
      name: "Ahmed K.",
      role: "CEO, RetailPro",
      initials: "AK"
    },
    {
      quote: "Their AI automation solution cut our manual processing time by 70%. I'd recommend them to any business serious about scaling.",
      name: "Sarah M.",
      role: "Operations Director, LogiFlow",
      initials: "SM"
    },
    {
      quote: "From design to deployment, the process was seamless. Our new platform looks world-class and performs even better.",
      name: "Usman T.",
      role: "Founder, EdTech Startup",
      initials: "UT"
    }
  ];

  return (
    <section className="py-24 bg-[#0F1117] relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-[-0.02em]">
            What our clients say
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what the people we work with have to say.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="card p-8 bg-[#161B24] border border-white/5 rounded-2xl card-hover flex flex-col h-full relative"
            >
              <div className="text-[#38BDF8] text-4xl font-serif mb-4 leading-none opacity-50">"</div>
              <p className="text-slate-300 mb-8 flex-grow leading-relaxed">
                {t.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1E2530] border border-white/10 flex items-center justify-center text-[#38BDF8] font-medium shrink-0">
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-white font-medium">{t.name}</h4>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
