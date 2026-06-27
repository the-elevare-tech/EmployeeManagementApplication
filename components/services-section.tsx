"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Cpu, Wrench, BarChart3, Smartphone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionTag } from "@/components/ui/section-tag";

export function ServicesSection() {
  const services = [
    {
      title: "Web development",
      description: "Fast, secure, and scalable web applications tailored to your specific business needs and goals.",
      icon: Code2,
      color: "text-[#38BDF8]",
    },
    {
      title: "UI/UX design",
      description: "Intuitive, accessible, and stunning user experiences that delight your customers and drive engagement.",
      icon: Layout,
      color: "text-[#A78BFA]",
    },
    {
      title: "AI and automation",
      description: "Intelligent systems that automate workflows, generate insights, and propel your business forward.",
      icon: Cpu,
      color: "text-[#38BDF8]",
    },
    {
      title: "Custom development",
      description: "Bespoke software solutions engineered from the ground up to solve your most complex challenges.",
      icon: Wrench,
      color: "text-[#FCD34D]",
    },
    {
      title: "Data analytics",
      description: "Actionable insights and robust dashboards that turn your raw data into strategic business value.",
      icon: BarChart3,
      color: "text-[#34D399]",
    },
    {
      title: "Mobile solutions",
      description: "High-performance native and cross-platform mobile apps for iOS and Android devices.",
      icon: Smartphone,
      color: "text-[#FB7185]",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6" id="services">
      <div className="mb-16">
        <SectionTag>Services</SectionTag>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white">
          Everything you need to go digital
        </h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div key={index} variants={cardVariants}>
              <Card className="h-full group cursor-pointer border-transparent bg-[#161B24] border-white/5 transition-all hover:border-white/14">
                <CardHeader>
                  <div className={`mb-6 p-3 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300 ${service.color}`}>
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl text-white mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-slate-400 text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
