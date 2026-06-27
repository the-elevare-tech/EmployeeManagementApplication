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
      className="card group p-8 bg-[#161B24] border border-white/5 rounded-2xl card-hover flex flex-col md:flex-row md:items-center justify-between gap-6"
    >
      <div>
        <h3 className="text-2xl font-semibold text-white mb-3">{role.title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {role.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-slate-400">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">{role.desc}</p>
      </div>

      <Link 
        href={role.link}
        className="shrink-0 inline-flex items-center gap-2 text-[#38BDF8] font-medium group-hover:text-white transition-colors"
      >
        Apply now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
