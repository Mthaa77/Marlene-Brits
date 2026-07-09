'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimation, useInView } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Heart,
  Quote,
  Shield,
  Sparkles,
  Star,
} from 'lucide-react';
import { testimonials } from '@/data/testimonials';

const trustIndicators = [
  { label: 'Legal Practice Council – Gauteng', icon: Shield },
  { label: 'Law Society of South Africa', icon: Award },
  { label: 'Pretoria Deeds Registry – Lodging Agent', icon: BookOpen },
  { label: 'National Wills Week Participant', icon: Heart },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.97,
    filter: 'blur(8px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.97,
    filter: 'blur(8px)',
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  }),
};

function StarRating({ rating, compact = false }: { rating: number; compact?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`${compact ? 'h-3.5 w-3.5' : 'h-4 w-4 sm:h-5 sm:w-5'} ${
            index < rating ? 'fill-gold text-gold drop-shadow-[0_0_10px_rgba(214,165,96,0.35)]' : 'text-gold/25'
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialSpotlight({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border border-gold/24 bg-[linear-gradient(145deg,rgba(255,255,255,0.13),rgba(255,255,255,0.045))] p-5 shadow-[0_42px_140px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:p-8 lg:p-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="absolute -left-24 top-4 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/6 blur-3xl" />
      <Quote className="absolute right-8 top-8 h-24 w-24 text-gold/[0.06] sm:h-32 sm:w-32" fill="currentColor" />

      <div className="relative grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <div className="relative rounded-[1.75rem] border border-gold/18 bg-[#071020]/62 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <div className="absolute inset-3 rounded-[1.25rem] border border-gold/12" />
          <div className="relative">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold text-[#071020] shadow-[0_20px_55px_rgba(214,165,96,0.28)]">
              <BadgeCheck className="h-7 w-7" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/80">Verified Client Experience</p>
            <h3 className="mt-3 font-serif-optical text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Trusted legal care with a personal touch.
            </h3>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-serif-optical text-3xl font-semibold text-white">5.0</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/42">Client rating</p>
                </div>
                <StarRating rating={5} compact />
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <StarRating rating={testimonial.rating} />
            <span className="rounded-full border border-gold/18 bg-gold/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/82">
              {testimonial.service}
            </span>
          </div>

          <blockquote className="font-serif-optical text-[clamp(1.55rem,4vw,3.2rem)] font-medium italic leading-[1.18] tracking-[-0.045em] text-white">
            “{testimonial.content}”
          </blockquote>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif-optical text-2xl font-semibold text-white">{testimonial.name}</p>
              <p className="mt-1 text-sm text-white/50">{testimonial.role}</p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-gold/18 bg-gold/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/82">
              <Shield className="h-3.5 w-3.5" />
              Confidential & Professional
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniReviewCard({
  testimonial,
  index,
  active,
  onSelect,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative rounded-[1.5rem] border p-4 text-left transition-all duration-300 ${
        active
          ? 'border-gold/42 bg-gold/12 shadow-[0_20px_65px_rgba(214,165,96,0.14)]'
          : 'border-white/10 bg-white/[0.045] hover:border-gold/28 hover:bg-white/[0.07]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-serif-optical text-lg font-semibold text-white">{testimonial.name}</p>
          <p className="mt-1 text-xs text-white/44">{testimonial.service}</p>
        </div>
        <span className="text-[10px] font-semibold text-gold/58">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/54">{testimonial.content}</p>
      <div className="mt-4 flex items-center justify-between">
        <StarRating rating={testimonial.rating} compact />
        <ArrowRight className="h-4 w-4 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
      </div>
    </motion.button>
  );
}

function TrustIndicators() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {trustIndicators.map((indicator, index) => {
        const Icon = indicator.icon;
        return (
          <motion.div
            key={indicator.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="group rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/[0.075]"
          >
            <Icon className="mb-4 h-5 w-5 text-gold" />
            <p className="text-sm font-medium leading-6 text-white/66 group-hover:text-white/82">{indicator.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [controls, isInView]);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((current) => (current + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((current) => (current + 1) % testimonials.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050814] py-20 text-white sm:py-28 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(214,165,96,0.2),transparent_26rem),radial-gradient(circle_at_84%_28%,rgba(255,255,255,0.08),transparent_24rem),linear-gradient(135deg,#050814,#0d1425_54%,#050814)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="absolute -left-28 top-1/4 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -right-28 bottom-1/4 h-80 w-80 rounded-full bg-white/6 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={controls}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-18"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-gold/22 bg-gold/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/85 shadow-[0_14px_40px_rgba(214,165,96,0.10)] backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Client Testimonials
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif-optical text-[clamp(2.75rem,8vw,5.65rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white"
          >
            Proof of Trust,
            <span className="block bg-gradient-to-r from-[#f4d79b] via-[#c58a44] to-[#f8e5bd] bg-clip-text text-transparent">
              Told by Clients.
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
            A refined legal experience should feel professional, personal, and reassuring. These stories highlight the care behind the work.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          <div className="absolute -left-3 top-1/2 z-20 hidden -translate-y-1/2 md:block">
            <button
              onClick={goPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/22 bg-[#071020]/78 text-gold shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:bg-gold hover:text-[#071020]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 md:block">
            <button
              onClick={goNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/22 bg-[#071020]/78 text-gold shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:bg-gold hover:text-[#071020]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-hidden px-0 py-2 md:px-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <TestimonialSpotlight testimonial={testimonials[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
            <button
              onClick={goPrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/22 bg-white/[0.055] text-gold"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/22 bg-white/[0.055] text-gold"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <MiniReviewCard
              key={`${testimonial.name}-${testimonial.service}`}
              testimonial={testimonial}
              index={index}
              active={currentIndex === index}
              onSelect={() => goTo(index)}
            />
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          className="mt-14 rounded-[2rem] border border-gold/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.1),rgba(255,255,255,0.035))] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:p-7"
        >
          <div className="mb-7 flex flex-col gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/80">Affiliations & Accreditations</p>
              <h3 className="mt-2 font-serif-optical text-3xl font-semibold text-white sm:text-4xl">Professional Trust Markers</h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/52">
              Additional trust signals that support the firm’s positioning as a serious, professional Pretoria East legal practice.
            </p>
          </div>
          <TrustIndicators />
        </motion.div>
      </div>
    </section>
  );
}
