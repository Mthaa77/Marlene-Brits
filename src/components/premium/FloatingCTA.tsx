'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Calendar } from 'lucide-react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8
      setVisible(window.scrollY > threshold)
    }

    // Check initial position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, y: 30, scale: 0.8, rotateX: 10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3 md:flex-col"
          style={{ perspective: '600px' }}
        >
          {/* ── Phone Button (circular with 3D) ──────────────────────────────── */}
          <motion.a
            href="tel:+27766116965"
            className="hidden md:flex h-12 w-12 items-center justify-center rounded-full border glass-card-3d"
            style={{
              borderColor: 'rgba(184,137,86,0.4)',
              backgroundColor: 'rgba(26,26,46,0.8)',
            }}
            whileHover={{
              scale: 1.15,
              boxShadow: '0 0 30px rgba(184,137,86,0.3)',
              rotateY: -5,
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Call us"
          >
            <Phone className="h-5 w-5" style={{ color: 'var(--gold)' }} />
          </motion.a>

          {/* ── Book Consultation Pill Button with 3D ────────────────────────── */}
          <motion.a
            href="#contact"
            className="group relative flex items-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] breathing-glow"
            style={{
              backgroundColor: 'var(--gold)',
              color: '#0a0a16',
            }}
            whileHover={{
              scale: 1.06,
              boxShadow: '0 0 40px rgba(184,137,86,0.4), 0 8px 24px rgba(0,0,0,0.2)',
            }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            // Subtle floating animation
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span className="font-serif-body">Book Consultation</span>
            {/* Shimmer effect */}
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
