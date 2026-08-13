'use client'

import { useEffect } from 'react'

const PREMIUM_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const ambientTargets = '[data-scroll-ambient]'

function hasMotionStyles(element: HTMLElement) {
  const style = element.getAttribute('style') ?? ''
  return /(?:opacity|transform|translate|filter)/.test(style)
}

export default function ScrollMotionSystem() {
  useEffect(() => {
    const root = document.documentElement
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    root.dataset.motionOrchestrated = 'true'

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      root.dataset.motionReduced = 'true'
      return () => {
        delete root.dataset.motionOrchestrated
        delete root.dataset.motionReduced
      }
    }

    const runningAnimations: Animation[] = []
    let ticking = false
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('main > section:not(#home)')
    )
    const details = Array.from(
      document.querySelectorAll<HTMLElement>(
        'main h2, main article, main [data-scroll-detail]'
      )
    ).filter((element) => !hasMotionStyles(element))
    const ambient = Array.from(document.querySelectorAll<HTMLElement>(ambientTargets))

    const updateAmbient = () => {
      ticking = false
      const viewport = window.innerHeight || 1
      ambient.forEach((element, index) => {
        const rect = element.getBoundingClientRect()
        if (rect.bottom < -120 || rect.top > viewport + 120) return
        const centre = rect.top + rect.height / 2
        const distance = Math.max(-1, Math.min(1, (centre - viewport / 2) / (viewport / 2)))
        const amplitude = Number(element.dataset.scrollAmbient ?? 10)
        const offset = distance * amplitude + (index % 2 ? amplitude * 0.16 : 0)
        element.style.setProperty('--motion-y', `${offset.toFixed(2)}px`)
      })
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateAmbient)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateAmbient()

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const section = entry.target as HTMLElement
          section.dataset.motionVisible = 'true'

          const animation = section.animate(
            [
              {
                opacity: 0.84,
                translate: '0 24px',
                filter: 'saturate(0.88) brightness(0.98)',
              },
              {
                opacity: 1,
                translate: '0 0',
                filter: 'saturate(1) brightness(1)',
              },
            ],
            {
              duration: window.innerWidth < 768 ? 620 : 820,
              easing: PREMIUM_EASE,
              fill: 'none',
            }
          )

          runningAnimations.push(animation)
          observer.unobserve(section)
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -8% 0px' }
    )

    const detailObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const element = entry.target as HTMLElement
          const isHeading = element.tagName === 'H2'
          const animation = element.animate(
            [
              {
                opacity: isHeading ? 0.18 : 0.45,
                translate: `0 ${isHeading ? 28 : 18}px`,
                filter: isHeading ? 'blur(7px)' : 'blur(2px)',
              },
              {
                opacity: 1,
                translate: '0 0',
                filter: 'blur(0px)',
              },
            ],
            {
              duration: isHeading ? 760 : 640,
              delay: Number(element.dataset.motionDelay ?? 0),
              easing: PREMIUM_EASE,
              fill: 'none',
            }
          )

          element.dataset.motionDetailVisible = 'true'
          runningAnimations.push(animation)
          observer.unobserve(element)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    )

    sections.forEach((section) => sectionObserver.observe(section))
    details.forEach((detail, index) => {
      detail.dataset.motionDelay = String(Math.min((index % 4) * 45, 135))
      detailObserver.observe(detail)
    })

    return () => {
      sectionObserver.disconnect()
      detailObserver.disconnect()
      runningAnimations.forEach((animation) => animation.cancel())
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      ambient.forEach((element) => element.style.removeProperty('--motion-y'))
      delete root.dataset.motionOrchestrated
      delete root.dataset.motionReduced
    }
  }, [])

  return null
}
