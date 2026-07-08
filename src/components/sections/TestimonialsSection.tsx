'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Shield, Award, BookOpen, Heart } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { SectionPattern, GeometricMandala } from '@/components/premium/BackgroundPatterns';

/* ─── Trust Indicators Data ────────────────────────────────────── */
const trustIndicators = [
  { label: 'Legal Practice Council – Gauteng', icon: Shield },
  { label: 'Law Society of South Africa', icon: Award },
  { label: 'Pretoria Deeds Registry – Lodging Agent', icon: BookOpen },
  { label: 'National Wills Week Participant', icon: Heart },
];

/* ─── Animation Variants ───────────────────────────────────────── */
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ─── Star Rating Component ────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'fill-gold text-gold'
              : 'fill-transparent text-gold/30'
          }`}
        />
      ))}
    </div>
  );
}

/* ─── Testimonial Card ─────────────────────────────────────────── */
function TestimonialSlide({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div className="relative max-w-3xl mx-auto text-center px-4">
      {/* Large gold quotation mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <Quote className="w-14 h-14 md:w-16 md:h-16 text-gold/25 mx-auto" fill="currentColor" />
      </motion.div>

      {/* Quote text in elegant serif italic */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-serif text-lg sm:text-xl md:text-2xl italic text-charcoal/80 leading-relaxed mb-8"
      >
        &ldquo;{testimonial.content}&rdquo;
      </motion.blockquote>

      {/* Star rating */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-4"
      >
        <StarRating rating={testimonial.rating} />
      </motion.div>

      {/* Client name and role */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <p className="font-serif text-lg md:text-xl font-semibold text-charcoal">
          {testimonial.name}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {testimonial.role}
        </p>
      </motion.div>

      {/* Service badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4"
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold bg-gold/5 border border-gold/20 rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          {testimonial.service}
        </span>
      </motion.div>
    </div>
  );
}

/* ─── Navigation Dots ──────────────────────────────────────────── */
function NavigationDots({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`transition-all duration-300 rounded-full ${
            i === current
              ? 'w-8 h-2.5 bg-gold'
              : 'w-2.5 h-2.5 bg-gold/25 hover:bg-gold/50'
          }`}
          aria-label={`Go to testimonial ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ─── Google Reviews Placeholder ────────────────────────────────── */
function GoogleReviewsPlaceholder() {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 p-6 bg-white rounded-xl border border-gold/10 luxury-shadow"
    >
      {/* Google "G" logo placeholder */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-charcoal/5 flex items-center justify-center">
          <span className="text-xl font-bold text-charcoal/60">G</span>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <StarRating rating={5} />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Based on verified Google reviews
          </p>
        </div>
      </div>
      <div className="hidden sm:block w-px h-10 bg-gold/15" />
      <div className="text-center sm:text-left">
        <p className="text-2xl font-serif font-bold text-charcoal">5.0</p>
        <p className="text-xs text-muted-foreground">Average Rating</p>
      </div>
    </motion.div>
  );
}

/* ─── Testimonials Section ─────────────────────────────────────── */
export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-white overflow-hidden"
    >
      <SectionPattern pattern="artdeco" className="opacity-30" />
      <GeometricMandala className="-bottom-10 -left-10" size={180} opacity={0.02} />

      {/* Top edge gold line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-gold text-xs font-semibold uppercase tracking-luxury mb-4 font-cormorant">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-tight">
            What Our Clients Say
          </h2>
          {/* Gold accent line */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-gold/40" />
              <div className="w-2 h-2 rounded-full bg-gold" />
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-6">
            Trusted by families and businesses across Pretoria East
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gold/20 bg-white/80 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gold/20 bg-white/80 backdrop-blur-sm flex items-center justify-center text-gold hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial Carousel */}
          <div className="overflow-hidden py-8 md:py-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <TestimonialSlide testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <NavigationDots
            total={testimonials.length}
            current={currentIndex}
            onSelect={goToSlide}
          />
        </motion.div>

        {/* Google Reviews Placeholder */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          className="max-w-md mx-auto mt-12"
        >
          <GoogleReviewsPlaceholder />
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          className="mt-16"
        >
          <div className="elegant-divider mb-10" />

          <motion.p
            variants={fadeUpVariants}
            className="text-center text-xs uppercase tracking-luxury text-gold/70 mb-8 font-cormorant"
          >
            Affiliations & Accreditations
          </motion.p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {trustIndicators.map((indicator, i) => {
              const Icon = indicator.icon;
              return (
                <motion.div
                  key={indicator.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-gold/15 bg-gold/[0.03] hover:border-gold/35 hover:bg-gold/[0.07] transition-all duration-300 cursor-default">
                    <Icon className="w-3.5 h-3.5 text-gold/60 group-hover:text-gold transition-colors duration-300" />
                    <span className="text-xs font-medium text-charcoal/70 group-hover:text-charcoal transition-colors duration-300">
                      {indicator.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom edge gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
