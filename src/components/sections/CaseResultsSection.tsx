'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useAnimation,
  type Variants,
} from 'framer-motion';
import {
  Building2,
  Shield,
  Heart,
  FileText,
  ChevronRight,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { caseResults } from '@/data/caseResults';
import { SectionPattern, GeometricMandala } from '@/components/premium/BackgroundPatterns';

/* ─── Icon Map ─────────────────────────────────────────────────── */
const iconMap: Record<string, typeof Building2> = {
  Building2,
  Shield,
  Heart,
  FileText,
};

/* ─── Animation Variants ───────────────────────────────────────── */
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Case Result Card ─────────────────────────────────────────── */
function CaseResultCard({
  result,
  index,
}: {
  result: (typeof caseResults)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();
  const Icon = iconMap[result.icon] || Building2;

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      custom={index}
      className="group relative bg-white border border-gold/10 rounded-lg overflow-hidden transition-all duration-500 hover:border-gold/40 hover:shadow-xl hover:shadow-gold/8 hover:-translate-y-1"
    >
      {/* Gold top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Gold corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/20 rounded-tl-lg group-hover:border-gold/50 transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/20 rounded-br-lg group-hover:border-gold/50 transition-colors duration-500" />

      <div className="p-6 sm:p-8">
        {/* Category badge + Icon row */}
        <div className="flex items-center justify-between mb-5">
          <span className="inline-flex items-center text-[11px] font-semibold tracking-[0.2em] uppercase text-gold bg-gold/8 border border-gold/15 rounded-full px-3.5 py-1">
            {result.category}
          </span>
          <div className="w-11 h-11 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-500">
            <Icon className="w-5 h-5 text-gold" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mb-3 leading-snug group-hover:text-charcoal/90 transition-colors duration-300">
          {result.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
          {result.description}
        </p>

        {/* Outcome */}
        <div className="relative pl-4 mb-6">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/60 to-gold/20 rounded-full" />
          <p className="text-sm italic text-gold font-medium leading-relaxed">
            {result.outcome}
          </p>
        </div>

        {/* Metric */}
        <div className="border-t border-gold/10 pt-5 group-hover:border-gold/20 transition-colors duration-500">
          <div className="flex items-end gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-charcoal tracking-tight leading-none">
              {result.metric}
            </span>
          </div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-1 block">
            {result.metricLabel}
          </span>
        </div>

        {/* Hover reveal — subtle arrow */}
        <div className="mt-4 flex items-center gap-1.5 text-gold text-sm font-medium opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
          <span>View details</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Case Results Section ─────────────────────────────────────── */
export default function CaseResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#f7f5f2' }}
    >
      <SectionPattern pattern="lines" className="opacity-30" />
      <GeometricMandala className="-top-10 -right-10" size={180} opacity={0.015} />

      {/* Top edge gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span
            className="inline-block text-xs tracking-luxury uppercase text-gold/80 mb-4 font-cormorant"
            variants={fadeUpVariants}
          >
            Success Stories
          </motion.span>
          <motion.h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal"
            variants={fadeUpVariants}
          >
            Proven Results
          </motion.h2>
          <motion.div
            className="flex justify-center mt-6"
            variants={fadeUpVariants}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-gold/40" />
              <div className="w-2 h-2 rounded-full bg-gold" />
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>
          </motion.div>
          <motion.p
            className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed"
            variants={fadeUpVariants}
          >
            Real outcomes for real clients across Pretoria East
          </motion.p>
        </motion.div>

        {/* Case Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {caseResults.map((result, i) => (
            <CaseResultCard key={result.title} result={result} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="elegant-divider mb-10" />
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto leading-relaxed">
            Every case is unique. Let us discuss how we can help you.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal-light text-white font-semibold px-8 py-4 rounded-sm transition-all duration-300 text-sm sm:text-base group"
          >
            <Calendar className="w-4 h-4" />
            Book Consultation
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>

      {/* Bottom edge gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
