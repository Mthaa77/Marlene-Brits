'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, SkipForward } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   Onboarding Tour Configuration
   Each step targets a CSS selector and provides
   position + content for the tooltip.
   ═══════════════════════════════════════════════════════════ */
interface OnboardingStep {
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon?: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    target: '#home',
    title: 'Welcome to Marlene Brits Attorneys',
    description: 'Experience legal excellence with a practice built on dedication, trust, and personalised service. Let us show you around.',
    position: 'bottom',
  },
  {
    target: '[data-nav-menu]',
    title: 'Seamless Navigation',
    description: 'Explore our practice areas, meet our team, or book a consultation — all accessible from this elegant navigation bar.',
    position: 'bottom',
  },
  {
    target: '#services',
    title: 'Our Practice Areas',
    description: 'From conveyancing and estate administration to family law and notarial services — comprehensive legal expertise tailored to your needs.',
    position: 'top',
  },
  {
    target: '#team',
    title: 'Meet Our Founder',
    description: 'Marlene Brits, a qualified Attorney, Conveyancer, and Notary, brings a multi-disciplinary approach to every matter.',
    position: 'top',
  },
  {
    target: '#contact',
    title: 'Get In Touch',
    description: 'Ready to experience legal service where you are never just another client? Schedule a consultation today.',
    position: 'top',
  },
];

const STORAGE_KEY = 'mbritslaw_onboarding_completed';

/* ═══════════════════════════════════════════════════════════
   Onboarding Overlay Component
   ═══════════════════════════════════════════════════════════ */
export default function OnboardingOverlay() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Check if onboarding has been completed before
  useEffect(() => {
    try {
      const completed = localStorage.getItem(STORAGE_KEY);
      if (!completed) {
        // Delay showing until page is loaded
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 3500); // After preloader finishes
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  // Calculate spotlight position and tooltip placement
  const updatePosition = useCallback(() => {
    const step = ONBOARDING_STEPS[currentStep];
    if (!step) return;

    const targetEl = document.querySelector(step.target);
    if (!targetEl) return;

    const rect = targetEl.getBoundingClientRect();
    setSpotlightRect(rect);

    // Calculate tooltip position based on step.position
    const padding = 16;
    let x = 0;
    let y = 0;

    switch (step.position) {
      case 'bottom':
        x = rect.left + rect.width / 2;
        y = rect.bottom + padding;
        break;
      case 'top':
        x = rect.left + rect.width / 2;
        y = rect.top - padding;
        break;
      case 'left':
        x = rect.left - padding;
        y = rect.top + rect.height / 2;
        break;
      case 'right':
        x = rect.right + padding;
        y = rect.top + rect.height / 2;
        break;
    }

    // Clamp to viewport
    const tooltipWidth = 360;
    const tooltipHeight = 180;
    x = Math.max(tooltipWidth / 2 + 10, Math.min(x, window.innerWidth - tooltipWidth / 2 - 10));
    y = Math.max(10, Math.min(y, window.innerHeight - tooltipHeight - 10));

    setTooltipPos({ x, y });
  }, [currentStep]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [isVisible, updatePosition, currentStep]);

  // Keyboard navigation
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'Enter':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'Escape':
          handleSkip();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleNext = useCallback(() => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSkip();
    }
  }, [currentStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // localStorage not available
    }
  }, []);

  const step = ONBOARDING_STEPS[currentStep];
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;

  if (!isVisible || !step) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Dark overlay with cutout */}
          {spotlightRect && (
            <div
              className="onboarding-spotlight"
              style={{
                top: spotlightRect.top - 6,
                left: spotlightRect.left - 6,
                width: spotlightRect.width + 12,
                height: spotlightRect.height + 12,
                borderRadius: spotlightRect.width < 100 ? '50%' : '12px',
              }}
            />
          )}

          {/* Tooltip */}
          <motion.div
            ref={tooltipRef}
            className="onboarding-tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            key={currentStep}
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="bg-charcoal border border-gold/30 rounded-xl shadow-2xl p-5 max-w-[340px] w-full">
              {/* Gold accent line */}
              <div className="h-[2px] w-8 bg-gradient-to-r from-gold to-gold-light mb-4" />

              {/* Step indicator */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">
                  Step {currentStep + 1} of {ONBOARDING_STEPS.length}
                </span>
                <button
                  onClick={handleSkip}
                  className="flex items-center gap-1 text-white/30 hover:text-white/60 text-[10px] tracking-wider uppercase transition-colors"
                >
                  <SkipForward className="w-3 h-3" />
                  Skip
                </button>
              </div>

              {/* Title */}
              <h4 className="font-serif text-lg text-white font-semibold mb-2 leading-snug">
                {step.title}
              </h4>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Progress bar */}
              <div className="h-[2px] bg-white/10 rounded-full mb-4 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1 text-white/40 hover:text-white/70 text-xs tracking-wider uppercase transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 gold-gradient text-charcoal-dark text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-sm hover:shadow-lg hover:shadow-gold/20 transition-all duration-300"
                >
                  {currentStep === ONBOARDING_STEPS.length - 1 ? 'Get Started' : 'Next'}
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={handleSkip}
                className="absolute top-3 right-3 text-white/20 hover:text-white/50 transition-colors"
                aria-label="Close onboarding tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
