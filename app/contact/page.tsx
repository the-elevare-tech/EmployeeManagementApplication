"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQ } from "@/components/contact/FAQ";
import { Mail, MapPin, Clock, Phone, Linkedin, Facebook, Zap } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export default function ContactPage() {
  return (
    <>
      <section className="pb-24 max-w-7xl mx-auto px-6 lg:px-12 pt-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger(0, 0.1)}
            className="lg:col-span-5 space-y-10"
          >
            <motion.div variants={fadeUp}>
              <h1 className="text-white mb-4">Get in touch</h1>
              <p className="text-text-2 text-lg">
                Whether you have a project in mind or a question about our services — reach out here. This is the only place to contact us directly.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-brand/10 text-brand text-sm font-medium px-4 py-2 rounded-full border border-brand/20"
            >
              <Zap size={16} /> We typically respond within 24 hours
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-8">
              

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shrink-0 border border-border">
                  <Phone className="text-brand" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Phone</h4>
                  <a href={COMPANY.phoneHref} className="text-text-2 hover:text-brand transition-colors">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shrink-0 border border-border">
                  <MapPin className="text-brand" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Location</h4>
                  <p className="text-text-2">{COMPANY.location} · Serving clients globally</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shrink-0 border border-border">
                  <Clock className="text-brand" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Availability</h4>
                  <p className="text-text-2">{COMPANY.hours}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-6 border-t border-border">
              <h4 className="text-white font-medium mb-4">Socials</h4>
              <div className="flex items-center gap-4">
                <a
                  href={COMPANY.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-2 hover:text-brand transition-all hover:scale-125 border border-border"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={COMPANY.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text-2 hover:text-brand transition-all hover:scale-125 border border-border"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
