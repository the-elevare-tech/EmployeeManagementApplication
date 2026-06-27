"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

export function StatsSection() {
  const stats = [
    { label: "Founded", value: 2025, prefix: "Est. ", suffix: "" },
    { label: "Projects Delivered", value: 15, prefix: "", suffix: "+" },
    { label: "Client Satisfaction", value: 100, prefix: "", suffix: "%" },
    { label: "Response Time", value: 24, prefix: "<", suffix: "h" },
  ];

  return (
    <section className="py-20 border-y border-border bg-surface-2/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 flex justify-center items-baseline">
                {stat.prefix && <span className="text-2xl md:text-3xl text-brand mr-1">{stat.prefix}</span>}
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                  useEasing
                />
                {stat.suffix && <span className="text-brand ml-1">{stat.suffix}</span>}
              </div>
              <p className="text-text-2 text-sm md:text-base font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
