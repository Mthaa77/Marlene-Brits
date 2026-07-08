'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

const NAV_OFFSET = 88

function scrollToHash(hash: string, behavior: ScrollBehavior = 'smooth') {
  const id = hash.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior })
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number>(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches

    // Touch devices already have native kinetic scrolling. Running Lenis on mobile
    // can make the page feel heavy and can fight browser scroll anchoring.
    const shouldUseNativeScroll = prefersReducedMotion || coarsePointer || window.innerWidth < 1024

    let lenis: Lenis | null = null
    if (!shouldUseNativeScroll) {
      try {
        lenis = new Lenis({
          duration: 0.85,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.85,
          touchMultiplier: 1,
          infinite: false,
        })
        lenisRef.current = lenis
      } catch (e) {
        console.warn('Lenis smooth scroll initialization failed, falling back to native scroll:', e)
      }
    }

    function raf(time: number) {
      lenis?.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    if (lenis) {
      rafIdRef.current = requestAnimationFrame(raf)
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return

      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return

      const el = document.getElementById(hash.slice(1))
      if (!el) return

      e.preventDefault()

      if (lenis) {
        lenis.scrollTo(el, {
          offset: -NAV_OFFSET,
          duration: 0.9,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        scrollToHash(hash)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
