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
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "UI/UX design",
      description: "Intuitive, accessible, and stunning user experiences that delight your customers and drive engagement.",
      icon: Layout,
      color: "text-[#A78BFA]",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "AI & Automation",
      description: "Intelligent systems that automate workflows, develop custom AI agents, and reduce manual effort.",
      icon: Cpu,
      color: "text-[#38BDF8]",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Custom development",
      description: "Bespoke software solutions engineered from the ground up to solve your most complex challenges.",
      icon: Wrench,
      color: "text-[#FCD34D]",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Data analytics",
      description: "Actionable insights and robust dashboards that turn your raw data into strategic business value.",
      icon: BarChart3,
      color: "text-[#34D399]",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Mobile solutions",
      description: "High-performance native and cross-platform mobile apps for iOS and Android devices.",
      icon: Smartphone,
      color: "text-[#FB7185]",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
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
              <Card className="relative h-full min-h-[280px] group cursor-pointer border-transparent bg-[#161B24] border-white/5 transition-all hover:border-white/20 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-[#161B24]/70 group-hover:bg-[#161B24]/50 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161B24] via-[#161B24]/60 to-transparent" />
                </div>

                <CardHeader className="relative z-10 flex flex-col h-full justify-end pb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300 ${service.color}`}>
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-xl text-white m-0">{service.title}</CardTitle>
                  </div>
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
