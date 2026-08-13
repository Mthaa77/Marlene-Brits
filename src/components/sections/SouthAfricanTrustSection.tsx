import { Building2, Landmark, MapPin, ShieldCheck } from 'lucide-react'

const trustSignals = [
  {
    number: '01',
    icon: ShieldCheck,
    eyebrow: 'Professional capacity',
    title: 'Attorney · Conveyancer · Notary',
    copy: 'A multidisciplinary legal practice able to guide connected property, estate and notarial matters with a clear view of the whole instruction.',
  },
  {
    number: '02',
    icon: Landmark,
    eyebrow: 'Property law context',
    title: 'Pretoria Deeds Registry experience',
    copy: 'Director Marlene Brits brings conveyancing and lodging-agent experience to property transactions requiring careful local execution.',
  },
  {
    number: '03',
    icon: MapPin,
    eyebrow: 'Locally accessible',
    title: 'Menlyn Maine, Pretoria East',
    copy: 'Meet the team at Pegasus Building 1 in a central Gauteng business precinct, with telephone, email and WhatsApp access available.',
  },
]

export default function SouthAfricanTrustSection() {
  return (
    <section id="trust" aria-labelledby="trust-heading" className="relative overflow-hidden bg-[#07111f] py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_12%_5%,rgba(217,175,107,0.18),transparent_24rem),radial-gradient(circle_at_88%_90%,rgba(57,103,139,0.24),transparent_28rem)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9af6b]/45 to-transparent" />

      <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3 text-[#e5bd79]">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[#d9af6b]/30 bg-[#d9af6b]/10 font-serif text-sm">ZA</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">South African legal practice</span>
            </div>
            <h2 id="trust-heading" className="premium-heading mt-6 max-w-xl font-serif text-[clamp(3rem,6vw,5.7rem)] font-medium leading-[0.88] tracking-[-0.055em] text-[#fffaf1]">
              Local context. <span className="italic text-[#d9af6b]">Professional depth.</span>
            </h2>
            <p className="premium-lede mt-7 max-w-lg text-white/57 sm:text-base sm:leading-8">
              Important legal work calls for more than a polished promise. It calls for professional capacity you can recognise, a clear local footprint and communication you can act on.
            </p>

            <div className="mt-8 flex items-center gap-3 border-l border-[#d9af6b]/35 pl-4">
              <Building2 className="h-5 w-5 shrink-0 text-[#d9af6b]" strokeWidth={1.6} />
              <p className="text-xs leading-5 text-white/54">
                Established in Pretoria in 2019 and serving individuals, families and businesses across Gauteng.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute bottom-8 left-[1.55rem] top-8 w-px bg-gradient-to-b from-[#d9af6b]/5 via-[#d9af6b]/45 to-[#d9af6b]/5 sm:left-[2.05rem]" />
            <div className="divide-y divide-white/10 border-y border-white/10">
              {trustSignals.map(({ number, icon: Icon, eyebrow, title, copy }) => (
                <article key={number} className="group relative grid grid-cols-[3.2rem_1fr] gap-4 py-8 sm:grid-cols-[4.2rem_1fr] sm:gap-6 sm:py-10">
                  <span className="relative z-10 grid h-[3.2rem] w-[3.2rem] place-items-center rounded-full border border-[#d9af6b]/34 bg-[#0b1a2c] text-[#e9c484] shadow-[0_0_0_8px_#07111f] transition duration-300 group-hover:border-[#d9af6b]/65 group-hover:bg-[#11243b] sm:h-[4.1rem] sm:w-[4.1rem]">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.45} />
                  </span>
                  <div className="min-w-0 sm:grid sm:grid-cols-[1fr_1.18fr] sm:gap-8">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">{eyebrow}</span>
                        <span className="font-serif text-xs text-white/28">{number}</span>
                      </div>
                      <h3 className="mt-3 font-serif text-2xl leading-tight text-[#fffaf1] sm:text-3xl">{title}</h3>
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/52 sm:mt-0">{copy}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-4 rounded-[1.5rem_3.5rem_1.5rem_3.5rem] border border-[#d9af6b]/18 bg-white/[0.045] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <p className="max-w-2xl text-xs leading-6 text-white/48">
                Trust begins with clarity: legal services and fees are confirmed after the firm understands the facts and scope of your matter.
              </p>
              <a href="#contact" className="inline-flex shrink-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e5bd79] transition hover:text-white">
                Verify your next step <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
