'use client'

import { useCallback, useEffect, useMemo, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { company } from '@/data/company'

const PRIMARY_NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
] as const

const MOBILE_NAV_LINKS = [
  ...PRIMARY_NAV_LINKS,
  { label: 'Process', href: '#process' },
  { label: 'Results', href: '#case-results' },
  { label: 'FAQ', href: '#faq' },
] as const

const NAV_OFFSET = 92

function scrollToHash(href: string) {
  const target = document.getElementById(href.replace('#', ''))
  if (!target) return

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="group flex min-w-0 items-center gap-3">
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gold/30 bg-[linear-gradient(145deg,rgba(244,215,155,0.22),rgba(255,255,255,0.045))] shadow-[0_16px_48px_rgba(214,165,96,0.16)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.24),transparent_36%)]" />
        <Scale className="relative h-5 w-5 text-gold" />
      </div>

      <div className="flex min-w-0 flex-col">
        <span
          className={`font-serif-optical font-semibold leading-none text-white transition-colors duration-300 group-hover:text-gold-light ${
            compact
              ? 'text-[1rem] tracking-[0.12em]'
              : 'text-[0.98rem] tracking-[0.14em] sm:text-[1.16rem] sm:tracking-[0.19em]'
          }`}
        >
          MARLENE BRITS
        </span>
        <span className="mt-1.5 flex items-center gap-2 text-[7px] font-semibold uppercase tracking-[0.28em] text-gold/78 sm:text-[8px] sm:tracking-[0.36em]">
          <span className="h-px w-7 bg-gradient-to-r from-gold to-transparent" />
          Attorneys
        </span>
      </div>
    </div>
  )
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  const cleanPhone = useMemo(() => company.contact.phone.replace(/\s/g, ''), [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = Array.from(new Set(MOBILE_NAV_LINKS.map((link) => link.href.slice(1))))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-34% 0px -60% 0px', threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleNavClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault()
      scrollToHash(href)
      if (mobileOpen) setMobileOpen(false)
    },
    [mobileOpen]
  )

  return (
    <>
      <motion.header
        data-nav-menu
        className={`fixed left-0 right-0 top-0 px-3 pt-3 sm:px-4 ${mobileOpen ? 'z-[90]' : 'z-50'}`}
        initial={{ y: -96, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`mx-auto max-w-7xl rounded-[1.45rem] border transition-all duration-500 ${
            mobileOpen
              ? 'border-gold/36 bg-[#050814]/94 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
              : isScrolled
                ? 'border-gold/24 bg-[#050814]/86 shadow-[0_22px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl'
                : 'border-white/12 bg-[#050814]/58 shadow-[0_14px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl'
          }`}
        >
          <div className="relative flex h-[72px] items-center justify-between gap-4 overflow-hidden rounded-[1.45rem] px-4 sm:px-5 lg:px-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <div className="absolute -left-16 top-0 h-28 w-28 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/[0.035] blur-2xl" />

            <a href="#home" onClick={(event) => handleNavClick(event, '#home')} className="relative z-10 min-w-0">
              <BrandMark />
            </a>

            <nav className="hidden items-center rounded-full border border-white/10 bg-white/[0.045] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl lg:flex">
              {PRIMARY_NAV_LINKS.map((link) => {
                const id = link.href.slice(1)
                const isActive = activeSection === id
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className={`relative rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 xl:px-5 ${
                      isActive ? 'text-[#071020]' : 'text-white/66 hover:text-gold'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="desktop-nav-pill"
                        className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#f4d79b,#c58a44)] shadow-[0_12px_35px_rgba(214,165,96,0.24)]"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                )
              })}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <a
                href={`tel:${cleanPhone}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/24 bg-gold/10 text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-[#071020] hover:shadow-[0_18px_48px_rgba(214,165,96,0.26)]"
                aria-label="Call Marlene Brits Attorneys"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                onClick={(event) => handleNavClick(event, '#contact')}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071020] shadow-[0_18px_48px_rgba(214,165,96,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(214,165,96,0.34)] xl:px-6"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Consultation</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="relative z-[100] flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/28 bg-[#071020]/84 text-white shadow-[0_14px_35px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-gold/50 hover:text-gold lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0, scale: 0.85 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 45, opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0, scale: 0.85 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -45, opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
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
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-[#050814] px-5 pb-8 pt-28 text-white"
          >
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="fixed right-5 top-5 z-[95] flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/34 bg-[#071020]/90 text-gold shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(214,165,96,0.2),transparent_24rem),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_22rem),linear-gradient(135deg,#050814,#0d1425_55%,#050814)]" />
            <div className="absolute inset-0 opacity-[0.11] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:52px_52px]" />

            <div className="relative z-10 mx-auto flex min-h-full max-w-lg flex-col">
              <div className="rounded-[1.75rem] border border-gold/20 bg-white/[0.055] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
                <BrandMark compact />
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-gold" />
                  <p className="text-sm leading-6 text-white/66">Attorney, conveyancer and notary in Pretoria East.</p>
                </div>
              </div>

              <nav className="mt-6 grid gap-3">
                {MOBILE_NAV_LINKS.map((link, index) => {
                  const isActive = activeSection === link.href.slice(1)
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      custom={index}
                      initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                      transition={{ delay: 0.04 * index + 0.08, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      onClick={(event) => handleNavClick(event, link.href)}
                      className={`group flex items-center justify-between rounded-[1.25rem] border px-5 py-4 transition-all duration-300 ${
                        isActive
                          ? 'border-gold/38 bg-gold text-[#071020] shadow-[0_18px_50px_rgba(214,165,96,0.22)]'
                          : 'border-white/10 bg-white/[0.055] text-white/72 hover:border-gold/25 hover:text-gold'
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span className={`text-[10px] font-semibold tracking-[0.2em] ${isActive ? 'text-[#071020]/55' : 'text-gold/50'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="font-serif-optical text-2xl font-semibold tracking-[-0.04em]">{link.label}</span>
                      </span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.a>
                  )
                })}
              </nav>

              <div className="mt-auto pt-6">
                <a
                  href="#contact"
                  onClick={(event) => handleNavClick(event, '#contact')}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#071020] shadow-[0_20px_60px_rgba(214,165,96,0.28)]"
                >
                  <Calendar className="h-4 w-4" />
                  Book Consultation
                </a>
                <a href={`tel:${cleanPhone}`} className="mt-4 flex items-center justify-center gap-2 text-sm text-white/52">
                  <Phone className="h-4 w-4 text-gold" />
                  {company.contact.phone}
                </a>
              </div>
            </div>

            <Sparkles className="pointer-events-none absolute bottom-8 right-8 h-20 w-20 text-gold/[0.06]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
