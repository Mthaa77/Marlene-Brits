'use client'

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'

// ── Check fine pointer outside of effects using useSyncExternalStore ──────
const finePointerMediaQuery = '(pointer: fine)'

function subscribeToMediaQuery(callback: () => void) {
  const mql = window.matchMedia(finePointerMediaQuery)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia(finePointerMediaQuery).matches
}

function getServerSnapshot() {
  return false
}

export default function PremiumCursor() {
  const hasFinePointer = useSyncExternalStore(
    subscribeToMediaQuery,
    getSnapshot,
    getServerSnapshot
  )
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // ── Motion values for cursor position ─────────────────────────────────────
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // ── Spring configs ────────────────────────────────────────────────────────
  const springConfig = {
    stiffness: 280,
    damping: 28,
    mass: 0.5,
  }

  const outerSpringConfig = {
    stiffness: 150,
    damping: 20,
    mass: 0.8,
  }

  // Inner dot follows precisely (snappy spring)
  const dotX = useSpring(cursorX, springConfig)
  const dotY = useSpring(cursorY, springConfig)

  // Outer ring follows with delay (softer spring)
  const ringX = useSpring(cursorX, outerSpringConfig)
  const ringY = useSpring(cursorY, outerSpringConfig)

  // ── Mouse event listeners ─────────────────────────────────────────────────
  useEffect(() => {
    if (!hasFinePointer) return

    // Update cursor position on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[data-cursor-hover]')

      if (isInteractive) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[data-cursor-hover]')

      if (isInteractive) {
        setIsHovering(false)
      }
    }

    // Click animation
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      cursorX.set(-100)
      cursorY.set(-100)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('mouseout', handleMouseOut, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasFinePointer, cursorX, cursorY])

  // ── Hide default cursor on body when custom cursor is active ──────────────
  useEffect(() => {
    if (!hasFinePointer) return

    const style = document.createElement('style')
    style.id = 'premium-cursor-style'
    style.textContent = `
      @media (pointer: fine) {
        * { cursor: none !important; }
      }
    `
    document.head.appendChild(style)

    return () => {
      const el = document.getElementById('premium-cursor-style')
      if (el) el.remove()
    }
  }, [hasFinePointer])

  // ── No-op callback for React key prop consistency ─────────────────────────
  const handleMouseEnter = useCallback(() => {
    // Intentionally empty — keeps component responsive
  }, [])

  if (!hasFinePointer) return null

  return (
    <AnimatePresence>
      {/* ── Outer ring ──────────────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: 40,
          height: 40,
          translateX: -20,
          translateY: -20,
          borderWidth: 1.5,
          borderStyle: 'solid',
          borderColor: isHovering ? 'var(--gold)' : 'rgba(184, 137, 86, 0.5)',
          backgroundColor: isHovering
            ? 'rgba(184, 137, 86, 0.08)'
            : 'transparent',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isHovering ? 1 : 0.6,
        }}
        transition={{
          scale: { duration: 0.15, ease: 'easeOut' },
          opacity: { duration: 0.2 },
        }}
        onMouseEnter={handleMouseEnter}
      />

      {/* ── Inner dot ───────────────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          translateX: -4,
          translateY: -4,
          backgroundColor: 'var(--gold)',
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0.8 : 1,
        }}
        transition={{
          scale: { duration: 0.1, ease: 'easeOut' },
        }}
      />
    </AnimatePresence>
  )
}
