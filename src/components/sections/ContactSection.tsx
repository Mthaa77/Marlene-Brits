import { ArrowRight, ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Navigation2, Phone, ShieldCheck } from 'lucide-react';
import BrandPlaque from '@/components/premium/BrandPlaque';
import { company } from '@/data/company';

const phone = company.contact.phone.replace(/\s/g, '');
const mapQuery = encodeURIComponent('Spaces Menlyn Maine, Pegasus Building 1, 210 Amarand Avenue, Pretoria, 0181');
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;
const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

export default function ContactSection() {
  return (
    <section id="contact" data-interactive-zone className="relative scroll-mt-24 overflow-hidden bg-[#050d18] py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(217,175,107,0.17),transparent_28rem),radial-gradient(circle_at_92%_82%,rgba(255,255,255,0.055),transparent_24rem)]" />
      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d9af6b]">Contact · Menlyn Maine</span>
            <h2 className="mt-4 max-w-4xl font-serif text-[clamp(3.2rem,7vw,6.5rem)] font-medium leading-[0.87] tracking-[-0.06em] text-[#fffaf1]">Meet us where clarity <span className="italic text-[#e0b56f]">begins.</span></h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/52 sm:text-base">A considered first conversation can make the next legal step feel more manageable.</p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr] xl:gap-10">
          <div className="flex flex-col">
            <BrandPlaque compact priority className="w-full" />

            <div className="mt-8">
              <p className="max-w-xl text-base leading-8 text-white/58">Call, email or send a WhatsApp message. The firm will help identify the appropriate service and what to prepare for your consultation.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a href={`tel:${phone}`} className="group inline-flex min-h-14 items-center justify-between rounded-full bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f] shadow-[0_18px_52px_rgba(217,175,107,0.2)] hover:bg-[#edcd94]"><span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> Call the firm</span><ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
                <a href="https://wa.me/27766116965?text=Hello%20Marlene%20Brits%20Attorneys%2C%20I%20would%20like%20to%20arrange%20a%20consultation." target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-14 items-center justify-between rounded-full border border-white/14 px-6 text-sm font-semibold text-white hover:border-[#d9af6b]/45 hover:bg-white/5"><span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4 text-[#edcd94]" /> WhatsApp</span><ArrowUpRight className="h-4 w-4 text-[#d9af6b] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
              </div>
            </div>

            <div className="mt-8 border-y border-white/10">
              <a href={`mailto:${company.contact.email}`} className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 border-b border-white/10 py-4 text-left"><span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-[#d9af6b]"><Mail className="h-4 w-4" /></span><span><span className="block text-[9px] uppercase tracking-[0.18em] text-white/30">Email</span><span className="mt-1 block break-all text-sm font-semibold text-white/78">{company.contact.email}</span></span><ArrowRight className="h-4 w-4 text-[#d9af6b] transition group-hover:translate-x-1" /></a>
              <div className="grid grid-cols-[2.75rem_1fr] items-center gap-3 border-b border-white/10 py-4"><span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-[#d9af6b]"><Clock3 className="h-4 w-4" /></span><span><span className="block text-[9px] uppercase tracking-[0.18em] text-white/30">Office hours</span><span className="mt-1 block text-sm font-semibold text-white/78">Monday–Friday · 08:00–17:00</span></span></div>
              <div className="flex items-start gap-3 py-4 text-xs leading-6 text-white/36"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#d9af6b]" /><span>Please avoid sending highly sensitive information before the firm confirms your consultation. Contacting the firm does not create an attorney-client relationship.</span></div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem_2rem_6rem_2rem] border border-[#d9af6b]/24 bg-[#081322] shadow-[0_42px_140px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col gap-4 border-b border-white/10 bg-[#07111f]/95 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#d9af6b] text-[#07111f]"><MapPin className="h-4 w-4" /></span><span><span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">Office atlas</span><span className="mt-1 block text-sm font-semibold text-[#fffaf1]">Pegasus Building 1 · Menlyn Maine</span></span></div>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/13 px-5 text-xs font-semibold text-white/72 hover:border-[#d9af6b]/45 hover:text-white"><Navigation2 className="h-3.5 w-3.5 text-[#d9af6b]" /> Open directions</a>
            </div>

            <div className="relative min-h-[430px] sm:min-h-[520px]">
              <iframe src={mapEmbedUrl} title="Google Map showing Marlene Brits Attorneys at Pegasus Building 1, Menlyn Maine" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 grayscale-[0.15] saturate-[0.82] contrast-[1.05]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,24,0.14),transparent_22%,transparent_72%,rgba(5,13,24,0.42))]" />
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-sm">
                <div className="rounded-[1.35rem_1.35rem_3.2rem_1.35rem] border border-white/15 bg-[#07111f]/92 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                  <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">Marlene Brits Attorneys</span>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#fffaf1]">Spaces Menlyn Maine<br />Pegasus Building 1</p>
                  <p className="mt-2 text-xs leading-5 text-white/50">210 Amarand Avenue<br />Pretoria, Gauteng · 0181</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
