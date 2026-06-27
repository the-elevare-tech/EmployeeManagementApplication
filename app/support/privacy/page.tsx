"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { COMPANY } from "@/lib/constants";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      body: "We collect information you provide when contacting us through our contact form — such as your name, email, company, and project details. We also collect anonymous usage data to improve our website.",
    },
    {
      title: "How We Use Information",
      body: "Information is used solely to respond to inquiries, deliver services, and improve our website. We do not sell your personal data to third parties.",
    },
    {
      title: "Cookies & Tracking",
      body: "We may use cookies and analytics tools to understand how visitors use our site. You can control cookie preferences through your browser settings.",
    },
    {
      title: "Data Security",
      body: "We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse.",
    },
    {
      title: "Changes to This Policy",
      body: "We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date.",
    },
  ];

  return (
    <div className="pt-28 pb-24 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-12">
          <p className="text-label mb-4">Legal</p>
          <h1 className="text-white mb-4">Privacy Policy</h1>
          <p className="text-text-2 leading-relaxed">
            Your privacy matters to us. This policy explains how Elevare Tech collects, uses, and protects your information.
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
              Questions about this policy? Reach us through our{" "}
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
