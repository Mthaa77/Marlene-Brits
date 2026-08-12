'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, MapPin, ShieldCheck } from 'lucide-react';

function scrollTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
}

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#07111f] px-4 pb-8 pt-[92px] text-white sm:px-6 sm:pb-10 sm:pt-[106px] lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_12%,rgba(217,175,107,0.16),transparent_24rem),linear-gradient(135deg,#07111f_0%,#0b1b2f_55%,#07111f_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="mx-auto max-w-[88rem] overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/[0.035] shadow-[0_36px_120px_rgba(0,0,0,0.32)]">
        <div className="grid items-stretch lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-16">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#edcd94]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d9af6b]/30 bg-[#d9af6b]/10 px-3 py-2"><ShieldCheck className="h-3.5 w-3.5" /> Pretoria East legal practice</span>
            </div>
            <h1 className="max-w-2xl font-serif text-[clamp(3.1rem,6vw,5.2rem)] font-medium leading-[0.9] tracking-[-0.055em] text-[#fffaf1]">Clear legal guidance.<span className="mt-2 block text-[#d9af6b]">Genuine personal care.</span></h1>
            <p className="mt-7 max-w-xl text-[0.98rem] leading-7 text-white/67 sm:text-lg sm:leading-8">Practical support for property transfers, deceased estates, notarial matters and life’s important legal decisions—handled with clarity from the first conversation.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#contact" onClick={(event) => { event.preventDefault(); scrollTo('contact'); }} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#d9af6b] px-7 text-sm font-semibold text-[#07111f] shadow-[0_18px_44px_rgba(217,175,107,0.22)] transition hover:-translate-y-0.5 hover:bg-[#edcd94]">Book a consultation <ArrowRight className="h-4 w-4" /></a>
              <a href="#services" onClick={(event) => { event.preventDefault(); scrollTo('services'); }} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/14 px-6 text-sm font-medium text-white/82 transition hover:border-[#d9af6b]/45 hover:bg-white/5 hover:text-white">Explore services</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/58">{['Attorney', 'Conveyancer', 'Notary'].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#d9af6b]" />{item}</span>)}</div>
          </motion.div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }} className="relative min-h-[430px] overflow-hidden sm:min-h-[540px] lg:min-h-[650px]">
            <Image src="/uploads/ChatGPT Image Jul 8, 2026, 09_36_03 PM.png" alt="Marlene Brits Attorneys legal team" fill priority unoptimized sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover object-[62%_20%] sm:object-[64%_20%]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(7,17,31,0.75)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,17,31,0.22),transparent_28%,transparent_100%)]" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/16 bg-[#07111f]/86 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-sm">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#d9af6b] text-[#07111f]"><MapPin className="h-4 w-4" /></span>
              <span><span className="block text-xs font-semibold text-white">Spaces Menlyn Maine</span><span className="mt-1 block text-[11px] text-white/56">Pegasus Building 1 · Pretoria East</span></span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 border-t border-white/10">
          {[
            ['01', 'Personal attention', 'Direct, human communication'],
            ['02', 'Clear next steps', 'Understand what happens next'],
            ['03', 'Careful execution', 'Precision in every legal detail'],
          ].map(([number, title, copy], index) => (
            <div key={title} className={`flex min-w-0 gap-2 px-2 py-4 sm:gap-4 sm:px-7 sm:py-5 ${index ? 'border-l border-white/10' : ''}`}>
              <span className="hidden pt-0.5 text-[10px] font-semibold tracking-[0.18em] text-[#d9af6b] sm:block">{number}</span>
              <span className="min-w-0"><span className="block font-serif text-[0.78rem] leading-tight text-[#fffaf1] sm:text-lg">{title}</span><span className="mt-1 hidden text-xs text-white/48 sm:block">{copy}</span></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
