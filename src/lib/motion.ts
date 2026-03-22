import type { Variants } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export const fadeInUpContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.16,
    },
  },
};

export const fadeInUpItem: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.95,
      ease: smoothEase,
    },
  },
};

export const fadeInScaleItem: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.76,
      ease: smoothEase,
    },
  },
};

export const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -12,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: smoothEase,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: {
      duration: 0.28,
      ease: smoothEase,
    },
  },
};
