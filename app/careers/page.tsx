// "use client";

// import { motion } from "framer-motion";
// import { fadeUp, stagger } from "@/lib/animations";
// import { CultureGrid } from "@/components/careers/CultureGrid";
// import { ApplicationProcess } from "@/components/careers/ApplicationProcess";
// import { ApplicationForm } from "@/components/careers/ApplicationForm";

// export default function CareersPage() {
//   return (
//     <>
//       <section className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto text-center">
//         <motion.div initial="hidden" animate="show" variants={stagger(0, 0.1)}>
//           <motion.div variants={fadeUp} className="text-label mb-6">
//             Join us
//           </motion.div>
//           <motion.h1 variants={fadeUp} className="text-white mb-6 max-w-4xl mx-auto">
//             Build real things with a passionate team
//           </motion.h1>
//           <motion.p variants={fadeUp} className="text-text-2 text-lg md:text-xl max-w-3xl mx-auto">
//             We&apos;re a young, ambitious company that ships real products for real clients. If you care deeply about your craft, we&apos;d love to meet you.
//           </motion.p>
//         </motion.div>
//       </section>

//       <CultureGrid />

//       <section className="py-24 border-t border-border bg-surface-2/20">
//         <div className="max-w-3xl mx-auto px-6 lg:px-12">
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: "-50px" }}
//             variants={fadeUp}
//             className="text-center mb-10"
//           >
//             <h2 className="text-white mb-3">Open applications</h2>
//             <p className="text-text-2 text-sm">
//               No fixed roles open right now — but great people are always welcome. Submit your application below.
//             </p>
//           </motion.div>

//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, margin: "-50px" }}
//             variants={fadeUp}
//           >
//             <ApplicationForm />
//           </motion.div>
//         </div>
//       </section>

//       <ApplicationProcess />
//     </>
//   );
// }
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animations";
import { CultureGrid } from "@/components/careers/CultureGrid";
import { ApplicationProcess } from "@/components/careers/ApplicationProcess";
import { ApplicationForm } from "@/components/careers/ApplicationForm";

export default function CareersPage() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <motion.div initial="hidden" animate="show" variants={stagger(0, 0.1)}>
          <motion.div variants={fadeUp} className="text-label mb-6">
            Join us
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-white mb-6 max-w-4xl mx-auto">
            Build real things with a passionate team
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-text-2 text-lg md:text-xl max-w-3xl mx-auto"
          >
            We&apos;re a young, ambitious company that ships real products for
            real clients. If you care deeply about your craft, we&apos;d love to
            meet you.
          </motion.p>
        </motion.div>
      </section>

      {/* Culture grid — unchanged */}
      <CultureGrid />

      {/* Open applications */}
      <section className="py-24 border-t border-border bg-surface-2/20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <h2 className="text-white mb-3">Open applications</h2>
            <p className="text-text-2 text-sm mb-8">
              No fixed roles open right now — but great people are always
              welcome.
            </p>

            {/* Button — hidden when form is open */}
            <AnimatePresence>
              {!formOpen && (
                <motion.button
                  key="apply-btn"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setFormOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg btn-primary text-white text-sm font-medium"
                >
                  Send an open application →
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Form — slides down when open */}
          <AnimatePresence>
            {formOpen && (
              <motion.div
                key="application-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {/* Cancel button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setFormOpen(false)}
                    className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5"
                  >
                    ✕ Cancel
                  </button>
                </div>

                <ApplicationForm />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Application process — unchanged */}
      <ApplicationProcess />
    </>
  );
}