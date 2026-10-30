"use client";

import { PageHero } from "@/components/layout/PageHero";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { CTAStrip } from "@/components/home/CTAStrip";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ResultsStrip } from "@/components/projects/ResultsStrip";
import { PROJECTS } from "@/lib/projects";

const FILTER_TABS = ["All", "Client work", "In-house products", ...Array.from(new Set(PROJECTS.map((p) => p.filterCategory)))];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<string>("All");

  // Support links like /projects?tab=in-house or ?tab=client
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tab");
    if (t === "in-house") setActiveTab("In-house products");
    if (t === "client") setActiveTab("Client work");
  }, []);

  const filteredProjects =
    activeTab === "All"
      ? PROJECTS
      : activeTab === "Client work"
        ? PROJECTS.filter((p) => p.confidential)
        : activeTab === "In-house products"
        ? PROJECTS.filter((p) => !p.confidential)
        : PROJECTS.filter((p) => p.filterCategory === activeTab);

  return (
    <>
      <PageHero
        label="Our work"
        title="15+ projects shipped."
        highlight="Real products, real results."
        description="A selection of AI platforms, web apps, mobile apps and dashboards delivered since 2025."
      />

      <section className="pb-24 container-x">
        <div className="mb-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-border bg-white/[0.03] p-1.5 backdrop-blur">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`relative isolate rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab ? "text-white" : "text-text-2 hover:text-text-1"
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="project-tab-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-brand-deep to-indigo shadow-[0_6px_20px_-6px_rgba(99,102,241,0.7)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
