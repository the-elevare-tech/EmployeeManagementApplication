// "use client";

// import { useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { motion } from "framer-motion";
// import { Upload, CheckCircle, Loader2, X } from "lucide-react";
// import { fileToBase64, sendCareersEmail } from "@/lib/emailjs";
// import { COMPANY } from "@/lib/constants";

// const optionalUrl = z
//   .string()
//   .optional()
//   .refine((val) => !val || val === "" || z.string().url().safeParse(val).success, {
//     message: "Enter a valid URL",
//   });

// const schema = z.object({
//   applicant_name: z.string().min(2, "Name is required"),
//   applicant_email: z.string().email("Valid email required"),
//   phone: z.string().min(10, "Phone number required"),
//   position: z.string().min(1, "Please select a position"),
//   experience: z.string().min(1, "Please select experience level"),
//   linkedin: optionalUrl,
//   portfolio: optionalUrl,
//   cover_note: z.string().min(30, "Please write at least 30 characters"),
// });

// type FormData = z.infer<typeof schema>;

// const ACCEPTED_TYPES = [
//   "application/pdf",
//   "application/msword",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// ];

// function inputClass(hasError?: boolean) {
//   return `w-full px-4 py-3 rounded-lg bg-surface-2 border text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/15 ${
//     hasError ? "border-coral/60" : "border-white/8 hover:border-white/16"
//   }`;
// }

// export function ApplicationForm() {
//   const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [resumeError, setResumeError] = useState("");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) {
//       setResumeError("File must be under 5MB");
//       return;
//     }
//     if (!ACCEPTED_TYPES.includes(file.type)) {
//       setResumeError("Only PDF or Word documents accepted");
//       return;
//     }
//     setResumeError("");
//     setResumeFile(file);
//   };

//   const onSubmit = async (data: FormData) => {
//     if (!resumeFile) {
//       setResumeError("Please attach your resume");
//       return;
//     }
//     setStatus("sending");

//     try {
//       const formData = new FormData();
//       formData.append("file", resumeFile);
      
//       const res = await fetch("/api/upload-resume", {
//         method: "POST",
//         body: formData,
//       });
      
//       const { link } = await res.json();     
//        await sendCareersEmail({
//         applicant_name: data.applicant_name,
//         applicant_email: data.applicant_email,
//         phone: data.phone,
//         position: data.position,
//         experience: data.experience,
//         linkedin: data.linkedin ?? "",
//         portfolio: data.portfolio ?? "",
//         cover_note: data.cover_note,
//         resume_name: resumeFile.name,
//         resume_url: link,
//             });
//       setStatus("success");
//       reset();
//       setResumeFile(null);
//     } catch {
//       setStatus("error");
//     }
//   };

//   if (status === "success") {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="rounded-2xl border border-green/20 bg-green/5 p-12 text-center"
//       >
//         <CheckCircle className="mx-auto mb-4 text-green" size={48} />
//         <h3 className="text-xl font-semibold text-white mb-2">Application received!</h3>
//         <p className="text-text-2 text-sm">
//           Thanks for applying. We review every application and will get back to you within 5 business days.
//         </p>
//         <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm text-brand hover:underline">
//           Submit another application
//         </button>
//       </motion.div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="rounded-2xl border border-white/8 bg-surface p-6 md:p-8 space-y-5"
//       id="apply"
//     >
//       <div>
//         <h3 className="text-lg font-semibold text-white mb-1">Apply now</h3>
//         <p className="text-sm text-text-2">Fill in your details and attach your resume. We&apos;ll be in touch.</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="text-xs text-white/50 mb-1.5 block">Full name *</label>
//           <input {...register("applicant_name")} placeholder="Your full name" className={inputClass(!!errors.applicant_name)} />
//           {errors.applicant_name && <p className="text-coral text-xs mt-1">{errors.applicant_name.message}</p>}
//         </div>
//         <div>
//           <label className="text-xs text-white/50 mb-1.5 block">Email address *</label>
//           <input
//             {...register("applicant_email")}
//             type="email"
//             placeholder="you@example.com"
//             className={inputClass(!!errors.applicant_email)}
//           />
//           {errors.applicant_email && <p className="text-coral text-xs mt-1">{errors.applicant_email.message}</p>}
//         </div>
//         <div>
//           <label className="text-xs text-white/50 mb-1.5 block">Phone number *</label>
//           <input {...register("phone")} type="tel" placeholder="+92 300 0000000" className={inputClass(!!errors.phone)} />
//           {errors.phone && <p className="text-coral text-xs mt-1">{errors.phone.message}</p>}
//         </div>
//         <div>
//           <label className="text-xs text-white/50 mb-1.5 block">Position applying for *</label>
//           <select {...register("position")} className={inputClass(!!errors.position)} defaultValue="">
//             <option value="" disabled>
//               Select a role
//             </option>
//             <option>Frontend Developer (React/Next.js)</option>
//             <option>Python Backend Developer</option>
//             <option>UI/UX Designer</option>
//             <option>AI/ML Engineer</option>
//             <option>Open Application</option>
//           </select>
//           {errors.position && <p className="text-coral text-xs mt-1">{errors.position.message}</p>}
//         </div>
//         <div>
//           <label className="text-xs text-white/50 mb-1.5 block">Years of experience *</label>
//           <select {...register("experience")} className={inputClass(!!errors.experience)} defaultValue="">
//             <option value="" disabled>
//               Select level
//             </option>
//             <option>0–1 years (Fresh / Junior)</option>
//             <option>1–3 years (Mid-level)</option>
//             <option>3–5 years (Senior)</option>
//             <option>5+ years (Lead)</option>
//           </select>
//           {errors.experience && <p className="text-coral text-xs mt-1">{errors.experience.message}</p>}
//         </div>
//         <div>
//           <label className="text-xs text-white/50 mb-1.5 block">LinkedIn profile</label>
//           <input
//             {...register("linkedin")}
//             placeholder="https://linkedin.com/in/yourname"
//             className={inputClass(!!errors.linkedin)}
//           />
//           {errors.linkedin && <p className="text-coral text-xs mt-1">{errors.linkedin.message}</p>}
//         </div>
//       </div>

//       <div>
//         <label className="text-xs text-white/50 mb-1.5 block">Portfolio / GitHub / Website</label>
//         <input {...register("portfolio")} placeholder="https://github.com/yourname" className={inputClass(!!errors.portfolio)} />
//         {errors.portfolio && <p className="text-coral text-xs mt-1">{errors.portfolio.message}</p>}
//       </div>

//       <div>
//         <label className="text-xs text-white/50 mb-1.5 block">Why do you want to join Elevare Tech? *</label>
//         <textarea
//           {...register("cover_note")}
//           rows={4}
//           placeholder="Tell us about yourself, what you'd bring to the team, and why you're excited about this role..."
//           className={inputClass(!!errors.cover_note)}
//         />
//         {errors.cover_note && <p className="text-coral text-xs mt-1">{errors.cover_note.message}</p>}
//       </div>

//       <div>
//         <label className="text-xs text-white/50 mb-1.5 block">Resume / CV * (PDF or Word, max 5MB)</label>
//         <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
//         {!resumeFile ? (
//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             className="w-full rounded-lg border border-dashed border-white/12 bg-white/[0.02] py-6 flex flex-col items-center gap-2 hover:border-brand/40 hover:bg-brand/[0.03] transition-all duration-200 group"
//           >
//             <Upload size={20} className="text-white/30 group-hover:text-brand transition-colors" />
//             <span className="text-sm text-white/40 group-hover:text-white/60">Click to upload resume</span>
//             <span className="text-xs text-white/25">PDF or Word document</span>
//           </button>
//         ) : (
//           <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-brand/30 bg-brand/5">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 rounded bg-brand/15 flex items-center justify-center">
//                 <span className="text-xs font-bold text-brand">CV</span>
//               </div>
//               <div>
//                 <p className="text-sm text-white font-medium">{resumeFile.name}</p>
//                 <p className="text-xs text-white/40">{(resumeFile.size / 1024).toFixed(0)} KB</p>
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={() => setResumeFile(null)}
//               className="text-white/30 hover:text-white/70 transition-colors"
//               aria-label="Remove resume"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         )}
//         {resumeError && <p className="text-coral text-xs mt-1">{resumeError}</p>}
//       </div>

//       {status === "error" && (
//         <p className="text-coral text-sm text-center">
//           Something went wrong. Please try again or contact us at {COMPANY.phone} via the contact page.
//         </p>
//       )}

//       <button
//         type="submit"
//         disabled={status === "sending"}
//         className="w-full py-3.5 rounded-lg btn-primary text-white font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//       >
//         {status === "sending" ? (
//           <>
//             <Loader2 size={16} className="animate-spin" /> Sending application...
//           </>
//         ) : (
//           "Submit application →"
//         )}
//       </button>

//       <p className="text-xs text-white/25 text-center">
//         We review every application. You&apos;ll hear back within 5 business days.
//       </p>
//     </form>
//   );
// }
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { sendCareersEmail } from "@/lib/emailjs";
import { COMPANY } from "@/lib/constants";

const optionalUrl = z
  .string()
  .optional()
  .refine(
    (val) =>
      !val || val === "" || z.string().url().safeParse(val).success,
    {
      message: "Enter a valid URL",
    }
  );

const schema = z.object({
  applicant_name: z.string().min(2, "Name is required"),
  applicant_email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().min(1, "Please select experience level"),
  education: z.string().min(2, "Education is required"),
  certifications: z.string().optional(),
  skills: z.string().optional(),
  linkedin: optionalUrl,
  portfolio: optionalUrl,
  cover_note: z.string().min(30, "Please write at least 30 characters"),
});

type FormData = z.infer<typeof schema>;

function inputClass(hasError?: boolean) {
  return `w-full px-4 py-3 rounded-lg bg-surface-2 border text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/15 ${
    hasError ? "border-coral/60" : "border-white/8 hover:border-white/16"
  }`;
}

export function ApplicationForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

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
      await sendCareersEmail({
        applicant_name: data.applicant_name,
        applicant_email: data.applicant_email,
        phone: data.phone,
        position: data.position,
        experience: data.experience,
        education: data.education,
        certifications: data.certifications ?? "",
        skills: data.skills ?? "",
        linkedin: data.linkedin ?? "",
        portfolio: data.portfolio ?? "",
        cover_note: data.cover_note,
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
        className="rounded-2xl border border-green/20 bg-green/5 p-12 text-center"
      >
        <CheckCircle className="mx-auto mb-4 text-green" size={48} />
        <h3 className="text-xl font-semibold text-white mb-2">
          Application received!
        </h3>
        <p className="text-text-2 text-sm">
          Thanks for applying. We review every application and will get back to
          you within 5 business days.
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-brand hover:underline"
        >
          Submit another application
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-white/8 bg-surface p-6 md:p-8 space-y-5"
    >
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">
          Apply now
        </h3>
        <p className="text-sm text-text-2">
          Fill in your details. We&apos;ll be in touch.
        </p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-white/50 mb-1.5 block">
            Full name *
          </label>
          <input
            {...register("applicant_name")}
            className={inputClass(!!errors.applicant_name)}
          />
          {errors.applicant_name && (
            <p className="text-coral text-xs mt-1">
              {errors.applicant_name.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs text-white/50 mb-1.5 block">
            Email *
          </label>
          <input
            {...register("applicant_email")}
            className={inputClass(!!errors.applicant_email)}
          />
          {errors.applicant_email && (
            <p className="text-coral text-xs mt-1">
              {errors.applicant_email.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs text-white/50 mb-1.5 block">
            Phone *
          </label>
          <input
            {...register("phone")}
            className={inputClass(!!errors.phone)}
          />
          {errors.phone && (
            <p className="text-coral text-xs mt-1">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs text-white/50 mb-1.5 block">
            Position *
          </label>
          <select
            {...register("position")}
            className={inputClass(!!errors.position)}
            defaultValue=""
          >
            <option value="" disabled>
              Select role
            </option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>UI/UX Designer</option>
            <option>AI/ML Engineer</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-white/50 mb-1.5 block">
            Experience *
          </label>
          <select
            {...register("experience")}
            className={inputClass(!!errors.experience)}
            defaultValue=""
          >
            <option value="" disabled>
              Select level
            </option>
            <option>0–1 years</option>
            <option>1–3 years</option>
            <option>3–5 years</option>
            <option>5+ years</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-white/50 mb-1.5 block">
            Education *
          </label>
          <input
            {...register("education")}
            className={inputClass(!!errors.education)}
            placeholder="e.g. BS Computer Science"
          />
        </div>
      </div>

      {/* Optional */}
      <div>
        <label className="text-xs text-white/50 mb-1.5 block">
          Skills
        </label>
        <input
          {...register("skills")}
          className={inputClass()}
          placeholder="React, Node.js, Python..."
        />
      </div>

      <div>
        <label className="text-xs text-white/50 mb-1.5 block">
          Certifications
        </label>
        <input
          {...register("certifications")}
          className={inputClass()}
          placeholder="AWS, Google UX..."
        />
      </div>

      <div>
        <label className="text-xs text-white/50 mb-1.5 block">
          Cover Note *
        </label>
        <textarea
          {...register("cover_note")}
          rows={4}
          className={inputClass(!!errors.cover_note)}
        />
        {errors.cover_note && (
          <p className="text-coral text-xs mt-1">
            {errors.cover_note.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs text-white/50 mb-1.5 block">
          LinkedIn
        </label>
        <input {...register("linkedin")} className={inputClass()} />
      </div>

      <div>
        <label className="text-xs text-white/50 mb-1.5 block">
          Portfolio
        </label>
        <input {...register("portfolio")} className={inputClass()} />
      </div>

      {status === "error" && (
        <p className="text-coral text-sm text-center">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3.5 rounded-lg btn-primary text-white font-medium text-sm flex items-center justify-center gap-2"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          "Submit application →"
        )}
      </button>
    </form>
  );
}