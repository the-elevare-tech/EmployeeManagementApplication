"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { CTAStrip } from "@/components/home/CTAStrip";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ResultsStrip } from "@/components/projects/ResultsStrip";
import { PROJECTS } from "@/lib/projects";

const FILTER_TABS = ["All", "Web", "Mobile", "AI & Automation", "UI/UX", "Custom"] as const;

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredProjects =
    activeTab === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.filterCategory === activeTab);

  return (
    <>
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <motion.div initial="hidden" animate="show" variants={stagger(0, 0.1)}>
          <motion.div variants={fadeUp} className="text-label mb-6">
            Our work
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-white mb-6 max-w-4xl mx-auto">
            15+ projects. 1 year. Real results.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-text-2 text-lg md:text-xl max-w-3xl mx-auto">
            A selection of work delivered since our founding in 2025.
          </motion.p>
        </motion.div>
      </section>

      <section className="pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative flex flex-wrap items-center justify-center gap-1 mb-10 border-b border-border pb-4">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab ? "text-brand" : "text-text-2 hover:text-white"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="project-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <ResultsStrip />
      <CTAStrip />
    </>
  );
}
