'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { practiceAreas, type PracticeArea } from '@/data/services';
import {
  ArrowRight,
  Banknote,
  Building2,
  CheckCircle2,
  Crown,
  FileSignature,
  FileText,
  Heart,
  Landmark,
  Scale,
  Shield,
  Sparkles,
  Stamp,
  type LucideIcon,
} from 'lucide-react';
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

const featuredIds = ['conveyancing', 'deceased-estates', 'estate-planning'];

function PracticeIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name] || FileText;
  return <IconComponent className={className} />;
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/22 bg-gold/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/85 shadow-[0_14px_40px_rgba(214,165,96,0.10)] backdrop-blur-xl">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function PracticeAreaCard({
  area,
  index,
  onLearnMore,
}: {
  area: PracticeArea;
  index: number;
  onLearnMore: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 42, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <motion.button
        type="button"
        onClick={onLearnMore}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.985 }}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.105),rgba(255,255,255,0.035))] p-6 text-left shadow-[0_34px_110px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all duration-500 hover:border-gold/38 sm:p-7"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent opacity-60" />
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gold/12 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-gold/[0.08] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute right-5 top-5 font-serif-optical text-5xl font-bold leading-none text-white/[0.045] transition-colors duration-500 group-hover:text-gold/[0.08]">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative mb-6 flex items-start justify-between gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/24 bg-gold/10 text-gold shadow-[0_18px_48px_rgba(214,165,96,0.14)] transition-all duration-500 group-hover:border-gold/50 group-hover:bg-[linear-gradient(135deg,#f4d79b,#c58a44)] group-hover:text-[#071020]">
            <PracticeIcon name={area.icon} className="h-7 w-7" />
          </div>

          <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/52">
            Practice Area
          </span>
        </div>

        <div className="relative">
          <h3 className="font-serif-optical text-2xl font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-gold-light sm:text-3xl">
            {area.shortTitle}
          </h3>
          <p className="mt-2 font-cormorant text-lg italic leading-snug text-gold/90">
            {area.tagline}
          </p>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/58">
            {area.description}
          </p>
        </div>

        <div className="relative mt-6 space-y-2.5">
          {area.features.slice(0, 3).map((feature) => (
            <div key={feature} className="flex items-start gap-3 text-sm text-white/60 transition-colors duration-300 group-hover:text-white/76">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{feature}</span>
            </div>
          ))}

          <AnimatePresence>
            {isHovered && area.features.length > 3 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                {area.features.slice(3, 5).map((feature) => (
                  <div key={feature} className="mt-2.5 flex items-start gap-3 text-sm text-white/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>{feature}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative mt-auto flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/70">
            View Details
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/22 bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-[#071020]">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </motion.button>
    </motion.article>
  );
}

function FeaturedService({
  area,
  index,
  onLearnMore,
}: {
  area: PracticeArea;
  index: number;
  onLearnMore: () => void;
}) {
  const Icon = iconMap[area.icon] || Landmark;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <button
        type="button"
        onClick={onLearnMore}
        className="relative w-full overflow-hidden rounded-[2rem] border border-gold/22 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-1 text-left shadow-[0_40px_130px_rgba(0,0,0,0.34)] backdrop-blur-2xl transition-all duration-500 hover:border-gold/45"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-white/6 blur-3xl" />

        <div className="relative grid gap-0 overflow-hidden rounded-[1.75rem] lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative flex min-h-[320px] flex-col justify-between border-b border-gold/18 bg-[linear-gradient(145deg,rgba(214,165,96,0.18),rgba(255,255,255,0.035))] p-7 lg:border-b-0 lg:border-r lg:p-9">
            <div>
              <div className="mb-6 flex items-center justify-between gap-5">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold text-[#071020] shadow-[0_20px_55px_rgba(214,165,96,0.28)]">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="rounded-full border border-gold/25 bg-[#071020]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/86">
                  Featured 0{index + 1}
                </span>
              </div>

              <h3 className="font-serif-optical text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {area.shortTitle}
              </h3>
              <p className="mt-3 font-cormorant text-xl italic text-gold/92">
                {area.tagline}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2">
              {area.process.slice(0, 3).map((step, i) => (
                <div key={step.step} className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
                  <span className="text-[10px] font-bold text-gold">0{i + 1}</span>
                  <p className="mt-1 line-clamp-2 text-xs font-medium leading-snug text-white/72">{step.step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative p-7 sm:p-8 lg:p-10">
            <p className="max-w-3xl text-base leading-8 text-white/68">
              {area.description}
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-5">
                <h4 className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/86">
                  <Crown className="h-4 w-4" />
                  How We Help
                </h4>
                <ul className="space-y-3">
                  {area.howWeHelp.slice(0, 3).map((help) => (
                    <li key={help} className="flex items-start gap-3 text-sm leading-6 text-white/62">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold" />
                      <span>{help}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-5">
                <h4 className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/86">
                  <Shield className="h-4 w-4" />
                  Key Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {area.features.slice(0, 5).map((feature) => (
                    <span key={feature} className="rounded-full border border-gold/18 bg-gold/10 px-3 py-1.5 text-xs text-white/68">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#071020] shadow-[0_18px_45px_rgba(214,165,96,0.24)]">
              Explore Service
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<PracticeArea | null>(null);
  const featuredAreas = practiceAreas.filter((area) => featuredIds.includes(area.id));

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#050814] py-20 text-white sm:py-28 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(214,165,96,0.2),transparent_26rem),radial-gradient(circle_at_88%_20%,rgba(255,255,255,0.08),transparent_24rem),linear-gradient(135deg,#050814,#0b1327_54%,#050814)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:60px_60px]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="absolute -left-28 top-1/4 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -right-28 bottom-1/4 h-80 w-80 rounded-full bg-gold/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-18"
        >
          <SectionBadge>Practice Areas</SectionBadge>
          <h2 className="mt-6 font-serif-optical text-[clamp(2.75rem,8vw,5.6rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white">
            Legal Expertise,
            <span className="block bg-gradient-to-r from-[#f4d79b] via-[#c58a44] to-[#f8e5bd] bg-clip-text text-transparent">
              Crafted With Care.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
            A premium, client-focused legal offering covering property, estates, family matters, notarial work, litigation, and commercial support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {practiceAreas.map((area, index) => (
            <PracticeAreaCard
              key={area.id}
              area={area}
              index={index}
              onLearnMore={() => setSelectedService(area)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-28"
        >
          <div className="mb-10 flex flex-col gap-5 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div>
              <SectionBadge>Featured Services</SectionBadge>
              <h3 className="mt-5 font-serif-optical text-[clamp(2.25rem,6vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-white">
                Core Services With
                <span className="block bg-gradient-to-r from-[#f4d79b] via-[#c58a44] to-[#f8e5bd] bg-clip-text text-transparent">
                  High-Value Impact.
                </span>
              </h3>
            </div>
            <p className="mx-auto max-w-xl text-sm leading-7 text-white/58 lg:mx-0">
              These flagship services often carry the highest client value because they protect assets, family interests, property rights, and long-term planning.
            </p>
          </div>

          <div className="space-y-7">
            {featuredAreas.map((area, index) => (
              <FeaturedService
                key={area.id}
                area={area}
                index={index}
                onLearnMore={() => setSelectedService(area)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="mt-16 text-center md:mt-20"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-[#071020] shadow-[0_22px_60px_rgba(214,165,96,0.26)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(214,165,96,0.34)]"
          >
            Book a Consultation
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-4 text-xs text-white/38">
            No obligation — let us understand your legal needs first.
          </p>
        </motion.div>
      </div>

      <ServiceDetailModal
        area={selectedService}
        open={selectedService !== null}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
