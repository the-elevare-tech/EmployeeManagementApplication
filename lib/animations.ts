// export const fadeUp = {
//   hidden: { opacity: 0, y: 28 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } }
// };

// export const fadeIn = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { duration: 0.4 } }
// };

// export const scaleIn = {
//   hidden: { opacity: 0, scale: 0.94 },
//   show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } }
// };

// export const slideLeft = {
//   hidden: { opacity: 0, x: -32 },
//   show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
// };

// export const stagger = (delay = 0, staggerAmt = 0.08) => ({
//   hidden: {},
//   show: { transition: { staggerChildren: staggerAmt, delayChildren: delay } }
// });

// /** Alias — many components import this name */
// export const staggerContainer = stagger;
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -32,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const stagger = (
  delay = 0,
  staggerAmt = 0.08
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerAmt,
      delayChildren: delay,
    },
  },
});

/** Alias — many components import this name */
export const staggerContainer = stagger;