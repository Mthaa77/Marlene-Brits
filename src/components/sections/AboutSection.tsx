'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

const standards = ['Direct, personal attention', 'Clear communication at every stage', 'Careful, precise legal execution'];

export default function AboutSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8">
        <motion.div initial={reduceMotion ? false : { opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-[#07111f]/10 bg-[#07111f] shadow-[0_30px_90px_rgba(7,17,31,0.16)]">
            <Image src="/uploads/main-1612194838.jpg" alt="Marlene Brits Attorneys office at Spaces Menlyn Maine" fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/68 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 text-white"><MapPin className="h-5 w-5 text-[#edcd94]" /><div><p className="text-sm font-semibold">Pretoria East</p><p className="text-xs text-white/58">Spaces Menlyn Maine · Pegasus Building 1</p></div></div>
          </div>
          <div className="absolute -bottom-5 right-5 rounded-2xl border border-[#d9af6b]/28 bg-[#fffaf1] px-5 py-4 shadow-[0_18px_55px_rgba(7,17,31,0.14)] sm:right-8"><span className="block font-serif text-3xl text-[#07111f]">2019</span><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b6d30]">Practice founded</span></div>
        </motion.div>

        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-5 lg:pt-0">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b6d30]">About the firm</span>
          <h2 className="mt-4 max-w-xl font-serif text-[clamp(2.9rem,6vw,5.3rem)] font-medium leading-[0.93] tracking-[-0.05em] text-[#07111f]">Built on trust. Measured by the clarity clients receive.</h2>
          <p className="mt-6 text-base leading-8 text-[#526071] sm:text-lg">Based at Pegasus Building 1 in Menlyn Maine, Marlene Brits Attorneys combines legal precision with genuinely personal service across conveyancing, deceased estates, estate planning, family matters, notarial work and civil disputes.</p>
          <p className="mt-4 text-base leading-8 text-[#526071]">The standard is simple but demanding: understand the person before the paperwork, explain the implications before proceeding and remain attentive to every detail capable of affecting the client&apos;s interests.</p>
          <div className="mt-7 space-y-3">{standards.map((item) => <div key={item} className="flex items-center gap-3 rounded-xl border border-[#07111f]/8 bg-[#f8f5ee] px-4 py-3 text-sm font-medium text-[#263548]"><CheckCircle2 className="h-4 w-4 shrink-0 text-[#b7823e]" />{item}</div>)}</div>
          <a href="#team" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8d612a] transition hover:gap-3">Meet the team <ArrowRight className="h-4 w-4" /></a>
        </motion.div>
      </div>
    </section>
  );
}
