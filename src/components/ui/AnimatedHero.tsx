import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { fadeInUp, fadeInScale, staggerContainer, staggerItem, TRANSITION } from '../../lib/animations';

interface AnimatedHeroProps {
  title: string;
  titleHighlight: string;
  description: string;
  children?: React.ReactNode;
}

export default function AnimatedHero({ title, titleHighlight, description, children }: AnimatedHeroProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          style={{ marginBottom: '2.5rem' }}
        >
          {title} <span className="text-[var(--color-secondary)]">{titleHighlight}</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp}
          className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed"
          style={{ marginBottom: '3rem' }}
        >
          {description}
        </motion.p>
        
        <motion.div 
          variants={fadeInScale}
          className="flex flex-col sm:flex-row gap-6"
          style={{ marginBottom: '4rem' }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function AnimatedHeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      className="relative mx-auto w-full max-w-md lg:max-w-xl"
    >
      <div
        className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-[var(--color-primary)]/70 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_48px_-16px_rgba(180,150,120,0.45)] ring-1 ring-[var(--color-secondary)]/15">
        <img
          src={src}
          alt={alt}
          className="aspect-square w-full object-cover"
        />
      </div>
    </motion.div>
  );
}

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
            delayChildren: 0.5
          }
        }
      }}
      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm md:text-base text-gray-700"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={staggerItem}
          className="flex items-center gap-3"
        >
          <svg className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          <span className="leading-tight font-medium">{item.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
