'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageSquareText, Scale, UserRoundCheck } from 'lucide-react';

const reasons = [
  { icon: UserRoundCheck, title: 'Your matter stays personal', copy: 'You receive attentive legal support shaped around your circumstances—not a one-size-fits-all response.' },
  { icon: MessageSquareText, title: 'Clarity before complexity', copy: 'Legal processes are explained in plain language, with clear next steps and consistent communication.' },
  { icon: Scale, title: 'Precision where it counts', copy: 'Documents, deadlines and formal processes are handled with the care that important legal matters demand.' },
];

export default function WhyChooseUsSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-[#07111f] py-20 text-white sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,175,107,0.15),transparent_28rem)]" />
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center"><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d9af6b]">The Marlene Brits standard</span><h2 className="mt-4 font-serif text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#fffaf1]">Serious legal work, delivered humanly.</h2></div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {reasons.map((reason, index) => { const Icon = reason.icon; return (
            <motion.article key={reason.title} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-7 shadow-[0_22px_60px_rgba(0,0,0,0.16)] transition hover:-translate-y-1 hover:border-[#d9af6b]/32 hover:bg-white/[0.065] sm:p-8">
              <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d9af6b]/28 bg-[#d9af6b]/10 text-[#edcd94]"><Icon className="h-5 w-5" strokeWidth={1.6} /></span><span className="text-[10px] font-semibold tracking-[0.2em] text-white/26">0{index + 1}</span></div>
              <h3 className="mt-8 font-serif text-2xl text-[#fffaf1]">{reason.title}</h3><p className="mt-4 text-sm leading-7 text-white/56">{reason.copy}</p>
            </motion.article>
          ); })}
        </div>
      </div>
    </section>
  );
}
