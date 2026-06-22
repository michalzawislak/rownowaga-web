const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

export const TRANSITION = {
  fast: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  base: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
};

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: TRANSITION.base
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: TRANSITION.base
  }
};

export const fadeInScale = {
  hidden: { 
    opacity: 0, 
    scale: prefersReducedMotion ? 1 : 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: TRANSITION.base
  }
};

export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: prefersReducedMotion ? 0 : -30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: TRANSITION.base
  }
};

export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: prefersReducedMotion ? 0 : 30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: TRANSITION.base
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: TRANSITION.base
  }
};
