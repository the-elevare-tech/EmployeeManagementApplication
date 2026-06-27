"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { CTAStrip } from "@/components/home/CTAStrip";
import { TechMarquee } from "@/components/home/TechMarquee";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServiceCards } from "@/components/services/ServiceCards";
import { PricingTeaser } from "@/components/services/PricingTeaser";

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <motion.div initial="hidden" animate="show" variants={stagger(0, 0.1)}>
          <motion.div variants={fadeUp} className="text-label mb-6">
            What we do
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-white mb-6 max-w-4xl mx-auto">
            End-to-end technology services
          </motion.h1>
          <motion.p variants={fadeUp} className="text-text-2 text-lg md:text-xl max-w-3xl mx-auto">
            From strategy and design to development and deployment — we handle every layer.
          </motion.p>
        </motion.div>
      </section>

      <ServiceCards />
      <TechMarquee />
      <ProcessSection />
      <PricingTeaser />
      <CTAStrip />
    </>
  );
}
