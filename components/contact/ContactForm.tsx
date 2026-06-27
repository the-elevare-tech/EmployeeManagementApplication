"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/lib/emailjs";
import { COMPANY } from "@/lib/constants";

const schema = z.object({
  from_name: z.string().min(2, "Name is required"),
  from_email: z.string().email("Valid email required"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget"),
  message: z.string().min(20, "Please write at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

function inputClass(hasError?: boolean) {
  return `w-full px-4 py-3 rounded-lg bg-surface-2 border text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/15 ${
    hasError ? "border-coral/60" : "border-white/8 hover:border-white/16"
  }`;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      await sendContactEmail({
        from_name: data.from_name,
        from_email: data.from_email,
        company: data.company ?? "",
        service: data.service,
        budget: data.budget,
        message: data.message,
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-green/20 bg-green/5 p-12 text-center min-h-[400px] flex flex-col items-center justify-center"
      >
        <CheckCircle className="mb-4 text-green" size={52} />
        <h3 className="text-xl font-semibold text-white mb-2">Message sent!</h3>
        <p className="text-text-2 text-sm max-w-xs">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-brand hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-white/8 bg-surface p-6 md:p-8 space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-white/50 mb-1.5 block">Full name *</label>
          <input {...register("from_name")} placeholder="Your name" className={inputClass(!!errors.from_name)} />
          {errors.from_name && <p className="text-coral text-xs mt-1">{errors.from_name.message}</p>}
        </div>
        <div>
          <label className="text-xs text-white/50 mb-1.5 block">Email address *</label>
          <input
            {...register("from_email")}
            type="email"
            placeholder="you@company.com"
            className={inputClass(!!errors.from_email)}
          />
          {errors.from_email && <p className="text-coral text-xs mt-1">{errors.from_email.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-xs text-white/50 mb-1.5 block">Company / organization</label>
        <input {...register("company")} placeholder="Your company (optional)" className={inputClass()} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-white/50 mb-1.5 block">Service needed *</label>
          <select {...register("service")} className={inputClass(!!errors.service)} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            <option>Web Development</option>
            <option>UI/UX Design</option>
            <option>AI & Automation</option>
            <option>Custom Development</option>
            <option>Data Analytics</option>
            <option>Mobile Solutions</option>
            <option>Other</option>
          </select>
          {errors.service && <p className="text-coral text-xs mt-1">{errors.service.message}</p>}
        </div>
        <div>
          <label className="text-xs text-white/50 mb-1.5 block">Budget range *</label>
          <select {...register("budget")} className={inputClass(!!errors.budget)} defaultValue="">
            <option value="" disabled>
              Select budget
            </option>
            <option>Under $500</option>
            <option>$500 – $2,000</option>
            <option>$2,000 – $10,000</option>
            <option>$10,000+</option>
            <option>Let&apos;s discuss</option>
          </select>
          {errors.budget && <p className="text-coral text-xs mt-1">{errors.budget.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-xs text-white/50 mb-1.5 block">Tell us about your project *</label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Describe what you're looking to build, your timeline, and any other relevant details..."
          className={inputClass(!!errors.message)}
        />
        {errors.message && <p className="text-coral text-xs mt-1">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-coral text-sm text-center">
          Something went wrong. Email us directly at {COMPANY.email}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3.5 rounded-lg btn-primary text-white font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          "Send message →"
        )}
      </button>

      <p className="text-xs text-white/25 text-center">{COMPANY.hours}</p>
    </form>
  );
}
