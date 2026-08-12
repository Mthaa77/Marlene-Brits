'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Building2, FileHeart, HeartHandshake, Landmark, MessageCircle, RotateCcw, Scale, ShieldCheck, Sparkles } from 'lucide-react';

type Matter = 'property' | 'estate' | 'family' | 'documents' | 'dispute';
type Timing = 'planning' | 'soon' | 'urgent';

const matters = [
  { id: 'property' as Matter, title: 'Property or transfer', copy: 'Buying, selling, transferring or registering property', icon: Building2 },
  { id: 'estate' as Matter, title: 'Will or deceased estate', copy: 'Planning ahead or administering an estate', icon: FileHeart },
  { id: 'family' as Matter, title: 'Marriage or family', copy: 'ANCs, divorce or another family-law concern', icon: HeartHandshake },
  { id: 'documents' as Matter, title: 'Notarial documents', copy: 'Authentication, certification or formal execution', icon: Landmark },
  { id: 'dispute' as Matter, title: 'Dispute or money owed', copy: 'Civil disagreement, claim or debt recovery', icon: Scale },
];

const timings = [
  { id: 'planning' as Timing, title: 'I am planning ahead', copy: 'There is time to consider the best route.' },
  { id: 'soon' as Timing, title: 'I need help soon', copy: 'The matter is active but not immediately urgent.' },
  { id: 'urgent' as Timing, title: 'It feels urgent', copy: 'A deadline, dispute or time-sensitive step may apply.' },
];

const results: Record<Matter, { service: string; detail: string; anchor: string }> = {
  property: { service: 'Conveyancing', detail: 'A conveyancer can guide the transfer, Deeds Office requirements and transaction milestones.', anchor: 'conveyancing' },
  estate: { service: 'Estate Planning or Deceased Estates', detail: 'The firm can help plan a will and estate, or guide the administration process after a death.', anchor: 'deceased-estates' },
  family: { service: 'Family Law or Antenuptial Contracts', detail: 'The right path depends on whether you are planning a marriage or navigating an existing family matter.', anchor: 'family-law' },
  documents: { service: 'Notarial Services', detail: 'A notary can confirm the formalities, authentication or registration your documents require.', anchor: 'notarial-services' },
  dispute: { service: 'Civil Litigation or Debt Collection', detail: 'Early legal guidance can clarify your position, available remedies and important time limits.', anchor: 'civil-litigation' },
};

export default function LegalPathfinderSection() {
  const [step, setStep] = useState(0);
  const [matter, setMatter] = useState<Matter | null>(null);
  const [timing, setTiming] = useState<Timing | null>(null);
  const reduceMotion = useReducedMotion();
  const result = matter ? results[matter] : null;
  const progress = [34, 67, 100][step];
  const whatsAppText = useMemo(() => result ? encodeURIComponent(`Hello Marlene Brits Attorneys. I used the Legal Needs Pathfinder. My matter may relate to ${result.service}, and my timing is: ${timings.find((item) => item.id === timing)?.title ?? 'not specified'}. I would like guidance on the next step.`) : '', [result, timing]);

  const reset = () => { setStep(0); setMatter(null); setTiming(null); };

  return (
    <section id="pathfinder" className="relative overflow-hidden bg-[#07111f] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(217,175,107,0.13),transparent_25rem),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.05),transparent_22rem)]" />
      <div className="relative mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-stretch">
        <div className="flex flex-col justify-between py-4 lg:py-8">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d9af6b]"><Sparkles className="h-3.5 w-3.5" /> Guided legal pathfinder</span>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[0.93] tracking-[-0.05em] text-[#fffaf1]">Not sure where your matter belongs?</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/58">Answer two quick questions. We will point you towards the most relevant service and a sensible next step.</p>
          </div>
          <div className="mt-8 flex items-center gap-3 text-xs text-white/38"><ShieldCheck className="h-4 w-4 text-[#d9af6b]" />Private by design—your answers stay in this browser.</div>
        </div>

        <div className="relative min-h-[540px] overflow-hidden rounded-[2.25rem_2.25rem_7rem_2.25rem] border border-white/14 bg-white/[0.045] p-5 shadow-[0_36px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#edcd94] to-transparent" />
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full border border-[#d9af6b]/35 bg-[#d9af6b]/10 font-serif text-[#edcd94]">{step + 1}</span><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/38">Pathfinder</p><p className="text-sm text-white/72">{step === 0 ? 'Your legal need' : step === 1 ? 'Your timing' : 'Your suggested path'}</p></div></div>
            <span className="text-[10px] font-semibold tracking-[0.16em] text-[#d9af6b]">{progress}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/8"><motion.div animate={{ width: `${progress}%` }} className="h-full rounded-full bg-gradient-to-r from-[#a97435] to-[#edcd94]" /></div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="matter" initial={reduceMotion ? false : { opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="mt-8">
                <h3 className="font-serif text-3xl text-[#fffaf1]">What best describes your situation?</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {matters.map((item, index) => { const Icon = item.icon; const active = matter === item.id; return <button key={item.id} type="button" onClick={() => setMatter(item.id)} className={`group flex items-start gap-4 rounded-[1.35rem_1.35rem_2.8rem_1.35rem] border p-4 text-left transition ${active ? 'border-[#d9af6b]/70 bg-[#d9af6b]/14 shadow-[0_18px_45px_rgba(217,175,107,0.12)]' : 'border-white/10 bg-white/[0.035] hover:border-white/22 hover:bg-white/[0.06]'} ${index === 4 ? 'sm:col-span-2' : ''}`}><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${active ? 'bg-[#d9af6b] text-[#07111f]' : 'bg-white/7 text-[#edcd94]'}`}><Icon className="h-4.5 w-4.5" /></span><span><span className="block text-sm font-semibold text-white">{item.title}</span><span className="mt-1 block text-xs leading-5 text-white/46">{item.copy}</span></span></button>; })}
                </div>
                <button type="button" disabled={!matter} onClick={() => setStep(1)} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] transition hover:bg-[#edcd94] disabled:cursor-not-allowed disabled:opacity-35">Continue <ArrowRight className="h-4 w-4" /></button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="timing" initial={reduceMotion ? false : { opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="mt-8">
                <h3 className="font-serif text-3xl text-[#fffaf1]">How soon do you need guidance?</h3>
                <div className="mt-7 space-y-3">{timings.map((item, index) => { const active = timing === item.id; return <button key={item.id} type="button" onClick={() => setTiming(item.id)} className={`flex w-full items-center gap-5 rounded-full border px-5 py-4 text-left transition ${active ? 'border-[#d9af6b]/70 bg-[#d9af6b]/14' : 'border-white/10 bg-white/[0.035] hover:border-white/22'}`}><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-serif ${active ? 'bg-[#d9af6b] text-[#07111f]' : 'border border-white/12 text-[#edcd94]'}`}>0{index + 1}</span><span><span className="block text-sm font-semibold text-white">{item.title}</span><span className="mt-1 block text-xs text-white/46">{item.copy}</span></span></button>; })}</div>
                <div className="mt-7 flex gap-3"><button type="button" onClick={() => setStep(0)} className="grid h-12 w-12 place-items-center rounded-full border border-white/12 text-white/68 hover:bg-white/5" aria-label="Previous question"><ArrowLeft className="h-4 w-4" /></button><button type="button" disabled={!timing} onClick={() => setStep(2)} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] transition hover:bg-[#edcd94] disabled:cursor-not-allowed disabled:opacity-35">Show my path <ArrowRight className="h-4 w-4" /></button></div>
              </motion.div>
            )}

            {step === 2 && result && (
              <motion.div key="result" initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mt-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#d9af6b] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#07111f]"><ShieldCheck className="h-3.5 w-3.5" /> Suggested starting point</span>
                <h3 className="mt-6 max-w-2xl font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] text-[#fffaf1]">{result.service}</h3>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/62">{result.detail}</p>
                {timing === 'urgent' && <p className="mt-4 rounded-2xl border border-[#d9af6b]/28 bg-[#d9af6b]/10 px-4 py-3 text-sm leading-6 text-[#f2d9aa]">Because you indicated urgency, contact the firm promptly so any applicable deadline can be assessed.</p>}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={`https://wa.me/27766116965?text=${whatsAppText}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] transition hover:bg-[#edcd94]"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a><a href="#services" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/14 px-6 text-sm font-semibold text-white/78 hover:border-[#d9af6b]/40">Explore practice areas</a><button type="button" onClick={reset} className="inline-flex min-h-13 items-center justify-center gap-2 px-4 text-xs font-semibold text-white/46 hover:text-white"><RotateCcw className="h-3.5 w-3.5" /> Start again</button></div>
                <p className="mt-6 text-[11px] leading-5 text-white/32">This tool provides general direction only and is not legal advice. The firm will confirm the appropriate service after understanding your matter.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
