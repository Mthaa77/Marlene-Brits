'use client';

import { useRef, useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Shield,
  Scale,
  Award,
  ArrowUp,
  Send,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { company } from '@/data/company';
import { SectionPattern } from '@/components/premium/BackgroundPatterns';

/* ─── Quick Links ───────────────────────────────────────────────── */
const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Team', href: '#team' },
  { label: 'Services', href: '#services' },
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];

/* ─── Practice Areas ────────────────────────────────────────────── */
const practiceAreaLinks = [
  'Conveyancing',
  'Deceased Estates',
  'Estate Planning',
  'Family Law',
  'Antenuptial Contracts',
  'Notarial Services',
];

/* ─── Social Links ──────────────────────────────────────────────── */
const socialLinks = [
  { icon: Facebook, href: company.social.facebook, label: 'Facebook' },
  { icon: Instagram, href: company.social.instagram, label: 'Instagram' },
  { icon: Linkedin, href: company.social.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: company.social.twitter, label: 'Twitter' },
];

/* ─── Professional Badges ───────────────────────────────────────── */
const professionalBadges = [
  'Legal Practice Council',
  'Law Society of South Africa',
  'National Wills Week',
  'POPIA Compliant',
];

/* ─── Animation Variants ────────────────────────────────────────── */
const footerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const footerFadeIn = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ─── Footer Section ────────────────────────────────────────────── */
export default function FooterSection() {
  const currentYear = 2026;
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative"
      style={{ backgroundColor: '#0a0a15' }}
    >
      {/* Top gold divider */}
      <SectionPattern pattern="hex" className="opacity-20" />
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4"
      >
        {/* Gold divider above newsletter */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="text-center md:text-left max-w-md">
            <h4 className="text-lg font-serif font-bold text-white mb-1">
              Stay Updated
            </h4>
            <p className="text-white/40 text-sm leading-relaxed">
              Receive legal insights and updates from our team
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full md:w-auto max-w-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 md:w-64 bg-white/[0.04] border border-white/[0.08] rounded-l-sm px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-gold/40 transition-colors duration-300"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-charcoal-dark font-semibold px-5 py-3 rounded-r-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,137,86,0.3)] text-sm whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5" />
              Subscribe
            </button>
          </form>
          {subscribed && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-gold text-xs tracking-wide"
            >
              Thank you for subscribing!
            </motion.p>
          )}
        </div>

        {/* Gold divider below newsletter */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-10" />
      </motion.div>

      {/* Main content */}
      <motion.div
        variants={footerStagger}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8"
      >
        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Column 1 — Logo & Social */}
          <motion.div variants={footerFadeIn} className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="mb-5">
              <h3 className="font-serif text-lg md:text-xl font-bold text-white tracking-tight leading-tight">
                MARLENE BRITS
                <br />
                <span className="gold-text-gradient">ATTORNEYS</span>
              </h3>
              <div className="w-10 h-[2px] gold-gradient mt-3 mb-4" />
              <p className="text-white/40 text-sm leading-relaxed italic font-serif">
                &ldquo;You Are Never Just Another Client&rdquo;
              </p>
            </div>

            {/* Social icons with premium hover */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    className="group relative w-9 h-9 rounded-md bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/40 hover:bg-gold/10 hover:scale-110 hover:shadow-[0_0_15px_rgba(184,137,86,0.25)] transition-all duration-300"
                  >
                    <SocialIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>

            {/* Certifications */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-white/30 text-xs">
                <Shield className="w-3.5 h-3.5 text-gold/50" />
                <span>Legal Practice Council – Gauteng</span>
              </div>
              <div className="flex items-center gap-2 text-white/30 text-xs">
                <Scale className="w-3.5 h-3.5 text-gold/50" />
                <span>Law Society of South Africa</span>
              </div>
              <div className="flex items-center gap-2 text-white/30 text-xs">
                <Award className="w-3.5 h-3.5 text-gold/50" />
                <span>Pretoria Deeds Registry – Lodging Agent</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div variants={footerFadeIn}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-gold transition-colors duration-300 link-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Practice Areas */}
          <motion.div variants={footerFadeIn}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-5">
              Practice Areas
            </h4>
            <ul className="space-y-3">
              {practiceAreaLinks.map((area) => (
                <li key={area}>
                  <a
                    href="#services"
                    className="text-white/50 text-sm hover:text-gold transition-colors duration-300 link-hover"
                  >
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Contact */}
          <motion.div variants={footerFadeIn}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                <div className="text-white/50 text-sm leading-relaxed">
                  <span>{company.location.office}</span>
                  <br />
                  <span>{company.location.street}</span>
                  <br />
                  <span>{company.location.city}, {company.location.postalCode}</span>
                </div>
              </li>

              {/* Phone */}
              <li>
                <a
                  href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-white/50 text-sm hover:text-gold transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-gold/60 shrink-0" />
                  {company.contact.phone}
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="flex items-center gap-3 text-white/50 text-sm hover:text-gold transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-gold/60 shrink-0" />
                  {company.contact.email}
                </a>
              </li>

              {/* Hours */}
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                <div className="text-white/50 text-sm leading-relaxed">
                  <span>{company.hours.weekdays}</span>
                  <br />
                  <span>Sat: {company.hours.saturday}</span>
                  <br />
                  <span>Sun: {company.hours.sunday}</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom divider */}
        <motion.div variants={footerFadeIn} className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

        {/* Bottom bar */}
        <motion.div variants={footerFadeIn} className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Copyright */}
          <p className="text-white/25 text-xs">
            &copy; {currentYear} {company.name}. All Rights Reserved.
          </p>

          {/* Credentials */}
          <p className="text-gold/60 text-xs font-semibold tracking-widest uppercase">
            Attorney | Conveyancer | Notary
          </p>

          {/* Legal links + Back to top */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href="#"
              className="text-white/25 hover:text-gold transition-colors duration-300 link-hover"
            >
              Privacy Policy
            </a>
            <span className="text-white/10">|</span>
            <a
              href="#"
              className="text-white/25 hover:text-gold transition-colors duration-300 link-hover"
            >
              Terms of Service
            </a>
            <span className="text-white/10">|</span>
            <a
              href="#"
              className="text-white/25 hover:text-gold transition-colors duration-300 link-hover"
            >
              POPIA Compliance
            </a>
            <span className="text-white/10">|</span>
            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-1.5 text-white/25 hover:text-gold transition-colors duration-300 cursor-pointer"
              aria-label="Back to top"
            >
              <span className="hidden sm:inline text-[10px] uppercase tracking-wider">Back to top</span>
              <motion.span
                className="inline-flex"
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </motion.span>
            </button>
          </div>
        </motion.div>

        {/* Professional Badge Section */}
        <motion.div
          variants={footerFadeIn}
          className="mt-8 pt-6 border-t border-white/[0.04]"
        >
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5">
            {professionalBadges.map((badge, i) => (
              <span
                key={badge}
                className={`px-3 py-1 rounded-sm border border-gold/[0.12] text-gold/35 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-light hover:border-gold/25 hover:text-gold/55 transition-all duration-500 ${
                  i < professionalBadges.length - 1 ? 'relative' : ''
                }`}
              >
                {badge}
                {i < professionalBadges.length - 1 && (
                  <span className="hidden sm:inline absolute -right-3 top-1/2 -translate-y-1/2 text-gold/10 text-[8px]">
                    |
                  </span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
