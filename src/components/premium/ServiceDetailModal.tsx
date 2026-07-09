'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
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
import {
  ArrowRight,
  Banknote,
  Building2,
  CalendarCheck,
  CheckCircle2,
  FileSignature,
  FileText,
  Heart,
  MessageCircle,
  Scale,
  Shield,
  Sparkles,
  Stamp,
  X,
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

const tabItems = [
  { value: 'overview', label: 'Overview' },
  { value: 'help', label: 'How We Help' },
  { value: 'process', label: 'Process' },
  { value: 'faqs', label: 'FAQs' },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/24 bg-gold/10 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/86">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function FeatureCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-4 shadow-[0_18px_55px_rgba(0,0,0,0.16)]">
      {children}
    </div>
  );
}

interface ServiceDetailModalProps {
  area: PracticeArea | null;
  open: boolean;
  onClose: () => void;
}

export default function ServiceDetailModal({ area, open, onClose }: ServiceDetailModalProps) {
  const relatedAreas = useMemo(() => {
    if (!area) return [];
    return area.relatedServices
      .map((id) => practiceAreas.find((p) => p.id === id))
      .filter(Boolean) as PracticeArea[];
  }, [area]);

  if (!area) return null;

  const IconComponent = iconMap[area.icon] || FileText;

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="z-[110] max-h-[92svh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-gold/24 bg-[#050814]/95 p-0 text-white shadow-[0_48px_160px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:max-w-5xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/24 bg-[#050814]/76 text-white/70 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-300 hover:border-gold/50 hover:bg-gold hover:text-[#071020]"
          aria-label="Close service details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(214,165,96,0.18),transparent_24rem),radial-gradient(circle_at_86%_18%,rgba(255,255,255,0.08),transparent_22rem),linear-gradient(135deg,rgba(5,8,20,0.98),rgba(13,20,37,0.96))]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:54px_54px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="service-modal-scroll relative z-10 flex max-h-[92svh] flex-col overflow-y-auto lg:grid lg:grid-cols-[0.88fr_1.12fr] lg:overflow-hidden">
          <div className="relative min-h-[320px] border-b border-gold/18 p-6 sm:p-8 lg:min-h-full lg:border-b-0 lg:border-r lg:p-9">
            <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-gold/14 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-white/6 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <FadeIn delay={0.04}>
                  <GoldBadge>Practice Area</GoldBadge>
                </FadeIn>

                <FadeIn delay={0.08}>
                  <div className="mt-7 flex h-20 w-20 items-center justify-center rounded-[1.5rem] border border-gold/34 bg-[linear-gradient(135deg,#f4d79b,#c58a44)] text-[#071020] shadow-[0_24px_70px_rgba(214,165,96,0.28)]">
                    <IconComponent className="h-9 w-9" />
                  </div>
                </FadeIn>

                <FadeIn delay={0.12}>
                  <DialogTitle className="mt-7 max-w-lg font-serif-optical text-[clamp(2.35rem,6vw,4.55rem)] font-semibold leading-[0.92] tracking-[-0.058em] text-white">
                    {area.shortTitle}
                  </DialogTitle>
                </FadeIn>

                <FadeIn delay={0.16}>
                  <DialogDescription asChild>
                    <p className="mt-4 max-w-md font-cormorant text-2xl italic leading-snug text-gold/92">
                      {area.tagline}
                    </p>
                  </DialogDescription>
                </FadeIn>
              </div>

              <FadeIn delay={0.2}>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <FeatureCard>
                    <div className="flex items-center gap-3">
                      <CalendarCheck className="h-5 w-5 text-gold" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Approach</p>
                        <p className="text-sm font-medium text-white/78">Clear next steps</p>
                      </div>
                    </div>
                  </FeatureCard>
                  <FeatureCard>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gold" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Support</p>
                        <p className="text-sm font-medium text-white/78">Risk-aware guidance</p>
                      </div>
                    </div>
                  </FeatureCard>
                  <FeatureCard>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-gold" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Updates</p>
                        <p className="text-sm font-medium text-white/78">Transparent communication</p>
                      </div>
                    </div>
                  </FeatureCard>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-col lg:max-h-[92svh]">
            <div className="border-b border-white/10 px-5 py-4 sm:px-7">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-[1.3rem] border border-white/10 bg-white/[0.055] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:grid-cols-4">
                  {tabItems.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="rounded-[1rem] px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/52 transition-all duration-300 data-[state=active]:bg-gold data-[state=active]:text-[#071020] data-[state=active]:shadow-[0_14px_38px_rgba(214,165,96,0.22)]"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <div className="service-modal-scroll max-h-[calc(92svh-11rem)] overflow-y-auto px-1 py-5 sm:max-h-[calc(92svh-10rem)] sm:px-0 lg:max-h-[calc(92svh-7rem)]">
                  <TabsContent value="overview" className="mt-0 px-4 sm:px-7">
                    <FadeIn>
                      <div className="space-y-7">
                        <p className="max-w-3xl text-base leading-8 text-white/70">
                          {area.description}
                        </p>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="rounded-[1.5rem] border border-gold/18 bg-gold/10 p-5">
                            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/86">
                              Common Situations
                            </h4>
                            <ul className="space-y-3">
                              {area.commonSituations.slice(0, 5).map((situation) => (
                                <li key={situation} className="flex items-start gap-3 text-sm leading-6 text-white/68">
                                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold" />
                                  <span>{situation}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5">
                            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/86">
                              Key Services
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {area.features.map((feature) => (
                                <span key={feature} className="rounded-full border border-gold/16 bg-gold/10 px-3 py-2 text-xs text-white/70">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  </TabsContent>

                  <TabsContent value="help" className="mt-0 px-4 sm:px-7">
                    <FadeIn>
                      <div className="space-y-4">
                        {area.howWeHelp.map((help, index) => (
                          <motion.div
                            key={help}
                            initial={{ opacity: 0, x: 18 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.34, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
                            className="flex gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-4"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold text-sm font-bold text-[#071020] shadow-[0_14px_36px_rgba(214,165,96,0.22)]">
                              {index + 1}
                            </span>
                            <p className="pt-1 text-sm leading-7 text-white/70 sm:text-base">{help}</p>
                          </motion.div>
                        ))}
                      </div>
                    </FadeIn>
                  </TabsContent>

                  <TabsContent value="process" className="mt-0 px-4 sm:px-7">
                    <FadeIn>
                      <div className="relative rounded-[1.75rem] border border-gold/18 bg-white/[0.045] p-5">
                        <div className="absolute bottom-8 left-[2.45rem] top-8 w-px bg-gradient-to-b from-gold/70 via-gold/28 to-transparent" />
                        <div className="space-y-6">
                          {area.process.map((step, index) => (
                            <motion.div
                              key={step.step}
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.36, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                              className="relative flex gap-5"
                            >
                              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/28 bg-[#050814] text-sm font-bold text-gold shadow-[0_16px_40px_rgba(0,0,0,0.24)]">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <div className="pb-2 pt-0.5">
                                <h4 className="font-serif-optical text-2xl font-semibold leading-tight text-white">
                                  {step.step}
                                </h4>
                                <p className="mt-2 text-sm leading-7 text-white/58">{step.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  </TabsContent>

                  <TabsContent value="faqs" className="mt-0 px-4 sm:px-7">
                    <FadeIn>
                      <Accordion type="single" collapsible className="space-y-3">
                        {area.faqs.map((faq, index) => (
                          <AccordionItem
                            key={faq.question}
                            value={`service-faq-${index}`}
                            className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.055] px-5 transition-all duration-300 data-[state=open]:border-gold/34 data-[state=open]:bg-gold/10"
                          >
                            <AccordionTrigger className="py-5 text-left font-serif-optical text-lg font-semibold leading-snug text-white hover:text-gold hover:no-underline [&>svg]:text-gold/70">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="pb-5 text-sm leading-7 text-white/62">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </FadeIn>
                  </TabsContent>

                  {relatedAreas.length > 0 && (
                    <div className="mx-4 mt-8 border-t border-white/10 pt-6 sm:mx-7">
                      <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/86">
                        Related Services
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {relatedAreas.map((related) => {
                          const RelatedIcon = iconMap[related.icon] || FileText;
                          return (
                            <span
                              key={related.id}
                              className="inline-flex items-center gap-2 rounded-full border border-gold/18 bg-gold/10 px-4 py-2.5 text-xs font-medium text-white/68"
                            >
                              <RelatedIcon className="h-4 w-4 text-gold" />
                              {related.shortTitle}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="mx-4 mt-8 rounded-[1.5rem] border border-gold/20 bg-[linear-gradient(135deg,rgba(214,165,96,0.16),rgba(255,255,255,0.045))] p-5 sm:mx-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/86">
                          Ready to move forward?
                        </p>
                        <p className="mt-1 text-sm leading-6 text-white/62">
                          Let the firm understand your matter and guide the best next step.
                        </p>
                      </div>
                      <a
                        href="#contact"
                        onClick={onClose}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#071020] shadow-[0_18px_48px_rgba(214,165,96,0.24)] transition-transform duration-300 hover:-translate-y-0.5"
                      >
                        Book Consultation
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
