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

const entrance = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#050d18] px-3 pb-3 pt-[86px] text-white sm:px-5 sm:pb-5 sm:pt-[94px] lg:px-7">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_90%_8%,rgba(217,175,107,0.14),transparent_25rem),linear-gradient(180deg,#07111f_0%,#050d18_100%)]" />

      <div className="relative mx-auto min-h-[calc(100svh-98px)] max-w-[94rem] overflow-hidden rounded-[1.65rem] border border-white/14 bg-[#07111f] shadow-[0_32px_110px_rgba(0,0,0,0.38)] sm:min-h-[760px] sm:rounded-[2.25rem] lg:min-h-[790px]">
        <Image
          src="/uploads/main-1612194838.jpg"
          alt="Pegasus Building 1 at Menlyn Maine in Pretoria East"
          fill
          priority
          fetchPriority="high"
          quality={78}
          sizes="(min-width: 1536px) 94rem, (min-width: 1024px) 96vw, 100vw"
          className="object-cover object-[53%_center] sm:object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,21,0.14)_0%,rgba(4,11,21,0.24)_30%,rgba(4,11,21,0.94)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,11,21,0.97)_0%,rgba(4,11,21,0.88)_37%,rgba(4,11,21,0.34)_68%,rgba(4,11,21,0.12)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:90px_90px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#edcd94]/70 to-transparent" />

        <motion.div
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          transition={{ staggerChildren: reduceMotion ? 0 : 0.075, delayChildren: reduceMotion ? 0 : 0.08 }}
          className="relative z-10 flex min-h-[calc(100svh-98px)] flex-col justify-end px-5 pb-24 pt-24 sm:min-h-[760px] sm:px-10 sm:pb-28 lg:min-h-[790px] lg:justify-center lg:px-16 lg:pb-20 lg:pt-28 xl:px-24"
        >
          <motion.div variants={reduceMotion ? undefined : entrance} transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }} className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#edcd94]/32 bg-[#07111f]/64 px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f2d49d] shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-lg sm:text-[10px]">
              <ShieldCheck className="h-3.5 w-3.5" /> Pretoria East legal practice
            </span>
            <span className="hidden h-px w-16 bg-gradient-to-r from-[#d9af6b] to-transparent sm:block" />
          </motion.div>

          <motion.p variants={reduceMotion ? undefined : entrance} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="font-signature mb-2 text-[2.05rem] leading-none text-[#edcd94] sm:text-[2.7rem]">
            Guidance you can trust
          </motion.p>

          <motion.h1 variants={reduceMotion ? undefined : entrance} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }} className="max-w-[9.8ch] font-serif text-[var(--text-hero)] font-medium leading-[var(--leading-display)] tracking-[var(--tracking-display)] text-[#fffaf1] [text-shadow:0_18px_66px_rgba(0,0,0,0.5)]">
            Legal clarity for life&apos;s <span className="italic text-[#edcd94]">defining moments.</span>
          </motion.h1>

          <motion.p variants={reduceMotion ? undefined : entrance} transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }} className="mt-6 max-w-xl text-[0.98rem] leading-7 text-white/72 sm:text-[1.08rem] sm:leading-8">
            Personal legal support for property transfers, deceased estates, notarial matters and the decisions that shape what comes next.
          </motion.p>

          <motion.div variants={reduceMotion ? undefined : entrance} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" onClick={(event) => { event.preventDefault(); scrollTo('contact'); }} className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#d9af6b] px-7 text-sm font-bold text-[#07111f] shadow-[0_16px_42px_rgba(217,175,107,0.24)] transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-[#edcd94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#edcd94]">
              Book a consultation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#services" onClick={(event) => { event.preventDefault(); scrollTo('services'); }} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/18 bg-[#07111f]/48 px-6 text-sm font-semibold text-white/84 backdrop-blur-lg transition-[background-color,border-color,transform] hover:border-[#d9af6b]/54 hover:bg-[#07111f]/68 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#edcd94]">
              Explore legal services
            </a>
          </motion.div>

          <motion.div variants={reduceMotion ? undefined : entrance} transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }} className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/62">
            {credentials.map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#d9af6b]" />{item}</span>)}
          </motion.div>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.52, delay: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }} className="absolute right-5 top-5 z-10 hidden max-w-[19rem] items-center gap-3 rounded-[1.25rem] border border-white/18 bg-[#07111f]/68 p-4 shadow-[0_18px_56px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:flex lg:right-8 lg:top-auto lg:bottom-8">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#d9af6b] text-[#07111f]"><MapPin className="h-4 w-4" /></span>
          <span><span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#edcd94]">Our Pretoria office</span><span className="mt-1.5 block font-serif text-lg leading-tight text-[#fffaf1]">Pegasus Building 1</span><span className="mt-1 block text-[11px] text-white/54">Spaces Menlyn Maine · Pretoria East</span></span>
        </motion.div>

        <a href="#director-welcome" onClick={(event) => { event.preventDefault(); scrollTo('director-welcome'); }} className="absolute bottom-5 left-1/2 z-10 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-white/20 bg-[#07111f]/58 text-[#edcd94] backdrop-blur-lg transition-[border-color,transform] hover:-translate-y-1 hover:border-[#edcd94]/58 lg:bottom-8" aria-label="Continue to the director's welcome">
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
