import { Building2, Circle } from 'lucide-react';

const items = [
  'Property transfers & conveyancing',
  'Deceased estate administration',
  'Wills & estate planning',
  'Antenuptial contracts',
  'Notarial services',
  'Family law support',
  'Pretoria East consultations',
];

function TickerItems({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="legal-ticker-copy flex shrink-0 items-center" aria-hidden={duplicate || undefined}>
      {items.map((item) => <li key={item} className="flex shrink-0 items-center gap-5 px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/66 sm:px-7 sm:text-[11px]">{item}<Circle className="h-1.5 w-1.5 fill-[#d9af6b] text-[#d9af6b]" /></li>)}
    </ul>
  );
}

export default function LiveTickerSection() {
  return (
    <aside className="legal-ticker-shell relative isolate overflow-hidden border-y border-[#d9af6b]/22 bg-[#07111f] py-4 text-white" aria-label="Marlene Brits Attorneys practice areas ticker">
      <div className="absolute inset-y-0 left-0 z-10 flex w-[8.5rem] items-center bg-[#d9af6b] px-4 text-[#07111f] shadow-[14px_0_36px_rgba(7,17,31,0.4)] sm:w-[11rem] sm:px-6"><span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] sm:text-[10px]"><Building2 className="h-4 w-4" /> Practice desk</span></div>
      <div className="ml-[8.5rem] overflow-hidden sm:ml-[11rem]"><div className="legal-ticker-track"><TickerItems /><TickerItems duplicate /></div></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#07111f] to-transparent" />
    </aside>
  );
}
