'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-24 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border glass-card-3d md:bottom-6 md:left-6"
          style={{
            borderColor: 'rgba(184,137,86,0.4)',
            backgroundColor: 'rgba(26,26,46,0.8)',
          }}
          whileHover={{
            scale: 1.15,
            boxShadow: '0 0 25px rgba(184,137,86,0.3)',
            rotateY: 5,
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
        >
          <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" style={{ color: 'var(--gold)' }} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
