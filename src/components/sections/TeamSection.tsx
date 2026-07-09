'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { team, type TeamMember } from '@/data/team';
import {
  Award,
  BadgeCheck,
  BookOpen,
  ChevronDown,
  Crown,
  Mail,
  Scale,
  Shield,
  Sparkles,
  UserRoundCheck,
} from 'lucide-react';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('');
}

function TeamBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/22 bg-gold/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/85 shadow-[0_14px_40px_rgba(214,165,96,0.10)] backdrop-blur-xl">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function PremiumPortrait({ member, isFounder }: { member: TeamMember; isFounder: boolean }) {
  const initials = getInitials(member.name);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[3/4]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(214,165,96,0.28),transparent_34%),linear-gradient(145deg,#101827,#050814_58%,#0b1022)]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute inset-5 rounded-[1.2rem] border border-gold/18" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="absolute -left-16 top-12 h-52 w-52 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -right-16 bottom-12 h-52 w-52 rounded-full bg-white/6 blur-3xl" />

      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-full bg-gold/12 blur-3xl" />
          <span
            className={`relative font-serif-optical font-semibold tracking-[-0.08em] text-white drop-shadow-[0_22px_60px_rgba(0,0,0,0.55)] ${
              isFounder ? 'text-7xl md:text-8xl' : 'text-6xl md:text-7xl'
            }`}
          >
            {initials}
          </span>
        </motion.div>

        <div className="mt-4 flex items-center gap-3">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/70" />
          <Scale className="h-4 w-4 text-gold" />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/70" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8d5e2d] via-[#d6a560] to-[#f5ddad]" />

      {isFounder && (
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-[#071020] shadow-[0_18px_45px_rgba(214,165,96,0.26)]">
            <Crown className="h-3.5 w-3.5" />
            Founder
          </span>
        </div>
      )}
    </div>
  );
}

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isFounder = member.id === 'marlene-brits';

  return (
    <motion.article
      initial={{ opacity: 0, y: 42, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.72, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={isFounder ? 'lg:col-span-2' : ''}
    >
      <motion.div
        whileHover={{ y: -7 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setExpanded((value) => !value)}
        className="group relative overflow-hidden rounded-[2rem] border border-gold/16 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(250,247,240,0.9))] shadow-[0_34px_110px_rgba(9,13,25,0.14)] transition-all duration-500 hover:border-gold/34 hover:shadow-[0_44px_130px_rgba(9,13,25,0.20)]"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/75 to-transparent" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

        <div className={isFounder ? 'grid lg:grid-cols-[0.92fr_1.08fr]' : 'flex flex-col'}>
          <PremiumPortrait member={member} isFounder={isFounder} />

          <div className="relative flex flex-col p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/22 bg-gold/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                <Award className="h-3.5 w-3.5" />
                {member.role}
              </span>
              {isFounder && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#071020]/10 bg-[#071020]/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#071020]/70">
                  <BadgeCheck className="h-3.5 w-3.5 text-gold" />
                  Managing Director
                </span>
              )}
            </div>

            <h3 className={`font-serif-optical font-semibold leading-tight text-charcoal ${isFounder ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
              {member.name}
            </h3>
            <p className="mt-2 text-base font-medium text-gold sm:text-lg">
              {member.title}
            </p>

            <div className="my-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" />

            <p className="line-clamp-3 text-sm leading-7 text-muted-foreground sm:text-base">
              {member.bio}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {member.qualifications.slice(0, 2).map((qualification) => (
                <div key={qualification} className="flex items-start gap-3 rounded-2xl border border-gold/12 bg-gold/5 p-3">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-xs font-medium leading-5 text-charcoal/74">{qualification}</span>
                </div>
              ))}
              {member.admissions.slice(0, 2).map((admission) => (
                <div key={admission} className="flex items-start gap-3 rounded-2xl border border-charcoal/10 bg-charcoal/[0.035] p-3">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-xs font-medium leading-5 text-charcoal/68">{admission}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {member.expertise.slice(0, isFounder ? 6 : 4).map((expertise) => (
                <span key={expertise} className="rounded-full border border-gold/16 bg-white/65 px-3 py-1.5 text-xs font-medium text-charcoal/68 shadow-sm">
                  {expertise}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 border-t border-charcoal/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              {member.email ? (
                <a
                  href={`mailto:${member.email}`}
                  onClick={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/62 transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{member.email}</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-medium text-charcoal/52">
                  <UserRoundCheck className="h-4 w-4 text-gold" />
                  Client-focused support
                </span>
              )}

              <button
                type="button"
                className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.16em] text-gold"
                aria-expanded={expanded}
              >
                {expanded ? 'Close Bio' : 'View Bio'}
                <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-gold/14 bg-[linear-gradient(180deg,rgba(214,165,96,0.08),rgba(255,255,255,0.22))] p-6 sm:p-8">
                <p className="max-w-4xl text-sm leading-7 text-charcoal/68 sm:text-base">
                  {member.bio}
                </p>

                <div className="mt-7 grid gap-6 md:grid-cols-3">
                  <div>
                    <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">Admissions</h4>
                    <ul className="space-y-2">
                      {member.admissions.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-charcoal/64">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">Memberships</h4>
                    <ul className="space-y-2">
                      {member.memberships.length ? member.memberships.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-charcoal/64">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      )) : (
                        <li className="text-sm text-charcoal/48">Available on request</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((item) => (
                        <span key={item} className="rounded-full border border-gold/16 bg-white/65 px-3 py-1.5 text-xs text-charcoal/66">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  );
}

export default function TeamSection() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-[#f8f5ef] py-20 sm:py-28 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(214,165,96,0.18),transparent_26rem),radial-gradient(circle_at_88%_24%,rgba(7,16,32,0.06),transparent_26rem),linear-gradient(180deg,#fbfaf7,#f5efe4)]" />
      <div className="absolute inset-0 opacity-[0.36] [background-image:radial-gradient(rgba(214,165,96,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-3xl text-center md:mb-18"
        >
          <TeamBadge>Our Team</TeamBadge>
          <h2 className="mt-6 font-serif-optical text-[clamp(2.75rem,8vw,5.55rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-charcoal">
            Dedicated Legal
            <span className="block bg-gradient-to-r from-[#8d5e2d] via-[#c58a44] to-[#f1d49a] bg-clip-text text-transparent">
              Professionals.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            A client-first team built around personal attention, professional integrity, and precise legal execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-gold/18 bg-white/70 p-6 shadow-[0_28px_90px_rgba(9,13,25,0.10)] backdrop-blur-xl sm:p-8">
            <p className="text-base leading-8 text-charcoal/68">
              Looking for expert legal guidance? Speak directly with a team that values clarity, professionalism, and personal service.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#071020] shadow-[0_18px_45px_rgba(214,165,96,0.22)] transition-all duration-300 hover:-translate-y-1"
            >
              Get in touch with our team
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
