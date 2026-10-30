"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Linkedin } from "lucide-react";

export function TeamGrid() {
  const team = [
    { name: "Alice M.", role: "Lead Developer", skills: ["React", "Node.js"], initials: "AM" },
    { name: "Bob T.", role: "UI/UX Designer", skills: ["Figma", "Framer"], initials: "BT" },
    { name: "Charlie S.", role: "AI Engineer", skills: ["Python", "LangChain"], initials: "CS" },
    { name: "Diana P.", role: "Mobile Developer", skills: ["Flutter", "Firebase"], initials: "DP" },
    { name: "Eve W.", role: "Backend Engineer", skills: ["PostgreSQL", "FastAPI"], initials: "EW" },
    { name: "Frank L.", role: "Project Manager", skills: ["Agile", "Scrum"], initials: "FL" },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-[-0.02em]">
            The people behind the work
          </h2>
          <p className="text-text-2 text-lg max-w-2xl mx-auto">
            Our team of specialists is dedicated to delivering excellence across every project.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, rotateY: 90 },
                show: { opacity: 1, rotateY: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="card p-6 bg-surface border border-border rounded-2xl card-hover flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-surface-2 border-2 border-border flex items-center justify-center text-white font-medium text-2xl mb-4 shrink-0 shadow-lg">
                {member.initials}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
              <p className="text-brand text-sm font-medium mb-4">{member.role}</p>
              
              <div className="flex gap-2 mb-6">
                {member.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 text-slate-300 text-xs rounded-full border border-border">
                    {skill}
                  </span>
                ))}
              </div>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-3 hover:text-brand transition-colors mt-auto">
                <Linkedin size={20} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
