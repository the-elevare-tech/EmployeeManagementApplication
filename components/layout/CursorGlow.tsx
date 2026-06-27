"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -400, y: -400 });

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 transition-transform duration-100 ease-out hidden md:block"
      animate={{
        x: mousePosition.x - 200, // offset by half width/height
        y: mousePosition.y - 200,
      }}
      style={{
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
        left: 0,
        top: 0,
        transform: "translate(-50%, -50%)", // Additional centering if needed, but animate x/y handles it better if origin is top-left
      }}
    />
  );
}
