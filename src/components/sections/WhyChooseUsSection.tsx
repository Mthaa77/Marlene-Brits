'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useAnimation,
  type Variants,
} from 'framer-motion';
import {
  Users,
  Shield,
  Award,
  BookOpen,
  Heart,
  Eye,
  Check,
  X,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { company } from '@/data/company';
import { SectionPattern, GeometricMandala } from '@/components/premium/BackgroundPatterns';

/* ─── Icon Map for Values ─────────────────────────────────────── */
const valueIcons: LucideIcon[] = [Users, Shield, Award, BookOpen, Heart, Eye];

/* ─── Comparison Data ─────────────────────────────────────────── */
const comparisons = [
  {
    feature: 'Direct attorney access',
    typical: 'Limited',
    ours: 'Guaranteed',
  },
  {
    feature: 'Personal attention',
    typical: 'Delegated',
    ours: 'Every client, every time',
  },
  {
    feature: 'Communication',
    typical: 'When necessary',
    ours: 'Proactive updates',
  },
  {
    feature: 'Property expertise',
    typical: 'General practice',
    ours: 'Admitted conveyancer & Deeds Registry agent',
  },
  {
    feature: 'Estate experience',
    typical: 'Basic services',
    ours: 'Full administration from reporting to distribution',
  },
  {
    feature: 'Fee transparency',
    typical: 'Hidden costs',
    ours: 'Upfront estimates, no surprises',
  },
];

/* ─── Animation Variants ──────────────────────────────────────── */
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Value Card Component ────────────────────────────────────── */
function ValueCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className="group relative bg-white border border-gold/10 rounded-xl p-5 sm:p-6 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/[0.06] transition-all duration-500 hover:-translate-y-1"
    >
      {/* Gold top accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Subtle gold glow on hover */}
      <div className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none gold-glow" />

      <div className="relative z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors duration-300">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
        </div>
        <h3 className="font-serif text-base sm:text-lg font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Comparison Row Component ────────────────────────────────── */
function ComparisonRow({
  feature,
  typical,
  ours,
  index,
}: {
  feature: string;
  typical: string;
  ours: string;
  index: number;
}) {
  const ref = useRef<HTMLTableRowElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.tr
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className="group border-b border-gold/[0.06] hover:bg-gold/[0.02] transition-colors duration-300"
    >
      {/* Feature name */}
      <td className="py-4 px-4 sm:px-6 text-sm sm:text-base font-medium text-charcoal">
        {feature}
      </td>

      {/* Typical Firm */}
      <td className="py-4 px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <X className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="text-sm text-gray-400">{typical}</span>
        </div>
      </td>

      {/* Marlene Brits */}
      <td className="py-4 px-4 sm:px-6 text-center bg-gold/[0.03] rounded-lg my-1">
        <div className="flex items-center justify-center gap-2">
          <Check className="w-4 h-4 text-gold shrink-0" />
          <span className="text-sm font-medium text-charcoal">{ours}</span>
        </div>
      </td>
    </motion.tr>
  );
}

/* ─── Why Choose Us Section ───────────────────────────────────── */
export default function WhyChooseUsSection() {
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
      id="why-us"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-32 bg-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <SectionPattern pattern="chevron" className="opacity-30" />
        <GeometricMandala className="top-10 -right-10" size={200} opacity={0.02} />
        {/* Gradient orbs */}
        <div className="absolute top-20 -left-32 w-80 h-80 rounded-full bg-gold/[0.04] blur-[100px]" />
        <div className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-gold/[0.03] blur-[100px]" />
      </div>

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
            The Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal">
            Why Choose Marlene Brits Attorneys
          </h2>
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-gold/40" />
              <div className="w-2 h-2 rounded-full bg-gold" />
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>
          </div>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            The difference between good and exceptional legal representation
          </p>
        </motion.div>

        {/* Two-column layout: Statement + Values Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">
          {/* Left: Impactful Statement */}
          <motion.div
            variants={slideInLeftVariants}
            initial="hidden"
            animate={controls}
            className="lg:col-span-2 text-center lg:text-left"
          >
            <div className="relative">
              {/* Decorative quote mark */}
              <div className="absolute -top-6 -left-2 text-gold/10 font-serif text-7xl sm:text-8xl leading-none select-none">
                &ldquo;
              </div>
              <h3 className="relative font-serif text-3xl sm:text-4xl md:text-5xl font-bold italic leading-tight">
                <span className="gold-text-gradient">
                  You Are Never Just Another Client
                </span>
              </h3>
              <div className="absolute -bottom-4 -right-2 text-gold/10 font-serif text-7xl sm:text-8xl leading-none select-none">
                &rdquo;
              </div>
            </div>

            <p className="text-muted-foreground mt-10 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              At Marlene Brits Attorneys, every matter receives the personal
              attention and dedicated expertise it deserves. We do not just
              handle cases — we build relationships founded on trust and
              delivered through excellence.
            </p>

            {/* Small stats row */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6">
              {company.stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-gold">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Values Grid */}
          <motion.div
            variants={slideInRightVariants}
            initial="hidden"
            animate={controls}
            className="lg:col-span-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {company.values.map((value, i) => (
                <ValueCard
                  key={value.title}
                  icon={valueIcons[i] || Heart}
                  title={value.title}
                  description={value.description}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block text-xs tracking-luxury uppercase text-gold/80 mb-3 font-cormorant">
              Our Promise
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal">
              What Sets Us Apart
            </h3>
            <div className="flex justify-center mt-4">
              <div className="w-12 h-[1px] bg-gold/40" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl border border-gold/10 overflow-hidden luxury-shadow">
              <table className="w-full">
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-gold/10">
                    <th className="py-4 px-4 sm:px-6 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Feature
                    </th>
                    <th className="py-4 px-4 sm:px-6 text-center text-xs font-semibold uppercase tracking-widest text-gray-400 bg-gray-50">
                      Typical Firm
                    </th>
                    <th className="py-4 px-4 sm:px-6 text-center text-xs font-semibold uppercase tracking-widest text-gold bg-gold/[0.04]">
                      Marlene Brits Attorneys
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {comparisons.map((row, i) => (
                    <ComparisonRow
                      key={row.feature}
                      feature={row.feature}
                      typical={row.typical}
                      ours={row.ours}
                      index={i}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          className="text-center mt-16 sm:mt-20"
        >
          <div className="elegant-divider mb-10" />
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Discover what dedicated, personal legal representation can do for
            you.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl gold-gradient text-white font-semibold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span>Experience the Difference</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
