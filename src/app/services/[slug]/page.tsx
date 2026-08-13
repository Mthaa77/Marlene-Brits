import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileSignature,
  FileText,
  Heart,
  Mail,
  MessageCircle,
  Phone,
  Scale,
  Shield,
  Sparkles,
  Stamp,
  type LucideIcon,
} from 'lucide-react';
import Navigation from '@/components/premium/Navigation';
import FooterSection from '@/components/sections/FooterSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { company } from '@/data/company';
import { defaultServicePreparation, servicePreparation } from '@/data/service-content';
import { practiceAreas } from '@/data/services';

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Shield,
  FileText,
  Heart,
  FileSignature,
  Stamp,
  Scale,
  Banknote,
};

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.id }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = practiceAreas.find((practice) => practice.id === slug);
  if (!area) return {};

  const title = `${area.title} | Marlene Brits Attorneys`;
  const description = `${area.tagline}. Explore how Marlene Brits Attorneys assists with ${area.title.toLowerCase()}, what the process may involve and how to prepare.`;

  return {
    title,
    description,
    alternates: { canonical: `/services/${area.id}` },
    openGraph: { title, description, url: `/services/${area.id}`, type: 'website' },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const area = practiceAreas.find((practice) => practice.id === slug);
  if (!area) notFound();

  const Icon = iconMap[area.icon] || FileText;
  const areaIndex = practiceAreas.findIndex((practice) => practice.id === area.id);
  const prepare = servicePreparation[area.id] ?? defaultServicePreparation;
  const related = area.relatedServices
    .map((id) => practiceAreas.find((practice) => practice.id === id))
    .filter((practice): practice is (typeof practiceAreas)[number] => Boolean(practice));
  const phone = company.contact.phone.replace(/\s/g, '');
  const whatsappText = encodeURIComponent(
    `Hello Marlene Brits Attorneys. I would like guidance about ${area.title}. Please let me know the best next step and what I should prepare.`,
  );

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: area.title,
    description: area.description,
    provider: {
      '@type': 'LegalService',
      name: company.name,
      telephone: '+27766116965',
      email: company.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Spaces Menlyn Maine, Pegasus Building 1, 210 Amarand Avenue',
        addressLocality: 'Pretoria',
        addressRegion: 'Gauteng',
        postalCode: '0181',
        addressCountry: 'ZA',
      },
    },
    areaServed: ['Pretoria East', 'Gauteng', 'South Africa'],
    url: `https://mbritslaw.co.za/services/${area.id}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: area.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <Navigation />
      <main className="overflow-hidden bg-[#f7f3eb] pb-20 pt-[92px] text-[#07111f] lg:pb-0 lg:pt-[100px]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <section className="px-3 pb-3 sm:px-5 sm:pb-5 lg:px-7">
          <div className="relative mx-auto overflow-hidden rounded-[1.7rem_1.7rem_4.5rem_1.7rem] border border-white/12 bg-[#050d18] text-white shadow-[0_38px_130px_rgba(7,17,31,0.28)] sm:rounded-[2.4rem_2.4rem_7rem_2.4rem]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(217,175,107,0.22),transparent_28rem),radial-gradient(circle_at_12%_88%,rgba(255,255,255,0.055),transparent_24rem)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:76px_76px]" />
            <div className="relative mx-auto max-w-[88rem] px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-16 xl:px-16 xl:py-20">
              <Link href="/#services" className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/52 transition hover:text-[#edcd94]"><ArrowLeft className="h-3.5 w-3.5" /> All practice areas</Link>

              <div className="mt-8 grid gap-9 xl:grid-cols-[1.15fr_0.85fr] xl:items-end xl:gap-16">
                <div>
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-[#d9af6b]/35 bg-[#d9af6b]/12 text-[#edcd94] shadow-[0_18px_55px_rgba(217,175,107,0.14)]"><Icon className="h-6 w-6" strokeWidth={1.45} /></span>
                    <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]"><Sparkles className="h-3.5 w-3.5" /> Practice area · {String(areaIndex + 1).padStart(2, '0')}</span>
                  </div>
                  <h1 className="mt-7 max-w-[12ch] font-serif text-[clamp(3.1rem,9vw,7.5rem)] font-medium leading-[0.86] tracking-[-0.058em] text-[#fffaf1]">{area.title}</h1>
                  <p className="mt-6 max-w-3xl font-serif text-[1.45rem] italic leading-snug text-[#edcd94] sm:text-[1.85rem]">{area.tagline}</p>
                </div>

                <div className="xl:border-l xl:border-white/10 xl:pl-10">
                  <p className="text-base leading-8 text-white/66 sm:text-[1.05rem]">{area.description}</p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row xl:flex-col 2xl:flex-row">
                    <a href={`https://wa.me/27766116965?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-6 text-sm font-bold text-[#07111f] shadow-[0_18px_48px_rgba(217,175,107,0.23)] transition hover:-translate-y-0.5 hover:bg-[#edcd94]"><MessageCircle className="h-4 w-4" /> Ask about this service <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
                    <a href="/#consultation-builder" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/14 px-6 text-sm font-semibold text-white/74 transition hover:border-[#d9af6b]/45 hover:bg-white/5 hover:text-white"><ClipboardCheck className="h-4 w-4 text-[#d9af6b]" /> Prepare first</a>
                  </div>
                  <p className="mt-4 text-[11px] leading-5 text-white/34">A first enquiry does not require every document or every answer. Begin with the essentials.</p>
                </div>
              </div>

              <div className="mt-10 grid border-y border-white/10 sm:grid-cols-3 xl:mt-14">
                {[
                  ['Direct', 'Personal attention from the first conversation'],
                  ['Clear', 'Practical advice in understandable language'],
                  ['Careful', 'Detail managed with professional diligence'],
                ].map(([label, copy], index) => (
                  <div key={label} className={`py-5 ${index ? 'border-t border-white/10 sm:border-l sm:border-t-0 sm:pl-6' : ''} ${index < 2 ? 'sm:pr-6' : ''}`}>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">{label}</p>
                    <p className="mt-2 text-xs leading-5 text-white/48">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 xl:grid-cols-[0.82fr_1.18fr] xl:gap-20">
              <div className="xl:sticky xl:top-28 xl:self-start">
                <span className="editorial-label">Recognise the moment</span>
                <h2 className="section-title mt-5 max-w-[10ch] text-[#07111f]">When this service may <span className="italic text-[#a87535]">help.</span></h2>
                <p className="mt-6 max-w-lg text-base leading-8 text-[#526071]">You do not need to diagnose the legal issue yourself. If any of these situations feel familiar, the firm can help you clarify what matters, what is urgent and what route may be appropriate.</p>
                <a href={`tel:${phone}`} className="mt-7 inline-flex min-h-13 items-center gap-2 rounded-full bg-[#07111f] px-6 text-sm font-semibold text-white shadow-[0_18px_46px_rgba(7,17,31,0.14)] transition hover:bg-[#10243b]"><Phone className="h-4 w-4 text-[#edcd94]" /> Discuss your circumstances</a>
              </div>

              <div className="border-t border-[#07111f]/12">
                {area.commonSituations.map((situation, index) => (
                  <div key={situation} className="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[#07111f]/10 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center">
                    <span className="font-serif text-2xl text-[#a87535]">{String(index + 1).padStart(2, '0')}</span>
                    <p className="font-serif text-[1.35rem] leading-snug text-[#263548] transition group-hover:text-[#07111f] sm:text-[1.65rem]">{situation}</p>
                    <ArrowRight className="hidden h-5 w-5 text-[#a87535] transition group-hover:translate-x-1 sm:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 border-b border-[#07111f]/10 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div><span className="editorial-label">Practical legal support</span><h2 className="section-title mt-5 max-w-[11ch] text-[#07111f]">Careful work, made <span className="italic text-[#a87535]">understandable.</span></h2></div>
              <p className="max-w-2xl text-base leading-8 text-[#526071] lg:justify-self-end">The firm manages both the legal detail and the client experience: explaining what is being done, why it matters and what you may need to decide next.</p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {area.howWeHelp.map((item, index) => (
                <article key={item} className={`relative overflow-hidden rounded-[1.4rem_3.5rem_3.5rem_1.4rem] border border-[#07111f]/9 bg-[#f8f5ee] p-6 shadow-[0_18px_48px_rgba(7,17,31,0.055)] ${index === 0 ? 'md:col-span-2 xl:col-span-2' : ''}`}>
                  <span className="font-serif text-4xl text-[#a87535]/26">{String(index + 1).padStart(2, '0')}</span>
                  <p className="mt-7 text-sm leading-7 text-[#435266] sm:text-[0.95rem]">{item}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-10 rounded-[1.8rem_1.8rem_5rem_1.8rem] bg-[#07111f] p-6 text-white shadow-[0_34px_100px_rgba(7,17,31,0.2)] sm:p-9 lg:grid-cols-[0.72fr_1.28fr] lg:p-12">
              <div><span className="editorial-label editorial-label--dark">A visible process</span><h2 className="mt-5 max-w-[9ch] font-serif text-[clamp(2.7rem,5.5vw,5rem)] font-medium leading-[0.92] tracking-[-0.05em] text-[#fffaf1]">Know what happens <span className="italic text-[#edcd94]">next.</span></h2><p className="mt-6 max-w-md text-sm leading-7 text-white/52">Exact timing and steps depend on the facts, but a visible route makes the work easier to understand and prepare for.</p></div>
              <div className="relative border-l border-[#d9af6b]/22 pl-6 sm:pl-9">
                {area.process.map((step, index) => (
                  <div key={step.step} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[2.05rem] top-1 grid h-5 w-5 place-items-center rounded-full border-4 border-[#07111f] bg-[#d9af6b] sm:-left-[2.85rem]" />
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d9af6b]">Step {String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 font-serif text-2xl text-[#fffaf1]">{step.step}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/54">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-[88rem] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
            <div>
              <span className="editorial-label">Arrive prepared</span>
              <h2 className="section-title mt-5 max-w-[11ch] text-[#07111f]">A more useful first <span className="italic text-[#a87535]">conversation.</span></h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#526071]">You can contact the firm even if these items are not yet available. Where possible, gathering them can help the team understand the matter sooner and identify missing information early.</p>
              <div className="mt-8 space-y-3">
                {prepare.map((item, index) => (
                  <div key={item} className="flex items-start gap-4 rounded-[1.2rem_3rem_3rem_1.2rem] border border-[#07111f]/9 bg-white p-4 shadow-[0_14px_42px_rgba(7,17,31,0.05)]">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#07111f] text-[10px] font-semibold text-[#edcd94]">0{index + 1}</span>
                    <p className="pt-1 text-sm leading-6 text-[#435266]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="editorial-label">Frequently asked</span>
              <h2 className="mt-5 max-w-xl font-serif text-[clamp(2.7rem,5vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.045em] text-[#07111f]">Useful answers before you take the next step.</h2>
              <Accordion type="single" collapsible className="mt-8 space-y-3">
                {area.faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`} className="overflow-hidden rounded-[1.2rem_3rem_3rem_1.2rem] border border-[#07111f]/9 bg-white px-5 shadow-[0_14px_42px_rgba(7,17,31,0.05)] data-[state=open]:border-[#d9af6b]/48 data-[state=open]:bg-[#fffaf1]">
                    <AccordionTrigger className="py-5 text-left font-serif text-lg leading-snug text-[#07111f] hover:text-[#8d612a] hover:no-underline sm:text-xl"><span className="flex gap-3 pr-4"><span className="text-[10px] font-sans font-semibold tracking-[0.15em] text-[#a87535]">0{index + 1}</span>{faq.question}</span></AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-7 text-[#526071] sm:text-base">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div><span className="editorial-label">Connected legal needs</span><h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-[-0.04em] text-[#07111f]">Related practice areas</h2></div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((practice) => {
                  const RelatedIcon = iconMap[practice.icon] || FileText;
                  return (
                    <Link key={practice.id} href={`/services/${practice.id}`} className="group flex min-h-24 items-center gap-4 rounded-[1.2rem_3rem_3rem_1.2rem] border border-[#07111f]/9 bg-[#f8f5ee] p-4 transition hover:-translate-y-0.5 hover:border-[#d9af6b]/48 hover:bg-[#fffaf1]">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#07111f] text-[#edcd94]"><RelatedIcon className="h-4 w-4" /></span>
                      <span><span className="block font-serif text-lg text-[#07111f]">{practice.shortTitle}</span><span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9b6d30]">Explore service <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" /></span></span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#07111f] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid max-w-[88rem] gap-8 rounded-[1.8rem_4.8rem_1.8rem_1.8rem] border border-[#d9af6b]/24 bg-white/[0.045] p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
            <div><span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Your matter deserves context</span><h2 className="mt-4 max-w-4xl font-serif text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[0.94] tracking-[-0.045em] text-[#fffaf1]">The right next step begins with a conversation about your circumstances.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-white/54 sm:text-base">Share what has happened, any important date and the outcome you need. The firm can then help you identify the appropriate route.</p></div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href={`https://wa.me/27766116965?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#d9af6b] px-7 text-sm font-bold text-[#07111f] hover:bg-[#edcd94]"><MessageCircle className="h-4 w-4" /> Start on WhatsApp</a>
              <a href={`mailto:${company.contact.email}?subject=${encodeURIComponent(`Enquiry: ${area.title}`)}`} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/12 px-7 text-sm font-semibold text-white/70 hover:border-[#d9af6b]/40 hover:text-white"><Mail className="h-4 w-4 text-[#d9af6b]" /> Email the firm</a>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d9af6b]/28 bg-[#07111f]/96 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_55px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg gap-2">
          <a href={`tel:${phone}`} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/12 text-xs font-semibold text-white/72"><Phone className="h-4 w-4 text-[#d9af6b]" /> Call firm</a>
          <a href={`https://wa.me/27766116965?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 flex-[1.35] items-center justify-center gap-2 rounded-full bg-[#d9af6b] text-xs font-bold text-[#07111f]"><MessageCircle className="h-4 w-4" /> Ask about this service</a>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
