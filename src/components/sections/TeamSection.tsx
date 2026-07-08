'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { team, type TeamMember } from '@/data/team';
import { Linkedin, ChevronDown, Mail, Award, BookOpen, Shield } from 'lucide-react';
import { SectionPattern, GeometricMandala } from '@/components/premium/BackgroundPatterns';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}

function PortraitPlaceholder({ name, isFounder }: { name: string; isFounder: boolean }) {
  const initials = getInitials(name);
  return (
    <div
      className={`relative w-full overflow-hidden ${
        isFounder ? 'aspect-[3/4]' : 'aspect-[3/4]'
      }`}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          isFounder
            ? 'bg-gradient-to-br from-[var(--charcoal)] via-[var(--charcoal-light)] to-[var(--charcoal-dark)]'
            : 'bg-gradient-to-br from-[var(--charcoal-light)] to-[var(--charcoal)]'
        }`}
      >
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 25%, rgba(184,137,86,0.3) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>
        <span
          className={`font-serif font-bold text-white/90 select-none ${
            isFounder ? 'text-6xl md:text-7xl' : 'text-5xl md:text-6xl'
          }`}
        >
          {initials}
        </span>
        {/* Gold accent line at bottom of portrait */}
        <div className="absolute bottom-0 left-0 right-0 h-1 gold-gradient" />
      </div>
    </div>
  );
}

function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFounder = member.id === 'marlene-brits';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`${isFounder ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''}`}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group relative bg-white rounded-2xl overflow-hidden luxury-shadow border border-transparent hover:border-[var(--gold)]/30 transition-all duration-500 hover:gold-glow cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Gold top accent on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        <div
          className={`flex flex-col ${
            isFounder ? 'md:flex-row' : ''
          }`}
        >
          {/* Portrait */}
          <div className={`${isFounder ? 'md:w-2/5' : ''} relative`}>
            <PortraitPlaceholder name={member.name} isFounder={isFounder} />
            {/* Founder badge */}
            {isFounder && (
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold gold-gradient text-white shadow-lg">
                  <Award className="w-3 h-3" />
                  Founder
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className={`${isFounder ? 'md:w-3/5' : ''} p-6 md:p-8 flex flex-col`}>
            {/* Name */}
            <h3
              className={`font-serif text-charcoal tracking-tight ${
                isFounder ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
              }`}
            >
              {member.name}
            </h3>

            {/* Role */}
            <p className="text-gold font-medium mt-1 text-sm md:text-base">
              {member.role}
            </p>

            {/* Title */}
            <p className="text-muted-foreground text-sm mt-0.5">{member.title}</p>

            {/* Gold accent line */}
            <div className="elegant-divider my-4 w-16" />

            {/* Qualifications & Admissions as tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {member.qualifications.map((q, i) => (
                <span
                  key={`qual-${i}`}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[var(--gold)]/8 text-[var(--charcoal)] border border-[var(--gold)]/15"
                >
                  <BookOpen className="w-3 h-3 text-gold" />
                  {q}
                </span>
              ))}
              {member.admissions.slice(0, isFounder ? 3 : 2).map((a, i) => (
                <span
                  key={`adm-${i}`}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[var(--charcoal)]/5 text-[var(--charcoal)]/70 border border-[var(--charcoal)]/10"
                >
                  <Shield className="w-3 h-3 text-muted-foreground" />
                  {a}
                </span>
              ))}
            </div>

            {/* Expertise preview */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {member.expertise.slice(0, 3).map((e, i) => (
                <span
                  key={`exp-${i}`}
                  className="text-xs text-muted-foreground/80"
                >
                  {e}
                  {i < Math.min(member.expertise.length, 3) - 1 && (
                    <span className="text-gold mx-1.5">&middot;</span>
                  )}
                </span>
              ))}
            </div>

            {/* Contact links */}
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">{member.email}</span>
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Expand indicator */}
            <button
              className="flex items-center gap-1 text-xs text-gold mt-3 hover:text-gold-light transition-colors self-start"
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${member.name}'s bio`}
            >
              <span>{isExpanded ? 'Read less' : 'Read full bio'}</span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.span>
            </button>
          </div>
        </div>

        {/* Expandable Bio */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
                <div className="elegant-divider mb-6" />
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {member.bio}
                </p>

                {/* Full admissions & memberships */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  {member.admissions.length > (isFounder ? 3 : 2) && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">
                        Admissions
                      </h4>
                      <ul className="space-y-1.5">
                        {member.admissions.map((a, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {member.memberships.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">
                        Memberships
                      </h4>
                      <ul className="space-y-1.5">
                        {member.memberships.map((m, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 shrink-0" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {member.expertise.length > 3 && (
                    <div className="sm:col-span-2">
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">
                        Areas of Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((e, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-[var(--gold)]/8 text-[var(--charcoal)] border border-[var(--gold)]/15"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section
      id="team"
      className="relative py-20 md:py-28 bg-[oklch(0.97_0.003_90)]"
    >
      {/* Subtle background pattern */}
      <SectionPattern pattern="dots" className="opacity-40" />
      <GeometricMandala className="-top-20 -right-20" size={250} opacity={0.03} />
      <GeometricMandala className="-bottom-20 -left-20" size={200} opacity={0.02} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-gold text-xs font-semibold uppercase tracking-luxury mb-4 font-cormorant">
            Our Team
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal tracking-tight">
            Dedicated Professionals
          </h2>
          <div className="elegant-divider w-24 mx-auto my-6" />
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Dedicated professionals committed to your success
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground text-sm">
            Looking for expert legal guidance?{' '}
            <a
              href="#contact"
              className="text-gold font-medium link-hover"
            >
              Get in touch with our team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
