'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimation, useInView, type Variants } from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileSignature,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { company } from '@/data/company';

const processIcons: LucideIcon[] = [MessageSquareText, Target, FileSignature, CheckCircle2];

const stepDetails = [
  {
    eyebrow: 'Discovery & clarity',
    outcome: 'Your matter is understood properly before advice is given.',
    note: 'We listen carefully, collect the key facts, identify risk areas, and explain the practical legal route in plain language.',
    micro: ['Matter assessment', 'Document checklist', 'Expectation setting'],
  },
  {
    eyebrow: 'Legal roadmap',
    outcome: 'You know the timeline, costs, milestones, and next steps.',
    note: 'A structured plan gives you confidence and prevents confusion. You get transparent guidance before the work begins.',
    micro: ['Defined milestones', 'Cost guidance', 'Clear responsibilities'],
  },
  {
    eyebrow: 'Precision execution',
    outcome: 'Documents, filings, transfers, and communications are handled with care.',
    note: 'Every detail matters. We manage the legal administration, deadlines, correspondence, and technical requirements with discipline.',
    micro: ['Document preparation', 'Registry/court/admin handling', 'Client updates'],
  },
  {
    eyebrow: 'Resolution & support',
    outcome: 'Your matter is finalised with proper closing records and guidance.',
    note: 'The process ends with certainty. We make sure the matter is properly closed and that you understand any follow-up obligations.',
    micro: ['Final confirmation', 'Record keeping', 'After-service support'],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

function GoldRail({ activeIndex }: { activeIndex: number }) {
  const progress = ((activeIndex + 1) / company.process.length) * 100;

  return (
    <div className="relative hidden h-2 w-full overflow-hidden rounded-full border border-gold/20 bg-white/[0.06] lg:block">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#8d5e2d,#d6a560,#f5ddad)] shadow-[0_0_30px_rgba(214,165,96,0.45)]"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)] opacity-40" />
    </div>
  );
}

function ProcessOrb({
  step,
  index,
  active,
  onSelect,
}: {
  step: (typeof company.process)[number];
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = processIcons[index] || ShieldCheck;

  return (
    <motion.button
      type="button"
      variants={fadeUp}
      onClick={onSelect}
      onMouseEnter={onSelect}
      className={`group relative flex w-full flex-col items-start rounded-[1.4rem] border p-5 text-left transition-all duration-500 lg:min-h-[260px] ${
        active
          ? 'border-gold/45 bg-white/[0.10] shadow-[0_30px_90px_rgba(214,165,96,0.14)]'
          : 'border-white/10 bg-white/[0.045] hover:border-gold/28 hover:bg-white/[0.07]'
      }`}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
    >
      <span className="absolute right-4 top-4 font-serif-optical text-5xl font-bold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-gold/[0.08]">
        0{index + 1}
      </span>

      <span
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500 ${
          active
            ? 'border-gold/60 bg-[linear-gradient(135deg,#f4d79b,#c58a44)] text-[#071020] shadow-[0_18px_48px_rgba(214,165,96,0.28)]'
            : 'border-gold/20 bg-gold/10 text-gold'
        }`}
      >
        <Icon className="h-6 w-6" />
      </span>

      <span className="mb-3 inline-flex rounded-full border border-gold/18 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/85">
        {processDetailsEyebrow(index)}
      </span>

      <h3 className="font-serif-optical text-2xl font-semibold leading-tight text-white">
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/56">
        {step.description}
      </p>

      <span className="mt-auto flex items-center gap-2 pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gold/80">
        Explore step <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </motion.button>
  );
}

function processDetailsEyebrow(index: number) {
  return stepDetails[index]?.eyebrow || 'Legal step';
}

function DetailPanel({ activeIndex }: { activeIndex: number }) {
  const step = company.process[activeIndex];
  const details = stepDetails[activeIndex];
  const Icon = processIcons[activeIndex] || ShieldCheck;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.985 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.045))] p-6 shadow-[0_40px_130px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-8"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/12 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/6 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-[#071020] shadow-[0_18px_45px_rgba(214,165,96,0.3)]">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/80">
                  Step {step.step} · {details.eyebrow}
                </p>
                <h4 className="font-serif-optical text-3xl font-semibold text-white sm:text-4xl">
                  {step.title}
                </h4>
              </div>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-white/76">
              {details.outcome}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/54">
              {details.note}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[42%] lg:grid-cols-1">
            {details.micro.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3"
              >
                <ClipboardCheck className="h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm font-medium text-white/72">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.18 });
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (isInView) controls.start('visible');
  }, [controls, isInView]);

  useEffect(() => {
    if (!isInView || manual) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % company.process.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isInView, manual]);

  const completionLabel = useMemo(() => `${activeIndex + 1}/${company.process.length}`, [activeIndex]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050814] py-20 text-white sm:py-28 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(214,165,96,0.18),transparent_28rem),radial-gradient(circle_at_84%_26%,rgba(255,255,255,0.08),transparent_24rem),linear-gradient(135deg,#080d1d,#050814_58%,#111827)]" />
      <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={controls}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-18"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/85"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Ultra Premium Client Journey
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif-optical text-[clamp(2.7rem,8vw,5.7rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white"
          >
            Our Process,
            <span className="block bg-gradient-to-r from-[#f4d79b] via-[#c58a44] to-[#f8e3b3] bg-clip-text text-transparent">
              Built Around Certainty.
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
            A refined, transparent legal journey designed to keep every client informed, protected, and confident from first consultation to final resolution.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={controls}
          className="mb-8 grid gap-3 rounded-[1.75rem] border border-gold/18 bg-white/[0.045] p-4 shadow-[0_28px_100px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:grid-cols-3 sm:p-5"
        >
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.045] px-4 py-3">
            <CalendarCheck className="h-5 w-5 text-gold" />
            <span className="text-sm text-white/70">Clear milestones</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.045] px-4 py-3">
            <Clock3 className="h-5 w-5 text-gold" />
            <span className="text-sm text-white/70">Reliable timelines</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-white/[0.045] px-4 py-3">
            <ShieldCheck className="h-5 w-5 text-gold" />
            <span className="text-sm text-white/70">Protected decisions</span>
          </div>
        </motion.div>

        <div className="mb-10 flex items-center gap-4">
          <GoldRail activeIndex={activeIndex} />
          <span className="hidden rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold/80 lg:inline-flex">
            {completionLabel}
          </span>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={controls}
          className="grid gap-5 lg:grid-cols-4"
        >
          {company.process.map((step, index) => (
            <ProcessOrb
              key={step.step}
              step={step}
              index={index}
              active={activeIndex === index}
              onSelect={() => {
                setActiveIndex(index);
                setManual(true);
              }}
            />
          ))}
        </motion.div>

        <div className="mt-8 sm:mt-10">
          <DetailPanel activeIndex={activeIndex} />
        </div>
      </div>
    </section>
  );
}
