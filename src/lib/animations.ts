import type { Transition, Variants } from 'motion/react';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

/** Motion oczekuje krotki czterech liczb, nie `number[]`. */
const EASE_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const TRANSITION = {
  fast: { duration: 0.3, ease: EASE_OUT },
  base: { duration: 0.5, ease: EASE_OUT },
  slow: { duration: 0.7, ease: EASE_OUT },
} satisfies Record<string, Transition>;

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION.base,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITION.base,
  },
};

export const fadeInScale: Variants = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion ? 1 : 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITION.base,
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: prefersReducedMotion ? 0 : -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITION.base,
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: prefersReducedMotion ? 0 : 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITION.base,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION.base,
  },
};
