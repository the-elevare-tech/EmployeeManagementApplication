"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, slideLeft, scaleIn } from "@/lib/animations";
import { FEATURES } from "@/lib/constants";
import { CTAStrip } from "@/components/home/CTAStrip";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const timeline = [
    { year: "2025", desc: "Founded with a mission to deliver world-class tech solutions" },
    { year: "2025", desc: "First 15+ projects delivered across web, mobile, and AI" },
    { year: "2025", desc: "Serving clients in Pakistan and internationally" },
  ];

  const values = [
    { title: "Quality", desc: "We don't ship until it's right" },
    { title: "Transparency", desc: "No hidden costs, no surprises" },
    { title: "Speed", desc: "We move fast without cutting corners" },
    { title: "Partnership", desc: "Your success is our success" },
    { title: "Innovation", desc: "Always learning, always improving" },
  ];

  const whyUs = [
    "Fixed-price projects — know your cost upfront",
    "Delivered on time — every time",
    "Post-launch support included (30 days)",
    "Direct communication — no account managers in the way",
    "Modern tech stack — no outdated tools",
    "Small team, big commitment — you're never just a ticket number",
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <motion.div initial="hidden" animate="show" variants={stagger(0, 0.1)}>
          <motion.div variants={fadeUp} className="inline-block px-3 py-1 rounded-full border border-brand/20 bg-brand/5 text-brand text-xs font-medium mb-6">
            About us
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-white mb-6 max-w-4xl mx-auto">
            We build technology that moves businesses forward
          </motion.h1>
          <motion.p variants={fadeUp} className="text-text-2 text-lg md:text-xl max-w-3xl mx-auto">
            Founded in 2025 in Faisalabad, Pakistan — Elevare Tech is a full-service technology partner for businesses that want to grow through modern technology.
          </motion.p>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-surface-2/20 border-y border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-white mb-12 text-center"
          >
            Our story
          </motion.h2>

          <div className="relative border-l border-brand/30 ml-4 md:ml-1/2 space-y-12 pb-8">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={slideLeft}
                className="relative pl-8 md:pl-12"
              >
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-surface border-2 border-brand" />
                <h3 className="text-brand text-xl md:text-2xl font-bold mb-2">{item.year}</h3>
                <p className="text-text-1 text-base md:text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional CEO Message */}
      {FEATURES.SHOW_CEO_MESSAGE && (
        <section className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/8 bg-surface p-8 md:p-10 my-16"
          >
            <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full bg-brand" />
            <div className="text-6xl text-brand/20 font-serif leading-none mb-4">&ldquo;</div>
            <p className="text-lg text-white/80 leading-relaxed italic mb-6 max-w-2xl">
              At Elevare Tech, we believe great technology should be accessible to every business —
              not just enterprises. Every project we take on is a commitment to quality, transparency,
              and long-term partnership. We started in 2025 with a simple idea: build things that
              actually work for the people using them.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-semibold text-sm">
                ET
              </div>
              <div>
                <p className="text-white font-medium text-sm">[Founder Name]</p>
                <p className="text-slate-400 text-xs">Founder & CEO, Elevare Tech · Faisalabad, 2025</p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Mission / Vision / Values */}
      <section className="py-24 bg-bg border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h3 className="text-brand text-sm uppercase tracking-widest font-semibold mb-4">Mission</h3>
              <p className="text-white text-xl md:text-2xl leading-relaxed">
                To deliver world-class technology solutions that empower businesses of all sizes to compete in the digital age.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
              <h3 className="text-brand text-sm uppercase tracking-widest font-semibold mb-4">Vision</h3>
              <p className="text-white text-xl md:text-2xl leading-relaxed">
                A future where every business has access to cutting-edge technology built to their exact needs.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger(0, 0.1)}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {values.map((val, i) => (
              <motion.div key={i} variants={fadeUp} className="card bg-surface p-6 rounded-xl border border-border flex flex-col items-center text-center">
                <h4 className="text-white mb-2">{val.title}</h4>
                <p className="text-text-2 text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-white">Why choose us</h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger(0, 0.1)}
            className="grid md:grid-cols-2 gap-x-12 gap-y-6"
          >
            {whyUs.map((reason, i) => (
              <motion.div key={i} variants={slideLeft} className="flex items-start gap-4">
                <CheckCircle2 className="text-brand shrink-0 mt-1" size={20} />
                <span className="text-text-1 text-lg">{reason}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Optional Team Section */}
      {FEATURES.SHOW_TEAM_SECTION && (
        <section className="py-24 bg-surface-2/20 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-white mb-12">
              Meet the team
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger(0, 0.1)}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {["Founder & CEO", "Lead Developer", "UI/UX Designer", "AI Engineer"].map((role, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-surface border border-border flex items-center justify-center text-text-2 font-semibold text-2xl mb-4">
                    {role.split(" ").map(w => w[0]).join("").substring(0,2)}
                  </div>
                  <h4 className="text-white mb-1">Team Member</h4>
                  <p className="text-brand text-xs uppercase tracking-widest">{role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <CTAStrip />
    </>
  );
}
