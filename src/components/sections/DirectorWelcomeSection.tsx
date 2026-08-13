'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Mail, Quote } from 'lucide-react';

export default function DirectorWelcomeSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="director-welcome" className="scroll-mt-24 overflow-hidden bg-[#f6f1e7] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20 lg:px-8">
        <motion.div initial={reduceMotion ? false : { opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-lg lg:mx-0">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full border border-[#d9af6b]/18" />
          <div className="absolute -bottom-10 -right-8 h-48 w-48 rounded-full bg-[#d9af6b]/10 blur-3xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[11rem_2rem_8rem_2rem] border border-[#07111f]/10 bg-white shadow-[0_36px_100px_rgba(7,17,31,0.17)] sm:rounded-[13rem_2.25rem_9rem_2.25rem]">
            <Image src="/uploads/OIP (1).webp" alt="Marlene Brits, founder and managing director of Marlene Brits Attorneys" fill sizes="(max-width: 1024px) 100vw, 40vw" className="scale-[1.08] object-cover object-[12%_top]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/62 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.4rem_3.5rem_3.5rem_1.4rem] border border-white/18 bg-[#07111f]/82 p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.26)] backdrop-blur-xl">
              <p className="font-serif text-2xl leading-none text-[#fffaf1]">Marlene Brits</p>
              <p className="mt-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#edcd94]"><BadgeCheck className="h-3.5 w-3.5" /> Founder & Managing Director</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}>
          <p className="font-signature text-[2.45rem] leading-none text-[#a87535] sm:text-[3.1rem]">A personal welcome</p>
          <h2 className="mt-3 max-w-3xl font-serif text-[var(--text-h1)] font-medium leading-[0.9] tracking-[-0.052em] text-[#07111f]">A practice built around the <span className="italic text-[#a87535]">person</span> behind the matter.</h2>

          <div className="mt-8 grid gap-6 border-t border-[#07111f]/12 pt-7 sm:grid-cols-[auto_1fr]">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#07111f] text-[#edcd94]"><Quote className="h-5 w-5" /></span>
            <div>
              <p className="max-w-2xl font-serif text-[1.45rem] leading-[1.35] text-[#263548] sm:text-[1.75rem]">Welcome to Marlene Brits Attorneys. Legal matters often arrive when life already feels complex. Our role is to bring calm, explain each step clearly, and handle your matter with the precision and personal attention it deserves.</p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#617083] sm:text-base sm:leading-8">From your first conversation, you can expect honest guidance, responsive communication and a legal team that remains personally involved throughout the process.</p>
              <div className="mt-7"><p className="font-signature text-[2.35rem] leading-none text-[#9b6d30]">Marlene Brits</p><p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#617083]">Attorney · Conveyancer · Notary</p></div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#team" className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-[#07111f] px-6 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(7,17,31,0.16)] transition hover:-translate-y-0.5 hover:bg-[#10243b]">Meet the legal team <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
            <a href="mailto:marlene@mbritslaw.co.za" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-[#07111f]/14 px-6 text-sm font-semibold text-[#263548] transition hover:border-[#a87535]/45 hover:bg-white/56"><Mail className="h-4 w-4 text-[#a87535]" /> Email Marlene</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
