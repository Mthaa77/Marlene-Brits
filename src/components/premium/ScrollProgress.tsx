'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  // Smooth the progress value with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      {/* Gold progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[45] h-[2px] origin-left progress-bar-glow"
        style={{
          scaleX: smoothProgress,
          background:
            'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))',
        }}
      />
      {/* Soft glow trail behind the progress bar */}
      <motion.div
        className="fixed top-0 left-0 z-[44] h-[6px] origin-left opacity-40"
        style={{
          scaleX: smoothProgress,
          background:
            'linear-gradient(90deg, transparent, rgba(184,137,86,0.3), rgba(184,137,86,0.15))',
          filter: 'blur(3px)',
        }}
      />
    </>
  )
}
