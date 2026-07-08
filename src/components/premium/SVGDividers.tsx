'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/* ─────────────────────────────────────────────
   GoldWaveDivider
   A flowing wave SVG in gold that creates an
   elegant transition between light & dark sections.
   Subtle path-draw animation on scroll.
   ───────────────────────────────────────────── */
export function GoldWaveDivider({ flip = false }: { flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="relative w-full overflow-hidden leading-[0] select-none" style={{ transform: flip ? 'scaleY(-1)' : undefined }}>
      <motion.svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[60px] md:h-[80px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wave path – subtle animated draw-in */}
        <motion.path
          d="M0,60 C240,10 480,110 720,60 C960,10 1200,110 1440,60 L1440,120 L0,120 Z"
          fill="var(--charcoal-dark)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        <motion.path
          d="M0,60 C240,10 480,110 720,60 C960,10 1200,110 1440,60"
          stroke="var(--gold)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Second thinner wave for depth */}
        <motion.path
          d="M0,70 C200,30 500,100 720,65 C940,30 1240,100 1440,70"
          stroke="var(--gold)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
          transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        />
        {/* Decorative gold dots at wave peaks */}
        <motion.circle cx="720" cy="60" r="3" fill="var(--gold)" initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 0.7 } : {}} transition={{ duration: 0.5, delay: 1.8 }} />
        <motion.circle cx="360" cy="35" r="2" fill="var(--gold)" initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 0.4 } : {}} transition={{ duration: 0.5, delay: 2.0 }} />
        <motion.circle cx="1080" cy="35" r="2" fill="var(--gold)" initial={{ scale: 0, opacity: 0 }} animate={isInView ? { scale: 1, opacity: 0.4 } : {}} transition={{ duration: 0.5, delay: 2.2 }} />
      </motion.svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ElegantLineDivider
   Horizontal line with central ornament (diamond/
   shield in gold). Line draws from center outward
   on scroll.
   ───────────────────────────────────────────── */
export function ElegantLineDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative w-full flex items-center justify-center py-8 md:py-12">
      {/* Left line – draws from center outward */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent to-[var(--gold)]"
        initial={{ width: 0 }}
        animate={isInView ? { width: '35%' } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      {/* Central ornament – diamond with inner shield */}
      <motion.div
        className="relative flex items-center justify-center px-3 md:px-5"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[48px] md:h-[48px]">
          {/* Outer diamond */}
          <path d="M20 2 L38 20 L20 38 L2 20 Z" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
          {/* Inner shield */}
          <path d="M20 8 L31 17 L20 32 L9 17 Z" stroke="var(--gold)" strokeWidth="1" fill="var(--gold)" fillOpacity="0.08" />
          {/* Central dot */}
          <circle cx="20" cy="18" r="2.5" fill="var(--gold)" />
          {/* Top and bottom serif lines */}
          <line x1="20" y1="2" x2="20" y2="6" stroke="var(--gold)" strokeWidth="1" />
          <line x1="20" y1="34" x2="20" y2="38" stroke="var(--gold)" strokeWidth="1" />
        </svg>
      </motion.div>
      {/* Right line – draws from center outward */}
      <motion.div
        className="h-px bg-gradient-to-l from-transparent to-[var(--gold)]"
        initial={{ width: 0 }}
        animate={isInView ? { width: '35%' } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   ParallaxQuoteSection
   Full-width parallax section with dark bg,
   gold quotation mark, legal quote, attribution,
   grain texture, and scroll-triggered reveal.
   ───────────────────────────────────────────── */
export function ParallaxQuoteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-20 md:py-32"
      style={{ backgroundColor: '#0d0d1a' }}
    >
      {/* Parallax background layer with grain */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />
        {/* Subtle radial gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--gold)]/[0.04] blur-[120px]" />
      </motion.div>

      {/* Gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--gold)]"
            style={{
              left: `${8 + i * 8}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: [0, 0.6, 0], y: -40 } : {}}
            transition={{
              duration: 3 + i * 0.4,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center"
        style={{ y: textY, opacity: quoteOpacity }}
      >
        {/* Large gold quotation mark */}
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <svg
            width="80"
            height="60"
            viewBox="0 0 80 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto md:w-[100px] md:h-[75px]"
          >
            <motion.path
              d="M0 60V36C0 16.1182 16.1182 0 36 0H40V24H36C29.3726 24 24 29.3726 24 36V60H0Z"
              fill="var(--gold)"
              fillOpacity="0.25"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            />
            <motion.path
              d="M40 60V36C40 16.1182 56.1182 0 76 0H80V24H76C69.3726 24 64 29.3726 64 36V60H40Z"
              fill="var(--gold)"
              fillOpacity="0.25"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        {/* Quote text */}
        <motion.blockquote
          className="font-serif text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed md:leading-relaxed lg:leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          &ldquo;Justice is the firm and continuous desire to render to everyone that which is due&rdquo;
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          className="mt-6 md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
        >
          <div className="elegant-divider-dark w-16 mx-auto mb-4" />
          <cite className="not-italic text-[var(--gold)] text-sm md:text-base tracking-[0.15em] uppercase font-medium">
            Justinian I
          </cite>
          <p className="text-white/40 text-xs md:text-sm mt-1 tracking-wide">
            Corpus Juris Civilis
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   GoldCornerOrnament
   Decorative gold corner piece placed at corners
   of sections. Takes position prop.
   ───────────────────────────────────────────── */
interface GoldCornerOrnamentProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
}

export function GoldCornerOrnament({ position, size = 60 }: GoldCornerOrnamentProps) {
  const positionClasses: Record<string, string> = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  };

  return (
    <div className={`absolute ${positionClasses[position]} pointer-events-none select-none`} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Corner bracket lines */}
        <path d="M0 60 L0 8 Q0 0 8 0 L60 0" stroke="var(--gold)" strokeWidth="1" fill="none" />
        {/* Inner decorative line */}
        <path d="M0 48 L0 14 Q0 6 8 6 L48 6" stroke="var(--gold)" strokeWidth="0.5" fill="none" opacity="0.5" />
        {/* Small diamond at corner */}
        <path d="M4 12 L8 8 L12 12 L8 16 Z" fill="var(--gold)" fillOpacity="0.3" stroke="var(--gold)" strokeWidth="0.5" />
        {/* Dot accent */}
        <circle cx="6" cy="24" r="1" fill="var(--gold)" fillOpacity="0.5" />
        <circle cx="24" cy="6" r="1" fill="var(--gold)" fillOpacity="0.5" />
      </svg>
    </div>
  );
}
