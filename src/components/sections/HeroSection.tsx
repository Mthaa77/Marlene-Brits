'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const credentials = ['Attorney', 'Conveyancer', 'Notary'];

function scrollTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#07101d] px-4 pb-0 pt-28 text-white sm:px-6 sm:pt-32 lg:px-8 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(135deg,#07101d_0%,#091728_58%,#07101d_100%)]" />
      <div className="pointer-events-none absolute left-0 top-1/4 -z-10 h-px w-1/3 bg-gradient-to-r from-[#c99a52]/55 to-transparent" />

      <div className="mx-auto grid w-full max-w-[90rem] items-center gap-12 pb-12 lg:min-h-[calc(100svh-15rem)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:pb-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
        >
          <h1
            className="text-[clamp(3.35rem,6.5vw,5.25rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#fffaf0]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Legal guidance,
            <span className="mt-2 block text-[#d6a75e]">personally delivered.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-white/68 sm:text-lg lg:mx-0">
            Focused legal support in conveyancing, deceased estates, notarial services and more — handled with care, clarity and precision.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <motion.a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                scrollTo('contact');
              }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              className="inline-flex min-h-14 items-center justify-center rounded-xl bg-[#d6a75e] px-7 text-sm font-semibold text-[#07101d] shadow-[0_18px_48px_rgba(201,154,82,0.24)] transition-colors hover:bg-[#e3b96f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a75e]"
            >
              Book a consultation
            </motion.a>

            <a
              href="#services"
              onClick={(event) => {
                event.preventDefault();
                scrollTo('services');
              }}
              className="group inline-flex min-h-14 items-center justify-center gap-3 px-2 text-sm font-medium text-white/84 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a75e]"
            >
              <span className="border-b border-[#d6a75e]/70 pb-1 transition-colors group-hover:text-[#e3b96f]">
                Explore our services
              </span>
              <ArrowRight className="h-4 w-4 text-[#d6a75e] transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.86, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-4xl lg:mx-0 lg:max-w-none"
        >
          <div className="hero-architectural-image relative aspect-[16/11] overflow-hidden rounded-[1.6rem] border border-white/10 shadow-[0_38px_120px_rgba(0,0,0,0.42)] sm:aspect-[16/10] lg:aspect-[1.22/1] xl:aspect-[1.38/1]">
            <Image
              src="/uploads/main-1612194838.jpg"
              alt="Spaces Menlyn Maine office building in Pretoria East"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center"
            />
          </div>
        </motion.div>
      </div>

      <div className="mx-auto grid w-full max-w-[90rem] grid-cols-3 border-t border-[#d6a75e]/28">
        {credentials.map((credential, index) => (
          <div
            key={credential}
            className={`flex min-h-20 items-center justify-center px-3 text-center text-base tracking-[0.04em] text-white/80 sm:min-h-24 sm:text-xl ${index > 0 ? 'border-l border-[#d6a75e]/28' : ''}`}
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {credential}
          </div>
        ))}
      </div>
    </section>
  );
}
