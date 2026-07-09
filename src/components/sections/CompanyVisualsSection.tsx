'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2, Camera, Landmark, ShieldCheck, Sparkles } from 'lucide-react';

const visualAssets = [
  {
    src: '/uploads/main-1612194838.jpg',
    title: 'Pretoria East Presence',
    subtitle: 'A premium building image that anchors the firm in a real, professional environment.',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: '/uploads/ChatGPT%20Image%20Jul%208%2C%202026%2C%2009_28_52%20PM.png',
    title: 'Brand Authority',
    subtitle: 'A refined legal identity designed to feel established and trustworthy.',
    span: '',
  },
  {
    src: '/uploads/ChatGPT%20Image%20Jul%208%2C%202026%2C%2009_31_06%20PM.png',
    title: 'Premium Legal Detail',
    subtitle: 'Gold, navy, and cinematic contrast for a high-end client experience.',
    span: '',
  },
  {
    src: '/uploads/ChatGPT%20Image%20Jul%208%2C%202026%2C%2009_36_03%20PM.png',
    title: 'Firm Signature',
    subtitle: 'Visual consistency that reinforces Marlene Brits Attorneys across the website.',
    span: 'lg:col-span-2',
  },
  {
    src: '/uploads/OIP%20%281%29.webp',
    title: 'Professional Atmosphere',
    subtitle: 'Office and legal environment imagery to make the site feel more grounded.',
    span: '',
  },
];

function VisualPanel({ asset, index }: { asset: (typeof visualAssets)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.62, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative min-h-[330px] overflow-hidden rounded-[2rem] border border-gold/20 bg-[#071020] shadow-[0_34px_120px_rgba(9,13,25,0.18)] ${asset.span}`}
    >
      <img
        src={asset.src}
        alt={asset.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/92 via-[#050814]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,165,96,0.18),transparent_38%)] opacity-80" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-gold/22 bg-[#050814]/58 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/86 backdrop-blur-xl">
        <Camera className="h-3.5 w-3.5" />
        Firm Visual
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <h3 className="font-serif-optical text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {asset.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-white/66 sm:text-base">
          {asset.subtitle}
        </p>
      </div>
    </motion.article>
  );
}

export default function CompanyVisualsSection() {
  return (
    <section className="relative overflow-hidden bg-[#050814] py-20 text-white sm:py-24 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(214,165,96,0.18),transparent_26rem),radial-gradient(circle_at_82%_40%,rgba(255,255,255,0.08),transparent_24rem),linear-gradient(135deg,#050814,#0d1425_56%,#050814)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:58px_58px]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/22 bg-gold/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/85 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5" />
              Real Firm Visuals
            </span>
            <h2 className="mt-6 font-serif-optical text-[clamp(2.65rem,7vw,5.35rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-white">
              A Website That
              <span className="block bg-gradient-to-r from-[#f4d79b] via-[#c58a44] to-[#f8e5bd] bg-clip-text text-transparent">
                Feels Like Them.
              </span>
            </h2>
          </div>

          <div className="rounded-[1.75rem] border border-gold/18 bg-white/[0.055] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold text-[#071020]">
                <Building2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/82">Visual Strategy</p>
                <p className="text-sm text-white/62">The uploaded company images are now used as big identity moments across the page.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <Landmark className="mb-3 h-5 w-5 text-gold" />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/72">Location</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <ShieldCheck className="mb-3 h-5 w-5 text-gold" />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/72">Trust</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <ArrowRight className="mb-3 h-5 w-5 text-gold" />
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/72">Conversion</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid auto-rows-[330px] grid-cols-1 gap-5 lg:grid-cols-4">
          {visualAssets.map((asset, index) => (
            <VisualPanel key={asset.src} asset={asset} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
