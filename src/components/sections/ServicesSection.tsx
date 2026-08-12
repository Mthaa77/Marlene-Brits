'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Banknote, Building2, FileSignature, FileText, Heart, Scale, Shield, Stamp, type LucideIcon } from 'lucide-react';
import { practiceAreas, type PracticeArea } from '@/data/services';
import ServiceDetailModal from '@/components/premium/ServiceDetailModal';

const iconMap: Record<string, LucideIcon> = { Building2, Shield, FileText, Heart, FileSignature, Stamp, Scale, Banknote };

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<PracticeArea | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden bg-[#f7f3eb] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#d9af6b]/10 blur-3xl" />
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-[#0c2136]/12 pb-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b6d30]">How we can help</span>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(2.8rem,6vw,5.4rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#07111f]">Legal support for the moments that matter.</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#526071] lg:justify-self-end lg:text-lg">From a property transfer to planning your estate, every matter receives clear guidance, careful legal work and direct communication.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {practiceAreas.map((area, index) => {
            const Icon = iconMap[area.icon] || FileText;
            return (
              <motion.button
                key={area.id}
                type="button"
                onClick={() => setSelectedService(area)}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.48, delay: index * 0.035 }}
                className={`group relative flex min-h-[285px] flex-col overflow-hidden rounded-[1.5rem] border p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(7,17,31,0.12)] ${index < 2 ? 'border-[#d9af6b]/28 bg-[#07111f] text-white' : 'border-[#0c2136]/10 bg-[#fffdf8] text-[#07111f]'}`}
              >
                <div className="flex items-start justify-between">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl border ${index < 2 ? 'border-[#d9af6b]/30 bg-[#d9af6b]/12 text-[#edcd94]' : 'border-[#d9af6b]/30 bg-[#d9af6b]/10 text-[#9b6d30]'}`}><Icon className="h-5 w-5" strokeWidth={1.6} /></span>
                  <span className={`text-[10px] font-semibold tracking-[0.18em] ${index < 2 ? 'text-[#d9af6b]' : 'text-[#9b6d30]'}`}>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="mt-auto pt-10">
                  <h3 className={`font-serif text-[1.65rem] font-medium leading-tight ${index < 2 ? 'text-[#fffaf1]' : 'text-[#07111f]'}`}>{area.shortTitle}</h3>
                  <p className={`mt-3 line-clamp-3 text-sm leading-6 ${index < 2 ? 'text-white/58' : 'text-[#617083]'}`}>{area.tagline}. {area.description}</p>
                  <span className={`mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em] ${index < 2 ? 'text-[#edcd94]' : 'text-[#8d612a]'}`}>View service <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <ServiceDetailModal area={selectedService} open={!!selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
}
