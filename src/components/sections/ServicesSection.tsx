'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Banknote,
  Building2,
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

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Shield,
  FileText,
  Heart,
  FileSignature,
  Stamp,
  Scale,
  Banknote,
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<PracticeArea | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden bg-white py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c99a52]/55 to-transparent" />

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="font-serif-optical text-[clamp(3rem,7vw,5.7rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#07101d]">
            Legal services for life’s
            <span className="block">important moments.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#364152] sm:text-lg">
            Practical legal support for individuals, families and businesses, delivered with direct communication and careful attention to detail.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-x-6 gap-y-7 md:grid-cols-2 xl:grid-cols-4">
          {practiceAreas.map((area, index) => {
            const Icon = iconMap[area.icon] || FileText;

            return (
              <motion.button
                key={area.id}
                type="button"
                onClick={() => setSelectedService(area)}
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.56, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex min-h-[310px] flex-col border-t border-[#c99a52]/38 bg-white px-1 py-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#c99a52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c99a52]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#07101d] text-[#d6a75e] shadow-[0_12px_30px_rgba(7,16,29,0.16)]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="font-serif-optical text-sm text-[#c99a52]">0{index + 1}</span>
                </div>

                <h3 className="mt-7 font-serif-optical text-[1.8rem] font-medium leading-tight tracking-[-0.035em] text-[#07101d]">
                  {area.shortTitle}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#596273]">{area.description}</p>

                <span className="mt-auto flex items-center gap-2 pt-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#8b622f]">
                  View service
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <ServiceDetailModal
        area={selectedService}
        open={selectedService !== null}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
