'use client';

import { useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  FileCheck2,
  Landmark,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { company } from '@/data/company';

const images = {
  building: '/uploads/main-1612194838.jpg',
  plaqueOne: '/uploads/ChatGPT%20Image%20Jul%208%2C%202026%2C%2009_28_52%20PM.png',
  plaqueTwo: '/uploads/ChatGPT%20Image%20Jul%208%2C%202026%2C%2009_31_06%20PM.png',
  plaqueThree: '/uploads/ChatGPT%20Image%20Jul%208%2C%202026%2C%2009_36_03%20PM.png',
  office: '/uploads/OIP%20%281%29.webp',
};

const trustBadges = ['Attorneys', 'Notaries', 'Conveyancers', 'Estate Administrators'];

const serviceHighlights = [
  { icon: FileCheck2, label: 'Conveyancing' },
  { icon: ShieldCheck, label: 'Deceased Estates' },
  { icon: Scale, label: 'Notarial Services' },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - 92;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function ImageCard({ src, label, className = '' }: { src: string; label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.6rem] border border-gold/22 bg-[#071020] shadow-[0_30px_100px_rgba(0,0,0,0.36)] ${className}`}>
      <img src={src} alt={label} className="h-full w-full object-cover" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/84 via-[#050814]/16 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
      <p className="absolute bottom-4 left-4 right-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/90">
        {label}
      </p>
    </div>
  );
}

function HeroVisualStack() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 38, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
      className="relative mx-auto w-full max-w-[660px] lg:mx-0"
    >
      <div className="absolute -inset-8 rounded-[2.5rem] bg-gold/12 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.1rem] border border-gold/30 bg-[#071020]/72 p-3 shadow-[0_44px_150px_rgba(0,0,0,0.52)] backdrop-blur-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,165,96,0.18),transparent_34%)]" />
        <div className="relative grid gap-3 sm:grid-cols-2">
          <ImageCard
            src={images.plaqueOne}
            label="Marlene Brits Attorneys"
            className="min-h-[300px] sm:col-span-2 sm:min-h-[360px]"
          />
          <ImageCard src={images.office} label="Professional Legal Environment" className="min-h-[190px] sm:min-h-[230px]" />
          <ImageCard src={images.plaqueTwo} label="Premium Legal Identity" className="min-h-[190px] sm:min-h-[230px]" />
        </div>

        <div className="absolute bottom-6 left-6 right-6 rounded-[1.35rem] border border-white/10 bg-[#050814]/78 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:left-8 sm:right-8 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/82">Firm Identity</p>
              <p className="mt-1 font-serif-optical text-2xl font-semibold leading-tight text-white sm:text-3xl">
                Distinctive, polished, and unmistakably legal.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const handleConsultationClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection('contact');
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] scroll-mt-24 flex-col justify-center overflow-hidden bg-[#050814] px-4 pb-16 pt-32 text-white sm:px-6 sm:pt-36 lg:px-8"
    >
      <img
        src={images.building}
        alt="Marlene Brits Attorneys office building in Pretoria East"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,8,20,0.94)_0%,rgba(5,8,20,0.83)_42%,rgba(5,8,20,0.58)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(214,165,96,0.28),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(214,165,96,0.14),transparent_24%),linear-gradient(180deg,rgba(5,8,20,0.18),rgba(5,8,20,0.9))]" />
      <div className="absolute inset-0 -z-10 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute left-[7%] top-[16%] -z-10 h-48 w-48 rounded-full bg-gold/16 blur-3xl"
            animate={{ y: [0, 20, 0], opacity: [0.35, 0.62, 0.35] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[12%] right-[9%] -z-10 h-72 w-72 rounded-full bg-gold/12 blur-3xl"
            animate={{ y: [0, -24, 0], opacity: [0.26, 0.48, 0.26] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/28 bg-[#050814]/58 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/90 shadow-[0_14px_42px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <Landmark className="h-3.5 w-3.5" />
            Pretoria East · Menlyn Maine
          </div>

          <h1 className="font-serif-optical text-[clamp(3rem,11vw,7.45rem)] font-semibold leading-[0.86] tracking-[-0.065em] text-white drop-shadow-[0_28px_70px_rgba(0,0,0,0.55)]">
            Legal excellence,
            <span className="mt-3 block bg-gradient-to-r from-[#f9e5bb] via-[#c8924f] to-[#fff1d2] bg-clip-text text-transparent">
              rooted in trust.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/74 sm:text-lg lg:text-left">
            A premium digital presence for <span className="font-semibold text-white">Marlene Brits Attorneys</span> — using the firm’s own building, brand identity, and legal positioning to create a website that feels personal, established, and unmistakably theirs.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-gold/22 bg-[#050814]/52 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/78 backdrop-blur-xl"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <motion.a
              href="#contact"
              onClick={handleConsultationClick}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#071020] shadow-[0_24px_70px_rgba(214,165,96,0.34)]"
            >
              <Calendar className="h-4 w-4" />
              Book Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/18 bg-[#050814]/52 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_52px_rgba(0,0,0,0.24)] backdrop-blur-xl"
            >
              <Phone className="h-4 w-4 text-gold" />
              Call the Firm
            </motion.a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {serviceHighlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/12 bg-[#050814]/50 p-4 text-center shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:text-left"
              >
                <Icon className="mx-auto mb-3 h-5 w-5 text-gold lg:mx-0" />
                <div className="text-sm font-semibold text-white">{label}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/42">Specialised support</div>
              </div>
            ))}
          </div>
        </motion.div>

        <HeroVisualStack />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#050814] to-transparent" />
      <Sparkles className="pointer-events-none absolute bottom-12 right-8 h-24 w-24 text-gold/[0.07]" />
    </section>
  );
}
