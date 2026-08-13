'use client'

import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Clock3, FileText, Gavel, HeartHandshake, Home, MessageCircle, ShieldCheck } from 'lucide-react'
import { company } from '@/data/company'

const matters = [
  {
    id: 'property',
    label: 'Property',
    icon: Home,
    heading: 'A transfer or property deadline is moving closer.',
    guidance: 'Contact the firm promptly when an agreement has been signed, a transfer appears stalled, or a bond, cancellation or signing requirement is unclear.',
    prepare: ['Signed offer or agreement, if available', 'Property address and the parties involved', 'Any deadline, bank or agent correspondence'],
  },
  {
    id: 'estate',
    label: 'Deceased estate',
    icon: FileText,
    heading: 'A family needs a clear first step after a death.',
    guidance: 'Early guidance can help identify the reporting process, available documents and who may lawfully act. You do not need to have every answer before making contact.',
    prepare: ['Will and death certificate, if available', 'Basic list of known assets and debts', 'Names of close family or nominated executor'],
  },
  {
    id: 'family',
    label: 'Marriage & family',
    icon: HeartHandshake,
    heading: 'A wedding date or family decision cannot be ignored.',
    guidance: 'If you need antenuptial-contract advice, make contact before the marriage. For a family-law concern, tell the firm about any court date, safety concern or urgent child-related issue at the outset.',
    prepare: ['Relevant dates and full names', 'Existing agreement or court papers', 'A short timeline of what has happened'],
  },
  {
    id: 'dispute',
    label: 'Dispute & debt',
    icon: Gavel,
    heading: 'A notice, summons or payment deadline has arrived.',
    guidance: 'Do not leave formal correspondence unanswered. Share the document type and deadline when you enquire so the firm can assess whether immediate review is needed.',
    prepare: ['The notice, summons or demand received', 'Contracts, invoices or key correspondence', 'The exact response or court date shown'],
  },
]

export default function MatterUrgencySection() {
  const [activeId, setActiveId] = useState(matters[0].id)
  const reduceMotion = useReducedMotion()
  const activeMatter = matters.find((matter) => matter.id === activeId) ?? matters[0]
  const phoneDigits = company.contact.phone.replace(/\D/g, '')
  const internationalPhone = phoneDigits.startsWith('0') ? `27${phoneDigits.slice(1)}` : phoneDigits
  const whatsappHref = useMemo(() => {
    const message = `Hello Marlene Brits Attorneys, I need guidance about a ${activeMatter.label.toLowerCase()} matter. Please let me know the appropriate next step.`
    return `https://wa.me/${internationalPhone}?text=${encodeURIComponent(message)}`
  }, [activeMatter.label, internationalPhone])

  return (
    <section id="urgent-guidance" aria-labelledby="urgency-heading" className="relative overflow-hidden bg-[#eee7da] py-20 sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-28 top-24 h-80 w-80 rounded-full border border-[#a87535]/12" />
      <div className="pointer-events-none absolute -right-32 bottom-12 h-[28rem] w-[28rem] rounded-full bg-[#d9af6b]/14 blur-3xl" />

      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-16">
          <div className="lg:pt-8">
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b6d30]">
              <Clock3 className="h-4 w-4" strokeWidth={1.7} /> The legal timing desk
            </p>
            <h2 id="urgency-heading" className="premium-heading mt-5 max-w-xl font-serif text-[clamp(3.1rem,6vw,5.8rem)] font-medium leading-[0.88] tracking-[-0.055em] text-[#07111f]">
              Know when it is time to <span className="italic text-[#a87535]">act sooner.</span>
            </h2>
            <p className="premium-lede mt-7 max-w-lg text-[#5f6c7b] sm:text-base sm:leading-8">
              Choose the closest type of matter. This quick guide helps you identify what to mention first, what may be time-sensitive and what may be useful to have nearby when you contact the firm.
            </p>

            <div className="mt-8 flex items-start gap-3 border-l-2 border-[#a87535]/30 pl-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#a87535]" strokeWidth={1.6} />
              <p className="text-xs leading-6 text-[#667282]">
                General South African legal information only. Urgency and legal advice can be confirmed only after the facts and documents are reviewed.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem_4.5rem_2rem_4.5rem] border border-[#07111f]/10 bg-[#07111f] text-white shadow-[0_36px_90px_rgba(7,17,31,0.18)] sm:rounded-[2.5rem_7rem_2.5rem_7rem]">
            <div className="border-b border-white/10 px-5 py-5 sm:px-8 sm:py-6">
              <div className="flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Choose a legal matter">
                {matters.map((matter) => {
                  const Icon = matter.icon
                  const active = matter.id === activeId
                  return (
                    <button
                      key={matter.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-controls="urgency-panel"
                      onClick={() => setActiveId(matter.id)}
                      className={`flex min-h-12 shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9af6b] ${active ? 'border-[#d9af6b] bg-[#d9af6b] text-[#07111f]' : 'border-white/12 bg-white/[0.045] text-white/62 hover:border-white/25 hover:text-white'}`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.7} /> {matter.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <motion.div
              key={activeMatter.id}
              id="urgency-panel"
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="grid gap-8 px-5 py-8 sm:px-8 sm:py-10 xl:grid-cols-[1.08fr_0.92fr] xl:gap-12"
            >
              <div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Consider contacting the firm when</span>
                <h3 className="mt-4 max-w-xl font-serif text-3xl leading-[1.05] text-[#fffaf1] sm:text-[2.6rem]">{activeMatter.heading}</h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">{activeMatter.guidance}</p>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="group mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] shadow-[0_16px_40px_rgba(217,175,107,0.18)] transition hover:-translate-y-0.5 hover:bg-[#e6c381] sm:w-auto">
                  <MessageCircle className="h-4 w-4" /> Describe this matter <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <div className="border-t border-white/10 pt-7 xl:border-l xl:border-t-0 xl:pl-10 xl:pt-0">
                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Useful to have nearby</span>
                <ol className="mt-5 space-y-4">
                  {activeMatter.prepare.map((item, index) => (
                    <li key={item} className="grid grid-cols-[2rem_1fr] items-start gap-3 text-sm leading-6 text-white/63">
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-[#d9af6b]/28 font-serif text-xs text-[#e5bd79]">0{index + 1}</span>
                      <span className="pt-1">{item}</span>
                    </li>
                  ))}
                </ol>
                <p className="mt-7 border-t border-white/10 pt-5 text-[11px] leading-5 text-white/36">
                  Start with a short summary. The firm will tell you when and how to share sensitive documents.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
