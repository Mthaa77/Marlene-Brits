'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { practiceAreas, type PracticeArea } from '@/data/services';
import {
  Building2,
  Shield,
  FileText,
  Heart,
  FileSignature,
  Stamp,
  Scale,
  Banknote,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import ServiceDetailModal from '@/components/premium/ServiceDetailModal';
import { ElegantLineDivider } from '@/components/premium/SVGDividers';
import { SectionPattern, GeometricMandala } from '@/components/premium/BackgroundPatterns';

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

function PracticeIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name] || FileText;
  return <IconComponent className={className} />;
}

function ServiceCard({
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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={onLearnMore}
        className="group relative glass rounded-2xl overflow-hidden h-full cursor-pointer border border-white/[0.06] hover:border-[var(--gold)]/40 transition-all duration-500"
      >
        {/* Gold top line on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Subtle gold glow on hover */}
        <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none gold-glow" />

        <div className="relative p-6 md:p-8">
          {/* Icon */}
          <div className="mb-5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--gold)]/10 group-hover:bg-[var(--gold)]/20 transition-colors duration-300">
              <PracticeIcon name={area.icon} className="w-6 h-6 text-gold" />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl md:text-2xl text-white tracking-tight group-hover:text-gold-light transition-colors duration-300">
            {area.shortTitle}
          </h3>

          {/* Tagline */}
          <p className="text-gold italic text-sm mt-2">{area.tagline}</p>

          {/* Description */}
          <p className="text-white/60 text-sm mt-3 leading-relaxed line-clamp-3">
            {area.description}
          </p>

          {/* Features */}
          <div className="mt-5 space-y-2">
            {area.features.slice(0, 4).map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
            <AnimatePresence>
              {isHovered && area.features.length > 4 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {area.features.slice(4).map((feature, i) => (
                    <div
                      key={`more-${i}`}
                      className="flex items-start gap-2.5 text-sm text-white/70 mt-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Learn more indicator */}
          <button
            onClick={onLearnMore}
            className="mt-6 flex items-center gap-2 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      <div
        onClick={onLearnMore}
        className="relative glass rounded-2xl overflow-hidden border border-white/[0.06] hover:border-[var(--gold)]/30 transition-all duration-500 hover:gold-glow cursor-pointer"
      >
        {/* Gold accent at top */}
        <div className="h-1 gold-gradient" />

        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Icon + title */}
            <div className="md:w-2/5">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--gold)]/10 mb-5">
                <PracticeIcon name={area.icon} className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-white tracking-tight">
                {area.shortTitle}
              </h3>
              <p className="text-gold italic mt-2">{area.tagline}</p>

              {/* Process steps */}
              <div className="mt-6 space-y-3">
                {area.process.slice(0, 3).map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-gold text-xs font-semibold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-white/90 text-sm font-medium">
                        {step.step}
                      </p>
                      <p className="text-white/50 text-xs mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Details */}
            <div className="md:w-3/5 md:border-l md:border-white/[0.06] md:pl-8">
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                {area.description}
              </p>

              {/* How we help */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">
                  How We Help
                </h4>
                <ul className="space-y-2">
                  {area.howWeHelp.slice(0, 3).map((help, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-white/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                      <span>{help}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key features as tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {area.features.slice(0, 4).map((feature, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-white/60 border border-white/[0.06]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<PracticeArea | null>(null);
  const featuredIds = ['conveyancing', 'deceased-estates', 'estate-planning'];
  const featuredAreas = practiceAreas.filter((a) => featuredIds.includes(a.id));
  const gridAreas = practiceAreas;

  return (
    <section
      id="services"
      className="relative py-20 md:py-28 bg-charcoal overflow-hidden"
    >
      {/* Background decorative elements */}
      <SectionPattern pattern="crosshatch" className="opacity-40" />
      <GeometricMandala className="top-10 right-10" size={180} opacity={0.02} />
      <GeometricMandala className="bottom-10 left-10" size={150} opacity={0.015} />
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-[var(--gold)]/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-[var(--gold)]/[0.03] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-gold text-xs font-semibold uppercase tracking-luxury mb-4 font-cormorant">
            Practice Areas
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white tracking-tight">
            Comprehensive Legal Services
          </h2>
          <div className="elegant-divider-dark w-24 mx-auto my-6" />
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive legal services tailored to your needs
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {gridAreas.map((area, index) => (
            <ServiceCard
              key={area.id}
              area={area}
              index={index}
              onLearnMore={() => setSelectedService(area)}
            />
          ))}
        </div>

        {/* Elegant divider between grid and featured */}
        <ElegantLineDivider />

        {/* Featured Practice Areas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 md:mt-28"
        >
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Featured Services
            </span>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white tracking-tight">
              Our Core Practice Areas
            </h3>
            <div className="elegant-divider-dark w-16 mx-auto my-5" />
            <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto">
              In-depth expertise where it matters most
            </p>
          </div>

          <div className="space-y-8">
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16 md:mt-20"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl gold-gradient text-white font-semibold text-sm md:text-base tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <p className="text-white/30 text-xs mt-4">
            No obligation — let us understand your needs first
          </p>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        area={selectedService}
        open={selectedService !== null}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}
