'use client';

import { useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
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
  logo3d: '/uploads/ChatGPT%20Image%20Jul%208%2C%202026%2C%2009_28_52%20PM.png',
};

const trustBadges = ['Attorney', 'Conveyancer', 'Notary', 'Estate Administration'];

const heroStats = [
  { value: '2019', label: 'Founded' },
  { value: 'Pretoria East', label: 'Based' },
  { value: 'Direct', label: 'Client care' },
];

const coreServices = [
  { icon: FileCheck2, title: 'Property Transfers', text: 'Conveyancing handled with precision and clear updates.' },
  { icon: ShieldCheck, title: 'Deceased Estates', text: 'Careful administration when families need calm guidance.' },
  { icon: Scale, title: 'Notarial Services', text: 'Contracts, certifications, and formal legal documents.' },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - 92;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function HeroIdentityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.86, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[640px] lg:mx-0"
    >
      <div className="absolute -inset-8 rounded-[2.75rem] bg-gold/14 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.25rem] border border-gold/30 bg-[#050814]/72 p-4 shadow-[0_48px_150px_rgba(0,0,0,0.54)] ring-1 ring-white/10 backdrop-blur-2xl sm:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,165,96,0.22),transparent_34%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[#071020]">
          <img
            src={images.logo3d}
            alt="Marlene Brits Attorneys cinematic logo"
            className="h-[340px] w-full object-cover sm:h-[430px] lg:h-[520px]"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/92 via-[#050814]/18 to-transparent" />
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-gold/24 bg-[#050814]/66 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/90 backdrop-blur-xl">
            <Building2 className="h-3.5 w-3.5" />
            Marlene Brits Attorneys
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <div className="rounded-[1.45rem] border border-white/12 bg-[#050814]/82 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/82">Premium Legal Practice</p>
                  <p className="mt-2 font-serif-optical text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    Personalised legal service with serious execution.
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
        </div>

        <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
          {coreServices.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[1.2rem] border border-white/10 bg-white/[0.055] p-4">
              <Icon className="mb-3 h-5 w-5 text-gold" />
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/48">{text}</p>
            </div>
          ))}
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

  const handleServicesClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection('services');
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] scroll-mt-24 flex-col justify-center overflow-hidden bg-[#050814] px-4 pb-16 pt-32 text-white sm:px-6 sm:pt-36 lg:px-8"
    >
      <img
        src={images.building}
        alt="Marlene Brits Attorneys office building in Pretoria East"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(5,8,20,0.95)_0%,rgba(5,8,20,0.88)_45%,rgba(5,8,20,0.56)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_18%,rgba(214,165,96,0.30),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(244,215,155,0.13),transparent_24%),linear-gradient(180deg,rgba(5,8,20,0.12),rgba(5,8,20,0.92))]" />
      <div className="absolute inset-0 -z-20 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute inset-3 -z-10 rounded-[2rem] border border-gold/18 shadow-[inset_0_0_80px_rgba(214,165,96,0.05)]" />

      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute left-[7%] top-[16%] -z-10 h-44 w-44 rounded-full bg-gold/18 blur-3xl"
            animate={{ y: [0, 18, 0], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[12%] right-[9%] -z-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
            animate={{ y: [0, -22, 0], opacity: [0.24, 0.44, 0.24] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/28 bg-[#050814]/62 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/90 shadow-[0_14px_42px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <Landmark className="h-3.5 w-3.5" />
            Pretoria East · Menlyn Maine
          </div>

          <h1 className="font-serif-optical text-[clamp(3.05rem,11vw,7.65rem)] font-semibold leading-[0.86] tracking-[-0.068em] text-white drop-shadow-[0_28px_70px_rgba(0,0,0,0.58)]">
            Legal care,
            <span className="mt-3 block bg-gradient-to-r from-[#fff0cc] via-[#c8924f] to-[#f9e5bb] bg-clip-text text-transparent">
              personally delivered.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/76 sm:text-lg lg:text-left">
            Marlene Brits Attorneys provides focused legal support in conveyancing, deceased estates, notarial services, estate planning, family law, civil litigation, and debt collection — with every client treated as a relationship, not a reference number.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-gold/22 bg-[#050814]/56 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur-xl"
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
              href="#services"
              onClick={handleServicesClick}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/18 bg-[#050814]/54 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_52px_rgba(0,0,0,0.24)] backdrop-blur-xl"
            >
              <Scale className="h-4 w-4 text-gold" />
              Explore Services
            </motion.a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/12 bg-[#050814]/52 p-4 text-center shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:text-left"
              >
                <div className="font-serif-optical text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-gold/66">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <HeroIdentityCard />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#050814] to-transparent" />
      <Sparkles className="pointer-events-none absolute bottom-12 right-8 h-24 w-24 text-gold/[0.07]" />
    </section>
  );
}
