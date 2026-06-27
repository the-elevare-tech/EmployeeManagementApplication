"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function FAQ() {
  const faqs = [
    {
      q: "How quickly can you start on a project?",
      a: "Typically within 1–2 weeks of finalizing the scope and agreement."
    },
    {
      q: "Do you work with international clients?",
      a: "Yes — we serve clients globally and are comfortable with remote collaboration across time zones."
    },
    {
      q: "What's your typical project timeline?",
      a: "Small projects: 2–4 weeks. Medium: 1–3 months. Large/enterprise: 3–6 months. We'll give you a clear timeline before starting."
    },
    {
      q: "Do you offer post-launch support?",
      a: "Every project includes 30 days of post-launch support at no extra cost. Ongoing retainers available."
    },
    {
      q: "How do you handle project pricing?",
      a: "We offer fixed-price, milestone-based billing. You'll know the full cost upfront — no surprises."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Common questions
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="bg-[#161B24] border border-white/5 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-slate-200">{faq.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-[#38BDF8]" : ""}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
