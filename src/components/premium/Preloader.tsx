'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

const FIRM_NAME = 'MARLENE BRITS ATTORNEYS'

/* ─── Seeded PRNG for particle burst ──────────────────────────── */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* ─── Particle Burst Effect with 3D ───────────────────────────── */
function ParticleBurst({ active }: { active: boolean }) {
  const rand = mulberry32(99)
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    angle: rand() * 360,
    distance: rand() * 100 + 30,
    size: rand() * 4 + 1,
    duration: rand() * 1 + 0.5,
    delay: rand() * 0.3,
    rotateX: rand() * 40 - 20,
    rotateY: rand() * 40 - 20,
  }))

  if (!active) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: '800px' }}>
      {particles.map((p) => {
        const radians = (p.angle * Math.PI) / 180
        const x = Math.cos(radians) * p.distance
        const y = Math.sin(radians) * p.distance
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold"
            style={{
              width: p.size,
              height: p.size,
              boxShadow: '0 0 6px rgba(184,137,86,0.5)',
            }}
            initial={{ opacity: 0.9, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
            animate={{ opacity: 0, x, y, scale: 0.3, rotateX: p.rotateX, rotateY: p.rotateY }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </div>
  )
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isExiting, setIsExiting] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [progress, setProgress] = useState(0)
  const [mountTime] = useState(() => Date.now())
  const [showBurst, setShowBurst] = useState(false)

  // ── Typing animation ──────────────────────────────────────────────────────
  useEffect(() => {
    let charIndex = 0
    const typeInterval = setInterval(() => {
      if (charIndex < FIRM_NAME.length) {
        setTypedText(FIRM_NAME.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
      }
    }, 40)

    return () => clearInterval(typeInterval)
  }, [])

  // ── Progress bar animation ────────────────────────────────────────────────
  useEffect(() => {
    const duration = 1800

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - mountTime
      const raw = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - raw, 3)
      setProgress(eased * 100)

      if (raw >= 1) {
        clearInterval(progressInterval)
      }
    }, 16)

    return () => clearInterval(progressInterval)
  }, [mountTime])

  // ── Trigger burst then exit ───────────────────────────────────────────────
  useEffect(() => {
    const burstTimer = setTimeout(() => {
      setShowBurst(true)
    }, 1600)

    const exitTimer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        onComplete()
      }, 700)
    }, 2000)

    return () => {
      clearTimeout(burstTimer)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none"
          style={{ backgroundColor: '#0a0a16', perspective: '1200px' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, rotateX: 2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Film grain overlay ──────────────────────────────────── */}
          <div className="film-grain absolute inset-0 z-[1]" />

          {/* ── Cinematic vignette ──────────────────────────────────── */}
          <div className="absolute inset-0 z-[1]" style={{ boxShadow: 'inset 0 0 180px rgba(0,0,0,0.8)' }} />

          {/* ── Ambient gradient orbs ────────────────────────────────── */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(184,137,86,0.07) 0%, transparent 65%)',
            }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ── 3D Rotating geometric frame ────────────────────────────── */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotateZ: 360 }}
            transition={{
              opacity: { duration: 0.5, delay: 0.3 },
              rotateZ: { duration: 60, repeat: Infinity, ease: 'linear' },
            }}
          >
            <div
              className="absolute inset-0 border border-gold/[0.06] rounded-sm"
              style={{ transform: 'rotate(45deg)' }}
            />
          </motion.div>

          {/* ── Second geometric frame counter-rotating ────────────── */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotateZ: -360 }}
            transition={{
              opacity: { duration: 0.5, delay: 0.5 },
              rotateZ: { duration: 45, repeat: Infinity, ease: 'linear' },
            }}
          >
            <div
              className="absolute inset-0 border border-gold/[0.04]"
            />
          </motion.div>

          {/* ── MB Monogram with cinematic 3D scale-in ─────────────────── */}
          <motion.div
            className="relative flex items-center justify-center z-10"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, scale: 0.3, rotateX: 20, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Particle burst effect */}
            <ParticleBurst active={showBurst} />

            {/* Outer glow ring - pulsing */}
            <motion.div
              className="absolute h-44 w-44 rounded-full md:h-52 md:w-52"
              style={{ border: '1px solid rgba(184, 137, 86, 0.06)' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.8, opacity: [0, 0.4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />

            {/* Second glow ring - delayed */}
            <motion.div
              className="absolute h-44 w-44 rounded-full md:h-52 md:w-52"
              style={{ border: '1px solid rgba(184, 137, 86, 0.04)' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2.2, opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 0.8 }}
            />

            {/* Gold border ring */}
            <motion.div
              className="absolute h-32 w-32 rounded-full md:h-40 md:w-40"
              style={{
                border: '2px solid var(--gold)',
                boxShadow: '0 0 30px rgba(184,137,86,0.15), inset 0 0 15px rgba(184,137,86,0.05)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Subtle outer glow ring */}
            <motion.div
              className="absolute h-36 w-36 rounded-full md:h-44 md:w-44"
              style={{ border: '1px solid rgba(184, 137, 86, 0.12)' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Inner filled circle with radial gradient */}
            <motion.div
              className="absolute h-28 w-28 rounded-full md:h-36 md:w-36"
              style={{
                background: 'radial-gradient(circle, rgba(184,137,86,0.06) 0%, rgba(184,137,86,0.02) 50%, transparent 70%)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* MB Letters */}
            <motion.span
              className="relative z-10 font-serif-optical text-4xl md:text-5xl lg:text-6xl font-medium tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)' }}
              initial={{ opacity: 0, y: 15, letterSpacing: '0.5em', rotateX: 30 }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.2em', rotateX: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              MB
            </motion.span>
          </motion.div>

          {/* ── Firm name typing ─────────────────────────────────── */}
          <motion.div
            className="mt-10 h-6 overflow-hidden z-10"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p
              className="text-[10px] md:text-xs tracking-ultra uppercase font-extralight font-cormorant"
              style={{ color: 'rgba(255, 255, 255, 0.5)' }}
            >
              {typedText}
              <motion.span
                className="inline-block ml-[2px] w-[1px] bg-gold/50"
                style={{ height: '0.9em' }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              />
            </p>
          </motion.div>

          {/* ── Gold progress line ────────────────────────────────── */}
          <motion.div
            className="mt-8 h-[1px] w-44 md:w-60 overflow-hidden rounded-full z-10"
            style={{ backgroundColor: 'rgba(184, 137, 86, 0.08)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <motion.div
              className="h-full rounded-full progress-bar-glow"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                boxShadow: '0 0 15px rgba(184, 137, 86, 0.4)',
              }}
            />
          </motion.div>

          {/* ── Progress percentage ────────────────────────────────── */}
          <motion.p
            className="mt-3 text-[9px] tracking-[0.3em] uppercase text-gold/25 z-10 font-cormorant tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.floor(progress)}%
          </motion.p>

          {/* ── Subtle bottom gold line ─────────────────────────────── */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px] z-10"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(184, 137, 86, 0.12) 30%, rgba(184, 137, 86, 0.12) 70%, transparent)',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ── Corner decorative L shapes ───────────────────────────── */}
          <motion.div
            className="absolute top-6 left-6 w-8 h-8 border-t border-l border-gold/10 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
          <motion.div
            className="absolute top-6 right-6 w-8 h-8 border-t border-r border-gold/10 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-gold/10 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-gold/10 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
