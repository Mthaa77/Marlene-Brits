'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ClipboardCheck, Copy, FileText, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

type Matter = 'property' | 'estate' | 'family' | 'notarial' | 'dispute';
type Stage = 'exploring' | 'documents' | 'deadline';

const matterOptions = [
  { id: 'property' as Matter, title: 'Property or conveyancing' },
  { id: 'estate' as Matter, title: 'Will or deceased estate' },
  { id: 'family' as Matter, title: 'Marriage or family matter' },
  { id: 'notarial' as Matter, title: 'Notarial document' },
  { id: 'dispute' as Matter, title: 'Dispute or debt' },
];

const stageOptions = [
  { id: 'exploring' as Stage, title: 'I am still exploring', copy: 'I need clarity on options and next steps.' },
  { id: 'documents' as Stage, title: 'I already have documents', copy: 'I want the firm to review the matter and paperwork.' },
  { id: 'deadline' as Stage, title: 'A deadline may apply', copy: 'The timing needs to be assessed promptly.' },
];

const checklists: Record<Matter, string[]> = {
  property: ['Identity document and proof of address', 'Sale agreement or property details', 'Bond or finance information, if relevant', 'Any correspondence from agents, banks or attorneys'],
  estate: ['Identity documents of relevant parties', 'Death certificate, will or existing estate documents', 'Asset and liability information', 'Letters or notices already received'],
  family: ['Identity documents', 'Marriage certificate or antenuptial contract', 'Relevant agreements, court papers or correspondence', 'A short timeline of important events'],
  notarial: ['Original document requiring authentication or execution', 'Valid identity document', 'Country or institution where the document will be used', 'Any instructions already received'],
  dispute: ['Contracts, invoices or written agreements', 'Emails, messages and formal correspondence', 'Proof of payment or loss', 'Important dates and a short event timeline'],
};

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
    <section id="consultation-builder" className="relative overflow-hidden bg-[#f7f3eb] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#d9af6b]/12 blur-3xl" />
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b6d30]"><ClipboardCheck className="h-3.5 w-3.5" /> Consultation readiness builder</span>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(2.8rem,6vw,5.15rem)] font-medium leading-[0.93] tracking-[-0.05em] text-[#07111f]">Arrive prepared. Leave with clarity.</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#526071]">Build a tailored preparation list before contacting the firm. It takes less than a minute and helps make the first conversation more productive.</p>
            <div className="mt-8 flex items-center gap-3 text-xs text-[#617083]"><ShieldCheck className="h-4 w-4 text-[#a87535]" />No details are stored or submitted.</div>
          </div>

          <div className="relative min-h-[570px] overflow-hidden rounded-[6rem_2.2rem_2.2rem_2.2rem] border border-[#07111f]/10 bg-[#07111f] p-5 text-white shadow-[0_36px_100px_rgba(7,17,31,0.2)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_10%,rgba(217,175,107,0.17),transparent_22rem),linear-gradient(145deg,rgba(255,255,255,0.04),transparent_45%)]" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">Prepare your consultation</p><p className="mt-1 text-sm text-white/50">Step {step + 1} of 3</p></div><div className="flex gap-1.5">{[0, 1, 2].map((item) => <span key={item} className={`h-2 rounded-full transition-all ${item === step ? 'w-8 bg-[#d9af6b]' : item < step ? 'w-2 bg-[#edcd94]/55' : 'w-2 bg-white/12'}`} />)}</div></div>

              <AnimatePresence mode="wait">
                {step === 0 && <motion.div key="builder-matter" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-8"><h3 className="font-serif text-3xl text-[#fffaf1]">What will the consultation be about?</h3><div className="mt-6 flex flex-wrap gap-3">{matterOptions.map((item, index) => <button key={item.id} type="button" onClick={() => setMatter(item.id)} className={`group relative overflow-hidden rounded-[999px_999px_999px_1rem] border px-5 py-4 text-left text-sm font-medium transition ${matter === item.id ? 'border-[#d9af6b]/70 bg-[#d9af6b] text-[#07111f]' : 'border-white/12 bg-white/[0.045] text-white/76 hover:border-[#d9af6b]/35 hover:text-white'}`}><span className="mr-2 text-[10px] opacity-55">0{index + 1}</span>{item.title}</button>)}</div><button type="button" disabled={!matter} onClick={() => setStep(1)} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] transition hover:bg-[#edcd94] disabled:opacity-35">Continue <ArrowRight className="h-4 w-4" /></button></motion.div>}

                {step === 1 && <motion.div key="builder-stage" initial={reduceMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="mt-8"><h3 className="font-serif text-3xl text-[#fffaf1]">Where are you in the process?</h3><div className="mt-6 space-y-3">{stageOptions.map((item) => <button key={item.id} type="button" onClick={() => setStage(item.id)} className={`group flex w-full items-center gap-4 rounded-[1.2rem_3.5rem_3.5rem_1.2rem] border p-4 text-left transition ${stage === item.id ? 'border-[#d9af6b]/70 bg-[#d9af6b]/13' : 'border-white/10 bg-white/[0.04] hover:border-white/22'}`}><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${stage === item.id ? 'bg-[#d9af6b] text-[#07111f]' : 'border border-white/12 text-[#edcd94]'}`}>{stage === item.id ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}</span><span><span className="block text-sm font-semibold text-white">{item.title}</span><span className="mt-1 block text-xs text-white/45">{item.copy}</span></span></button>)}</div><div className="mt-7 flex gap-3"><button type="button" onClick={() => setStep(0)} className="grid h-12 w-12 place-items-center rounded-full border border-white/12 text-white/68"><ArrowLeft className="h-4 w-4" /></button><button type="button" disabled={!stage} onClick={() => setStep(2)} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] disabled:opacity-35">Build my checklist <ArrowRight className="h-4 w-4" /></button></div></motion.div>}

                {step === 2 && <motion.div key="builder-checklist" initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} className="mt-8"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">Your tailored checklist</span><h3 className="mt-2 font-serif text-3xl text-[#fffaf1]">Prepare these helpful items.</h3></div><span className="text-xs text-white/42">{checked.length}/{items.length} ready</span></div><div className="mt-6 space-y-2">{items.map((item, index) => { const active = checked.includes(index); return <button key={item} type="button" onClick={() => setChecked((current) => active ? current.filter((value) => value !== index) : [...current, index])} className={`flex w-full items-center gap-4 rounded-[1.1rem_2.5rem_2.5rem_1.1rem] border px-4 py-3.5 text-left transition ${active ? 'border-[#d9af6b]/48 bg-[#d9af6b]/11' : 'border-white/9 bg-white/[0.035] hover:border-white/18'}`}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${active ? 'bg-[#d9af6b] text-[#07111f]' : 'border border-white/14 text-white/28'}`}>{active ? <Check className="h-4 w-4" /> : <FileText className="h-3.5 w-3.5" />}</span><span className={`text-sm ${active ? 'text-white' : 'text-white/64'}`}>{item}</span></button>; })}</div><div className="mt-7 grid gap-3 sm:grid-cols-2"><button type="button" onClick={copyChecklist} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 text-sm font-semibold text-white/74 transition hover:border-[#d9af6b]/40 hover:text-white">{copied ? <CheckCircle2 className="h-4 w-4 text-[#edcd94]" /> : <Copy className="h-4 w-4" />}{copied ? 'Checklist copied' : 'Copy checklist'}</button><a href={`https://wa.me/27766116965?text=${message}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-5 text-sm font-semibold text-[#07111f] transition hover:bg-[#edcd94]"><MessageCircle className="h-4 w-4" /> Continue on WhatsApp</a></div><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-white/38 hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Build another checklist</button><p className="mt-5 text-[11px] leading-5 text-white/32">This list is general preparation guidance. The firm may request different documents after assessing your matter.</p></motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
