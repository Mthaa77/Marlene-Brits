'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

type DividerVariant = 'ribbon' | 'seal' | 'arch';
type DividerTone = 'light' | 'dark';

interface SectionDividerProps {
  variant?: DividerVariant;
  tone?: DividerTone;
  label?: string;
}

const easing = [0.22, 1, 0.36, 1] as const;

/**
 * A compact chapter marker used between major sections. Each motif is based on
 * the firm's visual language: a flowing route, a legal seal, or an architectural
 * arch. It is intentionally decorative so it never competes with the content.
 */
export default function SectionDivider({ variant = 'seal', tone = 'light', label }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();
  const animate = reduceMotion || inView;

  return (
    <div
      ref={ref}
      className={`section-divider section-divider--${variant} section-divider--${tone}`}
      role="presentation"
      aria-hidden={!label}
    >
      <motion.svg
        viewBox="0 0 1200 96"
        preserveAspectRatio="none"
        className="section-divider__art"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, ease: easing }}
      >
        <motion.path
          className="section-divider__line"
          d="M0 48 C180 48 212 48 320 48 C420 48 458 48 520 48"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.9, ease: easing }}
        />
        <motion.path
          className="section-divider__line"
          d="M680 48 C742 48 780 48 880 48 C988 48 1020 48 1200 48"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.9, ease: easing, delay: 0.08 }}
        />

        {variant === 'ribbon' && (
          <>
            <motion.path
              className="section-divider__ribbon"
              d="M250 48 C380 10 462 86 600 48 C738 10 820 86 950 48"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: 1.35, ease: easing, delay: 0.12 }}
            />
            <motion.circle
              className="section-divider__dot"
              cx="600"
              cy="48"
              r="4"
              initial={{ scale: 0, opacity: 0 }}
              animate={animate ? { scale: 1, opacity: 1 } : undefined}
              transition={{ duration: 0.45, ease: easing, delay: 0.72 }}
            />
          </>
        )}

        {variant === 'seal' && (
          <motion.g
            initial={{ scale: 0.72, opacity: 0, rotate: -12 }}
            animate={animate ? { scale: 1, opacity: 1, rotate: 0 } : undefined}
            transition={{ duration: 0.7, ease: easing, delay: 0.3 }}
            style={{ transformOrigin: '600px 48px' }}
          >
            <circle className="section-divider__seal" cx="600" cy="48" r="19" />
            <path className="section-divider__seal" d="M600 33 L614 48 L600 63 L586 48 Z" />
            <circle className="section-divider__dot" cx="600" cy="48" r="3" />
          </motion.g>
        )}

        {variant === 'arch' && (
          <motion.g
            initial={{ scaleX: 0.35, opacity: 0 }}
            animate={animate ? { scaleX: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.85, ease: easing, delay: 0.22 }}
            style={{ transformOrigin: '600px 48px' }}
          >
            <path className="section-divider__arch" d="M574 64 V46 C574 28 586 18 600 18 C614 18 626 28 626 46 V64" />
            <path className="section-divider__arch section-divider__arch--inner" d="M584 64 V48 C584 36 591 29 600 29 C609 29 616 36 616 48 V64" />
            <circle className="section-divider__dot" cx="600" cy="18" r="3" />
          </motion.g>
        )}
      </motion.svg>
      {label && <span className="section-divider__label">{label}</span>}
    </div>
  );
}
