'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
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
import { company } from '@/data/company';
import { practiceAreas, type PracticeArea } from '@/data/services';

const iconMap: Record<string, LucideIcon> = { Building2, Shield, FileText, Heart, FileSignature, Stamp, Scale, Banknote };

const tabItems = [
  { value: 'overview', label: 'Overview' },
  { value: 'help', label: 'How we help' },
  { value: 'process', label: 'Process' },
  { value: 'prepare', label: 'What to prepare' },
  { value: 'faqs', label: 'FAQs' },
];

const preparationItems: Record<string, string[]> = {
  conveyancing: ['Signed offer to purchase or sale agreement', 'Identity and marital-status documents', 'Property, bond and estate-agent information', 'Any compliance certificates already available'],
  'deceased-estates': ['Death certificate and the original will, if available', 'Identity documents for the deceased and nominated executor', 'A preliminary list of assets, debts and policies', 'Any correspondence from the Master or SARS'],
  'estate-planning': ['Identity and family information', 'A high-level list of assets and liabilities', 'Your existing will or trust documents, if any', 'Names of intended heirs, guardians or executors'],
  'family-law': ['A short chronology of the matter', 'Marriage, parenting or court documents already issued', 'Relevant written communication', 'The outcome or immediate protection you need'],
  'antenuptial-contracts': ['Identity documents for both partners', 'Planned marriage date and venue', 'A broad overview of each estate', 'Your preference on the accrual system, if already considered'],
  'notarial-services': ['Original documents requiring certification or authentication', 'Valid identity documents', 'The country or authority where the document will be used', 'Any instructions received from that authority'],
  'civil-litigation': ['Contracts, notices or agreements connected to the dispute', 'A clear timeline of key events', 'Relevant correspondence and proof of payment', 'Details of any court date or deadline'],
  'debt-collection': ['Invoices, statements and signed agreements', 'Correct debtor contact and business details', 'A record of payments and outstanding balances', 'Previous demands or collection correspondence'],
};

function FadeIn({ children, delay = 0, reduced = false }: { children: React.ReactNode; delay?: number; reduced?: boolean }) {
  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 16, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.44, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

interface ServiceDetailModalProps {
  area: PracticeArea | null;
  open: boolean;
  onClose: () => void;
  onSelectArea: (area: PracticeArea) => void;
}

export default function ServiceDetailModal({ area, open, onClose, onSelectArea }: ServiceDetailModalProps) {
  const reduceMotion = useReducedMotion();
  const relatedAreas = useMemo(() => {
    if (!area) return [];
    return area.relatedServices.map((id) => practiceAreas.find((practice) => practice.id === id)).filter(Boolean) as PracticeArea[];
  }, [area]);

  if (!area) return null;

  const IconComponent = iconMap[area.icon] || FileText;
  const areaIndex = practiceAreas.findIndex((practice) => practice.id === area.id);
  const prepare = preparationItems[area.id] ?? ['A short summary of the matter', 'Relevant identity documents', 'Any agreements, notices or correspondence', 'Important dates or deadlines'];
  const whatsappText = encodeURIComponent(`Hello Marlene Brits Attorneys. I am interested in guidance about ${area.title}. Please let me know the best next step and what I should prepare.`);

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent showCloseButton={false} className="z-[110] max-h-[94svh] w-full max-w-6xl overflow-hidden rounded-[1.6rem_1.6rem_4rem_1.6rem] border border-[#d9af6b]/28 bg-[#050b15]/97 p-0 text-white shadow-[0_52px_180px_rgba(0,0,0,0.62)] backdrop-blur-2xl sm:max-w-6xl">
        <button type="button" onClick={onClose} className="absolute right-3 top-3 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-[#07111f]/92 text-white/68 shadow-[0_16px_44px_rgba(0,0,0,0.32)] backdrop-blur-xl transition hover:rotate-3 hover:border-[#d9af6b]/50 hover:bg-[#d9af6b] hover:text-[#07111f] sm:right-4 sm:top-4" aria-label="Close service details"><X className="h-5 w-5" /></button>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(217,175,107,0.18),transparent_26rem),radial-gradient(circle_at_92%_82%,rgba(255,255,255,0.055),transparent_24rem)]" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#edcd94] to-transparent" />

        <div className="relative z-10 flex min-w-0 max-h-[94svh] flex-col">
          <div className="min-w-0 shrink-0 border-b border-white/8 px-4 py-3 pr-16 sm:px-6 sm:py-4 sm:pr-20">
            <div className="service-modal-scroll flex max-w-full items-center gap-2 overflow-x-auto pb-1" aria-label="Switch practice area">
              {practiceAreas.map((practice, index) => {
                const PracticeIcon = iconMap[practice.icon] || FileText;
                const active = practice.id === area.id;
                return (
                  <button key={practice.id} type="button" onClick={() => onSelectArea(practice)} aria-pressed={active} className={`group flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-left transition ${active ? 'border-[#d9af6b]/48 bg-[#d9af6b] text-[#07111f] shadow-[0_12px_30px_rgba(217,175,107,0.2)]' : 'border-white/9 bg-white/[0.035] text-white/50 hover:border-[#d9af6b]/28 hover:text-white'}`}>
                    <PracticeIcon className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-semibold tracking-[0.04em]">{practice.shortTitle}</span>
                    <span className={`text-[8px] ${active ? 'text-[#07111f]/45' : 'text-white/22'}`}>{String(index + 1).padStart(2, '0')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div data-service-modal-scroll="main" className="service-modal-scroll min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain lg:grid lg:grid-cols-[0.78fr_1.22fr] lg:overflow-hidden">
            <aside className="relative min-w-0 overflow-hidden border-b border-white/9 px-6 py-6 sm:px-8 sm:py-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10">
              <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-[#d9af6b]/12 blur-3xl" />
              <div className="relative flex flex-col lg:h-full">
                <FadeIn reduced={!!reduceMotion}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]"><Sparkles className="h-3.5 w-3.5" /> Practice area</span>
                    <span className="font-serif text-5xl leading-none text-white/[0.07]">{String(areaIndex + 1).padStart(2, '0')}</span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.05} reduced={!!reduceMotion}>
                  <span className="mt-5 grid h-14 w-14 place-items-center rounded-full border border-[#d9af6b]/34 bg-[#d9af6b]/12 text-[#edcd94] shadow-[0_20px_60px_rgba(217,175,107,0.14)] sm:mt-6 sm:h-16 sm:w-16"><IconComponent className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} /></span>
                  <DialogTitle className="mt-5 max-w-lg font-serif text-[clamp(2.25rem,5vw,4.6rem)] font-medium leading-[0.9] tracking-[-0.055em] text-[#fffaf1] sm:mt-6">{area.shortTitle}</DialogTitle>
                  <DialogDescription asChild><p className="mt-4 max-w-md font-serif text-xl italic leading-snug text-[#edcd94]/88 sm:text-2xl">{area.tagline}</p></DialogDescription>
                </FadeIn>

                <FadeIn delay={0.1} reduced={!!reduceMotion}>
                  <div className="mt-8 hidden border-y border-white/9 py-5 sm:block">
                    <div className="grid grid-cols-3 gap-3 text-center lg:text-left">
                      {[['Direct', 'Personal attention'], ['Clear', 'Next steps'], ['Careful', 'Execution']].map(([label, copy], index) => (
                        <div key={label} className={index ? 'border-l border-white/9 pl-3' : ''}><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#d9af6b]">{label}</p><p className="mt-1 text-[11px] leading-4 text-white/42">{copy}</p></div>
                      ))}
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={0.14} reduced={!!reduceMotion}>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:mt-auto lg:grid-cols-1 lg:pt-8">
                    <a href={`https://wa.me/27766116965?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-5 text-sm font-semibold text-[#07111f] transition hover:-translate-y-0.5 hover:bg-[#edcd94]"><MessageCircle className="h-4 w-4" /> Ask about this service <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
                    <a href="#consultation-builder" onClick={onClose} className="hidden min-h-13 items-center justify-center gap-2 rounded-full border border-white/12 px-5 text-sm font-semibold text-white/68 transition hover:border-[#d9af6b]/38 hover:text-white sm:inline-flex"><ClipboardCheck className="h-4 w-4 text-[#d9af6b]" /> Prepare first</a>
                  </div>
                  <p className="mt-4 hidden text-[10px] leading-5 text-white/28 lg:block">General service information only. The firm will confirm the right legal route after understanding your matter.</p>
                </FadeIn>
              </div>
            </aside>

            <div data-service-modal-panel className="flex min-h-0 min-w-0 flex-col lg:max-h-[calc(94svh-4.8rem)]">
              <Tabs key={area.id} defaultValue="overview" className="flex min-h-0 flex-1 flex-col">
                <div className="shrink-0 border-b border-white/8 px-4 py-4 sm:px-7">
                  <TabsList className="service-modal-scroll flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-full border border-white/9 bg-white/[0.035] p-1.5">
                    {tabItems.map((tab) => <TabsTrigger key={tab.value} value={tab.value} className="shrink-0 rounded-full px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/42 transition data-[state=active]:bg-[#d9af6b] data-[state=active]:text-[#07111f] data-[state=active]:shadow-[0_12px_30px_rgba(217,175,107,0.2)]">{tab.label}</TabsTrigger>)}
                  </TabsList>
                </div>

                <div data-service-modal-scroll="content" className="service-modal-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-5 py-7 sm:px-8 sm:py-8">
                  <TabsContent value="overview" className="mt-0">
                    <FadeIn reduced={!!reduceMotion}>
                      <p className="max-w-3xl text-base leading-8 text-white/66 sm:text-[1.03rem]">{area.description}</p>
                      <div className="mt-8 grid gap-8 md:grid-cols-[1.05fr_0.95fr]">
                        <div><h4 className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">When this service may help</h4><ul className="mt-5 border-l border-[#d9af6b]/28 pl-5">{area.commonSituations.slice(0, 5).map((situation) => <li key={situation} className="relative pb-4 text-sm leading-6 text-white/58 before:absolute before:-left-[1.45rem] before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-[#d9af6b] last:pb-0">{situation}</li>)}</ul></div>
                        <div><h4 className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Included support</h4><div className="mt-5 flex flex-wrap gap-2">{area.features.map((feature) => <span key={feature} className="inline-flex items-center gap-2 rounded-full border border-white/9 bg-white/[0.04] px-3 py-2 text-xs text-white/58"><Check className="h-3 w-3 text-[#d9af6b]" />{feature}</span>)}</div></div>
                      </div>
                    </FadeIn>
                  </TabsContent>

                  <TabsContent value="help" className="mt-0">
                    <FadeIn reduced={!!reduceMotion}>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Practical support</span><h3 className="mt-3 max-w-2xl font-serif text-3xl text-[#fffaf1] sm:text-4xl">How the firm helps you move forward.</h3>
                      <div className="mt-7 divide-y divide-white/9 border-y border-white/9">{area.howWeHelp.map((help, index) => <motion.div key={help} initial={reduceMotion ? false : { opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="group flex gap-5 py-5"><span className="font-serif text-xl text-[#d9af6b]">{String(index + 1).padStart(2, '0')}</span><p className="text-sm leading-7 text-white/64 transition group-hover:text-white/82 sm:text-base">{help}</p></motion.div>)}</div>
                    </FadeIn>
                  </TabsContent>

                  <TabsContent value="process" className="mt-0">
                    <FadeIn reduced={!!reduceMotion}>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">A visible process</span><h3 className="mt-3 font-serif text-3xl text-[#fffaf1] sm:text-4xl">Know what happens next.</h3>
                      <div className="relative mt-8"><div className="absolute bottom-6 left-5 top-6 w-px bg-gradient-to-b from-[#d9af6b]/70 via-[#d9af6b]/22 to-transparent" /><div className="space-y-6">{area.process.map((step, index) => <div key={step.step} className="relative flex gap-5"><span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-[5px] border-[#091321] bg-[#d9af6b] text-[9px] font-bold text-[#07111f]">{index + 1}</span><div className="pb-2"><h4 className="font-serif text-2xl text-[#fffaf1]">{step.step}</h4><p className="mt-2 text-sm leading-7 text-white/55">{step.description}</p></div></div>)}</div></div>
                    </FadeIn>
                  </TabsContent>

                  <TabsContent value="prepare" className="mt-0">
                    <FadeIn reduced={!!reduceMotion}>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Arrive prepared</span><h3 className="mt-3 max-w-2xl font-serif text-3xl text-[#fffaf1] sm:text-4xl">Helpful information for a first conversation.</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">You do not need everything before contacting the firm. If available, these items can help the team understand your matter faster.</p>
                      <div className="mt-7 grid gap-3 sm:grid-cols-2">{prepare.map((item, index) => <div key={item} className="flex gap-4 rounded-[1.25rem_2.8rem_2.8rem_1.25rem] border border-white/9 bg-white/[0.04] p-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#d9af6b]/14 text-xs font-semibold text-[#edcd94]">0{index + 1}</span><p className="pt-1 text-sm leading-6 text-white/62">{item}</p></div>)}</div>
                      <a href="#consultation-builder" onClick={onClose} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#d9af6b]/28 bg-[#d9af6b]/10 px-5 text-sm font-semibold text-[#edcd94] transition hover:bg-[#d9af6b] hover:text-[#07111f]">Build a tailored checklist <ArrowRight className="h-4 w-4" /></a>
                    </FadeIn>
                  </TabsContent>

                  <TabsContent value="faqs" className="mt-0">
                    <FadeIn reduced={!!reduceMotion}>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Frequently asked</span><h3 className="mt-3 font-serif text-3xl text-[#fffaf1] sm:text-4xl">Useful starting answers.</h3>
                      <Accordion type="single" collapsible className="mt-7 space-y-3">{area.faqs.map((faq, index) => <AccordionItem key={faq.question} value={`service-faq-${index}`} className="overflow-hidden rounded-[1.25rem_2.6rem_2.6rem_1.25rem] border border-white/9 bg-white/[0.04] px-5 transition data-[state=open]:border-[#d9af6b]/32 data-[state=open]:bg-[#d9af6b]/9"><AccordionTrigger className="py-5 text-left font-serif text-lg leading-snug text-white hover:text-[#edcd94] hover:no-underline [&>svg]:text-[#d9af6b]"><span className="pr-4">{faq.question}</span></AccordionTrigger><AccordionContent className="pb-5 text-sm leading-7 text-white/58">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion>
                    </FadeIn>
                  </TabsContent>

                  {relatedAreas.length > 0 && <div className="mt-10 border-t border-white/9 pt-6"><p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Related practice areas</p><div className="mt-4 flex flex-wrap gap-2">{relatedAreas.map((related) => { const RelatedIcon = iconMap[related.icon] || FileText; return <button key={related.id} type="button" onClick={() => onSelectArea(related)} className="group inline-flex items-center gap-2 rounded-full border border-white/9 bg-white/[0.035] px-4 py-2.5 text-xs text-white/58 transition hover:border-[#d9af6b]/32 hover:text-white"><RelatedIcon className="h-3.5 w-3.5 text-[#d9af6b]" />{related.shortTitle}<ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" /></button>; })}</div></div>}
                </div>

                <div className="shrink-0 border-t border-white/9 bg-[#07111f]/88 px-5 py-4 backdrop-blur-xl sm:px-8">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">Need guidance?</p><p className="mt-1 text-xs text-white/42">Start with a confidential conversation.</p></div><div className="flex gap-2"><a href={`mailto:${company.contact.email}?subject=${encodeURIComponent(`Enquiry: ${area.title}`)}`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-white/10 px-4 text-xs font-semibold text-white/62 transition hover:border-[#d9af6b]/35 hover:text-white">Email firm</a><a href="#contact" onClick={onClose} className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-5 text-xs font-semibold text-[#07111f] transition hover:bg-[#edcd94]">Consultation <ArrowRight className="h-3.5 w-3.5" /></a></div></div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
