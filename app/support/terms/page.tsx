"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { COMPANY } from "@/lib/constants";

export default function TermsOfService() {
  const sections = [
    {
      title: "Acceptance of Terms",
      body: "By accessing our website or using our services, you agree to these Terms of Service and applicable laws.",
    },
    {
      title: "Services Provided",
      body: "Elevare Tech provides software development, web and mobile applications, AI automation, data solutions, and related IT services as described on our website. Delivery is governed by project agreements.",
    },
    {
      title: "Payment & Billing",
      body: "Payment terms are specified in project agreements. Fees are due as agreed. Refunds are handled per the terms of each individual contract.",
    },
    {
      title: "Intellectual Property",
      body: "Unless explicitly assigned in a contract, Elevare Tech retains ownership of pre-existing tools, frameworks, and methodologies. Client-specific deliverables are assigned per project agreement.",
    },
    {
      title: "Limitations of Liability",
      body: "We are not liable for indirect or consequential damages arising from use of our services. Maximum liability is limited to fees paid for the specific service in question.",
    },
    {
      title: "Changes to Terms",
      body: "We may update these terms periodically. Continued use of our services after changes constitutes acceptance of the updated terms.",
    },
  ];

  return (
    <div className="pt-28 pb-24 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-12">
          <p className="text-label mb-4">Legal</p>
          <h1 className="text-white mb-4">Terms of Service</h1>
          <p className="text-text-2 leading-relaxed">
            These terms govern your use of Elevare Tech&apos;s website and services.
          </p>
          <p className="text-text-3 text-sm mt-4">Last updated: January 2025</p>
        </motion.div>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
            >
              <h2 className="text-white text-xl mb-3">{section.title}</h2>
              <p className="text-text-2 leading-relaxed">{section.body}</p>
            </motion.div>
          ))}

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-white text-xl mb-3">Contact Us</h2>
            <p className="text-text-2 leading-relaxed">
              Questions about these terms? Visit our{" "}
              <Link href="/contact" className="text-brand hover:underline">
                contact page
              </Link>{" "}
              or email{" "}
              <a href={`mailto:${COMPANY.email}`} className="text-brand hover:underline">
                {COMPANY.email}
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
