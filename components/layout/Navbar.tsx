"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, Code2, Palette, Bot, Workflow, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { openCommandMenu } from "@/components/layout/CommandMenu";
import { SERVICES } from "@/lib/services";
import { Logo } from "@/components/ui/Logo";


export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDesktopServicesOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Our Work", href: "/projects" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDesktopServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDesktopServicesOpen(false);
    }, 150);
  };
  
  const toggleServicesKeyboard = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setDesktopServicesOpen(!desktopServicesOpen);
    } else if (e.key === "Escape") {
      setDesktopServicesOpen(false);
    }
  };

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
    >
      <div
        className={`relative mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border pl-4 pr-2 transition-all duration-300 sm:pl-5 ${
          scrolled || mobileMenuOpen
            ? "border-white/10 bg-[rgba(10,16,34,0.72)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        }`}
      >
      <Link href="/" className="relative z-50" aria-label="Elevare Tech home">
        <Logo size={26} variant="nav" />
      </Link>

      <div className="hidden lg:flex items-center gap-1 h-full">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          if (link.name === "Services") {
            return (
              <div 
                key={link.name} 
                className="h-full flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[15px] transition-colors ${
                    isActive || desktopServicesOpen ? "text-text-1 bg-white/[0.05]" : "text-text-2 hover:text-text-1"
                  }`}
                  onKeyDown={toggleServicesKeyboard}
                  aria-expanded={desktopServicesOpen}
                  aria-haspopup="true"
                >
                  {link.name}
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${desktopServicesOpen ? "rotate-180" : ""}`} 
                  />
                </Link>

                <AnimatePresence>
                  {desktopServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[min(1000px,calc(100vw-2rem))] pt-3"
                    >
                      <div className="relative grid grid-cols-[1fr_260px] gap-2 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#111a33_0%,#0a1022_100%)] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_40px_100px_-20px_rgba(0,0,0,0.95),0_0_60px_-30px_rgba(56,189,248,0.5)]">
                        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
                        <div aria-hidden className="pointer-events-none absolute -left-20 -top-24 h-56 w-80 rounded-full bg-brand/10 blur-3xl" />
                        <div className="relative p-2">
                          <div className="grid grid-cols-2 gap-1">
                            {SERVICES.map((svc) => {
                              const Icon = svc.icon;
                              return (
                                <Link
                                  key={svc.slug}
                                  href={`/services/${svc.slug}`}
                                  className="group flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-white/[0.06] hover:bg-white/[0.04]"
                                >
                                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-brand/15 to-indigo/15 text-brand transition-colors group-hover:border-brand/40">
                                    <Icon size={16} />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-[14px] font-medium text-text-1 group-hover:text-brand">{svc.title}</span>
                                    <span className="block truncate text-[12.5px] text-text-3">{svc.summary}</span>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                          <Link href="/services" className="mt-2 flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-[13px] text-text-2 transition-colors hover:border-brand/40 hover:text-text-1">
                            <span>Not sure what you need? Compare all services</span>
                            <ArrowUpRight size={14} className="text-brand" />
                          </Link>
                        </div>
                        <Link href="/projects/uae-visa-consultancy-website" className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#070c1c] p-2">
                          <div className="relative h-36 overflow-hidden rounded-lg">
                            <Image src="/projects/uae-visa-cover.webp" alt="" fill sizes="260px" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                          </div>
                          <div className="flex flex-1 flex-col p-3">
                            <span className="font-mono text-[11px] text-brand">Featured client work · UAE</span>
                            <span className="mt-1 text-[15px] font-medium text-text-1">Multilingual website for a visa consultancy</span>
                            <span className="mt-1 text-[13px] text-text-3">8 languages, admin panel and automatic translation.</span>
                            <span className="mt-auto flex items-center gap-1 pt-3 text-[13px] text-brand">
                              View case study <ArrowUpRight size={14} />
                            </span>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`relative rounded-lg px-3.5 py-2 text-[15px] transition-colors ${
                isActive ? "text-text-1 bg-white/[0.05]" : "text-text-2 hover:text-text-1"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="hidden lg:flex items-center gap-2">
        <button
          type="button"
          onClick={openCommandMenu}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-3 pr-2 text-[13px] text-text-3 transition-colors hover:border-white/20 hover:text-text-2"
          aria-label="Search the site"
        >
          <Search size={14} />
          Search
          <kbd className="rounded-md border border-white/10 bg-white/[0.05] px-1.5 font-mono text-[11px]">⌘K</kbd>
        </button>
        <Link
          href="/contact"
          className="btn-primary text-[14px] px-4 py-2 rounded-xl"
        >
          Book a free call
        </Link>
      </div>

      <div className="flex items-center lg:hidden">
      <button type="button" onClick={openCommandMenu} className="relative z-50 p-2 text-text-2" aria-label="Search the site">
        <Search size={20} />
      </button>
      <button
        type="button"
        className="lg:hidden text-text-1 relative z-50 p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-[100dvh] bg-bg z-40 flex flex-col pt-24 px-5 overflow-y-auto pb-24 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => {
                if (link.name === "Services") {
                  return (
                    <div key={link.name} className="flex flex-col gap-4">
                      <button 
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="font-display text-3xl font-medium tracking-tight flex items-center justify-between text-text-1"
                      >
                        {link.name}
                        <ChevronDown 
                          size={24} 
                          className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-brand" : "text-text-2"}`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col gap-4 pl-4 border-l border-border"
                          >
                            {SERVICES.map((svc) => {
                              const Icon = svc.icon;
                              return (
                                <Link
                                  key={svc.slug}
                                  href={`/services/${svc.slug}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-3 text-[17px] text-text-2 hover:text-white"
                                >
                                  <Icon size={17} className="text-brand" />
                                  {svc.title}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-display text-3xl font-medium tracking-tight ${
                      pathname === link.href ? "text-brand" : "text-text-1"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <Link
                href="/contact"
                className="btn-primary text-lg px-8 py-4 rounded-xl mt-6 text-center w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a free call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
