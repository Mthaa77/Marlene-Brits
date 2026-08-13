'use client';

import { HelpCircle, PhoneCall } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
  { question: 'What areas of law does the firm assist with?', answer: 'The firm assists with conveyancing, property transfers, deceased estate administration, wills and estate planning, antenuptial contracts, notarial services, family law, civil litigation and debt collection.' },
  { question: 'How do I arrange a consultation?', answer: 'Call, email or WhatsApp the firm using the details below. A first conversation helps establish the nature of your matter, the relevant documents and the most appropriate next step.' },
  { question: 'What should I bring to the first consultation?', answer: 'Bring any identity documents, agreements, property records, court papers, correspondence, wills or estate documents connected to the matter. The firm can confirm the exact requirements when your appointment is arranged.' },
  { question: 'Can the firm assist clients outside Pretoria?', answer: 'The office is based in Pretoria East. Depending on the type of matter and the work required, the firm can also assist clients elsewhere in Gauteng and South Africa.' },
];

export default function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-[#f7f3eb] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 lg:px-8">
        <div><span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b6d30]"><HelpCircle className="h-3.5 w-3.5" /> Before you contact us</span><h2 className="mt-4 font-serif text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#07111f]">Useful answers before the personal answer.</h2><p className="mt-6 max-w-lg text-base leading-8 text-[#526071]">These starting points remove some of the uncertainty. The answer that applies to you will still depend on your documents, dates, goals and circumstances.</p><a href="tel:+27766116965" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#07111f] px-5 text-sm font-semibold text-white transition hover:bg-[#0c2136]"><PhoneCall className="h-4 w-4 text-[#edcd94]" /> Discuss your matter</a></div>
        <div className="rounded-[1.65rem] border border-[#07111f]/9 bg-white p-3 shadow-[0_24px_70px_rgba(7,17,31,0.08)] sm:p-5">
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="rounded-[1.15rem] border border-[#07111f]/8 bg-[#fffdf9] px-5 data-[state=open]:border-[#d9af6b]/45 data-[state=open]:bg-[#fbf6ec]">
                <AccordionTrigger className="py-5 text-left hover:no-underline"><span className="flex items-center gap-4 pr-4"><span className="text-[10px] font-semibold tracking-[0.17em] text-[#9b6d30]">0{index + 1}</span><span className="font-serif text-lg leading-snug text-[#07111f] sm:text-xl">{item.question}</span></span></AccordionTrigger>
                <AccordionContent className="pb-6 pl-9 text-sm leading-7 text-[#617083] sm:text-base">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
