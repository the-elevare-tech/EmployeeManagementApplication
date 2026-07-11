"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const servicesMenu = [
  {
    category: "Web Development",
    href: "/services#web-development",
    links: [
      { name: "Web App Development", href: "/services#web-development" },
      { name: "Custom CMS", href: "/services#web-development" },
      { name: "SaaS Platforms", href: "/services#web-development" },
      { name: "PWA Development", href: "/services#web-development" },
      { name: "Frontend Development", href: "/services#web-development" },
      { name: "Backend Development", href: "/services#web-development" },
    ],
  },
  {
    category: "UI/UX Design",
    href: "/services#ui-ux-design",
    links: [
      { name: "User Research", href: "/services#ui-ux-design" },
      { name: "Wireframing & Prototyping", href: "/services#ui-ux-design" },
      { name: "Design Systems", href: "/services#ui-ux-design" },
      { name: "Branding", href: "/services#ui-ux-design" },
    ],
  },
  {
    category: "AI & Automation",
    href: "/services#ai-automation",
    links: [
      { name: "RAG Development", href: "/services#ai-automation" },
      { name: "AI Chatbots & Assistants", href: "/services#ai-automation" },
      { name: "Workflow Automation", href: "/services#ai-automation" },
      { name: "Multi-LLM Integration", href: "/services#ai-automation" },
      { name: "AI Agents", href: "/services#ai-automation" },
    ],
  },
  {
    category: "Custom Development",
    href: "/services#custom-development",
    links: [
      { name: "API Development", href: "/services#custom-development" },
      { name: "System Integration", href: "/services#custom-development" },
      { name: "Enterprise Software", href: "/services#custom-development" },
      { name: "Maintenance & Support", href: "/services#custom-development" },
    ],
  },
];

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
      className={`nav fixed top-0 w-full h-16 z-50 flex items-center justify-between px-6 lg:px-12 ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <Link href="/" className="relative z-50">
        <Logo size={28} variant="nav" />
      </Link>

      <div className="hidden md:flex items-center gap-8 h-full">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          if (link.name === "Services") {
            return (
              <div 
                key={link.name} 
                className="relative h-full flex items-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={link.href}
                  className={`relative text-[15px] transition-colors nav-link-underline flex items-center gap-1.5 ${
                    isActive ? "text-brand" : desktopServicesOpen ? "text-white" : "text-text-2 hover:text-white"
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
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand" />
                  )}
                </Link>

                <AnimatePresence>
                  {desktopServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] pt-1"
                    >
                      <div className="bg-[#161B24] border border-white/10 rounded-2xl shadow-2xl p-8 grid grid-cols-4 gap-8">
                        {servicesMenu.map((category, idx) => (
                          <div key={idx} className="flex flex-col">
                            <Link href={category.href} className="text-[#38BDF8] font-semibold mb-4 pb-3 border-b border-white/10 inline-block hover:text-white transition-colors">
                              {category.category}
                            </Link>
                            <div className="flex flex-col gap-1.5">
                              {category.links.map((subLink, subIdx) => (
                                <Link
                                  key={subIdx}
                                  href={subLink.href}
                                  className="text-sm text-text-2 hover:text-[#38BDF8] hover:bg-white/5 px-2.5 py-2 -mx-2.5 rounded-md transition-all font-medium"
                                >
                                  {subLink.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
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
            className="fixed top-0 left-0 w-full h-[100dvh] bg-bg/95 backdrop-blur-xl z-40 flex flex-col pt-24 px-6 overflow-y-auto pb-24"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => {
                if (link.name === "Services") {
                  return (
                    <div key={link.name} className="flex flex-col gap-4">
                      <button 
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={`text-2xl font-medium flex items-center justify-between ${
                          pathname === link.href || mobileServicesOpen ? "text-brand" : "text-text-1"
                        }`}
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
                            className="overflow-hidden flex flex-col gap-8 pl-4 border-l-2 border-white/10"
                          >
                            {servicesMenu.map((category, idx) => (
                              <div key={idx} className="flex flex-col gap-3 pt-2">
                                <Link href={category.href} className="text-[#38BDF8] font-semibold text-lg" onClick={() => setMobileMenuOpen(false)}>
                                  {category.category}
                                </Link>
                                <div className="flex flex-col gap-3 pl-2">
                                  {category.links.map((subLink, subIdx) => (
                                    <Link
                                      key={subIdx}
                                      href={subLink.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="text-[17px] text-text-2 hover:text-white"
                                    >
                                      {subLink.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
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
                    className={`text-2xl font-medium ${
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
                className="btn-primary text-white text-lg font-medium px-8 py-3 rounded-full mt-8 text-center w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start your journey →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
