'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
  type Variants,
} from 'framer-motion';
import { MessageSquare, Target, Cog, CheckCircle, type LucideIcon } from 'lucide-react';
import { company } from '@/data/company';
import { SectionPattern, GeometricMandala } from '@/components/premium/BackgroundPatterns';

/* ─── Icon Map ────────────────────────────────────────────────── */
const stepIcons: LucideIcon[] = [MessageSquare, Target, Cog, CheckCircle];

/* ─── Animation Variants ──────────────────────────────────────── */
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const circleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: { duration: 0.25 },
  },
};

/* ─── Connecting Line (Desktop Horizontal) ────────────────────── */
function HorizontalConnector({
  active,
  delay,
}: {
  active: boolean;
  delay: number;
}) {
  return (
    <div className="hidden md:flex items-center flex-1 h-[2px] mx-2 relative">
      {/* Background line */}
      <div className="absolute inset-0 bg-white/10 rounded-full" />
      {/* Animated gold fill */}
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
        }}
        initial={{ width: '0%' }}
        animate={{ width: active ? '100%' : '0%' }}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

/* ─── Connecting Line (Mobile Vertical) ───────────────────────── */
function VerticalConnector({
  active,
  delay,
}: {
  active: boolean;
  delay: number;
}) {
  return (
    <div className="flex md:hidden items-center justify-center w-[2px] h-12 my-1 relative mx-auto">
      {/* Background line */}
      <div className="absolute inset-0 bg-white/10 rounded-full" />
      {/* Animated gold fill */}
      <motion.div
        className="absolute top-0 left-0 w-full rounded-full"
        style={{
          background: 'linear-gradient(180deg, var(--gold), var(--gold-light))',
        }}
        initial={{ height: '0%' }}
        animate={{ height: active ? '100%' : '0%' }}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

/* ─── Step Circle Component ───────────────────────────────────── */
function StepCircle({
  step,
  index,
  isActive,
  isHovered,
  onHover,
  onLeave,
  inView,
}: {
  step: (typeof company.process)[number];
  index: number;
  isActive: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  inView: boolean;
}) {
  const Icon = stepIcons[index];
  const filled = isActive || isHovered;

  return (
    <motion.div
      variants={circleVariants}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onHover}
      className="flex flex-col items-center cursor-pointer group"
    >
      {/* Circle */}
      <motion.div
        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-500"
        style={{
          background: filled
            ? 'linear-gradient(135deg, var(--gold), var(--gold-light))'
            : 'var(--charcoal-dark)',
          boxShadow: filled
            ? '0 0 30px rgba(184, 137, 86, 0.3), 0 0 60px rgba(184, 137, 86, 0.1)'
            : 'none',
          border: `2px solid ${filled ? 'var(--gold-light)' : 'var(--gold)'}`,
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Step number */}
        <span
          className={`font-serif text-xl sm:text-2xl font-bold transition-colors duration-500 ${
            filled ? 'text-charcoal-dark' : 'text-gold'
          }`}
        >
          {step.step}
        </span>

        {/* Subtle pulse ring when active */}
        {filled && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gold/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>

      {/* Title */}
      <h3
        className={`font-serif text-sm sm:text-base mt-3 text-center transition-colors duration-500 max-w-[120px] sm:max-w-[160px] ${
          filled ? 'text-gold' : 'text-white/80'
        }`}
      >
        {step.title}
      </h3>

      {/* Description (brief) */}
      <p
        className={`text-xs sm:text-sm mt-1 text-center max-w-[120px] sm:max-w-[180px] leading-relaxed transition-colors duration-500 ${
          filled ? 'text-white/70' : 'text-white/40'
        }`}
      >
        {step.description}
      </p>
    </motion.div>
  );
}

/* ─── Detail Card Component ───────────────────────────────────── */
function DetailCard({
  step,
  index,
}: {
  step: (typeof company.process)[number];
  index: number;
}) {
  const Icon = stepIcons[index];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative glass rounded-xl overflow-hidden p-6 sm:p-8 max-w-lg mx-auto"
    >
      {/* Gold top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient" />

      {/* Gold corner accents */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-gold/30 rounded-tl" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-gold/30 rounded-br" />

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-gold" />
        </div>

        <div className="flex-1">
          {/* Step badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 px-2.5 py-1 rounded-full">
              Step {step.step}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-serif text-lg sm:text-xl text-white font-semibold mb-3">
            {step.title}
          </h4>

          {/* Expanded description */}
          <p className="text-white/60 text-sm leading-relaxed">
            {step.description}
          </p>

          {/* Additional context based on step */}
          {index === 0 && (
            <p className="text-white/40 text-xs mt-3 leading-relaxed">
              We take the time to listen carefully, understand your unique
              circumstances, and provide an honest assessment of your legal
              matter — no obligation, no pressure.
            </p>
          )}
          {index === 1 && (
            <p className="text-white/40 text-xs mt-3 leading-relaxed">
              You will receive a clear roadmap with defined milestones,
              transparent cost estimates, and realistic timelines so you always
              know what to expect.
            </p>
          )}
          {index === 2 && (
            <p className="text-white/40 text-xs mt-3 leading-relaxed">
              Every document is prepared with precision, every deadline is met,
              and you are kept informed at every critical juncture of your
              matter.
            </p>
          )}
          {index === 3 && (
            <p className="text-white/40 text-xs mt-3 leading-relaxed">
              Our commitment does not end at resolution. We ensure all
              documentation is properly finalised and remain available for any
              follow-up needs.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Process Section ─────────────────────────────────────────── */
export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const controls = useAnimation();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Auto-cycle through steps when in view
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % company.process.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView]);

  const displayStep = hoveredStep !== null ? hoveredStep : activeStep;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-32 bg-charcoal overflow-hidden"
    >
      {/* Background decorative elements */}
      <SectionPattern pattern="dots" className="opacity-30" />
      <GeometricMandala className="-top-10 -left-10" size={200} opacity={0.015} />
      <GeometricMandala className="-bottom-10 -right-10" size={160} opacity={0.01} />

      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block text-xs tracking-luxury uppercase text-gold/80 mb-4 font-cormorant">
            How We Work
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Our Process
          </h2>
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-gold/40" />
              <div className="w-2 h-2 rounded-full bg-gold" />
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>
          </div>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            A structured approach to achieving your legal goals
          </p>
        </motion.div>

        {/* Process Visualization — Desktop (Horizontal) */}
        <div className="hidden md:flex items-start justify-center gap-0">
          {company.process.map((step, i) => (
            <div key={step.step} className="flex items-start flex-1">
              <StepCircle
                step={step}
                index={i}
                isActive={activeStep === i}
                isHovered={hoveredStep === i}
                onHover={() => setHoveredStep(i)}
                onLeave={() => setHoveredStep(null)}
                inView={isInView}
              />
              {i < company.process.length - 1 && (
                <HorizontalConnector
                  active={activeStep >= i + 1 || (hoveredStep !== null && hoveredStep >= i + 1)}
                  delay={i * 0.3}
                />
              )}
            </div>
          ))}
        </div>

        {/* Process Visualization — Mobile (Vertical) */}
        <div className="flex md:hidden flex-col items-center">
          {company.process.map((step, i) => (
            <div key={step.step}>
              <StepCircle
                step={step}
                index={i}
                isActive={activeStep === i}
                isHovered={hoveredStep === i}
                onHover={() => setHoveredStep(i)}
                onLeave={() => setHoveredStep(null)}
                inView={isInView}
              />
              {i < company.process.length - 1 && (
                <VerticalConnector
                  active={activeStep >= i + 1 || (hoveredStep !== null && hoveredStep >= i + 1)}
                  delay={i * 0.3}
                />
              )}
            </div>
          ))}
        </div>

        {/* Detail Cards */}
        <div className="mt-12 sm:mt-16 relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <DetailCard
              key={displayStep}
              step={company.process[displayStep]}
              index={displayStep}
            />
          </AnimatePresence>
        </div>

        {/* Step indicators (mobile dots) */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {company.process.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                displayStep === i
                  ? 'bg-gold w-6'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
