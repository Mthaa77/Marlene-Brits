import Image from 'next/image';

type BrandPlaqueProps = {
  className?: string;
  compact?: boolean;
  priority?: boolean;
};

export default function BrandPlaque({ className = '', compact = false, priority = false }: BrandPlaqueProps) {
  return (
    <div
      className={`group relative isolate overflow-hidden border border-[#d9af6b]/30 bg-[#030912] shadow-[0_26px_90px_rgba(0,0,0,0.34)] ${compact ? 'aspect-[16/7] rounded-[1.4rem]' : 'aspect-[16/9] rounded-[2rem_2rem_5rem_2rem]'} ${className}`}
    >
      <Image
        src="/uploads/ChatGPT Image Jul 8, 2026, 09_31_06 PM.png"
        alt="Marlene Brits Attorneys — Attorneys, Notaries and Conveyancers"
        fill
        priority={priority}
        sizes={compact ? '(max-width: 768px) 92vw, 520px' : '(max-width: 1024px) 92vw, 620px'}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(2,7,14,0.36)),radial-gradient(circle_at_50%_0%,rgba(244,215,155,0.11),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-2 rounded-[inherit] border border-white/[0.08]" />
      <span className="absolute bottom-3 right-4 text-[7px] font-semibold uppercase tracking-[0.24em] text-[#f2d49d]/72 sm:bottom-4 sm:right-5 sm:text-[8px]">
        Pretoria East · Est. 2019
      </span>
    </div>
  );
}
