import { ArrowRight, ArrowUpRight, Clock3, Compass, FileCheck2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import BrandPlaque from '@/components/premium/BrandPlaque';
import { company } from '@/data/company';

const practiceLinks = ['Conveyancing', 'Deceased Estates', 'Estate Planning', 'Family Law', 'Antenuptial Contracts', 'Notarial Services', 'Civil Litigation', 'Debt Collection'];

const clientLinks = [
  { label: 'Legal Needs Pathfinder', href: '#pathfinder', icon: Compass },
  { label: 'Consultation Preparation', href: '#consultation-builder', icon: FileCheck2 },
  { label: 'Meet the team', href: '#team' },
  { label: 'Frequently asked questions', href: '#faq' },
];

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-[#030912] px-4 pb-8 pt-12 text-white sm:px-6 sm:pt-16 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_28%,rgba(217,175,107,0.12),transparent_24rem),radial-gradient(circle_at_90%_80%,rgba(255,255,255,0.045),transparent_22rem)]" />
      <div className="relative mx-auto max-w-[88rem]">
        <div className="relative overflow-hidden rounded-[2rem_5rem_2rem_2rem] border border-[#d9af6b]/24 bg-[linear-gradient(120deg,rgba(217,175,107,0.16),rgba(255,255,255,0.035)_52%,rgba(217,175,107,0.08))] px-6 py-9 shadow-[0_34px_110px_rgba(0,0,0,0.3)] sm:px-10 sm:py-11 lg:px-12">
          <div className="pointer-events-none absolute -right-12 -top-16 h-60 w-60 rounded-full border border-[#d9af6b]/12" />
          <div className="pointer-events-none absolute -right-2 -top-8 h-40 w-40 rounded-full border border-white/[0.06]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#d9af6b]">A considered next step</span><h2 className="mt-4 max-w-4xl font-serif text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.94] tracking-[-0.045em] text-[#fffaf1]">Bring the matter. Leave the first conversation with greater clarity.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">Speak directly with a Pretoria East legal team committed to personal attention, understandable guidance and careful legal execution.</p></div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href="#contact" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#d9af6b] px-7 text-sm font-semibold text-[#07111f] shadow-[0_18px_50px_rgba(217,175,107,0.22)] transition hover:-translate-y-0.5 hover:bg-[#edcd94]">Book a consultation <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
              <a href="https://wa.me/27766116965?text=Hello%20Marlene%20Brits%20Attorneys%2C%20I%20would%20like%20guidance%20on%20a%20legal%20matter." target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/12 bg-white/[0.035] px-7 text-sm font-semibold text-white/72 transition hover:border-[#d9af6b]/38 hover:bg-white/[0.06] hover:text-white"><MessageCircle className="h-4 w-4 text-[#d9af6b]" /> WhatsApp the firm</a>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.95fr_0.8fr_1.15fr] lg:gap-12 lg:py-16">
          <div>
            <BrandPlaque compact className="max-w-sm" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">Personalised legal support across property, estates, family matters, notarial services and civil disputes.</p>
            <p className="mt-6 max-w-sm font-serif text-xl italic leading-snug text-[#edcd94]/74">“You are never just another client.”</p>
            <div className="mt-7 flex flex-wrap gap-2">{company.credentials.map((credential) => <span key={credential} className="rounded-full border border-white/9 bg-white/[0.035] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/44">{credential}</span>)}</div>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Practice areas</p>
            <nav className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">{practiceLinks.map((label) => <a key={label} href="#services" className="group inline-flex items-center gap-2 text-xs leading-5 text-white/44 transition hover:text-[#edcd94]"><span className="h-1 w-1 rounded-full bg-[#d9af6b]/55 transition group-hover:scale-150" />{label}</a>)}</nav>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Client tools</p>
            <nav className="mt-5 space-y-3">{clientLinks.map((link) => { const Icon = link.icon; return <a key={link.href} href={link.href} className="group flex items-center gap-3 text-sm text-white/46 transition hover:text-[#edcd94]">{Icon ? <Icon className="h-4 w-4 text-[#d9af6b]" /> : <ArrowRight className="h-3.5 w-3.5 text-[#d9af6b]/60 transition group-hover:translate-x-0.5" />}{link.label}</a>; })}</nav>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Contact & office</p>
            <div className="mt-5 space-y-4 text-sm text-white/48">
              <a href="tel:+27766116965" className="group flex items-center gap-3 transition hover:text-white"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/9 bg-white/[0.035] text-[#d9af6b]"><Phone className="h-3.5 w-3.5" /></span>{company.contact.phone}<ArrowUpRight className="ml-auto h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" /></a>
              <a href={`mailto:${company.contact.email}`} className="group flex items-center gap-3 transition hover:text-white"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/9 bg-white/[0.035] text-[#d9af6b]"><Mail className="h-3.5 w-3.5" /></span><span className="min-w-0 break-all">{company.contact.email}</span><ArrowUpRight className="ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:opacity-100" /></a>
              <p className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/9 bg-white/[0.035] text-[#d9af6b]"><MapPin className="h-3.5 w-3.5" /></span><span className="pt-1 leading-6">Spaces Menlyn Maine<br />Pegasus Building 1 · Pretoria East</span></p>
              <p className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/9 bg-white/[0.035] text-[#d9af6b]"><Clock3 className="h-3.5 w-3.5" /></span><span className="pt-1 leading-6">Monday–Friday · 08:00–17:00<br />Saturday · By appointment</span></p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-y border-white/8 py-5 sm:grid-cols-3">{company.certifications.map((certification, index) => <div key={certification} className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-white/32 ${index ? 'sm:border-l sm:border-white/8 sm:pl-5' : ''}`}><span className="font-serif text-lg text-[#d9af6b]/70">0{index + 1}</span>{certification}</div>)}</div>

        <div className="grid gap-5 pt-7 text-[10px] leading-5 text-white/27 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-10">
          <div><p>© 2026 Marlene Brits Attorneys.</p><p>All rights reserved.</p></div>
          <p className="max-w-4xl sm:justify-self-end sm:text-right">Information on this website is general in nature and does not constitute legal advice. Contacting the firm does not create an attorney-client relationship until the firm has accepted the instruction.</p>
        </div>
      </div>
    </footer>
  );
}
