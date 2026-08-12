import { Mail, MapPin, Phone } from 'lucide-react';
import { company } from '@/data/company';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our approach', href: '#approach' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
];

export default function FooterSection() {
  return (
    <footer className="border-t border-white/8 bg-[#040b14] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div><p className="font-serif text-2xl tracking-[0.1em] text-[#fffaf1]">MARLENE BRITS</p><p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.45em] text-[#d9af6b]">Attorneys</p><p className="mt-5 max-w-sm font-serif text-lg italic text-white/52">“You are never just another client.”</p></div>
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">Navigate</p><nav className="mt-5 grid grid-cols-2 gap-3">{links.map((link) => <a key={link.href} href={link.href} className="text-sm text-white/50 transition hover:text-[#edcd94]">{link.label}</a>)}</nav></div>
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">Contact</p><div className="mt-5 space-y-3 text-sm text-white/50"><a href="tel:+27766116965" className="flex items-center gap-3 hover:text-white"><Phone className="h-4 w-4 text-[#d9af6b]" />{company.contact.phone}</a><a href={`mailto:${company.contact.email}`} className="flex items-center gap-3 hover:text-white"><Mail className="h-4 w-4 text-[#d9af6b]" />{company.contact.email}</a><p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d9af6b]" />Spaces Menlyn Maine, Pretoria East</p></div></div>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-[11px] text-white/30 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Marlene Brits Attorneys. All rights reserved.</p><p>Attorney · Conveyancer · Notary</p></div>
      </div>
    </footer>
  );
}
