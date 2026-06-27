"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/section-tag";

export function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      description: "We dive deep into your business goals, target audience, and technical requirements to define a clear roadmap.",
    },
    {
      num: "02",
      title: "Design",
      description: "Our designers craft intuitive, stunning user interfaces that align perfectly with your brand identity.",
    },
    {
      num: "03",
      title: "Build",
      description: "Our engineers develop robust, scalable solutions using the latest technologies and best practices.",
    },
    {
      num: "04",
      title: "Launch and scale",
      description: "We deploy your product flawlessly and provide ongoing support to ensure it scales with your business.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="mb-16 md:text-center">
        <SectionTag>How we work</SectionTag>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white">
          A proven process for success
        </h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {steps.map((step, index) => (
          <motion.div key={index} variants={stepVariants} className="relative">
            {/* Connecting Line for Desktop */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-6 left-16 right-0 h-[1px] bg-white/10" />
            )}
            
            <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] font-semibold text-lg relative z-10 border border-[#38BDF8]/20">
              {step.num}
            </div>
            <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">{step.title}</h3>
            <p className="text-slate-400 leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
