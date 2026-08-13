'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Building2, Check, FileHeart, HeartHandshake, Landmark, MessageCircle, RotateCcw, Scale, ShieldCheck, Sparkles } from 'lucide-react';

type Matter = 'property' | 'estate' | 'family' | 'documents' | 'dispute';
type Timing = 'planning' | 'soon' | 'urgent';

const matters = [
  { id: 'property' as Matter, title: 'Property or transfer', copy: 'Buying, selling or registering property', icon: Building2 },
  { id: 'estate' as Matter, title: 'Will or deceased estate', copy: 'Planning ahead or administering an estate', icon: FileHeart },
  { id: 'family' as Matter, title: 'Marriage or family', copy: 'ANCs, divorce or a family-law concern', icon: HeartHandshake },
  { id: 'documents' as Matter, title: 'Notarial documents', copy: 'Authentication, certification or execution', icon: Landmark },
  { id: 'dispute' as Matter, title: 'Dispute or money owed', copy: 'Civil disagreement, claim or debt recovery', icon: Scale },
];

const timings = [
  { id: 'planning' as Timing, title: 'Planning ahead', copy: 'There is time to consider the best route.' },
  { id: 'soon' as Timing, title: 'Help needed soon', copy: 'The matter is active, but not immediately urgent.' },
  { id: 'urgent' as Timing, title: 'Time-sensitive', copy: 'A deadline or urgent step may apply.' },
];

const results: Record<Matter, { service: string; detail: string }> = {
  property: { service: 'Conveyancing', detail: 'A conveyancer can guide the transfer, Deeds Office requirements and every transaction milestone.' },
  estate: { service: 'Estate Planning or Deceased Estates', detail: 'The firm can help plan a will and estate, or guide the administration process after a death.' },
  family: { service: 'Family Law or Antenuptial Contracts', detail: 'The right path depends on whether you are planning a marriage or navigating an existing family matter.' },
  documents: { service: 'Notarial Services', detail: 'A notary can confirm the formalities, authentication or registration your documents require.' },
  dispute: { service: 'Civil Litigation or Debt Collection', detail: 'Early legal guidance can clarify your position, remedies and any important time limits.' },
};

const viewMotion = { enter: { opacity: 0, y: 14 }, centre: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };

export default function LegalPathfinderSection() {
  const [step, setStep] = useState(0);
  const [matter, setMatter] = useState<Matter | null>(null);
  const [timing, setTiming] = useState<Timing | null>(null);
  const reduceMotion = useReducedMotion();
  const result = matter ? results[matter] : null;
  const progress = [33, 66, 100][step];
  const whatsAppText = useMemo(() => result ? encodeURIComponent(`Hello Marlene Brits Attorneys. I used the Legal Needs Pathfinder. My matter may relate to ${result.service}, and my timing is: ${timings.find((item) => item.id === timing)?.title ?? 'not specified'}. I would like guidance on the next step.`) : '', [result, timing]);
  const reset = () => { setStep(0); setMatter(null); setTiming(null); };

  return (
    <section id="pathfinder" data-interactive-zone className="relative overflow-hidden bg-[#06101d] py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_9%_30%,rgba(217,175,107,0.16),transparent_26rem),radial-gradient(circle_at_94%_10%,rgba(255,255,255,0.06),transparent_25rem)]" />
      <div className="relative mx-auto grid max-w-[88rem] gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-14 lg:px-8">
        <div className="lg:pr-5">
          <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d9af6b]"><Sparkles className="h-3.5 w-3.5" /> Guided legal pathfinder</span>
          <h2 className="mt-5 max-w-xl font-serif text-[clamp(3rem,6vw,5.4rem)] font-medium leading-[0.9] tracking-[-0.055em] text-[#fffaf1]">Find the right door. <span className="italic text-[#e0b56f]">Before you knock.</span></h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-white/58">Two focused questions turn uncertainty into a useful starting point—without sharing personal details.</p>
          <div className="mt-9 grid grid-cols-3 border-y border-white/10 py-5">
            {['Your matter', 'Your timing', 'Clear direction'].map((label, index) => (
              <div key={label} className={`relative ${index ? 'border-l border-white/10 pl-4' : ''}`}><span className={`font-serif text-xl ${index <= step ? 'text-[#edcd94]' : 'text-white/20'}`}>0{index + 1}</span><span className="mt-1 block text-[9px] uppercase tracking-[0.14em] text-white/38">{label}</span></div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 text-xs text-white/38"><ShieldCheck className="h-4 w-4 text-[#d9af6b]" /> Private by design—answers stay in this browser.</div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem_2rem_5rem_2rem] border border-white/12 bg-white/[0.045] px-5 py-6 shadow-[0_38px_130px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-8 sm:py-8 lg:min-h-[590px] lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.045),transparent_46%),radial-gradient(circle_at_90%_4%,rgba(217,175,107,0.14),transparent_20rem)]" />
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#edcd94] to-transparent" />
          <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div><p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Legal direction · private session</p><p className="mt-1 text-sm text-white/48">{step === 0 ? 'Choose the closest match' : step === 1 ? 'Set the pace' : 'Your considered starting point'}</p></div>
            <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(#d9af6b ${progress}%, rgba(255,255,255,0.1) 0)` }}><div className="grid h-[46px] w-[46px] place-items-center rounded-full bg-[#0a1422] text-[10px] font-semibold tracking-[0.08em] text-[#f2d49d]">{progress}%</div></div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {step === 0 && (
              <motion.div key="matter" variants={viewMotion} initial={reduceMotion ? false : 'enter'} animate="centre" exit="exit" transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }} className="relative mt-7">
                <h3 className="max-w-2xl font-serif text-3xl leading-tight text-[#fffaf1] sm:text-4xl">What best describes your situation?</h3>
                <div className="relative mt-5 border-t border-white/10">
                  <span className="pointer-events-none absolute bottom-0 left-[1.35rem] top-0 w-px bg-gradient-to-b from-[#d9af6b]/60 via-white/10 to-transparent" />
                  {matters.map((item, index) => { const Icon = item.icon; const active = matter === item.id; return (
                    <button key={item.id} type="button" aria-pressed={active} onClick={() => setMatter(item.id)} className={`group relative grid w-full grid-cols-[2.75rem_1fr_auto] items-center gap-3 border-b border-white/10 py-3.5 text-left transition-colors ${active ? 'text-white' : 'text-white/68 hover:text-white'}`}>
                      <span className={`relative z-10 grid h-11 w-11 place-items-center rounded-full border transition ${active ? 'border-[#edcd94] bg-[#d9af6b] text-[#07111f] shadow-[0_10px_30px_rgba(217,175,107,0.24)]' : 'border-white/12 bg-[#0b1726] text-[#d9af6b] group-hover:border-[#d9af6b]/45'}`}><Icon className="h-4 w-4" /></span>
                      <span className="min-w-0"><span className="block text-sm font-semibold sm:text-[0.95rem]">{item.title}</span><span className="mt-0.5 block text-[11px] leading-5 text-white/38 sm:text-xs">{item.copy}</span></span>
                      <span className={`grid h-7 w-7 place-items-center rounded-full border text-[9px] ${active ? 'border-[#d9af6b] bg-[#d9af6b] text-[#07111f]' : 'border-white/10 text-white/26'}`}>{active ? <Check className="h-3.5 w-3.5" /> : `0${index + 1}`}</span>
                    </button>
                  ); })}
                </div>
                <button type="button" disabled={!matter} onClick={() => setStep(1)} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] transition hover:bg-[#edcd94] disabled:cursor-not-allowed disabled:opacity-35 sm:w-auto">Set the timing <ArrowRight className="h-4 w-4" /></button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="timing" variants={viewMotion} initial={reduceMotion ? false : 'enter'} animate="centre" exit="exit" transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }} className="relative mt-8">
                <h3 className="font-serif text-3xl text-[#fffaf1] sm:text-4xl">How soon do you need guidance?</h3>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {timings.map((item, index) => { const active = timing === item.id; return (
                    <button key={item.id} type="button" aria-pressed={active} onClick={() => setTiming(item.id)} className={`relative min-h-40 overflow-hidden rounded-[1.4rem_1.4rem_3.2rem_1.4rem] border p-5 text-left transition ${active ? 'border-[#d9af6b]/70 bg-[#d9af6b]/14' : 'border-white/10 bg-white/[0.03] hover:border-white/24'}`}>
                      <span className={`font-serif text-3xl ${active ? 'text-[#edcd94]' : 'text-white/18'}`}>0{index + 1}</span><span className="mt-5 block text-sm font-semibold text-white">{item.title}</span><span className="mt-2 block text-xs leading-5 text-white/42">{item.copy}</span>{active && <span className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-full bg-[#d9af6b] text-[#07111f]"><Check className="h-3.5 w-3.5" /></span>}
                    </button>
                  ); })}
                </div>
                <div className="mt-7 flex gap-3"><button type="button" onClick={() => setStep(0)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/12 text-white/68 hover:bg-white/5" aria-label="Previous question"><ArrowLeft className="h-4 w-4" /></button><button type="button" disabled={!timing} onClick={() => setStep(2)} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] transition hover:bg-[#edcd94] disabled:cursor-not-allowed disabled:opacity-35 sm:flex-none">Reveal my path <ArrowRight className="h-4 w-4" /></button></div>
              </motion.div>
            )}

            {step === 2 && result && (
              <motion.div key="result" variants={viewMotion} initial={reduceMotion ? false : 'enter'} animate="centre" transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="relative mt-8">
                <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#edcd94]"><ShieldCheck className="h-4 w-4" /> Suggested starting point</span>
                <h3 className="mt-5 max-w-2xl font-serif text-[clamp(2.8rem,7vw,5rem)] leading-[0.9] tracking-[-0.04em] text-[#fffaf1]">{result.service}</h3>
                <p className="mt-6 max-w-2xl border-l border-[#d9af6b]/55 pl-5 text-base leading-8 text-white/62">{result.detail}</p>
                {timing === 'urgent' && <p className="mt-5 rounded-[1.25rem_1.25rem_2.5rem_1.25rem] border border-[#d9af6b]/28 bg-[#d9af6b]/10 px-5 py-4 text-sm leading-6 text-[#f2d9aa]">Because you indicated urgency, contact the firm promptly so any applicable deadline can be assessed.</p>}
                <div className="mt-8 grid gap-3 sm:grid-cols-[auto_auto_1fr]"><a href={`https://wa.me/27766116965?text=${whatsAppText}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] hover:bg-[#edcd94]"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a><a href="#services" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/14 px-6 text-sm font-semibold text-white/78 hover:border-[#d9af6b]/40">Explore services</a><button type="button" onClick={reset} className="inline-flex min-h-13 items-center justify-center gap-2 text-xs font-semibold text-white/42 hover:text-white sm:justify-self-end"><RotateCcw className="h-3.5 w-3.5" /> Start again</button></div>
                <p className="mt-6 text-[11px] leading-5 text-white/30">General direction only, not legal advice. The firm will confirm the appropriate service after understanding your matter.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
