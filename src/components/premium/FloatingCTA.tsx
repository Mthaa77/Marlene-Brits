'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { company } from '@/data/company'

const cleanPhone = company.contact.phone.replace(/\s/g, '')
const phoneDigits = cleanPhone.replace(/\D/g, '')
const internationalPhone = phoneDigits.startsWith('0') ? `27${phoneDigits.slice(1)}` : phoneDigits
const whatsappMessage = encodeURIComponent(
  'Hello Marlene Brits Attorneys, I would like to arrange a confidential conversation about a legal matter.'
)

const actions = [
  {
    label: 'WhatsApp the firm',
    href: `https://wa.me/${internationalPhone}?text=${whatsappMessage}`,
    icon: MessageCircle,
    external: true,
    buttonClass:
      'border-emerald-200/45 bg-[linear-gradient(145deg,#2bd47d,#087f58)] text-white shadow-[0_12px_30px_rgba(15,160,98,0.28)]',
  },
  {
    label: `Call ${company.contact.phone}`,
    href: `tel:+${internationalPhone}`,
    icon: Phone,
    external: false,
    buttonClass:
      'border-[#f2cf91]/55 bg-[linear-gradient(145deg,#e8bd73,#b57936)] text-[#07111f] shadow-[0_12px_30px_rgba(183,122,54,0.25)]',
  },
]

export default function FloatingCTA() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.nav
      aria-label="Quick contact options"
      initial={reduceMotion ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-3 z-[60] flex flex-col items-end gap-2.5 sm:right-5"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      {actions.map(({ label, href, icon: Icon, external, buttonClass }) => (
        <motion.a
          key={label}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-label={label}
          title={label}
          whileHover={reduceMotion ? undefined : { y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          className="group relative flex min-h-12 items-center justify-end rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9af6b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111f]"
        >
          <span className="pointer-events-none absolute right-[3.55rem] hidden whitespace-nowrap rounded-full border border-white/12 bg-[#07111f]/94 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#fffaf1] opacity-0 shadow-[0_12px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
            {label}
          </span>
          <span
            className={`relative grid h-12 w-12 place-items-center overflow-hidden rounded-full border ring-4 ring-[#07111f]/12 transition duration-200 group-hover:scale-[1.04] sm:h-[3.15rem] sm:w-[3.15rem] ${buttonClass}`}
          >
            <span className="absolute inset-[1px] rounded-full border border-white/18" />
            <Icon className="relative h-5 w-5" strokeWidth={1.9} />
          </span>
        </motion.a>
      ))}
    </motion.nav>
  )
}
