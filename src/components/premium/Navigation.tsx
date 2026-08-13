'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Compass, FileCheck2, Menu, Phone, X } from 'lucide-react';
import BrandPlaque from '@/components/premium/BrandPlaque';
import { company } from '@/data/company';

const links = [
  { label: 'Welcome', href: '#director-welcome' },
  { label: 'Legal help', href: '#pathfinder' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Why us', href: '#why-choose-us' },
  { label: 'Approach', href: '#approach' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
] as const;

const clientTools = [
  { label: 'Find the right legal service', copy: 'Two quick questions', href: '#pathfinder', icon: Compass },
  { label: 'Prepare for a consultation', copy: 'Build a useful checklist', href: '#consultation-builder', icon: FileCheck2 },
] as const;

const SECTION_IDS = Array.from(new Set(['home', ...links.map((link) => link.href.slice(1)), 'consultation-builder', 'contact']));
const NAV_OFFSET = 92;

function scrollToHash(href: string) {
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function Wordmark() {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d9af6b]/45 bg-[#d9af6b]/10 font-serif text-sm italic text-[#edcd94] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
        MB
        <span className="absolute inset-1 rounded-full border border-white/[0.06]" />
      </span>
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
  const [activeSection, setActiveSection] = useState('home');
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<number | null>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const syncScrolledState = () => {
      frameRef.current = null;
      const next = window.scrollY > 16;
      if (scrolledRef.current !== next) {
        scrolledRef.current = next;
        setIsScrolled(next);
      }
    };

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(syncScrolledState);
    };

    syncScrolledState();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection((current) => (current === visible.target.id ? current : visible.target.id));
        }
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.2, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setActiveSection(href.slice(1));
    scrollToHash(href);
    setMobileOpen(false);
  }, []);

  const phone = company.contact.phone.replace(/\s/g, '');

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div className={`mx-auto flex h-[68px] max-w-[88rem] items-center justify-between gap-3 rounded-[1.45rem] border px-3.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 sm:px-5 ${isScrolled || mobileOpen ? 'border-[#d9af6b]/38 bg-[#07111f]/96 shadow-[0_18px_54px_rgba(1,7,15,0.34)] backdrop-blur-xl' : 'border-white/15 bg-[#07111f]/86 shadow-[0_10px_30px_rgba(1,7,15,0.18)] backdrop-blur-md'}`}>
          <a href="#home" onClick={(event) => handleClick(event, '#home')} aria-label="Marlene Brits Attorneys home" className="min-w-0 shrink-0"><Wordmark /></a>

          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.035] p-1 xl:flex" aria-label="Primary navigation">
            {links.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a key={link.href} href={link.href} onClick={(event) => handleClick(event, link.href)} aria-current={isActive ? 'location' : undefined} className={`relative rounded-full px-3 py-2 text-[0.72rem] font-medium transition-[background-color,color,transform] duration-250 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9af6b] ${isActive ? 'bg-[#d9af6b]/14 text-[#f2d49d]' : 'text-white/58 hover:bg-white/[0.055] hover:text-white'}`}>
                  {link.label}
                  {isActive && !reduceMotion && <motion.span layoutId="nav-active" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#d9af6b]" transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }} />}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a href={`tel:${phone}`} aria-label={`Call ${company.name}`} className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/12 text-[#d9af6b] transition-[background-color,border-color,transform] duration-250 hover:-translate-y-0.5 hover:border-[#d9af6b]/50 hover:bg-[#d9af6b]/10 sm:flex"><Phone className="h-4 w-4" /></a>
            <a href="#contact" onClick={(event) => handleClick(event, '#contact')} className="hidden min-h-10 items-center gap-2 rounded-xl bg-[#d9af6b] px-4 text-[0.76rem] font-semibold text-[#07111f] shadow-[0_12px_28px_rgba(217,175,107,0.18)] transition-[background-color,box-shadow,transform] duration-250 hover:-translate-y-0.5 hover:bg-[#edcd94] md:inline-flex">Consultation <ArrowUpRight className="h-3.5 w-3.5" /></a>
            <button type="button" onClick={() => setMobileOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-xl border border-[#d9af6b]/30 text-white transition-[background-color,border-color,color] duration-250 hover:bg-white/5 xl:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-40 overflow-y-auto bg-[#07111f]/98 px-4 pb-8 pt-24 text-white backdrop-blur-xl xl:hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,rgba(217,175,107,0.15),transparent_20rem)]" />
            <motion.nav initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto max-w-2xl" aria-label="Mobile navigation">
              <BrandPlaque compact className="mb-5 max-h-44 w-full" />
              <div className="grid border-t border-[#d9af6b]/25 sm:grid-cols-2">
                {links.map((link, index) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <a key={link.href} href={link.href} onClick={(event) => handleClick(event, link.href)} className={`group flex items-center justify-between border-b border-white/10 py-4 font-serif text-[1.45rem] transition-[color,background-color] duration-250 sm:px-4 ${isActive ? 'text-[#edcd94]' : 'text-[#fffaf1] hover:text-[#edcd94]'}`}>
                      {link.label}
                      <span className="flex items-center gap-2 font-sans text-[9px] tracking-[0.18em] text-[#d9af6b]"><span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[#d9af6b]' : 'border border-[#d9af6b]/50'}`} />0{index + 1}</span>
                    </a>
                  );
                })}
              </div>

              <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d9af6b]">Useful client tools</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {clientTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <a key={tool.href} href={tool.href} onClick={(event) => handleClick(event, tool.href)} className="group flex items-center gap-4 rounded-[1.25rem_2.75rem_2.75rem_1.25rem] border border-white/10 bg-white/[0.045] p-4 transition-[background-color,border-color,transform] duration-250 hover:border-[#d9af6b]/32 hover:bg-white/[0.07]">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#d9af6b] text-[#07111f]"><Icon className="h-[1.125rem] w-[1.125rem]" /></span>
                      <span className="min-w-0"><span className="block text-sm font-semibold text-white">{tool.label}</span><span className="mt-1 block text-xs text-white/42">{tool.copy}</span></span>
                      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[#d9af6b] transition-transform duration-250 group-hover:translate-x-1" />
                    </a>
                  );
                })}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
                <a href="#contact" onClick={(event) => handleClick(event, '#contact')} className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#d9af6b] px-6 text-sm font-semibold text-[#07111f]">Book a consultation <ArrowUpRight className="h-4 w-4" /></a>
                <a href={`tel:${phone}`} className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/12 px-6 text-sm text-white/68"><Phone className="h-4 w-4 text-[#d9af6b]" />{company.contact.phone}</a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
