"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface RoleCardProps {
  role: {
    title: string;
    tags: string[];
    desc: string;
    link: string;
  };
}

export function RoleCard({ role }: RoleCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="card group p-8 bg-surface border border-border rounded-2xl card-hover flex flex-col md:flex-row md:items-center justify-between gap-6"
    >
      <div>
        <h3 className="text-2xl font-semibold text-white mb-3">{role.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {role.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-border rounded text-xs text-text-2">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-text-2 max-w-2xl text-sm leading-relaxed">{role.desc}</p>
      </div>

      <Link 
        href={role.link}
        className="shrink-0 inline-flex items-center gap-2 text-brand font-medium group-hover:text-white transition-colors"
      >
        Apply now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
