import { ArrowRight, FileCheck2, MessagesSquare, Route } from 'lucide-react';

const steps = [
  { icon: MessagesSquare, title: 'Start with a conversation', copy: 'Share the context of your matter and the outcome you need. The firm identifies the right legal route.' },
  { icon: Route, title: 'Receive a clear way forward', copy: 'Understand the process, the information required and the important next steps before work begins.' },
  { icon: FileCheck2, title: 'Move forward with confidence', copy: 'Your matter is handled carefully, with practical updates and attention to every legal detail.' },
];

export default function ProcessSection() {
  return (
    <section id="approach" className="scroll-mt-24 bg-[#f7f3eb] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b6d30]">What to expect</span><h2 className="mt-4 font-serif text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#07111f]">A clearer path through your legal matter.</h2></div><p className="max-w-xl text-base leading-8 text-[#526071] lg:justify-self-end">Good legal support should reduce uncertainty. The process begins with understanding, then moves with clear communication and careful execution.</p></div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">{steps.map((step, index) => { const Icon = step.icon; return <article key={step.title} className="relative overflow-hidden rounded-[1.5rem] border border-[#07111f]/9 bg-white p-7 shadow-[0_18px_55px_rgba(7,17,31,0.07)] sm:p-8"><span className="absolute right-5 top-3 font-serif text-7xl text-[#07111f]/[0.035]">{index + 1}</span><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#07111f] text-[#edcd94]"><Icon className="h-5 w-5" /></span><h3 className="mt-8 font-serif text-2xl text-[#07111f]">{step.title}</h3><p className="mt-4 text-sm leading-7 text-[#617083]">{step.copy}</p>{index < steps.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 rounded-full bg-[#d9af6b] p-1 text-[#07111f] lg:block" />}</article>; })}</div>
      </div>
    </section>
  );
}
