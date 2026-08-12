'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import { company } from '@/data/company';

const principles = [
  'Direct, personal attention',
  'Clear communication at every stage',
  'Careful, precise legal execution',
];

export default function AboutSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-[#07101d] py-20 text-white sm:py-28 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c99a52]/55 to-transparent" />

      <div className="mx-auto grid max-w-[90rem] items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] border border-white/10 shadow-[0_36px_100px_rgba(0,0,0,0.35)] sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src="/uploads/ChatGPT%20Image%20Jul%208%2C%202026%2C%2009_36_03%20PM.png"
              alt="Marlene Brits Attorneys legal team"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#d6a75e]">About the firm</p>
          <h2 className="mt-5 font-serif-optical text-[clamp(3rem,7vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#fffaf0]">
            Built on trust.
            <span className="block text-[#d6a75e]">Defined by care.</span>
          </h2>

          <div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-white/64 sm:text-lg">
            <p>
              Founded in 2019 by Marlene Brits, the practice provides personalised legal support across conveyancing, deceased estate administration, notarial services, estate planning and related matters.
            </p>
            <p>
              As an Attorney, Conveyancer and Notary, Marlene brings one clear standard to every instruction: clients should understand the process, know what comes next, and feel supported throughout.
            </p>
          </div>

          <div className="mt-8 space-y-3 border-y border-white/10 py-6">
            {principles.map((principle) => (
              <div key={principle} className="flex items-center gap-3 text-sm text-white/80 sm:text-base">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d6a75e]/35 text-[#d6a75e]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {principle}
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 text-sm leading-6 text-white/58">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d6a75e]" />
              <span>{company.location.office}, Pretoria East</span>
            </div>
            <a href="#contact" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#d6a75e]">
              Speak to the firm
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
