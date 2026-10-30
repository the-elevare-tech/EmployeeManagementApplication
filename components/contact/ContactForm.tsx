"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2, Loader2, User, Mail, Building2, Code2, Palette, Bot, Workflow, BarChart3, Smartphone,
  HelpCircle, ShieldCheck, ArrowRight, Lock,
} from "lucide-react";
import { sendContactEmail } from "@/lib/emailjs";
import { CONTACT } from "@/lib/constants";
import { SERVICES as SERVICE_LIST } from "@/lib/services";

const SERVICES = [
  ...SERVICE_LIST.map((x) => ({ value: x.title, label: x.short.charAt(0).toUpperCase() + x.short.slice(1), icon: x.icon })),
  { value: "Other", label: "Something else", icon: HelpCircle },
];
const BUDGETS = ["Under $500", "$500 to $2,000", "$2,000 to $10,000", "$10,000+", "Let's discuss"];
const TIMELINES = ["As soon as possible", "Within 1-3 months", "3+ months", "Just exploring"];

const schema = z.object({
  from_name: z.string().min(2, "Please enter your name"),
  from_email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().min(1, "Choose the service you need"),
  budget: z.string().min(1, "Choose a budget range"),
  timeline: z.string().optional(),
  message: z.string().min(20, "Tell us a little more (at least 20 characters)"),
});
type FormData = z.infer<typeof schema>;

function field(hasError?: boolean, pad = "pl-11") {
  return `peer w-full rounded-xl border bg-ink/60 py-3 ${pad} pr-4 text-[15px] text-text-1 placeholder:text-text-3 outline-none transition-all duration-200 focus:border-brand/70 focus:bg-ink/80 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)] ${
    hasError ? "border-coral/60" : "border-white/10 hover:border-white/20"
  }`;
}

function Section({ n, title, hint, children }: { n: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-4 flex w-full items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 font-mono text-[11px] text-brand">{n}</span>
        <span className="text-[15px] font-medium text-text-1">{title}</span>
        {hint && <span className="ml-auto text-xs text-text-3">{hint}</span>}
      </legend>
      {children}
    </fieldset>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-coral">
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { service: "", budget: "", timeline: "" } });

  // Preselect a service from ?service=… (e.g. from the "What are you building?" console)
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("service");
    if (!s) return;
    // accept a service title or a slug
    const match = SERVICE_LIST.find((x) => x.title === s || x.slug === s);
    if (match) setValue("service", match.title, { shouldValidate: false });
  }, [setValue]);

  const service = watch("service");
  const budget = watch("budget");
  const timeline = watch("timeline");
  const message = watch("message") ?? "";

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      await sendContactEmail({
        from_name: data.from_name,
        from_email: data.from_email,
        company: data.company ?? "",
        service: data.service,
        budget: data.budget,
        timeline: data.timeline ?? "",
        message: data.timeline ? `${data.message}\n\nTimeline: ${data.timeline}` : data.message,
      });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong ring-conic flex min-h-[520px] flex-col items-center justify-center rounded-3xl p-10 text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green/15 text-green ring-1 ring-green/30"
        >
          <CheckCircle2 size={30} />
        </motion.span>
        <h3 className="mt-6 text-2xl text-text-1">Message sent</h3>
        <p className="mt-2 max-w-sm text-text-2">Thanks for reaching out. An engineer from our team will reply within 24 hours.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn-ghost mt-8 rounded-xl px-5 py-2.5 text-sm">
          Send another message
        </button>
      </motion.div>
    );
  }

  const chip = (active: boolean) =>
    `flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-[13px] transition-all ${
      active
        ? "border-brand/60 bg-gradient-to-br from-brand/15 to-indigo/15 text-text-1 shadow-[0_0_0_3px_rgba(56,189,248,0.10)]"
        : "border-white/10 bg-white/[0.02] text-text-2 hover:border-white/20 hover:text-text-1"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass-strong ring-conic relative overflow-hidden rounded-3xl">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-5 md:px-8">
        <div>
          <h2 className="text-xl text-text-1">Start a project</h2>
          <p className="mt-0.5 text-sm text-text-3">Takes about 2 minutes. We reply within 24 hours.</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-text-2">
          <Lock size={12} className="text-brand" /> Private & secure
        </span>
      </div>

      <div className="space-y-9 px-6 py-7 md:px-8">
        <Section n="01" title="About you">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="from_name" className="sr-only">Full name</label>
              <div className="relative">
                <input id="from_name" {...register("from_name")} placeholder="Full name *" autoComplete="name" className={field(!!errors.from_name)} />
                <User size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-3 peer-focus:text-brand" />
              </div>
              <FieldError msg={errors.from_name?.message} />
            </div>
            <div>
              <label htmlFor="from_email" className="sr-only">Work email</label>
              <div className="relative">
                <input id="from_email" type="email" {...register("from_email")} placeholder="Work email *" autoComplete="email" className={field(!!errors.from_email)} />
                <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-3 peer-focus:text-brand" />
              </div>
              <FieldError msg={errors.from_email?.message} />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="company" className="sr-only">Company</label>
            <input id="company" {...register("company")} placeholder="Company or website (optional)" autoComplete="organization" className={field()} />
            <Building2 size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-3 peer-focus:text-brand" />
          </div>
        </Section>

        <Section n="02" title="What do you need?" hint="Pick one">
          <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              const active = service === s.value;
              return (
                <label key={s.value} className={chip(active)}>
                  <input type="radio" value={s.value} {...register("service")} className="sr-only" />
                  <Icon size={15} className={active ? "text-brand" : "text-text-3"} />
                  <span className="truncate">{s.label}</span>
                </label>
              );
            })}
          </div>
          <FieldError msg={errors.service?.message} />
        </Section>

        <Section n="03" title="Budget & timeline">
          <div>
            <p className="mb-2 text-xs text-text-3">Budget (USD) *</p>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <label key={b} className={`${chip(budget === b)} rounded-full px-4 py-2`}>
                  <input type="radio" value={b} {...register("budget")} className="sr-only" />
                  {b}
                </label>
              ))}
            </div>
            <FieldError msg={errors.budget?.message} />
          </div>
          <div>
            <p className="mb-2 text-xs text-text-3">When do you want to start?</p>
            <div className="flex flex-wrap gap-2">
              {TIMELINES.map((t) => (
                <label key={t} className={`${chip(timeline === t)} rounded-full px-4 py-2`}>
                  <input type="radio" value={t} {...register("timeline")} className="sr-only" />
                  {t}
                </label>
              ))}
            </div>
          </div>
        </Section>

        <Section n="04" title="Project details">
          <div>
            <label htmlFor="message" className="sr-only">Project details</label>
            <textarea
              id="message"
              {...register("message")}
              rows={5}
              placeholder="What are you building, who is it for, and what does success look like? Links to examples help too."
              className={`${field(!!errors.message, "pl-4")} resize-none`}
            />
            <div className="mt-1.5 flex items-start justify-between gap-4">
              <FieldError msg={errors.message?.message} />
              <span className={`ml-auto font-mono text-[11px] ${message.length >= 20 ? "text-green" : "text-text-3"}`}>{message.length} / 20+</span>
            </div>
          </div>
        </Section>

        {status === "error" && (
          <p className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">
            We couldn&apos;t send your message. Please email us at{" "}
            <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a> or message us on WhatsApp.
          </p>
        )}
      </div>

      {/* footer */}
      <div className="flex flex-col-reverse gap-4 border-t border-white/10 bg-ink/30 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p className="flex items-center gap-2 text-xs text-text-3">
          <ShieldCheck size={14} className="shrink-0 text-green" />
          Your details stay private. NDA available on request.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send project brief <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
