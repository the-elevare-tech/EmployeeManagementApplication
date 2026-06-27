"use client";

import { motion } from "framer-motion";
import { slideLeft, stagger, fadeUp } from "@/lib/animations";

export function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Strategy",
      desc: "We dive deep into your business needs, analyze the market, and define clear technical requirements.",
    },
    {
      num: "02",
      title: "Design & Prototyping",
      desc: "Creating high-fidelity wireframes and interactive prototypes to align on the user experience before writing code.",
    },
    {
      num: "03",
      title: "Agile Development",
      desc: "Building your product in transparent, iterative sprints with regular updates and continuous testing.",
    },
    {
      num: "04",
      title: "Launch & Scale",
      desc: "Deploying to production with comprehensive documentation and providing 30 days of post-launch support.",
    },
  ];

  return (
    <section className="py-24 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row gap-16">
        {/* Left side content */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="lg:w-1/3 shrink-0"
        >
          <div className="inline-block px-3 py-1.5 rounded-full border border-brand/20 bg-brand/5 text-brand text-xs font-medium mb-6">
            How we work
          </div>
          <h2 className="text-white mb-6">A proven process for reliable delivery</h2>
          <p className="text-text-2 mb-8">
            We don&apos;t just write code. We partner with you from ideation to deployment, ensuring every technical decision aligns with your business goals.
          </p>
        </motion.div>

        {/* Right side steps */}
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="lg:w-2/3 flex flex-col gap-8 relative"
        >
          {/* Vertical connection line */}
          <div className="absolute top-0 bottom-0 left-[24px] md:left-[32px] w-[1px] bg-border hidden sm:block" />

          {steps.map((step, i) => (
            <motion.div key={i} variants={slideLeft} className="relative flex items-start gap-6 group">
              {/* Number Bubble */}
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-surface-2 border border-border flex items-center justify-center shrink-0 z-10 transition-colors group-hover:bg-brand/10 group-hover:border-brand/30 group-hover:text-brand text-text-3 font-semibold text-lg md:text-xl">
                {step.num}
              </div>
              
              {/* Step Content */}
              <div className="pt-2 md:pt-4">
                <h3 className="text-white text-lg md:text-xl mb-3">{step.title}</h3>
                <p className="text-text-2 text-sm md:text-base">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
