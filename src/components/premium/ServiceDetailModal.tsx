'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { practiceAreas, type PracticeArea } from '@/data/services';

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

/* ─────────────── animated wrapper ─────────────── */
function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────── main modal ─────────────── */
interface ServiceDetailModalProps {
  area: PracticeArea | null;
  open: boolean;
  onClose: () => void;
}

export default function ServiceDetailModal({
  area,
  open,
  onClose,
}: ServiceDetailModalProps) {
  /* Derive related practice areas */
  const relatedAreas = useMemo(() => {
    if (!area) return [];
    return area.relatedServices
      .map((id) => practiceAreas.find((p) => p.id === id))
      .filter(Boolean) as PracticeArea[];
  }, [area]);

  if (!area) return null;

  const IconComponent = iconMap[area.icon] || FileText;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="
          z-[100]
          w-full max-w-3xl
          rounded-2xl
          border border-white/[0.08]
          bg-[#1a1a2e]/90
          backdrop-blur-2xl
          p-0 overflow-hidden
          text-white
          shadow-2xl
          max-h-[90vh]
          flex flex-col
        "
        showCloseButton={false}
      >
        {/* ─── Close button ─── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-[var(--gold)]/40 transition-colors duration-300"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 1L13 13M13 1L1 13" />
          </svg>
        </button>

        {/* ─── Header ─── */}
        <div className="relative px-6 md:px-8 pt-7 pb-5 border-b border-white/[0.06]">
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 gold-gradient" />

          {/* Decorative corner ornaments */}
          <svg className="absolute top-2 left-4 opacity-20" width="24" height="24" viewBox="0 0 60 60" fill="none" aria-hidden="true">
            <path d="M0 60 L0 8 Q0 0 8 0 L60 0" stroke="var(--gold)" strokeWidth="1" fill="none" />
          </svg>
          <svg className="absolute top-2 right-4 opacity-20 rotate-90" width="24" height="24" viewBox="0 0 60 60" fill="none" aria-hidden="true">
            <path d="M0 60 L0 8 Q0 0 8 0 L60 0" stroke="var(--gold)" strokeWidth="1" fill="none" />
          </svg>

          <AnimatePresence>
            {open && (
              <>
                <FadeIn delay={0.05}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/20 mb-4">
                    <IconComponent className="w-6 h-6 text-gold" />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <DialogTitle className="font-serif text-2xl md:text-3xl text-white tracking-tight pr-8">
                    {area.title}
                  </DialogTitle>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <DialogDescription asChild>
                    <p className="text-gold italic text-sm md:text-base mt-1.5">
                      {area.tagline}
                    </p>
                  </DialogDescription>
                </FadeIn>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Tabbed Content ─── */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="px-6 md:px-8 py-5">
            <Tabs defaultValue="overview" className="w-full">
              {/* Tab list – dark premium style */}
              <TabsList className="mb-6 h-10 w-full bg-white/[0.04] rounded-lg border border-white/[0.06] p-1">
                {['Overview', 'How We Help', 'Process', 'FAQs'].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase().replace(/\s+/g, '-')}
                    className="text-xs md:text-sm font-medium text-white/50 data-[state=active]:text-gold data-[state=active]:bg-[var(--gold)]/10 data-[state=active]:border-[var(--gold)]/20 data-[state=active]:shadow-none rounded-md border border-transparent transition-all duration-300"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* ── Overview ── */}
              <TabsContent value="overview">
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="space-y-5"
                    >
                      <p className="text-white/70 text-sm md:text-base leading-relaxed">
                        {area.description}
                      </p>

                      {/* Common situations */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
                          Common Situations
                        </h4>
                        <ul className="space-y-2.5">
                          {area.commonSituations.map((s, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-white/60"
                            >
                              <CheckCircle2 className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Features as tags */}
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
                          Key Services
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {area.features.map((f, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-white/60 border border-white/[0.06]"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>

              {/* ── How We Help ── */}
              <TabsContent value="how-we-help">
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="space-y-4"
                    >
                      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">
                        How We Help
                      </h4>
                      <ol className="space-y-4">
                        {area.howWeHelp.map((help, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                            className="flex items-start gap-4"
                          >
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center text-gold text-sm font-semibold">
                              {i + 1}
                            </span>
                            <p className="text-white/70 text-sm md:text-base leading-relaxed pt-1">
                              {help}
                            </p>
                          </motion.li>
                        ))}
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>

              {/* ── Process ── */}
              <TabsContent value="process">
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-5">
                        Our Process
                      </h4>
                      <div className="relative">
                        {/* Vertical timeline line */}
                        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--gold)]/40 via-[var(--gold)]/20 to-transparent" />

                        <div className="space-y-6">
                          {area.process.map((step, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: 0.15 + i * 0.1 }}
                              className="flex items-start gap-5 relative"
                            >
                              {/* Timeline node */}
                              <div className="relative flex-shrink-0">
                                <div className="w-[32px] h-[32px] rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center z-10 relative">
                                  <span className="text-gold text-xs font-bold">
                                    {i + 1}
                                  </span>
                                </div>
                              </div>
                              {/* Content */}
                              <div className="pt-0.5 pb-2">
                                <h5 className="text-white font-medium text-sm md:text-base">
                                  {step.step}
                                </h5>
                                <p className="text-white/50 text-xs md:text-sm mt-1 leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>

              {/* ── FAQs ── */}
              <TabsContent value="faqs">
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                        Frequently Asked Questions
                      </h4>
                      <Accordion type="single" collapsible className="space-y-2">
                        {area.faqs.map((faq, i) => (
                          <AccordionItem
                            key={i}
                            value={`faq-${i}`}
                            className="border border-white/[0.06] rounded-lg px-4 data-[state=open]:border-[var(--gold)]/20 transition-colors duration-300 bg-white/[0.02]"
                          >
                            <AccordionTrigger className="text-sm md:text-base text-white/80 hover:text-gold transition-colors duration-200 py-4 text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-white/50 text-sm leading-relaxed pb-4">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabsContent>
            </Tabs>

            {/* ─── Related Services ─── */}
            {relatedAreas.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
                  Related Services
                </h4>
                <div className="flex flex-wrap gap-3">
                  {relatedAreas.map((related) => {
                    const RelIcon = iconMap[related.icon] || FileText;
                    return (
                      <div
                        key={related.id}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/60 hover:text-gold hover:border-[var(--gold)]/20 transition-colors duration-300 cursor-pointer text-sm"
                        onClick={() => {
                          /* Parent will handle navigation via callback – for now just visual */
                        }}
                      >
                        <RelIcon className="w-4 h-4" />
                        <span>{related.shortTitle}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── CTA ─── */}
            <div className="mt-8 pb-2">
              <a
                href="#contact"
                onClick={() => onClose()}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl gold-gradient text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <p className="text-white/30 text-xs mt-3">
                No obligation — let us understand your needs first
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
