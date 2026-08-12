'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { company } from '@/data/company';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
] as const;

function scrollToHash(href: string) {
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function Wordmark() {
  return (
    <span className="flex min-w-0 flex-col">
      <span className="truncate font-serif-optical text-[1.02rem] font-semibold leading-none tracking-[0.16em] text-[#fffaf0] sm:text-[1.18rem] sm:tracking-[0.21em]">
        MARLENE BRITS
      </span>
      <span className="mt-1.5 text-[7px] font-semibold uppercase tracking-[0.45em] text-[#d6a75e] sm:text-[8px]">
        Attorneys
      </span>
    </span>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    scrollToHash(href);
    setMobileOpen(false);
  }, []);

  const cleanPhone = company.contact.phone.replace(/\s/g, '');

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={`mx-auto flex h-[74px] max-w-[90rem] items-center justify-between gap-5 rounded-[1.45rem] border px-4 transition-all duration-300 sm:px-6 ${
            isScrolled || mobileOpen
              ? 'border-[#d6a75e]/30 bg-[#07101d]/94 shadow-[0_18px_58px_rgba(0,0,0,0.34)] backdrop-blur-2xl'
              : 'border-white/16 bg-[#07101d]/78 shadow-[0_14px_42px_rgba(0,0,0,0.18)] backdrop-blur-xl'
          }`}
        >
          <a href="#home" onClick={(event) => handleClick(event, '#home')} className="min-w-0 shrink">
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleClick(event, link.href)}
                className="text-sm font-medium text-white/68 transition-colors hover:text-[#e3b96f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a75e]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${cleanPhone}`}
              aria-label={`Call ${company.name}`}
              className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/12 text-[#d6a75e] transition-colors hover:border-[#d6a75e]/50 hover:bg-[#d6a75e]/10 sm:flex lg:hidden xl:flex"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              onClick={(event) => handleClick(event, '#contact')}
              className="hidden min-h-11 items-center justify-center rounded-xl bg-[#d6a75e] px-5 text-sm font-semibold text-[#07101d] shadow-[0_14px_38px_rgba(201,154,82,0.2)] transition-colors hover:bg-[#e3b96f] sm:inline-flex"
            >
              Book a consultation
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#d6a75e]/28 text-white transition-colors hover:bg-white/5 lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#07101d]/98 px-4 pb-8 pt-28 text-white backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.28 }}
              className="mx-auto flex max-w-lg flex-col border-t border-[#d6a75e]/28"
              aria-label="Mobile navigation"
            >
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleClick(event, link.href)}
                  className="flex items-center justify-between border-b border-white/10 py-5 font-serif-optical text-3xl text-[#fffaf0]"
                >
                  {link.label}
                  <span className="font-sans text-xs tracking-[0.2em] text-[#d6a75e]">0{index + 1}</span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={(event) => handleClick(event, '#contact')}
                className="mt-7 flex min-h-14 items-center justify-center rounded-xl bg-[#d6a75e] px-6 text-sm font-semibold text-[#07101d]"
              >
                Book a consultation
              </a>
              <a href={`tel:${cleanPhone}`} className="mt-6 text-center text-sm text-white/58">
                {company.contact.phone}
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
