'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ═══════════════════════════════════════════════════════════
   LAUREL WREATH SVG — Decorative element for hero & sections
   ═══════════════════════════════════════════════════════════ */
export function LaurelWreath({ className = '', size = 120, animate = false }: {
  className?: string;
  size?: number;
  animate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left laurel branch */}
        <motion.path
          d="M60 90 C50 75 25 65 15 50 C10 42 12 30 20 25 C25 22 30 25 28 32 C26 38 20 40 20 40 C20 40 28 35 35 30 C38 28 40 25 38 22 C36 19 32 18 30 22 M60 90 C48 78 28 72 18 58 C14 52 15 42 22 38 C26 36 30 38 28 44 C27 48 22 50 22 50 M60 90 C45 80 30 78 22 65 C18 60 20 52 26 50 C29 49 32 51 30 55 M60 90 C52 82 35 82 28 72 C25 68 26 62 30 60 C32 59 34 61 33 64"
          stroke="var(--gold)"
          strokeWidth="1.2"
          fill="none"
          initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animate && isInView ? { pathLength: 1, opacity: 0.6 } : undefined}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Right laurel branch (mirrored) */}
        <motion.path
          d="M60 90 C70 75 95 65 105 50 C110 42 108 30 100 25 C95 22 90 25 92 32 C94 38 100 40 100 40 C100 40 92 35 85 30 C82 28 80 25 82 22 C84 19 88 18 90 22 M60 90 C72 78 92 72 102 58 C106 52 105 42 98 38 C94 36 90 38 92 44 C93 48 98 50 98 50 M60 90 C75 80 90 78 98 65 C102 60 100 52 94 50 C91 49 88 51 90 55 M60 90 C68 82 85 82 92 72 C95 68 94 62 90 60 C88 59 86 61 87 64"
          stroke="var(--gold)"
          strokeWidth="1.2"
          fill="none"
          initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animate && isInView ? { pathLength: 1, opacity: 0.6 } : undefined}
          transition={{ duration: 2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Central star/emblem */}
        <motion.path
          d="M60 30 L63 38 L72 38 L65 43 L67 52 L60 47 L53 52 L55 43 L48 38 L57 38 Z"
          fill="var(--gold)"
          fillOpacity="0.15"
          stroke="var(--gold)"
          strokeWidth="0.8"
          initial={animate ? { scale: 0, opacity: 0 } : undefined}
          animate={animate && isInView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 1.8, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ART DECO FRAME SVG — Animated border for premium cards
   ═══════════════════════════════════════════════════════════ */
export function ArtDecoFrame({ className = '', animate = false }: {
  className?: string;
  animate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Outer frame */}
        <motion.rect
          x="4" y="4" width="392" height="292" rx="0"
          stroke="var(--gold)"
          strokeWidth="1"
          strokeOpacity="0.2"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate && isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={animate ? 'svg-border-animate' : ''}
          style={!animate ? { strokeDasharray: 'none' } : undefined}
        />
        {/* Inner frame */}
        <motion.rect
          x="12" y="12" width="376" height="276" rx="0"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.12"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate && isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 2.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={animate ? 'svg-border-animate' : ''}
          style={!animate ? { strokeDasharray: 'none' } : undefined}
        />
        {/* Corner ornaments */}
        {/* Top-left */}
        <motion.path d="M4 30 L4 4 L30 4" stroke="var(--gold)" strokeWidth="1.5" fill="none"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate && isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1.5 }}
          style={!animate ? { strokeDasharray: 'none' } : undefined}
        />
        {/* Top-right */}
        <motion.path d="M370 4 L396 4 L396 30" stroke="var(--gold)" strokeWidth="1.5" fill="none"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate && isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1.6 }}
          style={!animate ? { strokeDasharray: 'none' } : undefined}
        />
        {/* Bottom-left */}
        <motion.path d="M4 270 L4 296 L30 296" stroke="var(--gold)" strokeWidth="1.5" fill="none"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate && isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1.7 }}
          style={!animate ? { strokeDasharray: 'none' } : undefined}
        />
        {/* Bottom-right */}
        <motion.path d="M370 296 L396 296 L396 270" stroke="var(--gold)" strokeWidth="1.5" fill="none"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate && isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1.8 }}
          style={!animate ? { strokeDasharray: 'none' } : undefined}
        />
        {/* Small diamonds at corners */}
        <motion.path d="M8 8 L14 14 L8 20 L2 14 Z" fill="var(--gold)" fillOpacity="0.3"
          initial={animate ? { scale: 0 } : undefined}
          animate={animate && isInView ? { scale: 1 } : undefined}
          transition={{ duration: 0.4, delay: 2 }}
        />
        <motion.path d="M386 8 L392 14 L386 20 L380 14 Z" fill="var(--gold)" fillOpacity="0.3"
          initial={animate ? { scale: 0 } : undefined}
          animate={animate && isInView ? { scale: 1 } : undefined}
          transition={{ duration: 0.4, delay: 2.1 }}
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GEOMETRIC MANDALA SVG — Decorative pattern for dark sections
   ═══════════════════════════════════════════════════════════ */
export function GeometricMandala({ className = '', size = 200, opacity = 0.06 }: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        {/* Concentric circles */}
        <circle cx="100" cy="100" r="95" stroke="var(--gold)" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="75" stroke="var(--gold)" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="55" stroke="var(--gold)" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="35" stroke="var(--gold)" strokeWidth="0.5" />
        {/* Radial lines */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x2 = 100 + 95 * Math.cos(angle);
          const y2 = 100 + 95 * Math.sin(angle);
          return (
            <line
              key={i}
              x1="100" y1="100"
              x2={x2} y2={y2}
              stroke="var(--gold)"
              strokeWidth="0.3"
            />
          );
        })}
        {/* Diamond shapes at intersections */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = 100 + 75 * Math.cos(angle);
          const cy = 100 + 75 * Math.sin(angle);
          return (
            <path
              key={`diamond-${i}`}
              d={`M${cx} ${cy - 5} L${cx + 3.5} ${cy} L${cx} ${cy + 5} L${cx - 3.5} ${cy} Z`}
              fill="var(--gold)"
              fillOpacity="0.4"
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FLOATING ORB — Ambient glow background element
   ═══════════════════════════════════════════════════════════ */
export function FloatingOrb({ x, y, size = 300, opacity = 0.04, delay = 0 }: {
  x: string;
  y: string;
  size?: number;
  opacity?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(184,137,86,${opacity}) 0%, transparent 70%)`,
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, -15, 5, 0],
        scale: [1, 1.05, 0.95, 1.02, 1],
      }}
      transition={{
        duration: 15 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   DAMASK ORNAMENT SVG — Traditional legal decorative element
   ═══════════════════════════════════════════════════════════ */
export function DamaskOrnament({ className = '', width = 300 }: {
  className?: string;
  width?: number;
}) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg
        width={width}
        height={width * 0.3}
        viewBox="0 0 300 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central medallion */}
        <circle cx="150" cy="45" r="20" stroke="var(--gold)" strokeWidth="0.8" strokeOpacity="0.3" />
        <circle cx="150" cy="45" r="12" stroke="var(--gold)" strokeWidth="0.5" strokeOpacity="0.2" />
        <circle cx="150" cy="45" r="3" fill="var(--gold)" fillOpacity="0.25" />
        {/* Left scroll */}
        <path d="M150 45 C130 30 100 25 70 35 C50 40 30 35 10 40" stroke="var(--gold)" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
        <path d="M150 45 C130 60 100 65 70 55 C50 50 30 55 10 50" stroke="var(--gold)" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
        {/* Right scroll */}
        <path d="M150 45 C170 30 200 25 230 35 C250 40 270 35 290 40" stroke="var(--gold)" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
        <path d="M150 45 C170 60 200 65 230 55 C250 50 270 55 290 50" stroke="var(--gold)" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
        {/* Small accent dots */}
        <circle cx="70" cy="45" r="2" fill="var(--gold)" fillOpacity="0.2" />
        <circle cx="230" cy="45" r="2" fill="var(--gold)" fillOpacity="0.2" />
        <circle cx="30" cy="42" r="1.5" fill="var(--gold)" fillOpacity="0.15" />
        <circle cx="270" cy="42" r="1.5" fill="var(--gold)" fillOpacity="0.15" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3D PERSPECTIVE SVG — Premium decorative for hero & sections
   ═══════════════════════════════════════════════════════════ */
export function PerspectiveGrid({ className = '', opacity = 0.03 }: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`} style={{ perspective: '800px' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity, transform: 'rotateX(60deg)', transformOrigin: 'center bottom' }}
      >
        {/* Horizontal grid lines with perspective */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0" y1={i * 20} x2="800" y2={i * 20}
            stroke="var(--gold)"
            strokeWidth="0.3"
            strokeOpacity={0.5 + i * 0.025}
          />
        ))}
        {/* Vertical grid lines converging to vanishing point */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 40} y1="0" x2={400 + (i * 40 - 400) * 0.1} y2="400"
            stroke="var(--gold)"
            strokeWidth="0.3"
            strokeOpacity="0.4"
          />
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ORNAMENTAL SHIELD SVG — Legal-themed 3D decorative
   ═══════════════════════════════════════════════════════════ */
export function OrnamentalShield({ className = '', size = 120 }: {
  className?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <div ref={ref} className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 120 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield outline */}
        <motion.path
          d="M60 4 L110 24 L110 72 C110 104 88 130 60 140 C32 130 10 104 10 72 L10 24 Z"
          stroke="var(--gold)"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Inner shield */}
        <motion.path
          d="M60 16 L98 32 L98 68 C98 96 80 118 60 126 C40 118 22 96 22 68 L22 32 Z"
          stroke="var(--gold)"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 2.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {/* Scale of justice symbol */}
        <motion.path
          d="M60 40 L60 80 M42 52 L78 52 M42 52 L36 66 L48 66 Z M78 52 L72 66 L84 66 Z M36 66 L42 72 L48 66 M72 66 L78 72 L84 66"
          stroke="var(--gold)"
          strokeWidth="1"
          strokeOpacity="0.25"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
        />
        {/* Corner diamonds */}
        {[[16, 16], [104, 16], [16, 130], [104, 130]].map(([cx, cy], i) => (
          <motion.path
            key={`diamond-${i}`}
            d={`M${cx} ${cy - 3} L${cx + 2.5} ${cy} L${cx} ${cy + 3} L${cx - 2.5} ${cy} Z`}
            fill="var(--gold)"
            fillOpacity="0.3"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : undefined}
            transition={{ duration: 0.4, delay: 2 + i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION PATTERN WRAPPER — Applies background patterns to sections
   ═══════════════════════════════════════════════════════════ */
export type PatternType = 'artdeco' | 'dots' | 'chevron' | 'lines' | 'crosshatch' | 'hex' | 'diagonal' | 'rings' | 'noise' | 'grid-dots' | 'none';

export function SectionPattern({ pattern = 'dots', className = '' }: {
  pattern?: PatternType;
  className?: string;
}) {
  const patternClass = pattern === 'none' ? '' : pattern === 'grid-dots' ? 'pattern-grid-dots' : pattern === 'noise' ? 'pattern-noise' : `pattern-${pattern}`;
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${patternClass} ${className}`}
      aria-hidden="true"
    />
  );
}
