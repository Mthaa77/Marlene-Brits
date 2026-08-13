'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Check, MapPin, ShieldCheck } from 'lucide-react';

function scrollTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
}

const credentials = ['Attorney', 'Conveyancer', 'Notary'];

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  const entrance = {
    hidden: { opacity: 0, y: 22, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#050d18] px-3 pb-3 pt-[86px] text-white sm:px-5 sm:pb-5 sm:pt-[94px] lg:px-7">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_90%_8%,rgba(217,175,107,0.16),transparent_26rem),linear-gradient(180deg,#07111f_0%,#050d18_100%)]" />

      <div className="relative mx-auto min-h-[calc(100svh-98px)] max-w-[94rem] overflow-hidden rounded-[1.65rem] border border-white/14 bg-[#07111f] shadow-[0_38px_140px_rgba(0,0,0,0.42)] sm:min-h-[760px] sm:rounded-[2.25rem] lg:min-h-[790px]">
        <Image
          src="/uploads/main-1612194838.jpg"
          alt="Pegasus Building 1 at Menlyn Maine in Pretoria East"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[53%_center] sm:object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,21,0.18)_0%,rgba(4,11,21,0.2)_28%,rgba(4,11,21,0.94)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,11,21,0.97)_0%,rgba(4,11,21,0.88)_37%,rgba(4,11,21,0.34)_68%,rgba(4,11,21,0.12)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:84px_84px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#edcd94]/70 to-transparent" />

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: reduceMotion ? 0 : 0.09, delayChildren: reduceMotion ? 0 : 0.12 }}
          className="relative z-10 flex min-h-[calc(100svh-98px)] flex-col justify-end px-5 pb-24 pt-24 sm:min-h-[760px] sm:px-10 sm:pb-28 lg:min-h-[790px] lg:justify-center lg:px-16 lg:pb-20 lg:pt-28 xl:px-24"
        >
          <motion.div variants={reduceMotion ? undefined : entrance} className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#edcd94]/32 bg-[#07111f]/64 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f2d49d] shadow-[0_12px_36px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:text-[10px]">
              <ShieldCheck className="h-3.5 w-3.5" /> Pretoria East legal practice
            </span>
            <span className="hidden h-px w-16 bg-gradient-to-r from-[#d9af6b] to-transparent sm:block" />
          </motion.div>

          <motion.p variants={reduceMotion ? undefined : entrance} className="font-signature mb-2 text-[2.05rem] leading-none text-[#edcd94] sm:text-[2.7rem]">
            Personal counsel. Clear direction.
          </motion.p>

          <motion.h1 variants={reduceMotion ? undefined : entrance} className="max-w-[9.8ch] font-serif text-[length:var(--text-hero)] font-medium leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-[#fffaf1] [text-shadow:0_18px_70px_rgba(0,0,0,0.54)]">
            Move through legal matters with <span className="italic text-[#edcd94]">clarity.</span>
          </motion.h1>

          <motion.p variants={reduceMotion ? undefined : entrance} className="mt-6 max-w-xl text-[0.98rem] leading-7 text-white/72 sm:text-[1.08rem] sm:leading-8">
            Direct, considered legal guidance for property, estates, family matters, notarial work and civil disputes—explained clearly and handled with care.
          </motion.p>

          <motion.div variants={reduceMotion ? undefined : entrance} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" onClick={(event) => { event.preventDefault(); scrollTo('contact'); }} className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#d9af6b] px-7 text-sm font-bold text-[#07111f] shadow-[0_18px_48px_rgba(217,175,107,0.28)] transition hover:-translate-y-0.5 hover:bg-[#edcd94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#edcd94]">
              Start a confidential conversation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#services" onClick={(event) => { event.preventDefault(); scrollTo('services'); }} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/18 bg-[#07111f]/48 px-6 text-sm font-semibold text-white/84 backdrop-blur-xl transition hover:border-[#d9af6b]/54 hover:bg-[#07111f]/68 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#edcd94]">
              Find the right legal service
            </a>
          </motion.div>

          <motion.div variants={reduceMotion ? undefined : entrance} className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/62">
            {credentials.map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#d9af6b]" />{item}</span>)}
          </motion.div>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }} className="absolute right-5 top-5 z-10 hidden max-w-[19rem] items-center gap-3 rounded-[1.25rem] border border-white/18 bg-[#07111f]/68 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:flex lg:right-8 lg:top-auto lg:bottom-8">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#d9af6b] text-[#07111f]"><MapPin className="h-4 w-4" /></span>
          <span><span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#edcd94]">Our Pretoria office</span><span className="mt-1.5 block font-serif text-lg leading-tight text-[#fffaf1]">Pegasus Building 1</span><span className="mt-1 block text-[11px] text-white/54">Spaces Menlyn Maine · Pretoria East</span></span>
        </motion.div>

        <a href="#director-welcome" onClick={(event) => { event.preventDefault(); scrollTo('director-welcome'); }} className="absolute bottom-5 left-1/2 z-10 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-white/20 bg-[#07111f]/58 text-[#edcd94] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#edcd94]/58 lg:bottom-8" aria-label="Continue to the director's welcome">
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
