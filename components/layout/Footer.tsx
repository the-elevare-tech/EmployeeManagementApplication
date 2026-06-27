"use client";

import Link from "next/link";
import { Linkedin, Facebook } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { COMPANY } from "@/lib/constants";

export function Footer() {
  const socialLinks = [
    { icon: Linkedin, href: COMPANY.linkedin, label: "LinkedIn" },
    { icon: Facebook, href: COMPANY.facebook, label: "Facebook" },
  ];

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-6">
              <Logo size={48} variant="footer" wordmarkClassName="font-sans font-semibold text-lg tracking-[0.05em] text-white" />
            </Link>
            <p className="text-text-2 text-sm mb-6 max-w-xs">
              We turn complex digital challenges into scalable, secure, and intelligent solutions.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-2 hover:text-brand transition-all duration-300 hover:scale-125"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="flex flex-col gap-3">
              {["Web Development", "UI/UX Design", "AI & Automation", "Custom Development", "Data Analytics", "Mobile Solutions"].map(
                (s) => (
                  <li key={s}>
                    <Link href="/services" className="text-text-2 hover:text-brand transition-colors text-sm">
                      {s}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-text-2 hover:text-brand transition-colors text-sm">About</Link></li>
              <li><Link href="/projects" className="text-text-2 hover:text-brand transition-colors text-sm">Projects</Link></li>
              <li><Link href="/careers" className="text-text-2 hover:text-brand transition-colors text-sm">Careers</Link></li>
              <li><Link href="/contact" className="text-text-2 hover:text-brand transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/contact" className="text-text-2 hover:text-brand transition-colors text-sm">Help Center</Link></li>
              <li><Link href="/support/privacy" className="text-text-2 hover:text-brand transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/support/terms" className="text-text-2 hover:text-brand transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-3 text-sm">
            © {COMPANY.copyrightYear} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/support/privacy" className="text-text-3 hover:text-white transition-colors text-sm">Privacy</Link>
            <Link href="/support/terms" className="text-text-3 hover:text-white transition-colors text-sm">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
