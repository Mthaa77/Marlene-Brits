'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  ChevronDown,
  Phone,
  Calendar,
  Shield,
  Scale,
  Home,
  FileCheck,
  Star,
  PhoneCall,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { company } from '@/data/company';
import { LaurelWreath, FloatingOrb, DamaskOrnament } from '@/components/premium/BackgroundPatterns';

/* ─── Animated Counter ─────────────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix = '',
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ─── Floating Gold Particles (Seeded) ────────────────────────── */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function GoldParticles() {
  const rand = mulberry32(42);
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: rand() * 3 + 1,
    duration: rand() * 20 + 15,
    delay: rand() * 10,
    opacity: rand() * 0.3 + 0.1,
    depth: rand() * 0.5 + 0.5, // 0.5 to 1.0 — parallax depth
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `radial-gradient(circle, var(--gold) 0%, transparent 70%)`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30 * p.depth, 0],
            x: [0, Math.sin(p.id) * 15 * p.depth, 0],
            scale: [1, 1 + p.depth * 0.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Cinematic Gradient Mesh ────────────────────────────────── */
function CinematicGradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hero-mesh-animate">
      {/* Primary warm glow — top right */}
      <motion.div
        className="absolute -top-1/4 -right-1/4 w-[1200px] h-[1200px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(184,137,86,0.12) 0%, rgba(184,137,86,0.04) 35%, transparent 65%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Secondary cool glow — bottom left */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[900px] h-[900px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(184,137,86,0.08) 0%, transparent 65%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Center ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(184,137,86,0.05) 0%, transparent 45%)',
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Top-left cool highlight */}
      <motion.div
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 55%)',
        }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ─── 3D Tilt Card Component ───────────────────────────────────── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - centerY) / (rect.height / 2)) * -8);
    rotateY.set(((e.clientX - centerX) / (rect.width / 2)) * 8);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      className={`preserve-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Gold Line Border ────────────────────────────────── */
function GoldLineBorder({ side }: { side: 'left' | 'right' }) {
  return (
    <motion.div
      className={`absolute top-0 bottom-0 ${
        side === 'left' ? 'left-0' : 'right-0'
      } w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent gold-accent-pulse`}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.5 }}
      style={{ transformOrigin: 'top' }}
    />
  );
}

/* ─── Mouse-Responsive Light ───────────────────────────────────── */
function MouseLight({ mouseX, mouseY }: { mouseX: ReturnType<typeof useMotionValue<number>>; mouseY: ReturnType<typeof useMotionValue<number>> }) {
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        background: useTransform(
          [springX, springY],
          ([x, y]) =>
            `radial-gradient(900px circle at ${x}px ${y}px, rgba(184,137,86,0.08) 0%, transparent 45%)`
        ),
      }}
    />
  );
}

/* ─── Shimmer CTA Button ───────────────────────────────────── */
function ShimmerButton({
  children,
  href,
  icon: Icon,
}: {
  children: React.ReactNode;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <motion.a
      href={href}
      className="group relative inline-flex items-center gap-3 bg-gold text-charcoal-dark font-semibold px-8 py-4 rounded-sm transition-all duration-300 text-sm sm:text-base overflow-hidden"
      whileHover={{
        scale: 1.04,
        boxShadow: '0 0 40px rgba(184,137,86,0.4), 0 0 80px rgba(184,137,86,0.15)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shimmer sweep */}
      <span className="absolute inset-0 overflow-hidden">
        <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_0.8s_ease-in-out] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </span>
      {/* Breathing glow */}
      <span className="absolute inset-0 breathing-glow rounded-sm" />
      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 relative z-10" />
      <span className="relative z-10 font-cormorant text-base tracking-wide">{children}</span>
      <ArrowRight className="w-4 h-4 relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
    </motion.a>
  );
}

/* ─── 3D Stat Card ─────────────────────────────────────────────── */
function StatCard({
  stat,
  icon: Icon,
  index,
}: {
  stat: { value: number; suffix: string; label: string };
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - centerY) / (rect.height / 2)) * -6);
    rotateY.set(((e.clientX - centerX) / (rect.width / 2)) * 6);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      variants={itemVariants}
      className="text-center group"
    >
      <motion.div
        ref={cardRef}
        className="glass-card-3d rounded-sm p-6 sm:p-8"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: 'preserve-3d' }}
        whileHover={{
          boxShadow: '0 0 25px rgba(184,137,86,0.08), 0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        {/* Icon with glow */}
        <div className="flex justify-center mb-4">
          <motion.div
            className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold/60 transition-colors duration-300"
            whileHover={{
              scale: 1.15,
              boxShadow: '0 0 25px rgba(184,137,86,0.2)',
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-6 h-6 text-gold/70 group-hover:text-gold transition-colors duration-300" />
          </motion.div>
        </div>
        {/* Number */}
        <div className="font-serif-optical text-4xl sm:text-5xl font-bold text-white oldstyle-nums">
          <AnimatedCounter target={stat.value} suffix={stat.suffix} />
        </div>
        {/* Label */}
        <div className="mt-2 text-xs sm:text-sm text-white/40 tracking-luxury uppercase font-cormorant">
          {stat.label}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Stats Icons Map ──────────────────────────────────────────── */
const statsIcons = [Scale, Home, FileCheck, Star];

/* ─── Trust Strip Data ─────────────────────────────────────────── */
const trustBadges = [
  'Property24 Partner',
  'Pretoria Deeds Registry',
  'LPC Gauteng',
  'LSSA Member',
];

/* ─── Stagger Container Variants ───────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Letter-by-letter reveal variants ─────────────────────────── */
const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: 0.8 + i * 0.035,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ─── Word-by-word reveal for supporting text ──────────────────── */
const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      delay: 1.8 + i * 0.08,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ─── Hero Section ─────────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  /* ── Parallax on scroll ── */
  const { scrollY } = useScroll();
  const meshY = useTransform(scrollY, [0, 800], [0, 180]);
  const particlesY = useTransform(scrollY, [0, 800], [0, 60]);
  const headlineY = useTransform(scrollY, [0, 600], [0, -50]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0, 0.4]);
  const scaleOnScroll = useTransform(scrollY, [0, 600], [1, 0.95]);

  /* ── Mouse-responsive light ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  /* ── Split text into letters for cinematic reveal ── */
  const line1 = 'Legal Excellence';
  const line2 = 'Personalised Service';
  const supportWords = 'A distinguished Pretoria East legal practice providing expert services in conveyancing, estate administration, family law, and notarial services.'.split(' ');

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-perspective"
      style={{ backgroundColor: '#0a0a16' }}
      onMouseMove={handleMouseMove}
    >
      {/* ═══ Background layers with parallax ═══ */}
      <motion.div style={{ y: meshY }} className="absolute inset-0">
        <CinematicGradientMesh />
      </motion.div>
      <motion.div style={{ y: particlesY }} className="absolute inset-0">
        <GoldParticles />
      </motion.div>

      {/* Floating ambient orbs with more depth */}
      <FloatingOrb x="-15%" y="15%" size={500} opacity={0.05} delay={0} />
      <FloatingOrb x="75%" y="55%" size={450} opacity={0.04} delay={4} />
      <FloatingOrb x="25%" y="75%" size={300} opacity={0.03} delay={8} />
      <FloatingOrb x="60%" y="10%" size={350} opacity={0.025} delay={6} />

      {/* Mouse-responsive radial light */}
      <MouseLight mouseX={mouseX} mouseY={mouseY} />

      {/* Film grain texture overlay */}
      <div className="film-grain absolute inset-0 z-[2] pointer-events-none" />

      {/* Cinematic vignette — enhanced */}
      <div className="absolute inset-0 z-[3] pointer-events-none" style={{ boxShadow: 'inset 0 0 200px rgba(0,0,0,0.8), inset 0 -100px 100px rgba(0,0,0,0.4)' }} />

      {/* Subtle grid overlay with dot intersections */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] pattern-grid-dots"
      />

      {/* Scroll-based darkening overlay */}
      <motion.div
        className="absolute inset-0 bg-[#0a0a16] pointer-events-none z-[3]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Top gold accent line with pulse */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-60 z-10 gold-accent-pulse" />

      {/* Animated gold line borders framing content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative">
          <GoldLineBorder side="left" />
          <GoldLineBorder side="right" />
        </div>
      </div>

      {/* ═══ Main content with headline parallax + 3D ═══ */}
      <motion.div
        style={{ y: headlineY, scale: scaleOnScroll }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Laurel wreath decorative element */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <TiltCard className="inline-block">
              <LaurelWreath size={100} animate className="mx-auto opacity-50" />
            </TiltCard>
          </motion.div>

          {/* Small firm name intro with refined typography */}
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center gap-4 text-gold/60 text-xs sm:text-sm tracking-ultra uppercase font-extralight font-cormorant">
              <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/40" />
              {company.name}
              <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/40" />
            </span>
          </motion.div>

          {/* Gold line divider */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent gold-accent-pulse" />
          </motion.div>

          {/* ═══ Main headline — Cinematic 3D split text reveal ═══ */}
          <div className="overflow-hidden mb-3 hero-text-mask" style={{ perspective: '600px' }}>
            <h1 className="font-serif-optical text-display-xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="inline-block hero-text-layer">
                {line1.split('').map((char, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate={controls}
                    className="inline-block preserve-3d"
                    style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>

          <div className="overflow-hidden hero-text-mask" style={{ perspective: '600px' }}>
            <h1 className="font-serif-optical text-display-xl font-bold hero-text-layer" style={{ fontFamily: 'var(--font-playfair)' }}>
              <span className="animated-text-gradient inline-block">
                {line2.split('').map((char, i) => (
                  <motion.span
                    key={`l2-${i}`}
                    custom={i + line1.length}
                    variants={letterVariants}
                    initial="hidden"
                    animate={controls}
                    className="inline-block preserve-3d"
                    style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>

          {/* Tagline with Cormorant Garamond italic — refined */}
          <motion.p
            variants={itemVariants}
            className="mt-8 sm:mt-10 font-cormorant text-subheadline italic text-gold tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            &ldquo;{company.tagline}&rdquo;
          </motion.p>

          {/* Gold divider with shield */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-10 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-gold/40" />
              <Shield className="w-4 h-4 text-gold/60" />
              <Sparkles className="w-3 h-3 text-gold/40" />
              <Shield className="w-4 h-4 text-gold/60" />
              <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-gold/40" />
            </div>
          </motion.div>

          {/* Supporting copy — word-by-word reveal with blur */}
          <motion.p
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="font-cormorant text-body-lg text-white/50 max-w-2xl mx-auto leading-relaxed tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {supportWords.map((word, i) => (
              <motion.span
                key={`word-${i}`}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={controls}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Enhanced CTAs with 3D effects */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <ShimmerButton href="#contact" icon={Calendar}>
              Book a Consultation
            </ShimmerButton>
            <motion.a
              href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
              className="group relative inline-flex items-center gap-2 border border-gold/40 hover:border-gold text-gold hover:text-gold-light px-8 py-4 rounded-sm transition-all duration-300 hover:bg-gold/5 text-sm sm:text-base"
              whileHover={{
                scale: 1.03,
                boxShadow: '0 0 20px rgba(184,137,86,0.1)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative">
                <Phone className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <PhoneCall className="w-4 h-4 absolute inset-0 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
              </span>
              <span className="font-cormorant tracking-wide text-base">Call {company.contact.phone}</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ═══ Stats Bar with 3D cards ═══ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-24 sm:mt-28 max-w-4xl mx-auto"
        >
          {/* Damask ornament divider */}
          <motion.div variants={itemVariants}>
            <DamaskOrnament className="mx-auto mb-10" width={300} />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 perspective-1000">
            {company.stats.map((stat, i) => {
              const Icon = statsIcons[i] || Star;
              return (
                <StatCard key={stat.label} stat={stat} icon={Icon} index={i} />
              );
            })}
          </div>

          {/* Divider below stats */}
          <motion.div variants={itemVariants}>
            <DamaskOrnament className="mx-auto mt-10" width={300} />
          </motion.div>
        </motion.div>

        {/* ═══ Trust Strip ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.5, ease: 'easeOut' }}
          className="mt-12 max-w-3xl mx-auto overflow-hidden"
        >
          <p className="text-center text-white/25 text-[10px] sm:text-xs tracking-ultra uppercase mb-5 font-cormorant">
            Trusted by
          </p>
          <div className="relative">
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-5 py-2.5 rounded-sm border border-white/[0.06] bg-white/[0.02] text-white/30 text-[10px] sm:text-xs tracking-luxury uppercase font-cormorant hover:border-gold/20 hover:text-gold/50 hover:bg-gold/[0.03] transition-all duration-500 glass-card-3d"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ═══ Scroll indicator with enhanced animation ═══ */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            onClick={scrollToAbout}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gold/50 hover:text-gold transition-colors cursor-pointer z-10 group"
            aria-label="Scroll to about section"
          >
            <span className="text-[10px] tracking-ultra uppercase font-cormorant group-hover:tracking-[0.5em] transition-all duration-500">
              Discover
            </span>
            <motion.div
              className="w-6 h-10 rounded-full border border-gold/30 group-hover:border-gold/50 transition-colors duration-300 flex items-start justify-center pt-2"
              animate={{ borderColor: ['rgba(184,137,86,0.2)', 'rgba(184,137,86,0.4)', 'rgba(184,137,86,0.2)'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-gold/60"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a16] to-transparent pointer-events-none z-[4]" />
    </section>
  );
}
