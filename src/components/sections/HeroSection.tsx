'use client';

import { useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Calendar,
  Phone,
  ShieldCheck,
  Scale,
  FileCheck2,
  Home,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Landmark,
} from 'lucide-react';
import { company } from '@/data/company';

const trustBadges = [
  'Attorneys',
  'Notaries',
  'Conveyancers',
  'Deceased Estates',
];

const practiceHighlights = [
  {
    icon: Home,
    label: 'Property Transfers',
  },
  {
    icon: FileCheck2,
    label: 'Estate Administration',
  },
  {
    icon: Scale,
    label: 'Family & Civil Law',
  },
];

const quickStats = [
  {
    value: '2019',
    label: 'Founded',
  },
  {
    value: 'Pretoria East',
    label: 'Based in Menlyn Maine',
  },
  {
    value: 'Personalised',
    label: 'Dedicated representation',
  },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function PremiumHeroPlaque() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="relative mx-auto w-full max-w-[680px]"
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-gold/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[1.65rem] border border-gold/35 bg-[#080c18] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,165,96,0.18),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative rounded-[1.25rem] border border-gold/45 bg-[linear-gradient(180deg,rgba(11,18,35,0.98),rgba(5,8,17,0.98))] p-5 sm:p-7">
          <div className="pointer-events-none absolute inset-3 rounded-[1rem] border border-gold/20" />
          <div className="pointer-events-none absolute left-5 right-5 top-5 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
          <div className="pointer-events-none absolute bottom-5 left-5 right-5 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

          <div className="relative flex min-h-[360px] flex-col items-center justify-center text-center sm:min-h-[430px]">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mb-3 font-cormorant text-[clamp(3.7rem,15vw,7.4rem)] font-bold italic leading-none text-gold drop-shadow-[0_0_20px_rgba(214,165,96,0.32)]"
            >
              MB.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70" />
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70" />
              </div>

              <h2 className="font-serif-optical text-[clamp(2.1rem,9vw,4.75rem)] font-semibold leading-[0.92] tracking-[0.16em] text-white drop-shadow-[0_12px_28px_rgba(0,0,0,0.48)] sm:tracking-[0.2em]">
                MARLENE BRITS
              </h2>

              <div className="mx-auto flex max-w-[520px] items-center justify-center gap-4">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/70 to-gold/40" />
                <span className="h-3 w-3 rotate-45 border border-gold/80 bg-gold/30" />
                <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/70 to-gold/40" />
              </div>

              <p className="font-cormorant text-[clamp(1.25rem,5vw,2.2rem)] uppercase tracking-[0.42em] text-gold sm:tracking-[0.56em]">
                Attorneys
              </p>
            </motion.div>
          </div>

          <div className="relative -mx-5 -mb-5 border-t border-gold/40 bg-[linear-gradient(180deg,#d5a35f,#9a6a31)] px-5 py-5 text-center sm:-mx-7 sm:-mb-7 sm:px-7 sm:py-6">
            <p className="font-serif-optical text-[clamp(0.88rem,3vw,1.55rem)] font-semibold uppercase leading-relaxed tracking-[0.18em] text-[#071020] drop-shadow-[0_1px_0_rgba(255,255,255,0.18)] sm:tracking-[0.22em]">
              Attorneys, Notaries & Conveyancers
            </p>
            <div className="mx-auto my-2 flex max-w-sm items-center gap-3">
              <span className="h-px flex-1 bg-[#071020]/45" />
              <span className="font-serif-optical text-sm uppercase tracking-[0.3em] text-[#071020]">Ummeli</span>
              <span className="h-px flex-1 bg-[#071020]/45" />
            </div>
            <p className="font-serif-optical text-[clamp(0.8rem,2.8vw,1.25rem)] font-semibold uppercase tracking-[0.18em] text-[#071020] sm:tracking-[0.22em]">
              Administrators of Deceased Estates
            </p>
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

  const handleAboutClick = useCallback(() => {
    scrollToSection('about');
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] scroll-mt-24 flex-col justify-center overflow-hidden bg-[#050814] px-4 pb-16 pt-28 text-white sm:px-6 sm:pt-32 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(214,165,96,0.18),transparent_30%),radial-gradient(circle_at_84%_26%,rgba(214,165,96,0.11),transparent_26%),linear-gradient(135deg,#11172a_0%,#070a14_42%,#040611_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_78%)]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />

      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute left-[8%] top-[18%] -z-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl"
            animate={{ y: [0, 18, 0], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[14%] right-[10%] -z-10 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
            animate={{ y: [0, -22, 0], opacity: [0.25, 0.48, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/25 bg-white/[0.04] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-gold/85 shadow-[0_10px_34px_rgba(0,0,0,0.25)] backdrop-blur-md">
            <Landmark className="h-3.5 w-3.5" />
            Pretoria East Legal Practice
          </div>

          <h1 className="font-serif-optical text-[clamp(3rem,12vw,7.3rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-white">
            Legal care,
            <span className="mt-2 block bg-gradient-to-r from-[#f4d392] via-[#c8924f] to-[#f6deb0] bg-clip-text text-transparent">
              personally delivered.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/68 sm:text-lg lg:text-left">
            A premium digital home for <span className="font-semibold text-white">Marlene Brits Attorneys</span> — built around trust, clarity, and dedicated legal representation in conveyancing, deceased estates, family law, and notarial services.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-gold/20 bg-white/[0.035] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/76 backdrop-blur"
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
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#071020] shadow-[0_18px_42px_rgba(214,165,96,0.28)]"
            >
              <Calendar className="h-4 w-4" />
              Book Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.045] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md"
            >
              <Phone className="h-4 w-4 text-gold" />
              Call the Firm
            </motion.a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-center backdrop-blur-sm lg:text-left"
              >
                <div className="font-serif-optical text-xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/45">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <PremiumHeroPlaque />
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-5xl gap-3 sm:grid-cols-3">
        {practiceHighlights.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-gold/15 bg-white/[0.035] px-4 py-3 text-sm text-white/72 backdrop-blur-sm"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/12 text-gold">
              <Icon className="h-4 w-4" />
            </span>
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleAboutClick}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/45 transition-colors hover:text-gold md:flex"
        aria-label="Scroll to about section"
      >
        <span>Explore</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050814] to-transparent" />
      <ShieldCheck className="pointer-events-none absolute right-6 top-28 h-28 w-28 text-gold/[0.035] sm:right-12 sm:h-40 sm:w-40" />
    </section>
  );
}
