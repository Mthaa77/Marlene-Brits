'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MessageCircle, Phone, Sparkles } from 'lucide-react'
import { company } from '@/data/company'

function scrollToContact() {
  const el = document.getElementById('contact')
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY - 92
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const frameRef = useRef<number | null>(null)
  const visibleRef = useRef(false)

  const cleanPhone = useMemo(() => company.contact.phone.replace(/\s/g, ''), [])
  const internationalPhone = useMemo(() => {
    const digits = cleanPhone.replace(/\D/g, '')
    return digits.startsWith('0') ? `27${digits.slice(1)}` : digits
  }, [cleanPhone])

  const whatsappMessage = encodeURIComponent(
    'Hello Marlene Brits Attorneys, I would like to enquire about a legal consultation.'
  )

  useEffect(() => {
    const updateVisibility = () => {
      frameRef.current = null
      const threshold = window.innerHeight * 0.55
      const contact = document.getElementById('contact')
      const beforeContact = !contact || contact.getBoundingClientRect().top > window.innerHeight * 0.35
      const nextVisible = window.scrollY > threshold && beforeContact

      if (visibleRef.current !== nextVisible) {
        visibleRef.current = nextVisible
        setVisible(nextVisible)
      }
    }

    const handleScroll = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(updateVisibility)
    }

    updateVisibility()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.94 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
          style={{ perspective: '700px' }}
        >
          <div className="relative rounded-[1.75rem] border border-gold/24 bg-[#050814]/82 p-2 shadow-[0_20px_62px_rgba(0,0,0,0.3)] ring-1 ring-white/10 backdrop-blur-xl">
            <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gold/10 blur-2xl" />
            <div className="relative flex flex-col gap-2">
              <motion.a
                href={`https://wa.me/${internationalPhone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-2xl border border-emerald-300/24 bg-[linear-gradient(145deg,rgba(16,185,129,0.95),rgba(6,95,70,0.92))] text-white shadow-[0_16px_42px_rgba(16,185,129,0.22)] sm:h-14 sm:w-14"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="WhatsApp Marlene Brits Attorneys"
              >
                <MessageCircle className="relative z-10 h-5 w-5 sm:h-6 sm:w-6" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/28 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </motion.a>

              <motion.a
                href={`tel:+${internationalPhone}`}
                className="group relative flex h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-2xl border border-gold/28 bg-[linear-gradient(145deg,rgba(214,165,96,0.98),rgba(143,94,45,0.96))] text-[#071020] shadow-[0_16px_42px_rgba(214,165,96,0.23)] sm:h-14 sm:w-14"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Call Marlene Brits Attorneys"
              >
                <Phone className="relative z-10 h-5 w-5 sm:h-6 sm:w-6" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/32 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </motion.a>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={scrollToContact}
            className="group relative hidden items-center gap-2 overflow-hidden rounded-full border border-gold/26 bg-[#050814]/82 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold shadow-[0_18px_52px_rgba(0,0,0,0.26)] ring-1 ring-white/10 backdrop-blur-xl transition-colors hover:bg-gold hover:text-[#071020] sm:inline-flex"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Calendar className="h-3.5 w-3.5" />
            Consultation
            <Sparkles className="h-3.5 w-3.5 opacity-70" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/22 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
