"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[120px] font-bold text-brand leading-none mb-4 tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-white mb-4">
          This page doesn&apos;t exist
        </h2>
        <p className="text-text-2 mb-8 max-w-md mx-auto">
          You may have followed a broken link or mistyped the URL.
        </p>
        <Link href="/" className="btn-primary inline-block text-white font-medium px-8 py-3 rounded-full">
          Go home →
        </Link>
      </motion.div>
    </div>
  );
}
