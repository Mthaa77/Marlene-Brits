'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageSquareText, Scale, UserRoundCheck } from 'lucide-react';

const reasons = [
  { icon: UserRoundCheck, label: 'Personal', title: 'Counsel shaped around your reality', copy: 'The firm first understands your circumstances, priorities and concerns—because a sound legal route must make sense in the life or business it affects.' },
  { icon: MessageSquareText, label: 'Clear', title: 'Advice you can understand and use', copy: 'Legal language is translated into practical choices, visible next steps and an honest view of what the process may require from you.' },
  { icon: Scale, label: 'Precise', title: 'The important detail is never background', copy: 'Documents, deadlines and formal procedures receive the deliberate attention that protects progress and reduces avoidable uncertainty.' },
];

export default function WhyChooseUsSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-[#07111f] py-20 text-white sm:py-24 lg:py-28">
      <div data-scroll-ambient="20" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(217,175,107,0.14),transparent_30rem)]" />
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center"><span className="premium-kicker text-[#d9af6b]">The Marlene Brits standard</span><h2 className="premium-heading mt-4 font-serif text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#fffaf1]">Serious legal work. A distinctly human experience.</h2><p className="premium-lede mx-auto mt-6 max-w-2xl text-white/52 sm:text-base">Professional rigour should never make you feel removed from your own matter. The firm combines careful legal execution with communication that keeps you informed, involved and able to make the next decision with confidence.</p></div>
        <div className="relative mx-auto mt-14 max-w-6xl py-6 lg:min-h-[520px]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d9af6b]/16 lg:block" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 lg:block" />
          <div className="relative z-10 mx-auto flex h-60 w-60 flex-col items-center justify-center rounded-full border border-[#d9af6b]/28 bg-[#0b1a2c] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.3)] sm:h-72 sm:w-72"><span className="font-serif text-5xl italic text-[#d9af6b]">MB</span><span className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">You are never just another client</span></div>
          <div className="relative z-20 mt-8 grid gap-4 lg:absolute lg:inset-0 lg:mt-0">
            {reasons.map((reason, index) => { const Icon = reason.icon; const positions = ['lg:left-0 lg:top-7', 'lg:right-0 lg:top-7', 'lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2']; return <motion.article key={reason.title} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className={`rounded-[3.5rem_1.5rem_3.5rem_1.5rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition hover:border-[#d9af6b]/30 hover:bg-white/[0.07] lg:absolute lg:w-[310px] ${positions[index]}`}><div className="flex items-center gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#d9af6b] text-[#07111f]"><Icon className="h-5 w-5" strokeWidth={1.6} /></span><div><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">{reason.label}</span><h3 className="mt-1 font-serif text-xl text-[#fffaf1]">{reason.title}</h3></div></div><p className="mt-4 text-sm leading-7 text-white/52">{reason.copy}</p></motion.article>; })}
          </div>
        </div>
      </div>
    </section>
  );
}
