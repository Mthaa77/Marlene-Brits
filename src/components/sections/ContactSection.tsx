import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { company } from '@/data/company';

const phone = company.contact.phone.replace(/\s/g, '');

export default function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden bg-[#07111f] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_16%,rgba(217,175,107,0.14),transparent_24rem),radial-gradient(circle_at_88%_72%,rgba(255,255,255,0.06),transparent_22rem)]" />
      <div className="relative mx-auto max-w-[88rem] overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/[0.04] shadow-[0_34px_110px_rgba(0,0,0,0.28)]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d9af6b]">Start a conversation</span>
            <h2 className="mt-4 max-w-3xl font-serif text-[clamp(3rem,7vw,6.2rem)] font-medium leading-[0.9] tracking-[-0.055em] text-[#fffaf1]">Your next step can be a clear one.</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">Tell the firm what you need help with. You will receive guidance on the right next step and what information to prepare.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${phone}`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#d9af6b] px-7 text-sm font-semibold text-[#07111f] transition hover:bg-[#edcd94]"><Phone className="h-4 w-4" /> Call {company.contact.phone}</a>
              <a href="https://wa.me/27766116965?text=Hello%20Marlene%20Brits%20Attorneys%2C%20I%20would%20like%20to%20arrange%20a%20consultation." target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/14 px-7 text-sm font-semibold text-white transition hover:border-[#d9af6b]/45 hover:bg-white/5"><MessageCircle className="h-4 w-4 text-[#edcd94]" /> WhatsApp the firm</a>
            </div>
          </div>

          <div className="border-t border-white/10 bg-[#040b14]/38 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="space-y-3">
              <a href={`mailto:${company.contact.email}`} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-[#d9af6b]/30 hover:bg-white/[0.065]"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#d9af6b]/10 text-[#edcd94]"><Mail className="h-4 w-4" /></span><span><span className="block text-xs text-white/42">Email</span><span className="mt-1 block text-sm font-medium text-white">{company.contact.email}</span></span><ArrowUpRight className="ml-auto h-4 w-4 text-[#d9af6b]" /></a>
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#d9af6b]/10 text-[#edcd94]"><MapPin className="h-4 w-4" /></span><span><span className="block text-xs text-white/42">Office</span><span className="mt-1 block text-sm font-medium leading-6 text-white">Spaces Menlyn Maine, Pegasus Building 1<br />210 Amarand Avenue, Pretoria East</span></span></div>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#d9af6b]/10 text-[#edcd94]"><Clock3 className="h-4 w-4" /></span><span><span className="block text-xs text-white/42">Office hours</span><span className="mt-1 block text-sm font-medium text-white">Monday–Friday · 08:00–17:00</span></span></div>
            </div>
            <p className="mt-6 text-xs leading-6 text-white/38">Sending a message does not create an attorney-client relationship. Please avoid sharing highly sensitive information before the firm confirms your consultation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
