'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number>(0)

  useEffect(() => {
    // Wrap Lenis init in try-catch for safety
    let lenis: Lenis | null = null
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      })
      lenisRef.current = lenis
    } catch (e) {
      console.warn('Lenis smooth scroll initialization failed, falling back to native scroll:', e)
      return
    }

    function raf(time: number) {
      lenis?.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    // Handle anchor link clicks for smooth scrolling
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (anchor) {
        e.preventDefault()
        const id = anchor.getAttribute('href')!.slice(1)
        const el = document.getElementById(id)
        if (el && lenis) {
          lenis.scrollTo(el, {
            offset: -80,
            duration: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          })
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
