'use client';

import { motion, type Variants } from 'framer-motion';
import { HelpCircle, MessageCircle, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'What makes Marlene Brits Attorneys different from other law firms?',
    answer:
      'The practice is built around personalised, dedicated legal representation. Clients receive direct attention, clear communication, and legal guidance that is practical, professional, and tailored to their matter.',
  },
  {
    question: 'What areas of law does the firm specialise in?',
    answer:
      'The firm assists with conveyancing, property transfers, deceased estate administration, wills and estate planning, antenuptial contracts, notarial services, family law, civil litigation, and debt collection.',
  },
  {
    question: 'How do I schedule a consultation?',
    answer:
      'You can call the firm, email directly, or use the website consultation form. The first step is to understand your legal need, identify the correct route, and explain what documents or information may be required.',
  },
  {
    question: 'What should I bring to my first consultation?',
    answer:
      'Bring any relevant identity documents, property documents, contracts, court papers, correspondence, existing wills, or estate documents. The more context available, the easier it is to give accurate guidance.',
  },
  {
    question: 'Does the firm handle matters outside Pretoria?',
    answer:
      'The office is based in Pretoria East at Spaces Menlyn Maine, but the firm can assist clients across Gauteng and, depending on the matter, nationally across South Africa.',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#050814] py-20 text-white sm:py-28 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(214,165,96,0.18),transparent_26rem),radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.08),transparent_24rem),linear-gradient(135deg,#050814,#0d1425_54%,#050814)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-white/6 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
        >
          <motion.div variants={fadeUp} className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/85">
              <HelpCircle className="h-3.5 w-3.5" />
              Client Questions
            </span>

            <h2 className="mt-6 font-serif-optical text-[clamp(2.65rem,7vw,5.35rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white">
              Answers Before
              <span className="block bg-gradient-to-r from-[#f4d79b] via-[#c58a44] to-[#f8e5bd] bg-clip-text text-transparent">
                You Begin.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/62 sm:text-lg">
              A premium legal experience starts with clarity. These answers help clients understand what to expect before reaching out.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
                <ShieldCheck className="mb-3 h-5 w-5 text-gold" />
                <p className="text-sm font-medium text-white/78">Clear guidance. No confusion. No pressure.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
                <MessageCircle className="mb-3 h-5 w-5 text-gold" />
                <p className="text-sm font-medium text-white/78">Direct communication from consultation to completion.</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="relative overflow-hidden rounded-[2rem] border border-gold/24 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),rgba(255,255,255,0.045))] p-3 shadow-[0_40px_130px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

              <Accordion type="single" collapsible className="relative space-y-3">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={item.question}
                    variants={fadeUp}
                  >
                    <AccordionItem
                      value={`faq-bottom-${index}`}
                      className="group overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.055] px-5 transition-all duration-300 data-[state=open]:border-gold/34 data-[state=open]:bg-white/[0.085] data-[state=open]:shadow-[0_22px_70px_rgba(214,165,96,0.12)]"
                    >
                      <AccordionTrigger className="py-5 text-left hover:no-underline [&>svg]:text-gold/70">
                        <div className="flex items-center gap-4 pr-4">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gold/24 bg-gold/10 text-xs font-bold text-gold">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="font-serif-optical text-lg font-semibold leading-snug text-white sm:text-xl">
                            {item.question}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 pl-14 text-sm leading-7 text-white/62 sm:text-base">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>

            <div className="mt-6 flex flex-col gap-3 rounded-[1.5rem] border border-gold/20 bg-gold/10 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/85">Still unsure?</p>
                <p className="mt-1 text-sm text-white/70">Speak to the firm and get clarity on your matter.</p>
              </div>
              <a
                href="tel:+27766116965"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#071020] shadow-[0_18px_45px_rgba(214,165,96,0.24)]"
              >
                <PhoneCall className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Sparkles className="pointer-events-none absolute bottom-10 right-10 h-24 w-24 text-gold/[0.05]" />
    </section>
  );
}
