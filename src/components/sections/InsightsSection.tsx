'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  Calendar,
  Mail,
  Send,
  BookOpen,
} from 'lucide-react';
import { insights } from '@/data/insights';
import { SectionPattern, GeometricMandala } from '@/components/premium/BackgroundPatterns';

/* ─── Animation Variants ───────────────────────────────────────── */
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Category Color Mapping ───────────────────────────────────── */
const categoryColors: Record<string, string> = {
  Conveyancing: 'bg-gold/10 text-gold border-gold/20',
  'Estate Planning': 'bg-gold/10 text-gold border-gold/20',
  'Family Law': 'bg-gold/10 text-gold border-gold/20',
  'Deceased Estates': 'bg-gold/10 text-gold border-gold/20',
  'Debt Collection': 'bg-gold/10 text-gold border-gold/20',
  'Notarial Services': 'bg-gold/10 text-gold border-gold/20',
};

/* ─── Format Date ──────────────────────────────────────────────── */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-ZA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/* ─── Featured Article Card ────────────────────────────────────── */
function FeaturedArticle({
  insight,
}: {
  insight: (typeof insights)[number];
}) {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative bg-white rounded-2xl overflow-hidden luxury-shadow border border-gold/10 hover:border-gold/25 transition-all duration-500 hover:shadow-lg hover:shadow-gold/5"
      >
        {/* Gold top accent line */}
        <div className="h-1 gold-gradient" />

        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Left: Visual accent */}
            <div className="md:w-2/5 flex flex-col justify-between">
              {/* Category badge */}
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border w-fit ${
                  categoryColors[insight.category] || categoryColors['Conveyancing']
                }`}
              >
                <BookOpen className="w-3 h-3" />
                {insight.category}
              </span>

              {/* Decorative quote block */}
              <div className="hidden md:flex items-end mt-auto">
                <div className="relative">
                  <div className="w-24 h-24 rounded-xl bg-gold/5 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-gold/20" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold/10 border border-gold/20" />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="md:w-3/5 md:border-l md:border-gold/10 md:pl-10">
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal tracking-tight group-hover:text-gold transition-colors duration-300">
                {insight.title}
              </h3>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-4">
                {insight.excerpt}
              </p>

              {/* Meta info */}
              <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold/60" />
                  {formatDate(insight.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold/60" />
                  {insight.readTime}
                </span>
              </div>

              {/* Read More */}
              <div className="mt-6">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-gold group-hover:text-gold-light transition-colors duration-300 cursor-pointer">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Article Card ─────────────────────────────────────────────── */
function ArticleCard({
  insight,
  index,
}: {
  insight: (typeof insights)[number];
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative h-full bg-white rounded-xl overflow-hidden luxury-shadow border border-gold/10 hover:border-gold/25 transition-all duration-500 hover:shadow-lg hover:shadow-gold/5"
      >
        {/* Gold top accent on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        <div className="p-6">
          {/* Category badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${
              categoryColors[insight.category] || categoryColors['Conveyancing']
            }`}
          >
            {insight.category}
          </span>

          {/* Title */}
          <h4 className="font-serif text-lg md:text-xl text-charcoal tracking-tight mt-4 group-hover:text-gold transition-colors duration-300 line-clamp-2">
            {insight.title}
          </h4>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed mt-3 line-clamp-3">
            {insight.excerpt}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gold/60" />
              {formatDate(insight.date)}
            </span>
            <span className="text-gold/30">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-gold/60" />
              {insight.readTime}
            </span>
          </div>

          {/* Read More */}
          <div className="mt-5 pt-4 border-t border-gold/10">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/70 group-hover:text-gold transition-colors duration-300 cursor-pointer">
              Read More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Newsletter Signup ────────────────────────────────────────── */
function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <motion.div
      variants={fadeUpVariants}
      className="relative bg-white rounded-2xl overflow-hidden luxury-shadow border border-gold/10"
    >
      {/* Gold top accent */}
      <div className="h-1 gold-gradient" />

      <div className="p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Left: Copy */}
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-gold mb-3">
              <Mail className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                Newsletter
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-charcoal tracking-tight">
              Stay Informed
            </h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-3">
              Receive expert legal insights and updates on conveyancing, estate
              planning, and the legal matters that affect you and your family.
            </p>
          </div>

          {/* Right: Form */}
          <div className="md:w-1/2 w-full">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3.5 rounded-lg border border-gold/15 bg-white text-charcoal placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all duration-300 text-sm"
                  required
                  aria-label="Email address"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg gold-gradient text-white font-semibold text-sm hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 hover:scale-[1.02] shrink-0"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </form>
            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-gold mt-3 text-center md:text-left"
              >
                Thank you for subscribing!
              </motion.p>
            )}
            <p className="text-xs text-muted-foreground/60 mt-3 text-center md:text-left">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Insights Section ─────────────────────────────────────────── */
export default function InsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const featured = insights[0];
  const remaining = insights.slice(1);

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[oklch(0.97_0.003_90)] overflow-hidden"
    >
      <SectionPattern pattern="dots" className="opacity-30" />
      <GeometricMandala className="top-20 -left-20" size={160} opacity={0.02} />

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
            Knowledge Centre
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-tight">
            Legal Insights
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
            Expert perspectives on the legal matters that affect you
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={controls}
          className="mb-10 md:mb-14"
        >
          <FeaturedArticle insight={featured} />
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {remaining.map((insight, index) => (
            <ArticleCard key={insight.id} insight={insight} index={index} />
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <div className="mt-16 md:mt-20">
          <NewsletterSignup />
        </div>
      </div>

      {/* Bottom edge gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
