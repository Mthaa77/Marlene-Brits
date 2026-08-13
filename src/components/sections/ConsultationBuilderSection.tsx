'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Building2, Check, CheckCircle2, ClipboardCheck, Copy, FileHeart, FileText, HeartHandshake, MessageCircle, Scale, ShieldCheck, Sparkles, Stamp } from 'lucide-react';

type Matter = 'property' | 'estate' | 'family' | 'notarial' | 'dispute';
type Stage = 'exploring' | 'documents' | 'deadline';

const matterOptions = [
  { id: 'property' as Matter, title: 'Property or conveyancing', icon: Building2 },
  { id: 'estate' as Matter, title: 'Will or deceased estate', icon: FileHeart },
  { id: 'family' as Matter, title: 'Marriage or family matter', icon: HeartHandshake },
  { id: 'notarial' as Matter, title: 'Notarial document', icon: Stamp },
  { id: 'dispute' as Matter, title: 'Dispute or debt', icon: Scale },
];

const stageOptions = [
  { id: 'exploring' as Stage, title: 'I am still exploring', copy: 'I need clarity on options and next steps.' },
  { id: 'documents' as Stage, title: 'I already have documents', copy: 'I want the firm to review the matter and paperwork.' },
  { id: 'deadline' as Stage, title: 'A deadline may apply', copy: 'The timing needs to be assessed promptly.' },
];

const checklists: Record<Matter, string[]> = {
  property: ['Identity document and proof of address', 'Sale agreement or property details', 'Bond or finance information, if relevant', 'Correspondence from agents, banks or attorneys'],
  estate: ['Identity documents of relevant parties', 'Death certificate, will or estate documents', 'Asset and liability information', 'Letters or notices already received'],
  family: ['Identity documents', 'Marriage certificate or antenuptial contract', 'Relevant agreements, court papers or correspondence', 'A short timeline of important events'],
  notarial: ['Original document requiring execution', 'Valid identity document', 'Country or institution where it will be used', 'Any instructions already received'],
  dispute: ['Contracts, invoices or written agreements', 'Emails, messages and formal correspondence', 'Proof of payment or loss', 'Important dates and a short event timeline'],
};

const panelMotion = { hidden: { opacity: 0, x: 14 }, visible: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 } };

export default function ConsultationBuilderSection() {
  const [step, setStep] = useState(0);
  const [matter, setMatter] = useState<Matter | null>(null);
  const [stage, setStage] = useState<Stage | null>(null);
  const [checked, setChecked] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const items = matter ? checklists[matter] : [];
  const matterTitle = matterOptions.find((item) => item.id === matter)?.title ?? '';
  const stageTitle = stageOptions.find((item) => item.id === stage)?.title ?? '';
  const message = useMemo(() => encodeURIComponent(`Hello Marlene Brits Attorneys. I completed the consultation readiness builder. My matter relates to ${matterTitle}. Current stage: ${stageTitle}. I have prepared ${checked.length} of ${items.length} suggested items and would like to arrange a consultation.`), [matterTitle, stageTitle, checked.length, items.length]);

  const reset = () => { setStep(0); setMatter(null); setStage(null); setChecked([]); };
  const copyChecklist = async () => {
    const text = `Consultation checklist — ${matterTitle}\n${items.map((item, index) => `${checked.includes(index) ? '✓' : '○'} ${item}`).join('\n')}\nStage: ${stageTitle}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="consultation-builder" data-interactive-zone className="relative overflow-hidden bg-[#f6f1e8] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#d9af6b]/14 blur-3xl" />
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b6d30]"><ClipboardCheck className="h-3.5 w-3.5" /> Consultation readiness</span>
            <h2 className="mt-5 max-w-xl font-serif text-[clamp(3rem,6vw,5.4rem)] font-medium leading-[0.9] tracking-[-0.055em] text-[#07111f]">Turn your first meeting into <span className="italic text-[#a87332]">forward motion.</span></h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#526071]">Build a tailored preparation brief in under a minute, then copy it or continue directly to WhatsApp.</p>
            <div className="mt-8 flex items-center gap-3 border-t border-[#07111f]/10 pt-5 text-xs text-[#617083]"><ShieldCheck className="h-4 w-4 text-[#a87535]" /> Nothing is stored or submitted.</div>
          </div>

          <div className="relative overflow-hidden rounded-[4.8rem_2rem_2rem_2rem] border border-[#07111f]/10 bg-[#07111f] px-5 py-7 text-white shadow-[0_40px_120px_rgba(7,17,31,0.24)] sm:px-8 sm:py-9 lg:min-h-[590px] lg:px-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_8%,rgba(217,175,107,0.18),transparent_22rem),linear-gradient(145deg,rgba(255,255,255,0.045),transparent_46%)]" />
            <div className="relative flex items-start justify-between gap-5 border-b border-white/10 pb-6">
              <div><p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Your consultation folio</p><p className="mt-1 text-sm text-white/46">{step === 0 ? 'Define the matter' : step === 1 ? 'Set the current stage' : 'Tick what is ready'}</p></div>
              <div className="flex items-center gap-2" aria-label={`Step ${step + 1} of 3`}>{[0, 1, 2].map((item) => <span key={item} className={`h-1.5 rounded-full transition-all ${item === step ? 'w-10 bg-[#d9af6b]' : item < step ? 'w-5 bg-[#edcd94]/55' : 'w-5 bg-white/12'}`} />)}</div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {step === 0 && (
                <motion.div key="matter" variants={panelMotion} initial={reduceMotion ? false : 'hidden'} animate="visible" exit="exit" transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="relative mt-7">
                  <div className="flex items-end justify-between gap-4"><h3 className="max-w-xl font-serif text-3xl leading-tight text-[#fffaf1] sm:text-4xl">What will the consultation be about?</h3><span className="hidden font-serif text-4xl text-white/10 sm:block">01</span></div>
                  <div className="mt-5 grid border-t border-white/10 sm:grid-cols-2">
                    {matterOptions.map((item, index) => { const Icon = item.icon; const active = matter === item.id; return (
                      <button key={item.id} type="button" aria-pressed={active} onClick={() => setMatter(item.id)} className={`group flex min-h-20 items-center gap-3 border-b border-white/10 px-1 py-3 text-left transition-colors sm:px-4 ${index % 2 ? 'sm:border-l' : ''} ${active ? 'bg-[#d9af6b]/10 text-white' : 'text-white/64 hover:text-white'}`}>
                        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${active ? 'border-[#edcd94] bg-[#d9af6b] text-[#07111f]' : 'border-white/12 text-[#d9af6b]'}`}><Icon className="h-4 w-4" /></span>
                        <span className="text-sm font-semibold leading-5">{item.title}</span>
                        <span className={`ml-auto text-[9px] ${active ? 'text-[#edcd94]' : 'text-white/20'}`}>0{index + 1}</span>
                      </button>
                    ); })}
                  </div>
                  <button type="button" disabled={!matter} onClick={() => setStep(1)} className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] hover:bg-[#edcd94] disabled:opacity-35 sm:w-auto">Continue <ArrowRight className="h-4 w-4" /></button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="stage" variants={panelMotion} initial={reduceMotion ? false : 'hidden'} animate="visible" exit="exit" transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="relative mt-8">
                  <h3 className="font-serif text-3xl text-[#fffaf1] sm:text-4xl">Where are you in the process?</h3>
                  <div className="relative mt-6 border-y border-white/10">
                    {stageOptions.map((item, index) => { const active = stage === item.id; return (
                      <button key={item.id} type="button" aria-pressed={active} onClick={() => setStage(item.id)} className={`group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/10 px-1 py-5 text-left transition-colors last:border-b-0 sm:px-4 ${active ? 'bg-[#d9af6b]/10' : 'hover:bg-white/[0.025]'}`}>
                        <span className={`font-serif text-2xl ${active ? 'text-[#edcd94]' : 'text-white/18'}`}>0{index + 1}</span>
                        <span><span className="block text-sm font-semibold text-white">{item.title}</span><span className="mt-1 block text-xs leading-5 text-white/42">{item.copy}</span></span>
                        <span className={`grid h-8 w-8 place-items-center rounded-full border ${active ? 'border-[#d9af6b] bg-[#d9af6b] text-[#07111f]' : 'border-white/10 text-white/18'}`}>{active ? <Check className="h-4 w-4" /> : <Sparkles className="h-3.5 w-3.5" />}</span>
                      </button>
                    ); })}
                  </div>
                  <div className="mt-7 flex gap-3"><button type="button" onClick={() => setStep(0)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/12 text-white/68" aria-label="Previous step"><ArrowLeft className="h-4 w-4" /></button><button type="button" disabled={!stage} onClick={() => setStep(2)} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] disabled:opacity-35 sm:flex-none">Build my brief <ArrowRight className="h-4 w-4" /></button></div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="checklist" variants={panelMotion} initial={reduceMotion ? false : 'hidden'} animate="visible" transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }} className="relative mt-7">
                  <div className="flex items-end justify-between gap-4"><div><span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">Tailored for {matterTitle}</span><h3 className="mt-2 font-serif text-3xl text-[#fffaf1] sm:text-4xl">Your preparation brief.</h3></div><span className="shrink-0 text-xs text-white/42">{checked.length}/{items.length} ready</span></div>
                  <div className="mt-6 border-y border-white/10">
                    {items.map((item, index) => { const active = checked.includes(index); return (
                      <button key={item} type="button" aria-pressed={active} onClick={() => setChecked((current) => active ? current.filter((value) => value !== index) : [...current, index])} className={`flex w-full items-center gap-4 border-b border-white/10 px-1 py-4 text-left last:border-b-0 sm:px-3 ${active ? 'bg-[#d9af6b]/10' : 'hover:bg-white/[0.025]'}`}>
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${active ? 'bg-[#d9af6b] text-[#07111f]' : 'border border-white/14 text-white/28'}`}>{active ? <Check className="h-4 w-4" /> : <FileText className="h-3.5 w-3.5" />}</span><span className={`text-sm leading-6 ${active ? 'text-white' : 'text-white/62'}`}>{item}</span>
                      </button>
                    ); })}
                  </div>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2"><button type="button" onClick={copyChecklist} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 text-sm font-semibold text-white/74 hover:border-[#d9af6b]/40 hover:text-white">{copied ? <CheckCircle2 className="h-4 w-4 text-[#edcd94]" /> : <Copy className="h-4 w-4" />}{copied ? 'Brief copied' : 'Copy my brief'}</button><a href={`https://wa.me/27766116965?text=${message}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-5 text-sm font-semibold text-[#07111f] hover:bg-[#edcd94]"><MessageCircle className="h-4 w-4" /> Continue on WhatsApp</a></div>
                  <div className="mt-5 flex flex-col gap-3 text-[11px] leading-5 text-white/30 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={reset} className="inline-flex items-center gap-2 font-semibold text-white/42 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Build another brief</button><span>General preparation guidance only.</span></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
