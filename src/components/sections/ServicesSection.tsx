'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Building2,
  Check,
  FileSignature,
  FileText,
  Heart,
  Scale,
  Shield,
  Stamp,
  type LucideIcon,
} from 'lucide-react';
import { practiceAreas, type PracticeArea } from '@/data/services';
import ServiceDetailModal from '@/components/premium/ServiceDetailModal';

const iconMap: Record<string, LucideIcon> = { Building2, Shield, FileText, Heart, FileSignature, Stamp, Scale, Banknote };

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<PracticeArea | null>(null);
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const active = practiceAreas[activeIndex];
  const ActiveIcon = iconMap[active.icon] || FileText;

  useEffect(() => {
    const rail = railRef.current;
    const activeButton = railRef.current?.querySelector<HTMLElement>(`[data-service-index="${activeIndex}"]`);
    if (!rail || !activeButton) return;
    const left = activeButton.offsetLeft - (rail.clientWidth - activeButton.clientWidth) / 2;
    rail.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [activeIndex, reduceMotion]);

  return (
    <section id="services" data-interactive-zone className="relative isolate scroll-mt-24 overflow-hidden bg-[#f7f3eb] py-20 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-65 [background-image:radial-gradient(circle_at_92%_10%,rgba(217,175,107,0.18),transparent_24rem),linear-gradient(rgba(7,17,31,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(7,17,31,0.025)_1px,transparent_1px)] [background-size:auto,80px_80px,80px_80px]" />

      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-[#07111f]/10 pb-9 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:pb-11">
          <div>
            <span className="editorial-label">Practice areas · Pretoria East</span>
            <h2 className="section-title mt-5 max-w-[11ch] text-[#07111f]">One firm. Several ways <span className="italic text-[#a87535]">forward.</span></h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-2xl text-[1rem] leading-8 text-[#526071] sm:text-[1.08rem]">Legal matters rarely arrive with a clear label. Begin with what is happening in your life or business, then explore the legal support, likely process and practical next step in language that makes sense.</p>
            <p className="mt-3 text-xs leading-6 text-[#788392]">Each detailed service guide helps you recognise when to act, what the firm can manage and what may be useful to prepare—before you commit to a consultation.</p>
          </div>
        </div>

        <div ref={railRef} className="service-offering-rail -mx-4 mt-7 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-3 lg:hidden" aria-label="Choose a practice area">
          {practiceAreas.map((area, index) => {
            const Icon = iconMap[area.icon] || FileText;
            const isActive = index === activeIndex;
            return (
              <button
                key={area.id}
                type="button"
                data-service-index={index}
                onClick={() => setActiveIndex(index)}
                className={`flex min-h-12 shrink-0 snap-center items-center gap-2.5 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a87535] ${isActive ? 'border-[#d9af6b] bg-[#07111f] text-white shadow-[0_14px_34px_rgba(7,17,31,0.2)]' : 'border-[#07111f]/10 bg-white/80 text-[#526071]'}`}
                aria-pressed={isActive}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-[#edcd94]' : 'text-[#a87535]'}`} strokeWidth={1.7} />
                {area.shortTitle}
              </button>
            );
          })}
        </div>

        <div className="mt-5 overflow-hidden rounded-[2rem_2rem_4.75rem_2rem] border border-[#d9af6b]/20 bg-[#07111f] shadow-[0_36px_110px_rgba(7,17,31,0.18)] lg:mt-12 lg:grid lg:min-h-[690px] lg:grid-cols-[0.34fr_0.66fr] lg:rounded-[2.5rem_2.5rem_7rem_2.5rem]">
          <aside className="relative hidden overflow-hidden border-r border-white/9 bg-[#050d18] p-7 text-white lg:flex lg:flex-col xl:p-10">
            <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full border border-[#d9af6b]/14" />
            <div className="pointer-events-none absolute -left-16 top-36 h-56 w-56 rounded-full border border-white/[0.055]" />
            <p className="editorial-label editorial-label--dark relative">Select your service</p>
            <nav className="relative mt-8 flex-1" aria-label="Practice areas">
              {practiceAreas.map((area, index) => {
                const Icon = iconMap[area.icon] || FileText;
                const isActive = index === activeIndex;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group grid w-full grid-cols-[2.2rem_1fr_2.8rem] items-center gap-3 border-t border-white/9 py-4 text-left transition last:border-b focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9af6b] ${isActive ? 'text-[#fffaf1]' : 'text-white/48 hover:text-white'}`}
                    aria-pressed={isActive}
                  >
                    <span className={`text-[10px] font-semibold tracking-[0.16em] ${isActive ? 'text-[#d9af6b]' : 'text-white/25'}`}>{String(index + 1).padStart(2, '0')}</span>
                    <span className="flex items-center gap-3 font-serif text-[1.12rem] xl:text-[1.28rem]"><Icon className={`h-4 w-4 ${isActive ? 'text-[#d9af6b]' : 'text-white/20'}`} strokeWidth={1.5} />{area.shortTitle}</span>
                    <span className={`grid h-9 w-9 place-items-center rounded-full border transition ${isActive ? 'border-[#d9af6b]/60 bg-[#d9af6b] text-[#07111f]' : 'border-white/10 text-white/28 group-hover:border-[#d9af6b]/30 group-hover:text-[#d9af6b]'}`}><ArrowRight className="h-3.5 w-3.5" /></span>
                  </button>
                );
              })}
            </nav>
            <p className="relative mt-7 max-w-xs text-xs leading-6 text-white/34">Choose an area for a useful overview. The firm will confirm the appropriate legal route after understanding your circumstances.</p>
          </aside>

          <div className="relative min-h-[620px] overflow-hidden bg-[#fffdf8] lg:min-h-[690px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(217,175,107,0.22),transparent_24rem),linear-gradient(145deg,rgba(255,255,255,0.96),rgba(246,239,226,0.74))]" />
            <div className="pointer-events-none absolute right-[-6rem] top-[-6rem] h-80 w-80 rounded-full border border-[#a87535]/10" />

            <AnimatePresence mode="wait">
              <motion.article
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex min-h-[620px] flex-col p-6 sm:p-9 lg:min-h-[690px] lg:p-12 xl:p-14"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="editorial-label">{active.tagline}</span>
                    <h3 className="mt-4 max-w-[10ch] font-serif text-[clamp(2.9rem,7vw,5.9rem)] font-medium leading-[0.9] tracking-[-0.055em] text-[#07111f]">{active.shortTitle}</h3>
                  </div>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#a87535]/24 bg-[#07111f] text-[#edcd94] shadow-[0_18px_52px_rgba(7,17,31,0.16)] sm:h-16 sm:w-16"><ActiveIcon className="h-6 w-6" strokeWidth={1.45} /></span>
                </div>

                <p className="mt-6 max-w-3xl text-[0.98rem] leading-8 text-[#526071] sm:text-[1.06rem]">{active.description}</p>

                <div className="mt-8 grid gap-8 border-t border-[#07111f]/10 pt-7 md:grid-cols-[1fr_0.82fr]">
                  <div>
                    <p className="editorial-label">How the firm may help</p>
                    <ul className="mt-5 space-y-3.5">
                      {active.howWeHelp.slice(0, 4).map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-[#435266] sm:text-[0.94rem]"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#a87535]/35 text-[#a87535]"><Check className="h-3 w-3" /></span>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[1.3rem_3.4rem_3.4rem_1.3rem] bg-[#07111f] p-5 text-white shadow-[0_20px_60px_rgba(7,17,31,0.15)] sm:p-6">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">What you can expect</p>
                    <p className="mt-3 font-serif text-2xl leading-tight text-[#fffaf1]">Clear advice before the legal detail begins.</p>
                    <p className="mt-3 text-xs leading-6 text-white/55">See the likely route, the documents that may matter and the decisions ahead—so your first conversation starts with purpose.</p>
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-3 border-t border-[#07111f]/10 pt-7 sm:flex-row sm:items-center">
                  <Link href={`/services/${active.id}`} className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-7 text-sm font-bold text-[#07111f] shadow-[0_17px_45px_rgba(168,117,53,0.2)] transition hover:-translate-y-0.5 hover:bg-[#edcd94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#07111f] lg:hidden">Explore the full service <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
                  <button type="button" onClick={() => setSelectedService(active)} className="group hidden min-h-14 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-7 text-sm font-bold text-[#07111f] shadow-[0_17px_45px_rgba(168,117,53,0.2)] transition hover:-translate-y-0.5 hover:bg-[#edcd94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#07111f] lg:inline-flex">Open service guide <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
                  <a href="#consultation-builder" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#07111f]/12 px-7 text-sm font-semibold text-[#435266] transition hover:border-[#a87535]/40 hover:bg-white">Prepare for a consultation <ArrowRight className="h-4 w-4 text-[#a87535]" /></a>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[#07111f]/10 pt-6 text-xs leading-6 text-[#6c7888] sm:flex-row sm:items-center sm:justify-between">
          <p>General information only. Every legal matter depends on its own facts and circumstances.</p>
          <a href="#pathfinder" className="inline-flex items-center gap-2 font-semibold text-[#8d612a]">Not sure which service applies? Use the Legal Pathfinder <ArrowRight className="h-3.5 w-3.5" /></a>
        </div>
      </div>

      <ServiceDetailModal area={selectedService} open={!!selectedService} onClose={() => setSelectedService(null)} onSelectArea={setSelectedService} />
    </section>
  );
}
