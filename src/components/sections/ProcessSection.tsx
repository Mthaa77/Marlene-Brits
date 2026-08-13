'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, FileCheck2, MessagesSquare, Route } from 'lucide-react';

const steps = [
  { icon: MessagesSquare, number: '01', title: 'Begin with the real situation', copy: 'Share what happened, what is changing and any date that may matter. The firm listens first, then identifies the legal questions behind the concern.' },
  { icon: Route, number: '02', title: 'See the route before you take it', copy: 'Receive a clear explanation of the likely process, the information still needed, immediate priorities and the next decision in front of you.' },
  { icon: FileCheck2, number: '03', title: 'Move forward without losing sight', copy: 'Once instructed, the legal work is managed carefully while purposeful communication keeps you connected to progress, requirements and decisions.' },
];

export default function ProcessSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="approach" className="relative scroll-mt-24 overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start"><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b6d30]">What to expect</span><h2 className="mt-4 font-serif text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#07111f]">From uncertainty to a route you can see.</h2><p className="mt-6 max-w-lg text-base leading-8 text-[#526071]">A legal process becomes more manageable when its purpose, sequence and decisions are visible. The experience is designed to replace guesswork with context from the beginning.</p><a href="#consultation-builder" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#07111f] px-6 text-sm font-semibold text-white transition hover:bg-[#0c2136]">Build your consultation checklist <ArrowDown className="h-4 w-4 text-[#edcd94]" /></a></div>
        <div className="relative">
          <div className="absolute bottom-12 left-[2.2rem] top-12 w-px bg-gradient-to-b from-[#d9af6b]/70 via-[#d9af6b]/28 to-transparent sm:left-1/2" />
          <div className="space-y-8 sm:space-y-12">{steps.map((step, index) => { const Icon = step.icon; const align = index % 2 === 0 ? 'sm:mr-auto' : 'sm:ml-auto'; return <motion.article key={step.title} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: index * 0.08 }} className={`relative z-10 flex max-w-xl items-start gap-5 ${align} sm:w-[calc(50%+2.25rem)] ${index % 2 === 0 ? 'sm:flex-row-reverse sm:text-right' : ''}`}>
            <span className="grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded-full border-[7px] border-white bg-[#07111f] text-[#edcd94] shadow-[0_16px_45px_rgba(7,17,31,0.18)]"><Icon className="h-5 w-5" /></span>
            <div className={`min-w-0 flex-1 rounded-[1.2rem_3.5rem_3.5rem_1.2rem] border border-[#07111f]/9 bg-[#f8f5ee] p-6 shadow-[0_18px_55px_rgba(7,17,31,0.06)] ${index % 2 === 0 ? 'sm:rounded-[3.5rem_1.2rem_1.2rem_3.5rem]' : ''}`}><span className="text-[10px] font-semibold tracking-[0.2em] text-[#9b6d30]">{step.number}</span><h3 className="mt-3 font-serif text-2xl text-[#07111f]">{step.title}</h3><p className="mt-4 text-sm leading-7 text-[#617083]">{step.copy}</p></div>
          </motion.article>; })}</div>
        </div>
      </div>
    </section>
  );
}
