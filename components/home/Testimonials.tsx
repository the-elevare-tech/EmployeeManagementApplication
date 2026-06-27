"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";

export function Testimonials() {
  const testimonials = [
    {
      quote: "The team delivered our e-commerce platform ahead of schedule. Communication was excellent and the final product exceeded expectations.",
      author: "A.K.",
      role: "E-commerce business owner",
      country: "Pakistan"
    },
    {
      quote: "Their AI automation solution streamlined our entire operations workflow. Highly professional team.",
      author: "S.M.",
      role: "Operations Manager",
      country: "UAE"
    },
    {
      quote: "Clean design, fast delivery, great support post-launch. Would definitely work with them again.",
      author: "U.T.",
      role: "Tech Startup Founder",
      country: "UK"
    }
  ];

  return (
    <section className="py-24 bg-surface-2/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-white mb-4">Client feedback</h2>
          <p className="text-text-2">What our partners have to say about working with us.</p>
        </motion.div>

        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div key={i} variants={fadeUp} className="card bg-surface border border-border rounded-xl p-8 flex flex-col">
              <div className="text-brand text-4xl font-serif mb-4 leading-none">"</div>
              <p className="text-text-1 text-sm leading-relaxed mb-8 flex-grow">
                {testimonial.quote}
              </p>
              <div className="mt-auto border-t border-border pt-4">
                <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                <p className="text-text-3 text-xs uppercase tracking-wider font-medium mt-1">
                  {testimonial.role} <span className="mx-1">•</span> {testimonial.country}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
