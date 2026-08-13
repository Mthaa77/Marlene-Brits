import Image from 'next/image';
import { Award, BadgeCheck, Mail } from 'lucide-react';

export default function TeamSection() {
  return (
    <section id="team" className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-[#07111f]/10 bg-[#f5f5f3] shadow-[0_30px_90px_rgba(7,17,31,0.14)]"><Image src="/uploads/OIP (1).webp" alt="Marlene Brits and a member of the Marlene Brits Attorneys team" fill unoptimized sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-top" /></div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-[#d9af6b]/28 bg-[#07111f] p-5 text-white shadow-[0_20px_60px_rgba(7,17,31,0.24)] sm:left-8 sm:right-8"><p className="font-serif text-xl text-[#fffaf1]">A focused team, personally involved.</p><p className="mt-1 text-xs text-white/52">Attorney · Conveyancer · Notary</p></div>
        </div>

        <div className="pt-5 lg:pt-0"><span className="premium-kicker text-[#9b6d30]">The legal team</span><h2 className="premium-heading mt-4 max-w-2xl font-serif text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#07111f]">Experience you can reach. Counsel you can <span className="italic text-[#a87535]">understand.</span></h2><p className="premium-lede mt-6 max-w-2xl text-[#526071] sm:text-lg">Led by founder Marlene Brits, the practice combines technical legal capability with a personal, approachable service experience.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-[1.4rem] border border-[#07111f]/9 bg-[#f8f5ee] p-6"><BadgeCheck className="h-5 w-5 text-[#a87535]" /><h3 className="mt-5 font-serif text-2xl text-[#07111f]">Marlene Brits</h3><p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9b6d30]">Founder & Managing Director</p><p className="mt-4 text-sm leading-7 text-[#617083]">Attorney, Conveyancer and Notary with focused experience in property, estate and notarial matters.</p><a href="mailto:marlene@mbritslaw.co.za" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#8d612a]"><Mail className="h-3.5 w-3.5" /> Email Marlene</a></article>
            <article className="rounded-[1.4rem] border border-[#07111f]/9 bg-[#f8f5ee] p-6"><Award className="h-5 w-5 text-[#a87535]" /><h3 className="mt-5 font-serif text-2xl text-[#07111f]">Hesmarie Swart</h3><p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9b6d30]">Attorney</p><p className="mt-4 text-sm leading-7 text-[#617083]">Supporting the firm’s property, conveyancing, deceased estate and notarial practice areas.</p></article>
          </div>
        </div>
      </div>
    </section>
  );
}
