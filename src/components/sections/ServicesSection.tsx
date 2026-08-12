'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Banknote, Building2, Check, FileSignature, FileText, Heart, Scale, Shield, Stamp, type LucideIcon } from 'lucide-react';
import { practiceAreas, type PracticeArea } from '@/data/services';
import ServiceDetailModal from '@/components/premium/ServiceDetailModal';

const iconMap: Record<string, LucideIcon> = { Building2, Shield, FileText, Heart, FileSignature, Stamp, Scale, Banknote };

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<PracticeArea | null>(null);
  const reduceMotion = useReducedMotion();
  const active = practiceAreas[activeIndex];
  const ActiveIcon = iconMap[active.icon] || FileText;

  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden bg-[#f7f3eb] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#d9af6b]/12 blur-3xl" />
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b6d30]">Explore our practice</span><h2 className="mt-4 max-w-xl font-serif text-[clamp(2.8rem,6vw,5.4rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#07111f]">One firm. Several ways forward.</h2></div>
          <p className="max-w-2xl text-base leading-8 text-[#526071] lg:justify-self-end lg:text-lg">Select a practice area to see how the firm can support the matter, then open the full service guide when you are ready.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="relative overflow-hidden rounded-[2rem_2rem_2rem_6rem] border border-[#07111f]/9 bg-white p-3 shadow-[0_22px_70px_rgba(7,17,31,0.08)]">
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#d9af6b]/10 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
              {practiceAreas.map((area, index) => { const Icon = iconMap[area.icon] || FileText; const isActive = index === activeIndex; return (
                <button key={area.id} type="button" onClick={() => setActiveIndex(index)} className={`group flex min-h-16 items-center gap-3 rounded-[1rem_2.5rem_2.5rem_1rem] px-3 py-3 text-left transition sm:px-4 ${isActive ? 'bg-[#07111f] text-white shadow-[0_14px_35px_rgba(7,17,31,0.18)]' : 'text-[#526071] hover:bg-[#f7f3eb] hover:text-[#07111f]'}`} aria-pressed={isActive}>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${isActive ? 'bg-[#d9af6b] text-[#07111f]' : 'border border-[#07111f]/9 bg-[#f7f3eb] text-[#9b6d30]'}`}><Icon className="h-4 w-4" strokeWidth={1.6} /></span><span className="min-w-0"><span className="block truncate text-xs font-semibold sm:text-sm">{area.shortTitle}</span><span className={`mt-0.5 hidden text-[10px] lg:block ${isActive ? 'text-white/42' : 'text-[#7b8795]'}`}>{String(index + 1).padStart(2, '0')} · Practice area</span></span>
                </button>
              ); })}
            </div>
          </div>

          <div className="relative min-h-[570px] overflow-hidden rounded-[2rem_7rem_2rem_2rem] bg-[#07111f] text-white shadow-[0_34px_100px_rgba(7,17,31,0.22)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(217,175,107,0.18),transparent_22rem),linear-gradient(145deg,rgba(255,255,255,0.035),transparent_45%)]" />
            <AnimatePresence mode="wait">
              <motion.div key={active.id} initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.38 }} className="relative flex min-h-[570px] flex-col p-7 sm:p-10 lg:p-12">
                <div className="flex items-start justify-between gap-5"><span className="grid h-16 w-16 place-items-center rounded-full border border-[#d9af6b]/30 bg-[#d9af6b]/12 text-[#edcd94]"><ActiveIcon className="h-7 w-7" strokeWidth={1.5} /></span><span className="font-serif text-7xl leading-none text-white/[0.055]">{String(activeIndex + 1).padStart(2, '0')}</span></div>
                <div className="mt-auto max-w-3xl pt-12"><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d9af6b]">{active.tagline}</span><h3 className="mt-4 font-serif text-[clamp(2.8rem,6vw,5.3rem)] font-medium leading-[0.93] tracking-[-0.045em] text-[#fffaf1]">{active.shortTitle}</h3><p className="mt-5 line-clamp-4 max-w-2xl text-base leading-8 text-white/58">{active.description}</p>
                  <div className="mt-7 flex flex-wrap gap-2">{active.features.slice(0, 4).map((feature) => <span key={feature} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-xs text-white/62"><Check className="h-3.5 w-3.5 text-[#d9af6b]" />{feature}</span>)}</div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={() => setSelectedService(active)} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] transition hover:bg-[#edcd94]">Open service guide <ArrowUpRight className="h-4 w-4" /></button><a href="#consultation-builder" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/13 px-6 text-sm font-semibold text-white/75 transition hover:border-[#d9af6b]/38 hover:text-white">Prepare a consultation <ArrowRight className="h-4 w-4" /></a></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <ServiceDetailModal area={selectedService} open={!!selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
}
