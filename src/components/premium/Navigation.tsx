'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { company } from '@/data/company';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our approach', href: '#approach' },
  { label: 'Team', href: '#team' },
] as const;

function scrollToHash(href: string) {
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function Wordmark() {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d9af6b]/45 bg-[#d9af6b]/10 font-serif text-sm italic text-[#edcd94]">MB</span>
      <span className="min-w-0">
        <span className="block truncate font-serif text-[0.98rem] font-semibold leading-none tracking-[0.14em] text-[#fffaf1] sm:text-[1.05rem]">MARLENE BRITS</span>
        <span className="mt-1 block text-[7px] font-semibold uppercase tracking-[0.42em] text-[#d9af6b]">Attorneys</span>
      </span>
    </span>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    scrollToHash(href);
    setMobileOpen(false);
  }, []);

  const phone = company.contact.phone.replace(/\s/g, '');

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div className={`mx-auto flex h-[66px] max-w-[88rem] items-center justify-between gap-4 rounded-[1.3rem] border px-3.5 transition-all duration-300 sm:px-5 ${isScrolled || mobileOpen ? 'border-[#d9af6b]/35 bg-[#07111f]/96 shadow-[0_18px_56px_rgba(1,7,15,0.32)] backdrop-blur-xl' : 'border-white/15 bg-[#07111f]/88 shadow-[0_12px_36px_rgba(1,7,15,0.2)] backdrop-blur-md'}`}>
          <a href="#home" onClick={(event) => handleClick(event, '#home')} aria-label="Marlene Brits Attorneys home" className="min-w-0"><Wordmark /></a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={(event) => handleClick(event, link.href)} className="text-[0.78rem] font-medium text-white/68 transition-colors hover:text-[#edcd94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9af6b]">{link.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={`tel:${phone}`} aria-label={`Call ${company.name}`} className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/12 text-[#d9af6b] transition hover:border-[#d9af6b]/50 hover:bg-[#d9af6b]/10 sm:flex"><Phone className="h-4 w-4" /></a>
            <a href="#contact" onClick={(event) => handleClick(event, '#contact')} className="hidden min-h-10 items-center gap-2 rounded-xl bg-[#d9af6b] px-4 text-[0.78rem] font-semibold text-[#07111f] shadow-[0_12px_28px_rgba(217,175,107,0.2)] transition hover:bg-[#edcd94] md:inline-flex">Consultation <ArrowUpRight className="h-3.5 w-3.5" /></a>
            <button type="button" onClick={() => setMobileOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-xl border border-[#d9af6b]/30 text-white transition hover:bg-white/5 lg:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 overflow-y-auto bg-[#07111f]/98 px-4 pb-8 pt-24 text-white backdrop-blur-xl lg:hidden">
            <motion.nav initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mx-auto max-w-lg border-t border-[#d9af6b]/25" aria-label="Mobile navigation">
              {links.map((link, index) => (
                <a key={link.href} href={link.href} onClick={(event) => handleClick(event, link.href)} className="flex items-center justify-between border-b border-white/10 py-5 font-serif text-2xl text-[#fffaf1]">{link.label}<span className="font-sans text-[10px] tracking-[0.2em] text-[#d9af6b]">0{index + 1}</span></a>
              ))}
              <a href="#contact" onClick={(event) => handleClick(event, '#contact')} className="mt-7 flex min-h-14 items-center justify-center rounded-xl bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f]">Book a consultation</a>
              <a href={`tel:${phone}`} className="mt-6 block text-center text-sm text-white/58">Call {company.contact.phone}</a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
