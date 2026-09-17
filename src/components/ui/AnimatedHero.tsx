import { motion } from 'motion/react';
import { staggerItem } from '../../lib/animations';

export function AnimatedCheckmarks({ items }: { items: Array<{ icon: string; text: string }> }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.5,
          },
        },
      }}
      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm md:text-base text-gray-700"
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={staggerItem} className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-[var(--color-secondary-text)] flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="leading-tight font-medium">{item.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
