'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Menu, X, Phone, Scale, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Team', href: '#team' },
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#results' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
] as const

// ── Stagger animation variants ──────────────────────────────────────────────
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.06 * i + 0.2,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: -15,
    rotateX: 10,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

const mobileCtaVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
}

// ── Nav link hover indicator variants ───────────────────────────────────────
const indicatorVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { scaleX: 0, opacity: 0, transition: { duration: 0.2 } },
}

// ── Component ───────────────────────────────────────────────────────────────
export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  // ── Mouse position for 3D tilt effect on logo ────────────────────────────
  const logoMouseX = useMotionValue(0)
  const logoMouseY = useMotionValue(0)
  const logoRotateY = useSpring(useTransform(logoMouseX, [-50, 50], [5, -5]), { stiffness: 200, damping: 25 })
  const logoRotateX = useSpring(useTransform(logoMouseY, [-50, 50], [-5, 5]), { stiffness: 200, damping: 25 })

  // ── Track scroll position ─────────────────────────────────────────────────
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 30)
  })

  // ── Intersection Observer for active section ──────────────────────────────
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // ── Lock body scroll when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // ── Smooth scroll handler ─────────────────────────────────────────────────
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (mobileOpen) setMobileOpen(false)
    },
    [mobileOpen]
  )

  // ── Logo mouse handler for 3D tilt ────────────────────────────────────────
  const handleLogoMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    logoMouseX.set(e.clientX - centerX)
    logoMouseY.set(e.clientY - centerY)
  }, [logoMouseX, logoMouseY])

  const handleLogoMouseLeave = useCallback(() => {
    logoMouseX.set(0)
    logoMouseY.set(0)
  }, [logoMouseX, logoMouseY])

  return (
    <>
      {/* ── Desktop & Mobile Header ──────────────────────────────────────── */}
      <motion.header
        data-nav-menu
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'nav-glass-3d py-0'
            : 'bg-transparent py-1'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top gold accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--gold) 70%, transparent 100%)',
          }}
          initial={{ scaleX: 0, opacity: 0.6 }}
          animate={{ scaleX: isScrolled ? 1 : 0, opacity: isScrolled ? 0.6 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* ── Logo with 3D tilt ──────────────────────────────────────────── */}
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="logo-3d-hover group relative flex flex-col items-start gap-1.5"
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
            style={{ rotateY: logoRotateY, rotateX: logoRotateX }}
          >
            {/* Logo text with refined typography */}
            <span
              className="font-serif-optical text-[1.3rem] tracking-[0.22em] font-medium text-white transition-colors duration-500"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              MARLENE BRITS
            </span>
            {/* Gold separator line with animation */}
            <motion.div
              className="h-[1.5px] w-10 bg-gradient-to-r from-gold to-gold-light"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />
            {/* Subtitle with refined tracking */}
            <span className="text-[9px] tracking-[0.4em] font-extralight uppercase text-gold transition-colors duration-500">
              ATTORNEYS
            </span>

            {/* Logo hover glow */}
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(184,137,86,0.06) 0%, transparent 70%)',
                }}
              />
            </div>
          </motion.a>

          {/* ── Desktop Navigation Links ─────────────────────────────────── */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              const isHovered = hoveredLink === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`nav-link-3d group relative px-4 py-2 text-[12px] tracking-[0.18em] uppercase font-extralight transition-all duration-400 ${
                    isActive ? 'text-gold' : 'text-white/80 hover:text-gold'
                  }`}
                >
                  {/* Link text */}
                  <span className="relative z-10">{link.label}</span>

                  {/* Active indicator with glow */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.span
                        className="absolute bottom-0 left-3 right-3 h-[2px]"
                        variants={indicatorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                          background: isActive
                            ? 'linear-gradient(90deg, transparent, var(--gold), transparent)'
                            : 'linear-gradient(90deg, transparent, rgba(184,137,86,0.5), transparent)',
                          boxShadow: isActive
                            ? '0 0 8px rgba(184,137,86,0.4), 0 0 20px rgba(184,137,86,0.15)'
                            : '0 0 6px rgba(184,137,86,0.2)',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Subtle background on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-sm -z-[1]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(184,137,86,0.05) 0%, transparent 70%)',
                    }}
                  />
                </a>
              )
            })}
          </div>

          {/* ── Desktop CTA with 3D hover ───────────────────────────────── */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="group relative overflow-hidden rounded-sm bg-gold px-7 py-[11px] text-[11px] tracking-[0.18em] uppercase font-medium text-charcoal-dark hover:bg-gold-light transition-all duration-400 hover:shadow-[0_0_30px_rgba(184,137,86,0.3)] hover:scale-[1.04]"
            >
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
                <span className="relative z-10 flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="font-serif-body">Book Consultation</span>
                </span>
                {/* Shimmer effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {/* Bottom glow line */}
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </a>
            </Button>
          </div>

          {/* ── Mobile Menu Toggle ───────────────────────────────────────── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden relative z-[60] p-2 transition-colors duration-300 ${mobileOpen ? 'text-gold' : 'text-white'}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Nav bottom border - animated gold line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 5%, rgba(184,137,86,0.12) 30%, rgba(184,137,86,0.12) 70%, transparent 95%)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: isScrolled ? 1 : 0,
            opacity: isScrolled ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.header>

      {/* ── Mobile Full-Screen Overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: 'rgba(10, 10, 22, 0.97)' }}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Radial gradient */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(184,137,86,0.04) 0%, transparent 60%)',
                }}
              />
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(184,137,86,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,137,86,0.5) 1px, transparent 1px)',
                  backgroundSize: '60px 60px',
                }}
              />
            </div>

            {/* Decorative gold line - top */}
            <motion.div
              className="absolute top-28 left-1/2 h-16 w-[1px]"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(184,137,86,0.3), transparent)' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Scale icon at top of line */}
            <motion.div
              className="absolute top-24 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Scale className="w-5 h-5 text-gold" />
            </motion.div>

            {/* Mobile Nav Links with 3D perspective */}
            <nav
              className="flex flex-col items-center gap-5"
              style={{ perspective: '800px' }}
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`group relative text-3xl tracking-[0.2em] uppercase font-extralight transition-all duration-300 ${
                      isActive
                        ? 'text-gold'
                        : 'text-white/60 hover:text-gold'
                    }`}
                    style={{
                      fontFamily: isActive ? 'var(--font-playfair)' : 'var(--font-cormorant)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Link number */}
                    <span className="absolute -left-10 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.3em] text-gold/20 font-sans">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {link.label}

                    {/* Active indicator */}
                    {isActive && (
                      <motion.span
                        className="mt-1 block h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
                        layoutId="mobile-active-indicator"
                        transition={{ duration: 0.3 }}
                        style={{ boxShadow: '0 0 10px rgba(184,137,86,0.3)' }}
                      />
                    )}

                    {/* Hover arrow */}
                    <ChevronRight className="absolute -right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/0 group-hover:text-gold/50 transition-all duration-300 group-hover:translate-x-1" />
                  </motion.a>
                )
              })}
            </nav>

            {/* Decorative gold line - bottom */}
            <motion.div
              className="my-6 h-12 w-[1px]"
              style={{ background: 'linear-gradient(to bottom, rgba(184,137,86,0.3), transparent)' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Mobile CTA */}
            <motion.div variants={mobileCtaVariants} initial="hidden" animate="visible" exit="exit">
              <Button
                asChild
                className="group relative overflow-hidden rounded-sm bg-gold px-12 py-4 text-[12px] tracking-[0.2em] uppercase font-medium text-charcoal-dark hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(184,137,86,0.3)]"
              >
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
                  <span className="relative z-10 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-serif-body">Book Consultation</span>
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>
              </Button>
            </motion.div>

            {/* Contact info in mobile menu */}
            <motion.div
              className="mt-8 flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/25 font-cormorant">
                +27 76 611 6965
              </p>
              <p className="text-[9px] tracking-[0.2em] uppercase text-white/15 font-cormorant">
                info@mbritslaw.co.za
              </p>
            </motion.div>

            {/* Bottom decorative line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(184,137,86,0.1) 30%, rgba(184,137,86,0.1) 70%, transparent)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
