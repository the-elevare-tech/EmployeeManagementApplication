"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`nav fixed top-0 w-full h-16 z-50 flex items-center justify-between px-6 lg:px-12 ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <Link href="/" className="relative z-50">
        <Logo size={28} variant="nav" />
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-[15px] transition-colors nav-link-underline ${
                isActive ? "text-brand" : "text-text-2 hover:text-white"
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="hidden md:flex items-center">
        <Link
          href="/contact"
          className="btn-primary text-white text-[15px] font-medium px-5 py-2 rounded-full"
        >
          Start your journey →
        </Link>
      </div>

      <button
        type="button"
        className="md:hidden text-white relative z-50 p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-screen bg-bg/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 pt-16"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-2xl font-medium ${
                  pathname === link.href ? "text-brand" : "text-text-1"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary text-white text-lg font-medium px-8 py-3 rounded-full mt-8"
            >
              Start your journey →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
