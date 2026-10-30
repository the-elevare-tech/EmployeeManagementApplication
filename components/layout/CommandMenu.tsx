"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, Home, Info, Layers, FolderKanban, Briefcase, Mail, CalendarCheck, MessageCircle, Copy,
  Code2, Bot, Palette, Smartphone, Workflow, BarChart3, ArrowUpRight, CornerDownLeft,
} from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { CONTACT } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

export const OPEN_COMMAND_MENU = "elevare:open-command-menu";

export function openCommandMenu() {
  window.dispatchEvent(new Event(OPEN_COMMAND_MENU));
}

const pages = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: Info },
  { label: "Services", href: "/services", icon: Layers },
  { label: "Our work", href: "/projects", icon: FolderKanban },
  { label: "Careers", href: "/careers", icon: Briefcase },
  { label: "Contact", href: "/contact", icon: Mail },
];

const services = SERVICES.map((x) => ({ label: x.title, href: `/services/${x.slug}`, icon: x.icon }));

function Item({ icon: Icon, children, hint, onSelect, value }: { icon: React.ElementType; children: React.ReactNode; hint?: string; onSelect: () => void; value: string }) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] text-text-2 outline-none data-[selected=true]:bg-white/[0.06] data-[selected=true]:text-text-1"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-text-3 group-data-[selected=true]:border-brand/40 group-data-[selected=true]:text-brand">
        <Icon size={15} />
      </span>
      <span className="flex-1 truncate">{children}</span>
      {hint && <span className="hidden font-mono text-[11px] text-text-3 sm:inline">{hint}</span>}
      <CornerDownLeft size={14} className="text-text-3 opacity-0 group-data-[selected=true]:opacity-100" />
    </Command.Item>
  );
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setCopied(false);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl"
          >
            <Command
              label="Search Elevare Tech"
              loop
              className="ring-conic overflow-hidden rounded-2xl border border-white/10 bg-[rgba(10,16,34,0.88)] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),0_0_80px_-30px_rgba(56,189,248,0.5)] backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4">
                <Search size={18} className="text-brand" />
                <Command.Input
                  autoFocus
                  placeholder="Search pages, services, projects…"
                  className="h-14 flex-1 bg-transparent text-[15px] text-text-1 outline-none placeholder:text-text-3"
                />
                <kbd className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11px] text-text-3">esc</kbd>
              </div>
              <Command.List className="max-h-[56vh] overflow-y-auto p-2 [scrollbar-width:thin]">
                <Command.Empty className="px-3 py-10 text-center text-sm text-text-3">No results. Try “AI”, “mobile” or “contact”.</Command.Empty>

                <Command.Group heading="Quick actions" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-text-3">
                  <Item value="book a free call" icon={CalendarCheck} hint="free · 30 min" onSelect={() => go("/contact")}>Book a free call</Item>
                  <Item value="whatsapp message chat" icon={MessageCircle} hint="opens WhatsApp" onSelect={() => { setOpen(false); window.open(CONTACT.whatsapp, "_blank", "noopener"); }}>
                    Message us on WhatsApp
                  </Item>
                  <Item
                    value="copy email address"
                    icon={Copy}
                    hint={copied ? "copied" : CONTACT.email}
                    onSelect={() => {
                      navigator.clipboard?.writeText(CONTACT.email).then(() => setCopied(true)).catch(() => {});
                    }}
                  >
                    {copied ? "Email copied" : "Copy email address"}
                  </Item>
                </Command.Group>

                <Command.Group heading="Pages" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-text-3">
                  {pages.map((p) => (
                    <Item key={p.href} value={`page ${p.label}`} icon={p.icon} onSelect={() => go(p.href)}>{p.label}</Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Services" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-text-3">
                  {services.map((s) => (
                    <Item key={s.href} value={`service ${s.label}`} icon={s.icon} onSelect={() => go(s.href)}>{s.label}</Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Projects" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-text-3">
                  {PROJECTS.map((p) => (
                    <Item key={p.slug} value={`project ${p.title} ${p.category} ${p.tech.join(" ")}`} icon={ArrowUpRight} hint={p.category} onSelect={() => go(`/projects/${p.slug}`)}>
                      {p.title}
                    </Item>
                  ))}
                </Command.Group>
              </Command.List>
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-text-3">
                <span>↑↓ to move · ↵ to open</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Elevare Tech
                </span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
